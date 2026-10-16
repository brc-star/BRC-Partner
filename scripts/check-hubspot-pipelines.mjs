/**
 * HubSpot CRM Deal Pipelines Diagnostic Tool
 *
 * Secure server-side-only inspection of available deal pipelines and stages.
 * Strictly read-only: does not create, update, or delete CRM records.
 * Security: NEVER prints, exposes, or logs the access token.
 */

import fs from 'node:fs';
import path from 'node:path';

function resolveAccessToken() {
  // 1. Check process environment variable
  if (process.env.HUBSPOT_ACCESS_TOKEN && process.env.HUBSPOT_ACCESS_TOKEN.trim().length > 5) {
    return process.env.HUBSPOT_ACCESS_TOKEN.trim();
  }

  // 2. Check command line argument --token=xxx (for temporary ad-hoc execution)
  const arg = process.argv.find((a) => a.startsWith('--token='));
  if (arg) {
    const val = arg.split('=')[1]?.trim();
    if (val && val.length > 5) return val;
  }

  // 3. Check .env.local file in project root if present
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    try {
      const content = fs.readFileSync(envLocalPath, 'utf-8');
      const match = content.match(/^HUBSPOT_ACCESS_TOKEN\s*=\s*["']?([^"'\r\n]+)["']?/m);
      if (match && match[1]?.trim().length > 5) {
        return match[1].trim();
      }
    } catch {
      // Ignore read errors
    }
  }

  return null;
}

async function runDiagnostic() {
  const token = resolveAccessToken();

  if (!token) {
    console.log(JSON.stringify({
      status: 'LOCAL_CREDENTIALS_UNAVAILABLE',
      message: 'HUBSPOT_ACCESS_TOKEN is not configured in the local environment, .env.local, or via --token.',
      hint: 'Configure .env.local or pass the token temporarily to run the diagnostic.'
    }, null, 2));
    process.exit(0);
  }

  const endpoint = 'https://api.hubapi.com/crm/v3/pipelines/deals';

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    const responseText = await res.text();
    let body;
    try {
      body = JSON.parse(responseText);
    } catch {
      body = { raw: responseText };
    }

    if (!res.ok) {
      console.log(JSON.stringify({
        status: 'API_ERROR',
        httpStatus: res.status,
        error: body?.message || `HubSpot API returned HTTP ${res.status}`,
      }, null, 2));
      process.exit(1);
    }

    const pipelines = (body.results || []).map((p) => ({
      pipelineName: p.label,
      pipelineId: p.id,
      stages: (p.stages || [])
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
        .map((s) => ({
          stageLabel: s.label,
          stageId: s.id,
        })),
    }));

    console.log(JSON.stringify({
      status: 'SUCCESS',
      pipelines,
    }, null, 2));
  } catch (err) {
    console.log(JSON.stringify({
      status: 'NETWORK_ERROR',
      error: err instanceof Error ? err.message : 'Unknown network failure',
    }, null, 2));
    process.exit(1);
  }
}

runDiagnostic();
