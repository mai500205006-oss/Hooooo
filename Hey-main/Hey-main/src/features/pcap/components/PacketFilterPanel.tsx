import { Panel, Input } from '@components/shared';
import type { PacketFilters, PacketProtocol } from '../types';

const PROTOCOLS: (PacketProtocol | 'all')[] = ['all', 'TCP', 'UDP', 'TLS', 'HTTP', 'DNS', 'SSDP', 'ICMP', 'ARP'];

export function PacketFilterPanel({
  filters,
  onChange,
}: {
  filters: PacketFilters;
  onChange: (filters: PacketFilters) => void;
}) {
  return (
    <Panel title="Filters">
      <div className="space-y-3">
        <div>
          <div className="text-xs text-rk-muted mb-1">Protocol</div>
          <select
            value={filters.protocol}
            onChange={(e) => onChange({ ...filters, protocol: e.target.value as PacketProtocol | 'all' })}
            className="w-full bg-rk-bg border border-rk-border rounded-md px-2 py-1.5 text-sm text-rk-text"
          >
            {PROTOCOLS.map((p) => (
              <option key={p} value={p}>
                {p === 'all' ? 'All' : p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-xs text-rk-muted mb-1">Source IP</div>
          <Input
            value={filters.sourceIp}
            onChange={(e) => onChange({ ...filters, sourceIp: e.target.value })}
            placeholder="e.g. 192.168.1.46"
          />
        </div>

        <div>
          <div className="text-xs text-rk-muted mb-1">Destination IP</div>
          <Input
            value={filters.destIp}
            onChange={(e) => onChange({ ...filters, destIp: e.target.value })}
            placeholder="e.g. 8.8.8.8"
          />
        </div>

        <div>
          <div className="text-xs text-rk-muted mb-1">Port</div>
          <Input
            value={filters.port}
            onChange={(e) => onChange({ ...filters, port: e.target.value })}
            placeholder="e.g. 443"
          />
        </div>
      </div>
    </Panel>
  );
}
