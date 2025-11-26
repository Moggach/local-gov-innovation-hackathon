#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ -z "${PYTHON_BIN:-}" ]]; then
  if command -v python3 >/dev/null 2>&1; then
    PYTHON_BIN="python3"
  elif command -v python >/dev/null 2>&1; then
    PYTHON_BIN="python"
  else
    echo "Python not found; set PYTHON_BIN to your interpreter" >&2
    exit 1
  fi
fi

HOUSING_PORT="${HOUSING_PORT:-7001}"
CT_PORT="${CT_PORT:-7002}"
BEN_PORT="${BEN_PORT:-7003}"

HOUSING_CMD=("$PYTHON_BIN" "$ROOT_DIR/mcp_servers/housing_server/server.py" --port "$HOUSING_PORT")
CT_CMD=("$PYTHON_BIN" "$ROOT_DIR/mcp_servers/council_tax_server/server.py" --port "$CT_PORT")
BEN_CMD=("$PYTHON_BIN" "$ROOT_DIR/mcp_servers/benefits_server/server.py" --port "$BEN_PORT")

PIDS=()

cleanup() {
  for pid in "${PIDS[@]:-}"; do
    kill "$pid" 2>/dev/null || true
  done
}
trap cleanup EXIT

start_server() {
  local name="$1"; shift
  echo "Starting ${name}..."
  "$@" >/dev/null 2>&1 &
  PIDS+=("$!")
}

start_server "housing" "${HOUSING_CMD[@]}"
start_server "council_tax" "${CT_CMD[@]}"
start_server "benefits" "${BEN_CMD[@]}"

sleep 2

curl_json() {
  local url="$1"
  local body="$2"
  curl -sS -H "Content-Type: application/json" -d "$body" "$url"
}

assert_contains() {
  local needle="$1"
  local haystack="$2"
  local label="$3"
  if ! grep -q "$needle" <<<"$haystack"; then
    echo "FAIL: $label (missing '$needle')" >&2
    exit 1
  fi
  echo "OK: $label"
}

echo "Checking healthchecks..."
h_resp=$(curl_json "http://127.0.0.1:${HOUSING_PORT}/mcp" '{"action":"healthcheck","role":"guest"}')
ct_resp=$(curl_json "http://127.0.0.1:${CT_PORT}/mcp" '{"action":"healthcheck","role":"guest"}')
b_resp=$(curl_json "http://127.0.0.1:${BEN_PORT}/mcp" '{"action":"healthcheck","role":"guest"}')

assert_contains '"status": "ok"' "$h_resp" "housing health"
assert_contains '"status": "ok"' "$ct_resp" "council tax health"
assert_contains '"status": "ok"' "$b_resp" "benefits health"

echo "Checking sample data lookups..."
tenancy_resp=$(curl_json "http://127.0.0.1:${HOUSING_PORT}/mcp" '{"action":"get_tenancy","uprn":"100010001","role":"housing_officer"}')
assert_contains '"source": "housing_server"' "$tenancy_resp" "housing tenancy lookup"

ct_account_resp=$(curl_json "http://127.0.0.1:${CT_PORT}/mcp" '{"action":"get_account","uprn":"100010001","role":"revenues_officer"}')
assert_contains '"source": "council_tax_server"' "$ct_account_resp" "council tax account lookup"

benefits_resp=$(curl_json "http://127.0.0.1:${BEN_PORT}/mcp" '{"action":"get_claim","uprn":"100010001","role":"benefits_officer"}')
assert_contains '"source": "benefits_server"' "$benefits_resp" "benefits claim lookup"

echo "All MCP servers responded correctly."
