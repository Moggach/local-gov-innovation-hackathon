# Benefits MCP Server (demo)

Minimal HTTP endpoint that serves benefit claim data from `data.csv` with a simple MCP-style contract.

## Run

```bash
python server.py --host 127.0.0.1 --port 7003
```

## Request format

POST `http://127.0.0.1:7003/mcp`

```json
{
  "action": "get_claim" | "list_sanctioned" | "healthcheck",
  "uprn": "100010001",            // required for get_claim
  "role": "benefits_officer"      // or manager | analyst
}
```

## RBAC rules

- `get_claim`: benefits_officer, manager, analyst
- `list_sanctioned`: benefits_officer, manager
- `healthcheck`: any role (or omit)

Requests are logged with timestamp, role, and action for governance demos.
