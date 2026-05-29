# AUTODRIVE-AI

AI-powered car marketplace: **Next.js 16**, **Clerk**, **Prisma**, **Supabase Postgres**, **OpenAI**.

## Features

| Feature | Route / API |
|---------|-------------|
| AI photo search | Home → upload image → `/search` |
| AI text search | Home → search bar → `/search` |
| Inventory | `/cars`, `/cars/[id]` |
| Wishlist | `/saved-cars`, `/api/wishlist` |
| Test drive reservations | Car detail → `/reservations` |
| Listing messages | Car detail → `/messages` |
| Admin | `/admin` (bookings + inquiries) |

## Quick start

```bash
pnpm install
cp .env.example .env   # fill in keys
pnpm run db:setup      # push schema + seed 6 cars
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`. Required:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- `DATABASE_URL`, `DIRECT_URL` (Supabase Postgres)
- `OPENAI_API_KEY` (AI search; keyword fallback without it)

## Admin

Clerk user **Public metadata**:

```json
{ "role": "admin" }
```

Or set `User.role` to `ADMIN` in the database.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm run db:push` | Sync Prisma schema to DB |
| `pnpm run db:seed` | Seed dealership + cars |
| `pnpm run db:setup` | Push + seed |

## Note on package managers

Use **pnpm** (`pnpm install`). If `npm install` fails with permission errors on Windows, use pnpm instead.
