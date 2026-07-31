import { Badge } from '@components/shared';
import type { RelationshipType } from '../types';

const TONE: Record<RelationshipType, 'success' | 'warning' | 'danger' | 'muted'> = {
  related_to: 'muted',
  linked_evidence: 'success',
  referenced_in: 'warning',
  associated_with: 'warning',
  part_of: 'success',
  mentions: 'muted',
};

export function RelationshipBadge({ type }: { type: RelationshipType }) {
  return <Badge tone={TONE[type]}>{type.replace('_', ' ')}</Badge>;
}
