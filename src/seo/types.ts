export type IssueSeverity = 'critical' | 'warning' | 'info' | 'pass';

export type OptimizationDimension =
  | 'technical'
  | 'onpage'
  | 'content'
  | 'aeo'
  | 'geo'
  | 'entity'
  | 'ai_visibility'
  | 'sxo'
  | 'cro'
  | 'engagement';

export interface AuditIssue {
  id: string;
  dimension: OptimizationDimension;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
  confidence: 'High' | 'Medium' | 'Low';
  risk: 'Low' | 'Medium' | 'High';
  passed: boolean;
  provenance: string;
  details?: string;
}

export interface DimensionScore {
  dimension: OptimizationDimension;
  label: string;
  score: number;
  maxScore: number;
  weight: number;
  status: 'optimal' | 'good' | 'needs_improvement' | 'critical';
  description: string;
  methodology: string;
  limitations: string;
  passedCount: number;
  totalCount: number;
}

export interface SearchIntentMapping {
  route: string;
  pageTitle: string;
  primaryQuery: string;
  intentType: 'informational' | 'commercial' | 'transactional' | 'navigational';
  secondaryKeywords: string[];
  semanticConcepts: string[];
  contentFreshness: string;
  cannibalizationRisk: 'None' | 'Low' | 'Moderate' | 'High';
  targetAudience: string;
}

export interface TopicSubtopic {
  id: string;
  title: string;
  intent: 'informational' | 'commercial' | 'transactional';
  coverageStatus: 'covered' | 'planned' | 'gap';
  targetWordCount: number;
  internalLinkTarget: string;
  relevanceScore: number;
}

export interface TopicCluster {
  id: string;
  pillarTitle: string;
  pillarRoute: string;
  description: string;
  coreEntity: string;
  authorityScore: number; // 0-100 coverage readiness
  subtopics: TopicSubtopic[];
}

export interface EntitySignal {
  id: string;
  entityName: string;
  entityType: 'Organization' | 'SoftwareApplication' | 'Service' | 'WebSite' | 'Person';
  schemaType: string;
  sameAsLinks: string[];
  consistencyStatus: 'verified' | 'partial' | 'unverified';
  declaredInDom: boolean;
  notes: string;
}

export interface AEOQuestionAnswer {
  id: string;
  question: string;
  conciseAnswer: string;
  supportingDetail: string;
  formatType: 'paragraph' | 'list' | 'table' | 'steps';
  featuredSnippetEligibility: 'High' | 'Moderate' | 'Low';
  targetVoiceQuery: string;
}

export interface LLMCrawlerRule {
  crawlerName: string;
  agentToken: string;
  status: 'allowed' | 'disallowed' | 'partially_allowed' | 'unknown';
  purpose: string;
  notes: string;
}

export interface AIQueryMonitoringItem {
  id: string;
  query: string;
  platform: 'ChatGPT' | 'Claude' | 'Perplexity' | 'Gemini' | 'Copilot' | 'Google AI Overview';
  mentionStatus: 'verified_citation' | 'textual_mention' | 'unmentioned' | 'estimated_presence' | 'not_available';
  citationShareEstimate: string;
  verifiedUrl?: string;
  lastChecked: string;
  sourceOfMeasurement: string;
  notes: string;
}

export interface BacklinkObservation {
  id: string;
  referringDomain: string;
  targetPage: string;
  anchorText: string;
  domainAuthorityEstimate?: string;
  type: 'editorial' | 'directory' | 'unlinked_mention' | 'social';
  status: 'active' | 'lost' | 'prospective';
  provenance: string;
}

export interface ConversionFunnelStep {
  stepIndex: number;
  name: string;
  targetElement: string;
  actionType: 'view' | 'click' | 'interaction' | 'submission';
  frictionPoints: string[];
  optimizationHypothesis: string;
}

export interface ConversionFunnel {
  id: string;
  name: string;
  goalType: 'Primary' | 'Secondary';
  description: string;
  steps: ConversionFunnelStep[];
}

export interface FullAuditReport {
  timestamp: string;
  scannedUrl: string;
  overallScore: number;
  dimensions: DimensionScore[];
  issues: AuditIssue[];
  intentMappings: SearchIntentMapping[];
  clusters: TopicCluster[];
  entities: EntitySignal[];
  aeoItems: AEOQuestionAnswer[];
  llmCrawlers: LLMCrawlerRule[];
  aiQueries: AIQueryMonitoringItem[];
  backlinks: BacklinkObservation[];
  funnels: ConversionFunnel[];
}
