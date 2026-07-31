import { useState } from 'react';
import { Card, Badge } from '@components/shared';
import type { Packet } from '../types';

type DetailTab = 'summary' | 'layers' | 'hex' | 'ascii';
const TABS: { id: DetailTab; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'layers', label: 'Layers' },
  { id: 'hex', label: 'Hex' },
  { id: 'ascii', label: 'ASCII' },
];

export function PacketDetails({ packet }: { packet: Packet | null }) {
  const [tab, setTab] = useState<DetailTab>('summary');

  if (!packet) {
    return (
      <Card className="text-center text-rk-muted text-sm py-10">
        Select a packet from the list to see its details.
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-rk-text font-mono">Packet #{packet.no}</span>
        <Badge tone="muted">{packet.protocol}</Badge>
      </div>

      <div className="flex gap-1 mb-3 border-b border-rk-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-2 py-1.5 text-xs -mb-px border-b-2 ${
              tab === t.id ? 'border-rk-accent text-rk-accent' : 'border-transparent text-rk-muted hover:text-rk-text'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'summary' && (
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-rk-muted">Time</span>
            <span className="text-rk-text">{packet.timestamp}s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-rk-muted">Source</span>
            <span className="text-rk-text">
              {packet.sourceIp}
              {packet.sourcePort !== null ? `:${packet.sourcePort}` : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-rk-muted">Destination</span>
            <span className="text-rk-text">
              {packet.destIp}
              {packet.destPort !== null ? `:${packet.destPort}` : ''}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-rk-muted">Length</span>
            <span className="text-rk-text">{packet.length} bytes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-rk-muted">Info</span>
            <span className="text-rk-text text-end ps-4">{packet.info}</span>
          </div>
        </div>
      )}

      {tab === 'layers' && (
        <div className="space-y-3">
          {packet.layers.map((layer) => (
            <div key={layer.name}>
              <div className="text-xs text-rk-accent mb-1">{layer.name}</div>
              <ul className="text-xs text-rk-muted space-y-0.5 ps-3">
                {layer.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {tab === 'hex' && (
        <pre className="text-xs font-mono text-rk-text bg-rk-bg border border-rk-border rounded-md p-3 overflow-x-auto">
          {packet.hexDump.join('\n')}
        </pre>
      )}

      {tab === 'ascii' && (
        <pre className="text-xs font-mono text-rk-text bg-rk-bg border border-rk-border rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-all">
          {packet.asciiDump}
        </pre>
      )}
    </Card>
  );
}
