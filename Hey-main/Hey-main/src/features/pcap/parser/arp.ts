import { ByteCursor, formatMac, formatIPv4 } from './bytes';

export interface ArpPacket {
  operation: 'request' | 'reply' | number;
  senderMac: string;
  senderIp: string;
  targetMac: string;
  targetIp: string;
  details: string[];
}

const ARP_MIN_BYTES = 28; // Ethernet (6+6) + IPv4 (4+4) addresses

export function parseArp(bytes: Uint8Array): ArpPacket | null {
  if (bytes.length < ARP_MIN_BYTES) return null;

  const cursor = new ByteCursor(bytes);
  const hardwareType = cursor.u16();
  const protocolType = cursor.u16();
  const hardwareLen = cursor.u8();
  const protocolLen = cursor.u8();
  const opcode = cursor.u16();

  // بندعم بس Ethernet/IPv4 — الحالة الأكتر انتشارًا بكتير جدًا
  if (hardwareLen !== 6 || protocolLen !== 4) return null;

  const senderMac = formatMac(cursor.slice(6));
  const senderIp = formatIPv4(cursor.slice(4));
  const targetMac = formatMac(cursor.slice(6));
  const targetIp = formatIPv4(cursor.slice(4));

  const operation = opcode === 1 ? 'request' : opcode === 2 ? 'reply' : opcode;

  return {
    operation,
    senderMac,
    senderIp,
    targetMac,
    targetIp,
    details: [
      `Hardware type: ${hardwareType === 1 ? 'Ethernet' : hardwareType}`,
      `Protocol type: ${protocolType === 0x0800 ? 'IPv4' : `0x${protocolType.toString(16)}`}`,
      `Opcode: ${operation}`,
      `Sender MAC: ${senderMac}`,
      `Sender IP: ${senderIp}`,
      `Target MAC: ${targetMac}`,
      `Target IP: ${targetIp}`,
    ],
  };
}
