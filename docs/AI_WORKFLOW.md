# AI Workflow Note

## How This Project Was Built

This application was developed using Cursor AI as a pair-programming assistant. Below is a summary of the AI-assisted workflow used to deliver the assessment MVP.

## 1. Requirements Analysis

The assessment specification was provided as a detailed user-flow document covering:

- Login with two test users
- Dashboard with sidebar navigation
- Document CRUD with rich-text editing
- File upload (.txt, .md)
- Document sharing
- MongoDB collections (Users, Documents, Shares)

The AI parsed this into a structured implementation plan with clear milestones.

## 2. Stack Selection

The recommended stack was applied directly:

- **Next.js** — App Router for pages and API routes
- **Prisma** — Type-safe MongoDB access
- **NextAuth** — Credentials-based authentication
- **TipTap** — Rich-text editor with required formatting tools
- **Tailwind CSS** — Utility-first styling

## 3. Implementation Order

The AI followed a bottom-up build sequence:

1. **Database schema** — Prisma models for User, Document, Share
2. **Auth layer** — NextAuth config, middleware, session types
3. **API routes** — REST endpoints with access control
4. **UI components** — Editor, Sidebar, DocumentList, ShareModal
5. **Pages** — Login, Dashboard, Editor
6. **Seed & test** — Test users, automated unit test
7. **Documentation** — README, architecture note, this workflow note

## 4. AI-Assisted Decisions

| Decision | Rationale |
|----------|-----------|
| JWT sessions over database sessions | Simpler for serverless (Vercel) deployment |
| HTML storage in MongoDB | Matches assessment spec; TipTap outputs HTML natively |
| `plainTextToHtml` helper | Converts uploaded .txt/.md to editor-compatible HTML |
| Share by email dropdown | Matches assessment "Select User → Grant Access" flow |
| Vitest for testing | Lightweight, fast, no browser needed for unit tests |

## 5. Prompting Strategy

Effective prompts used during development:

- **Flow-first**: Paste the full assessment flow so the AI builds exactly what's required
- **Stack constraints**: Specify technologies upfront to avoid wrong library choices
- **Incremental**: Build auth → CRUD → editor → sharing in order
- **Verify**: Ask the AI to run tests and check for lint errors after each phase

## 6. What the Human Developer Should Do

1. Provide the MongoDB connection URL in `.env`
2. Generate `AUTH_SECRET` (`openssl rand -base64 32`)
3. Run `npx prisma db push && npx prisma db seed`
4. Test the full flow locally with both test accounts
5. Deploy to Vercel and record the walkthrough video

## 7. Limitations & Future Improvements

- No real-time collaborative editing (would need WebSockets/Yjs)
- No role-based permissions (view-only vs edit) — all shared users can edit
- Markdown upload is converted to plain HTML paragraphs, not full MD rendering
- No document deletion or version history
