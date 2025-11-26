# Usage Guide: Homelessness Prevention Demonstrator

This guide shows how to run and demonstrate the MCP-enabled prototype, exercising all current data sources.

## Prerequisites
- Node.js (v18+) and npm
- Python 3.10+ (for MCP demo servers)
- Clone the repo and stay on branch `feature/mcp-integration`.

## 1. Install dependencies
```bash
npm install
```

## 2. Start the MCP demo servers
In three terminals (or use the smoke script):
```bash
python mcp_servers/housing_server/server.py --port 7001
python mcp_servers/council_tax_server/server.py --port 7002
python mcp_servers/benefits_server/server.py --port 7003
```

Alternative single command (starts servers, runs health + sample lookups, then exits):
```bash
npm run smoke:mcp
```

Environment overrides (if ports/hosts differ):
- `VITE_HOUSING_MCP_URL`
- `VITE_CT_MCP_URL`
- `VITE_BEN_MCP_URL`

## 3. Run the front-end
```bash
npm run dev
```
Open the URL shown (typically `http://localhost:5173`). The dashboard now fetches live MCP data, shows loading/error states, and merges it with fallback cases for robustness.

## 4. What to click
- **Dashboard**: view cases pulled from MCP CSVs (UPRNs 100010001–100010010). Risk, probability, and completeness are derived from live housing / council tax / benefits signals.
- **Filter**: use the risk filter to see High / Medium / Low computed from MCP data.
- **Person detail**: click any Case Reference to open the detail page. The “Live MCP Signals” section shows tenancy status + arrears, council tax arrears/stage, and UC status/sanction for that UPRN.

## 5. Test the endpoints directly (optional)
```bash
curl -X POST http://127.0.0.1:7001/mcp -H 'Content-Type: application/json' \
  -d '{"action":"get_tenancy","uprn":"100010004","role":"housing_officer"}'

curl -X POST http://127.0.0.1:7002/mcp -H 'Content-Type: application/json' \
  -d '{"action":"list_in_recovery","role":"revenues_officer"}'

curl -X POST http://127.0.0.1:7003/mcp -H 'Content-Type: application/json' \
  -d '{"action":"list_sanctioned","role":"benefits_officer"}'
```

## 6. Automated checks
- Unit tests: `npm test`
- MCP smoke test: `npm run smoke:mcp`

## Data currently exercised
- Housing: `mcp_servers/housing_server/data.csv` (tenancy status, arrears, last payment) for UPRNs 100010001–100010010.
- Council Tax: `mcp_servers/council_tax_server/data.csv` (arrears, last payment, recovery stage) for the same UPRNs.
- Benefits: `mcp_servers/benefits_server/data.csv` (UC status, sanction flag, housing element) for the same UPRNs.
- Front-end fallback/person metadata: `src/data/cases.ts` (names, references, UPRNs) + `PersonPage` dummy history/contact data.

## Troubleshooting
- If the UI shows an MCP error banner, ensure servers are running and ports match the VITE_* URLs.
- CORS is enabled on the demo servers; if you change hosts/ports, restart servers.
- Rollup optional binary issue: rerun `npm install` (we added `@rollup/rollup-darwin-arm64` to fix this locally).
