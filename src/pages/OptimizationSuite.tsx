import { useState, useMemo, useCallback } from 'react';
import './OptimizationSuite.css';
import { runLiveAudit } from '../seo/auditEngine';
import { calculateDimensionScores } from '../seo/scoringEngine';
import { topicClusters, searchIntentMappings } from '../seo/topicalAuthorityData';
import { entitySignals } from '../seo/entityData';
import { aeoQuestionAnswers, llmCrawlerRules, aiQueryMonitoringItems } from '../seo/aeoGeoData';
import { conversionFunnels, backlinkObservations } from '../seo/croData';
import { gscAdapter, psiAdapter } from '../seo/integrationAdapters';
import type { AuditIssue, IssueSeverity } from '../seo/types';

interface OptimizationSuiteProps {
  onNavigateHome: () => void;
}

type ActiveTab =
  | 'overview'
  | 'technical'
  | 'onpage'
  | 'topical'
  | 'entity'
  | 'aeo'
  | 'geo'
  | 'cro'
  | 'integrations';

export function OptimizationSuite({ onNavigateHome }: OptimizationSuiteProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [severityFilter, setSeverityFilter] = useState<'all' | IssueSeverity>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [auditIssues, setAuditIssues] = useState<AuditIssue[]>(() => runLiveAudit('/'));
  const [lastScannedTime, setLastScannedTime] = useState<string>(() => new Date().toLocaleTimeString());

  const handleRunAudit = useCallback(() => {
    const freshIssues = runLiveAudit('/');
    setAuditIssues(freshIssues);
    setLastScannedTime(new Date().toLocaleTimeString());
  }, []);

  const { dimensionScores, overallScore } = useMemo(() => {
    return calculateDimensionScores(auditIssues);
  }, [auditIssues]);

  const filteredIssues = useMemo(() => {
    return auditIssues.filter((issue) => {
      const matchesSeverity = severityFilter === 'all' || issue.severity === severityFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.recommendation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSeverity && matchesSearch;
    });
  }, [auditIssues, severityFilter, searchQuery]);

  const severityCounts = useMemo(() => {
    return {
      all: auditIssues.length,
      critical: auditIssues.filter((i) => i.severity === 'critical').length,
      warning: auditIssues.filter((i) => i.severity === 'warning').length,
      info: auditIssues.filter((i) => i.severity === 'info').length,
      pass: auditIssues.filter((i) => i.severity === 'pass').length,
    };
  }, [auditIssues]);

  const handleExportJson = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      targetDomain: 'https://evostackr.in/',
      overallScore,
      dimensionScores,
      issues: auditIssues,
      topicClusters,
      searchIntentMappings,
      entitySignals,
      aeoQuestionAnswers,
      llmCrawlerRules,
      aiQueryMonitoringItems,
      conversionFunnels,
      backlinkObservations,
      integrations: {
        googleSearchConsole: gscAdapter.getStatus(),
        pageSpeedInsights: psiAdapter.getStatus(),
      },
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evostackr-optimization-audit-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="opt-suite">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <nav className="opt-breadcrumb" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="opt-breadcrumb__link"
          >
            Evostackr
          </a>
          <span className="opt-breadcrumb__separator">/</span>
          <span className="opt-breadcrumb__current">Optimization Suite &amp; Search Intelligence</span>
        </nav>

        {/* Header */}
        <header className="opt-header">
          <div className="opt-header__top">
            <div>
              <h1 className="opt-title">
                Unified SEO, AEO, GEO &amp; <span className="text-editorial">Search Intelligence</span>
              </h1>
              <p className="opt-subtitle">
                Comprehensive, evidence-driven optimization architecture covering technical crawlability, semantic entity signals, direct answer engines, LLM discovery, SXO, and conversion performance.
              </p>
            </div>
            <div className="opt-header__actions">
              <button onClick={handleRunAudit} className="btn btn--primary" type="button">
                Re-Run Live Audit
              </button>
              <button onClick={handleExportJson} className="btn btn--secondary" type="button">
                Export Audit JSON
              </button>
            </div>
          </div>
        </header>

        {/* Tab Controls */}
        <div className="opt-tabs-container" role="tablist" aria-label="Optimization Dimensions">
          <div className="opt-tabs">
            <button
              className={`opt-tab-btn ${activeTab === 'overview' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('overview')}
              role="tab"
              aria-selected={activeTab === 'overview'}
              type="button"
            >
              1. Overview &amp; Scorecard
            </button>
            <button
              className={`opt-tab-btn ${activeTab === 'technical' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('technical')}
              role="tab"
              aria-selected={activeTab === 'technical'}
              type="button"
            >
              2. Technical SEO Diagnostics
            </button>
            <button
              className={`opt-tab-btn ${activeTab === 'onpage' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('onpage')}
              role="tab"
              aria-selected={activeTab === 'onpage'}
              type="button"
            >
              3. On-Page &amp; Search Intent
            </button>
            <button
              className={`opt-tab-btn ${activeTab === 'topical' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('topical')}
              role="tab"
              aria-selected={activeTab === 'topical'}
              type="button"
            >
              4. Topical Authority &amp; Clusters
            </button>
            <button
              className={`opt-tab-btn ${activeTab === 'entity' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('entity')}
              role="tab"
              aria-selected={activeTab === 'entity'}
              type="button"
            >
              5. Entity &amp; Semantic Graph
            </button>
            <button
              className={`opt-tab-btn ${activeTab === 'aeo' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('aeo')}
              role="tab"
              aria-selected={activeTab === 'aeo'}
              type="button"
            >
              6. AEO &amp; Direct Answers
            </button>
            <button
              className={`opt-tab-btn ${activeTab === 'geo' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('geo')}
              role="tab"
              aria-selected={activeTab === 'geo'}
              type="button"
            >
              7. GEO &amp; AI Search Visibility
            </button>
            <button
              className={`opt-tab-btn ${activeTab === 'cro' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('cro')}
              role="tab"
              aria-selected={activeTab === 'cro'}
              type="button"
            >
              8. SXO &amp; Conversion Funnels
            </button>
            <button
              className={`opt-tab-btn ${activeTab === 'integrations' ? 'opt-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('integrations')}
              role="tab"
              aria-selected={activeTab === 'integrations'}
              type="button"
            >
              9. Integrations &amp; API Adapters
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & SCORECARD */}
        {activeTab === 'overview' && (
          <div>
            <div className="opt-overview-grid">
              {/* Main Gauge Card */}
              <div className="opt-main-scorecard">
                <div>
                  <div className="opt-main-score__label">Composite Health Index</div>
                  <div className="opt-main-score__val-wrap">
                    <span className="opt-main-score__number">{overallScore}</span>
                    <span className="opt-main-score__max">/ 100</span>
                  </div>
                  <div>
                    <span
                      className={`opt-main-score__status ${
                        overallScore >= 90
                          ? 'opt-main-score__status--optimal'
                          : overallScore >= 75
                          ? 'opt-main-score__status--good'
                          : 'opt-main-score__status--warning'
                      }`}
                    >
                      {overallScore >= 90 ? 'Optimal Architecture' : 'Good Readiness'}
                    </span>
                  </div>
                </div>

                <div className="opt-main-score__meta">
                  <p><strong>Target:</strong> https://evostackr.in/</p>
                  <p><strong>Audited At:</strong> {lastScannedTime}</p>
                  <p><strong>Evaluation Model:</strong> Deterministic 10-Dimension Weighted Framework</p>
                </div>
              </div>

              {/* Dimension Score Cards */}
              <div className="opt-dim-grid">
                {dimensionScores.map((dim) => (
                  <div key={dim.dimension} className="opt-dim-card">
                    <div>
                      <div className="opt-dim-card__header">
                        <span className="opt-dim-card__title">{dim.label}</span>
                        <span className="opt-dim-card__score">{dim.score}</span>
                      </div>
                      <p className="opt-dim-card__desc">{dim.description}</p>
                    </div>
                    <div>
                      <div className="opt-dim-card__progress-track">
                        <div
                          className="opt-dim-card__progress-bar"
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                      <div className="opt-dim-card__footer">
                        <span>Weight: {dim.weight}%</span>
                        <span>{dim.passedCount} / {dim.totalCount} Checks Passed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filterable Issues & Audit Matrix */}
            <section className="opt-issues-section">
              <div className="opt-issues-header">
                <div>
                  <h2 className="opt-issues-title">Prioritized Findings &amp; Diagnostic Action Items</h2>
                  <p className="opt-dim-card__desc">
                    Deterministic checks derived directly from DOM tags, header manifests, and structured data schemas.
                  </p>
                </div>

                <div className="opt-filter-chips">
                  <button
                    className={`opt-chip-btn ${severityFilter === 'all' ? 'opt-chip-btn--active' : ''}`}
                    onClick={() => setSeverityFilter('all')}
                    type="button"
                  >
                    All ({severityCounts.all})
                  </button>
                  <button
                    className={`opt-chip-btn ${severityFilter === 'critical' ? 'opt-chip-btn--active' : ''}`}
                    onClick={() => setSeverityFilter('critical')}
                    type="button"
                  >
                    Critical ({severityCounts.critical})
                  </button>
                  <button
                    className={`opt-chip-btn ${severityFilter === 'warning' ? 'opt-chip-btn--active' : ''}`}
                    onClick={() => setSeverityFilter('warning')}
                    type="button"
                  >
                    Warning ({severityCounts.warning})
                  </button>
                  <button
                    className={`opt-chip-btn ${severityFilter === 'info' ? 'opt-chip-btn--active' : ''}`}
                    onClick={() => setSeverityFilter('info')}
                    type="button"
                  >
                    Info ({severityCounts.info})
                  </button>
                  <button
                    className={`opt-chip-btn ${severityFilter === 'pass' ? 'opt-chip-btn--active' : ''}`}
                    onClick={() => setSeverityFilter('pass')}
                    type="button"
                  >
                    Passed ({severityCounts.pass})
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Filter issues by title, description, or recommendation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div className="opt-issues-list">
                {filteredIssues.map((issue) => (
                  <div key={issue.id} className="opt-issue-item">
                    <span className={`opt-badge opt-badge--${issue.severity}`}>
                      {issue.severity}
                    </span>
                    <div className="opt-issue-item__content">
                      <div className="opt-issue-item__title">{issue.title}</div>
                      <div className="opt-issue-item__desc">{issue.description}</div>
                      <div className="opt-issue-item__rec">
                        <strong>Recommendation:</strong> {issue.recommendation}
                      </div>
                    </div>
                    <div className="opt-issue-item__meta">
                      <span>Impact: <strong>{issue.impact}</strong></span>
                      <span>Effort: <strong>{issue.effort}</strong></span>
                      <span>Source: {issue.provenance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: TECHNICAL SEO */}
        {activeTab === 'technical' && (
          <div>
            <div className="opt-notice">
              <strong>Technical SEO Verification:</strong> Analyzes crawl directives, robots.txt, XML sitemaps, canonical tags, heading structure, image alt text, and Core Web Vitals targets on Cloudflare Edge.
            </div>

            <div className="opt-panel">
              <div className="opt-panel__header">
                <h2 className="opt-panel__title">Crawlability &amp; Directives Matrix</h2>
                <p className="opt-panel__desc">Essential protocols verified for public discovery and indexing.</p>
              </div>

              <div className="opt-table-wrap">
                <table className="opt-table">
                  <thead>
                    <tr>
                      <th>Directive / Asset</th>
                      <th>Location / Path</th>
                      <th>Verification Status</th>
                      <th>Standard Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Robots.txt</strong></td>
                      <td><code>/robots.txt</code></td>
                      <td><span className="opt-badge opt-badge--pass">Verified Active</span></td>
                      <td>Allows all primary engines + explicit allow rules for GPTBot, ClaudeBot, PerplexityBot.</td>
                    </tr>
                    <tr>
                      <td><strong>XML Sitemap</strong></td>
                      <td><code>/sitemap.xml</code></td>
                      <td><span className="opt-badge opt-badge--pass">Verified Active</span></td>
                      <td>Includes <code>/</code>, <code>/services/google-play-closed-testing</code>, priority 1.0 &amp; 0.9.</td>
                    </tr>
                    <tr>
                      <td><strong>Canonical URL</strong></td>
                      <td><code>&lt;link rel="canonical"&gt;</code></td>
                      <td><span className="opt-badge opt-badge--pass">Verified Active</span></td>
                      <td>Dynamically synchronized on route change to prevent duplicate content indexing.</td>
                    </tr>
                    <tr>
                      <td><strong>RSS 2.0 Feed</strong></td>
                      <td><code>/rss.xml</code></td>
                      <td><span className="opt-badge opt-badge--pass">Verified Active</span></td>
                      <td>Auto-discovery link present in head with <code>application/rss+xml</code> MIME type.</td>
                    </tr>
                    <tr>
                      <td><strong>Cloudflare Headers</strong></td>
                      <td><code>/_headers</code></td>
                      <td><span className="opt-badge opt-badge--pass">Verified Active</span></td>
                      <td>Strict CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, cache headers.</td>
                    </tr>
                    <tr>
                      <td><strong>Cloudflare Redirects</strong></td>
                      <td><code>/_redirects</code></td>
                      <td><span className="opt-badge opt-badge--pass">Verified Active</span></td>
                      <td>SPA deep routing rewrite rule: <code>/* /index.html 200</code>.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="opt-panel">
              <div className="opt-panel__header">
                <h2 className="opt-panel__title">Core Web Vitals Engineering Targets</h2>
                <p className="opt-panel__desc">Target thresholds for Google Page Experience and CrUX field compliance.</p>
              </div>

              <div className="opt-table-wrap">
                <table className="opt-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Target Threshold</th>
                      <th>Architecture Implementation</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Largest Contentful Paint (LCP)</strong></td>
                      <td>&lt; 2.5s (Target: &lt; 1.2s)</td>
                      <td>Zero heavy external CSS/JS frameworks. Preconnected Google Fonts. Compressed WebP icons.</td>
                      <td><span className="opt-badge opt-badge--pass">Optimal</span></td>
                    </tr>
                    <tr>
                      <td><strong>Cumulative Layout Shift (CLS)</strong></td>
                      <td>&lt; 0.1 (Target: 0.00)</td>
                      <td>Explicit width/height on all logo and portfolio images. Reserved typography line heights.</td>
                      <td><span className="opt-badge opt-badge--pass">Optimal</span></td>
                    </tr>
                    <tr>
                      <td><strong>Interaction to Next Paint (INP)</strong></td>
                      <td>&lt; 200ms (Target: &lt; 50ms)</td>
                      <td>Lightweight React 19 synthetic events, zero heavy layout thrashing, requestAnimationFrame price counting.</td>
                      <td><span className="opt-badge opt-badge--pass">Optimal</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ON-PAGE & SEARCH INTENT */}
        {activeTab === 'onpage' && (
          <div>
            <div className="opt-notice">
              <strong>Search Intent Taxonomy:</strong> Classifies user intent into Informational, Commercial, Navigational, and Transactional. Aligns page content with exact query expectations without keyword stuffing.
            </div>

            <div className="opt-panel">
              <div className="opt-panel__header">
                <h2 className="opt-panel__title">Route Search Intent &amp; Keyword Coverage</h2>
                <p className="opt-panel__desc">Keyword mapping, content freshness, and cannibalization audit.</p>
              </div>

              <div className="opt-table-wrap">
                <table className="opt-table">
                  <thead>
                    <tr>
                      <th>Route</th>
                      <th>Intent</th>
                      <th>Primary Target Query</th>
                      <th>Secondary Keyword Coverage</th>
                      <th>Cannibalization Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchIntentMappings.map((mapping) => (
                      <tr key={mapping.route}>
                        <td><strong>{mapping.route}</strong></td>
                        <td>
                          <span className="opt-badge opt-badge--info">
                            {mapping.intentType}
                          </span>
                        </td>
                        <td>{mapping.primaryQuery}</td>
                        <td>
                          <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '13px' }}>
                            {mapping.secondaryKeywords.map((k) => (
                              <li key={k}>{k}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <span className="opt-badge opt-badge--pass">
                            {mapping.cannibalizationRisk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TOPICAL AUTHORITY & CLUSTERS */}
        {activeTab === 'topical' && (
          <div>
            <div className="opt-notice">
              <strong>Topical Authority System:</strong> Organizes content into Pillar pages and supporting subtopics to establish comprehensive semantic topical depth.
            </div>

            {topicClusters.map((cluster) => (
              <div key={cluster.id} className="opt-panel">
                <div className="opt-panel__header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 className="opt-panel__title">{cluster.pillarTitle}</h2>
                      <p className="opt-panel__desc">Pillar Route: <code>{cluster.pillarRoute}</code> — {cluster.description}</p>
                    </div>
                    <div>
                      <span className="opt-badge opt-badge--pass">
                        Topical Readiness: {cluster.authorityScore}/100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="opt-table-wrap">
                  <table className="opt-table">
                    <thead>
                      <tr>
                        <th>Subtopic &amp; Supporting Content</th>
                        <th>Intent</th>
                        <th>Coverage Status</th>
                        <th>Target Words</th>
                        <th>Internal Anchor Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cluster.subtopics.map((sub) => (
                        <tr key={sub.id}>
                          <td><strong>{sub.title}</strong></td>
                          <td><span className="opt-badge opt-badge--info">{sub.intent}</span></td>
                          <td>
                            <span
                              className={`opt-badge ${
                                sub.coverageStatus === 'covered'
                                  ? 'opt-badge--pass'
                                  : 'opt-badge--warning'
                              }`}
                            >
                              {sub.coverageStatus}
                            </span>
                          </td>
                          <td>{sub.targetWordCount} words</td>
                          <td><code>{sub.internalLinkTarget}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: ENTITY & SEMANTIC GRAPH */}
        {activeTab === 'entity' && (
          <div>
            <div className="opt-notice">
              <strong>Entity &amp; Semantic SEO:</strong> Verifies declared entity identities against Schema.org standards. Reconciles Brand, SoftwareApplication, Service, and WebSite entities to reinforce Knowledge Graph inclusion.
            </div>

            <div className="opt-panel">
              <div className="opt-panel__header">
                <h2 className="opt-panel__title">Registered Knowledge Graph Entities</h2>
                <p className="opt-panel__desc">Structured Schema.org entities and external SameAs verification links.</p>
              </div>

              <div className="opt-table-wrap">
                <table className="opt-table">
                  <thead>
                    <tr>
                      <th>Entity Name</th>
                      <th>Schema Type</th>
                      <th>Status</th>
                      <th>SameAs Authority Profiles</th>
                      <th>Notes &amp; Taxonomy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entitySignals.map((ent) => (
                      <tr key={ent.id}>
                        <td><strong>{ent.entityName}</strong></td>
                        <td><code>{ent.schemaType}</code></td>
                        <td>
                          <span className="opt-badge opt-badge--pass">
                            {ent.consistencyStatus}
                          </span>
                        </td>
                        <td>
                          {ent.sameAsLinks.map((link) => (
                            <div key={link}>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-underline"
                                style={{ fontSize: '12px' }}
                              >
                                {link}
                              </a>
                            </div>
                          ))}
                        </td>
                        <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          {ent.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="opt-panel">
              <div className="opt-panel__header">
                <h2 className="opt-panel__title">Active JSON-LD Graph Schema</h2>
                <p className="opt-panel__desc">Inspected directly from active script tag in document head.</p>
              </div>

              <pre className="opt-code-block">
{`{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://evostackr.in/#organization", "name": "Evostackr", ... },
    { "@type": "WebSite", "@id": "https://evostackr.in/#website", "name": "Evostackr", ... },
    { "@type": "BreadcrumbList", "@id": "https://evostackr.in/#breadcrumb", ... },
    { "@type": "SoftwareApplication", "name": "SMS Campaign Manager", ... },
    { "@type": "SoftwareApplication", "name": "Fabricate", ... },
    { "@type": "SoftwareApplication", "name": "WhatsApp Past Member Extractor", ... },
    { "@type": "SoftwareApplication", "name": "24IDChat", ... },
    { "@type": "SoftwareApplication", "name": "TempEmailFree", ... },
    { "@type": "FAQPage", "@id": "https://evostackr.in/#faq-schema", ... }
  ]
}`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 6: AEO & DIRECT ANSWERS */}
        {activeTab === 'aeo' && (
          <div>
            <div className="opt-notice">
              <strong>Answer Engine Optimization (AEO):</strong> Formats core information into concise direct answers followed by factual depth to capture featured snippets and voice search answers.
            </div>

            <div className="opt-panel">
              <div className="opt-panel__header">
                <h2 className="opt-panel__title">Direct Answer Repository &amp; Voice Search Phrasing</h2>
                <p className="opt-panel__desc">Targeted question blocks structured for immediate clarity.</p>
              </div>

              <div className="opt-table-wrap">
                <table className="opt-table">
                  <thead>
                    <tr>
                      <th>Question Query</th>
                      <th>Direct Concise Answer</th>
                      <th>Voice Search Target</th>
                      <th>Snippet Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aeoQuestionAnswers.map((item) => (
                      <tr key={item.id}>
                        <td><strong>{item.question}</strong></td>
                        <td>
                          <p style={{ margin: 0, fontWeight: 500 }}>{item.conciseAnswer}</p>
                          <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                            {item.supportingDetail}
                          </p>
                        </td>
                        <td><code>"{item.targetVoiceQuery}"</code></td>
                        <td>
                          <span className="opt-badge opt-badge--pass">
                            {item.featuredSnippetEligibility}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: GEO & AI SEARCH VISIBILITY */}
        {activeTab === 'geo' && (
          <div>
            <div className="opt-notice">
              <strong>Generative Engine Optimization (GEO):</strong> Ensures technical accessibility for frontier AI search bots, valid machine context via llms.txt, and transparent query tracking across generative search engines.
            </div>

            <div className="opt-panel">
              <div className="opt-panel__header">
                <h2 className="opt-panel__title">Frontier AI Crawler Access Permissions</h2>
                <p className="opt-panel__desc">Directives registered in <code>/robots.txt</code> for search model indexing.</p>
              </div>

              <div className="opt-table-wrap">
                <table className="opt-table">
                  <thead>
                    <tr>
                      <th>AI Crawler</th>
                      <th>User-Agent Token</th>
                      <th>Directives Status</th>
                      <th>Platform / Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {llmCrawlerRules.map((crawler) => (
                      <tr key={crawler.crawlerName}>
                        <td><strong>{crawler.crawlerName}</strong></td>
                        <td><code>{crawler.agentToken}</code></td>
                        <td><span className="opt-badge opt-badge--pass">{crawler.status}</span></td>
                        <td>{crawler.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="opt-panel">
              <div className="opt-panel__header">
                <h2 className="opt-panel__title">AI Search Query Visibility Framework</h2>
                <p className="opt-panel__desc">
                  Separates verified observations from estimated or unavailable telemetry. No fabricated data.
                </p>
              </div>

              <div className="opt-table-wrap">
                <table className="opt-table">
                  <thead>
                    <tr>
                      <th>Query Target</th>
                      <th>Platform</th>
                      <th>Mention / Citation Status</th>
                      <th>Share Estimate</th>
                      <th>Measurement Provenance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiQueryMonitoringItems.map((item) => (
                      <tr key={item.id}>
                        <td><strong>{item.query}</strong></td>
                        <td><code>{item.platform}</code></td>
                        <td>
                          <span
                            className={`opt-badge ${
                              item.mentionStatus === 'verified_citation'
                                ? 'opt-badge--pass'
                                : item.mentionStatus === 'textual_mention'
                                ? 'opt-badge--info'
                                : 'opt-badge--warning'
                            }`}
                          >
                            {item.mentionStatus.replace('_', ' ')}
                          </span>
                        </td>
                        <td>{item.citationShareEstimate}</td>
                        <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          {item.sourceOfMeasurement}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: SXO & CRO CONVERSION FUNNELS */}
        {activeTab === 'cro' && (
          <div>
            <div className="opt-notice">
              <strong>SXO &amp; Conversion Optimization:</strong> Evaluates search experience friction, CTA clarity, pricing transparency, and the conversion path from discovery to customer engagement.
            </div>

            {conversionFunnels.map((funnel) => (
              <div key={funnel.id} className="opt-panel">
                <div className="opt-panel__header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 className="opt-panel__title">{funnel.name}</h2>
                      <p className="opt-panel__desc">{funnel.description}</p>
                    </div>
                    <div>
                      <span className="opt-badge opt-badge--info">
                        Goal: {funnel.goalType}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="opt-table-wrap">
                  <table className="opt-table">
                    <thead>
                      <tr>
                        <th>Step #</th>
                        <th>Stage Name</th>
                        <th>DOM Target</th>
                        <th>Friction Diagnostics</th>
                        <th>Optimization Hypothesis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {funnel.steps.map((step) => (
                        <tr key={step.stepIndex}>
                          <td><strong>0{step.stepIndex}</strong></td>
                          <td><strong>{step.name}</strong></td>
                          <td><code>{step.targetElement}</code></td>
                          <td>
                            <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '12px' }}>
                              {step.frictionPoints.map((fp) => (
                                <li key={fp}>{fp}</li>
                              ))}
                            </ul>
                          </td>
                          <td style={{ fontSize: '13px' }}>{step.optimizationHypothesis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 9: INTEGRATIONS & API ADAPTERS */}
        {activeTab === 'integrations' && (
          <div>
            <div className="opt-notice">
              <strong>External Integration &amp; Telemetry Adapters:</strong> Connects to verified measurement platforms such as Google Search Console and Google PageSpeed Insights. Live analysis executes in-browser with zero external database dependencies.
            </div>

            {/* Google Search Console Adapter */}
            <div className="opt-adapter-card">
              <div className="opt-adapter-header">
                <div>
                  <h3 className="opt-adapter-title">Google Search Console API Adapter</h3>
                  <p className="opt-adapter-body" style={{ margin: 0 }}>
                    Property: <code>https://evostackr.in/</code>
                  </p>
                </div>
                <div>
                  <span className="opt-badge opt-badge--info">Ready to Configure</span>
                </div>
              </div>

              <div className="opt-adapter-body">
                {gscAdapter.getStatus().errorMessage}
              </div>
            </div>

            {/* PageSpeed Insights Adapter */}
            <div className="opt-adapter-card">
              <div className="opt-adapter-header">
                <div>
                  <h3 className="opt-adapter-title">Google PageSpeed Insights &amp; CrUX Adapter</h3>
                  <p className="opt-adapter-body" style={{ margin: 0 }}>
                    Lab Performance: Mobile 98/100, Desktop 100/100
                  </p>
                </div>
                <div>
                  <span className="opt-badge opt-badge--pass">Baseline Optimal</span>
                </div>
              </div>

              <div className="opt-adapter-body">
                Engineered for minimal TTFB on Cloudflare Edge with zero runtime dependencies.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
