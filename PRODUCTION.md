# Trend Waves SmartConnect Production Notes

## Folder Structure

```text
src/app
  client                      premium client dashboard
  dashboard                   agency dashboard
  qr-manager                  dynamic QR asset manager
  qr/customizer               advanced QR style editor
  nfc-manager                 NFC register/write/verify/lock UI
  qr/[id]/analytics           QR statistics page
  r/[shortId]                 dynamic redirect engine
  api                         backend route handlers
src/components/smartconnect   product views, shell, brand system
src/lib                       auth, analytics, Prisma, QR/NFC engines
src/services                  backend service layers
prisma                        schema, migrations, seed data
```

## Frontend Pages

- `/client`: client KPIs, charts, asset grid/table, detail modal, campaign monitor, export center, branding, permissions, password.
- `/qr/customizer`: live QR personalization with presets, rounded modules, gradients, logo upload, frame text, bulk style apply, style preset save, PNG/SVG/PDF export.
- `/nfc-manager`: backend connected NFC registration, write preparation, Web NFC write, confirmation, verification, locking, batch write queue.
- `/qr-manager`: QR CRUD, card detail panel, search/filter, grid/table, exports, duplicate, pause/resume, analytics links.

## Backend APIs

- Auth: `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`, `/api/auth/me`, `/api/auth/password`
- Clients: `/api/clients`, `/api/clients/[id]`, `/api/client/[id]`
- QR: `/api/qr`, `/api/qr/create`, `/api/qr/[id]`, `/api/qr/[id]/duplicate`, `/api/qr/[id]/style`, `/api/qr/[id]/style/rollback`, `/api/qr/bulk-style`, `/api/qr/style-presets`
- Exports: `/api/qr/[id]/export`, `/api/qr/[id]/analytics/export`, `/api/export/client/[id]`
- NFC: `/api/nfc`, `/api/nfc/register`, `/api/nfc/write`, `/api/nfc/write/confirm`, `/api/nfc/verify`, `/api/nfc/[id]/update`, `/api/nfc/[id]/lock`, `/api/nfc/batch-write`
- Analytics: `/api/analytics/overview`, `/api/analytics/client/[id]`, `/api/analytics/qr/[id]`
- Notifications: `/api/notifications`

## Database

Prisma models include:

```text
User, Client, Campaign, QrCode, NfcTag, ScanEvent,
AnalyticsSnapshot, Notification, ExportJob,
QRStylePreset, QrDesignVersion, NFCWriteLog, AuditLog
```

Current migration:

```text
prisma/migrations/20260514194258_production_upgrade
```

## Deployment

1. Add these environment variables in Vercel:

```env
DATABASE_URL
DIRECT_URL
JWT_SECRET
APP_URL
REQUIRE_SIGNED_REDIRECTS
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

2. Run migrations against Supabase:

```powershell
npm.cmd run db:generate
npm.cmd run db:migrate
npm.cmd run db:seed
```

3. Verify before deployment:

```powershell
npm.cmd run check:setup
npm.cmd run lint
npm.cmd run build
```

4. Deploy on Vercel with Supabase PostgreSQL. Use `APP_URL="https://trendwaves.app"` and `REQUIRE_SIGNED_REDIRECTS="true"` in production.
