export type ReportCategory = 'Security' | 'Network' | 'Investigation' | 'System' | 'Compliance';

export interface Report {
  id: string;
  title: string;
  category: ReportCategory;
  summary: string;
  /** محتوى التقرير الكامل — نص عادي/Markdown بسيط */
  body: string;
  createdAt: string;
}

export type ReportSortMode = 'newest' | 'oldest' | 'az';

export interface ReportFiltersState {
  category: ReportCategory | 'all';
}

export const DEFAULT_REPORT_FILTERS: ReportFiltersState = {
  category: 'all',
};

export const REPORT_CATEGORIES: ReportCategory[] = [
  'Security',
  'Network',
  'Investigation',
  'System',
  'Compliance',
];
