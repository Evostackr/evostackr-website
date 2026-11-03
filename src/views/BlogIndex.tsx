import { useState, useMemo } from 'react';
import './BlogIndex.css';
import { getAllArticles, getAllCategories } from '../data/blogArticles';

interface BlogIndexProps {
  onNavigateHome: () => void;
  onNavigate: (path: string, hash?: string) => void;
}

export function BlogIndex({ onNavigateHome, onNavigate }: BlogIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const articles = useMemo(() => getAllArticles(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const featuredArticle = articles[0];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.categorySlug === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const inTitle = article.title.toLowerCase().includes(query);
      const inExcerpt = article.excerpt.toLowerCase().includes(query);
      const inCategory = article.categoryName.toLowerCase().includes(query);
      const inTags = article.tags.some((tag) => tag.toLowerCase().includes(query));

      return inTitle || inExcerpt || inCategory || inTags;
    });
  }, [articles, selectedCategory, searchQuery]);

  const handleArticleClick = (slug: string) => {
    onNavigate(`/blog/${slug}`);
  };

  const handleCategoryPillClick = (catSlug: string) => {
    setSelectedCategory(catSlug);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="blog-index">
      {/* Breadcrumbs Navigation */}
      <nav className="blog-breadcrumbs container" aria-label="Breadcrumb">
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
          <li className="breadcrumbs-item breadcrumbs-item--active" aria-current="page">
            Blog
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="blog-hero container">
        <div className="section-label">
          <span className="section-label__line" />
          <span className="text-meta">TECHNICAL INSIGHTS & ARCHITECTURE BLUEPRINTS</span>
        </div>
        <h1 className="blog-hero__title">
          Engineering <span className="text-editorial">Journal</span>
        </h1>
        <p className="blog-hero__description">
          In-depth architectural guides, distributed systems patterns, and production playbooks authored by the Evostackr systems engineering group.
        </p>
      </header>

      {/* Featured Article Banner (Only on "all" and when not searching) */}
      {selectedCategory === 'all' && !searchQuery && featuredArticle && (
        <section className="blog-featured container" aria-label="Featured Article">
          <article
            className="featured-card"
            onClick={() => handleArticleClick(featuredArticle.slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleArticleClick(featuredArticle.slug);
              }
            }}
          >
            <div className="featured-card__media">
              <img
                src={featuredArticle.featuredImage.url}
                alt={featuredArticle.featuredImage.alt}
                width={1200}
                height={675}
                loading="eager"
                className="featured-card__image"
                onError={(e) => {
                  // Fallback geometric placeholder if asset generation is pending
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="featured-card__media-fallback" aria-hidden="true">
                <span className="featured-card__fallback-badge">ARCHITECTURAL BLUEPRINT</span>
              </div>
            </div>
            <div className="featured-card__content">
              <div className="article-meta">
                <span className="article-meta__badge">{featuredArticle.categoryName}</span>
                <span className="article-meta__divider" aria-hidden="true">•</span>
                <span className="article-meta__time">{featuredArticle.readTimeMinutes} min read</span>
                <span className="article-meta__divider" aria-hidden="true">•</span>
                <span className="article-meta__date">{formatDate(featuredArticle.publishedDate)}</span>
              </div>
              <h2 className="featured-card__title">
                {featuredArticle.title}
              </h2>
              <p className="featured-card__excerpt">
                {featuredArticle.excerpt}
              </p>
              <div className="featured-card__footer">
                <div className="author-byline">
                  <img
                    src={featuredArticle.author.avatar}
                    alt={featuredArticle.author.name}
                    width={32}
                    height={32}
                    className="author-byline__avatar"
                  />
                  <div className="author-byline__info">
                    <span className="author-byline__name">{featuredArticle.author.name}</span>
                    <span className="author-byline__role">{featuredArticle.author.role}</span>
                  </div>
                </div>
                <span className="featured-card__cta">
                  Read Full Guide <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Filter and Search Bar */}
      <section className="blog-controls container" aria-label="Article Filters and Search">
        <div className="blog-controls__categories" role="tablist" aria-label="Filter articles by category">
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            className={`category-pill ${selectedCategory === 'all' ? 'category-pill--active' : ''}`}
            onClick={() => handleCategoryPillClick('all')}
          >
            All Articles <span className="category-pill__count">({articles.length})</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.slug}
              className={`category-pill ${selectedCategory === cat.slug ? 'category-pill--active' : ''}`}
              onClick={() => handleCategoryPillClick(cat.slug)}
            >
              {cat.name} <span className="category-pill__count">({cat.count})</span>
            </button>
          ))}
        </div>

        <div className="blog-controls__search">
          <label htmlFor="blog-search-input" className="sr-only">Search articles</label>
          <div className="search-input-wrapper">
            <svg
              className="search-input-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="blog-search-input"
              type="search"
              className="search-input"
              placeholder="Search by topic, keyword, or architecture pattern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-input-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="blog-grid-section container" aria-label="Articles List">
        {filteredArticles.length === 0 ? (
          <div className="blog-empty-state">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="text-meta">NO MATCHING ARTICLES</span>
            </div>
            <h3 className="blog-empty-state__title">No articles found matching your criteria</h3>
            <p className="blog-empty-state__description">
              Try adjusting your search terms or select another category filter.
            </p>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredArticles.map((article, index) => (
              <article
                key={article.slug}
                className="article-card"
                onClick={() => handleArticleClick(article.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleArticleClick(article.slug);
                  }
                }}
              >
                <div className="article-card__media">
                  <img
                    src={article.featuredImage.url}
                    alt={article.featuredImage.alt}
                    width={600}
                    height={338}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    className="article-card__image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="article-card__media-fallback" aria-hidden="true">
                    <span className="article-card__category-watermark">{article.categoryName}</span>
                  </div>
                </div>

                <div className="article-card__body">
                  <div className="article-meta">
                    <span className="article-meta__badge">{article.categoryName}</span>
                    <span className="article-meta__divider" aria-hidden="true">•</span>
                    <span className="article-meta__time">{article.readTimeMinutes} min read</span>
                  </div>

                  <h3 className="article-card__title">
                    <a
                      href={`/blog/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleArticleClick(article.slug);
                      }}
                      className="article-card__title-link"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="article-card__excerpt">
                    {article.excerpt}
                  </p>

                  <div className="article-card__tags">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="article-card__footer">
                    <span className="article-card__date">{formatDate(article.publishedDate)}</span>
                    <span className="article-card__arrow" aria-hidden="true">
                      Read Guide →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Engineering Consultation CTA */}
      <section className="blog-cta container" aria-label="Engineering Inquiries">
        <div className="blog-cta__inner">
          <div className="blog-cta__content">
            <div className="section-label">
              <span className="section-label__line" />
              <span className="text-meta text-meta--dark">CUSTOM SOFTWARE & SYSTEMS ENGINEERING</span>
            </div>
            <h2 className="blog-cta__title">
              Architecting High-Concurrency Cloud Systems?
            </h2>
            <p className="blog-cta__description">
              Evostackr partners with growing engineering teams to design resilient multi-tenant architectures, automate zero-downtime CI/CD pipelines, and engineer mission-critical backend systems.
            </p>
          </div>
          <div className="blog-cta__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => onNavigate('/', '#contact')}
            >
              Schedule Architecture Review <span className="arrow" aria-hidden="true">→</span>
            </button>
            <a
              href="mailto:support@evostackr.in"
              className="btn btn--secondary"
            >
              Email Engineering Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
