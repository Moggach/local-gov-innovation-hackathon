# Security, RBAC, and Audit Notes

## Roles (demo)
- `housing_officer`, `revenues_officer`, `benefits_officer` – operational access to their domain.
- `manager` – elevated access across domains.
- `analyst` – read-only, may receive redacted views.
- `guest` – healthcheck only.

## Enforcement
- Every MCP server checks a provided `role` (JSON field or `x-user-role` header) against an allow-list per action.
- Unauthorized actions return HTTP 403 with no data payload.
- Deterministic responses ensure repeatable audits.

## Audit trail
- Requests are logged with timestamp, role, action, and outcome to stdout; redirect to a file in production.
- Suggested extension: push logs to a central aggregator with request IDs so the AI host can surface a reference in responses.

## Data minimisation & redaction
- The AI host should redact PII before presenting cross-domain summaries (names/UPRN if user lacks clearance).
- For analysts, prefer aggregated metrics (arrears totals, sanction counts) instead of full records.

## Tokens / identity (future work)
- Replace the demo `role` field with signed tokens from the council IdP (OIDC/OAuth) and map claims to MCP roles.
- Add request-level correlation IDs from the host to tie MCP calls back to a user session and conversation turn.
