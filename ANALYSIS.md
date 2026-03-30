# BuildNG — Full Project Analysis

## Overview

BuildNG is a full-stack Nigerian construction project management platform built on **Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma + PostgreSQL, and NextAuth**. It covers 7 integrated product modules — each with its own dashboard pages, API routes, and mock data. The app currently runs in **demo/mock mode** (no database required) and builds cleanly with **46 production routes and 0 errors**.

---

## 1. File Count & Structure

| Category | Count |
|----------|-------|
| Page files (`.tsx` in `/app`) | 46 |
| Components (`.tsx` in `/components`) | 40 |
| Library/Utility files (`.ts` in `/lib`) | 12 |
| API route files (`.ts` in `/api`) | 16 |
| Hooks | 2 |
| Type definitions | 1 |
| Prisma schema | 1 |
| Config files (root) | 8 |
| **Total source files** | **~127** |

**Directory layout:**
```
src/
  app/
    (auth)/          → Login, Register (2 pages + layout)
    (marketing)/     → About, Contact, Pricing, 7 product pages (11 pages + layout)
    dashboard/       → 7 modules + settings, search, help, reports, profile (32+ pages)
    api/             → 16 API endpoints
    onboarding/      → Multi-step wizard
  components/
    ui/              → 18 base components (Radix-based)
    dashboard/       → 13 business components + 8 chart components
    layout/          → 3 layout components (sidebar, header, shell)
  lib/               → 12 utility/service files
  hooks/             → 2 custom hooks
  types/             → Centralized TypeScript definitions
  middleware.ts      → Auth protection + security headers
```

---

## 2. Route Inventory

### Marketing (11 public routes)

| Route | Purpose |
|-------|---------|
| `/` | Landing page with hero, stats, pricing, testimonials |
| `/about` | Company story, team, office (Victoria Island) |
| `/contact` | Contact form, WhatsApp, office addresses |
| `/pricing` | 3-tier pricing with feature matrix |
| `/products/escrow` | Escrow product page |
| `/products/materials` | Materials product page |
| `/products/quality` | Quality certification product page |
| `/products/estates` | Estate portfolio product page |
| `/products/artisans` | Artisan marketplace product page |
| `/products/permits` | Permit navigator product page |
| `/products/defects` | Defect manager product page |

### Auth (3 routes)

`/login` · `/register` · `/onboarding`

### Dashboard (32+ routes across 7 modules)

**Module 1 — Escrow:** `/dashboard/escrow`, `/dashboard/escrow/[id]`
**Module 2 — Materials:** `/dashboard/materials`, `/dashboard/materials/[id]`, `/dashboard/materials/orders`
**Module 3 — Quality:** `/dashboard/quality`, `/dashboard/quality/[id]`, `/dashboard/quality/certificate/[id]`
**Module 4 — Estates:** `/dashboard/estates`, `/dashboard/estates/[id]`, `/dashboard/estates/[id]/units/[unitId]`
**Module 5 — Artisans:** `/dashboard/artisans`, `/dashboard/artisans/[id]`, `/dashboard/artisans/jobs/[id]`
**Module 6 — Permits:** `/dashboard/permits`, `/dashboard/permits/[id]`, `/dashboard/permits/guide`
**Module 7 — Defects:** `/dashboard/defects`, `/dashboard/defects/[id]`, `/dashboard/defects/analytics`
**Reports:** `/dashboard/reports`, `/dashboard/reports/financial`
**Other:** `/dashboard/settings`, `/dashboard/search`, `/dashboard/help`, `/dashboard/profile/[id]`

### API Routes (16 endpoints)

| Route | Methods | Status |
|-------|---------|--------|
| `/api/health` | GET | Working health check |
| `/api/auth/[...nextauth]` | GET, POST | Full NextAuth setup |
| `/api/escrow` | GET, POST | Mock data with filtering |
| `/api/materials` | GET, POST | Mock data with regional pricing |
| `/api/quality` | GET | Mock data |
| `/api/estates` | GET | Mock data |
| `/api/artisans` | GET | Mock data |
| `/api/permits` | GET | Mock data |
| `/api/defects` | GET, POST | Mock data with filtering |
| `/api/notifications` | GET, PATCH | Mock notifications |
| `/api/market/prices` | GET, POST | Material prices + crowdsource |
| `/api/market/calculator` | POST | Construction cost calculator |
| `/api/search` | GET | Global search across all modules |
| `/api/upload` | POST | File upload stub |
| `/api/reports` | GET | Report generation stub |
| `/api/webhooks/paystack` | POST | Webhook handler (signature verification) |

---

## 3. Prisma Schema

**28 models, 16 enums.** Key models:

| Model | Fields | Key Relations | Notes |
|-------|--------|---------------|-------|
| `User` | 16 | 17 relations | NIN, role, state, company |
| `EscrowProject` | 11 | client, contractor, engineer | Amounts in BigInt kobo |
| `EscrowMilestone` | 8 | project, verifier | Checklist as JSON |
| `EscrowTransaction` | 8 | project, milestone | Unique reference |
| `Material` | 6 | prices, group buys | Category enum |
| `MaterialPrice` | 7 | material, reporter | State+city index |
| `GroupBuyOrder` | 10 | material, participants | Deadline-based |
| `QualityProject` | 11 | client, engineer | Certificate number |
| `Inspection` | 9 | project, engineer | Stage checklist as JSON |
| `Estate` | 8 | developer, units | Total value in kobo |
| `EstateUnit` | 13 | estate, contractor | Payment tracking |
| `Artisan` | 11 | user, applications | Portfolio as JSON |
| `JobPost` | 10 | poster, applications | Skill+state+status index |
| `PermitApplication` | 12 | applicant, documents | Step tracking |
| `Property` | 8 | owner, developer, estate | Handover date |
| `DefectReport` | 12 | property, reporter, contractor | Photos as JSON |
| `WarrantyItem` | 5 | property | Expiry date indexed |
| `Notification` | 8 | user | Read status indexed |

**Schema quality:**
- All monetary values consistently use BigInt kobo
- Proper indexing on all foreign keys and query fields
- Composite unique constraints where appropriate (e.g., `[estateId, unitNumber]`)
- JSON fields for flexible data (checklists, photos, portfolios)
- NigerianState enum covers all 36 states + FCT

---

## 4. Component Library

### Base UI (18 components in `src/components/ui/`)

All built on Radix UI primitives with CVA variants: Button, Card, Badge, Input, Textarea, Select, Tabs, Dialog, Progress, Avatar, Dropdown Menu, Separator, Tooltip, Label, Switch, Checkbox, Table, Skeleton.

### Dashboard Components (13 in `src/components/dashboard/`)

`stat-card` · `data-table` (generic with sort/search/pagination) · `notification-panel` (20 notifications) · `activity-feed` (22 items) · `project-card` · `milestone-tracker` · `price-badge` · `rating-stars` · `file-upload` (drag & drop) · `currency-input` (₦ prefix, kobo conversion) · `status-timeline` · `map-placeholder` · `empty-state`

### Chart Components (8 in `src/components/dashboard/charts/`)

All use Recharts with embedded mock data: `revenue-chart` (dual area) · `project-pipeline` (horizontal bar) · `material-trends` (multi-line) · `quality-radar` (spider) · `defect-distribution` (donut pie) · `estate-progress` (stacked bar) · `payment-flow` (grouped bar) · `artisan-availability` (horizontal stacked)

### Layout (3 in `src/components/layout/`)

`sidebar` (collapsible, mobile overlay, count badges, active detection) · `header` (search, notifications, user dropdown) · `dashboard-shell` (combines sidebar + header + content)

---

## 5. Library & Services Layer

| File | Lines | Purpose | Status |
|------|-------|---------|--------|
| `auth.ts` | 220 | NextAuth config, PBKDF2 password verification, demo users | **Complete** — works without DB |
| `db.ts` | 32 | Prisma singleton with graceful fallback to null | **Complete** |
| `utils.ts` | 18 | `cn()` class merger, `formatNaira()` | **Minimal but sufficient** |
| `constants.ts` | 310 | 8 construction stages, 12 material categories, 12 artisan skills, warranty periods, fee structures, Nigerian states/cities, nav items | **Comprehensive** |
| `api-helpers.ts` | 217 | Response wrappers, pagination, filtering, sorting, ID generation, rate limiting | **Complete** |
| `validations.ts` | 100+ | Email, phone (+234), NIN (11-digit), amount validation | **Complete** |
| `mock-data.ts` | 191 | 10 users, 5 escrow projects, 15 material prices, 12 artisans, 4 estates, 5 permits, 8 defects, 10 notifications | **Comprehensive mock dataset** |
| `nigerian-data.ts` | 100+ | 33 banks with Paystack codes, 40+ materials with price ranges, regulatory bodies per state | **Extensive reference data** |
| `paystack.ts` | 365 | Transaction init/verify, transfer, bank list — all mock responses | **Stub only** |
| `sms.ts` | — | Termii SMS provider stubs | **Stub only** |
| `notifications.ts` | — | Notification service stubs | **Stub only** |
| `reports.ts` | — | Report generation stubs | **Stub only** |

**Hooks:** `use-local-storage.ts` (SSR-safe, cross-tab sync) · `use-mobile.ts` (responsive breakpoint detection)

---

## 6. Authentication

- **Strategy:** JWT with 30-day sessions
- **Provider:** CredentialsProvider (email + password)
- **Password hashing:** PBKDF2 via Web Crypto API (salt:hash format)
- **Demo mode:** If database unavailable, accepts `daniel@buildng.com` / `demo` and `chioma@buildng.com` / `demo`
- **Middleware:** Protects all `/dashboard/*` routes, redirects to `/login` with callback URL
- **Security headers:** X-Frame-Options DENY, CSP, HSTS, CORS for API routes
- **Google OAuth:** Commented out, ready to enable

---

## 7. Type System

`src/types/index.ts` (336 lines) defines 30+ types/interfaces covering all modules. Key types: `ApiResponse<T>`, `User`, `EscrowProject`, `Milestone`, `Material`, `MaterialPrice`, `GroupOrder`, `QualityProject`, `Estate`, `EstateUnit`, `Artisan`, `JobPost`, `PermitApplication`, `DefectReport`, `WarrantyItem`, `Notification`, `Activity`, `StatCard`, `FilterOptions`.

**Known issue:** Frontend types and Prisma schema are partially out of sync (e.g., `EscrowStatus` uses "ACTIVE" in types but "IN_PROGRESS" in Prisma, `MaterialCategory` is incomplete in types). This needs reconciliation before switching from mock to real data.

---

## 8. Dependencies (25 packages)

**Core:** next@16, react@19, typescript@6, tailwindcss@4
**Data:** prisma@7, next-auth@4
**UI:** 13 @radix-ui packages, class-variance-authority, clsx, tailwind-merge, lucide-react
**Charts:** recharts@3
**Utilities:** date-fns@4, postcss, autoprefixer

**Not included:** testing libraries, error tracking (Sentry), analytics, Storybook, linting tools in dependencies

---

## 9. What's Missing / Known Issues

### Critical (blocks production)

1. **No real database** — all API routes return mock data. Prisma schema is defined but no migrations have been run.
2. **Payment integration is stubs only** — Paystack functions return mock responses. No actual money movement.
3. **Type mismatch** — Frontend types don't match Prisma schema. Will cause runtime errors when connected to real DB.
4. **Demo credentials hardcoded** — `"demo"` password accepted for two accounts. Must be removed for production.

### High Priority

5. **Missing `/dashboard/market` page** — sidebar links to it but the page doesn't exist (404). The `/dashboard/market/calculator` sub-route works.
6. **Missing `/dashboard/profile` page** — only the `[id]` dynamic route exists, not the main profile page.
7. **File upload is a stub** — defect photos, inspection evidence, and documents can't actually be uploaded.
8. **SMS/email notifications not implemented** — Termii and email providers are stubs.
9. **NIN verification not implemented** — VerifyMe API not connected.

### Medium Priority

10. **No test suite** — zero test files, no Jest/Vitest config.
11. **Mock data duplicated** — exists in both `mock-data.ts` and inline in API routes with different structures.
12. **No API documentation** — no OpenAPI/Swagger spec.
13. **Loading skeletons exist for 7 modules** but some may not perfectly match their page layouts.

### Low Priority

14. Map visualization is a placeholder component.
15. PDF certificate generation not implemented.
16. Some large components (350+ lines) could be decomposed.
17. `console.log` calls likely exist in Paystack stubs.

---

## 10. Architecture Assessment

**Strengths:**
- Clean separation: pages → components → hooks → lib → types
- Consistent money handling (always kobo, never mixed)
- Comprehensive Nigerian market data (banks, states, materials, regulations)
- Every module has loading skeletons, error boundaries
- Demo mode lets the app run without any infrastructure
- 18 well-built base UI components on Radix primitives
- Good middleware (auth protection, security headers, CORS, rate limit headers)

**Weaknesses:**
- Type definitions diverge from Prisma schema
- Mock data scattered across multiple files
- No tests at all
- All external integrations are stubs (Paystack, Cloudinary, Termii, VerifyMe)
- Some pages written by parallel agents may have slightly inconsistent patterns

**Overall: 7.5/10** — Solid MVP/demo-ready architecture. Well-organized, visually polished, and genuinely Nigerian-specific. Needs database integration, payment wiring, type reconciliation, and tests before production deployment.
