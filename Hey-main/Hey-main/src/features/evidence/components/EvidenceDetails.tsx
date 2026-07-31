import { Card, Badge } from '@components/shared';
import { TYPE_TONE, TYPE_LABEL } from '../types';
import type { Evidence } from '../types';
import { ChainOfCustody } from './ChainOfCustody';
import { AttachmentsList } from './AttachmentsList';

export function EvidenceDetails({ item }: { item: Evidence | null }) {
  if (!item) {
    return (
      <Card className="text-center text-rk-muted text-sm py-12">
        Select an item from the list to view its details.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h2 className="text-base text-rk-text">{item.title}</h2>
          <Badge tone={TYPE_TONE[item.type]}>{TYPE_LABEL[item.type]}</Badge>
        </div>
        <p className="text-sm text-rk-text">{item.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.map((tag) => (
            <Badge key={tag} tone="muted">
              #{tag}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-rk-muted mt-2">Collected {new Date(item.collectedAt).toLocaleString()}</p>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ChainOfCustody entries={item.custody} />
        <AttachmentsList attachments={item.attachments} />
      </div>
    </div>
  );
}
