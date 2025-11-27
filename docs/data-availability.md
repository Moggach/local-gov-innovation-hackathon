# Problem Statement

Local authorities (LAs) hold rich datasets that can help identify
households at risk of homelessness before they reach crisis point.
However, these datasets are often siloed, underutilised, or lack
integration with other relevant data sources. This limits the ability of
LAs to proactively identify and support vulnerable households, leading
to increased homelessness rates and associated social and economic
costs. \## Proposed Solution

We will develop a prototype tool that securely combines local authority
data (H-CLIC, rent, council tax, benefits and related sources) to
highlight households and neighbourhoods whose circumstances resemble
those of people who have recently presented as homeless. By analysing
early warning indicators and presenting transparent risk bands, the tool
will support timely, targeted offers of advice, financial help and wider
services before people reach crisis point. This will reduce avoidable
homelessness and its impact on individuals and families, while helping
councils manage demand, target prevention resources more effectively and
reduce reliance on costly temporary accommodation.

### 1. Household-level **now** (inside / closely held by the LA)

| **Source**                                         | **Availability**           | **Notes (fact)**                                                                |
|----------------------------------------------------|----------------------------|---------------------------------------------------------------------------------|
| H-CLIC – your own LA case-level data               | Readily available in-house | You generate this; contains presentations, duties, outcomes, support needs.     |
| LA homelessness / TA records                       | Readily available in-house | Placement history, TA type, length of stay, cost, move-on outcomes.             |
| LA rent accounts (council stock)                   | Readily available in-house | Arrears flags, months behind, tenancy type, payment history.                    |
| Housing Benefit (HB) / Council Tax Reduction (CTR) | Readily available in-house | Awards, changes in circumstances, overpayments, some income/employment signals. |
| Council Tax billing & arrears                      | Readily available in-house | Missed payments, instalment plans, recovery stage, liability type.              |

### 2. **Area-level only** (open or shared as aggregates)

| **Source**                                    | **Availability**                           | **Notes (fact)**                                                            |
|-----------------------------------------------|--------------------------------------------|-----------------------------------------------------------------------------|
| Aggregated H-CLIC stats (other LAs, national) | Open official statistics                   | LA-level and some breakdowns; no person-level access.                       |
| DWP benefit caseload statistics               | Open small-area stats (LSOA/MSOA)          | Counts by benefit type; useful for neighbourhood-level risk context.        |
| LHA rates by BRMA & bedroom size              | Open data (DWP/VOA)                        | Can be joined to areas to calculate affordability gap vs local rents.       |
| Private rental market statistics (VOA/ONS)    | Open data by area/property size            | Median and percentile rents; combine with LHA for affordability indicators. |
| Police.uk crime/ASB open data                 | Open data at street/LSOA level             | Incident categories and approximate locations; good for area risk context.  |
| ONS/IMD and other deprivation indices         | Open data at LSOA/MSOA                     | Multi-domain deprivation, income, health, employment, education etc.        |
| JSNA / public health published indicators     | Open/aggregate (via PH teams / Fingertips) | Area-level health burdens, admissions rates, life expectancy etc.           |

### 3. **Future ambition** – multi-agency / complex access

| **Source**                                             | **Current status**                     | **Notes (fact)**                                                                  |
|--------------------------------------------------------|----------------------------------------|-----------------------------------------------------------------------------------|
| NHS person-level data (A&E, MH, GP, community)         | Restricted; needs ICS/joint governance | Possible via joint LA–NHS analytics under tight IG; not routinely piped to LAs.   |
| DWP person-level UC / sanctions feeds (for prevention) | Restricted; needs legal gateway & DSA  | Beyond existing narrow uses (e.g. HB/CTR); would need DEA/other gateways.         |
| Housing Association rent & arrears data                | Not automatic; needs local agreements  | Each RP/HA has its own system; requires bilateral or multi-RP data-sharing.       |
| Probation / prison release indicators (person-level)   | Highly controlled                      | Shared today mainly via MAPPA/IOM panels; bulk analytics feeds are unusual.       |
| Person-level Police / ASB records                      | Highly sensitive                       | Only shared in tightly governed multi-agency contexts, not general analytics.     |
| Fully linked multi-agency “single view” platform       | Emerging / pilot in some areas         | Requires LA–NHS–Police–Probation governance, DPIAs, and technical infrastructure. |
