# RED KING

Personal Intelligence Workspace — منصة تحليل واستخبارات ومساعد ذكاء اصطناعي للاستخدام الشخصي.

## Stack

- **React 18** + **TypeScript**
- **Vite 5** — build tool / dev server
- **Zustand** — state management
- **Tailwind CSS** — styling
- **React Router v6** — routing

## Running on Replit

The **Start application** workflow runs `npm run dev` and serves the app on port 5000.

```
npm run dev    # dev server → http://localhost:5000
npm run build  # production build
npm run lint   # ESLint
npm run format # Prettier
```

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `GITHUB_PAT` | For Git push | Personal Access Token with `repo` scope. Set as a Replit Secret — do **not** hardcode in `.replit`. |
| `VITE_AI_API_KEY` | Future (Sprint 12+) | AI backend key — not needed yet |
| `VITE_API_BASE_URL` | Future (Sprint 12+) | API base URL — not needed yet |

## Project status

Currently at **Sprint 11 — Settings ✓**. See [`ROADMAP.md`](./ROADMAP.md) for what's built and what's next.

## User preferences

- Keep existing project structure and stack — do not restructure or migrate.
- This is a personal tool, not a SaaS product.
