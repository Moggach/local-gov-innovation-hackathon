# Housing MCP Server (demo)

Minimal MCP-style HTTP endpoint that serves deterministic housing tenancy data from `data.csv`.

## Run

```bash
python server.py --host 127.0.0.1 --port 7001
```

## Request format

POST `http://127.0.0.1:7001/mcp`

```json
{
  "action": "get_tenancy" | "get_arrears_over" | "healthcheck",
  "uprn": "100010001",       // required for get_tenancy
  "threshold": 200,           // optional for get_arrears_over
  "role": "housing_officer"  // or manager | analyst
}
```

## RBAC rules

- `get_tenancy`: housing_officer, manager, analyst
- `get_arrears_over`: housing_officer, manager
- `healthcheck`: any role (or omit role)

Logs include timestamp, role, action, and outcome to illustrate audit trails.
