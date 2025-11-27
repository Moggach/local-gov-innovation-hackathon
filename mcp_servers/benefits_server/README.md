# Benefits MCP Server (demo)

Minimal HTTP endpoint that serves benefit claim data with a pluggable source.

## Data source
- Default: `data.csv` in this folder.
- Override with live JSON endpoint (list of records): `BENEFITS_DATA_URL`.
- Override with alternative CSV: `BENEFITS_DATA_PATH`.

## Run
```bash
python server.py --host 127.0.0.1 --port 7003
```

## Request format
POST `http://127.0.0.1:7003/mcp`
```json
{
  "action": "get_claim" | "list_sanctioned" | "healthcheck",
  "uprn": "100010001",
  "role": "benefits_officer"
}
```

## RBAC rules
- `get_claim`: benefits_officer, manager, analyst
- `list_sanctioned`: benefits_officer, manager
- `healthcheck`: any role (or omit)

Requests are logged with timestamp, role, and action for governance demos.
