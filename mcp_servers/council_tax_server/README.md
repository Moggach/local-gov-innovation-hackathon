# Council Tax MCP Server (demo)

Serves deterministic council tax account data from `data.csv` via a minimal HTTP MCP-style endpoint.

## Run

```bash
python server.py --host 127.0.0.1 --port 7002
```

## Request format

POST `http://127.0.0.1:7002/mcp`

```json
{
  "action": "get_account" | "list_in_recovery" | "healthcheck",
  "uprn": "100010001",                // required for get_account
  "recovery_stages": ["Reminder"],    // optional filter
  "role": "revenues_officer"          // or manager | analyst
}
```

## RBAC rules

- `get_account`: revenues_officer, manager, analyst
- `list_in_recovery`: revenues_officer, manager
- `healthcheck`: any role (or omit role)

Each request is logged with timestamp, role, and action for audit trails.
