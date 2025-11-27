#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" )/.." && pwd)"

if [[ -z "${PYTHON_BIN:-}" ]]; then
  if command -v python3 >/dev/null 2>&1; then
    PYTHON_BIN="python3"
  elif command -v python >/dev/null 2>&1; then
    PYTHON_BIN="python"
  else
    echo "Python interpreter not found. Set PYTHON_BIN env var." >&2
    exit 1
  fi
fi

HOUSING_PORT="${HOUSING_PORT:-7001}"
CT_PORT="${CT_PORT:-7002}"
BEN_PORT="${BEN_PORT:-7003}"

LOG_DIR="${ROOT_DIR}/.mcp_logs"
mkdir -p "${LOG_DIR}"

PIDS=()

cleanup() {
  for pid in "${PIDS[@]:-}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
    fi
  done
}
trap cleanup EXIT

start_server() {
  local name="$1"
  local port="$2"
  local script_path="$3"
  local log_file="${LOG_DIR}/${name}.log"

  echo "Starting ${name} MCP server on port ${port} ($(date --iso-8601=seconds))" | tee -a "$log_file"
  "$PYTHON_BIN" "$script_path" --port "$port" >>"$log_file" 2>&1 &
  local pid=$!
  PIDS+=("$pid")
  echo "  → ${name} PID ${pid}" >>"$log_file"
}

start_server housing "$HOUSING_PORT" "$ROOT_DIR/mcp_servers/housing_server/server.py"
start_server council_tax "$CT_PORT" "$ROOT_DIR/mcp_servers/council_tax_server/server.py"
start_server benefits "$BEN_PORT" "$ROOT_DIR/mcp_servers/benefits_server/server.py"

echo "All MCP servers started. Logs in ${LOG_DIR}. Press Ctrl+C to stop."
wait
