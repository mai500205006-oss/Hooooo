import { Card, Badge } from '@components/shared';
import { STATUS_TONE, STATUS_LABEL } from '../types';
import type { Case } from '../types';
import { RelatedEvidence } from './RelatedEvidence';
import { RelatedNotes } from './RelatedNotes';
import { RelatedTimelineEvents } from './RelatedTimelineEvents';

export function CaseDetails({ caseItem }: { caseItem: Case | null }) {
  if (!caseItem) {
    return (
      <Card className="text-center text-rk-muted text-sm py-12">
        Select a case from the list to view its details.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h2 className="text-base text-rk-text">{caseItem.title}</h2>
          <Badge tone={STATUS_TONE[caseItem.status]}>{STATUS_LABEL[caseItem.status]}</Badge>
        </div>
        <p className="text-sm text-rk-text">{caseItem.summary}</p>
        <p className="text-xs text-rk-muted mt-2">
          Created {new Date(caseItem.createdAt).toLocaleDateString()} — Updated{' '}
          {new Date(caseItem.updatedAt).toLocaleDateString()}
        </p>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <RelatedEvidence evidence={caseItem.evidence} />
        <RelatedNotes notes={caseItem.notes} />
        <RelatedTimelineEvents events={caseItem.timelineEvents} />
      </div>
    </div>
  );
}
