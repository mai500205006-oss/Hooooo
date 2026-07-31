import { ByteCursor, formatIPv4 } from './bytes';

export interface Ipv4Packet {
  sourceIp: string;
  destIp: string;
  protocol: number;
  totalLength: number;
  ttl: number;
  payload: Uint8Array;
  details: string[];
}

/** أرقام بروتوكولات IP القياسية (IANA) اللي محتاجينها هنا */
export const IP_PROTOCOL_NAMES: Record<number, string> = {
  1: 'ICMP',
  6: 'TCP',
  17: 'UDP',
  58: 'ICMPv6',
};

const MIN_IPV4_HEADER_BYTES = 20;

export function parseIPv4(bytes: Uint8Array): Ipv4Packet | null {
  if (bytes.length < MIN_IPV4_HEADER_BYTES) return null;

  const versionAndIhl = bytes[0];
  const version = versionAndIhl >> 4;
  if (version !== 4) return null;

  const headerLength = (versionAndIhl & 0x0f) * 4;
  if (headerLength < MIN_IPV4_HEADER_BYTES || bytes.length < headerLength) return null;

  const cursor = new ByteCursor(bytes);
  cursor.skip(2); // Version/IHL + DSCP/ECN
  const totalLength = cursor.u16();
  cursor.skip(4); // Identification + Flags/Fragment Offset
  const ttl = cursor.u8();
  const protocol = cursor.u8();
  cursor.skip(2); // Header Checksum
  const sourceIp = formatIPv4(cursor.slice(4));
  const destIp = formatIPv4(cursor.slice(4));

  return {
    sourceIp,
    destIp,
    protocol,
    totalLength,
    ttl,
    payload: bytes.subarray(headerLength), // بعد أي IP Options
    details: [
      `Version: 4, Header Length: ${headerLength} bytes`,
      `Total Length: ${totalLength}`,
      `TTL: ${ttl}`,
      `Protocol: ${IP_PROTOCOL_NAMES[protocol] ?? protocol} (${protocol})`,
      `Source: ${sourceIp}`,
      `Destination: ${destIp}`,
    ],
  };
}
