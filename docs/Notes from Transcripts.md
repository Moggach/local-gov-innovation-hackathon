Here’s a structured run-through of what was actually said in the
sessions, then a concrete spec that Codex could implement as a 3-hour
demo.

**1. Files, order and scope (facts)**

Based on filenames and timestamps, the relevant sessions run in this
order:

1.  **Hackathon 1 – 10:04**  
    – Plenary context: why homelessness, GDS Local, challenge
    statements, data sets, AWS sandboxes, expectations for prototypes
    and presentations.

2.  **Brainstorm – 11:19**  
    – Your team introductions, selection of **Challenge Statement 1**,
    and a detailed discussion that shapes *your* solution concept:
    definitions, data sources, ethics, practical constraints, and what
    the model should do.

3.  **Start of Briefing – 12:08**  
    – (Not visible as a distinct file in the snippets, but it’s
    effectively where you start crystallising the problem and data sets
    – this overlaps with what you asked ChatGPT earlier today about key
    data sources and tracing journeys.)

4.  **Briefing – 12:20**  
    – Wider context from Birmingham, Somerset, AWS and co-pilot/agents
    teams: single-view / data integration, open-source AI work, Sonic
    Brief transcription tool, AWS Bedrock & Quick Suite, segmentation
    and campaigns, and how to use the sandbox.

The **team Brainstorm** is where the actual proposed solution for
Challenge 1 lives; the plenaries and briefings mainly add constraints
and inspiration.

**2. Hierarchical summary of points raised (facts)**

**2.1 Hackathon 1 – Plenary context (10:04)**

**2.1.1 Strategic context**

-   GDS Local has three priorities:

    1.  Integration of local services into the wider GOV.UK product
        suite and app (so citizens can access local as well as national
        services).

    2.  Market reform to help councils get out of restrictive tech
        contracts and improve resilience/value for money.

    3.  Data innovation – better anonymised data sharing and flows to
        improve decision-making and services.

-   Homelessness and rough sleeping are chosen as a high-impact,
    place-based focus, with Birmingham providing a detailed local
    context and pressures.

**2.1.2 Birmingham homelessness pressures and needs**

-   Around **300 homelessness presentations per week**, up c.22%
    year-on-year.

-   59 rough sleepers counted in October (stable monthly snapshot).

-   Over **5,000 households in temporary accommodation**, rising towards
    c.6,000; c.4,700 of these have dependent children – \~11,000
    children nationally, with nearly a **third of all B&B\>6 weeks
    children in England in Birmingham**.

-   Challenges:

    -   Severe loss of social housing (c.110,000 units down to just over
        59,000).

    -   High private-rent levels vs Local Housing Allowance (example:
        £1,100–£1,200 vs £822 for a 3-bed, creating a large
        affordability gap).

    -   Pressure from asylum and migration routes (e.g. family reunions
        going straight into TA at high cost).

    -   Large population growth, high nightly TA costs, and many HMOs
        limiting family-sized accommodation.

-   Needs identified:

    -   Holistic national data in one place, including migration and
        inter-area movements.

    -   Better data on deprivation, benefits, health, employment, debt
        etc., to **forecast who might fall into homelessness** and
        enable earlier intervention.

    -   National and cross-government data on affordable and social
        homes, and where PRS is affordable relative to LHA.

**2.1.3 Challenge statements**

You’re given three challenge statements, formed from participant input
and refined with councils:

1.  **Challenge A (your focus)** – *Using data and AI to predict and
    prevent homelessness*

2.  AI-driven outreach and system efficiency

3.  Data-driven optimisation of temporary accommodation allocation

For Challenge A, the key question is:

*How might we ethically harness data and AI to identify individuals or
households at risk of homelessness earlier, and enable effective,
trusted early interventions?*

**2.1.4 Data sets available**

-   Data catalogue includes (among others):

    -   **H-CLIC homelessness returns** (local authority cases; age,
        household type, some vulnerabilities).

    -   Rough sleeping counts.

    -   Resettlement / Ukrainian & Afghan cohorts.

    -   Social housing data.

    -   Possession/eviction data.

    -   Local authority financial data (spend on services).

    -   DWP benefits data and indices of deprivation.

    -   Geospatial data (Ordnance Survey etc.).

    -   Health and other LA data; London CHAIN data; Birmingham
        case-level data (anonymised).

**2.1.5 Hackathon constraints and expectations**

-   By 17:00 Day 1:

    -   100-word summary of chosen solution added to the shared sheet.

-   By 13:00 Day 2:

    -   Working prototype/demo (recorded or live).

    -   4-minute presentation (2 mins demo, 2 mins context), plus
        questions.

-   Teams should:

    -   Be **problem-driven**, not just “slap AI over a bad process”.

    -   Avoid simply re-badging existing products or refining mature
        work; focus on **new, impactful prototypes**.

**2.2 Brainstorm session – your team’s discussion (11:19)**

**2.2.1 Team composition and roles**

-   Facilitator (Abby from GDS) – manages time, doesn’t design the
    solution.

-   Housing service improvement lead with 12 years’ frontline experience
    (prevention, assessment, advice).

-   Software engineer from Policy in Practice – works on the
    **Low-Income Family Tracker (LIFT)**, which:

    -   Pulls together multiple data sets (DWP, council tax, local
        benefit data etc.) to let LAs see which families are missing out
        on benefits and target support.

-   You (Chris) – AI research engineer / catalyst, with innovation/AI
    systems expertise rather than homelessness domain expertise.

-   Consultant from a digital transformation firm with public-sector and
    policing background, experienced in community safety and access to
    services.

-   Strategic homelessness lead from Essex with \~35 years’
    homelessness/rough-sleeping experience, focusing on prevention.

This gives a mix of **domain experts, data/AI expertise, and service
design/communications**.

**2.2.2 Clarifying the problem & definition of homelessness**

Key points:

-   Homelessness is **not just a housing issue**; it reflects failures
    in health, education, benefits, work, drugs policy and wider
    institutions.

-   Definitions differ across systems:

    -   Health may equate “homelessness” with rough sleepers and hostel
        residents.

    -   H-CLIC is about statutory presentations to local authorities.

    -   Rough sleeping stats are “who is sleeping on the streets
        tonight”.

-   For the hackathon, the team **chooses a working definition**:

    -   *“Anyone who presents to the local authority as homeless”*
        becomes the target outcome the model is trying to **predict and
        prevent**.

-   The team notes:

    -   This misses “sofa surfing” and those who don’t present at all.

    -   But it’s a **pragmatic, measurable outcome** tied to available
        data (H-CLIC).

**2.2.3 Time horizon and journey thinking**

-   There is discussion of:

    -   Looking at **people who present as homeless within the next 56
        days** (housing duty window).

    -   For each of those, **rewinding 6 months** to examine what
        signals were present that might have enabled earlier
        intervention (rent arrears, council tax arrears, benefit
        changes, etc.).

-   The idea is to:

    1.  Use historic data to find **patterns of indicators** before
        > presentations.

    2.  Use those to **predict which current households are on a similar
        > path**, and

    3.  Enable earlier, preventative support to keep people housed.

**2.2.4 Data sources and quality**

-   **H-CLIC data**:

    -   Contains presentations counts, age breakdown of main applicant,
        whether there are children, gender (with some complexities when
        a family is mixed), and flags like under-18 or care leaver.

    -   Has a **c.6-month delay**, so is not real-time.

    -   Aggregated at LA level rather than individual addresses; may
        have some sub-breakdowns (by area/classification) but no
        person-level IDs.

    -   Data quality issues:

        -   Self-reported vulnerabilities; people may rush forms and
            under-report.

        -   Staff under pressure may choose the “first option in the
            list”, introducing bias into categories.

-   **Other desired data sources**:

    -   DWP / Jobcentre data (benefits, sanctions) – seen as more
        accurate and structured.

    -   Rent arrears data (local authority and housing associations).

    -   Council tax arrears.

    -   Prison release / probation data.

    -   Health indicators (A&E, mental health) – but there are major
        data-sharing constraints and likely only area-level aggregates
        would be accessible.

-   **Granularity and geography**:

    -   You’d like to work per household, but realistically you may
        start at a **small-area level** (clusters of \~100 dwellings)
        because of data-sharing constraints.

    -   Birmingham H-CLIC data is “whole-authority”; for targeting,
        you’d need to find ways to map data down to finer geographies
        while staying within privacy constraints.

**2.2.5 Predictive concept and confidence**

The group converges on:

-   Aim: **surface people/households who are not yet homeless but appear
    on a similar path to past presenters**, to allow earlier support.

-   Candidate indicators (over a 6-month look-back):

    -   Rent arrears with council/HA.

    -   Council tax arrears.

    -   Changes in benefits, sanctions.

    -   Prison release / recent offending indicators.

    -   Other markers of financial stress.

-   Confidence and limits:

    -   Everyone recognises that **no model will be perfectly accurate**
        – people are not algorithms.

    -   Confidence must be built through testing and seeing how
        predictive the model actually is, not assumed.

    -   For the hackathon, you can demonstrate something that is
        **directionally useful** and explicitly acknowledge limits.

-   Economics:

    -   There’s an assumption (based on experience) that **earlier
        intervention is cheaper** and more humane, though the group
        notes this is still an assumption that should be evidenced.

    -   One LA is mentioned as having found that a very high proportion
        of homelessness could be avoided with timely action (\~“99%
        could be avoided if done right”) – used as an existence proof
        for the concept of prevention, not as a rigorously proven
        figure.

**2.2.6 Ethics, privacy and fairness**

-   Concerns raised:

    -   **Ethically tricky** to tell an individual, “you are high risk
        of homelessness in six months” without context or existing
        relationship.

    -   Need to avoid stigma and labelling while still enabling targeted
        support.

    -   Data-sharing constraints (especially health data) limit
        person-level targeting; may require working at small-area level
        or through trusted intermediaries.

-   Suggested safeguards:

    -   Work at area/segment level where necessary, not just individual
        lists.

    -   Use the model as **one input among many**, with professional
        judgement and lived experience central.

**2.2.7 How your solution fits the challenge**

-   You explicitly anchor yourselves on **Challenge 1**: *“how we use
    data and AI to predict and prevent homelessness”*.

-   The idea is to:

    -   Combine multiple data streams (H-CLIC, arrears, benefits, etc.)

    -   Analyse trajectories for past presenters (6-month histories)

    -   Use that to **score current households or areas for risk**

    -   Then provide **actionable lists/segments** for early support and
        commissioning decisions.

**2.3 Briefing – 12:20 context relevant to your solution**

**2.3.1 Somerset’s “single view” and open-source stance**

-   Somerset is working towards:

    -   Integrating disparate systems into a **data platform** to create
        a **single view of individuals**.

    -   Ensuring data quality before relying on it for operational
        decisions.

    -   Using that foundation for prevention and agentic AI that can
        “reason across all that data” and inform decisions.

-   They emphasise:

    -   Case document search, summarisation, and temporary accommodation
        recommendation/matching.

    -   Open-source ethos: existing projects are on GitHub; they want
        other councils to iterate and share improvements back
        (public-sector open collaboration).

**2.3.2 Co-pilot and Sonic Brief**

-   Barnet / “Bowser Council” reports:

    -   Organisation-wide co-pilot rollout (\~1,250 licences), with
        focus on fairness, reliability, safety and security.

    -   Main uses: meeting transcription, email summarisation, drafting;
        freeing frontline workers for more face-to-face care.

-   **Sonic Brief**:

    -   Tool to automatically transcribe meetings (in-person or Teams
        recordings).

    -   Applies prompts to create structured case notes, saving staff
        time.

    -   Considered highly cost-effective and used in Targeted Early
        Help; proposed as applicable to homelessness interviews.

**2.3.3 AWS Bedrock & Quick Suite**

-   AWS context:

    -   Bedrock gives access to multiple foundation models (OpenAI,
        Anthropic, Meta, etc.) from one API.

    -   Councils are using AWS for FOI automation, social care and
        homelessness projects.

-   **Quick Suite**:

    -   Low-code flows where staff describe a process in natural
        language and run it over spreadsheets and other inputs.

    -   Used, for example, to triage FOI requests and to run
        segmentation campaigns (e.g. targeting specific groups for
        outreach).

-   For the hackathon:

    -   Each team has its own AWS sandbox until 20:00 the next day, with
        support from solution architects and incubator engineers.

These pieces directly support your idea: **data platform + single view +
AI agents + segmentation + transcription**, all in an open, shareable
pattern.

**3. Agreed problem framing (facts distilled)**

From the above, your team’s working framing is:

1.  **Outcome to predict:**  
    – Households that will **present to the local authority as
    homeless** within a defined time window (e.g. 56 days).

2.  **Overall aim:**  
    – Use combined data to spot **trajectories** toward homelessness
    earlier and **route people to support** that keeps them in their
    homes.

3.  **Time window:**  
    – Look at **six months of prior signals** for those who *did*
    present, derive patterns, and apply them to current data.

4.  **Data ingredients (ideal, recognising constraints):**

    -   H-CLIC presentations.

    -   LA and HA rent arrears.

    -   Council tax arrears.

    -   DWP benefits and sanctions.

    -   Selected health/justice indicators where sharable.

5.  **Ethical framing:**

    -   The system **surfaces risk**, it does not diagnose or decide.

    -   It should support, not replace, professional judgement.

    -   Person- or area-level targeting must be handled with care to
        avoid stigma and privacy breaches.

All of that sits squarely inside Challenge Statement 1.

**4. Demonstrator specification for Codex (analysis / recommendation)**

Now, here’s a concrete spec that a coding agent (Codex) could
realistically build in \~3 hours with documentation, using synthetic or
sample data.

**4.1 Goal of the demonstrator**

Build a small, end-to-end prototype of a **“Homelessness Early-Warning
Explorer”** that:

1.  Ingests **synthetic** household-level data with plausible features
    (arrears, benefits, etc.) plus a flag showing whether the household
    presented as homeless in the last 6 months.

2.  Trains or applies a very simple **transparent risk-scoring
    function** to estimate risk of presentation within the next 56 days.

3.  Provides a browser UI for officers to:

    -   Filter by local authority and small area.

    -   See counts by **risk band** (low / medium / high).

    -   Drill into a list of at-risk households (represented by
        anonymised IDs).

    -   View an **explanation of the score** (which factors
        contributed).

4.  Includes a simple **“what-if” view** for one household, to show how
    support (e.g. reducing rent arrears) could reduce risk.

5.  Ships with a **README and simple architecture diagram**, plus notes
    on ethics and limitations.

**4.2 Non-goals (keep the scope realistic)**

-   No real personal data, no integration to live council systems.

-   No serious ML – use rules or a simple logistic-style formula rather
    than a full training pipeline.

-   No production security, SSO, or multi-tenant design.

-   No attempt to automate decisions or trigger real outreach.

**4.3 Suggested tech stack**

To keep it straightforward for Codex:

-   **Backend/data:**

    -   Python 3.12

    -   FastAPI (or Flask) for a small REST API.

    -   Pandas for in-memory analytics.

    -   A single SQLite DB or just CSVs stored in a /data folder.

-   **Frontend:**

    -   Lightweight React SPA (Vite + TypeScript)  
        OR a simpler FastAPI+Jinja/HTMX template approach if time is
        tight.

-   **Optional “AI” element:**

    -   A small, local “explanation generator” using string templates
        (not actual LLM calls), to keep it runnable anywhere.

**4.4 Data model (synthetic)**

Codex should create sample CSVs in /data:

1.  households.csv

| **column**              | **type** | **description**                                          |
|-------------------------|----------|----------------------------------------------------------|
| household_id            | string   | anonymised ID                                            |
| la_code                 | string   | local authority code (e.g. BIR, ESS)                     |
| small_area_code         | string   | e.g. LSOA or synthetic “area_001”                        |
| has_rent_arrears        | bool/int | 1 if any council/HA arrears ≥1 month                     |
| rent_arrears_months     | int      | months behind (0–6+)                                     |
| has_council_tax_arrears | bool/int | 1 if any CT arrears in last 6 months                     |
| uc_sanction_last_6m     | bool/int | 1 if sanction occurred                                   |
| prison_release_last_6m  | bool/int | 1 if record of release                                   |
| mental_health_flag      | bool/int | synthetic indicator (e.g. 0/1)                           |
| domestic_abuse_flag     | bool/int | 0/1 indicator                                            |
| children_in_household   | int      | number of dependent children                             |
| previous_homelessness   | bool/int | ever presented before                                    |
| presented_last_6m       | bool/int | 1 if this household did present in last 6 months (label) |

2.  areas.csv

| **column**         | **type** | **description** |
|--------------------|----------|-----------------|
| small_area_code    | string   | area ID         |
| la_code            | string   | LA code         |
| population         | int      | synthetic       |
| deprivation_decile | int      | 1–10, synthetic |

Codex should generate synthetic values that roughly match the kinds of
patterns discussed (e.g. higher presentations where arrears and
sanctions are clustered).

**4.5 Risk scoring approach**

Codex should implement a simple, transparent score:

risk_score =

30 \* has_rent_arrears

\+ 5 \* rent_arrears_months

\+ 20 \* has_council_tax_arrears

\+ 20 \* uc_sanction_last_6m

\+ 25 \* prison_release_last_6m

\+ 15 \* mental_health_flag

\+ 15 \* domestic_abuse_flag

\+ 10 \* previous_homelessness

-   Cap risk_score at 100.

-   Convert to bands:

    -   0–29 → **Low**

    -   30–59 → **Medium**

    -   ≥60 → **High**

-   Also compute a **“pattern similarity”** measure to past presenters
    (for demo):

    -   For each household, compare its indicator vector to the average
        vector of presented_last_6m == 1 (e.g. cosine similarity or a
        simple count of matching risk flags).

    -   Display as a “similarity %” in the UI (just explanatory, not
        deeply mathematical).

**4.6 Core API endpoints**

Codex can expose endpoints along these lines:

-   GET /api/summary?la=BIR  
    → returns counts of households by risk band for a given LA, plus
    total households and total labelled presentations.

-   GET /api/areas?la=BIR  
    → returns areas in that LA with counts of high/medium/low risk
    households (for a heatmap/table).

-   GET /api/households?la=BIR&area=area_001&min_risk=60  
    → returns a paged list of high-risk households in that area with
    their scores and key indicators.

-   GET /api/households/{household_id}  
    → returns full feature breakdown, risk score, band, and a **textual
    explanation** constructed from the contributing indicators.

-   POST /api/what_if

    -   Body: JSON of the same features, but with a proposed change
        (e.g. rent_arrears_months: 0).

    -   Response: new risk score + difference.

**4.7 Front-end pages**

1.  **Dashboard (LA-level)**

    -   Inputs:

        -   Dropdown for LA (e.g. Birmingham, Essex – synthetic).

    -   Shows:

        -   KPI tiles: total households, predicted high-risk households
            (count and %), historical presentations (from label).

        -   Bar chart of households by risk band.

        -   Table of areas: small_area_code, high-risk count, medium
            count, deprivation decile.

2.  **Area drill-down**

    -   When user clicks an area:

        -   Table of households (anonymised ID) with:

            -   Risk band & score

            -   Similarity % to past presenters

            -   Indicators (e.g. “rent arrears 3 months; council tax
                arrears; UC sanction; previous homelessness”)

    -   Filters:

        -   Risk band (All / High / Medium)

        -   Presence of specific indicators (checkboxes).

3.  **Household detail & what-if**

    -   Shows:

        -   Risk score, band, similarity %

        -   Key drivers, e.g.:

> “High risk because of 3 months rent arrears, council tax arrears, and
> a benefits sanction in the last 6 months.”

-   Simple what-if panel:

    -   Sliders/inputs for **rent_arrears_months** and
        **has_council_tax_arrears**.

    -   On change, call /api/what_if and show new risk score + band,
        e.g.:

> “If rent arrears were cleared, risk would drop from 78 (High) to 43
> (Medium).”

This makes the prevention narrative concrete: “early intervention that
clears arrears can change risk trajectories.”

**4.8 Ethics and guardrails (in the demo)**

Codex should embed the following into the UI and README:

-   Banner disclaimer:

> “This prototype uses synthetic data. In real use, all outputs would
> need careful ethical review and must support, not replace,
> professional judgement.”

-   Design choices:

    -   **No protected characteristics** (race, religion, etc.) in the
        feature set.

    -   Optionally, show a **“risk by deprivation decile”** view to
        illustrate how you’d monitor for unintended bias at area level.

    -   Emphasise that the model’s purpose is to **surface possible
        need**, not to withdraw help or impose sanctions.

**4.9 Repository & documentation structure**

Codex can structure the repo as:

/README.md

/docs/

architecture.md

ethics_and_limitations.md

data_schema.md

demo_script.md

/backend/

app.py \# FastAPI entry

models.py \# Pydantic models

data_loader.py \# load CSVs into pandas

risk_model.py \# scoring and similarity

routers/

summary.py

areas.py

households.py

what_if.py

/data/

households.csv

areas.csv

/frontend/

(React or templates)

src/

App.tsx

pages/

Dashboard.tsx

AreaView.tsx

HouseholdView.tsx

Key docs:

-   **README.md**

    -   What the project is, how it supports Challenge 1.

    -   How to run backend and frontend.

    -   Quick screenshot(s) or description of key views.

-   **architecture.md**

    -   Short description of data flow:

        -   CSV → pandas → risk scoring → API → UI.

    -   Simple Mermaid diagram, e.g.:

    -   flowchart LR

    -   Data\[(CSV data)\] --\> Loader

    -   Loader --\> RiskModel

    -   RiskModel --\> API\[FastAPI\]

    -   API --\> UI\[Web UI\]

-   **ethics_and_limitations.md**

    -   List of assumptions.

    -   Explanation that real deployments need real DPIAs, equality
        impact assessments, data-sharing agreements, model validation,
        etc.

-   **demo_script.md**

    -   Step-by-step script for a 4-minute pitch:

        -   Problem.

        -   Data & risk model concept.

        -   Live walkthrough: dashboard → area → household → what-if.

        -   How it could plug into real LA data platforms and AWS
            tooling (Bedrock, Quick Suite) later.

**4.10 Fit to problem statement 1**

This demonstrator:

-   **Predicts risk** using indicators like rent arrears, council tax
    arrears, benefits data, and previous homelessness, aligning with the
    challenge focus.

-   **Links data across services** (synthetically) to build a holistic
    view of vulnerable households/areas.

-   Enables **earlier, coordinated interventions** by surfacing
    people/areas on trajectories similar to past presenters and showing
    how specific support (e.g. addressing arrears) might change risk.

-   Embeds an ethical posture consistent with the discussions:
    transparent logic, acknowledgement of limits, and emphasis on human
    judgement.

If you like, in a next step I can turn this into a literal README.md and
architecture.md ready to drop into a repo and feed straight to Codex.
