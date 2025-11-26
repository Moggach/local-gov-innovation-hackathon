# MCP Servers (demo stack)

This directory contains three lightweight MCP-style HTTP servers that expose deterministic data for the homelessness prevention demonstrator. They are intentionally dependency-free so they can run anywhere with Python 3.10+.

- `housing_server` – tenancy + rent arrears
- `council_tax_server` – council tax balances and recovery stage
- `benefits_server` – Universal Credit status and sanctions

## Quickstart

Open three terminals and run:

```bash
python mcp_servers/housing_server/server.py --port 7001
python mcp_servers/council_tax_server/server.py --port 7002
python mcp_servers/benefits_server/server.py --port 7003
```

Each server listens on `/mcp` and expects JSON POST requests that include an `action`, any parameters (e.g. `uprn`), and a `role` for RBAC checks. See the individual README files for accepted actions and roles.

## Example call

```bash
curl -X POST http://127.0.0.1:7001/mcp \
  -H 'Content-Type: application/json' \
  -d '{"action": "get_tenancy", "uprn": "100010001", "role": "housing_officer"}'
```

The same pattern works for council tax and benefits servers. Logs are printed to stdout to demonstrate audit trails.
