import type { EntityType } from '../types';

const TYPES: EntityType[] = [
  'Case',
  'Investigation',
  'Evidence',
  'Note',
  'Timeline Event',
  'IOC',
  'Threat Intel',
  'PCAP',
  'OSINT',
];

export function EntityTypeFilter({
  active,
  onChange,
}: {
  active: EntityType | 'all';
  onChange: (t: EntityType | 'all') => void;
}) {
  return (
    <select
      value={active}
      onChange={(e) => onChange(e.target.value as EntityType | 'all')}
      className="bg-rk-bg border border-rk-border rounded-md px-2 py-1.5 text-sm text-rk-text w-full"
    >
      <option value="all">All types</option>
      {TYPES.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
