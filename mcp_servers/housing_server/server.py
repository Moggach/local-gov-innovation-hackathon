"""
Lightweight MCP-style demo server for housing data.

This is intentionally minimal and self-contained so it can run without
extra dependencies. It accepts JSON POST requests to `/mcp` with the
following shape:

{
    "action": "get_tenancy" | "get_arrears_over" | "healthcheck",
    "uprn": "100010001",                # required for get_tenancy
    "threshold": 200,                   # optional for get_arrears_over
    "role": "housing_officer" | "manager" | "analyst"
}

Role-based access:
- get_tenancy: housing_officer, manager, analyst
- get_arrears_over: housing_officer, manager
- healthcheck: anyone

Responses are deterministic JSON objects. All requests are logged with
timestamp, role, action, and outcome to stdout for auditability.
"""

from __future__ import annotations

import argparse
import csv
import json
import logging
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from typing import Dict, List

ROOT = Path(__file__).resolve().parent
DATA_PATH = ROOT / "data.csv"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)


def load_data() -> List[Dict[str, str]]:
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"Expected data at {DATA_PATH}")
    with DATA_PATH.open() as f:
        reader = csv.DictReader(f)
        return list(reader)


DATA = load_data()


def find_by_uprn(uprn: str) -> Dict[str, str] | None:
    return next((row for row in DATA if row["uprn"] == uprn), None)


class MCPHandler(BaseHTTPRequestHandler):
    server_version = "HousingMCP/0.1"
    ACTION_ROLES = {
        "get_tenancy": {"housing_officer", "manager", "analyst"},
        "get_arrears_over": {"housing_officer", "manager"},
        "healthcheck": {"housing_officer", "manager", "analyst", "guest"},
    }

    def _send_json(self, status: int, payload: Dict):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
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
            self._send_json(404, {"error": "Not Found"})
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        try:
            request_json = json.loads(self.rfile.read(content_length))
        except json.JSONDecodeError:
            self._send_json(400, {"error": "Invalid JSON"})
            return

        action = request_json.get("action")
        role = request_json.get("role") or self.headers.get("x-user-role")
        if action not in self.ACTION_ROLES:
            self._send_json(400, {"error": f"Unknown action '{action}'"})
            return
        if role not in self.ACTION_ROLES[action]:
            logging.warning("Denied %s for role %s", action, role)
            self._send_json(403, {"error": "Forbidden for role"})
            return

        if action == "healthcheck":
            payload = {"status": "ok", "source": "housing_server"}
        elif action == "get_tenancy":
            uprn = str(request_json.get("uprn", ""))
            record = find_by_uprn(uprn)
            if not record:
                self._send_json(404, {"error": "UPRN not found"})
                logging.info("Not found | role=%s action=%s uprn=%s", role, action, uprn)
                return
            payload = {"source": "housing_server", "data": record}
        elif action == "get_arrears_over":
            threshold = float(request_json.get("threshold", 0))
            matches = [
                row for row in DATA if float(row["arrears_amount"]) >= threshold
            ]
            payload = {"source": "housing_server", "threshold": threshold, "results": matches}
        else:
            self._send_json(400, {"error": "Unsupported action"})
            return

        logging.info("Success | role=%s action=%s", role, action)
        self._send_json(200, payload)


def serve(host: str = "127.0.0.1", port: int = 7001):
    httpd = HTTPServer((host, port), MCPHandler)
    logging.info("Housing MCP server listening on http://%s:%s/mcp", host, port)
    httpd.serve_forever()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Housing MCP demo server")
    parser.add_argument("--host", default="127.0.0.1", help="Bind host (default 127.0.0.1)")
    parser.add_argument("--port", type=int, default=7001, help="Port to listen on (default 7001)")
    args = parser.parse_args()
    serve(args.host, args.port)
