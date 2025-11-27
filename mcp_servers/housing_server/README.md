# Housing MCP Server (demo)

Minimal MCP-style HTTP endpoint that serves tenancy data. Now supports pluggable data sources.

## Data source
- Default: `data.csv` in this folder.
- Override with live JSON endpoint (list of records): set `HOUSING_DATA_URL`.
- Override with alternative CSV: set `HOUSING_DATA_PATH`.

## Run
```bash
python server.py --host 127.0.0.1 --port 7001
```

## Request format
POST `http://127.0.0.1:7001/mcp`
```json
{
  "action": "get_tenancy" | "get_arrears_over" | "healthcheck",
  "uprn": "100010001",
  "threshold": 200,
  "role": "housing_officer"
}
```

## RBAC rules
- `get_tenancy`: housing_officer, manager, analyst
- `get_arrears_over`: housing_officer, manager
- `healthcheck`: any role (or omit role)

Logs include timestamp, role, action, and outcome to illustrate audit trails.
