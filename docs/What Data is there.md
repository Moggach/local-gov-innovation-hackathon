Short answer:  
Almost **all** of what you listed exists **somewhere** in government
systems, but **very little** of it is (a) open at person-level or (b)
easily linkable across organisations today. For a real system you’re
mostly talking about **LA-internal data + some securely-shared central
government feeds**, with everything else as **open small-area
aggregates** for context.

I’ll go source by source and split into:

-   **What exists and in what form**

-   **What’s realistically accessible to a local authority**

-   **What’s open / public vs what needs data-sharing agreements**

**1. H-CLIC (Homelessness Case Level Information Collection)**

**What it is**

-   National **case-level data return** that English local authorities
    submit to DLUHC on statutory homelessness and prevention/relief
    activity.

-   Includes household characteristics, support needs, reasons for loss
    of last settled home, outcomes, etc.

**Availability**

-   **Locally (LA):**

    -   Your own H-CLIC data (from your housing system) is fully
        available to you at **record level**, because you generate it.

    -   This is the richest, cleanest “ground truth” for *who actually
        presented as homeless* and why.

-   **Nationally:**

    -   DLUHC publishes **aggregated H-CLIC stats** by LA (and some
        breakdowns) as official statistics. These are open but not at
        person level.

**For your model**

-   You can **definitely** use your own LA’s case-level H-CLIC (already
    in-house).

-   You can use published aggregations for benchmarking / context, but
    not for person-level prediction.

**2. NHS / health data**

**What exists**

-   Very rich case-level data: GP, A&E, admissions (HES), mental health
    and community services, prescribing, etc.

-   Held centrally by **NHS England / NHS Business Services Authority**
    and locally by ICBs/Trusts/GP practices.

**Availability to an LA**

-   Direct access to identifiable health data is **heavily restricted**
    (UK GDPR + common law duty of confidentiality).

-   Access normally requires:

    -   A clear, lawful purpose (e.g. direct care, public health,
        specific research under approval).

    -   DPIA, data-sharing agreements, sometimes CAG / ethics approvals.

-   Realistically:

    -   For day-to-day **service planning / prevention**, LAs often get
        **small-area aggregate health indicators** (e.g. emergency
        admissions rates, mental health prevalence, JSNA indicators) via
        public health teams or open sources like Fingertips.

    -   Individual-level linkage (e.g. “this person had A&E admissions”)
        is possible only under **tight, locally-agreed sharing
        arrangements** and usually within an integrated care system or
        joint LA–NHS analytics unit.

**For your model**

-   **Short term / demo:** Treat NHS as **contextual aggregates** at
    LSOA/MSOA (e.g. high admissions / high mental-health burden).

-   **Longer term real system:** Possible to get **pseudonymised
    record-level feeds** into a joint data platform under strict
    governance, but that’s a major project in itself.

**3. DWP (benefits, UC, sanctions etc.)**

**What exists**

-   Central DWP systems hold detailed data on UC, legacy benefits,
    sanctions, etc.

-   DWP also publishes a lot of **statistical series** (small-area
    benefit counts, sanctions statistics, etc.).

**Availability to an LA**

-   **Open / published:**

    -   Small-area benefit caseload statistics (e.g. number on UC, ESA,
        etc. by LSOA/MSOA).

    -   Some sanction stats, but usually not at person level.

-   **Data-sharing to LAs:**

    -   There are existing **data-sharing gateways** (e.g. for Council
        Tax Reduction/Housing Benefit administration, fraud, local
        welfare schemes).

    -   For general analytics / prevention you’d need a **formal
        data-sharing agreement** with DWP supported by a legal gateway
        (Digital Economy Act, etc.) and robust governance.

**For your model**

-   You can **readily use**:

    -   Open counts by area (e.g. high UC claimant density, high
        sanction rate).

-   You **cannot** freely pull individual-level UC/sanction history into
    an LA data lake without a carefully-agreed arrangement.

**4. Probation / Prison release (MoJ, HMPPS)**

**What exists**

-   MoJ/HMPPS hold detailed offender management and prison records,
    including release dates and conditions.

-   Some statistics are published (reoffending rates, prison population
    etc.).

**Availability to an LA**

-   **Open:** High-level stats only, not useful for targeting
    households.

-   **Data sharing:**

    -   In practice, there are local **Multi-Agency Public Protection
        Arrangements (MAPPA)** and multi-agency panels (IOM, MARAC,
        etc.) where some information sharing happens.

    -   Systematic, person-level feed of “everyone released who might
        become homeless” into an LA risk model is **not the norm** and
        would again need strong legal/gov arrangements.

**For your model**

-   For a realistic **phasing**, treat prison/probation data as:

    -   Initially: **not available for automated linkage**, but
        **flagged as a desired future input** via multi-agency
        agreements.

    -   You can still acknowledge “recent prison release” as an *ideal
        indicator* in the spec, while being honest that it is not
        readily available at scale today.

**5. Police – ASB records**

**What exists**

-   Police forces hold incident-level data on ASB, crime, calls for
    service etc.

-   Some **open crime data** (including ASB) is published at street/LSOA
    level (Police.uk API / open data).

**Availability to an LA**

-   **Open / public:**

    -   Anonymised ASB/crime incidents with approximate location and
        category.

    -   You can use these as **small-area risk context** (e.g. “high ASB
        neighbourhoods”).

-   **Person-level:**

    -   Named incident data is sensitive and subject to policing,
        safeguarding and criminal justice restrictions.

    -   Sharing into a generic LA analytics platform will require
        specific agreements (which may exist for particular partnerships
        but not in a bulk, general way).

**For your model**

-   Practically available **now**:

    -   **Area-level ASB density** (incidents per 1,000 population) as a
        contextual feature.

-   Not realistically available quickly:

    -   *Individual-level* “this household has ASB history” as a bulk
        feed.

**6. Rent records (LA and Housing Associations)**

**What exists**

-   For LA stock:

    -   Full **tenancy and rent account** records (arrears, payment
        history) live in the LA’s housing management system.

-   For Housing Associations:

    -   Each HA has its own systems; not automatically shared with the
        LA.

**Availability to an LA**

-   **LA stock:**

    -   Fully available internally (subject to good information
        governance): arrears flags, months behind, tenancy type, etc.

-   **HA stock:**

    -   Requires **bespoke data-sharing agreements** with each provider.

    -   Some areas have created joint dashboards or early-warning
        schemes with major RPs; others haven’t.

**For your model**

-   **Immediately usable:** LA rent arrears and tenancy data – this is
    one of the most realistic, high-value predictors you actually have.

-   **Future expansion:** Structured feeds or periodic extracts from
    major HAs in the area.

**7. Housing Benefit / Council Tax Reduction**

*(Distinct from UC housing cost element; this is LA-administered
HB/CTR.)*

**What exists**

-   LA revenues and benefits system holds:

    -   Claim details, awards, changes in circumstances, overpayments,
        some DWP income signals, etc.

**Availability to an LA**

-   Fully available **internally**, subject to data protection and
    role-based access.

-   Already used to administer HB/CTR, fraud detection, etc.

**For your model**

-   Very realistic to use:

    -   **HB/CTR awards**, changes in entitlement, overpayments, and
        link to rent arrears/Council Tax arrears.

-   This is exactly the kind of data that tools like Policy in
    Practice’s LIFT already aggregate for targeting low-income families.

**8. Average rent levels & gap to Local Housing Allowance (LHA)**

**What exists**

-   **Local Housing Allowance rates**:

    -   Set by Broad Rental Market Areas (BRMAs), published by DWP/VOA.

-   **Private rent levels**:

    -   VOA/ONS publish **Private Rental Market Statistics** (averages,
        percentiles by property size and area).

**Availability**

-   **Open data**:

    -   LHA rates by BRMA, property size – fully public.

    -   Median rents and distributions at LA or broad-area level – fully
        public.

**For your model**

-   Very easy to use as:

    -   A **contextual feature by area**: “affordability gap = median
        local rent – applicable LHA rate”.

    -   This helps explain why some areas generate more homelessness
        pressure than others even with similar household
        characteristics.

**9. “How much is actually available?” – a practical summary**

If we focus on **what a typical English unitary/metropolitan authority
could realistically have in a homelessness-prevention data platform
within 6–12 months**, it roughly looks like:

**9.1 Immediately available *inside the council***

-   **H-CLIC case data** (their own returns).

-   **LA rent accounts** and tenancy data (for council stock).

-   **Housing Benefit / Council Tax Reduction** data.

-   **Council Tax arrears** and payments.

-   **Temporary accommodation placements** and costs.

-   Internal **social care** case data (though this often has its own
    sharing constraints internally).

These can all be used at **household or person level** if governance is
in place.

**9.2 Available with partnership work but not “just there”**

-   **Housing association rent data** – requires local agreements.

-   **Integrated health feeds** – typically requires ICS-level projects
    and joint governance.

-   **Probation / prison release indicators** – possible via
    multi-agency partnerships; not a routine analytics feed.

-   **Police / ASB at person level** – multi-agency panel settings; bulk
    analytics feeds are rare and sensitive.

In your spec, these are best treated as **“future desired inputs”**
rather than assumed current feeds.

**9.3 Open / small-area contextual data (easy wins)**

All of the below can be pulled in *today* without special agreements:

-   **Aggregated H-CLIC and homelessness stats** by LA.

-   **LHA rates** and **private rental market stats** (gap to LHA).

-   **Indices of Multiple Deprivation** and other ONS small-area
    indicators.

-   **Police.uk crime/ASB data** at street/LSOA level.

-   **DWP benefit caseload statistics** at small-area level.

These are very good for:

-   Explaining **why** risk is higher in some areas.

-   Calibrating the model and giving context (“we’re seeing high risk in
    areas with big affordability gaps and high deprivation”).

**10. What this means for your demonstrator spec**

For the **3-hour Codex demo** and for a realistic **phase 1 real-world
build**, I’d frame it like this:

1.  **Core, realistically available household-level inputs (phase 1):**

    -   Own LA’s **H-CLIC** (for labels and reasons).

    -   **Rent arrears** (LA tenancies).

    -   **Council Tax arrears**.

    -   **Local HB/CTR data** (entitlement, changes).

2.  **Contextual open data (area-level):**

    -   **LHA vs median rent** gap by area/BRMA.

    -   **Deprivation indices**.

    -   **ASB/crime density** from open Police data.

3.  **Ambition / future-phase inputs:**

    -   HA rent data, NHS indicators, DWP UC sanctions, probation/prison
        release, person-level ASB.

If you’d like, I can turn this into a **two-column table** (Available
now / Needs agreement) that drops straight into your slide deck or
README for the prototype.
