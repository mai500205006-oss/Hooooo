import { Card, Badge } from '@components/shared';
import type { Packet, PacketProtocol } from '../types';

const PROTOCOL_TONE: Record<PacketProtocol, 'success' | 'warning' | 'danger' | 'muted'> = {
  TCP: 'muted',
  UDP: 'muted',
  TLS: 'success',
  HTTP: 'warning',
  DNS: 'muted',
  SSDP: 'muted',
  ICMP: 'danger',
  ARP: 'warning',
};

export function PacketList({
  packets,
  activeId,
  onSelect,
}: {
  packets: Packet[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  if (packets.length === 0) {
    return <Card className="text-center text-rk-muted text-sm py-8">No packets match the current filters.</Card>;
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="grid grid-cols-[3rem_5rem_1fr_1fr_4rem_3rem_1fr] gap-2 px-3 py-1.5 text-xs text-rk-muted border-b border-rk-border">
        <span>No.</span>
        <span>Time</span>
        <span>Source</span>
        <span>Destination</span>
        <span>Proto</span>
        <span>Len</span>
        <span>Info</span>
      </div>
      <div className="max-h-[420px] overflow-y-auto">
        {packets.map((pkt) => (
          <div
            key={pkt.id}
            onClick={() => onSelect(pkt.id)}
            className={`grid grid-cols-[3rem_5rem_1fr_1fr_4rem_3rem_1fr] gap-2 px-3 py-1.5 text-xs cursor-pointer border-b border-rk-border last:border-0 ${
              activeId === pkt.id ? 'bg-rk-surfaceHover' : 'hover:bg-rk-surfaceHover'
            }`}
          >
            <span className="text-rk-muted">{pkt.no}</span>
            <span className="text-rk-muted">{pkt.timestamp}</span>
            <span className="text-rk-text truncate">
              {pkt.sourceIp}
              {pkt.sourcePort !== null ? `:${pkt.sourcePort}` : ''}
            </span>
            <span className="text-rk-text truncate">
              {pkt.destIp}
              {pkt.destPort !== null ? `:${pkt.destPort}` : ''}
            </span>
            <span>
              <Badge tone={PROTOCOL_TONE[pkt.protocol]}>{pkt.protocol}</Badge>
            </span>
            <span className="text-rk-muted">{pkt.length}</span>
            <span className="text-rk-text truncate">{pkt.info}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
