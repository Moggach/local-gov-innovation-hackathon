# Homelessness Prevention Demonstrator

React + TypeScript front-end backed by three lightweight MCP-style servers that expose deterministic housing, council tax, and benefits data for AI-assisted triage.

## Getting started

Install dependencies (if not already done):
```bash
npm install
```

Run the React app:
```bash
npm run dev
```

Open the UI at the URL printed in the terminal (typically `http://localhost:5173`).

## MCP demo servers

Start the stub MCP servers in separate terminals:
```bash
python mcp_servers/housing_server/server.py --port 7001
python mcp_servers/council_tax_server/server.py --port 7002
python mcp_servers/benefits_server/server.py --port 7003
```

Each server listens on `/mcp` and expects JSON POST requests that include an `action`, parameters (e.g. `uprn`), and a `role` for RBAC checks. See `mcp_servers/README.md` and the per-server READMEs for accepted actions and roles.

Use live data by setting source URLs (JSON list) or alternate CSV paths:
`HOUSING_DATA_URL` / `HOUSING_DATA_PATH`, `COUNCIL_TAX_DATA_URL` / `COUNCIL_TAX_DATA_PATH`, `BENEFITS_DATA_URL` / `BENEFITS_DATA_PATH`.

If no live MCP responses arrive at startup, the UI shows a banner and falls back to the bundled demo dataset.

Quick smoke test (spins up all three servers and exercises health + sample lookups):
```bash
npm run smoke:mcp
```

Validate MCP connectivity/data (servers must be running):
```bash
npm run validate:mcp
```

## How to demo

- Step-by-step run/demo: `USAGE.md`
- Storyline using current data: `DEMONSTRATION.md`
- Architecture & data flow: `docs/architecture.md`
- RBAC/audit/redaction: `docs/security_and_governance.md`
- Backlog to production data integration: `CHANGELOG.md` (Unreleased section)

## Architecture & security

- High-level design and data flow: `docs/architecture.md`
- RBAC, audit, and redaction approach: `docs/security_and_governance.md`

## Developing

- Run tests: `npm test`
- Build for production: `npm run build`
- Lint: `npm run lint`

Line endings are enforced as LF via `.gitattributes`; keep your editor configured accordingly.
