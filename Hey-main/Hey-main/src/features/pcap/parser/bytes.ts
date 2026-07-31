/**
 * أدوات قراءة بايتات منخفضة المستوى — بتتقرأ بترتيب Network Byte Order (Big-Endian)
 * زي أي بروتوكول شبكة حقيقي (Ethernet/IP/TCP/UDP/ICMP/ARP كلهم Big-Endian).
 * ملف الـ .pcap نفسه (الـ Global Header) بيتعامل بترتيب بايتات مختلف — ده متعالج
 * لوحده في pcapFile.ts، مش هنا.
 */

export class ByteCursor {
  private readonly base: Uint8Array;
  private readonly view: DataView;
  offset: number;

  constructor(bytes: Uint8Array, offset = 0) {
    this.base = bytes;
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    this.offset = offset;
  }

  remaining(): number {
    return this.base.length - this.offset;
  }

  u8(): number {
    const v = this.view.getUint8(this.offset);
    this.offset += 1;
    return v;
  }

  u16(): number {
    const v = this.view.getUint16(this.offset, false);
    this.offset += 2;
    return v;
  }

  /** طول 24-بت — مستخدم في TLS Handshake message length */
  u24(): number {
    const b0 = this.view.getUint8(this.offset);
    const b1 = this.view.getUint8(this.offset + 1);
    const b2 = this.view.getUint8(this.offset + 2);
    this.offset += 3;
    return (b0 << 16) | (b1 << 8) | b2;
  }

  u32(): number {
    const v = this.view.getUint32(this.offset, false);
    this.offset += 4;
    return v;
  }

  slice(len: number): Uint8Array {
    const s = this.base.subarray(this.offset, this.offset + len);
    this.offset += len;
    return s;
  }

  skip(len: number): void {
    this.offset += len;
  }
}

export function formatMac(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(':');
}

export function formatIPv4(bytes: Uint8Array): string {
  return Array.from(bytes).join('.');
}

/** عرض كامل لكل مجموعة بدون ضغط :: — أوضح للتحليل، حتى لو أطول شوية */
export function formatIPv6(bytes: Uint8Array): string {
  const groups: string[] = [];
  for (let i = 0; i < 16; i += 2) {
    const value = (bytes[i] << 8) | bytes[i + 1];
    groups.push(value.toString(16));
  }
  return groups.join(':');
}

export function toHexAscii(bytes: Uint8Array): { hexDump: string[]; asciiDump: string } {
  const hexDump: string[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.subarray(i, i + 16);
    const offset = i.toString(16).padStart(4, '0');
    const hex = Array.from(chunk)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(' ');
    hexDump.push(`${offset}  ${hex}`);
  }
  const asciiDump = Array.from(bytes)
    .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
    .join('');
  return { hexDump, asciiDump };
}
