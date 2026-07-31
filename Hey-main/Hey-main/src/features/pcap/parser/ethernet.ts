import { ByteCursor, formatMac } from './bytes';

export interface EthernetFrame {
  destMac: string;
  srcMac: string;
  etherType: number;
  payload: Uint8Array;
  details: string[];
}

const ETHER_TYPE_NAMES: Record<number, string> = {
  0x0800: 'IPv4',
  0x86dd: 'IPv6',
  0x0806: 'ARP',
};

const MIN_ETHERNET_HEADER_BYTES = 14;

export function parseEthernet(bytes: Uint8Array): EthernetFrame | null {
  if (bytes.length < MIN_ETHERNET_HEADER_BYTES) return null;

  const cursor = new ByteCursor(bytes);
  const destMac = formatMac(cursor.slice(6));
  const srcMac = formatMac(cursor.slice(6));
  let etherType = cursor.u16();

  const vlanDetails: string[] = [];
  // 802.1Q VLAN tag اختياري — لو موجود بنتخطاه ونقرأ الـ EtherType الحقيقي اللي بعده
  if (etherType === 0x8100 && cursor.remaining() >= 4) {
    const tag = cursor.u16();
    vlanDetails.push(`VLAN ID: ${tag & 0x0fff}`);
    etherType = cursor.u16();
  }

  const typeLabel = ETHER_TYPE_NAMES[etherType] ?? `Unknown (0x${etherType.toString(16).padStart(4, '0')})`;

  return {
    destMac,
    srcMac,
    etherType,
    payload: cursor.slice(cursor.remaining()),
    details: [`Destination: ${destMac}`, `Source: ${srcMac}`, ...vlanDetails, `Type: ${typeLabel}`],
  };
}
