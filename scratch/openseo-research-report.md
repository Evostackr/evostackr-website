# OpenSEO Research & Strategy Report — Evostackr

**Author**: OpenSEO & Keyword Research Explorer (Explorer 2)  
**Date**: November 3, 2026  
**Status**: Official Research Report for Milestone R1  
**Target Domain**: [evostackr.in](https://evostackr.in)  
**OpenSEO Project ID**: `16b739d0-9658-48e8-9c4e-365a12ad6c7f`  
**OpenSEO Server**: `http://localhost:3001`

---

## 1. Executive Summary

This report delivers the authoritative research foundation for establishing an editorial blog system on **Evostackr** (`https://evostackr.in`). Using the local OpenSEO installation (`http://localhost:3001`) and DataForSEO-backed market intelligence, this investigation executed:
1. **Website Audit & Technical Analysis**: Evaluated existing site crawl data (`cb183f08-70f5-47c6-8211-4f2b57d9ea1a`), analyzing indexing barriers, canonical link structure, and client-side rendering (CSR) implications.
2. **Competitor & SERP Benchmarking**: Mapped key competitors (Simform, LeewayHertz, Radixweb, Chetu) across organic search SERPs, identifying authority keywords and strategic content gaps.
3. **Comprehensive Keyword Intelligence**: Researched 15 strategic seed topics and saved 18 high-intent target keywords with verified monthly volumes, keyword difficulty (KD), and CPC into the OpenSEO project database.
4. **AI Visibility & Prompt Exploration (AEO/GEO)**: Configured 10 prompts across 7 strategic topics in OpenSEO's AI Visibility Tracker targeting ChatGPT, Gemini, Perplexity, and Google AI Overviews to capture AI search citations.
5. **Topic Cluster Strategy**: Formulated 8 publication-ready, high-value blog topics mapped directly to Evostackr's technical capabilities, proprietary products (*SMS Campaign Manager*, *Fabricate*, *24IDChat*, *TempEmailFree*, *WhatsApp Past Member Extractor*), and specialized engineering services (*Google Play Closed Testing*, *Cloud Architecture*, *SaaS Platform Development*).

---

## 2. Technical Website Audit & Architecture Findings

### 2.1 Audit Crawl Assessment (Audit `cb183f08-70f5-47c6-8211-4f2b57d9ea1a`)
OpenSEO audited the live production target `https://evostackr.in/` across 3 indexable pages:

| URL Path | Status | Fetch Status | Word Count | Latency | Canonical Target |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `https://evostackr.in/` | 200 | OK | 0 (CSR) | 1,436 ms | Self (`https://evostackr.in/`) |
| `https://evostackr.in/admin/seo` | 200 | OK | 0 (CSR) | 1,314 ms | `https://evostackr.in/` |
| `https://evostackr.in/services/google-play-closed-testing` | 200 | OK | 0 (CSR) | 2,884 ms | `https://evostackr.in/` |

### 2.2 Technical Deficiencies & Architecture Requirements
1. **Initial HTML Payload & Client-Side Rendering (CSR)**:
   - *Audit Finding*: Word count was flagged as 0 across all pages because raw HTML serves an empty mount root (`<div id="root"></div>`) without pre-rendered semantic HTML.
   - *Impact on SEO & AEO*: While Googlebot renders JavaScript, AI search crawlers (Perplexity, ChatGPT Search, Claude Web) prioritize instantly readable initial HTML. 
   - *Remediation Requirement*: For the blog architecture, all article pages must feature complete semantic hierarchy (H1, H2, H3), structured schema metadata (`BlogPosting` and `BreadcrumbList` JSON-LD), and direct answer lead paragraphs rendered without multi-turn API latencies.
2. **Canonical Conflict**:
   - *Audit Finding*: The specialized service page (`/services/google-play-closed-testing`) was canonicalized to the root domain (`https://evostackr.in/`), preventing it from accumulating independent search equity.
   - *Remediation Requirement*: Every blog article (`/blog/<slug>`) and category view (`/blog/category/<slug>`) must have an explicit self-referencing canonical tag.
3. **Absence of Content Hub & Discovery Endpoints**:
   - *Audit Finding*: The site currently lacks a dedicated `/blog` route, sitemap entries for content, and RSS feeds.
   - *Remediation Requirement*: Build routes `/blog`, `/blog/<slug>`, `/blog/category/<slug>`, and dynamically register all article URLs in `public/sitemap.xml`, `public/rss.xml`, and `public/robots.txt`.

---

## 3. Competitor Intelligence & SERP Benchmarking

### 3.1 Primary Competitors & Organic Footprint
Through OpenSEO's `find_serp_competitors` and `get_domain_keyword_suggestions`, we benchmarked the market leaders:

1. **Simform** (`simform.com`):
   - *Organic Footprint*: Ranks for high-value technical architecture queries including `kubernetes architecture` (12,100 vol, KD 12), `software architecture` (18,100 vol, KD 26), `devops lifecycle` (1,600 vol, KD 5), and `tdd` (5,400 vol, KD 30).
   - *Strategy*: Captures top-of-funnel traffic with architecture diagrams and SDLC methodology guides, then funnels leads to custom software engineering inquiries.
2. **LeewayHertz** (`leewayhertz.com`):
   - *Organic Footprint*: Ranks for `agentic rag` (1,900 vol, KD 35), `generative ai development company` (1,000 vol, KD 33), and `ai consulting services` (1,300 vol, KD 11, CPC $9.02).
   - *Strategy*: Positions heavily around cutting-edge AI frameworks (LlamaIndex, LangChain, Agentic RAG) with technical blueprints.
3. **Radixweb** (`radixweb.com`) & **Chetu** (`chetu.com`):
   - Compete on enterprise custom development, cloud modernization, and multi-tenant SaaS integration.

### 3.2 Strategic Content Gaps & Evostackr's Competitive Positioning
- **The "Fluff vs. Engineering" Gap**: Most competitors publish superficial articles authored by generalist marketers lacking real code examples, architecture patterns, or production failure modes. Evostackr's brand identity is defined by understated, precise engineering credibility.
- **The "Agency vs. Product Owner" Gap**: Unlike pure outsourcing shops, Evostackr owns and operates proprietary production platforms (*SMS Campaign Manager*, *Fabricate*, *24IDChat*, *TempEmailFree*). This allows Evostackr to provide first-party, real-world case studies that establish superior E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness).
- **The Google Play 2026 Policy Gap**: Major agencies ignore the indie/startup compliance crisis surrounding Google Play's 14-day 12/20-tester closed testing mandate. Evostackr has an active service targeting this exact pain point.

---

## 4. Comprehensive Keyword Intelligence

Through OpenSEO's DataForSEO integration, 18 high-priority keywords were researched and permanently saved to the project database (`16b739d0-9658-48e8-9c4e-365a12ad6c7f`):

| Keyword | Monthly Searches | Difficulty (KD 0–100) | CPC (USD) | Competition | Search Intent | Strategic Alignment |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **kubernetes architecture** | 12,100 | 12 | $0.99 | 0.20 | Informational | Cloud Infrastructure & SRE |
| **microservices design patterns** | 5,400 | 8 | $0.55 | 0.19 | Informational | Distributed Systems Engineering |
| **custom software development company** | 2,900 | 28 | $1.51 | 0.05 | Commercial | Evostackr Core Engineering |
| **multi tenant architecture** | 1,900 | 25 | $2.62 | 0.01 | Informational | SaaS Platform Development |
| **api gateway in microservices** | 1,900 | 7 | $2.04 | 0.10 | Informational | Microservices & Edge Routing |
| **agentic ai architecture** | 1,300 | 7 | $1.58 | 0.38 | Navigational | AI Multi-Agent Systems |
| **devops pipeline** | 590 | 15 | $4.87 | 0.05 | Informational | Automated CI/CD Systems |
| **saas architecture** | 480 | 17 | $3.52 | 0.06 | Navigational | Multi-Tenant SaaS |
| **agentic ai architecture diagram** | 390 | 6 | $2.25 | 0.17 | Navigational | AI Architecture Blueprints |
| **cloud native architecture** | 390 | 29 | $2.68 | 0.19 | Informational | Modern Cloud Systems |
| **bulk sms gateway** | 390 | 36 | $0.54 | 0.27 | Commercial | SMS Campaign Manager |
| **what is multi tenant architecture** | 320 | 0 | — | 0.01 | Informational | Foundational SaaS Strategy |
| **event driven architecture microservices** | 140 | 25 | $1.81 | 0.28 | Commercial | Asynchronous Distributed Systems |
| **ci cd pipeline in devops** | 110 | 50 | $1.68 | 0.15 | Navigational | Zero-Downtime Deployment |
| **closed testing google play** | 90 | 15 | $0.86 | 0.42 | Informational | Google Play Testing Service |
| **component driven development** | 20 | 15 | $1.20 | 0.05 | Informational | Fabricate UI Prototyping Tool |
| **google play closed testing 20 testers** | 10 | 10 | $0.21 | 0.36 | Informational | Managed Compliance Testing |
| **api integration patterns** | 10 | 41 | $2.55 | 0.34 | Informational | Enterprise API Integrations |

---

## 5. AI Search Visibility (AEO/GEO) Analysis

Generative search engines (Perplexity, ChatGPT Search, Gemini, Claude, and Google AI Overviews) construct synthesized answers using high-authority, direct-answer sources.

### 5.1 Configured AI Visibility Prompts in OpenSEO
We configured and saved 10 prompts across 7 strategic topics in OpenSEO's AI Visibility Tracker for `evostackr.in`:
1. *Agentic AI Architecture*: "What is an agentic AI architecture and how does it differ from traditional LLM pipelines?"
2. *Agentic AI Architecture*: "How do you design a production-ready multi-agent system with MCP and tool calling?"
3. *Multi-Tenant SaaS Architecture*: "What are the best multi-tenant architecture patterns for enterprise SaaS platforms?"
4. *Multi-Tenant SaaS Architecture*: "How to choose between database-per-tenant and shared-database with row-level security in SaaS?"
5. *Microservices & Cloud Native*: "What are the essential microservices design patterns for event-driven systems?"
6. *Microservices & Cloud Native*: "How do Kubernetes and API gateways solve service discovery and traffic routing in microservices?"
7. *DevOps & CI/CD Pipelines*: "How to build a secure automated CI/CD deployment pipeline with zero downtime?"
8. *API Integration & Webhook Architecture*: "What are the best practices for robust API integration and asynchronous webhook processing?"
9. *Google Play Closed Testing*: "What are the Google Play Console closed testing requirements for individual developers in 2026?"
10. *High-Volume Messaging Infrastructure*: "How to architect a reliable high-volume bulk SMS campaign delivery engine?"

### 5.2 Editorial AEO/GEO Requirements for Blog Articles
1. **Immediate Direct Answer**: Every article must lead with a 45–65 word concise, definitive summary paragraph immediately answering the core query.
2. **Structured Tables & Taxonomies**: Include comparison tables (e.g., Silo vs. Pool multi-tenancy, gRPC vs. REST, 12 vs. 20 testers) to facilitate LLM table parsing.
3. **Concrete Implementation Artifacts**: Incorporate exact configuration blocks (YAML, Dockerfile, TypeScript, SQL schemas) to satisfy technical evaluation prompts.
4. **Structured JSON-LD**: Embed Schema.org `BlogPosting` and `BreadcrumbList` on every article page.

---

## 6. Official Topic Cluster Strategy (8 High-Value Topics)

The following 8 topics have been selected for implementation to maximize organic search authority, AI search visibility, and commercial alignment.

---

### Article 1: Enterprise Agentic AI Architecture
- **Title**: Enterprise Agentic AI Architecture: Production Blueprint for Autonomous Multi-Agent Systems
- **Target Slug**: `agentic-ai-architecture-enterprise-guide`
- **Category**: `ai-engineering` (Label: AI & Machine Learning)
- **Primary Keyword**: `agentic ai architecture` (Vol: 1,300, KD: 7)
- **Secondary Keywords**: `agentic ai architecture diagram`, `multi agentic ai architecture`, `agentic rag architecture`, `agentic ai workflow architecture`
- **Search Intent**: Informational / Commercial
- **Target Audience**: Chief Architects, VPs of Engineering, AI Tech Leads
- **Evostackr Alignment**: Custom AI/ML engineering, autonomous systems, and MCP integrations.
- **Suggested Outline**:
  - H1: Enterprise Agentic AI Architecture: Production Blueprint for Autonomous Multi-Agent Systems
  - H2: What is Agentic AI Architecture? (AEO Direct Answer)
  - H2: Evolution: From Static Prompts to Autonomous Decision Loops
  - H2: The 5 Core Architectural Layers of Enterprise Agentic Systems
  - H2: Multi-Agent Collaboration Topologies: Hierarchical vs. Swarm vs. Router
  - H2: Tool Execution, MCP (Model Context Protocol), and Secure Sandboxing
  - H2: Enterprise Observability: Tracing, Guardrails, and Cost Telemetry
  - H2: Conclusion & Architectural Checklist for Production

---

### Article 2: Scalable Multi-Tenant SaaS Architecture
- **Title**: Modern Multi-Tenant SaaS Architecture: Isolation Models, Database Strategies, and Scalability
- **Target Slug**: `multi-tenant-saas-architecture-patterns`
- **Category**: `cloud-architecture` (Label: Cloud Architecture)
- **Primary Keyword**: `multi tenant architecture` (Vol: 1,900, KD: 25)
- **Secondary Keywords**: `saas architecture`, `what is multi tenant architecture`, `multi tenant database architecture`, `single-tenant vs multi tenant architecture`
- **Search Intent**: Informational / Commercial
- **Target Audience**: SaaS Founders, Cloud Architects, Enterprise Solution Designers
- **Evostackr Alignment**: Division B SaaS development services; first-party SaaS expertise (24IDChat, SMS Campaign Manager).
- **Suggested Outline**:
  - H1: Modern Multi-Tenant SaaS Architecture: Isolation Models, Database Strategies, and Scalability
  - H2: Defining Multi-Tenancy in Cloud SaaS (AEO Direct Answer)
  - H2: The Three Core Isolation Models: Silo, Pool, and Bridge
  - H2: Database Partitioning: Database-per-Tenant vs. Schema-per-Tenant vs. Row-Level Security
  - H2: Tenant Context Propagation: Wildcards, Subdomains, and JWT Claims
  - H2: Mitigating the Noisy Neighbor Problem with Dynamic Rate Limiting
  - H2: Compliance & Cross-Tenant Data Leakage Prevention
  - H2: Summary: Choosing the Right Model for Your Scale

---

### Article 3: Resilient Microservices Design Patterns
- **Title**: Microservices Design Patterns: Architectural Blueprint for Resilient Distributed Systems
- **Target Slug**: `microservices-design-patterns-cloud-architecture`
- **Category**: `software-engineering` (Label: Software Engineering)
- **Primary Keyword**: `microservices design patterns` (Vol: 5,400, KD: 8)
- **Secondary Keywords**: `event driven architecture microservices`, `api gateway in microservices`, `saga pattern microservices`, `microservices architecture patterns`
- **Search Intent**: Informational / Commercial
- **Target Audience**: Distributed Systems Engineers, Backend Architects, Technical Directors
- **Evostackr Alignment**: Core custom software engineering and distributed backend consulting.
- **Suggested Outline**:
  - H1: Microservices Design Patterns: Architectural Blueprint for Resilient Distributed Systems
  - H2: What Are Microservices Design Patterns? (AEO Direct Answer)
  - H2: Domain Decomposition: Bounded Contexts and Event Storming
  - H2: Communication Topologies: Synchronous gRPC vs. Asynchronous Event Streams
  - H2: Distributed Transaction Management: The Choreographed and Orchestrated Saga Patterns
  - H2: Resiliency Safeguards: Circuit Breaker, Bulkhead, and Rate Limiter
  - H2: Edge Routing: API Gateway and Backend-for-Frontend (BFF)
  - H2: Architectural Decision Matrix

---

### Article 4: Google Play Closed Testing Survival Guide (2026)
- **Title**: Google Play Closed Testing in 2026: The Complete Guide to the 14-Day Tester Requirement
- **Target Slug**: `google-play-closed-testing-complete-guide`
- **Category**: `mobile-development` (Label: Mobile Engineering)
- **Primary Keyword**: `closed testing google play` (Vol: 90, KD: 15)
- **Secondary Keywords**: `google play closed testing requirements`, `google play closed testing 20 testers`, `google play closed testing 14 days`, `google play console closed testing to production`
- **Search Intent**: Informational / Commercial / Transactional
- **Target Audience**: Android Developers, Mobile Tech Leads, Indie Founders
- **Evostackr Alignment**: Directly drives high-intent conversions to Evostackr's specialized service at `/services/google-play-closed-testing`.
- **Suggested Outline**:
  - H1: Google Play Closed Testing in 2026: The Complete Guide to the 14-Day Tester Requirement
  - H2: What is Google Play's Closed Testing Policy? (AEO Direct Answer)
  - H2: Deciphering the Rule: 12 vs. 20 Testers and the 14-Day Continuous Engagement Clause
  - H2: Setting Up the Closed Track in Google Play Console (Step-by-Step)
  - H2: Common Pitfalls That Lead to Production Access Denial
  - H2: Answering Google's Production Access Review Questionnaire
  - H2: The Managed Alternative: How Evostackr Guarantees 100% Policy Compliance
  - H2: Pre-Launch Compliance Checklist

---

### Article 5: Zero-Downtime Cloud-Native DevOps CI/CD
- **Title**: Cloud-Native DevOps CI/CD: Building Zero-Downtime Deployment Pipelines with Kubernetes
- **Target Slug**: `cloud-native-devops-cicd-pipeline-blueprint`
- **Category**: `devops-infrastructure` (Label: DevOps & Cloud)
- **Primary Keyword**: `devops pipeline` (Vol: 590, KD: 15)
- **Secondary Keywords**: `ci cd pipeline in devops`, `devops pipeline architecture`, `github actions ci cd pipeline`, `kubernetes architecture`
- **Search Intent**: Informational / Commercial
- **Target Audience**: DevOps Engineers, SREs, Platform Architects
- **Evostackr Alignment**: Cloud architecture, automated deployments, Cloudflare Pages, container infrastructure.
- **Suggested Outline**:
  - H1: Cloud-Native DevOps CI/CD: Building Zero-Downtime Deployment Pipelines with Kubernetes
  - H2: What is a Cloud-Native CI/CD Pipeline? (AEO Direct Answer)
  - H2: Continuous Integration: Automated Testing, Linting, and Container Scanning
  - H2: Release Strategies: Blue/Green vs. Canary Deployments on Kubernetes
  - H2: GitOps Principles: Managing Infrastructure as Code with Declarative Repositories
  - H2: Security & Supply Chain Defense: Automated SAST, DAST, and Signed Artifacts
  - H2: Pipeline Telemetry: Measuring DORA Metrics (Lead Time, MTTR, Change Failure Rate)
  - H2: Production CI/CD Architecture Summary

---

### Article 6: Enterprise API Integration & Asynchronous Webhooks
- **Title**: Enterprise API Integration Patterns: Architecting Resilient Webhooks and Event Synchronization
- **Target Slug**: `enterprise-api-integration-patterns-webhooks`
- **Category**: `software-engineering` (Label: Software Engineering)
- **Primary Keyword**: `api integration patterns` (Vol: 10, KD: 41)
- **Secondary Keywords**: `api gateway in microservices`, `rest api integration`, `api led integration patterns`, `asynchronous webhook processing`
- **Search Intent**: Informational / Commercial
- **Target Audience**: Integration Architects, Backend Engineers, Enterprise Systems Developers
- **Evostackr Alignment**: Evostackr's API integrations & custom engineering services (third-party systems, synchronization layers).
- **Suggested Outline**:
  - H1: Enterprise API Integration Patterns: Architecting Resilient Webhooks and Event Synchronization
  - H2: Core Principles of Enterprise API Integration (AEO Direct Answer)
  - H2: Synchronous REST vs. Asynchronous Webhooks: Selecting the Right Paradigm
  - H2: Designing Reliable Webhook Ingestion: Signature Verification and Idempotency Keys
  - H2: Dealing with Failures: Exponential Backoff, Dead Letter Queues (DLQ), and Replays
  - H2: Schema Evolution and Contract Testing with Pact
  - H2: Enterprise Security: Mutual TLS (mTLS), Token Exchange, and Secret Rotation
  - H2: Production Integration Architecture Checklist

---

### Article 7: Component-Driven Development & Design Systems
- **Title**: Component-Driven Development: Architecting Scalable Design Systems from Atoms to Applications
- **Target Slug**: `component-driven-development-design-systems`
- **Category**: `frontend-architecture` (Label: Frontend Architecture)
- **Primary Keyword**: `component driven development` (Vol: 20, KD: 15)
- **Secondary Keywords**: `component library`, `ui component generator`, `config driven ui`, `declarative ui`
- **Search Intent**: Informational / Commercial
- **Target Audience**: Frontend Engineers, Design System Leads, UI/UX Technologists
- **Evostackr Alignment**: Direct promotion of Evostackr's developer product **Fabricate** (automated UI prototyping and component generation).
- **Suggested Outline**:
  - H1: Component-Driven Development: Architecting Scalable Design Systems from Atoms to Applications
  - H2: What is Component-Driven Development? (AEO Direct Answer)
  - H2: The Philosophy of Modular UI: Design Tokens, Atoms, and Organisms
  - H2: Decoupled State Management: Presentation vs. Container Components
  - H2: Accelerating Frontend Delivery with Automated UI Component Generation (Spotlight on Fabricate)
  - H2: Visual Regression Testing and Accessibility (WCAG 2.1 AA) Compliance
  - H2: Governance: Maintaining Design Consistency Across Distributed Engineering Teams
  - H2: Summary & Tooling Matrix

---

### Article 8: High-Throughput Messaging Infrastructure
- **Title**: High-Throughput Messaging Infrastructure: Designing Reliable Bulk Delivery Systems
- **Target Slug**: `high-throughput-messaging-infrastructure-architecture`
- **Category**: `cloud-architecture` (Label: Cloud Architecture)
- **Primary Keyword**: `bulk sms gateway` (Vol: 390, KD: 36)
- **Secondary Keywords**: `custom sms sender`, `transactional sms`, `sms gateway api`, `high throughput message queue`
- **Search Intent**: Informational / Commercial
- **Target Audience**: Systems Engineers, Messaging Platform Architects, Telecom Software Engineers
- **Evostackr Alignment**: Direct alignment with Evostackr's proprietary products **SMS Campaign Manager** and **24IDChat** (authenticated secure messaging infrastructure).
- **Suggested Outline**:
  - H1: High-Throughput Messaging Infrastructure: Designing Reliable Bulk Delivery Systems
  - H2: What is High-Throughput Messaging Infrastructure? (AEO Direct Answer)
  - H2: Telephony Integration: SMPP Protocols vs. RESTful Carrier Gateways
  - H2: Concurrency & Backpressure: Queue Partitioning with Redis and Kafka
  - H2: Asynchronous Delivery Receipt (DLR) Processing and Status Reconciliation
  - H2: Regulatory Compliance: DND (Do-Not-Disturb) Scrubbing, Template Registration, and Consent Records
  - H2: Observability: Tracking Latency, Throughput, and Delivery Ratios
  - H2: Architecture Summary & Evostackr SMS Campaign Manager Blueprint

---

## 7. Media & AI Image Generation Requirements (Requirement R2)

Per Requirement R2, each article requires exactly **4 AI-generated images** (32 total images across 8 articles):
1. **Featured Article Banner (1 per article)**:
   - Aspect ratio: `16:9`
   - Role: Header hero visual at the top of the article.
   - Palette & Tone: Strict adherence to Evostackr's Midnight Navy design system (`#111827`, `#172554`, `#1E3A5F`, `#F5F6F5`). Abstract isometric architectural geometry, engineering schematics, wireframes, telemetry lines. Zero stock photography.
2. **Contextual Inline Visuals (3 per article)**:
   - Aspect ratio: `16:9` or `3:2`
   - Role: Co-located with key sections (e.g., architecture diagrams, layer breakdowns, data flow sequences).
   - Style: High-contrast blueprint diagrams, data pipelines, sequence flows, and system architecture topologies.

---

## 8. Technical Implementation Specifications (Requirements R3 & R4)

1. **Routing & URL Architecture**:
   - `/blog`: Blog Index with category filters and search.
   - `/blog/<slug>`: Individual article view with full editorial layout, author info, reading time, table of contents, and related links.
   - `/blog/category/<slug>`: Category index showing filtered posts.
2. **Design Language Preservation**:
   - Strict adherence to `DESIGN.md`: Cool off-white `#F5F6F5`, Midnight Navy `#111827`, deep navy accents `#172554`/`#1E3A5F`.
   - Typography: `Inter` for telemetry, headings, and body; italic `Playfair Display` for editorial heading accents.
   - Zero layout shift across mobile and desktop.
3. **Structured Data & SEO Artifacts**:
   - Schema.org `BlogPosting` and `BreadcrumbList` JSON-LD on every article page.
   - OpenGraph and Twitter meta cards.
   - Updated `public/sitemap.xml`, `public/rss.xml`, and `public/robots.txt`.
