# TrendWaves SmartConnect Backend

The backend runs inside Next.js API routes. You do not need a separate Express server for this version.

## Setup

1. Create a Supabase project or local PostgreSQL database.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, and `APP_URL`.
4. Run:

```powershell
npm.cmd run db:generate
npm.cmd run db:migrate -- --name init
npm.cmd run db:seed
```

Seed login:

```text
admin@trendwaves.app
TrendWaves123!
```

## Main API Routes

Auth:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

QR:

```text
GET /api/qr
POST /api/qr/create
GET /api/qr/:id
PUT /api/qr/:id
DELETE /api/qr/:id
GET /api/qr/:id/export?format=png
GET /api/qr/:id/export?format=svg
GET /api/qr/:id/export?format=pdf
```

NFC:

```text
GET /api/nfc
POST /api/nfc/register
GET /api/nfc/:id
PUT /api/nfc/:id/update
```

Redirect:

```text
GET /r/:shortId
```

Analytics:

```text
GET /api/analytics/overview
GET /api/analytics/:campaignId
```

Campaigns and clients:

```text
GET /api/campaigns
POST /api/campaigns
GET /api/campaigns/:id
PUT /api/campaigns/:id
DELETE /api/campaigns/:id

GET /api/clients
POST /api/clients
GET /api/clients/:id
PUT /api/clients/:id
DELETE /api/clients/:id
```

Protected API routes expect:

```text
Authorization: Bearer <token>
```

The browser app also stores this same JWT in an HTTP-only cookie named `tw_session` after login or registration.

## Redirect Engine

`GET /r/:shortId`:

1. Finds the QR code or NFC tag by `shortId`.
2. Captures visitor metadata from headers and user agent.
3. Logs a `ScanEvent`.
4. Updates scan/tap counters.
5. Redirects to the editable destination URL.

For stricter production mode, set:

```text
REQUIRE_SIGNED_REDIRECTS="true"
```

Then generate redirect links through the QR create/export APIs so they include a signed `?s=` token.
