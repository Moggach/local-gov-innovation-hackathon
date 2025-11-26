**Integrating MCP for a Homelessness Prevention Demonstrator**

**Decentralized MCP Server Architecture (Local Government Context)**

In this architecture, each major data source is exposed via its own
**Model Context Protocol (MCP)** server with role-based access controls.
For example, a council’s *Housing* database, *Council Tax* system, and
*Benefits* system each run a dedicated MCP server that converts
authorized queries into data fetches. This decentralised model aligns
well with local government data practices – departments maintain control
over their own data services, yet a common protocol connects them for AI
use
[<u>anthropic.com</u>](https://www.anthropic.com/news/model-context-protocol#:~:text=MCP%20addresses%20this%20challenge,to%20the%20data%20they%20need).
By using MCP as a universal interface, we replace ad-hoc integrations
with a standard approach, simplifying how AI agents access disparate
council systems
[<u>anthropic.com</u>](https://www.anthropic.com/news/model-context-protocol#:~:text=MCP%20addresses%20this%20challenge,to%20the%20data%20they%20need).

Each MCP server enforces authentication and authorization, so that an AI
agent (or any client) can only invoke tools or retrieve data permitted
by its role. In practice, the AI agent will carry the identity or role
of the human user it represents (e.g. a housing officer or analyst), and
the MCP server checks this on every request
[<u>cerbos.dev</u>](https://www.cerbos.dev/blog/mcp-authorization#:~:text=Beyond%20specific%20bugs%2C%20the%20general,user%20who%20called%20the%20agent).
This ensures the agent “can only do what that user is allowed to do,”
preventing overreach
[<u>cerbos.dev</u>](https://www.cerbos.dev/blog/mcp-authorization#:~:text=Beyond%20specific%20bugs%2C%20the%20general,user%20who%20called%20the%20agent).
For instance, an assistant acting for a regular staff member might be
allowed to read rent arrears records but not modify them, whereas a
manager role might have broader access. The MCP servers mediate these
rules (often via configurable policies) to guard against unauthorized
actions.

**Access Control and Audit:** Role-Based Access Control (RBAC) can be
implemented within each MCP server or via an external policy service.
Only verified agents/users can connect (authentication), and each is
restricted to specific data or tool actions (authorization)
[<u>cerbos.dev</u>](https://www.cerbos.dev/blog/mcp-authorization#:~:text=Beyond%20specific%20bugs%2C%20the%20general,user%20who%20called%20the%20agent).
All requests and responses should be logged in detail – an audit trail
of “who (or which agent) did what, and was it allowed” is vital for
governance
[<u>cerbos.dev</u>](https://www.cerbos.dev/blog/mcp-authorization#:~:text=Another%20point%20to%20consider%20is,usage%20is%20under%20control%20and).
These audit logs enable compliance checks and security forensics,
proving that sensitive data access via the AI is under control
[<u>cerbos.dev</u>](https://www.cerbos.dev/blog/mcp-authorization#:~:text=Another%20point%20to%20consider%20is,usage%20is%20under%20control%20and).
In a council setting, this means every query the AI makes to, say, the
Benefits MCP server can be tied back to a user role and recorded (e.g.
for GDPR and oversight). Each department’s MCP server can maintain its
own log, and a central dashboard could aggregate these for a holistic
audit view. This distributed approach is viable in local government so
long as common security standards are followed – it allows departments
to retain data ownership while participating in a federated AI solution.

**Orchestration via Codex (AI Host):** The AI assistant (e.g. an
Anthropic Claude-based agent) serves as the *MCP client host*
orchestrating calls to each server. In our demonstrator, the Codex
platform (a coding agent environment) would act as this host, managing
multiple MCP client connections – one for each data source. The MCP
specification supports this pattern: a single host can connect multiple
clients, with each client linked 1:1 to an MCP server
[<u>ibm.com</u>](https://www.ibm.com/think/topics/model-context-protocol#:~:text=MCP%20client).
In practice, the AI agent’s environment is configured with entries for
the Housing, Council Tax, and Benefits MCP endpoints. When the assistant
needs information, it routes the query to the appropriate MCP server
(e.g. a SQL query or API call via MCP to the Housing database). The
**Codex implementation** can orchestrate these calls behind the scenes.
For example, if an officer asks, *“Does this household have rent arrears
and council tax arrears?”*, the AI might sequentially (or in parallel)
query the Housing MCP server for rent status and the Council Tax MCP for
arrears, then combine the results. The MCP host (Codex/Claude) handles
connecting and parsing each server’s response, ensuring each
client-server pair stays in sync
[<u>ibm.com</u>](https://www.ibm.com/think/topics/model-context-protocol#:~:text=MCP%20client).
Each MCP server remains independently managed by its department, but
together they serve a unified AI assistant interface.

*Figure: Decentralized MCP integration architecture.* The AI Assistant
(Claude with Codex) acts as an orchestrator (MCP client host) that
communicates with multiple MCP servers – one per data source (Housing,
Council Tax, Benefits). Each MCP server enforces role-based access,
querying its local database and returning **deterministic** data to the
AI. All interactions are logged for auditing. This design lets the AI
access siloed council data through a standard protocol without
centralizing the databases.

flowchart TD

subgraph Council Data Systems (MCP servers)

direction LR

H\[MCP Server: Housing\] --\>\|DB access\| HDB\[(Housing DB)\]

C\[MCP Server: Council Tax\] --\>\|DB access\| CDB\[(Council Tax DB)\]

B\[MCP Server: Benefits\] --\>\|DB access\| BDB\[(Benefits System)\]

end

User(\[Council Officer\]) --\>\|query\| AI{{AI Assistant (Claude)}}

AI --\>\|MCP request\| H

AI --\>\|MCP request\| C

AI --\>\|MCP request\| B

H --\>\|data\| AI

C --\>\|data\| AI

B --\>\|data\| AI

AI --\>\|insight/response\| User

**Deterministic Data Delivery via MCP to AI Agents**

One key advantage of MCP integration is that it provides
**deterministic, up-to-date data** to the AI agent, rather than relying
on the model’s internal knowledge (which might be stale or
hallucinated). Each MCP server exposes *resources* – read-only data
endpoints – that return factual information from the source systems in a
structured format
[<u>ibm.com</u>](https://www.ibm.com/think/topics/model-context-protocol#:~:text=MCP%20servers%20are%20versatile%20as,Protocol%20servers%20expose%20data%20through).
For example, the Housing MCP server might expose a resource for tenancy
or arrears information. When Claude (the AI) queries this, the server
returns the exact data (e.g. “arrears_amount: £500, last_payment_date:
2025-10-01”). This output is not generated by the model; it’s fetched
directly from the database via the MCP server, ensuring accuracy and
consistency across queries. According to the MCP spec, resource actions
do not execute arbitrary code – they **only retrieve data** – which
means the results are predictable given the underlying database state
[<u>ibm.com</u>](https://www.ibm.com/think/topics/model-context-protocol#:~:text=MCP%20servers%20are%20versatile%20as,Protocol%20servers%20expose%20data%20through).
The AI’s answers can therefore be grounded in real council records
(housing, tax, benefits), making its responses more relevant and
trustworthy for the user’s needs.

Once the data is retrieved, the **AI agent can perform additional
processing** before presenting information. Because the assistant is
running in an agentic mode (e.g. Anthropic’s Claude with Agent Skills),
it can apply transformations like redaction, aggregation, or selective
disclosure as part of its skillset. For instance, if an officer asks for
a summary of a household’s situation, the AI might call multiple MCP
servers (as above), then **redact any personally identifying
information** in the output before sharing a summary. Redaction rules
could be encoded in the prompt or a skill – e.g. the AI might omit exact
names or IDs, showing an anonymized report to comply with privacy
guidelines. The agent can also **aggregate data** from different
sources: imagine it fetches “rent arrears = £500” from Housing and “CT
arrears = £200” from Council Tax – it could sum these to tell the
officer the household’s total arrears, or highlight that *both* rent and
tax arrears are present (a risk signal). In another scenario, the AI
might use **selective disclosure**, showing only the insights relevant
to the query. For example, the benefits MCP server might return a lot of
fields, but the AI only includes a couple of key benefit flags in its
answer if they are pertinent (hiding others to avoid information
overload or because the user’s role shouldn’t see them). These decisions
can be guided by the agent’s instructions or coded logic.

Importantly, Anthropic’s *Agent Skills* framework supports incorporating
such logic to ensure reliable handling of tool outputs. Skills can
include executable code for tasks where precise control or computation
is needed, rather than leaving everything to language generation
[<u>devops.com</u>](https://devops.com/claude-introduces-agent-skills-for-custom-ai-workflows/#:~:text=,reliable%20results%20than%20token%20generation).
In our context, a custom skill could be designed to post-process MCP
data – for example, a “data_sanitizer” skill might automatically strip
out sensitive fields or format the raw data into a brief narrative.
Because the code executes in a sandboxed, deterministic way, it can
perform operations like calculating risk scores, filtering lists, or
generating charts from the MCP data with consistent results (every agent
run with the same data produces the same outcome). This determinism
complements the MCP’s role: MCP guarantees the *input data* is correct
and current, and the agent’s skill code can guarantee that certain
transformations on that data are done *reliably*. Anthropic’s latest
specifications emphasize that skills are **composable and efficient** –
multiple skills (or tool outputs) can be combined in one workflow,
automatically coordinated by Claude
[<u>devops.com</u>](https://devops.com/claude-introduces-agent-skills-for-custom-ai-workflows/#:~:text=The%20system%20is%20built%20on,four%20principles).
Our AI assistant could leverage this to, say, use one skill to fetch
data via MCP and another to analyze it, without the developer having to
micro-manage each step
[<u>devops.com</u>](https://devops.com/claude-introduces-agent-skills-for-custom-ai-workflows/#:~:text=The%20system%20is%20built%20on,four%20principles).
The result is an AI that not only has access to real-time council data
but can also reason over it and present it in an officer-friendly
manner, all while respecting the rules (thanks to MCP + RBAC) and
producing explainable, consistent outputs.

It’s worth noting that the **MCP+Agent approach** aligns with the notion
of “safe tool use” in AI. By using MCP, the AI is not asked to
extrapolate or hallucinate critical data – it explicitly asks for what
it needs and gets a definitive answer (e.g. the exact number of missed
payments). This improves confidence in the AI’s recommendations for
homelessness prevention, since officers can trace outputs back to source
data (potentially even viewing the underlying figures if needed).
According to Anthropic, the goal of MCP is to break down data silos and
let AI assistants maintain context across tools/datasets in a controlled
way
[<u>anthropic.com</u>](https://www.anthropic.com/news/model-context-protocol#:~:text=MCP%20addresses%20this%20challenge,to%20the%20data%20they%20need).
In our case, that means the assistant can seamlessly move between
housing records, tax records, and benefit systems, treating them as
extensions of its context while adhering to governance. Overall, MCP
provides the **data fidelity** and security layer, and the AI (Claude)
provides the **reasoning and language** layer – together enabling more
proactive and precise homelessness prevention support.

**Implementation Plan and Repository Structure for Codex**

To implement this architecture in the demonstrator codebase, we propose
the following steps and structure:

1.  **Setup a Feature Branch:** Create a new git branch (e.g.
    **feature/mcp-integration**) in the repository. This branch will
    contain all changes for MCP integration. Ensure you have the latest
    main branch and then branch off: git checkout -b
    feature/mcp-integration.

2.  **Add MCP Server Modules:** For each data source, add a dedicated
    MCP server component. These can live under a new directory (e.g.
    /mcp_servers/). We will build lightweight MCP servers that interface
    with either real or sample data. For the demonstrator (which uses
    synthetic data), the MCP servers can read from the existing CSVs or
    SQLite to simulate live systems:

    -   mcp_servers/housing_server/ – an MCP server exposing housing
        data (e.g. rent arrears, tenancy info).

    -   mcp_servers/council_tax_server/ – an MCP server exposing council
        tax data (e.g. arrears, payment history).

    -   mcp_servers/benefits_server/ – an MCP server exposing benefits
        data (e.g. recent benefit changes, sanctions).

> Each server will have its own code (which could be in Python, Node,
> etc., depending on available MCP SDKs). For instance, using the Python
> MCP SDK, you might implement an HTTP endpoint that listens for
> JSON-RPC requests for defined actions (like get_arrears) and returns
> data from the CSV/DB. Include a README.md in each server’s folder with
> instructions on running it (for now, likely python main.py or similar
> to start the server locally).

3.  **Implement Role-Based Logic:** Within each MCP server, implement
    basic RBAC checks. For example, define a set of roles and what
    queries or fields they can access. This can be as simple as a
    hard-coded check (if user role != “HousingOfficer” then deny access
    to personal details), or use a library/policy file if time permits.
    At minimum, stub out an auth.py that would validate an incoming
    token or role string on each request. For the demo, you might
    simulate a token in the request headers or a special query parameter
    (since full OAuth integration is out of scope). Ensure that
    unauthorized requests are rejected with an error message. Also
    implement logging: when the server receives a request, log the
    timestamp, requesting user/agent (if known), action, and outcome.
    This could just print to console or append to a log file for now.

4.  **Orchestrator Integration (Codex):** Modify the main application
    (or AI agent interface) to utilize these MCP servers. If using the
    Claude API or a Codex agent to answer questions, you’ll configure it
    to know about the new tools:

    -   Register each MCP server in the **Codex MCP settings** so the
        agent can call them. For example, if Codex uses a JSON config
        (like \~/.codex/mcp_settings.json), add entries similar to the
        following for each server:

    -   {

    -   "mcpServers": {

    -   "housing": { "command": "housing_mcp_server" },

    -   "council_tax": { "command": "council_tax_mcp_server" },

    -   "benefits": { "command": "benefits_mcp_server" }

    -   }

    -   }

> This is analogous to how a mermaid diagram tool was configured for
> Codex[<u>github.com</u>](https://github.com/veelenga/claude-mermaid#:~:text=Codex).
> In our case, the "command" might point to the startup command for the
> MCP server (if running locally as a subprocess). If the servers are
> remote (e.g. hosted), you would provide the network address instead
> (the MCP spec supports HTTP(S) via Server-Sent Events for remote
> servers[<u>ibm.com</u>](https://www.ibm.com/think/topics/model-context-protocol#:~:text=In%20the%20transport%20layer%20between,systems%2C%20databases%20and%20local%20APIs)).
> After updating the config, instruct Codex or the AI runtime to load
> these servers. (For example: codex mcp add housing housing_mcp_server
> if a CLI is available, or simply restarting the agent if it auto-loads
> the config.)

-   **AI Prompting/Skills:** Update the AI agent’s system prompt or
    skill configuration to explain these new tools. For instance, add
    descriptions like: *“Tool housing – queries housing database via MCP
    (e.g. use get_tenancy_info(household_id))”*. Providing a brief
    schema of available actions for each tool will help the AI decide
    when to use them. If using Anthropic Claude with Skills, you might
    create a skill file that defines how to use the MCP servers (though
    if the MCP servers are registered, Claude can discover their actions
    automatically via the MCP handshake). Ensure the agent knows to use
    these tools for relevant queries, rather than relying on trained
    knowledge.

5.  **Documentation and Diagram:** Include documentation of this new
    architecture in the repo:

    -   Update /docs/architecture.md (this file) to reflect the
        MCP-based design, replacing or augmenting the previous data flow
        description. The architecture diagram above (in Mermaid and
        embedded image) should be added here.

    -   Add a /docs/security.md or section in architecture doc covering
        the RBAC and audit approach, so stakeholders see how data access
        is controlled.

    -   If relevant, update the main README.md to explain how to run the
        MCP servers and how the AI assistant now works (for example,
        “The AI assistant will call out to the MCP microservices for
        live data – ensure you start the servers before using the AI
        interface.”).

Below is an outline of the **repository structure** incorporating the
new components (in addition to existing prototype folders like backend
and frontend). This layout ensures clear separation of concerns:

/README.md

/docs/

architecture.md \<- \*\*Updated:\*\* High-level design with MCP
integration (this document)

security_and_governance.md \<- RBAC, audit details (optional)

data_schema.md \<- Data definitions (unchanged from synthetic data, or
updated if needed)

ethics_and_limitations.md \<- Note on data usage, etc.

demo_script.md \<- How to demo the new features

/mcp_servers/

housing_server/

\_\_init\_\_.py

server.py \<- MCP server implementation for Housing data

auth.py \<- Role/permission definitions for housing data

data_source.csv \<- (Optional) sample data or connection details

README.md \<- Instructions to run Housing MCP server

council_tax_server/

\_\_init\_\_.py

server.py \<- MCP server implementation for Council Tax data

auth.py \<- Role/permission definitions for council tax data

data_source.csv \<- sample data (if needed)

README.md

benefits_server/

\_\_init\_\_.py

server.py \<- MCP server implementation for Benefits data

auth.py \<- Role/permission definitions for benefits data

data_source.csv \<- sample data if needed

README.md

/backend/ (existing backend for risk model & API)

app.py \<- (Optional) Could remain for risk scoring API, or integrate
with MCP

...

/frontend/ (existing UI code)

... (If extending UI to query AI assistant or display live data, changes
go here)

**Notes:** In the above structure, each server.py would define the MCP
endpoints (actions/resources) and how to execute them (e.g. querying a
CSV or database). The auth.py could contain dummy role checks for the
demo. If this demonstrator is purely using the AI agent interface (and
not the existing web dashboard), the /frontend and /backend parts might
remain mostly as in the earlier prototype, while the new MCP servers and
AI orchestration run in parallel to provide an interactive Q&A or
analysis assistant. We ensure the documentation clearly explains how to
operate the new components.

Finally, once the branch is ready and documented, test the end-to-end
flow: start the MCP servers, then use the Codex/Claude agent to ask a
few example questions (e.g. *“List households with high rent or council
tax arrears”*). Verify the assistant successfully calls the MCP servers
(you should see logs in the server consoles) and returns the expected
results. With this setup, the demonstrator will illustrate how an AI
agent equipped with MCP can proactively identify at-risk households by
securely combining data from housing, tax, and benefits – all within a
governed, auditable framework.
<u>[ibm.com](https://www.ibm.com/think/topics/model-context-protocol#:~:text=MCP%20client)[github.com](https://github.com/veelenga/claude-mermaid#:~:text=Codex)</u>
