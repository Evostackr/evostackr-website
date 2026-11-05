import { useEffect } from 'react';
import { products } from '../data/products';
import { services } from '../data/services';
import { storeProducts } from '../data/storeProducts';
import { blogArticles, blogCategories, getArticleBySlug } from '../data/blogArticles';

interface SEOHeadProps {
  currentPath: string;
}

export function SEOHead({ currentPath }: SEOHeadProps) {
  useEffect(() => {
    const isHome = currentPath === '/' || currentPath === '';
    const isProducts = currentPath === '/products';
    const isServices = currentPath === '/services';
    const isClosedTesting = currentPath === '/services/google-play-closed-testing';
    const isReturnPolicy =
      currentPath === '/return-policy' || currentPath === '/refund-policy';
    const isStore = currentPath === '/store';
    const isStoreProduct = currentPath.startsWith('/store/');
    const isSeoSuite =
      currentPath === '/admin/seo' ||
      currentPath === '/system/seo' ||
      currentPath === '/optimization';
    const isBlogIndex = currentPath === '/blog';
    const isBlogCategory = currentPath.startsWith('/blog/category/');
    const isBlogArticle = currentPath.startsWith('/blog/') && !isBlogCategory && currentPath !== '/blog';

    const baseUrl = 'https://evostackr.in';
    const defaultImage = `${baseUrl}/evostackr-logo.png`;

    let title = 'Evostackr — Independent Software Products & Custom Engineering';
    let description =
      'Evostackr is an independent software company building proprietary products and delivering custom web, SaaS, and automation engineering.';
    let canonical = `${baseUrl}/`;
    let ogType = 'website';
    let ogImage = defaultImage;
    let schemaJson: object | null = null;

    if (isHome) {
      title = 'Evostackr — Independent Software Products & Custom Engineering';
      description =
        'Evostackr is an independent software company building proprietary products and delivering custom web, SaaS, and automation engineering.';
      canonical = `${baseUrl}/`;
      ogType = 'website';
    } else if (isProducts) {
      title = 'Products — Independent Software Portfolio | Evostackr';
      description =
        'Explore independent software products built by Evostackr, designed to solve specific problems across mobile, privacy, utilities, and developer tools.';
      canonical = `${baseUrl}/products`;
      ogType = 'website';
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/products#collection`,
        name: 'Evostackr Software Products',
        url: `${baseUrl}/products`,
        description,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Products', item: `${baseUrl}/products` },
          ],
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products
            .filter((p) => p.published)
            .map((p, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'SoftwareApplication',
                name: p.name,
                description: p.description,
                applicationCategory: p.category || 'UtilitiesApplication',
                url: p.url || `${baseUrl}/products#${p.slug}`,
                image: p.image ? `${baseUrl}${p.image}` : defaultImage,
                operatingSystem: p.category === 'Mobile System' ? 'Android' : 'Web / Cross-platform',
              },
            })),
        },
      };
    } else if (isServices) {
      title = 'Services — Software Development & Publishing Support | Evostackr';
      description =
        "Explore Evostackr's software development, digital engineering, and Google Play publishing support services.";
      canonical = `${baseUrl}/services`;
      ogType = 'website';
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/services#collection`,
        name: 'Evostackr Engineering Services',
        url: `${baseUrl}/services`,
        description,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${baseUrl}/services` },
          ],
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: services
            .filter((s) => s.published)
            .map((s, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                name: s.title,
                description: s.description || s.shortDescription,
                provider: {
                  '@type': 'Organization',
                  name: 'Evostackr',
                  url: `${baseUrl}/`,
                },
                url: `${baseUrl}/services#${s.id}`,
              },
            })),
        },
      };
    } else if (isClosedTesting) {
      title = 'Google Play Closed Testing Services — 20 Testers Track | Evostackr';
      description =
        "Evostackr provides dedicated Google Play closed testing support with 20 verified opt-in human testers across 14 consecutive days to meet Play Console publishing standards.";
      canonical = `${baseUrl}/services/google-play-closed-testing`;
      ogType = 'service';
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${baseUrl}/services/google-play-closed-testing#service`,
        name: 'Google Play Closed Testing Support',
        serviceType: 'Mobile App Testing & Compliance Support',
        description,
        provider: {
          '@type': 'Organization',
          name: 'Evostackr',
          url: `${baseUrl}/`,
        },
        url: `${baseUrl}/services/google-play-closed-testing`,
        offers: {
          '@type': 'Offer',
          price: '1245',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${baseUrl}/services/google-play-closed-testing`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${baseUrl}/services` },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Google Play Closed Testing',
              item: `${baseUrl}/services/google-play-closed-testing`,
            },
          ],
        },
      };
    } else if (isStoreProduct) {
      const prodSlug = currentPath.replace('/store/', '').replace(/\/$/, '');
      const prod = storeProducts.find((p) => p.slug === prodSlug);
      if (prod) {
        title = `${prod.name} — ${prod.category} | Evostackr`;
        description =
          prod.shortDescription ||
          `Explore ${prod.name}, a modern ${prod.category} developed by Evostackr with complete source code.`;
        canonical = `${baseUrl}/store/${prod.slug}`;
        ogType = 'product';
        if (prod.cardPreviewUrl) {
          ogImage = `${baseUrl}${prod.cardPreviewUrl}`;
        }
        const offerData: Record<string, unknown> = {
          '@type': 'Offer',
          price: prod.price?.amount ? String(prod.price.amount) : '3999',
          priceCurrency: prod.price?.currency || 'INR',
          availability: 'https://schema.org/InStock',
          url: `${baseUrl}/store/${prod.slug}`,
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IN',
            returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
            merchantReturnLink: `${baseUrl}/return-policy`,
          },
        };

        const productSchema: Record<string, unknown> = {
          '@context': 'https://schema.org',
          '@type': ['Product', 'SoftwareApplication'],
          '@id': `${baseUrl}/store/${prod.slug}#product`,
          name: prod.name,
          sku: prod.sku || 'EVOEDU-PRO-001',
          brand: {
            '@type': 'Brand',
            name: prod.brand || 'Evostackr',
          },
          description: prod.description || prod.shortDescription,
          applicationCategory: 'EducationalApplication',
          operatingSystem: prod.platforms?.join(', ') || 'Web / Self-Hosted',
          url: `${baseUrl}/store/${prod.slug}`,
          image: prod.cardPreviewUrl ? `${baseUrl}${prod.cardPreviewUrl}` : defaultImage,
          offers: offerData,
          author: {
            '@type': 'Organization',
            name: 'Evostackr',
            url: `${baseUrl}/`,
          },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Store', item: `${baseUrl}/store` },
              { '@type': 'ListItem', position: 3, name: prod.name, item: `${baseUrl}/store/${prod.slug}` },
            ],
          },
        };

        if (prod.rating) {
          productSchema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: String(prod.rating.ratingValue),
            reviewCount: String(prod.rating.reviewCount),
            bestRating: String(prod.rating.bestRating || 5),
            worstRating: String(prod.rating.worstRating || 1),
          };
        }

        if (prod.reviews && prod.reviews.length > 0) {
          productSchema.review = prod.reviews.map((r) => ({
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: r.author,
            },
            datePublished: r.datePublished,
            reviewBody: r.reviewBody,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: String(r.ratingValue),
              bestRating: '5',
              worstRating: '1',
            },
          }));
        }

        schemaJson = productSchema;
      }
    } else if (isStore) {
      title = 'Software Store — Premium Digital Products & Source Code | Evostackr';
      description =
        'Explore the Evostackr Software Store: Production-ready digital software products, web ERP suites, and developer tools with full unencrypted source code.';
      canonical = `${baseUrl}/store`;
      ogType = 'website';
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/store#collection`,
        name: 'Evostackr Software Store',
        url: `${baseUrl}/store`,
        description,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Store', item: `${baseUrl}/store` },
          ],
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: storeProducts.map((p, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: p.name,
              applicationCategory: 'EducationalApplication',
              description: p.shortDescription,
              url: `${baseUrl}/store/${p.slug}`,
              image: p.cardPreviewUrl ? `${baseUrl}${p.cardPreviewUrl}` : defaultImage,
            },
          })),
        },
      };
    } else if (isReturnPolicy) {
      title = 'Merchant Return & Refund Policy | Evostackr';
      description =
        'Official merchant return and refund policies for digital software downloads, unencrypted source code packages, and custom software services from Evostackr.';
      canonical = `${baseUrl}/return-policy`;
      ogType = 'website';
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${baseUrl}/return-policy#webpage`,
        url: `${baseUrl}/return-policy`,
        name: 'Evostackr Merchant Return & Refund Policy',
        description,
        publisher: {
          '@type': 'Organization',
          name: 'Evostackr',
          url: `${baseUrl}/`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Return Policy', item: `${baseUrl}/return-policy` },
          ],
        },
        mainEntity: {
          '@type': 'MerchantReturnPolicy',
          '@id': `${baseUrl}/return-policy#policy`,
          name: 'Evostackr Digital Goods Return Policy',
          applicableCountry: 'IN',
          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          merchantReturnLink: `${baseUrl}/return-policy`,
        },
      };
    } else if (isSeoSuite) {
      title = 'Optimization Suite & Search Intelligence | Evostackr';
      description =
        'Evostackr Unified Optimization Suite: Technical SEO, AEO, GEO, SXO, and AI Search Intelligence Architecture.';
      canonical = `${baseUrl}/admin/seo`;
      ogType = 'website';
    } else if (isBlogIndex) {
      title = 'Engineering Blog & Technical Blueprints | Evostackr';
      description =
        'In-depth software engineering guides, cloud architecture blueprints, Play Console testing frameworks, and multi-agent system designs from Evostackr.';
      canonical = `${baseUrl}/blog`;
      ogType = 'website';
      ogImage = blogArticles[0]?.featuredImage?.url
        ? `${baseUrl}${blogArticles[0].featuredImage.url}`
        : defaultImage;
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/blog#collection`,
        name: 'Evostackr Engineering Blog & Technical Blueprints',
        url: `${baseUrl}/blog`,
        description,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
          ],
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: blogArticles.map((article, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
              '@type': 'BlogPosting',
              headline: article.title,
              description: article.excerpt,
              url: `${baseUrl}/blog/${article.slug}`,
              image: `${baseUrl}${article.featuredImage.url}`,
              datePublished: article.publishedDate,
              dateModified: article.modifiedDate,
              author: {
                '@type': 'Organization',
                name: article.author.name,
              },
            },
          })),
        },
      };
    } else if (isBlogCategory) {
      const catSlug = currentPath.replace('/blog/category/', '').trim().toLowerCase();
      const categoryMeta = blogCategories.find((c) => c.slug.toLowerCase() === catSlug);
      const catName = categoryMeta ? categoryMeta.name : 'Engineering Category';
      title = `${catName} — Engineering Blog | Evostackr`;
      description =
        categoryMeta?.description ||
        `Technical articles and architecture guides in ${catName} from Evostackr.`;
      canonical = `${baseUrl}/blog/category/${catSlug}`;
      ogType = 'website';
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/blog/category/${catSlug}#collection`,
        name: `${catName} — Evostackr Engineering Blog`,
        url: `${baseUrl}/blog/category/${catSlug}`,
        description,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
            {
              '@type': 'ListItem',
              position: 3,
              name: catName,
              item: `${baseUrl}/blog/category/${catSlug}`,
            },
          ],
        },
      };
    } else if (isBlogArticle) {
      const artSlug = currentPath.replace('/blog/', '').trim().toLowerCase();
      const article = getArticleBySlug(artSlug);
      if (article) {
        title = `${article.title} | Evostackr`;
        description = article.excerpt;
        canonical = `${baseUrl}/blog/${article.slug}`;
        ogType = 'article';
        ogImage = `${baseUrl}${article.featuredImage.url}`;
        schemaJson = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${baseUrl}/blog/${article.slug}#article`,
          headline: article.title,
          alternativeHeadline: article.headline,
          description: article.excerpt,
          url: `${baseUrl}/blog/${article.slug}`,
          image: [
            `${baseUrl}${article.featuredImage.url}`,
            ...article.contextualImages.map((img) => `${baseUrl}${img.url}`),
          ],
          datePublished: article.publishedDate,
          dateModified: article.modifiedDate,
          author: {
            '@type': 'Organization',
            name: article.author.name,
            url: baseUrl,
            logo: `${baseUrl}/evostackr-logo.png`,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Evostackr',
            url: baseUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/evostackr-logo.png`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${article.slug}`,
          },
          keywords: article.tags.join(', '),
          articleSection: article.categoryName,
          wordCount: article.wordCount,
          inLanguage: 'en-US',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blog` },
              {
                '@type': 'ListItem',
                position: 3,
                name: article.categoryName,
                item: `${baseUrl}/blog/category/${article.categorySlug}`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: article.title,
                item: `${baseUrl}/blog/${article.slug}`,
              },
            ],
          },
        };
      }
    }

    // 1. Update Title
    document.title = title;

    // 2. Helper to set/update meta tag
    const setMeta = (attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    // 3. Update Standard Meta
    setMeta('name', 'description', description);

    // 4. Update Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);

    // 5. Update Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);

    // 6. Update Twitter Cards
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:url', canonical);
    setMeta('name', 'twitter:image', ogImage);

    // 7. Dynamic JSON-LD Injection
    const schemaTagId = 'dynamic-seo-schema';
    let scriptEl = document.getElementById(schemaTagId) as HTMLScriptElement | null;

    if (schemaJson) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = schemaTagId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schemaJson, null, 2);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [currentPath]);

  return null;
}
