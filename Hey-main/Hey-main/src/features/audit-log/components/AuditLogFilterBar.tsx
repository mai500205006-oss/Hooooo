import { Input } from '@components/shared';
import { AUDIT_ACTION_TYPES } from '../types';
import type { AuditActionType } from '../types';

export function AuditLogFilterBar({
  query,
  onQueryChange,
  type,
  onTypeChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  type: AuditActionType | 'all';
  onTypeChange: (v: AuditActionType | 'all') => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-3">
      <Input
        placeholder="Search audit log..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1"
      />
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value as AuditActionType | 'all')}
        className="bg-rk-bg border border-rk-border rounded-md px-2 text-sm text-rk-text"
      >
        <option value="all">All Actions</option>
        {AUDIT_ACTION_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
