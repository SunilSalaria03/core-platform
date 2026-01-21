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

## 📁 Server Folder Structure

```
server/
├── src/
│   ├── app.module.ts                               # Main application module
│   ├── main.ts                                     # Application entry point
│   │
│   ├── common
│   │   ├── constants/                              # Constants
│   │   │    ├── common.constants.ts
│   │   │    ├── file-upload.constants.ts
│   │   │    ├── http-status.constants.ts
│   │   │    └── validation-messages.constants.ts
│   │   ├── decorators/                             # Decorators
│   │   │   └── common.decorators.ts
│   │   ├── dto/                                    # Data Transfer Objects
│   │   │   ├── api-response.dto.ts
│   │   │   └── common.dtos.ts
│   │   ├── enums/                                  # enums
│   │   │   ├── api.enum.ts
│   │   │   └── common.enums.ts
│   │   ├── filters/                                # filters
│   │   │   └── common.filters.ts
│   │   ├── interceptors/                           # filters
│   │   │   └── common.interceptors.ts
│   │   ├── interfaces/                             # TypeScript interfaces
│   │   │   ├── api-response.interface.ts
│   │   │   └── common.interfaces.ts
│   │   ├── middlewares/                            # middlewares
│   │   │   ├── logger.middlewares.ts
│   │   │   └── common.middlewares.ts
│   │   ├── pipes/                                  # pipes
│   │   │   └── common.pipes.ts
│   │   └── utils/                                  # Utility functions
│   │       ├── common.utils.ts
│   │       └── response.utils.ts
│   │
│   ├── config/
│   │   ├── config.module.ts
│   │   ├── env/
│   │   │   └── env.config.ts
│   │   └── swagger/
│   │       └── swagger.config.ts
│   │
│   ├── database/
│   │   ├── database.module.ts
│   │   └── prisma/
│   │       ├── prisma.config.ts
│   │       ├── prisma.service.ts
│   │       ├── schema.prisma
│   │       ├── seeds/
│   │       │   └── seed.ts
│   │       └── migrations/
│   │           ├── 2026**
│   │           │   └── migration.sql
│   │           └── 2026**
│   │               └── migration.sql
│   │
│   ├── infrastructure/
│   │   ├── infrastructure.module.ts
│   │   ├── cache/
│   │   │   ├── cache.module.ts
│   │   │   └── cache.service.ts
│   │   ├── logger/
│   │   │   ├── logger.module.ts
│   │   │   └── logger.service.ts
│   │   ├── mail/
│   │   │   ├── mail.module.ts
│   │   │   └── mail.service.ts
│   │   ├── queue/
│   │   │   ├── queue.module.ts
│   │   │   └── queue.service.ts
│   │   └── storage/
│   │       ├── storage.module.ts
│   │       └── storage.service.ts
│   │
│   ├── modules
│   │   ├── auth/                  # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── auth.dto.ts
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   └── validations/
│   │   │       └── auth.validation.ts
│   │   ├── user/                  # User management module
│   │   │   ├── user.controller.ts
│   │   │   ├── user.module.ts
│   │   │   ├── user.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── user-response.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── repository/
│   │   │   │   └── user.repository.ts
│   │   │   └── validations/
│   │   │       └── user.validation.ts
│   │   └── health/                 # Health module ( for live )
│   │       ├── health.controller.ts
│   │       ├── health.module.ts
│   │       └── health.service.ts
│   │
│   └── shared/
│       ├── shared.module.ts
│       └── helpers/
│           ├── crypto.helper.ts
│           ├── pagination.helper.ts
│           └── slug.helper.ts
│
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .gitignore
├── .env.development                            # Development enviornment file (.gitignore)
├── .env.staging                                # Staging enviornment file (.gitignore)
├── .env.production                             # Production enviornment (.gitignore)
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json                           # lock file (.gitignore)
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

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

