# Complete TrendWaves SmartConnect Setup

This app has a working frontend, API routes, Prisma schema, auth screens, session cookies, redirect logging, QR export, NFC management structure, and a Supabase PostgreSQL database with seeded demo data.

## 1. Start The App Locally

```powershell
cd "C:\Users\msdnl\Documents\New folder\trendwaves-smartconnect"
npm.cmd run dev
```

Open:

```text
http://localhost:3000/dashboard
```

Local auth protection is now enabled, so opening dashboard routes redirects to login.

## 2. Supabase Status

Supabase is configured through Prisma using:

- `DATABASE_URL` for pooled runtime queries.
- `DIRECT_URL` for migrations.

Keep real secrets only in `.env` and `.env.local`. They are ignored by git.

## 3. Configure `.env.local`

```powershell
copy .env.example .env.local
```

Then edit `.env.local` and replace `YOUR_PASSWORD` with your real Supabase database password:

```env
DATABASE_URL="postgresql://postgres.hyfyzicudiwvrwhjmndp:YOUR_PASSWORD@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.hyfyzicudiwvrwhjmndp:YOUR_PASSWORD@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"
JWT_SECRET="make-this-a-long-random-secret"
APP_URL="http://localhost:3000"
REQUIRE_SIGNED_REDIRECTS="false"
```

Prisma CLI reads `.env` by default, while Next.js reads `.env.local`. Keep the same real values in both files.

For production:

```env
APP_URL="https://trendwaves.app"
REQUIRE_SIGNED_REDIRECTS="true"
```

## 4. Create Database Tables

Prisma is already installed and initialized in this project. The schema is in `prisma/schema.prisma`.

```powershell
npm.cmd run db:generate
npm.cmd run db:migrate -- --name init
npm.cmd run db:seed
npm.cmd run check:setup
```

Seed account:

```text
admin@trendwaves.app
TrendWaves123!
```

Then open:

```text
http://localhost:3000/login
```

## 5. What Is Already Connected

- `/login` and `/register` call backend auth routes.
- Backend creates a JWT and stores it in an HTTP-only `tw_session` cookie.
- `/api/auth/me` reads the logged-in user.
- `/api/auth/logout` clears the cookie.
- Protected dashboard pages validate the `tw_session` cookie before rendering.
- Middleware also protects dashboard routes in production.
- QR Manager reads live data from `GET /api/qr` when the database is available.
- NFC Manager reads live data from `GET /api/nfc`.
- Dashboard metrics read live analytics from `GET /api/analytics/overview`.
- The floating QR generator calls `POST /api/qr/create`.
- Redirect links use `/r/:shortId` and log scan events.

## 6. Test The Backend Manually

Login:

```powershell
$login = Invoke-RestMethod -Method POST `
  -Uri http://localhost:3000/api/auth/login `
  -ContentType "application/json" `
  -Body '{"email":"admin@trendwaves.app","password":"TrendWaves123!"}'

$token = $login.data.token
```

List QR codes:

```powershell
Invoke-RestMethod `
  -Uri http://localhost:3000/api/qr `
  -Headers @{ Authorization = "Bearer $token" }
```

Create a QR code:

```powershell
Invoke-RestMethod -Method POST `
  -Uri http://localhost:3000/api/qr/create `
  -Headers @{ Authorization = "Bearer $token" } `
  -ContentType "application/json" `
  -Body '{"name":"Demo QR","category":"WEBSITE","destinationUrl":"https://trendwaves.app"}'
```

## 7. Deploy To Vercel

1. Push the project to GitHub.
2. Import it in Vercel.
3. Add environment variables:

```env
DATABASE_URL
DIRECT_URL
JWT_SECRET
APP_URL
REQUIRE_SIGNED_REDIRECTS
```

Production values:

```env
APP_URL="https://trendwaves.app"
REQUIRE_SIGNED_REDIRECTS="true"
```

4. Deploy.
5. Run Prisma migration against production database.

## 8. Verify Setup Anytime

```powershell
npm.cmd run check:setup
npm.cmd run lint
npm.cmd run build
```

## 9. Production Architecture

The current production pass includes the premium `/client` dashboard, dynamic QR personalization APIs, client analytics exports, notification API, NFC write service, NFC write history, design version history, style presets, bulk QR styling, and the Web NFC prepare/write/confirm flow.

See `PRODUCTION.md` for the full folder structure, API map, database models, migration name, and Vercel/Supabase deployment checklist.
