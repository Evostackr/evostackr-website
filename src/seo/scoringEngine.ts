import type { DimensionScore, OptimizationDimension, AuditIssue } from './types';

export interface DimensionConfig {
  dimension: OptimizationDimension;
  label: string;
  weight: number;
  description: string;
  methodology: string;
  limitations: string;
}

export const DIMENSION_CONFIGS: DimensionConfig[] = [
  {
    dimension: 'technical',
    label: 'Technical SEO Health',
    weight: 15,
    description: 'Measures crawlability, indexability, robots directives, canonical enforcement, XML sitemaps, and HTTP security.',
    methodology: 'Evaluates crawl status (25%), canonical integrity (20%), robots.txt rules (20%), sitemap registration (15%), and heading/resource hierarchy (20%).',
    limitations: 'Calculated from actual client-side DOM structure, static manifests, and HTTP header policies. Does not simulate multi-million URL enterprise crawl logs.',
  },
  {
    dimension: 'onpage',
    label: 'On-Page Optimization',
    weight: 12,
    description: 'Evaluates title tags, meta descriptions, search intent alignment, keyword coverage, and contextual internal links.',
    methodology: 'Checks title character bounds (50-60 chars) (25%), description completeness (120-160 chars) (25%), primary keyword inclusion (25%), and semantic concepts (25%).',
    limitations: 'Evaluates active rendered page against target search intent. Does not endorse keyword density stuffing.',
  },
  {
    dimension: 'content',
    label: 'Content Quality & Coverage',
    weight: 10,
    description: 'Assesses content readability, scannability, information depth, and technical specificity.',
    methodology: 'Flesch-Kincaid readability scoring (30%), architectural depth (25%), typography hierarchy (25%), and unique technical evidence (20%).',
    limitations: 'Heuristic-based readability and depth calculation. Authority is earned through real adoption and citations, not internal word counts alone.',
  },
  {
    dimension: 'aeo',
    label: 'AEO (Answer Engine Readiness)',
    weight: 12,
    description: 'Evaluates direct answer extraction suitability, FAQPage schema, concise definition sections, and voice search phrasing.',
    methodology: 'Direct answer clarity (30%), FAQPage schema validity (30%), conversational voice query matching (20%), and structured formatting (20%).',
    limitations: 'Measures structural eligibility for direct answers and featured snippets. Does not guarantee third-party answer engine placement.',
  },
  {
    dimension: 'geo',
    label: 'GEO (Generative Engine Readiness)',
    weight: 12,
    description: 'Assesses discovery and retrieval compatibility for AI search crawlers, llms.txt compliance, and citation-ready formatting.',
    methodology: 'Robots.txt AI crawler allowances (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) (35%), llms.txt & llms-full.txt machine manifests (35%), and verified entity references (30%).',
    limitations: 'Distinguishes technical retrieval eligibility from active generative citations. Format compliance does not guarantee inclusion in all closed LLM models.',
  },
  {
    dimension: 'entity',
    label: 'Entity & Semantic SEO',
    weight: 10,
    description: 'Verifies Schema.org JSON-LD graph coherence, Organization/Product/Service declarations, and SameAs profiles.',
    methodology: 'Presence of valid Organization, WebSite, and SoftwareApplication schemas (40%), verified SameAs profiles (30%), and entity naming consistency across pages (30%).',
    limitations: 'Based on public Schema.org syntax and active JSON-LD scripts. External Google Knowledge Graph reconciliation depends on external entity recognition.',
  },
  {
    dimension: 'ai_visibility',
    label: 'AI Search Visibility Readiness',
    weight: 8,
    description: 'Evaluates brand presence, citation frequency, and prompt grounding across leading AI engines.',
    methodology: 'Query set monitoring completeness (40%), source attribution readiness (30%), and distinct differentiation from competitors (30%).',
    limitations: 'Separates verified observed citations from estimates. Results from one AI platform cannot be assumed to represent all generative search products.',
  },
  {
    dimension: 'sxo',
    label: 'SXO & Page Experience',
    weight: 8,
    description: 'Bridges search intent promise with actual user experience, responsive usability, and Core Web Vitals.',
    methodology: 'Core Web Vitals targets (LCP < 2.5s, CLS < 0.1, INP < 200ms) (40%), responsive mobile design (30%), and navigation clarity (30%).',
    limitations: 'Combines laboratory measurements with DOM layout analysis. Real User Monitoring (CrUX) requires Google Search Console field data aggregation.',
  },
  {
    dimension: 'cro',
    label: 'Conversion Rate Readiness (CRO)',
    weight: 8,
    description: 'Audits conversion funnel clarity, CTA friction, trust signals, and pricing transparency.',
    methodology: 'Primary CTA visibility (35%), pricing transparency (30%), verified portfolio trust signals (20%), and frictionless contact pathways (15%).',
    limitations: 'Diagnostic readiness score. Does not replace longitudinal A/B split-testing or multivariate statistical validation.',
  },
  {
    dimension: 'engagement',
    label: 'Engagement & Retention',
    weight: 5,
    description: 'Evaluates content scannability, internal link depth, return visitor hooks, and RSS syndication.',
    methodology: 'RSS feed auto-discovery (30%), internal navigation depth (30%), scannable editorial layouts (20%), and persistent updates (20%).',
    limitations: 'Privacy-first heuristic audit without invasive third-party tracking scripts.',
  },
];

export function calculateDimensionScores(issues: AuditIssue[]): {
  dimensionScores: DimensionScore[];
  overallScore: number;
} {
  const dimensionScores: DimensionScore[] = DIMENSION_CONFIGS.map((config) => {
    const dimIssues = issues.filter((i) => i.dimension === config.dimension);
    const totalCount = dimIssues.length;
    const passedCount = dimIssues.filter((i) => i.passed).length;
    
    // Weight deductions by severity of failed issues
    let score = 100;
    if (totalCount > 0) {
      const failed = dimIssues.filter((i) => !i.passed);
      let penalty = 0;
      failed.forEach((f) => {
        if (f.severity === 'critical') penalty += 35;
        else if (f.severity === 'warning') penalty += 15;
        else if (f.severity === 'info') penalty += 5;
      });
      score = Math.max(0, Math.min(100, 100 - penalty));
    }

    let status: 'optimal' | 'good' | 'needs_improvement' | 'critical' = 'optimal';
    if (score >= 90) status = 'optimal';
    else if (score >= 75) status = 'good';
    else if (score >= 50) status = 'needs_improvement';
    else status = 'critical';

    return {
      dimension: config.dimension,
      label: config.label,
      score,
      maxScore: 100,
      weight: config.weight,
      status,
      description: config.description,
      methodology: config.methodology,
      limitations: config.limitations,
      passedCount,
      totalCount,
    };
  });

  // Calculate weighted overall score
  const totalWeight = dimensionScores.reduce((sum, d) => sum + d.weight, 0);
  const weightedSum = dimensionScores.reduce((sum, d) => sum + d.score * d.weight, 0);
  const overallScore = Math.round(weightedSum / totalWeight);

  return { dimensionScores, overallScore };
}
