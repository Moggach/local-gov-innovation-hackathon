# Homelessness Prevention Demonstrator – MCP Architecture

## Overview
This demonstrator treats each council data source as its own Model Context Protocol (MCP) server so data stays within departmental boundaries while being queryable by the AI assistant. Codex/Claude acts as the MCP host, orchestrating calls to the Housing, Council Tax, and Benefits servers and combining deterministic results for frontline staff.

## Components
- **AI host (Codex/Claude)** – orchestrates MCP clients and applies skills (redaction, aggregation, formatting).
- **Housing MCP server** – tenancy + rent arrears data (`mcp_servers/housing_server`).
- **Council Tax MCP server** – balances + recovery stage (`mcp_servers/council_tax_server`).
- **Benefits MCP server** – Universal Credit status + sanction flag (`mcp_servers/benefits_server`).
- **Audit / RBAC** – per-server role checks; every request logged to stdout. Roles map to departmental users (e.g. housing_officer, revenues_officer, benefits_officer, analyst, manager).

## Data flow
```mermaid
flowchart TD
  subgraph Council Data Systems (MCP servers)
    direction LR
    H[Housing MCP] -->|CSV lookup| HDB[(data.csv)]
    C[Council Tax MCP] -->|CSV lookup| CDB[(data.csv)]
    B[Benefits MCP] -->|CSV lookup| BDB[(data.csv)]
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
Each server listens on `/mcp` and expects JSON POST requests with an `action`, parameters (e.g. `uprn`), and a `role` header/field. See `mcp_servers/README.md` and per-server READMEs for allowed actions.

## Example MCP host config (Codex)
Add commands to the Codex MCP settings so the agent can launch local servers:
```json
{
  "mcpServers": {
    "housing": { "command": "python mcp_servers/housing_server/server.py --port 7001" },
    "council_tax": { "command": "python mcp_servers/council_tax_server/server.py --port 7002" },
    "benefits": { "command": "python mcp_servers/benefits_server/server.py --port 7003" }
  }
}
```
If the servers are remote, replace `command` with their URL/endpoints per the MCP transport spec.

## How the AI should use the tools
- Use `get_tenancy` for tenancy/arrears detail (needs `uprn`).
- Use `get_account` or `list_in_recovery` for council tax debt picture.
- Use `get_claim` or `list_sanctioned` to understand benefit status.
- Apply skills to redact PII, aggregate arrears, and surface only role-appropriate insights before responding.

## Next steps
- Swap CSVs for live connectors (SQL/API) while keeping MCP contract.
- Wire the React UI to show “live via MCP” indicators or surface audit IDs from the servers.
- Add automated contract tests that hit `/mcp` for each action and role.
