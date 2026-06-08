# Docs Clone

A Google Docs-style document editor built for the assessment MVP. Create, edit, save, upload, and share rich-text documents with multiple users.

## Live Demo

**Deployed on Vercel:** [https://docflow-8qv64w881-yogeshs-projects-70e0e22d.vercel.app/](https://docflow-8qv64w881-yogeshs-projects-70e0e22d.vercel.app/)

| Email | Password |
|-------|----------|
| owner@test.com | password |
| user@test.com | password |

## Features

- **Authentication** — Login with email/password (NextAuth)
- **Dashboard** — My Documents & Shared With Me sidebar
- **Rich Text Editor** — Bold, Italic, Underline, Heading, Bullet List, Numbered List (TipTap)
- **Document Management** — Create, rename, save, reopen
- **File Upload** — Import `.txt` and `.md` files as new documents
- **Sharing** — Share documents with other users by email
- **MongoDB** — Users, Documents, and Shares collections via Prisma

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- MongoDB + Prisma ORM
- NextAuth v5 (Credentials)
- TipTap Editor
- Tailwind CSS 4

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/docs-clone?retryWrites=true&w=majority"
AUTH_SECRET="your-secret-here"
```

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Push schema and seed test users

```bash
npm run db:push
npm run db:seed
```

This creates two test accounts:

| Email | Password |
|-------|----------|
| owner@test.com | password |
| user@test.com | password |

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Assessment Flow

1. **Login** — Use `owner@test.com` or `user@test.com`
2. **Dashboard** — Sidebar with New Document, My Documents, Shared With Me
3. **Create** — Click New Document → opens editor with "Untitled Document"
4. **Edit** — Use toolbar for formatting, type content, click Save
5. **Rename** — Click the title to edit inline
6. **Reopen** — Return to dashboard, click a document card
7. **Upload** — Click Upload File, select a `.txt` or `.md` file
8. **Share** — In editor, click Share → select user → Grant Access
9. **Shared view** — Login as `user@test.com` → Shared With Me

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run automated tests |
| `npm run db:push` | Push Prisma schema to MongoDB |
| `npm run db:seed` | Seed test users |

## Deploy on Vercel

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `DATABASE_URL`, `AUTH_SECRET`
4. Deploy
5. After first deploy, run against your production database:

```bash
npx prisma db push
npx prisma db seed
```

## Documentation

- [Assessment Prompt](prompt/ASSESSMENT_PROMPT.md) — Original assessment requirements and user flow
- [Architecture Note](docs/ARCHITECTURE.md) — System design, data model, routes
- [AI Workflow Note](docs/AI_WORKFLOW.md) — How this project was built with AI assistance

## Project Structure

```
app/
  api/              # REST API (documents, users, auth, upload, share)
  dashboard/        # Document list pages
  documents/[id]/   # Editor page
  login/            # Login page
components/         # Editor, Sidebar, ShareModal, etc.
lib/                # Prisma, auth, helpers
prisma/             # Schema + seed
prompt/             # Assessment prompt / requirements
__tests__/          # Automated tests
docs/               # Architecture & AI workflow notes
```
