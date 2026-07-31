export type PacketProtocol = 'TCP' | 'UDP' | 'TLS' | 'HTTP' | 'DNS' | 'SSDP' | 'ICMP' | 'ARP';

export interface Packet {
  id: string;
  no: number;
  /** ثواني من بداية الالتقاط */
  timestamp: number;
  sourceIp: string;
  destIp: string;
  sourcePort: number | null;
  destPort: number | null;
  protocol: PacketProtocol;
  length: number;
  info: string;
  /** تفاصيل الطبقات لعرضها في Packet Details — Mock بالكامل */
  layers: { name: string; details: string[] }[];
  /** Mock hex/ASCII dump — للعرض بس، مش استخراج حقيقي من بايتات */
  hexDump: string[];
  asciiDump: string;
}

export interface CaptureFileInfo {
  fileName: string;
  fileSize: number;
  packetCount: number;
  durationSeconds: number;
  linkType: string;
}

export interface PacketFilters {
  protocol: PacketProtocol | 'all';
  sourceIp: string;
  destIp: string;
  port: string;
}

export const DEFAULT_FILTERS: PacketFilters = {
  protocol: 'all',
  sourceIp: '',
  destIp: '',
  port: '',
};

export interface SampleCapture {
  id: string;
  label: string;
  protocol: PacketProtocol;
  description: string;
}

export const SAMPLE_CAPTURES: SampleCapture[] = [
  { id: 'sample-http', label: 'HTTP', protocol: 'HTTP', description: 'Plain-text web traffic' },
  { id: 'sample-dns', label: 'DNS', protocol: 'DNS', description: 'Name resolution queries' },
  { id: 'sample-tls', label: 'TLS', protocol: 'TLS', description: 'Encrypted handshake' },
  { id: 'sample-icmp', label: 'ICMP', protocol: 'ICMP', description: 'Ping requests/replies' },
  { id: 'sample-arp', label: 'ARP', protocol: 'ARP', description: 'Address resolution' },
];
