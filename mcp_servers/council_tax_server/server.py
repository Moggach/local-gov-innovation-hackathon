"""
Council Tax MCP-style demo server.

POST JSON to /mcp, including a role for simple RBAC enforcement:
{
    "action": "get_account" | "list_in_recovery" | "healthcheck",
    "uprn": "100010001",              # required for get_account
    "recovery_stages": ["Reminder"],  # optional for list_in_recovery
    "role": "revenues_officer" | "manager" | "analyst"
}
"""

from __future__ import annotations

import argparse
import csv
import json
import logging
import os
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from typing import Dict, List

ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "data.csv"

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(message)s")


def _load_from_url(url: str) -> List[Dict[str, str]]:
    try:
        with urllib.request.urlopen(url) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
            if not isinstance(payload, list):
                raise ValueError("Expected JSON list of records")
            return payload
    except (urllib.error.URLError, ValueError, json.JSONDecodeError) as exc:
        raise RuntimeError(f"Failed to fetch council tax data from {url}: {exc}") from exc


def _load_from_csv(path: Path) -> List[Dict[str, str]]:
    if not path.exists():
        raise FileNotFoundError(f"Expected data at {path}")
    with path.open() as f:
        return list(csv.DictReader(f))


def load_data() -> List[Dict[str, str]]:
    url = os.getenv("COUNCIL_TAX_DATA_URL")
    path_override = os.getenv("COUNCIL_TAX_DATA_PATH")
    if url:
        return _load_from_url(url)
    if path_override:
        return _load_from_csv(Path(path_override))
    return _load_from_csv(DATA_PATH)


DATA = load_data()


def find_by_uprn(uprn: str) -> Dict[str, str] | None:
    return next((row for row in DATA if row["uprn"] == uprn), None)


class MCPHandler(BaseHTTPRequestHandler):
    ACTION_ROLES = {
        "get_account": {"revenues_officer", "manager", "analyst"},
        "list_in_recovery": {"revenues_officer", "manager"},
        "healthcheck": {"revenues_officer", "manager", "analyst", "guest"},
    }

    def _send(self, code: int, payload: Dict):
        body = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, x-user-role")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):  # noqa: N802
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, x-user-role")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()

    def do_POST(self):  # noqa: N802
        if self.path != "/mcp":
            self._send(404, {"error": "Not Found"})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            body = self.rfile.read(length)
            request = json.loads(body)
        except Exception:
            self._send(400, {"error": "Invalid JSON"})
            return

        action = request.get("action")
        role = request.get("role") or self.headers.get("x-user-role")
        if action not in self.ACTION_ROLES:
            self._send(400, {"error": f"Unknown action '{action}'"})
            return
        if role not in self.ACTION_ROLES[action]:
            logging.warning("Denied %s for role=%s", action, role)
            self._send(403, {"error": "Forbidden for role"})
            return

        if action == "healthcheck":
            response = {"status": "ok", "source": "council_tax_server"}
        elif action == "get_account":
            uprn = str(request.get("uprn", ""))
            record = find_by_uprn(uprn)
            if not record:
                self._send(404, {"error": "UPRN not found"})
                logging.info("Not found | role=%s action=%s uprn=%s", role, action, uprn)
                return
            response = {"source": "council_tax_server", "data": record}
        elif action == "list_in_recovery":
            stages = request.get("recovery_stages") or ["Reminder", "Final Notice"]
            matches = [row for row in DATA if row["current_recovery_stage"] in stages]
            response = {"source": "council_tax_server", "stages": stages, "results": matches}
        else:
            self._send(400, {"error": "Unsupported action"})
            return

        logging.info("Success | role=%s action=%s", role, action)
        self._send(200, response)


def serve(host: str = "127.0.0.1", port: int = 7002):
    server = HTTPServer((host, port), MCPHandler)
    logging.info("Council Tax MCP server listening on http://%s:%s/mcp", host, port)
    server.serve_forever()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Council Tax MCP demo server")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=7002)
    args = parser.parse_args()
    serve(args.host, args.port)
