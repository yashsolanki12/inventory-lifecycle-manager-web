# Inventory Lifecycle Manager — Web

React frontend for the Shopify Inventory Lifecycle Manager app. Built with React Router v7, MUI, and Vite.

## Tech Stack

- **Framework:** React 18 + React Router v7 (file-system routing)
- **UI:** Material UI v9
- **Build:** Vite
- **State:** TanStack React Query
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **HTTP:** Axios
- **Auth:** Shopify App Bridge + Prisma session storage

## Project Structure

```
web/
├── app/
│   ├── routes/           # File-system routes (23 files)
│   ├── pages/            # Page components
│   │   ├── inventory/    # Inventory list + detail view + tabs
│   │   ├── rules/        # Rules CRUD + match preview
│   │   └── orders/       # Orders list
│   ├── components/       # Shared components (ReusableList, AsyncAutocomplete, etc.)
│   ├── hooks/            # Custom hooks (useInventoryData, useInventorySubmit, etc.)
│   ├── ui/               # Skeleton loaders, confirmation dialog
│   ├── utils/            # Helpers, constants, column configs
│   ├── api/              # API client functions
│   └── validations/      # Zod schemas
├── prisma/               # Session storage schema
├── vite.config.js
├── react-router.config.ts
├── shopify.app.toml
├── Dockerfile
├── .env.example
└── package.json
```

## Setup

```bash
cp .env.example .env        # Fill in credentials
npm install
npx prisma generate
npm run dev                  # Start dev server via Shopify CLI
```

### Environment Variables

| Variable | Description |
|---|---|
| `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET` | Shopify app credentials |
| `SCOPES` | Required Shopify API scopes |
| `SHOPIFY_API_VERSION` | Shopify API version |
| `SHOPIFY_APP_URL` | App public URL |
| `DATABASE_URL` | Prisma database URL (MySQL) |
| `VITE_BACKEND_API_URL` | Backend API base URL |

## Pages

| Route | Page | Description |
|---|---|---|
| `/app` | Dashboard | KPI cards, charts, dead stock trend |
| `/app/products` | Products | Product list with search, sort, status filters |
| `/app/orders` | Orders | Order list with search, status filters |
| `/app/inventory` | Inventory | Inventory list with aging, stock status |
| `/app/inventory/:id` | Inventory Detail | Product detail with tabs (Overview, History, Sales, Variants) |
| `/app/rules` | Rules | Rule list with checkbox selection |
| `/app/rules/create` | Create Rule | Rule creation form |
| `/app/rules/:id` | Edit Rule | Rule edit form |
| `/app/rules/match` | Rule Match Preview | Matched products table with Run Rule action |
| `/app/plans` | Pricing Plans | Plan selection and management |

## Key Components

### ReusableList

Generic paginated table with search, sort, filters, and optional checkbox selection. Used across products, orders, rules, and match preview pages.

**Props:**
- `fetchFn` — API function receiving `{ page, limit, search, sort }`
- `columns` — Column definitions with custom renderers
- `actions` — Row action buttons (edit, delete, etc.)
- `selectable` — Enable checkbox selection
- `selectedIds` / `onToggleSelect` / `onToggleSelectAll` — Selection state
- `hideSearch` — Hide search field
- `filters` — Dropdown filters

### AsyncAutocomplete

Lazy-loading autocomplete with infinite scroll. Used for product types, vendors.

### AsyncMultiSelectTags

Multi-select dropdown with checkboxes and tag chips. Used for excluded tags in rules.

### TabPanel

Scrollable tab content container with preserved scroll position on data changes.

### InventoryViewSkeleton

Skeleton loader for the inventory detail view. Rebuilds the MUI Tabs bar (minHeight, divider, indicator on first tab), stat-card grid, and chart placeholders using shared labels from `utils/helper.js` (`INVENTORY_VIEW_TABS_LABEL`, `INVENTORY_VIEW_TABS_STATS_CARD`).

## Features

### Dashboard
- KPI cards (total products, stock, fresh/dead/expiring stock)
- Sales trend and inventory trend charts
- Dead stock trend over time
- Quick action links
- Re-sync button — after syncing, plan usage (`usedToday`/limit) and dashboard/aging data are refetched

### Products
- Paginated list with search and sort
- Status filter (active/draft/unlisted)
- Product detail with image zoom, variants, collections
- Sync products from Shopify

### Inventory
- Stock levels with aging buckets (Fresh / Stale / Expiring / Dead)
- Aging analysis by vendor, product type, collection
- Movement history (additions, removals, sales, adjustments)
- Sales velocity calculation
- Inventory history and sales history tabs with pagination

### Rules
- Checkbox selection with select-all
- Match Rule button — sends selected rule IDs to preview API
- Rule Match Preview — paginated table of matched products (Product, SKU, Reason, Age, Stock)
- Banner showing affected items count
- Run Rule — executes actions on matched products, then refreshes plan usage so the scan counter updates on the dashboard
- Rule form with Zod validation:
  - Rule name, condition
  - Days without sales (with operator)
  - Product age, stock threshold, zero stock toggle
  - Product type, vendor (async autocomplete)
  - Excluded tags (multi-select)
  - Action type (active/draft/unlisted/archive)

### Orders
- Paginated list with search
- Status and payment status filters
- Fulfillment status display

### Pricing Plans
- Free / Starter / Pro tier display
- Feature comparison
- Plan upgrade management

## API Integration

All API calls go through Axios to the backend (`VITE_BACKEND_API_URL`).

| Module | File | Endpoints |
|---|---|---|
| Products | `api/products.js` | `/products/*` |
| Rules | `api/archive-rules.js` | `/rules/*`, `/products/scan/*` |
| Orders | `api/order.js` | `/orders` |
| Inventory | `api/inventory-aging.js`, `api/inventory-dashboard.js` | `/inventory/*`, `/analytics/*` |
| Movements | `api/movements.js` | `/analytics/movements/*` |
| Dead Stock | `api/dead-stock-trend.js` | `/analytics/dead-stock-trend` |
| Plans | `api/plan.js`, `api/plan-usage.js` | `/rules/plan` |

## Hooks

| Hook | Purpose |
|---|---|
| `useInventoryData` | Wraps React Query `useQuery` with snackbar error handling |
| `useInventorySubmit` | Wraps React Query `useMutation` with snackbar + cache invalidation |
| `useAsyncOptions` | Infinite-scroll async option loading |
| `useMergedOptions` | Merges async options with selected values |

## Validation

Form validation uses Zod schemas via `@hookform/resolvers`:

- `ruleFormSchema` — Rule creation/edit form
- Field-level validation with inline error messages
- `mode: "onBlur"` for early error display

## Routing

File-system routing via `@react-router/fs-routes`:

```
app._index.jsx              → /app
app.products.jsx            → /app/products
app.orders.jsx              → /app/orders
app.inventory._index.jsx    → /app/inventory
app.inventory.$id.jsx       → /app/inventory/:id
app.rules._index.jsx        → /app/rules
app.rules.create.jsx        → /app/rules/create
app.rules.$id.jsx           → /app/rules/:id
app.rules.match.jsx         → /app/rules/match
app.plans.jsx               → /app/plans
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Shopify CLI) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run typecheck` | TypeScript type check |
| `npm run lint` | ESLint check |
