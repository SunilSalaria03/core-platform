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

## 📁 Project Structure Client

```
client/
├── public/
└── src/
    ├── app/
    ├── assets/
    │   ├── css/
    │   ├── images/
    │   └── svg/
    ├── hooks/
    ├── lib/
    ├── modules/
    │   ├── admin/
    │   │   ├── api/
    │   │   │   ├── reducer/
    │   │   │   └── slices/
    │   │   ├── components/
    │   │   ├── constants/
    │   │   ├── pages/
    │   │   ├── types/
    │   │   └── validations/
    │   ├── auth/
    │   │   ├── api/
    │   │   │   ├── reducer/
    │   │   │   └── slices/
    │   │   ├── components/
    │   │   ├── constants/
    │   │   ├── pages/
    │   │   ├── types/
    │   │   └── validations/
    │   ├── super-admin/
    │   │   ├── api/
    │   │   │   ├── reducer/
    │   │   │   └── slices/
    │   │   ├── components/
    │   │   ├── constants/
    │   │   ├── pages/
    │   │   ├── types/
    │   │   └── validations/
    │   └── user/
    │       ├── api/
    │       │   ├── reducer/
    │       │   └── slices/
    │       ├── components/
    │       ├── constants/
    │       ├── pages/
    │       ├── types/
    │       └── validations/
    ├── shared/
    │   └── components/
    │       ├── common/
    │       ├── layout/
    │       └── ui/
    ├── store/
    └── utils/
        ├── constants/
        ├── helpers/
        ├── modals/
        └── validations/
```

## 📁 Project Structure Server

server/
├─ src/
│  ├─ app.module.ts
│  ├─ main.ts
│  │
│  ├─ config/                          # app + infra config only (env, db, swagger, etc.)
│  │  ├─ env/
│  │  ├─ database/
│  │  ├─ swagger/
│  │  └─ index.ts
│  │
│  ├─ common/                          # reusable cross-cutting code (used by many modules)
│  │  ├─ constants/
│  │  ├─ decorators/
│  │  ├─ enums/
│  │  ├─ exceptions/
│  │  ├─ filters/
│  │  ├─ guards/
│  │  ├─ interceptors/
│  │  ├─ interfaces/
│  │  ├─ pipes/
│  │  ├─ types/
│  │  └─ utils/
│  │
│  ├─ shared/                          # shared services/providers (mail, storage, jwt, logger)
│  │  ├─ logger/
│  │  ├─ mail/
│  │  ├─ cache/
│  │  ├─ queue/
│  │  ├─ storage/
│  │  └─ shared.module.ts
│  │
│  ├─ modules/                         # feature modules (each is independent)
│  │  ├─ auth/
│  │  │  ├─ controllers/
│  │  │  ├─ services/
│  │  │  ├─ dto/
│  │  │  ├─ validations/               # Joi/Zod schemas or custom validators (module scoped)
│  │  │  ├─ constants/                 # module scoped constants
│  │  │  ├─ interfaces/                # module scoped interfaces
│  │  │  ├─ models/                    # schema/entity for this module only
│  │  │  ├─ strategies/                # auth strategies
│  │  │  └─ auth.module.ts
│  │  │
│  │  ├─ users/
│  │  │  ├─ controllers/
│  │  │  ├─ services/
│  │  │  ├─ dto/
│  │  │  ├─ validations/
│  │  │  ├─ constants/
│  │  │  ├─ interfaces/
│  │  │  ├─ models/
│  │  │  └─ users.module.ts
│  │  │
│  │  └─ <feature-name>/
│  │     ├─ controllers/
│  │     ├─ services/
│  │     ├─ dto/
│  │     ├─ validations/
│  │     ├─ constants/
│  │     ├─ interfaces/
│  │     ├─ models/
│  │     └─ <feature-name>.module.ts
│  │
│  ├─ middlewares/                     # app-level middleware wiring + shared middleware
│  │  └─ *.middleware.ts
│  │
│  └─ database/                        # optional: if you want central DB layer
│     ├─ mongoose/ | prisma/ | typeorm/
│     └─ database.module.ts
│
├─ test/
├─ dist/
├─ package.json
├─ tsconfig.json
└─ README.md

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


### Suggestions - Notes

1. Auth
2. Code first approach DB
3. Email - sendgrid, AWS
4. Cache - Local, Radish
5. Seeding
6. Lookups, lookkeys
7. Tatent base/Tatent ID
8. Single DB/ Multiple DB based on tenant ID.

