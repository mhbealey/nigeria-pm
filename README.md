# BuildNG - Nigerian Construction Project Management Platform

**The all-in-one platform built for Nigerian construction professionals.** Manage escrow payments, source materials, certify quality, track estates, hire artisans, navigate permits, and handle post-handover defects -- all from a single dashboard denominated in Naira and designed for local workflows.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Modules](#modules)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Nigeria's construction industry faces unique challenges: fragmented payment systems, unverified material pricing, inconsistent quality standards, and complex state-level permit requirements. BuildNG addresses all of these through **7 integrated modules** purpose-built for the Nigerian market.

Whether you are a property developer managing a 200-unit estate in Lekki, a contractor sourcing cement at the best price in Abuja, or a homeowner tracking post-handover defects, BuildNG gives you the tools to operate with confidence.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 6 |
| **Styling** | Tailwind CSS v4 |
| **ORM / Database** | Prisma ORM + PostgreSQL |
| **Authentication** | NextAuth.js |
| **Charts** | Recharts |
| **UI Components** | Radix UI primitives + shadcn-inspired components |
| **Payments** | Paystack integration |
| **SMS / Notifications** | Termii SMS gateway |
| **Utilities** | date-fns, clsx, tailwind-merge, class-variance-authority, Lucide icons |

---

## Modules

### 1. Construction Escrow

Milestone-based payment protection for contractors and clients. Funds are held securely and released only when agreed-upon project milestones are verified and approved. Integrated with Paystack for seamless Naira transactions.

### 2. Materials Market

Real-time price index for construction materials across Nigerian states. Crowdsourced pricing data, group buying to unlock bulk discounts, and a cost calculator that accounts for regional price variations and delivery logistics.

### 3. Build Quality Certification

An 8-stage inspection framework covering foundation, structural, MEP (mechanical, electrical, plumbing), finishing, and final handover. Generates PDF certificates for completed inspections with quality radar visualizations.

### 4. Estate Portfolio Manager

Multi-unit tracking for property developers and estate managers. Monitor construction progress across all units, visualize completion percentages, and manage unit-level financials from a single dashboard.

### 5. Artisan Marketplace

Discover and hire verified skilled workers -- bricklayers, electricians, plumbers, tilers, painters, and more. NIN-verified profiles, skill ratings, availability tracking, and project history for informed hiring decisions.

### 6. Permit Navigator

State-by-state compliance guidance for building permits across Nigeria's 36 states and the FCT. Track required documents, submission deadlines, approval status, and regulatory fees. Never miss a compliance step.

### 7. Defect & Warranty Manager

Post-handover defect tracking and warranty management. Log defects with photos, assign resolution responsibility, track repair timelines, and maintain a complete audit trail for warranty claims.

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **PostgreSQL** 14+
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/mhbealey/nigeria-pm.git
cd nigeria-pm

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/buildng?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Paystack
PAYSTACK_SECRET_KEY="sk_test_your_paystack_secret"
PAYSTACK_PUBLIC_KEY="pk_test_your_paystack_public"

# Termii SMS
TERMII_API_KEY="your-termii-api-key"
TERMII_SENDER_ID="BuildNG"
```

### Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
nigeria-pm/
├── prisma/                          # Database schema and seed data
├── public/                          # Static assets
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx       # Login page
│   │   │   ├── register/page.tsx    # Registration page
│   │   │   └── layout.tsx           # Auth layout
│   │   ├── (marketing)/
│   │   │   └── layout.tsx           # Marketing/landing layout
│   │   ├── api/
│   │   │   ├── artisans/route.ts    # Artisan marketplace API
│   │   │   ├── defects/route.ts     # Defect tracking API
│   │   │   ├── escrow/route.ts      # Escrow payments API
│   │   │   ├── estates/route.ts     # Estate management API
│   │   │   ├── health/route.ts      # Health check endpoint
│   │   │   ├── materials/route.ts   # Materials market API
│   │   │   ├── permits/route.ts     # Permit navigator API
│   │   │   └── quality/route.ts     # Quality certification API
│   │   ├── dashboard/
│   │   │   ├── escrow/page.tsx      # Escrow dashboard
│   │   │   ├── materials/
│   │   │   │   └── [id]/page.tsx    # Material detail page
│   │   │   ├── layout.tsx           # Dashboard layout
│   │   │   └── page.tsx             # Main dashboard
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Landing page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── charts/
│   │   │   │   ├── artisan-availability.tsx
│   │   │   │   ├── defect-distribution.tsx
│   │   │   │   ├── estate-progress.tsx
│   │   │   │   ├── material-trends.tsx
│   │   │   │   ├── payment-flow.tsx
│   │   │   │   ├── project-pipeline.tsx
│   │   │   │   ├── quality-radar.tsx
│   │   │   │   └── revenue-chart.tsx
│   │   │   ├── activity-feed.tsx
│   │   │   ├── currency-input.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── empty-state.tsx
│   │   │   ├── file-upload.tsx
│   │   │   ├── map-placeholder.tsx
│   │   │   ├── milestone-tracker.tsx
│   │   │   ├── notification-panel.tsx
│   │   │   ├── price-badge.tsx
│   │   │   ├── project-card.tsx
│   │   │   ├── rating-stars.tsx
│   │   │   ├── stat-card.tsx
│   │   │   └── status-timeline.tsx
│   │   ├── layout/
│   │   │   ├── dashboard-shell.tsx
│   │   │   ├── header.tsx
│   │   │   └── sidebar.tsx
│   │   └── ui/                      # Radix-based UI primitives
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── skeleton.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── hooks/
│   │   ├── use-local-storage.ts
│   │   └── use-mobile.ts
│   ├── lib/
│   │   ├── api-helpers.ts           # API response utilities
│   │   ├── auth.ts                  # NextAuth configuration
│   │   ├── db.ts                    # Prisma client singleton
│   │   ├── paystack.ts              # Paystack integration
│   │   ├── utils.ts                 # General utilities
│   │   └── validations.ts           # Zod/validation schemas
│   └── middleware.ts                # Auth & route protection
├── .eslintrc.json
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Key Features

### Nigerian-Specific Design

- **Naira-denominated**: All financial figures displayed in NGN with proper formatting
- **NIN Verification**: National Identification Number validation for artisan and user profiles
- **State Regulations**: Permit requirements mapped across all 36 states and FCT
- **Local Material Pricing**: Crowdsourced prices reflecting actual Nigerian market conditions

### User Experience

- **Mobile-Responsive**: Fully optimized for mobile devices -- critical for on-site usage
- **Real-Time Notifications**: In-app notification panel with activity feeds
- **SMS Alerts**: Termii SMS integration for milestone payments, inspection results, and permit updates
- **Interactive Charts**: 8 chart types (revenue, payment flow, material trends, quality radar, defect distribution, estate progress, artisan availability, project pipeline) powered by Recharts

### Payments and Finance

- **Paystack Integration**: Secure payment processing for escrow deposits, material purchases, and artisan payments
- **Milestone Tracking**: Visual milestone tracker with status timelines
- **Currency Input**: Purpose-built Naira input component with proper formatting

### Data and Intelligence

- **Market Intelligence**: Material price trends and regional comparisons
- **Cost Calculator**: Estimate project costs based on real market data
- **Quality Radar**: Multi-axis quality scoring visualization
- **PDF Certificates**: Downloadable quality certification documents

---

## API Routes

All API routes are located under `/api` and follow RESTful conventions.

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check -- returns service status |
| `GET /api/escrow` | List escrow transactions |
| `POST /api/escrow` | Create a new escrow transaction |
| `GET /api/materials` | List materials with price data |
| `POST /api/materials` | Submit material price entry |
| `GET /api/quality` | List quality inspections |
| `POST /api/quality` | Create inspection record |
| `GET /api/estates` | List estate portfolios |
| `POST /api/estates` | Create estate entry |
| `GET /api/artisans` | Search and list artisans |
| `POST /api/artisans` | Register artisan profile |
| `GET /api/permits` | List permit applications |
| `POST /api/permits` | Submit permit application |
| `GET /api/defects` | List defect reports |
| `POST /api/defects` | Submit defect report |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_URL` | Yes | Application base URL |
| `NEXTAUTH_SECRET` | Yes | Secret for JWT signing |
| `PAYSTACK_SECRET_KEY` | Yes | Paystack secret key |
| `PAYSTACK_PUBLIC_KEY` | Yes | Paystack public key |
| `TERMII_API_KEY` | No | Termii API key for SMS |
| `TERMII_SENDER_ID` | No | SMS sender ID |

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. **Fork** the repository and create your branch from `main`.
2. **Install** dependencies and verify the dev server runs cleanly.
3. **Follow** existing code conventions -- TypeScript strict mode, Tailwind for styling, Radix UI for interactive primitives.
4. **Write** clear commit messages describing the change.
5. **Test** your changes thoroughly before submitting a pull request.
6. **Open** a pull request with a description of the problem and your solution.

### Code Style

- Use TypeScript for all new files
- Follow the existing component patterns in `src/components/`
- Use the shared UI primitives from `src/components/ui/`
- Format currency values using the utilities in `src/lib/utils.ts`
- Validate inputs using schemas from `src/lib/validations.ts`

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 BuildNG

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
