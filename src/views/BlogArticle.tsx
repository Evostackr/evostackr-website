import { useState, useEffect } from 'react';
import './BlogArticle.css';
import {
  type BlogArticle,
  getRelatedArticles,
} from '../data/blogArticles';
import { products } from '../data/products';
import { services } from '../data/services';
import { storeProducts } from '../data/storeProducts';

interface BlogArticleProps {
  article?: BlogArticle | null;
  onNavigateHome: () => void;
  onNavigate: (path: string, hash?: string) => void;
}

export function BlogArticle({ article, onNavigateHome, onNavigate }: BlogArticleProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  // Active TOC scroll spy
  useEffect(() => {
    if (!article) return;
    const handleScroll = () => {
      const headings = article.tableOfContents.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPos = window.scrollY + 140;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPos) {
          setActiveHeadingId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="blog-article-page">
        <nav className="article-breadcrumbs container" aria-label="Breadcrumb">
          <ol className="breadcrumbs-list">
            <li className="breadcrumbs-item">
              <button
                type="button"
                onClick={onNavigateHome}
                className="breadcrumbs-link"
                aria-label="Return to Evostackr homepage"
              >
                Home
              </button>
            </li>
            <li className="breadcrumbs-separator" aria-hidden="true">/</li>
            <li className="breadcrumbs-item">
              <button
                type="button"
                onClick={() => onNavigate('/blog')}
                className="breadcrumbs-link"
                aria-label="Return to Blog index"
              >
                Blog
              </button>
            </li>
            <li className="breadcrumbs-separator" aria-hidden="true">/</li>
            <li className="breadcrumbs-item breadcrumbs-item--active" aria-current="page">
              Article Not Found
            </li>
          </ol>
        </nav>
        <section
          className="container"
          style={{
            paddingTop: 'var(--space-4xl)',
            paddingBottom: 'var(--space-5xl)',
            textAlign: 'center',
          }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <span className="section-label__line" />
            <span className="text-meta">ARTICLE NOT FOUND</span>
          </div>
          <h1
            style={{
              fontSize: 'var(--fs-h2)',
              marginTop: 'var(--space-sm)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Article Not Found
          </h1>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-xl)',
            }}
          >
            The architectural guide you requested does not exist or has been relocated.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onNavigate('/blog')}
          >
            ← Return to Blog
          </button>
        </section>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  // Match related product or service for the conversion CTA
  const relatedProduct = article.relatedProductSlug
    ? products.find((p) => p.slug === article.relatedProductSlug) ||
      storeProducts.find((p) => p.slug === article.relatedProductSlug)
    : null;

  const relatedService = article.relatedServiceSlug
    ? services.find((s) => s.slug === article.relatedServiceSlug || s.id === article.relatedServiceSlug)
    : null;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="blog-article-page" itemScope itemType="https://schema.org/BlogPosting">
      {/* Breadcrumbs Navigation */}
      <nav className="article-breadcrumbs container" aria-label="Breadcrumb">
        <ol className="breadcrumbs-list">
          <li className="breadcrumbs-item">
            <button
              type="button"
              onClick={onNavigateHome}
              className="breadcrumbs-link"
              aria-label="Return to Evostackr homepage"
            >
              Home
            </button>
          </li>
          <li className="breadcrumbs-separator" aria-hidden="true">/</li>
          <li className="breadcrumbs-item">
            <button
              type="button"
              onClick={() => onNavigate('/blog')}
              className="breadcrumbs-link"
              aria-label="Return to Blog index"
            >
              Blog
            </button>
          </li>
          <li className="breadcrumbs-separator" aria-hidden="true">/</li>
          <li className="breadcrumbs-item">
            <button
              type="button"
              onClick={() => onNavigate(`/blog/category/${article.categorySlug}`)}
              className="breadcrumbs-link"
              aria-label={`View articles in ${article.categoryName}`}
            >
              {article.categoryName}
            </button>
          </li>
          <li className="breadcrumbs-separator" aria-hidden="true">/</li>
          <li className="breadcrumbs-item breadcrumbs-item--active" aria-current="page">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="article-header container">
        <div className="article-header__meta">
          <button
            type="button"
            className="article-header__category-badge"
            onClick={() => onNavigate(`/blog/category/${article.categorySlug}`)}
          >
            {article.categoryName}
          </button>
          <span className="article-header__meta-item">{article.readTimeMinutes} min read</span>
          <span className="article-header__meta-item" aria-hidden="true">•</span>
          <time dateTime={article.publishedDate} className="article-header__meta-item">
            Published {formatDate(article.publishedDate)}
          </time>
          {article.modifiedDate && article.modifiedDate !== article.publishedDate && (
            <>
              <span className="article-header__meta-item" aria-hidden="true">•</span>
              <time dateTime={article.modifiedDate} className="article-header__meta-item">
                Updated {formatDate(article.modifiedDate)}
              </time>
            </>
          )}
        </div>

        <h1 className="article-header__title" itemProp="headline">
          {article.title}
        </h1>

        <p className="article-header__headline" itemProp="description">
          {article.headline}
        </p>

        <div className="article-header__byline" itemProp="author" itemScope itemType="https://schema.org/Person">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            width={44}
            height={44}
            className="article-author-avatar"
            itemProp="image"
          />
          <div className="article-author-info">
            <span className="article-author-name" itemProp="name">{article.author.name}</span>
            <span className="article-author-role">{article.author.role}</span>
          </div>
        </div>
      </header>

      {/* Featured Image Banner (16:9 Aspect Ratio) */}
      <div className="article-banner container">
        <figure className="article-banner__figure">
          <div className="article-banner__media">
            <img
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              width={1200}
              height={675}
              loading="eager"
              className="article-banner__image"
              itemProp="image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="article-banner__fallback" aria-hidden="true">
              <span className="article-banner__fallback-text">
                EVOSTACKR ARCHITECTURAL SPECIFICATION • {article.categoryName.toUpperCase()}
              </span>
            </div>
          </div>
          {article.featuredImage.caption && (
            <figcaption className="article-banner__caption">
              {article.featuredImage.caption}
            </figcaption>
          )}
        </figure>
      </div>

      {/* Main Reading Layout (Sidebar TOC + Article Content) */}
      <div className="article-layout container">
        {/* Sticky Table of Contents Sidebar */}
        <aside className="article-sidebar" aria-label="Table of Contents">
          <div className="article-sidebar__inner">
            <h2 className="article-toc__title text-meta">TABLE OF CONTENTS</h2>
            <nav className="article-toc__nav">
              <ul className="article-toc__list">
                {article.tableOfContents.map((item) => (
                  <li
                    key={item.id}
                    className={`article-toc__item article-toc__item--level-${item.level} ${
                      activeHeadingId === item.id ? 'article-toc__item--active' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToHeading(item.id)}
                      className="article-toc__link"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Quick Share / Link utility */}
            <div className="article-sidebar__actions">
              <button
                type="button"
                className="btn btn--secondary article-sidebar__btn"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
              >
                Copy Article Link
              </button>
            </div>
          </div>
        </aside>

        {/* Article Body Content */}
        <main className="article-content" itemProp="articleBody">
          {/* AEO/GEO Direct Answer Quick Callout (TL;DR) */}
          <section className="aeo-quick-answer" aria-label="Key Takeaways and Direct Answer">
            <div className="aeo-quick-answer__header">
              <span className="aeo-quick-answer__badge">AEO DIRECT ANSWER / ARCHITECTURAL SUMMARY</span>
            </div>
            <div
              className="aeo-quick-answer__content"
              dangerouslySetInnerHTML={{
                __html: article.directAnswerSnippet
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </section>

          {/* Render Sections Based on Table of Contents */}
          {article.tableOfContents.map((section, idx) => {
            if (section.id === 'frequently-asked-questions') return null;

            // Associate contextual images with sections
            const contextualImage = article.contextualImages[idx - 1];

            return (
              <section key={section.id} id={section.id} className="article-section">
                <h2 className="article-section__heading">
                  {section.title}
                </h2>

                {/* Section Content Scaffold */}
                <div className="article-section__body">
                  <p className="article-lead-p">
                    In enterprise environments, executing {section.title.toLowerCase()} requires establishing clear architectural invariants, decoupled state boundaries, and deterministic observability. Without these safeguards, systems encounter cascading latency, data inconsistency, and operational fragility.
                  </p>

                  <p>
                    When evaluating trade-offs at scale, engineering teams must contrast simplicity against flexibility. Core design decisions must be validated through automated contract testing, reproducible load profiles, and continuous monitoring of critical telemetry metrics.
                  </p>

                  {/* Contextual Diagram if available for this section */}
                  {contextualImage && (
                    <figure className="article-diagram">
                      <div className="article-diagram__media">
                        <img
                          src={contextualImage.url}
                          alt={contextualImage.alt}
                          width={1200}
                          height={675}
                          loading="lazy"
                          className="article-diagram__image"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="article-diagram__fallback" aria-hidden="true">
                          <span className="article-diagram__fallback-label">
                            {contextualImage.alt}
                          </span>
                        </div>
                      </div>
                      <figcaption className="article-diagram__caption">
                        {contextualImage.caption}
                      </figcaption>
                    </figure>
                  )}

                  {/* Architecture Table Demonstration for Section 2 or 3 */}
                  {idx === 2 && (
                    <div className="article-table-wrapper">
                      <h3 className="article-table-caption">
                        Table 1.0: Architectural Comparison Matrix &amp; Operational Trade-offs
                      </h3>
                      <table className="article-table">
                        <thead>
                          <tr>
                            <th>Architectural Strategy</th>
                            <th>Complexity</th>
                            <th>Isolation Level</th>
                            <th>Cost Efficiency</th>
                            <th>Optimal Use Case</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Model A: Dedicated Silo</strong></td>
                            <td>High</td>
                            <td>Complete (Physical / Virtual)</td>
                            <td>Low (Over-provisioned)</td>
                            <td>Enterprise compliance, HIPAA, SOC2</td>
                          </tr>
                          <tr>
                            <td><strong>Model B: Shared Pool</strong></td>
                            <td>Moderate</td>
                            <td>Logical (RLS / Tenant ID)</td>
                            <td>High (Elastic scaling)</td>
                            <td>Standard B2B SaaS, mid-market</td>
                          </tr>
                          <tr>
                            <td><strong>Model C: Hybrid Bridge</strong></td>
                            <td>High</td>
                            <td>Tiered (Shared compute, dedicated DB)</td>
                            <td>Moderate</td>
                            <td>High-growth SaaS with VIP tiers</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  <p>
                    Adhering to these principles guarantees that development velocity remains decoupled from infrastructure scale. Engineering teams can release updates confidently with zero downtime and measurable quality assurances.
                  </p>
                </div>
              </section>
            );
          })}

          {/* FAQ Accordion Section */}
          {article.faqs && article.faqs.length > 0 && (
            <section id="frequently-asked-questions" className="article-faqs">
              <div className="section-label">
                <span className="section-label__line" />
                <span className="text-meta">FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="article-faqs__title">
                Common Technical Questions
              </h2>

              <div className="faq-accordion">
                {article.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                    >
                      <button
                        type="button"
                        className="faq-question-btn"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <span className="faq-question-text">{faq.question}</span>
                        <span className="faq-toggle-icon" aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          id={`faq-answer-${index}`}
                          className="faq-answer"
                          role="region"
                        >
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Related Product / Service Conversion CTA */}
          {(relatedProduct || relatedService) && (
            <section className="article-conversion-cta" aria-label="Related Solution">
              <div className="conversion-cta__inner">
                <div className="conversion-cta__badge">
                  <span className="text-meta text-meta--dark">RECOMMENDED EVOSTACKR SOLUTION</span>
                </div>
                <h3 className="conversion-cta__title">
                  {relatedProduct ? `Explore ${relatedProduct.name}` : `Engage with ${relatedService?.title}`}
                </h3>
                <p className="conversion-cta__description">
                  {relatedProduct
                    ? relatedProduct.description ||
                      'Discover software built by Evostackr to solve engineering, privacy, and automation challenges.'
                    : relatedService?.description ||
                      'Work with Evostackr to engineer resilient architectures and custom software systems.'}
                </p>
                <div className="conversion-cta__actions">
                  {relatedProduct && 'slug' in relatedProduct && storeProducts.some((p) => p.slug === relatedProduct.slug) ? (
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => onNavigate(`/store/${relatedProduct.slug}`)}
                    >
                      View in Store <span className="arrow" aria-hidden="true">→</span>
                    </button>
                  ) : relatedProduct && 'url' in relatedProduct && relatedProduct.url ? (
                    <a
                      href={relatedProduct.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary"
                    >
                      Launch Product <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  ) : relatedService && relatedService.slug === 'google-play-closed-testing' ? (
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => onNavigate('/services/google-play-closed-testing')}
                    >
                      View Closed Testing Service <span className="arrow" aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => onNavigate('/', '#contact')}
                    >
                      Contact Engineering Team <span className="arrow" aria-hidden="true">→</span>
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => onNavigate('/products')}
                  >
                    View All Products
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Author Bio Card */}
          <section className="author-bio-card" aria-label="About the Author">
            <div className="author-bio-card__inner">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                width={64}
                height={64}
                className="author-bio-card__avatar"
              />
              <div className="author-bio-card__content">
                <h4 className="author-bio-card__name">
                  Written by {article.author.name}
                </h4>
                <p className="author-bio-card__role">
                  {article.author.role} at Evostackr
                </p>
                <p className="author-bio-card__text">
                  The Evostackr engineering team designs and maintains high-reliability software platforms, distributed cloud architectures, and developer tooling. All guides are based on production implementation experience.
                </p>
              </div>
            </div>
          </section>

          {/* Article Footer Controls */}
          <footer className="article-footer">
            <div className="article-footer__tags">
              <span className="article-footer__tags-label">Tagged in:</span>
              {article.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="article-footer__nav-buttons">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => onNavigate('/blog')}
              >
                ← Back to All Articles
              </button>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ↑ Top of Page
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="related-articles-section container" aria-label="Related Guides">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="text-meta">CONTINUE READING</span>
          </div>
          <h2 className="related-articles-section__title">
            Related Architectural Guides
          </h2>

          <div className="related-articles-grid">
            {relatedArticles.map((rel) => (
              <article
                key={rel.slug}
                className="article-card"
                onClick={() => onNavigate(`/blog/${rel.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(`/blog/${rel.slug}`);
                  }
                }}
              >
                <div className="article-card__media">
                  <img
                    src={rel.featuredImage.url}
                    alt={rel.featuredImage.alt}
                    width={600}
                    height={338}
                    loading="lazy"
                    className="article-card__image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="article-card__media-fallback" aria-hidden="true">
                    <span className="article-card__category-watermark">{rel.categoryName}</span>
                  </div>
                </div>
                <div className="article-card__body">
                  <div className="article-meta">
                    <span className="article-meta__badge">{rel.categoryName}</span>
                    <span className="article-meta__divider" aria-hidden="true">•</span>
                    <span className="article-meta__time">{rel.readTimeMinutes} min read</span>
                  </div>
                  <h3 className="article-card__title">
                    <a
                      href={`/blog/${rel.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${rel.slug}`);
                      }}
                      className="article-card__title-link"
                    >
                      {rel.title}
                    </a>
                  </h3>
                  <p className="article-card__excerpt">
                    {rel.excerpt}
                  </p>
                  <div className="article-card__footer">
                    <span className="article-card__date">{formatDate(rel.publishedDate)}</span>
                    <span className="article-card__arrow" aria-hidden="true">
                      Read Guide →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
