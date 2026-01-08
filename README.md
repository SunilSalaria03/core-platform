# Core Platform

## Vision

Core Platform is a reusable, production‑grade SaaS foundation designed to accelerate the development of multi‑tenant applications such as school management systems, enterprise dashboards, and B2B platforms.

The goal is simple:

**Build once. Reuse everywhere. Ship faster without compromising architecture, security, or scalability.**

This platform acts as the core engine behind multiple client products while remaining flexible enough to extract and reuse individual modules (auth, billing, integrations, etc.) in completely different projects.

## Problem Statement

In real‑world client work:

- Clients have budget but no time
- Re‑building authentication, roles, payments, and integrations for every project waste effort
- Long estimates lead to lost deals
- Demo projects fail to expose real production challenges

Core Platform exists to solve these problems by providing a ready‑to‑extend SaaS foundation that already handles the hard parts.

## Product Philosophy

### 1. Platform First, Product Second

This repository is not a single app.

It is a platform that can power:

- School management systems
- Enterprise internal tools
- B2B SaaS products
- Custom client applications

Individual products are just implementations on top of the platform.

### 2. Modular by Design

Every major capability is built as an independent module:

- Authentication
- Authorization & roles
- Tenant management
- Billing & subscriptions
- Notifications
- Third‑party integrations

Modules:

- Have clear boundaries
- Depend only on shared contracts
- Can be copied or extracted into other projects with minimal changes

### 3. Multi‑Tenant from Day One

The platform is designed as a multi‑tenant SaaS, similar to tools like Slack or Microsoft Teams.

- One platform
- Multiple tenants (schools / organizations)
- Shared infrastructure
- Strong tenant isolation at the data and logic level

Initial approach:

- Shared database
- `tenant_id` enforced across all entities

### 4. Clean Architecture & Long‑Term Maintainability

The codebase follows clean architecture principles:

- Clear separation of concerns
- Business logic independent of frameworks
- Frameworks treated as implementation details

This ensures:

- Easy refactoring
- Predictable scaling
- Safe onboarding of new developers

### 5. Real‑World, Not Demo‑Ware

This platform is intentionally built as a real product, not a tutorial or demo.

It includes:

- Real authentication flows
- Real payment handling
- Real role hierarchies
- Real multi‑tenant constraints
- Real deployment and CI/CD practices

The goal is to expose and solve real production problems early.

## Core Principles

✅ **Reusability**

Every feature should be reusable outside of this platform.

If a module cannot be copied into another project, it is considered incomplete.

✅ **Security by Default**

- No direct access to tenant data without tenant context
- Role‑based access control everywhere
- Secure token handling
- Strict API boundaries

✅ **Convention Over Configuration**

- Standard module structure
- Predictable folder layout
- Shared contracts and types

This reduces cognitive load and speeds up development.

✅ **Scalability Without Rewrite**

Decisions are made to avoid future rewrites:

- Database strategy supports evolution
- Infrastructure supports horizontal scaling
- Code supports growing teams and tenants

✅ **Fast Delivery, Not Fragile Delivery**

Speed matters — but not at the cost of:

- Code quality
- Maintainability
- Security

This platform is designed to move fast safely.

## Technology Stack

This platform is built using a modern, production-proven tech stack chosen specifically for scalability, maintainability, and long-term reuse across multiple SaaS and client applications.

### Frontend

**Framework: Next.js (App Router)**

Why Next.js:

- Hybrid SSR + SPA for dashboards and SaaS apps
- Built-in routing and middleware for tenant resolution
- Excellent performance and SEO
- Industry standard for modern SaaS platforms

**Key Frontend Tools:**

- React + TypeScript
- Tailwind CSS (utility-first styling)
- MUI (design system & accessible components)
- Zod (schema validation)
- TanStack Query (server-state management)

### Backend

**Framework: NestJS**

Why NestJS:

- Strong module system for clean boundaries
- Enterprise-grade patterns (guards, interceptors, pipes)
- Perfect fit for multi-tenant and role-based systems
- Framework-agnostic business logic (clean architecture)

**Key Backend Tools:**

- TypeScript
- REST APIs (GraphQL optional later)
- JWT + Refresh Token authentication
- RBAC & tenant guards
- Background jobs & queues

### Database

**Primary Database: PostgreSQL**

Why PostgreSQL:

- Strong relational integrity
- Ideal for multi-tenant SaaS models
- JSONB support for flexible schemas
- Easy evolution to sharding or DB-per-tenant

**Tenant Strategy (Phase 1):**

- Single shared database
- `tenant_id` enforced across all tables

### Caching & Messaging

- Redis (sessions, caching, rate limiting)
- Background jobs for notifications & async tasks

### Infrastructure & Hosting

**Frontend:**

- Vercel (Next.js optimized hosting)

**Backend:**

- AWS ECS / Fly.io (container-based deployment)

**Database:**

- AWS RDS (PostgreSQL)

**Storage:**

- AWS S3 (files, assets)

**CI/CD:**

- GitHub Actions
- Protected main branch with PR-based workflows

### Monorepo Tooling

- Monorepo structure with shared packages
- Strict module boundaries
- Copy-paste friendly packages

## Target Use Cases

- SaaS products with multiple organizations
- School / education platforms
- Internal enterprise tools
- Client projects requiring fast turnaround
- Teams building long‑living products

## Long‑Term Vision

Over time, Core Platform will evolve into:

- A battle‑tested SaaS foundation
- A collection of proven reusable modules
- A reference architecture for future products

The ultimate goal:

**Never start a SaaS project from scratch again.**

## Guiding Quote

*"We don't build projects anymore — we build platforms that create projects."*
