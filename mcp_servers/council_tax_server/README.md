# Council Tax MCP Server (demo)

Serves council tax account data via a minimal HTTP MCP-style endpoint. Pluggable data source.

## Data source
- Default: `data.csv` in this folder.
- Override with live JSON endpoint (list of records): `COUNCIL_TAX_DATA_URL`.
- Override with alternative CSV: `COUNCIL_TAX_DATA_PATH`.

## Run
```bash
python server.py --host 127.0.0.1 --port 7002
```

## Request format
POST `http://127.0.0.1:7002/mcp`
```json
{
  "action": "get_account" | "list_in_recovery" | "healthcheck",
  "uprn": "100010001",
  "recovery_stages": ["Reminder"],
  "role": "revenues_officer"
}
```

## RBAC rules
- `get_account`: revenues_officer, manager, analyst
- `list_in_recovery`: revenues_officer, manager
- `healthcheck`: any role (or omit role)

Requests are logged with timestamp, role, and action for audit trails.
