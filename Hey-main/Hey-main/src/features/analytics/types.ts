export type DateRange = '7d' | '30d' | '90d' | 'all';

export interface KpiDatum {
  id: string;
  label: string;
  value: number;
  delta: number;
}

export interface SeverityDatum {
  label: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  value: number;
}

export interface StatusDatum {
  label: 'Open' | 'In Progress' | 'Closed';
  value: number;
}

export interface ActivityDatum {
  day: string;
  value: number;
}

export interface TagDatum {
  tag: string;
  count: number;
}

export interface ActivityItem {
  id: string;
  label: string;
  time: string;
}
