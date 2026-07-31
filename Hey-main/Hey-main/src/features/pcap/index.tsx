import { useMemo, useState } from 'react';
import { PageHeader, LoadingSpinner, ErrorBoundary } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { usePcapCapture } from './usePcapCapture';
import { UploadPanel } from './components/UploadPanel';
import { SampleCapturesPanel } from './components/SampleCapturesPanel';
import { FileInfoPanel } from './components/FileInfoPanel';
import { PacketSearchBar } from './components/PacketSearchBar';
import { PacketFilterPanel } from './components/PacketFilterPanel';
import { PacketList } from './components/PacketList';
import { PacketDetails } from './components/PacketDetails';
import { DEFAULT_FILTERS, type PacketFilters } from './types';

registerPlugin({ id: 'pcap', name: 'PCAP Viewer', version: '0.1.0', slot: 'main' });

export function PcapPage() {
  const { status, fileInfo, packets, errorMessage, loadFile, loadSample } = usePcapCapture();

  // UI state — محلي على الصفحة، مش مشترك عبر التطبيق (زي openIds/activeId في Files)
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<PacketFilters>(DEFAULT_FILTERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return packets.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        p.sourceIp.includes(q) ||
        p.destIp.includes(q) ||
        p.protocol.toLowerCase().includes(q) ||
        p.info.toLowerCase().includes(q);

      const matchesProtocol = filters.protocol === 'all' || p.protocol === filters.protocol;
      const matchesSource = filters.sourceIp.trim() === '' || p.sourceIp.includes(filters.sourceIp.trim());
      const matchesDest = filters.destIp.trim() === '' || p.destIp.includes(filters.destIp.trim());
      const matchesPort =
        filters.port.trim() === '' ||
        String(p.sourcePort) === filters.port.trim() ||
        String(p.destPort) === filters.port.trim();

      return matchesQuery && matchesProtocol && matchesSource && matchesDest && matchesPort;
    });
  }, [packets, query, filters]);

  const activePacket = filtered.find((p) => p.id === activeId) ?? null;

  return (
    <div>
      <PageHeader
        title="PCAP Viewer"
        subtitle="Upload a .pcap capture and inspect real packets — Ethernet / IPv4 / IPv6 / TCP / UDP / ICMP / ARP"
      />

      {status === 'empty' && (
        <div className="space-y-4">
          <UploadPanel onSelect={loadFile} />
          <SampleCapturesPanel onSelect={loadSample} />
        </div>
      )}

      {status === 'loading' && <LoadingSpinner label="Parsing capture..." />}

      {status === 'error' && (
        <p className="text-rk-muted text-sm">{errorMessage ?? 'حصل خطأ أثناء تحليل الملف. جرّب ملف تاني.'}</p>
      )}

      {status === 'loaded' && fileInfo && (
        <ErrorBoundary featureName="pcap">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1 space-y-4">
              <FileInfoPanel info={fileInfo} />
              <PacketFilterPanel filters={filters} onChange={setFilters} />
            </div>

            <div className="lg:col-span-3 space-y-3">
              <PacketSearchBar query={query} onQueryChange={setQuery} />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                <PacketList packets={filtered} activeId={activeId} onSelect={setActiveId} />
                <PacketDetails packet={activePacket} />
              </div>
            </div>
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
}
