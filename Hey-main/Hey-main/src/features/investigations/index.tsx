import { useMemo, useState } from 'react';
import { InvestigationList } from './components/InvestigationList';
import { InvestigationDetails } from './components/InvestigationDetails';
import { SearchFilterBar } from './components/SearchFilterBar';
import { PageHeader } from '@components/shared/PageHeader';
import type { InvestigationStatus } from './types';
import { useDomainStore } from '@store/domainStore';
import { registerPlugin } from '@plugins-core';
import { useInvestigations } from './useInvestigations';

registerPlugin({ id: 'investigations', name: 'Investigations', version: '0.1.0', slot: 'main' });

export function InvestigationsPage() {
  const { investigations, timeline: allTimeline, evidence: allEvidence } = useInvestigations();

  // UI state — محلي على الصفحة، مش مشترك عبر التطبيق
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<InvestigationStatus | 'all'>('all');

  // Domain state — مين التحقيق النشط، ده جزء من الـ domain store العام
  const activeInvestigationId = useDomainStore((s) => s.activeInvestigationId);
  const setActiveInvestigation = useDomainStore((s) => s.setActiveInvestigation);

  const filtered = useMemo(() => {
    return investigations.filter((inv) => {
      const matchesQuery = inv.title.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'all' || inv.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [investigations, query, status]);

  const activeInvestigation =
    investigations.find((i) => i.id === activeInvestigationId) ?? null;
  const timeline = allTimeline.filter((t) => t.investigationId === activeInvestigationId);
  const evidence = allEvidence.filter((e) => e.investigationId === activeInvestigationId);

  return (
    <div>
      <PageHeader title="Investigations" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <SearchFilterBar
            query={query}
            onQueryChange={setQuery}
            status={status}
            onStatusChange={setStatus}
          />
          <InvestigationList
            items={filtered}
            activeId={activeInvestigationId}
            onSelect={setActiveInvestigation}
          />
        </div>
        <div className="md:col-span-2">
          <InvestigationDetails
            investigation={activeInvestigation}
            timeline={timeline}
            evidence={evidence}
          />
        </div>
      </div>
    </div>
  );
}
