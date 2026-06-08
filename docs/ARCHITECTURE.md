# Architecture Note

## Overview

Docs Clone is a full-stack document editor built with Next.js App Router, MongoDB, and Prisma. Users authenticate via NextAuth credentials, create and edit rich-text documents with TipTap, upload `.txt`/`.md` files, and share documents with other users.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 |
| Editor | TipTap (StarterKit + Underline) |
| Auth | NextAuth v5 (JWT + Credentials) |
| Database | MongoDB via Prisma ORM |
| Deployment | Vercel |

## Data Model

```
User (1) ──< Document (many)     owner relationship
User (1) ──< Share (many)        sharedWithUser relationship
Document (1) ──< Share (many)    document relationship
```

### Collections

- **Users** — `email`, hashed `password`
- **Documents** — `title`, HTML `content`, `ownerId`
- **Shares** — `documentId`, `sharedWithUserId` (unique pair)

## Request Flow

```
Browser → Next.js Middleware (auth check)
       → App Router Page / API Route
       → Prisma Client → MongoDB
```

### Authentication

1. User submits credentials on `/login`
2. NextAuth `Credentials` provider validates against MongoDB
3. JWT session stored client-side; middleware protects all routes except `/login` and `/api/auth`

### Document Access Control

`canAccessDocument()` grants access if the user is the owner or has a Share record. API routes enforce this on every read/write.

## Key Routes

| Route | Purpose |
|-------|---------|
| `POST /api/documents` | Create empty document |
| `GET /api/documents?filter=mine\|shared` | List documents |
| `GET/PATCH /api/documents/[id]` | Read/update document |
| `POST /api/documents/[id]/share` | Share with user by email |
| `POST /api/documents/upload` | Upload .txt/.md file |
| `GET /api/users` | List users for share picker |

## File Structure

```
app/
  api/          # REST API routes
  dashboard/    # Document list views
  documents/    # Editor page
  login/        # Auth page
components/     # UI (Editor, Sidebar, ShareModal, etc.)
lib/            # Prisma client, auth config, helpers
prisma/         # Schema + seed script
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set `DATABASE_URL` and `AUTH_SECRET` environment variables
4. Run `npx prisma db push` and `npx prisma db seed` against production DB
5. Deploy
