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

**1. What we need to answer the problem statement**

From your problem statement, the minimum questions we must be able to
answer are:

1.  **Who is at increased risk of presenting as homeless soon?**

2.  **What factors/trajectories are driving that risk?**

3.  **Where in the system do we see early signals (touchpoints)?**

4.  **How does risk and demand vary by neighbourhood and over time?**

I’ll map data needs to **Now / Area‑only / Future** based on the table
we already built.

**2. Data needs vs what we have now / later**

**2.1 Core “phase 1” (realistically available now, household‑level)**

These are the things you can actually build a working model
from **today** in most LAs:

| **Analytic need**                      | **Data fields needed (examples)**                                            | **Data source(s)**                                 | **Status**              |
|----------------------------------------|------------------------------------------------------------------------------|----------------------------------------------------|-------------------------|
| Label: “became homeless”               | household/person ID, date of presentation, duty (prevention/relief), outcome | **H‑CLIC (your own LA)**, homelessness case system | **Now**                 |
| Housing stability / arrears trajectory | tenancy ID, rent balance, months in arrears, payments over time              | **LA rent accounts for council stock**             | **Now**                 |
| Financial stress / CT trajectory       | CT account ID, arrears balance, recovery stage, summons/LO flags             | **Council Tax billing & arrears**                  | **Now**                 |
| Income / benefit volatility            | HB/CTR entitlement, changes of circumstances, overpayments, end of claim     | **HB/CTR system**                                  | **Now**                 |
| Use of temporary accommodation         | placement start/end, type, household composition, nightly cost               | **Homelessness/TA records**                        | **Now**                 |
| Neighbourhood context                  | LSOA/MSOA, LA, deprivation decile                                            | **Address → ONS/IMD lookup**                       | **Now (via open data)** |

With just these, you can:

-   Define a **label** (“presented as homeless in last X days”).

-   Build **risk features** from arrears / benefit volatility / previous
    presentations.

-   Attach **area context** (IMD, etc.) for analysis and fairness
    checks.

**2.2 Area‑level only (context / calibration, not individual
prediction)**

These shape *where* pressures are highest, and *why*, but not which
specific household:

| **Analytic need**          | **Data fields needed**                                  | **Source**                        | **Status**     |
|----------------------------|---------------------------------------------------------|-----------------------------------|----------------|
| Affordability gap          | LHA rate by BRMA/size; median private rent by area/size | LHA tables, VOA/ONS PRS stats     | **Area‑level** |
| Local income & deprivation | IMD domains, employment, income, health indicators      | ONS/IMD, public health indicators | **Area‑level** |
| Crime / ASB environment    | ASB/crime rate per 1,000 population                     | Police.uk open data               | **Area‑level** |
| Benefit dependence by area | Counts on UC/legacy benefits by LSOA/MSOA               | DWP small‑area stats              | **Area‑level** |

You’d **join these to households via postcode → LSOA/BRMA**, but you
still only use them as **contextual features** (e.g. “this household
lives in an area with high rent–LHA gap and high deprivation”).

**2.3 Future / ambitious multi‑agency feeds (nice, not needed for MVP)**

These relate tightly to your “key causes” and touchpoints, but are
realistically **future phases**:

| **Need / cause**              | **Ideal fields**                              | **Likely source**                 | **Status**                    |
|-------------------------------|-----------------------------------------------|-----------------------------------|-------------------------------|
| Substance misuse / MH         | diagnoses, referrals, MH service contact      | NHS, community MH teams           | **Future (multi‑agency)**     |
| Domestic abuse                | contact with DA services, MARAC flags         | DA charities, Police, social care | **Future (multi‑agency)**     |
| Crime / ASB at person level   | named incidents, repeat callers, ASB warnings | Police systems                    | **Future (sensitive)**        |
| Prison/probation trajectories | release date, supervision status, risk flags  | MoJ / HMPPS / Probation           | **Future (controlled)**       |
| GP / A&E crisis patterns      | A&E attendances, missed appointments          | NHS providers / ICS               | **Future (joint platform)**   |
| Third‑sector touchpoints      | food bank usage, CAB case records             | VCS orgs                          | **Future (local agreements)** |
| HA rent risk                  | HA rent accounts & arrears                    | Housing Associations              | **Future (local agreements)** |

In your schema, these should be **separate “event” tables** that you
define but mark clearly as **not currently populated** – makes it easy
to plug them in later.

**3. Moving towards a schema: entities, sources, and joins**

You said you’re moving to a **schema** describing data source and joins.
A good, realistic starting logical model:

**3.1 Core entities (phase 1)**

1.  household

    -   **Key**: household_id (LA-defined, could be derived from
        CT/HB/tenancy keys).

    -   **Fields**: size, presence of children, primary address, current
        LA.

    -   **Sources**: HB/CTR, CT, H‑CLIC, housing system.

    -   **Joins**:

        -   1–many
            to hclic_case, tenancy, rent_account, ct_account, hb_ctr_claim.

2.  person (optional in v1, but useful)

    -   Key: person_id (pseudonymised).

    -   Fields: age, gender, relationship_to_main_applicant.

    -   Source: H‑CLIC, case systems.

    -   Join: many‑to‑1 with household.

3.  property

    -   Key: uprn or property_id.

    -   Fields: address, LA, tenure type.

    -   Sources: LLPG, housing system.

    -   Joins:

        -   1–many with tenancy, household.

        -   1–1 with area (via postcode/LSOA).

4.  area

    -   Key: lsoa_code (and optionally msoa_code, la_code, brma_code).

    -   Fields: IMD scores, deprivation decile, crime/ASB rate, benefit
        caseload, LHA vs median rent gap, etc.

    -   Sources: ONS/IMD, Police.uk, DWP stats, VOA.

    -   Join: property.postcode → lsoa_code → area.

5.  hclic_case

    -   Key: case_id.

    -   Fields: household_id, date_of_presentation, duty,
        main_reason_for_loss_of_last_home, outcome, support_needs.

    -   Source: H‑CLIC / homelessness system.

    -   Joins:

        -   Many‑to‑1 with household.

        -   Provides **label** for modelling (presented in look‑ahead
            window Y/N).

6.  tenancy

    -   Key: tenancy_id.

    -   Fields: household_id, property_id, start/end dates, tenure type.

    -   Source: Housing management system.

7.  rent_account

    -   Key: rent_account_id.

    -   Fields: tenancy_id, current_balance, months_in_arrears,
        last_payment_date, recovery_stage.

    -   Source: Housing finance module.

    -   Joins:

        -   tenancy_id → tenancy → household.

8.  ct_account

    -   Key: ct_account_id.

    -   Fields: household_id, balance, arrears_flag, summons_flag,
        LO_flag, instalment_plan.

    -   Source: CT system.

9.  hb_ctr_claim

    -   Key: claim_id.

    -   Fields: household_id, benefit_type (HB/CTR), entitlement_amount,
        start/end, recent_changes.

    -   Source: Revenues & Benefits system.

**3.2 Future “event” tables (for your causes/touchpoints)**

You can define them now as stubs:

-   health_event (NHS/ICS feed)

-   justice_event (probation/prison)

-   police_event (ASB/crime person‑level)

-   vcs_touchpoint_event (food bank, CAB, DA service, etc.)

Each with:

-   event_id, person_id or household_id, event_type, event_date, source_system.

**Join strategy:** always via person_id / household_id and
sometimes property_id (for area‑level only).

**4. How this supports your next step**

From here, you can:

1.  **List tables and sources** exactly like:

    -   hclic_case – source: H‑CLIC; join key: household_id.

    -   rent_account – source: Housing system; join via tenancy →
        household.

    -   area – source: IMD, DWP, Police, VOA; join via postcode →
        LSOA/BRMA.

2.  **Flag availability per table:**

    -   Phase‑1 = all the LA + open data tables.

    -   Future = the multi‑agency event tables.
