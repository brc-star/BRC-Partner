export type ClaimStatus =
  | 'VERIFIED'
  | 'DEMONSTRATED'
  | 'REFERENCE'
  | 'PRACTICE'
  | 'PLANNED';

export type ClaimCategory =
  | 'nextjs'
  | 'architecture'
  | 'performance'
  | 'security'
  | 'qa'
  | 'deployment'
  | 'projects';

export interface ClaimItem {
  id: string;
  claim: string;
  proof: string;
  verification: string;
  context: string;
  status: ClaimStatus;
  category: ClaimCategory;
  businessSummary: string;
  technicalDetails?: string[];
  evidenceCode?: string;
  metrics?: { label: string; value: string; note?: string }[];
  sourceReference?: string;
}

export interface VerificationStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  methodology: string[];
  output: string;
}
