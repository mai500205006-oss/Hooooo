import { ByteCursor, formatIPv6 } from './bytes';
import { IP_PROTOCOL_NAMES } from './ipv4';

export interface Ipv6Packet {
  sourceIp: string;
  destIp: string;
  nextHeader: number;
  payloadLength: number;
  payload: Uint8Array;
  details: string[];
}

const IPV6_HEADER_BYTES = 40; // ثابت — مفيش IHL في IPv6

export function parseIPv6(bytes: Uint8Array): Ipv6Packet | null {
  if (bytes.length < IPV6_HEADER_BYTES) return null;

  const version = bytes[0] >> 4;
  if (version !== 6) return null;

  const cursor = new ByteCursor(bytes);
  cursor.skip(4); // Version + Traffic Class + Flow Label
  const payloadLength = cursor.u16();
  const nextHeader = cursor.u8();
  const hopLimit = cursor.u8();
  const sourceIp = formatIPv6(cursor.slice(16));
  const destIp = formatIPv6(cursor.slice(16));

  return {
    sourceIp,
    destIp,
    nextHeader,
    payloadLength,
    payload: bytes.subarray(IPV6_HEADER_BYTES),
    details: [
      'Version: 6',
      `Payload Length: ${payloadLength}`,
      `Hop Limit: ${hopLimit}`,
      `Next Header: ${IP_PROTOCOL_NAMES[nextHeader] ?? nextHeader} (${nextHeader})`,
      `Source: ${sourceIp}`,
      `Destination: ${destIp}`,
    ],
  };
}
