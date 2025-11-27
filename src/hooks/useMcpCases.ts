import { useEffect, useMemo, useState } from 'react';
import { cases as fallbackCases } from '../data/cases';

export type Completeness = 'high' | 'partial' | 'limited' | 'none';
export type Risk = 'High' | 'Medium' | 'Low';

export type CombinedCase = {
  id: number;
  reference: string;
  uprn: string;
  name: string;
  risk: Risk;
  details: string;
  probability: number;
  completeness: Completeness;
  housing?: any;
  councilTax?: any;
  benefits?: any;
};

const HOUSING_URL = import.meta.env.VITE_HOUSING_MCP_URL ?? 'http://127.0.0.1:7001/mcp';
const COUNCIL_TAX_URL = import.meta.env.VITE_CT_MCP_URL ?? 'http://127.0.0.1:7002/mcp';
const BENEFITS_URL = import.meta.env.VITE_BEN_MCP_URL ?? 'http://127.0.0.1:7003/mcp';

const isTestEnv = import.meta.env.MODE === 'test';

async function fetchJson(url: string, body: any) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

function computeCompleteness(hasHousing: boolean, hasCouncil: boolean, hasBenefits: boolean): Completeness {
  const count = [hasHousing, hasCouncil, hasBenefits].filter(Boolean).length;
  if (count === 3) return 'high';
  if (count === 2) return 'partial';
  if (count === 1) return 'limited';
  return 'none';
}

function computeRiskScore(housing: any | undefined, council: any | undefined, benefits: any | undefined) {
  let score = 0;
  const arrearsH = housing ? parseFloat(housing.arrears_amount ?? 0) : 0;
  const arrearsCT = council ? parseFloat(council.arrears_amount ?? 0) : 0;
  if (arrearsH >= 800) score += 3;
  else if (arrearsH >= 200) score += 2;
  if (arrearsCT >= 400) score += 2;
  else if (arrearsCT >= 100) score += 1;
  if (benefits?.sanction_flag?.toString().toLowerCase() === 'true') score += 2;
  if ((benefits?.universal_credit_status ?? '').toLowerCase() === 'suspended') score += 1;
  return score;
}

function scoreToRisk(score: number): Risk {
  if (score >= 5) return 'High';
  if (score >= 3) return 'Medium';
  return 'Low';
}

function scoreToProbability(score: number): number {
  if (score >= 6) return 95;
  if (score >= 5) return 90;
  if (score >= 4) return 75;
  if (score >= 3) return 60;
  if (score >= 2) return 35;
  return 20;
}

export function useMcpCases() {
  const [data, setData] = useState<CombinedCase[]>(fallbackCases as CombinedCase[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isTestEnv) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const [housing, councilTax, benefits] = await Promise.all([
          fetchJson(HOUSING_URL, { action: 'get_arrears_over', threshold: 0, role: 'housing_officer' }).catch(() => ({ results: [] })),
          fetchJson(COUNCIL_TAX_URL, { action: 'list_in_recovery', role: 'revenues_officer' }).catch(() => ({ results: [] })),
          fetchJson(BENEFITS_URL, { action: 'list_sanctioned', role: 'benefits_officer' }).catch(() => ({ results: [] })),
        ]);

        const byUprn = new Map<string, CombinedCase>();

        fallbackCases.forEach((c, idx) => {
          byUprn.set(c.uprn, {
            ...c,
            id: c.id ?? idx + 1,
            housing: undefined,
            councilTax: undefined,
            benefits: undefined,
            risk: (c.risk as Risk),
            completeness: (c.completeness as Completeness),
          });
        });

        (housing.results ?? []).forEach((h: any) => {
          const existing = byUprn.get(h.uprn) ?? {
            id: byUprn.size + 1,
            reference: `CASE-${String(byUprn.size + 1).padStart(3, '0')}`,
            uprn: h.uprn,
            name: h.tenant_name ?? 'Unknown',
            details: 'Housing data only',
            probability: 0,
            risk: 'Low' as Risk,
            completeness: 'limited' as Completeness,
          };
          byUprn.set(h.uprn, { ...existing, housing: h, name: existing.name || h.tenant_name });
        });

        (councilTax.results ?? []).forEach((ct: any) => {
          const existing = byUprn.get(ct.uprn) ?? {
            id: byUprn.size + 1,
            reference: `CASE-${String(byUprn.size + 1).padStart(3, '0')}`,
            uprn: ct.uprn,
            name: ct.account_name ?? 'Unknown',
            details: 'Council tax data only',
            probability: 0,
            risk: 'Low' as Risk,
            completeness: 'limited' as Completeness,
          };
          byUprn.set(ct.uprn, { ...existing, councilTax: ct, name: existing.name || ct.account_name });
        });

        (benefits.results ?? []).forEach((b: any) => {
          const existing = byUprn.get(b.uprn) ?? {
            id: byUprn.size + 1,
            reference: `CASE-${String(byUprn.size + 1).padStart(3, '0')}`,
            uprn: b.uprn,
            name: b.claimant_name ?? 'Unknown',
            details: 'Benefits data only',
            probability: 0,
            risk: 'Low' as Risk,
            completeness: 'limited' as Completeness,
          };
          byUprn.set(b.uprn, { ...existing, benefits: b, name: existing.name || b.claimant_name });
        });

        const combined = Array.from(byUprn.values()).map((row) => {
          const completeness = computeCompleteness(Boolean(row.housing), Boolean(row.councilTax), Boolean(row.benefits));
          const score = computeRiskScore(row.housing, row.councilTax, row.benefits);
          const risk = scoreToRisk(score);
          const probability = scoreToProbability(score);
          const details = row.housing?.tenancy_status
            ? `${row.housing.tenancy_status} tenancy`
            : row.details;
          return { ...row, completeness, risk, probability, details };
        });

        if (!cancelled) {
          setData(combined);
          setError(null);
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? 'Failed to load MCP data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const summary = useMemo(
    () => ({
      high: data.filter((c) => c.risk === 'High').length,
      medium: data.filter((c) => c.risk === 'Medium').length,
      low: data.filter((c) => c.risk === 'Low').length,
    }),
    [data],
  );

  return { cases: data, loading, error, summary };
}
