export type EntityType =
  | 'Case'
  | 'Investigation'
  | 'Evidence'
  | 'Note'
  | 'Timeline Event'
  | 'IOC'
  | 'Threat Intel'
  | 'PCAP'
  | 'OSINT';

export interface Entity {
  id: string;
  type: EntityType;
  title: string;
  summary: string;
}

export type RelationshipType =
  | 'related_to'
  | 'linked_evidence'
  | 'referenced_in'
  | 'associated_with'
  | 'part_of'
  | 'mentions';

export interface Relationship {
  id: string;
  fromId: string;
  toId: string;
  type: RelationshipType;
  note: string;
}
