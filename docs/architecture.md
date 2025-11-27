# Homelessness Prevention Demonstrator – MCP Architecture

## Overview
This demonstrator treats each council data source as its own Model Context Protocol (MCP) server so data stays within departmental boundaries while being queryable by the AI assistant. Codex/Claude acts as the MCP host, orchestrating calls to the Housing, Council Tax, and Benefits servers and combining deterministic results for frontline staff.

## Components
- **AI host (Codex/Claude)** – orchestrates MCP clients and applies skills (redaction, aggregation, formatting).
- **Housing MCP server** – tenancy + rent arrears (`mcp_servers/housing_server`).
- **Council Tax MCP server** – balances + recovery stage (`mcp_servers/council_tax_server`).
- **Benefits MCP server** – UC status + sanction flag (`mcp_servers/benefits_server`).
- **Audit / RBAC** – per-server role checks; every request logged to stdout. Roles map to departmental users (housing_officer, revenues_officer, benefits_officer, analyst, manager).

## Data flow
```mermaid
flowchart TD
  subgraph Council Data Systems (MCP servers)
    direction LR
    H[Housing MCP] -->|CSV/connector| HDB[(data source)]
    C[Council Tax MCP] -->|CSV/connector| CDB[(data source)]
    B[Benefits MCP] -->|CSV/connector| BDB[(data source)]
  end

  U[Officer] -->|question| AI{{AI host (Codex/Claude)}}
  AI -->|MCP request| H
  AI -->|MCP request| C
  AI -->|MCP request| B
  H -->|deterministic JSON| AI
  C -->|deterministic JSON| AI
  B -->|deterministic JSON| AI
  AI -->|insight/response| U
```

## Running the demo servers
Open three terminals from repo root:
```bash
python mcp_servers/housing_server/server.py --port 7001
python mcp_servers/council_tax_server/server.py --port 7002
python mcp_servers/benefits_server/server.py --port 7003
```
Override data source (first backlog item implemented):
- Use real endpoint JSON: set `HOUSING_DATA_URL`, `COUNCIL_TAX_DATA_URL`, `BENEFITS_DATA_URL` (each should return a JSON list of records with the same fields as the CSVs).
- Or point to alternative CSVs: `HOUSING_DATA_PATH`, `COUNCIL_TAX_DATA_PATH`, `BENEFITS_DATA_PATH`.
Defaults fall back to bundled CSVs.

## Example MCP host config (Codex)
```json
{
  "mcpServers": {
    "housing": { "command": "python mcp_servers/housing_server/server.py --port 7001" },
    "council_tax": { "command": "python mcp_servers/council_tax_server/server.py --port 7002" },
    "benefits": { "command": "python mcp_servers/benefits_server/server.py --port 7003" }
  }
}
```
If servers are remote, replace `command` with their URL/endpoints per the MCP transport spec.

## How the AI should use the tools
- `get_tenancy` for tenancy/arrears detail (needs `uprn`).
- `get_account` or `list_in_recovery` for council tax debt picture.
- `get_claim` or `list_sanctioned` for benefits status/sanctions.
- Apply skills to redact PII, aggregate arrears, and surface only role-appropriate insights before responding.

## Next steps
- Swap CSVs for live connectors (now supported via *_DATA_URL/PATH vars).
- Wire the React UI to show source freshness and audit IDs from MCP responses.
- Add automated contract tests that hit `/mcp` for each action and role.
