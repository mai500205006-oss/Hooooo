import { Card, Badge } from '@components/shared';
import { Timeline } from './Timeline';
import { EvidencePanel } from './EvidencePanel';
import type { Investigation, TimelineEvent, Evidence } from '../types';

export function InvestigationDetails({
  investigation,
  timeline,
  evidence,
}: {
  investigation: Investigation | null;
  timeline: TimelineEvent[];
  evidence: Evidence[];
}) {
  if (!investigation) {
    return (
      <Card>
        <p className="text-rk-muted text-sm">اختر تحقيق من القائمة لعرض التفاصيل.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex justify-between items-center">
          <h2 className="text-rk-text text-base">{investigation.title}</h2>
          <Badge>{investigation.status}</Badge>
        </div>
        <p className="text-xs text-rk-muted mt-1">Updated {investigation.updatedAt}</p>
      </Card>
      <Timeline events={timeline} />
      <EvidencePanel items={evidence} />
    </div>
  );
}
