# Backend Integration Plan — RED KING

> **Status:** Pre-implementation checklist. No code changes made.
> **Scope:** Replace all `localStorage` persistence with a real backend API.
> **Architecture assumption:** REST API (can be adapted to GraphQL or tRPC). One base URL: `VITE_API_BASE_URL`.

---

## Summary

| | Count |
|---|---|
| Features affected | 18 |
| localStorage keys to retire | 21 |
| API endpoints required | 48 |
| Existing API client | ❌ None — must be created |
| Existing service layer | ❌ None — hooks own all data logic |

---

## Phase 0 — Foundation (do first, everything depends on this)

### 0.1 HTTP Client

Create `src/services/apiClient.ts`:
- Wraps `fetch` or `axios`
- Reads base URL from `VITE_API_BASE_URL`
- Attaches auth headers (JWT / session token) when available
- Centralised error handling and request/response typing

### 0.2 Environment Variables

Add to `.env.example` (and provision for real deployment):

```
VITE_API_BASE_URL=https://api.redking.local
VITE_API_TIMEOUT_MS=10000
```

### 0.3 React Query / SWR (recommended)

Install a data-fetching layer (e.g. `@tanstack/react-query`) to replace the
`useState + useEffect + localStorage` pattern in every hook. Each hook becomes
a thin wrapper around a query/mutation.

---

## Phase 1 — Feature Migration Checklist

### 1. Notes
- **Hook:** `src/features/notes/useNotes.ts`
- **Storage key:** `red_king.notes.v1`
- **Operations exposed:** list, create, update, delete, toggle pin, toggle favourite

| # | Method | Endpoint | Description |
|---|---|---|---|
| 1 | GET | `/api/notes` | List all notes (supports `?folder=`, `?tag=`, `?q=`) |
| 2 | POST | `/api/notes` | Create note |
| 3 | PUT | `/api/notes/:id` | Update note content / metadata |
| 4 | DELETE | `/api/notes/:id` | Delete note |

---

### 2. Investigations
- **Hook:** `src/features/investigations/useInvestigations.ts`
- **Storage key:** `red_king.investigations.v1`
- **Operations exposed:** list, create, update status, delete

| # | Method | Endpoint | Description |
|---|---|---|---|
| 5 | GET | `/api/investigations` | List investigations (supports `?status=`) |
| 6 | POST | `/api/investigations` | Create investigation |
| 7 | PUT | `/api/investigations/:id` | Update investigation (status, title, etc.) |
| 8 | DELETE | `/api/investigations/:id` | Delete investigation |

---

### 3. Cases
- **Hook:** `src/features/cases/useCases.ts`
- **Storage key:** `red_king.cases.v1`
- **Operations exposed:** list, create, update, delete

| # | Method | Endpoint | Description |
|---|---|---|---|
| 9 | GET | `/api/cases` | List cases (supports `?status=`, `?q=`) |
| 10 | POST | `/api/cases` | Create case |
| 11 | PUT | `/api/cases/:id` | Update case |
| 12 | DELETE | `/api/cases/:id` | Delete case |

---

### 4. IOC Manager
- **Hook:** `src/features/ioc/useIocs.ts`
- **Storage key:** `red_king.ioc.v1`
- **Operations exposed:** list, create, update, delete

| # | Method | Endpoint | Description |
|---|---|---|---|
| 13 | GET | `/api/ioc` | List IOCs (supports `?type=`, `?status=`, `?q=`) |
| 14 | POST | `/api/ioc` | Add IOC |
| 15 | PUT | `/api/ioc/:id` | Update IOC (status, tags, etc.) |
| 16 | DELETE | `/api/ioc/:id` | Remove IOC |

---

### 5. Evidence Locker
- **Hook:** `src/features/evidence/useEvidence.ts`
- **Storage key:** `red_king.evidence.v1`
- **Operations exposed:** list, add, remove

| # | Method | Endpoint | Description |
|---|---|---|---|
| 17 | GET | `/api/evidence` | List evidence items (supports `?type=`, `?q=`) |
| 18 | POST | `/api/evidence` | Add evidence (multipart for file upload) |
| 19 | DELETE | `/api/evidence/:id` | Remove evidence item |

---

### 6. Correlation Engine
- **Hook:** `src/features/correlation/useCorrelation.ts`
- **Storage keys:** `red_king.correlation.entities.v1`, `red_king.correlation.relationships.v1`
- **Operations exposed:** list entities, add entity, list relationships, add/remove relationship

| # | Method | Endpoint | Description |
|---|---|---|---|
| 20 | GET | `/api/correlation/entities` | List entities (supports `?type=`, `?q=`) |
| 21 | POST | `/api/correlation/entities` | Add entity |
| 22 | PUT | `/api/correlation/entities/:id` | Update entity |
| 23 | DELETE | `/api/correlation/entities/:id` | Remove entity |
| 24 | GET | `/api/correlation/relationships` | List relationships |
| 25 | POST | `/api/correlation/relationships` | Add relationship |
| 26 | DELETE | `/api/correlation/relationships/:id` | Remove relationship |

---

### 7. Threat Intelligence
- **Hook:** `src/features/threat-intel/useThreatIntel.ts`
- **Storage key:** `red_king.threat_intel.v1`
- **Operations exposed:** list (read-only feed + filters)

| # | Method | Endpoint | Description |
|---|---|---|---|
| 27 | GET | `/api/threat-intel` | List threat feed (supports `?severity=`, `?source=`, `?q=`) |
| 28 | POST | `/api/threat-intel` | Add manual threat entry |

---

### 8. OSINT
- **Hook:** `src/features/osint/useOsint.ts`
- **Storage keys:** `red_king.osint.corpus.v1`, `red_king.osint.history.v1`
- **Operations exposed:** run query, list results, list history, clear history

| # | Method | Endpoint | Description |
|---|---|---|---|
| 29 | POST | `/api/osint/search` | Run OSINT query (returns results) |
| 30 | GET | `/api/osint/history` | List past searches |
| 31 | DELETE | `/api/osint/history/:id` | Remove history entry |

---

### 9. Reports
- **Hook:** `src/features/reports/useReports.ts`
- **Storage key:** `red_king.reports.v1`
- **Operations exposed:** list, view, export

| # | Method | Endpoint | Description |
|---|---|---|---|
| 32 | GET | `/api/reports` | List reports (supports `?category=`, `?q=`) |
| 33 | GET | `/api/reports/:id` | Get single report |
| 34 | POST | `/api/reports` | Generate / save report |

---

### 10. Timeline
- **Hook:** `src/features/timeline/useTimeline.ts`
- **Storage key:** `red_king.timeline.v1`
- **Operations exposed:** list events (read-only, append-only internally)

| # | Method | Endpoint | Description |
|---|---|---|---|
| 35 | GET | `/api/timeline` | List timeline events (supports `?type=`, `?q=`) |
| 36 | POST | `/api/timeline` | Append event (called internally by other features) |

---

### 11. Workspace
- **Hook:** `src/features/workspace/useWorkspace.ts`
- **Storage key:** `red_king.workspace.v1`
- **Operations exposed:** read project tree / favourites / recent activity, add note

| # | Method | Endpoint | Description |
|---|---|---|---|
| 37 | GET | `/api/workspace` | Read full workspace state |
| 38 | PUT | `/api/workspace/favorites` | Update favourites list |
| 39 | POST | `/api/workspace/notes` | Add quick workspace note |

---

### 12. Files
- **Hook:** `src/features/files/useFiles.ts`
- **Storage key:** `red_king.files.v1`
- **Operations exposed:** list, open (preview), update recent

| # | Method | Endpoint | Description |
|---|---|---|---|
| 40 | GET | `/api/files` | List workspace files |
| 41 | PUT | `/api/files/recent` | Update recently accessed files list |

---

### 13. Analytics
- **Hook:** `src/features/analytics/useAnalytics.ts`
- **Storage key:** `red_king.analytics.v1`
- **Operations exposed:** read KPIs / distributions / activity (read-only, computed)

| # | Method | Endpoint | Description |
|---|---|---|---|
| 42 | GET | `/api/analytics` | Aggregated metrics (supports `?range=30d\|90d\|all`) |

---

### 14. Dashboard
- **Hook:** `src/features/dashboard/useDashboard.ts`
- **Storage key:** `red_king.dashboard.v1`
- **Operations exposed:** read stats / system status / recent activity (read-only)

| # | Method | Endpoint | Description |
|---|---|---|---|
| 43 | GET | `/api/dashboard` | Dashboard summary (stats, status, recent activity) |

---

### 15. Global Search
- **Hook:** `src/features/search/useGlobalSearch.ts`
- **Storage key:** `red_king.search_index.v1`
- **Operations exposed:** query across all content types

| # | Method | Endpoint | Description |
|---|---|---|---|
| 44 | GET | `/api/search` | Full-text search across all domains (`?q=`, `?type=`) |

---

### 16. Audit Log
- **Hook:** `src/features/audit-log/useAuditLog.ts`
- **Storage key:** `red_king.audit_log.v1`
- **Operations exposed:** list events (read-only from frontend)

| # | Method | Endpoint | Description |
|---|---|---|---|
| 45 | GET | `/api/audit-log` | List audit entries (supports `?type=`, `?q=`) |

---

### 17. Import / Export
- **Hook:** `src/features/import-export/useImportExport.ts`
- **Storage keys:** `red_king.import_export.modules.v1`, `red_king.import_export.backup_history.v1`, `red_king.import_export.import_preview.v1`, `red_king.import_export.validation_checks.v1`
- **Operations exposed:** export selected modules, import backup, validate, view history

| # | Method | Endpoint | Description |
|---|---|---|---|
| 46 | GET | `/api/export` | Export workspace data as JSON (`?modules=`) |
| 47 | POST | `/api/import` | Import backup JSON (with validation) |
| 48 | GET | `/api/backup-history` | List past backup records |

---

### 18. Settings / Data Management
- **Hook:** `src/features/settings/useLocalData.ts`
- **Storage keys:** Iterates all `red_king.*` keys
- **Operations exposed:** count entries, clear all data, import/export (delegates to feature 17)

> **Note:** `useLocalData` is a meta-hook that orchestrates the others. Once all
> features migrate to the API, this hook's "clear all" and "count" operations
> should call `DELETE /api/data/all` and `GET /api/data/summary` rather than
> iterating `localStorage` keys directly.

*(No new endpoint numbers — covered by existing endpoints + the two below)*

| # | Method | Endpoint | Description |
|---|---|---|---|
| — | GET | `/api/data/summary` | Count of all stored entries per domain |
| — | DELETE | `/api/data/all` | Wipe all user data (destructive, requires confirmation) |

---

## Phase 2 — Migration Order (recommended)

Migrate in dependency order to avoid broken cross-feature references:

1. **Foundation** — `apiClient.ts` + env vars + React Query setup
2. **Notes** — simplest shape, no cross-domain references
3. **Investigations** — referenced by many other features
4. **Cases** → **Evidence** → **IOC** (evidence and IOC reference cases)
5. **Correlation** (depends on cases, investigations, evidence, IOC, notes)
6. **Timeline** (append-only; other features write to it — migrate after them)
7. **Threat Intel** → **OSINT** → **Reports**
8. **Workspace** → **Files** → **Dashboard** → **Analytics** (read-heavy, migrate last)
9. **Global Search** (depends on all other domains being indexed server-side)
10. **Import / Export** → **Audit Log** → **Settings** (meta features — finalize last)

---

## Phase 3 — Cleanup

Once all features are migrated:

- Remove all 21 `localStorage.getItem/setItem` calls
- Remove all 21 `STORAGE_KEY` constants
- Remove all `data.mock.ts` seed files (or gate them behind a `VITE_USE_MOCK_DATA=true` flag)
- Remove `defaultState()` / `loadState()` / `saveState()` functions from every hook
- Delete `src/features/settings/useLocalData.ts` and replace with an API-backed equivalent

---

## localStorage Key Retirement Map

| Storage Key | Feature | Endpoint(s) |
|---|---|---|
| `red_king.notes.v1` | Notes | 1–4 |
| `red_king.investigations.v1` | Investigations | 5–8 |
| `red_king.cases.v1` | Cases | 9–12 |
| `red_king.ioc.v1` | IOC Manager | 13–16 |
| `red_king.evidence.v1` | Evidence Locker | 17–19 |
| `red_king.correlation.entities.v1` | Correlation | 20–23 |
| `red_king.correlation.relationships.v1` | Correlation | 24–26 |
| `red_king.threat_intel.v1` | Threat Intel | 27–28 |
| `red_king.osint.corpus.v1` | OSINT | 29 |
| `red_king.osint.history.v1` | OSINT | 30–31 |
| `red_king.reports.v1` | Reports | 32–34 |
| `red_king.timeline.v1` | Timeline | 35–36 |
| `red_king.workspace.v1` | Workspace | 37–39 |
| `red_king.files.v1` | Files | 40–41 |
| `red_king.analytics.v1` | Analytics | 42 |
| `red_king.dashboard.v1` | Dashboard | 43 |
| `red_king.search_index.v1` | Global Search | 44 |
| `red_king.audit_log.v1` | Audit Log | 45 |
| `red_king.import_export.modules.v1` | Import/Export | 46–48 |
| `red_king.import_export.backup_history.v1` | Import/Export | 48 |
| `red_king.import_export.import_preview.v1` | Import/Export | 47 |
| `red_king.import_export.validation_checks.v1` | Import/Export | 47 |
