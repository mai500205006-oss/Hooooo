import type { Investigation, InvestigationStatus, TimelineEvent, Evidence } from './types';

// ---------------------------------------------------------------------------
// Request payloads
// ---------------------------------------------------------------------------

export interface CreateInvestigationRequest {
  title: string;
  status?: InvestigationStatus;
}

export interface UpdateInvestigationRequest {
  title?: string;
  status?: InvestigationStatus;
}

export interface ListInvestigationsParams {
  status?: InvestigationStatus;
  q?: string;
}

// ---------------------------------------------------------------------------
// Response envelopes
// ---------------------------------------------------------------------------

export interface InvestigationsListResponse {
  investigations: Investigation[];
}

export interface InvestigationResponse {
  investigation: Investigation;
}

export interface InvestigationTimelineResponse {
  timeline: TimelineEvent[];
}

export interface InvestigationEvidenceResponse {
  evidence: Evidence[];
}

// ---------------------------------------------------------------------------
// API contract — interface only, no implementation
// ---------------------------------------------------------------------------

export interface InvestigationsApi {
  /** GET /api/investigations */
  list(params?: ListInvestigationsParams): Promise<InvestigationsListResponse>;

  /** POST /api/investigations */
  create(payload: CreateInvestigationRequest): Promise<InvestigationResponse>;

  /** PUT /api/investigations/:id */
  update(id: string, payload: UpdateInvestigationRequest): Promise<InvestigationResponse>;

  /** DELETE /api/investigations/:id */
  remove(id: string): Promise<void>;

  /** GET /api/investigations/:id/timeline */
  getTimeline(id: string): Promise<InvestigationTimelineResponse>;

  /** GET /api/investigations/:id/evidence */
  getEvidence(id: string): Promise<InvestigationEvidenceResponse>;
}
