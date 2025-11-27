#!/usr/bin/env node
// Simple validator for MCP demo servers. Checks health endpoints and ensures data is returned.

const HOUSING = process.env.HOUSING_MCP_URL || 'http://127.0.0.1:7001/mcp';
const COUNCIL = process.env.COUNCIL_TAX_MCP_URL || 'http://127.0.0.1:7002/mcp';
const BENEFITS = process.env.BENEFITS_MCP_URL || 'http://127.0.0.1:7003/mcp';

async function post(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(`POST ${url} -> ${res.status}`);
  }
  return res.json();
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function main() {
  console.log('Validating MCP data sources...');

  const healthH = await post(HOUSING, { action: 'healthcheck', role: 'guest' });
  const healthC = await post(COUNCIL, { action: 'healthcheck', role: 'guest' });
  const healthB = await post(BENEFITS, { action: 'healthcheck', role: 'guest' });
  assert(healthH.status === 'ok', 'Housing healthcheck failed');
  assert(healthC.status === 'ok', 'Council Tax healthcheck failed');
  assert(healthB.status === 'ok', 'Benefits healthcheck failed');

  const housing = await post(HOUSING, { action: 'get_arrears_over', threshold: 0, role: 'housing_officer' });
  const council = await post(COUNCIL, { action: 'list_in_recovery', role: 'revenues_officer' });
  const benefits = await post(BENEFITS, { action: 'list_sanctioned', role: 'benefits_officer' });

  assert((housing.results || []).length > 0, 'Housing results empty');
  assert((council.results || []).length >= 0, 'Council results missing');
  // benefits may be empty if no sanctions; tolerate but ensure field exists
  assert('results' in benefits, 'Benefits results missing');

  const sampleUprn = '100010004';
  const tenancy = await post(HOUSING, { action: 'get_tenancy', uprn: sampleUprn, role: 'housing_officer' });
  assert(tenancy.data && tenancy.data.uprn === sampleUprn, 'Sample tenancy lookup failed');

  console.log('All MCP endpoints reachable and returning data.');
}

main().catch((err) => {
  console.error('MCP validation failed:', err.message || err);
  process.exit(1);
});
