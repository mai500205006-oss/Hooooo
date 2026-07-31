import { Card, Badge } from '@components/shared';
import { SEVERITY_TONE, CONFIDENCE_TONE } from '../types';
import type { ThreatEntry } from '../types';
import { ThreatActorPanel } from './ThreatActorPanel';
import { MalwareFamilyPanel } from './MalwareFamilyPanel';
import { RelatedIocs } from './RelatedIocs';

export function ThreatDetails({ entry }: { entry: ThreatEntry | null }) {
  if (!entry) {
    return (
      <Card className="text-center text-rk-muted text-sm py-12">
        Select a threat from the feed to view its details.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h2 className="text-base text-rk-text">{entry.title}</h2>
          <div className="flex gap-1.5 shrink-0">
            <Badge tone={SEVERITY_TONE[entry.severity]}>{entry.severity}</Badge>
            <Badge tone={CONFIDENCE_TONE[entry.confidence]}>{entry.confidence} confidence</Badge>
          </div>
        </div>
        <p className="text-sm text-rk-text">{entry.summary}</p>
        <p className="text-xs text-rk-muted mt-2">
          {entry.source} — Published {new Date(entry.publishedAt).toLocaleDateString()}
        </p>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <ThreatActorPanel actor={entry.actor} />
        <MalwareFamilyPanel malwareFamily={entry.malwareFamily} />
        <RelatedIocs iocs={entry.relatedIocs} />
      </div>
    </div>
  );
}
