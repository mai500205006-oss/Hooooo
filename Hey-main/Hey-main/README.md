# RED KING

مساحة عمل شخصية (Personal Intelligence Workspace) — منصة تحليل واستخبارات ومساعد ذكاء اصطناعي للاستخدام الشخصي.

> **ملاحظة مهمة**: المشروع ده مش SaaS ومش منتج للبيع. هو أداة شخصية بجودة احترافية، بتتطور تدريجيًا حسب الحاجة الفعلية، مش حسب متطلبات منتج تجاري.

## Stack التقني

- **React 18** + **TypeScript**
- **Vite** — Build tool
- **Zustand** — State management
- **Tailwind CSS** — Styling + Design Tokens

## هيكل المشروع

```
RED_KING/
├── src/
│   ├── components/
│   │   ├── layout/       ← Sidebar, Header, Workspace (Sprint 1) + index.ts (barrel)
│   │   └── shared/       ← مكونات عامة (ErrorBoundary, Button, Card...) + index.ts (barrel)
│   ├── features/         ← كل ميزة في مجلدها الخاص (dashboard, files, investigations, workspace)
│   ├── store/            ← Zustand stores (UI / Domain / Context state منفصلين) + index.ts (barrel)
│   ├── constants/        ← ثوابت مشتركة (APP_ROUTES — مصدر واحد للمسارات)
│   ├── config/            ← بيانات التطبيق + قراءة موحّدة للـ env variables
│   ├── types/            ← أنواع مشتركة عبر المشروع
│   ├── services/         ← الاتصال بأي API خارجي مستقبلًا
│   ├── utils/             ← دوال مساعدة عامة (logger.ts...)
│   ├── hooks/             ← React hooks مخصصة
│   ├── plugins-core/      ← نظام تسجيل الـ Plugins + index.ts (barrel)
│   └── styles/            ← index.css + Tailwind
├── public/
├── docs/
├── plugins/               ← مكان جاهز للإضافات المستقبلية (اختياري)
└── assets/
```

## Path Aliases

`@`, `@components`, `@features`, `@store`, `@types`, `@services`, `@utils`, `@hooks`,
`@config`, `@plugins-core`, `@constants` — معرّفين في `vite.config.ts` و`tsconfig.json` بنفس القيم بالظبط.

## التشغيل محليًا

```bash
npm install
npm run dev
```

المشروع هيفتح على `http://localhost:5173`

## حالة المشروع

راجع [`ROADMAP.md`](./ROADMAP.md) لمعرفة إيه اللي اتبنى وإيه الجاي.

**الحالة الحالية: Sprint 11 — Settings ✓**
