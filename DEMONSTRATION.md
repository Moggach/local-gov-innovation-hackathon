# Demonstration Storyline

Use this script to tell a coherent story with the live MCP data. All data points referenced exist in the repo’s CSVs or front-end fixtures.

## Cast of households (UPRNs)
- **100010004 – Alex Green**: High-risk anchor (rent arrears £920, CT arrears £610, recovery stage Final Notice).
- **100010010 – Omar Khan**: Very high arrears (£1100 housing, £420 CT, stage Summons).
- **100010003 – Sam Lee**: Low arrears but UC suspended with sanction flag → watchlist.
- **100010007 – Lucy Brown**: Temporary housing, substantial arrears (£780) and CT reminder; domestic violence history (front-end fixture).
- **100010002 – Jane Doe**: Stable case (no CT arrears, modest housing arrears) shows green path.

## Demo flow (10–12 minutes)
1) **Set the scene (dashboard)**
   - Explain the MCP architecture (three micro-servers for Housing, Council Tax, Benefits) and that the dashboard is pulling live data right now.
   - Point to the “Live MCP data” summary line (High/Medium/Low counts).

2) **Triage by risk filter**
   - Filter to **High**: you should see cases including Alex Green (100010004) and Omar Khan (100010010). Note that risk is derived from live arrears + sanctions, not hardcoded.
   - Filter to **Medium**: Lucy Brown (100010007) appears due to combined housing/CT signals.

3) **Drill into a high-risk case: Alex Green (100010004)**
   - Open the person page. In “Live MCP Signals” highlight:
     - Housing: Secure tenancy, arrears £920 (from housing CSV).
     - Council tax: arrears £610, recovery stage Final Notice.
     - Benefits: UC open, no sanction (benefits CSV).
   - Tie to storyline: near-eviction; recommend coordinated rent/CT payment plan.

4) **Edge case – benefits risk: Sam Lee (100010003)**
   - UC status is **Suspended** with `sanction_flag=true`; housing arrears £0, CT £45 → shows how sanctions elevate risk without rent debt.

5) **Household with safeguarding context: Lucy Brown (100010007)**
   - Temporary tenancy, arrears £780; CT reminder stage; front-end notes show domestic violence. Emphasize multi-agency response.

6) **Positive example: Jane Doe (100010002)**
   - CT arrears £0, small housing arrears (£240). Use to show completeness and green path.

7) **Close with audit/governance**
   - Mention that each MCP call is role-checked and logged; switching roles would block certain actions (demo via curl if time).

## Optional live curl moments
- Show housing arrears call: `curl -X POST http://127.0.0.1:7001/mcp -H 'Content-Type: application/json' -d '{"action":"get_tenancy","uprn":"100010004","role":"housing_officer"}'`
- Show benefits sanctions list: `curl -X POST http://127.0.0.1:7003/mcp -H 'Content-Type: application/json' -d '{"action":"list_sanctioned","role":"benefits_officer"}'`

## Data coverage notes
- All UPRNs 100010001–100010010 have records in Housing, Council Tax, and Benefits CSVs to ensure completeness demos work.
- Front-end retains richer narrative fields (contact, history, risk factors) that pair with the live MCP signals.
