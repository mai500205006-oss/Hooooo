# ROADMAP — RED KING

خطة مبسّطة لمشروع شخصي (مش منتج للبيع). كل Sprint بينبني فوق اللي قبله، وبيتراجع قبل ما نكمل.

| Sprint | الاسم | الحالة |
|---|---|---|
| 0 | Foundation (هيكل المشروع + الإعدادات) | ✅ تم |
| 0.5 | Design System (Tokens, Colors, Typography, مكونات أساسية) | ✅ تم |
| 1 | Application Shell (Sidebar, Header, Workspace, Status Bar) | ✅ تم |
| 2 | Core Framework (Store, Routing, Theme, Command Palette) | ✅ تم |
| 3 | Context Engine (Workspace state, Active session) | ✅ تم |
| 4 | Dashboard | ✅ تم |
| 5 | Investigations | ✅ تم |
| 6 | Developer Workspace | ✅ تم |
| 7 | Files | ✅ تم |
| 8 | Plugins Core (نظام تسجيل الإضافات) | ✅ تم |
| 9 | Architecture Hardening (Barrels, Constants, Config, Logger) | ✅ تم |
| 10 | Knowledge Hub (Notes) | ✅ تم |
| 11 | Settings (Appearance, Data Management, About) | ✅ تم |
| 12–19 | PCAP, Reports, OSINT, Timeline, Cases, Evidence, IOC, Threat Intel | ✅ تم |
| 20 | Global Search (فهرسة وبحث عبر كل الـ features) | ✅ تم |
| 21+ | باقي الميزات حسب الحاجة الفعلية | ⏳ |

## قواعد بسيطة بنلتزم بيها (بدون بيروقراطية)

- كل Sprint خطوة واحدة واضحة، مفيش قفز لمرحلة قبل ما اللي قبلها يشتغل.
- الكود بيتراجع بعد كل Sprint قبل ما نكمل.
- الألوان والمسافات والخطوط كلها من مصدر واحد (`tailwind.config.js` + `src/types` للعقود المشتركة) — مفيش قيم متفرقة جوه المكونات.
- الـ UI state (فاتح/مقفول، تبويب مختار) منفصل عن الـ Domain state (بيانات حقيقية) من أول Sprint فيه Store.
- كل Feature رئيسية متغلفة بـ `ErrorBoundary` — لو جزء وقع، الباقي يفضل شغال.
- مفيش Backend ولا `.env` حقيقي لحد ما نوصل لمرحلة نحتاجه فيها فعليًا.

## اللي اتبنى في Sprint 0

- هيكل المجلدات الكامل (`src/{components,features,store,types,services,utils,hooks,styles}`)
- Vite + React + TypeScript + Tailwind + Zustand (dependencies جاهزة في `package.json`)
- Path aliases (`@components`, `@features`, `@store`...) في `vite.config.ts` و`tsconfig.json`
- `ErrorBoundary` أساسي جاهز للاستخدام في أي feature جديدة
- Design tokens مبدئية (ألوان `rk.*`) في `tailwind.config.js` — هتتوسع في Sprint 0.5
- ESLint + Prettier
- `App.tsx` بشاشة تأكيد بسيطة (لسه مفيش Layout حقيقي)

## اللي اتبنى في Sprint 9 — Architecture Hardening

مفيش ميزة جديدة في الـ Sprint ده — الهدف كان تصليب المعمار الحالي بعد ما اتبنت 4 features (dashboard, investigations, workspace, files) وplugins-core:

- **Barrel exports**: `index.ts` لكل من `components/shared`, `components/layout`, `store`, `plugins-core` — استيراد أنضف من نقطة واحدة بدل مسارات عميقة متفرقة.
- **`src/constants/routes.ts`**: مصدر واحد لمسارات التطبيق (`APP_ROUTES`) — كان معرّف 3 مرات متفرقة (Sidebar, CommandPalette, App.tsx)، دلوقتي الاتنين التانيين بيستوردوه.
- **`src/config/index.ts`**: بيانات التطبيق (الاسم/النسخة) + `getEnvVar` لقراءة آمنة لأي `VITE_*` مستقبلي بدل الوصول المباشر لـ `import.meta.env` من كذا مكان.
- **`src/utils/logger.ts`**: logger خفيف موحّد (`debug/info/warn/error`) بديل استخدام `console.*` المباشر (كان في `ErrorBoundary` و`plugins-core/registry`).
- **`src/vite-env.d.ts`**: كان ناقص — بدونه `import.meta.env` مش متعرّف بشكل صحيح في TypeScript.
- تصليح استيرادات بـ double quotes كانت مخالفة لإعداد Prettier (`singleQuote: true`).
- إضافة path aliases مفقودة (`@config`, `@plugins-core`, `@constants`) للاتساق مع باقي الـ aliases.
- مراجعة كل الـ features للتأكد إن كل واحدة معزولة (مفيش استيراد مباشر بين features، كل تواصل عن طريق `store` المشترك).
- تحديث `README.md` و`ROADMAP.md` ليعكسوا الحالة الفعلية للمشروع.

**ملحوظة**: البيئة اللي اتعمل فيها الـ Sprint ده معندهاش اتصال إنترنت، فـ `npm install` و`tsc` الفعليين متعملوش. المراجعة اتعملت يدويًا (type-by-type) بدل التشغيل الفعلي — يُفضّل تشغيل `npm install && npm run build` محليًا للتأكيد قبل الاعتماد على الكود ده.

## اللي اتبنى في Sprint 10 — Knowledge Hub (Notes)

Feature كاملة جوه `src/features/notes/` بنفس نمط الـ features التانية بالظبط، من غير أي تعديل في المعمار:

- CRUD كامل (إنشاء / تعديل / حذف) + Pin / Favorite / Tags / Folders
- Auto-save بـ debounce (600ms) مع مؤشر "Saving… / Saved"
- بحث + ترتيب (Newest / Oldest / A-Z) + فلترة بالمجلد/الوسم/المفضّلة
- محرر Markdown مع Live Preview (converter بسيط محلي، من غير أي مكتبة خارجية جديدة)
- Empty state + Loading state
- تخزين في Local Storage بس (`red_king.notes.v1`) — مفيش Backend
- `activeNoteId` اتضاف لـ `domainStore` بنفس نمط `activeInvestigationId`
- Route `/notes` اتضاف لمصدر واحد (`@constants/routes`) — الـ Sidebar والـ CommandPalette اتزامنوا تلقائيًا من غير أي تعديل يدوي فيهم (ثمرة Sprint 9)
- إضافة وحيدة على الـ Design System: `Textarea` (بنفس نمط `Input` تمامًا) — لأن محرر الـ Markdown محتاج textarea وملهاش مكوّن مشترك جاهز

## اللي اتبنى في Sprint 11 — Settings

Feature كاملة جوه `src/features/settings/` بنفس نمط الـ features التانية، من غير أي تعديل في المعمار ومن غير أي Dependency جديد:

- **Appearance**: Theme (Dark/Light) و Sidebar (Expanded/Collapsed) — بيستخدموا نفس الـ actions الموجودة أصلاً في `uiStore`، مفيش state جديد.
- **`uiStore` بقى بيحفظ نفسه**: استخدمنا `persist` middleware من `zustand/middleware` (موجودة أصلاً جوه مكتبة `zustand` — مفيش Dependency جديد) عشان `theme` و `sidebarOpen` يفضلوا زي ما همّ بعد أي refresh؛ `commandPaletteOpen` اتسيبت عمدًا من غير حفظ لأنها UI state مؤقتة.
- **Data Management**: Export (تنزيل كل مفاتيح `red_king.*` من الـ Local Storage كملف JSON واحد) / Import (استرجاع نفس الملف) / Clear All (مسح كامل، وراه Confirm خطوتين جوه الزرار نفسه من غير Dialog من المتصفح) — الكل عن طريق hook عام `useLocalData` مش مربوط بـ feature معينة، عشان يفضل شغال صح مع أي feature تاني يضيف بياناته في Local Storage مستقبلًا.
- **About**: اسم التطبيق والنسخة والـ environment، كله من `@config` — مفيش قيم متكررة.
- Route `/settings` بقت Feature حقيقية بدل `ComingSoon` — نفس مبدأ Sprint 10 مع `/notes`.
- مفيش Backend ولا API ولا AI في الـ Sprint ده، حسب فلسفة المشروع الحالية.

## اللي اتبنى في Sprint 20 — Global Search

Feature جديدة جوه `src/features/search/` بنفس نمط باقي الـ features:

- فهرس بحث ثابت (mock) بيغطي كل الأقسام: Investigations, Notes, Cases, Evidence, IOC, Threat Intel, OSINT, Reports, Timeline, Files, PCAP.
- الفهرس **مستقل تمامًا** ومفيش أي import داخلي من أي feature تانية — بيحافظ على قاعدة العزل بين الـ features من Sprint 9.
- بحث نصي + فلترة بالتصنيف، والنقر على نتيجة بينقّل لصفحة الـ feature المرتبطة.
- Route `/search` اتضاف لمصدر واحد (`@constants/routes`) — الـ Sidebar والـ CommandPalette اتزامنوا تلقائيًا من غير أي تعديل يدوي فيهم.
- مفيش Backend ولا فهرسة حقيقية للمحتوى — لسه مرحلة UI/UX، ممكن يتوصل ببيانات حقيقية لاحقًا لو احتجنا.
