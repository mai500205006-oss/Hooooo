import { Input } from '@components/shared';
import { EVIDENCE_TYPES, TYPE_LABEL } from '../types';
import type { EvidenceType } from '../types';

export function EvidenceToolbar({
  query,
  onQueryChange,
  type,
  onTypeChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  type: EvidenceType | 'all';
  onTypeChange: (v: EvidenceType | 'all') => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-3">
      <Input
        placeholder="Search evidence or tags..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1"
      />
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value as EvidenceType | 'all')}
        className="bg-rk-bg border border-rk-border rounded-md px-2 text-sm text-rk-text"
      >
        <option value="all">All Types</option>
        {EVIDENCE_TYPES.map((t) => (
          <option key={t} value={t}>
            {TYPE_LABEL[t]}
          </option>
        ))}
      </select>
    </div>
  );
}
