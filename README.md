# TrendWaves SmartConnect

Premium agency SaaS dashboard for dynamic QR codes, NFC tags, campaign analytics, client portals, and editable redirect destinations.

## Local Development

```powershell
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://localhost:3000/login
```

Seed login:

```text
admin@trendwaves.app
TrendWaves123!
```

## Supabase And Prisma

The project uses Prisma with Supabase PostgreSQL:

- `DATABASE_URL` uses Supabase connection pooling for runtime queries.
- `DIRECT_URL` uses the direct database connection for migrations.
- `.env` is used by Prisma CLI.
- `.env.local` is used by Next.js.

Useful commands:

```powershell
npm.cmd run db:generate
npm.cmd run db:migrate -- --name init
npm.cmd run db:seed
npm.cmd run check:setup
npm.cmd run db:studio
```

## Verification

```powershell
npm.cmd run check:setup
npm.cmd run lint
npm.cmd run build
```

See `SETUP.md`, `BACKEND.md`, and `PRODUCTION.md` for setup, API, architecture, and deployment notes.
