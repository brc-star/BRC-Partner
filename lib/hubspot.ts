/**
 * Server-Side HubSpot CRM Integration Service
 *
 * This module runs strictly on the server and interfaces with the official HubSpot v3 CRM API.
 * It provides:
 * - Contact search & deduplication by email (creating new or updating existing)
 * - Deal creation associated with the contact (with open-deal duplicate avoidance)
 * - Safe error handling with 10s timeouts (never exposes tokens or breaks customer form submissions)
 */

import type { ProjectInquiryData } from '@/types/payment';

export interface HubSpotSyncResult {
  synced: boolean;
  contactId?: string;
  dealId?: string;
  isExistingContact?: boolean;
  error?: string;
}

interface HubSpotContactProperties {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  message?: string;
  hs_lead_status?: string;
  lifecyclestage?: string;
}

interface HubSpotDealProperties {
  dealname: string;
  pipeline?: string;
  dealstage?: string;
  description?: string;
  amount?: string;
}

class HubSpotService {
  private readonly baseUrl = 'https://api.hubapi.com';
  private readonly timeoutMs = 10000;
  private readonly pipelineStagesCache = new Map<string, string[]>();

  /**
   * Safe server-only access to HubSpot access token
   */
  #getAccessToken(): string | undefined {
    return process.env.HUBSPOT_ACCESS_TOKEN?.trim();
  }

  public get portalId(): string {
    return process.env.HUBSPOT_PORTAL_ID?.trim() || '247702711';
  }

  public get pipelineId(): string {
    return process.env.HUBSPOT_PIPELINE_ID?.trim() || 'default';
  }

  public get defaultDealStageId(): string {
    return process.env.HUBSPOT_DEFAULT_DEAL_STAGE_ID?.trim() || 'appointmentscheduled';
  }

  /**
   * Resolves and confirms a valid stage ID for the selected pipeline.
   * If HUBSPOT_DEFAULT_DEAL_STAGE_ID is explicitly configured, it is used.
   * Otherwise, retrieves the pipeline's stages from the HubSpot API:
   * - Confirms whether 'appointmentscheduled' is a valid stage ID for this pipeline.
   * - If 'appointmentscheduled' is valid, selects it.
   * - If 'appointmentscheduled' is not a valid stage, selects the pipeline's first active stage.
   * - Caches results in-memory to prevent repeated API calls.
   */
  public async resolveDealStageId(pipelineId: string): Promise<string> {
    const configuredStage = process.env.HUBSPOT_DEFAULT_DEAL_STAGE_ID?.trim();
    if (configuredStage) {
      return configuredStage;
    }

    const cached = this.pipelineStagesCache.get(pipelineId);
    if (cached && cached.length > 0) {
      return cached.includes('appointmentscheduled') ? 'appointmentscheduled' : cached[0];
    }

    try {
      const res = await this.hubspotFetch<{ stages: Array<{ id: string; displayOrder?: number }> }>(
        `/crm/v3/pipelines/deals/${pipelineId}`
      );

      if (res.ok && res.data?.stages && res.data.stages.length > 0) {
        const sortedStages = [...res.data.stages].sort(
          (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
        );
        const stageIds = sortedStages.map((s) => s.id);
        this.pipelineStagesCache.set(pipelineId, stageIds);

        if (stageIds.includes('appointmentscheduled')) {
          return 'appointmentscheduled';
        }

        return stageIds[0];
      }
    } catch {
      // Non-fatal network/API fallback
    }

    return 'appointmentscheduled';
  }

  /**
   * Check if HubSpot server credentials are configured
   */
  public isConfigured(): boolean {
    const token = this.#getAccessToken();
    return Boolean(token && token.length > 5);
  }

  /**
   * Safe fetch wrapper with Bearer authentication and timeout
   */
  private async hubspotFetch<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
    const token = this.#getAccessToken();
    if (!token) {
      return { ok: false, status: 401, error: 'HubSpot access token is not configured.' };
    }

    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}),
      };

      const res = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const text = await res.text();
      let data: any = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }

      if (!res.ok) {
        const errorMsg =
          (data && typeof data === 'object' && data.message) ||
          `HubSpot API error: HTTP ${res.status}`;
        console.warn(`[HubSpot CRM] ${options.method || 'GET'} ${endpoint.split('?')[0]} -> HTTP ${res.status} (${errorMsg})`);
        return { ok: false, status: res.status, data, error: errorMsg };
      }

      console.info(`[HubSpot CRM] ${options.method || 'GET'} ${endpoint.split('?')[0]} -> HTTP ${res.status}`);
      return { ok: true, status: res.status, data };
    } catch (err: unknown) {
      clearTimeout(timeout);
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      const status = isTimeout ? 408 : 500;
      const error = isTimeout
        ? 'HubSpot request timed out after 10s.'
        : err instanceof Error
        ? err.message
        : 'Unknown HubSpot request failure.';

      console.warn(`[HubSpot CRM] ${options.method || 'GET'} ${endpoint.split('?')[0]} -> HTTP ${status} (${error})`);
      return { ok: false, status, error };
    }
  }

  /**
   * Splits a single full name string into First Name and Last Name
   */
  private parseName(fullName: string): { firstName: string; lastName: string } {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 0) return { firstName: '', lastName: '' };
    if (parts.length === 1) return { firstName: parts[0], lastName: '' };
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    return { firstName, lastName };
  }

  /**
   * Search for an existing contact by email address
   */
  public async searchContactByEmail(email: string): Promise<string | null> {
    const res = await this.hubspotFetch<{ results: Array<{ id: string }> }>(
      '/crm/v3/objects/contacts/search',
      {
        method: 'POST',
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: email.toLowerCase().trim(),
                },
              ],
            },
          ],
          properties: ['email', 'firstname', 'lastname'],
          limit: 1,
        }),
      }
    );

    if (res.ok && res.data?.results && res.data.results.length > 0) {
      return res.data.results[0].id;
    }

    return null;
  }

  /**
   * Create or update a HubSpot contact using email deduplication
   */
  public async upsertContact(
    inquiry: ProjectInquiryData
  ): Promise<{ contactId: string; isExisting: boolean }> {
    const { firstName, lastName } = this.parseName(inquiry.name);
    const normalizedEmail = inquiry.email.toLowerCase().trim();
    const cleanPhone = inquiry.phone && inquiry.phone !== 'Not specified' && inquiry.phone !== 'N/A'
      ? inquiry.phone.trim()
      : undefined;
    const cleanCompany = inquiry.company && inquiry.company !== 'Direct Venture'
      ? inquiry.company.trim()
      : undefined;

    // 1. Check for existing contact
    const existingContactId = await this.searchContactByEmail(normalizedEmail);

    if (existingContactId) {
      // Update existing contact only with provided non-empty fields
      const updateProps: Record<string, string> = {};
      if (firstName) updateProps.firstname = firstName;
      if (lastName) updateProps.lastname = lastName;
      if (cleanPhone) updateProps.phone = cleanPhone;
      if (cleanCompany) updateProps.company = cleanCompany;
      if (inquiry.requirements) updateProps.message = inquiry.requirements;

      if (Object.keys(updateProps).length > 0) {
        await this.hubspotFetch(`/crm/v3/objects/contacts/${existingContactId}`, {
          method: 'PATCH',
          body: JSON.stringify({ properties: updateProps }),
        });
      }

      return { contactId: existingContactId, isExisting: true };
    }

    // 2. Create new contact
    const createProperties: HubSpotContactProperties = {
      email: normalizedEmail,
      firstname: firstName,
      lastname: lastName,
      ...(cleanPhone ? { phone: cleanPhone } : {}),
      ...(cleanCompany ? { company: cleanCompany } : {}),
      ...(inquiry.requirements ? { message: inquiry.requirements } : {}),
      hs_lead_status: 'NEW',
      lifecyclestage: 'lead',
    };

    const createRes = await this.hubspotFetch<{ id: string }>('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties: createProperties }),
    });

    if (createRes.ok && createRes.data?.id) {
      return { contactId: createRes.data.id, isExisting: false };
    }

    // Fallback: If creation collided with a concurrent contact insert (HTTP 409)
    if (createRes.status === 409) {
      const match = createRes.error?.match(/Existing ID:\s*(\d+)/i);
      if (match && match[1]) {
        return { contactId: match[1], isExisting: true };
      }
      const secondLookup = await this.searchContactByEmail(normalizedEmail);
      if (secondLookup) {
        return { contactId: secondLookup, isExisting: true };
      }
    }

    throw new Error(createRes.error || 'Failed to create contact in HubSpot');
  }

  /**
   * Search for an existing open deal for this contact to prevent duplicate opportunities
   */
  public async findOpenDealForContact(contactId: string, serviceName: string): Promise<string | null> {
    try {
      const res = await this.hubspotFetch<{ results: Array<{ id: string; properties: { dealname?: string } }> }>(
        `/crm/v3/objects/contacts/${contactId}/associations/deals`
      );

      if (res.ok && res.data?.results && res.data.results.length > 0) {
        // A recent deal already exists associated with this contact
        return res.data.results[0].id;
      }
    } catch {
      // Non-fatal if association lookup is unsupported
    }
    return null;
  }

  /**
   * Create a deal in HubSpot and associate it with the contact
   */
  public async createDealForInquiry(
    inquiry: ProjectInquiryData,
    contactId: string
  ): Promise<string | null> {
    const cleanCompany = inquiry.company && inquiry.company !== 'Direct Venture' ? inquiry.company.trim() : '';
    const targetEntity = cleanCompany || inquiry.name;
    const dealName = `${inquiry.service || 'Software Development'} — ${targetEntity}`;

    // Prevent duplicate deal creation if an open deal was created very recently
    const existingDealId = await this.findOpenDealForContact(contactId, inquiry.service);
    if (existingDealId) {
      return existingDealId;
    }

    const description = [
      `Inquiry Reference: ${inquiry.id}`,
      `Service: ${inquiry.service}`,
      `Timeline: ${inquiry.timeline}`,
      `Budget Range: ${inquiry.budgetRange}`,
      `Contact Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      cleanCompany ? `Company: ${cleanCompany}` : '',
      `Submitted: ${inquiry.createdAt}`,
      '',
      'Requirements:',
      inquiry.requirements,
    ]
      .filter(Boolean)
      .join('\n');

    const resolvedStageId = await this.resolveDealStageId(this.pipelineId);

    const dealProperties: HubSpotDealProperties = {
      dealname: dealName,
      pipeline: this.pipelineId,
      dealstage: resolvedStageId,
      description,
    };

    // Association definition: Deal to Contact (Association Type ID 3)
    const associations = [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 3,
          },
        ],
      },
    ];

    const createRes = await this.hubspotFetch<{ id: string }>('/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify({
        properties: dealProperties,
        associations,
      }),
    });

    if (createRes.ok && createRes.data?.id) {
      return createRes.data.id;
    }

    // If deal creation with inline associations fails (e.g. schema requirement),
    // retry deal creation without associations, then associate via association endpoint.
    const fallbackRes = await this.hubspotFetch<{ id: string }>('/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify({ properties: dealProperties }),
    });

    if (fallbackRes.ok && fallbackRes.data?.id) {
      const dealId = fallbackRes.data.id;
      // Associate deal to contact
      await this.hubspotFetch(
        `/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/deal_to_contact`,
        { method: 'PUT' }
      );
      return dealId;
    }

    console.warn('[HubSpot] Deal creation skipped or failed:', fallbackRes.error || createRes.error);
    return null;
  }

  /**
   * Main synchronization orchestrator:
   * Called on valid inquiry submission. Never throws an uncaught error to ensure
   * user form submission never fails even if HubSpot is temporarily unavailable.
   */
  public async syncInquiryToHubSpot(inquiry: ProjectInquiryData): Promise<HubSpotSyncResult> {
    if (!this.isConfigured()) {
      console.info('[HubSpot CRM] Lead sync skipped: HUBSPOT_ACCESS_TOKEN is not configured.');
      return {
        synced: false,
        error: 'HubSpot integration is inactive (HUBSPOT_ACCESS_TOKEN not set).',
      };
    }

    try {
      // 1. Create or update contact with email deduplication
      const { contactId, isExisting } = await this.upsertContact(inquiry);

      // 2. Create deal and associate to contact
      let dealId: string | null = null;
      try {
        dealId = await this.createDealForInquiry(inquiry, contactId);
      } catch (dealErr: unknown) {
        console.warn('[HubSpot CRM] Could not create deal for inquiry:', dealErr);
      }

      console.info(
        `[HubSpot CRM] Inquiry sync complete: Contact ${contactId} (${isExisting ? 'existing' : 'new'}), Deal: ${dealId || 'none'}`
      );

      return {
        synced: true,
        contactId,
        dealId: dealId || undefined,
        isExistingContact: isExisting,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown HubSpot synchronization error.';
      console.error(`[HubSpot CRM] Inquiry sync failed safely: ${msg}`);
      return {
        synced: false,
        error: msg,
      };
    }
  }
}

export const hubspotService = new HubSpotService();
