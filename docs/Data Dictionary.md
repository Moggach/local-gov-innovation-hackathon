Below is a **complete data dictionary** for the schema we’ve been
designing:

-   **Core operational tables** (phase 1 – real data now)

-   **Derived / modelling tables**

-   **Future multi‑agency “event” tables** (placeholders for later)

**0. Conventions**

-   **Types**: string, integer, decimal, boolean, date, datetime, enum

-   **Phase**:

    -   P1 = realistic in phase 1 (LA + open data)

    -   F = future / multi‑agency

**1. **household

**Purpose:** Canonical record for a household in scope of prevention /
homelessness analytics.  
**Grain:** One row per household.  
**PK:** household_id

| **Field**               | **Type** | **Required** | **Phase** | **Description / Notes**                                                  | **Source**                             |
|-------------------------|----------|--------------|-----------|--------------------------------------------------------------------------|----------------------------------------|
| household_id            | string   | Yes          | P1        | Anonymised unique identifier for the household across systems.           | Derived/ID mapping (HB/CTR/CT/housing) |
| primary_person_id       | string   | No           | P1        | Identifier of main applicant / liable person (if person table used).     | H‑CLIC / CT / HB                       |
| current_address_uprn    | string   | No           | P1        | UPRN of current main address.                                            | LLPG / CT / HB                         |
| current_postcode        | string   | No           | P1        | Postcode of current address.                                             | CT / HB / housing                      |
| la_code                 | string   | Yes          | P1        | Local authority code responsible for the household.                      | LA config                              |
| household_size          | integer  | No           | P1        | Total number of people in household.                                     | HB / H‑CLIC                            |
| num_children            | integer  | No           | P1        | Number of dependent children.                                            | HB / H‑CLIC                            |
| tenure_type             | enum     | No           | P1        | e.g. LA_TENANT, HA_TENANT, PRS, OWNER, TEMP_ACCOM, OTHER.                | Housing / H‑CLIC                       |
| created_at              | datetime | Yes          | P1        | When the household record was first created.                             | System                                 |
| updated_at              | datetime | Yes          | P1        | Last update timestamp.                                                   | System                                 |
| data_completeness_score | decimal  | No           | P1        | 0–1 score indicating how much core data is present (rent, CT, HB, etc.). | Derived                                |
| data_completeness_band  | enum     | No           | P1        | LOW, MEDIUM, HIGH derived from score thresholds.                         | Derived                                |

**2. **person** (optional but useful)**

**Purpose:** Represents individuals where person‑level data is needed.  
**Grain:** One row per person.  
**PK:** person_id

| **Field**         | **Type** | **Required** | **Phase** | **Description**                            | **Source**  |
|-------------------|----------|--------------|-----------|--------------------------------------------|-------------|
| person_id         | string   | Yes          | P1        | Pseudonymised individual ID.               | Derived     |
| household_id      | string   | Yes          | P1        | Links person to their household.           | Derived     |
| role_in_household | enum     | No           | P1        | MAIN_APPLICANT, PARTNER, DEPENDENT, OTHER. | H‑CLIC / HB |
| date_of_birth     | date     | No           | P1        | DOB if available.                          | H‑CLIC / HB |
| age               | integer  | No           | P1        | Age in years (derived).                    | Derived     |
| gender            | enum     | No           | P1        | As recorded in source systems.             | H‑CLIC      |
| created_at        | datetime | Yes          | P1        | Record created timestamp.                  | System      |
| updated_at        | datetime | Yes          | P1        | Record updated timestamp.                  | System      |

**3. **property

**Purpose:** Physical dwellings (used to join to area‑level context).  
**Grain:** One row per property.  
**PK:** property_id or uprn

| **Field**      | **Type** | **Req** | **Phase** | **Description**                                     | **Source**               |
|----------------|----------|---------|-----------|-----------------------------------------------------|--------------------------|
| property_id    | string   | Yes     | P1        | Internal property identifier (if UPRN not primary). | LLPG / housing           |
| uprn           | string   | No      | P1        | Unique Property Reference Number.                   | LLPG                     |
| address_line_1 | string   | No      | P1        | Main address line.                                  | LLPG                     |
| postcode       | string   | No      | P1        | Postcode.                                           | LLPG                     |
| la_code        | string   | Yes     | P1        | Local authority code.                               | LLPG                     |
| tenure_type    | enum     | No      | P1        | LA_STOCK, HA_STOCK, PRS, OWNER, OTHER.              | Housing / LLPG           |
| lsoa_code      | string   | No      | P1        | Lower layer super output area.                      | ONS lookup from postcode |
| msoa_code      | string   | No      | P1        | Middle layer super output area.                     | ONS lookup               |
| brma_code      | string   | No      | P1        | Broad Rental Market Area for LHA.                   | VOA/DWP lookup           |
| created_at     | datetime | Yes     | P1        | Created timestamp.                                  | System                   |
| updated_at     | datetime | Yes     | P1        | Updated timestamp.                                  | System                   |

**4. **area

**Purpose:** Area‑level context and indicators (IMD, crime, benefits,
affordability).  
**Grain:** One row per LSOA (optionally also MSOA/LA level).  
**PK:** lsoa_code

| **Field**                | **Type** | **Req** | **Phase** | **Description**                                              | **Source**          |
|--------------------------|----------|---------|-----------|--------------------------------------------------------------|---------------------|
| lsoa_code                | string   | Yes     | P1        | LSOA identifier.                                             | ONS                 |
| lsoa_name                | string   | No      | P1        | LSOA name.                                                   | ONS                 |
| msoa_code                | string   | No      | P1        | Parent MSOA.                                                 | ONS                 |
| la_code                  | string   | Yes     | P1        | Local authority code.                                        | ONS                 |
| imd_score                | decimal  | No      | P1        | Overall IMD score.                                           | MHCLG/ONS           |
| imd_decile               | integer  | No      | P1        | 1–10 (1 most deprived).                                      | Derived             |
| income_decile            | integer  | No      | P1        | Income domain decile.                                        | IMD                 |
| employment_decile        | integer  | No      | P1        | Employment domain decile.                                    | IMD                 |
| health_decile            | integer  | No      | P1        | Health domain decile.                                        | IMD                 |
| crime_rate_per_1k        | decimal  | No      | P1        | Crime rate per 1,000 pop (all crime or selected categories). | Police.uk + ONS pop |
| asb_rate_per_1k          | decimal  | No      | P1        | ASB incident rate per 1,000.                                 | Police.uk           |
| uc_claimants             | integer  | No      | P1        | Number of UC claimants in LSOA.                              | DWP stats           |
| hb_claimants             | integer  | No      | P1        | HB claimants count (if available).                           | DWP/LA stats        |
| median_private_rent_2bed | decimal  | No      | P1        | Monthly median rent for 2‑bed PRS properties.                | VOA/ONS             |
| lha_2bed                 | decimal  | No      | P1        | Monthly LHA rate for 2‑bed in BRMA.                          | DWP                 |
| affordability_gap_2bed   | decimal  | No      | P1        | median_private_rent_2bed - lha_2bed.                         | Derived             |
| population               | integer  | No      | P1        | Resident population.                                         | ONS                 |
| created_at               | datetime | Yes     | P1        | Created timestamp.                                           | System              |
| updated_at               | datetime | Yes     | P1        | Updated timestamp.                                           | System              |

*(You can copy this pattern for 1‑bed, 3‑bed etc. or keep it to the
sizes you care about.)*

**5. **hclic_case

**Purpose:** Statutory homelessness / prevention / relief cases.  
**Grain:** One row per homelessness case.  
**PK:** hclic_case_id

| **Field**                    | **Type** | **Req** | **Phase** | **Description**                                                                  | **Source**      |
|------------------------------|----------|---------|-----------|----------------------------------------------------------------------------------|-----------------|
| hclic_case_id                | string   | Yes     | P1        | Unique case ID from homelessness system / H‑CLIC export.                         | H‑CLIC          |
| household_id                 | string   | Yes     | P1        | Linked household.                                                                | Derived mapping |
| la_code                      | string   | Yes     | P1        | Local authority responsible.                                                     | H‑CLIC          |
| date_of_presentation         | date     | Yes     | P1        | Date applicant approached LA.                                                    | H‑CLIC          |
| assessment_decision          | enum     | No      | P1        | Outcome of homelessness assessment.                                              | H‑CLIC          |
| duty_type                    | enum     | No      | P1        | PREVENTION, RELIEF, MAIN_DUTY, etc.                                              | H‑CLIC          |
| household_type               | enum     | No      | P1        | e.g. SINGLE, COUPLE, FAMILY, OTHER.                                              | H‑CLIC          |
| has_children                 | boolean  | No      | P1        | True if any dependent children.                                                  | H‑CLIC          |
| main_applicant_age_band      | string   | No      | P1        | Age band of main applicant.                                                      | H‑CLIC          |
| main_applicant_gender        | enum     | No      | P1        | Recorded gender of main applicant.                                               | H‑CLIC          |
| reason_for_loss_of_last_home | enum     | No      | P1        | Standard H‑CLIC reasons; includes PRS eviction, relationship breakdown, DA, etc. | H‑CLIC          |
| support_needs_flags          | string   | No      | P1        | Multi‑select list (substance misuse, MH, DA, etc.).                              | H‑CLIC          |
| previously_rough_sleeping    | boolean  | No      | P1        | Whether household has rough sleeping history.                                    | H‑CLIC          |
| date_duty_ended              | date     | No      | P1        | Date duty came to an end.                                                        | H‑CLIC          |
| duty_end_outcome             | enum     | No      | P1        | e.g. ACCOM_SECURED, REFUSED, LOST_CONTACT, etc.                                  | H‑CLIC          |
| created_at                   | datetime | Yes     | P1        | Record created.                                                                  | System          |
| updated_at                   | datetime | Yes     | P1        | Record updated.                                                                  | System          |

*(You can add any other standard H‑CLIC fields you use; above are the
key ones for modelling.)*

**6. **tenancy

**Purpose:** Represents housing tenancies (mainly LA stock in P1).  
**Grain:** One row per tenancy.  
**PK:** tenancy_id

| **Field**      | **Type** | **Req** | **Phase** | **Description**                       | **Source**     |
|----------------|----------|---------|-----------|---------------------------------------|----------------|
| tenancy_id     | string   | Yes     | P1        | Unique tenancy identifier.            | Housing system |
| household_id   | string   | Yes     | P1        | Linked household.                     | Derived        |
| property_id    | string   | Yes     | P1        | Linked property.                      | Housing system |
| tenure_type    | enum     | Yes     | P1        | e.g. SECURE, INTRODUCTORY, TEMP, etc. | Housing        |
| start_date     | date     | Yes     | P1        | Start of tenancy.                     | Housing        |
| end_date       | date     | No      | P1        | End date (if ended).                  | Housing        |
| current_status | enum     | No      | P1        | ACTIVE, ENDED, TRANSFERRED, etc.      | Housing        |
| created_at     | datetime | Yes     | P1        | Record created.                       | System         |
| updated_at     | datetime | Yes     | P1        | Record updated.                       | System         |

**7. **rent_account

**Purpose:** Financial status of council rent accounts.  
**Grain:** One row per rent account (per tenancy).  
**PK:** rent_account_id

| **Field**           | **Type** | **Req** | **Phase** | **Description**                                   | **Source**      |
|---------------------|----------|---------|-----------|---------------------------------------------------|-----------------|
| rent_account_id     | string   | Yes     | P1        | Unique rent account identifier.                   | Housing finance |
| tenancy_id          | string   | Yes     | P1        | Linked tenancy.                                   | Housing         |
| household_id        | string   | Yes     | P1        | Linked household (via tenancy).                   | Derived         |
| current_balance     | decimal  | Yes     | P1        | Current account balance (+ve = arrears).          | Housing         |
| months_in_arrears   | integer  | No      | P1        | Number of months equivalent arrears.              | Derived         |
| arrears_flag        | boolean  | Yes     | P1        | True if account in arrears above threshold.       | Derived         |
| recovery_stage      | enum     | No      | P1        | e.g. NONE, WARNING, NOSP, COURT, EVICTION_BOOKED. | Housing         |
| last_payment_date   | date     | No      | P1        | Date of last payment.                             | Housing         |
| last_payment_amount | decimal  | No      | P1        | Amount of last payment.                           | Housing         |
| created_at          | datetime | Yes     | P1        | Created.                                          | System          |
| updated_at          | datetime | Yes     | P1        | Updated.                                          | System          |

**8. **ct_account** (Council Tax)**

**Purpose:** CT billing and arrears for households.  
**Grain:** One row per CT account.  
**PK:** ct_account_id

| **Field**           | **Type** | **Req** | **Phase** | **Description**                                             | **Source** |
|---------------------|----------|---------|-----------|-------------------------------------------------------------|------------|
| ct_account_id       | string   | Yes     | P1        | Unique Council Tax account ID.                              | CT system  |
| household_id        | string   | Yes     | P1        | Linked household.                                           | Derived    |
| property_id         | string   | No      | P1        | Linked property (where available).                          | CT system  |
| current_balance     | decimal  | Yes     | P1        | Account balance (+ve = arrears).                            | CT system  |
| arrears_flag        | boolean  | Yes     | P1        | True if arrears above threshold.                            | Derived    |
| recovery_stage      | enum     | No      | P1        | NONE, REMINDER, SUMMONS, LIABILITY_ORDER, ENFORCEMENT, etc. | CT         |
| last_payment_date   | date     | No      | P1        | Last payment date.                                          | CT         |
| last_payment_amount | decimal  | No      | P1        | Last payment amount.                                        | CT         |
| created_at          | datetime | Yes     | P1        | Created.                                                    | System     |
| updated_at          | datetime | Yes     | P1        | Updated.                                                    | System     |

**9. **hb_ctr_claim

**Purpose:** Housing Benefit / Council Tax Reduction claims.  
**Grain:** One row per claim.  
**PK:** claim_id

| **Field**            | **Type** | **Req** | **Phase** | **Description**                                 | **Source**          |
|----------------------|----------|---------|-----------|-------------------------------------------------|---------------------|
| claim_id             | string   | Yes     | P1        | Unique HB/CTR claim identifier.                 | Revenues & Benefits |
| household_id         | string   | Yes     | P1        | Linked household.                               | Derived             |
| benefit_type         | enum     | Yes     | P1        | HB, CTR, OTHER_LOCAL_SCHEME.                    | Rev & Bens          |
| start_date           | date     | Yes     | P1        | Claim start date.                               | Rev & Bens          |
| end_date             | date     | No      | P1        | Claim end date (if closed).                     | Rev & Bens          |
| current_award_amount | decimal  | No      | P1        | Weekly or monthly award.                        | Rev & Bens          |
| last_change_date     | date     | No      | P1        | Last change in circumstances/award.             | Rev & Bens          |
| change_reason        | string   | No      | P1        | Free text / code describing last change reason. | Rev & Bens          |
| overpayment_flag     | boolean  | No      | P1        | True if active overpayment.                     | Rev & Bens          |
| created_at           | datetime | Yes     | P1        | Created.                                        | System              |
| updated_at           | datetime | Yes     | P1        | Updated.                                        | System              |

**10. **household_risk_feature** (analytic)**

**Purpose:** Wide feature table built from core data for modelling.  
**Grain:** One row per household per reference date.  
**PK:** Composite (household_id, as_of_date)

| **Field**                   | **Type** | **Req** | **Phase** | **Description**                                                                 | **Source**        |
|-----------------------------|----------|---------|-----------|---------------------------------------------------------------------------------|-------------------|
| household_id                | string   | Yes     | P1        | Linked household.                                                               | Derived           |
| as_of_date                  | date     | Yes     | P1        | Date at which features are computed.                                            | Derived           |
| rent_arrears_flag           | boolean  | No      | P1        | True if rent arrears above threshold.                                           | From rent_account |
| rent_months_in_arrears      | integer  | No      | P1        | Months of rent arrears.                                                         | rent_account      |
| ct_arrears_flag             | boolean  | No      | P1        | CT arrears above threshold.                                                     | ct_account        |
| ct_recovery_stage_score     | integer  | No      | P1        | Numeric version of recovery stage (e.g. 0–4).                                   | Derived           |
| hb_active_flag              | boolean  | No      | P1        | Active HB claim.                                                                | hb_ctr_claim      |
| ctr_active_flag             | boolean  | No      | P1        | Active CTR claim.                                                               | hb_ctr_claim      |
| recent_benefit_change_flag  | boolean  | No      | P1        | Change in HB/CTR in last N days.                                                | Derived           |
| previous_homelessness_flag  | boolean  | No      | P1        | Any H‑CLIC case in past X years.                                                | hclic_case        |
| num_hclic_cases_last_2y     | integer  | No      | P1        | Count of cases in last 2 years.                                                 | hclic_case        |
| area_imd_decile             | integer  | No      | P1        | IMD decile for household’s LSOA.                                                | area              |
| area_affordability_gap_2bed | decimal  | No      | P1        | Affordability gap from area table.                                              | area              |
| area_asb_rate_per_1k        | decimal  | No      | P1        | ASB rate in LSOA.                                                               | area              |
| data_completeness_score     | decimal  | No      | P1        | Feature-level completeness score.                                               | Derived           |
| label_presented_within_56d  | boolean  | No      | P1        | For training: true if a new H‑CLIC case occurs within 56 days after as_of_date. | Derived           |

**11. **household_risk_score

**Purpose:** Latest risk score per household for use in UI /
operations.  
**Grain:** One row per household (latest), or household per scoring
run.  
**PK:** (household_id, scored_at) or just household_id for current.

| **Field**              | **Type** | **Req** | **Phase** | **Description**                                                                                                 | **Source**  |
|------------------------|----------|---------|-----------|-----------------------------------------------------------------------------------------------------------------|-------------|
| household_id           | string   | Yes     | P1        | Linked household.                                                                                               | Derived     |
| scored_at              | datetime | Yes     | P1        | Timestamp of scoring.                                                                                           | Risk engine |
| risk_score             | integer  | Yes     | P1        | 0–100 numeric score.                                                                                            | Risk engine |
| risk_band              | enum     | Yes     | P1        | LOW, MEDIUM, HIGH.                                                                                              | Derived     |
| pattern_similarity_pct | decimal  | No      | P1        | Similarity (0–100) to typical pre‑homelessness pattern.                                                         | Derived     |
| data_completeness_band | enum     | No      | P1        | LOW, MEDIUM, HIGH.                                                                                              | Derived     |
| top_risk_drivers       | string   | No      | P1        | Short machine‑generated explanation (e.g. “3 months rent arrears; CT at summons stage; previous homelessness”). | Derived     |
| explanation_version    | string   | No      | P1        | Version of explanation template/logic.                                                                          | Derived     |

**12. **area_risk_summary

**Purpose:** Data for hotspot maps and dashboards.  
**Grain:** One row per area (LSOA) per scoring run.  
**PK:** (lsoa_code, as_of_date)

| **Field**              | **Type** | **Req** | **Phase** | **Description**                     | **Source**           |
|------------------------|----------|---------|-----------|-------------------------------------|----------------------|
| lsoa_code              | string   | Yes     | P1        | Linked area.                        | area                 |
| as_of_date             | date     | Yes     | P1        | Date of aggregation.                | Derived              |
| num_households         | integer  | Yes     | P1        | Total households in area (in data). | Derived              |
| num_high_risk          | integer  | Yes     | P1        | Households with risk_band = HIGH.   | household_risk_score |
| num_medium_risk        | integer  | Yes     | P1        | risk_band = MEDIUM.                 | Derived              |
| num_low_risk           | integer  | Yes     | P1        | risk_band = LOW.                    | Derived              |
| pct_high_risk          | decimal  | No      | P1        | num_high_risk / num_households.     | Derived              |
| imd_decile             | integer  | No      | P1        | Copied from area table.             | area                 |
| affordability_gap_2bed | decimal  | No      | P1        | From area table.                    | area                 |
| created_at             | datetime | Yes     | P1        | Created.                            | System               |

**13. Future “event” tables (phase F)**

These are placeholders for multi‑agency feeds you might add later. I’ll
define them generically.

**13.1 **health_event

| **Field**       | **Type** | **Req** | **Phase** | **Description**                               |
|-----------------|----------|---------|-----------|-----------------------------------------------|
| health_event_id | string   | Yes     | F         | Unique event ID.                              |
| person_id       | string   | Yes     | F         | Linked person.                                |
| event_date      | date     | Yes     | F         | Date of interaction.                          |
| event_type      | enum     | Yes     | F         | e.g. AE_ATTENDANCE, MH_ASSESSMENT, DNAS_APPT. |
| provider_code   | string   | No      | F         | Code for Trust/GP/etc.                        |
| severity_code   | string   | No      | F         | Local severity triage code.                   |
| source_system   | string   | Yes     | F         | Origin system identifier.                     |
| ingested_at     | datetime | Yes     | F         | Ingestion timestamp.                          |

**13.2 **justice_event** (prison/probation)**

| **Field**        | **Type** | **Req** | **Phase** | **Description**                       |
|------------------|----------|---------|-----------|---------------------------------------|
| justice_event_id | string   | Yes     | F         | Unique event ID.                      |
| person_id        | string   | Yes     | F         | Linked person.                        |
| event_date       | date     | Yes     | F         | Date of event.                        |
| event_type       | enum     | Yes     | F         | PRISON_RELEASE, COMMUNITY_ORDER, etc. |
| risk_flag        | string   | No      | F         | Relevant risk marker, if allowed.     |
| source_system    | string   | Yes     | F         | MoJ/HMPPS system ID.                  |
| ingested_at      | datetime | Yes     | F         | Ingestion timestamp.                  |

**13.3 **police_event** (person‑level)**

| **Field**       | **Type** | **Req** | **Phase** | **Description**              |
|-----------------|----------|---------|-----------|------------------------------|
| police_event_id | string   | Yes     | F         | Unique event ID.             |
| person_id       | string   | Yes     | F         | Linked person.               |
| event_date      | date     | Yes     | F         | Date of incident.            |
| event_type      | enum     | Yes     | F         | ASB, DOMESTIC_INCIDENT, etc. |
| location_lsoa   | string   | No      | F         | LSOA of incident.            |
| source_system   | string   | Yes     | F         | Police system ID.            |
| ingested_at     | datetime | Yes     | F         | Ingestion timestamp.         |

**13.4 **vcs_touchpoint_event** (food bank, CAB, DA services, etc.)**

| **Field**           | **Type** | **Req** | **Phase** | **Description**                    |
|---------------------|----------|---------|-----------|------------------------------------|
| touchpoint_event_id | string   | Yes     | F         | Unique event ID.                   |
| household_id        | string   | Yes     | F         | Linked household (if known).       |
| person_id           | string   | No      | F         | Linked person (if known).          |
| event_date          | date     | Yes     | F         | Date of contact.                   |
| provider_name       | string   | No      | F         | e.g. Food bank, CAB, DA charity.   |
| event_type          | enum     | Yes     | F         | ADVICE, FOOD_AID, DA_SUPPORT, etc. |
| source_system       | string   | Yes     | F         | VCS data system ID.                |
| ingested_at         | datetime | Yes     | F         | Ingestion timestamp.               |
