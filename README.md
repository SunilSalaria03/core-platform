# Core Platform

A reusable, production-grade SaaS foundation designed to accelerate the development of multi-tenant applications.

## 🎯 Vision

Core Platform is not a single SaaS product —  
it is a **reusable SaaS platform** that enables building multiple products faster.

The school system is just one implementation.
The real product is the **platform itself**.

This approach ensures:
- Faster delivery of new SaaS products
- Long-term maintainability
- Consistent architecture across projects

## 👥 Ownership

**Owned and maintained by:** Core Platform Team

Responsibilities:
- Core architecture decisions
- Reusable module design
- Platform stability & scalability
- Cross-product consistency

## 🚫 Non-Goals

- This repository is not a single-purpose school ERP
- Apps should remain thin — business logic must live in domains
- Core packages must not depend on domain-specific logic
- UI apps must not bypass platform abstractions

## ✨ Key Features

- **🔐 Multi-Tenant Ready**: Built for SaaS with tenant isolation from day one
- **📦 Modular Architecture**: Extractable core modules for maximum reusability
- **🏗️ Clean Architecture**: Domain-Driven Design with clear separation of concerns
- **🔄 Platform-First**: Designed as a foundation that powers multiple applications
- **🚀 Production-Ready**: Includes authentication, billing, notifications, and integrations
- **📚 Framework Agnostic**: Core modules work with any tech stack
- **⚡ Accelerated Development**: Pre-built SaaS modules reduce client project delivery time
- **🔄 Dual Purpose**: Build your product while creating reusable components for other projects
- **💰 Time & Cost Savings**: Skip rebuilding common features (auth, billing, RBAC, etc.)
- **📈 Scalable Foundation**: Start new SaaS projects in days, not months

## Getting Started

```bash
# Document Link 
https://lpinfotech0-my.sharepoint.com/personal/sunil_salaria_lnpinfotech_com/_layouts/15/AccessDenied.aspx?Source=https%3a%2f%2flpinfotech0-my.sharepoint.com%2f%3aw%3a%2fr%2fpersonal%2fsunil_salaria_lnpinfotech_com%2f_layouts%2f15%2fDoc.aspx%3fsourcedoc%3d%257B8725f082-9886-4a8a-9371-7ff81cd8b457%257D%26action%3dedit%26wdPid%3d996be20%26wdOrigin%3dTEAMS-MAGLEV.null_ns.rwc%26wdExp%3dTEAMS-TREATMENT%26wdhostclicktime%3d1767876411222%26web%3d1&correlation=21fdeaa1-c0e7-5000-5e50-da891b825ea1&Type=item&name=bf3ffe38-8d1b-473c-9047-ea92240f9fdb&listItemId=115&listItemUniqueId=8725f082-9886-4a8a-9371-7ff81cd8b457

# Clone the repository
git clone <https://github.com/SunilSalaria03?tab=repositories>
cd core-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development servers
npm run dev
```

## Monorepo Structure

```
core-platform/
│
├── apps/                          # Application Layer (Thin presentation)
│   ├── api/                       # NestJS API (thin app layer)
│   ├── web-platform-admin/        # Platform admin dashboard (all schools)
│   ├── web-school/                # School tenant application
│   └── web-public/                # Marketing + public school pages
│
├── packages/                      # Core Reusable Modules (100% reusable)
│   ├── core-auth/                 # Authentication & JWT (100% reusable)
│   ├── core-rbac/                 # Role-based access control (100% reusable)
│   ├── core-tenant/               # Multi-tenant logic (100% reusable)
│   ├── core-billing/              # Stripe billing integration (100% reusable)
│   ├── core-notifications/        # Email & push notifications
│   ├── core-storage/              # File storage & uploads
│   ├── core-integrations/         # Third-party integrations
│   ├── core-ui/                   # Shared UI components library
│   ├── core-utils/                # Utility functions
│   └── core-config/               # Configuration management
│
├── domains/                       # Business Logic Layer (Domain-Driven)
│   ├── school/                    # School-specific business logic ONLY
│   │   ├── students/              # Student management
│   │   ├── teachers/              # Teacher management
│   │   ├── parents/               # Parent management
│   │   ├── classes/               # Class management
│   │   ├── attendance/            # Attendance tracking
│   │   ├── exams/                 # Exam management
│   │   ├── fees/                  # Fee management
│   │   └── announcements/         # School announcements
│   │
│   └── common/                    # Shared business logic (optional reuse)
│
├── scripts/                       # CLI tools and generators
├── docker/                        # Docker configurations
├── docs/                          # Documentation
├── .env.example                   # Environment variables template
├── turbo.json                     # Turborepo configuration
├── package.json                   # Root workspace configuration
└── README.md
```

### Architecture Layers

#### 🏗️ **Apps Layer** (Presentation)
Thin application shells that compose features from packages and domains:
- **`web-platform-admin`**: Platform-wide administration (all tenants)
- **`web-school`**: Tenant-specific school application
- **`web-public`**: Marketing and public-facing pages
- **`api`**: REST API endpoints (thin NestJS layer)

#### 📦 **Packages Layer** (Infrastructure)
100% reusable, framework-agnostic modules:
- **`core-*` prefix**: Indicates fully extractable modules
- **Zero dependencies** on business logic
- **Publishable as npm packages**
- **Framework-independent**

#### 🏢 **Domains Layer** (Business Logic)
Domain-Driven Design implementation:
- **`school/`**: School management business rules
- **`common/`**: Shared business logic across domains
- **Testable in isolation**

**Benefits:**
- ✅ **Zero coupling** between modules
- ✅ **Framework agnostic** (works with any tech stack)
- ✅ **Domain independent** (reusable across industries)
- ✅ **Independently testable**
- ✅ **Separately deployable**

## Available Scripts

```bash
npm run dev          # Start all development servers
npm run build        # Build all packages and apps
npm run test         # Run all tests
npm run lint         # Run linting
npm run type-check   # TypeScript type checking
```

## Technology Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Tools:** React + TypeScript, Tailwind CSS, MUI, Zod

### Backend
- **Framework:** NestJS
- **Tools:** TypeScript, REST APIs, JWT + Refresh Token authentication, RBAC & tenant guards, Background jobs & queues

### Database
- **Primary:** PostgreSQL
- **Strategy:** Single shared database with `tenant_id` enforced across all tables

### Caching & Messaging
- Redis (sessions, caching, rate limiting)
- Background jobs for notifications & async tasks

### Infrastructure & Hosting
- **Deploy:** Azure

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
