import { useMemo } from 'react';
import './BlogCategory.css';
import {
  getArticlesByCategory,
  getAllCategories,
} from '../data/blogArticles';

interface BlogCategoryProps {
  categorySlug: string;
  onNavigateHome: () => void;
  onNavigate: (path: string, hash?: string) => void;
}

export function BlogCategory({ categorySlug, onNavigateHome, onNavigate }: BlogCategoryProps) {
  const categories = useMemo(() => getAllCategories(), []);
  const currentCategory = useMemo(() => {
    return categories.find((c) => c.slug.toLowerCase() === categorySlug.toLowerCase());
  }, [categories, categorySlug]);

  const articles = useMemo(() => {
    return getArticlesByCategory(categorySlug);
  }, [categorySlug]);

  const otherCategories = useMemo(() => {
    return categories.filter((c) => c.slug.toLowerCase() !== categorySlug.toLowerCase());
  }, [categories, categorySlug]);

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

  if (!currentCategory) {
    return (
      <div className="blog-category-page">
        <nav className="category-breadcrumbs container" aria-label="Breadcrumb">
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
              Category Not Found
            </li>
          </ol>
        </nav>

        <section className="category-empty-state container">
          <div className="section-label">
            <span className="section-label__line" />
            <span className="text-meta">UNKNOWN TOPIC CLUSTER</span>
          </div>
          <h1 className="category-empty-state__title">Topic Category Not Found</h1>
          <p className="category-empty-state__description">
            The topic cluster "{categorySlug}" does not exist in our engineering index.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onNavigate('/blog')}
          >
            ← Return to Engineering Blog
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="blog-category-page">
      {/* Breadcrumbs Navigation */}
      <nav className="category-breadcrumbs container" aria-label="Breadcrumb">
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
            {currentCategory.name}
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <header className="category-hero container">
        <div className="section-label">
          <span className="section-label__line" />
          <span className="text-meta">TOPIC CLUSTER ARCHIVE</span>
        </div>
        <h1 className="category-hero__title">
          {currentCategory.name}
        </h1>
        <p className="category-hero__description">
          {currentCategory.description}
        </p>
        <div className="category-hero__count-badge">
          Showing {articles.length} {articles.length === 1 ? 'architectural guide' : 'architectural guides'}
        </div>
      </header>

      {/* Other Categories Quick Filter */}
      <section className="category-nav-bar container" aria-label="Other Topics">
        <span className="category-nav-bar__label text-meta">EXPLORE OTHER TOPICS:</span>
        <div className="category-nav-bar__pills">
          <button
            type="button"
            className="category-nav-pill"
            onClick={() => onNavigate('/blog')}
          >
            All Articles
          </button>
          {otherCategories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              className="category-nav-pill"
              onClick={() => onNavigate(`/blog/category/${cat.slug}`)}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </section>

      {/* Filtered Articles Grid */}
      <section className="category-grid-section container" aria-label={`Articles in ${currentCategory.name}`}>
        {articles.length === 0 ? (
          <div className="category-empty-state">
            <p className="category-empty-state__description">
              No published articles are currently assigned to this topic. Check back soon for upcoming guides.
            </p>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => onNavigate('/blog')}
            >
              View All Articles
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {articles.map((article, index) => (
              <article
                key={article.slug}
                className="article-card"
                onClick={() => onNavigate(`/blog/${article.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(`/blog/${article.slug}`);
                  }
                }}
              >
                <div className="article-card__media">
                  <img
                    src={article.featuredImage.url}
                    alt={article.featuredImage.alt}
                    width={600}
                    height={338}
                    loading={index < 2 ? 'eager' : 'lazy'}
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

                  <h2 className="article-card__title">
                    <a
                      href={`/blog/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${article.slug}`);
                      }}
                      className="article-card__title-link"
                    >
                      {article.title}
                    </a>
                  </h2>

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

      {/* Return to Blog CTA */}
      <section className="category-footer-cta container">
        <div className="category-footer-cta__inner">
          <div>
            <h3 className="category-footer-cta__title">
              Looking for more engineering insights?
            </h3>
            <p className="category-footer-cta__description">
              Browse our complete library of technical articles spanning AI orchestration, cloud architectures, and DevOps automation.
            </p>
          </div>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => onNavigate('/blog')}
          >
            ← View All Articles
          </button>
        </div>
      </section>
    </div>
  );
}
