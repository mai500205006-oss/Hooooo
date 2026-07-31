import { ByteCursor } from './bytes';

export interface IcmpMessage {
  type: number;
  code: number;
  label: string;
  details: string[];
}

const ICMP_MIN_BYTES = 4;

const ICMP_TYPE_NAMES: Record<number, string> = {
  0: 'Echo Reply',
  3: 'Destination Unreachable',
  5: 'Redirect',
  8: 'Echo Request',
  11: 'Time Exceeded',
};

export function parseIcmp(bytes: Uint8Array): IcmpMessage | null {
  if (bytes.length < ICMP_MIN_BYTES) return null;

  const cursor = new ByteCursor(bytes);
  const type = cursor.u8();
  const code = cursor.u8();
  cursor.skip(2); // Checksum

  const label = ICMP_TYPE_NAMES[type] ?? `Type ${type}`;
  const details = [`Type: ${type} (${label})`, `Code: ${code}`];

  // Echo Request/Reply عندهم Identifier + Sequence بعد الـ Header الأساسي
  if ((type === 0 || type === 8) && bytes.length >= 8) {
    const echoCursor = new ByteCursor(bytes, 4);
    const identifier = echoCursor.u16();
    const sequence = echoCursor.u16();
    details.push(`Identifier: ${identifier}`, `Sequence: ${sequence}`);
  }

  return { type, code, label, details };
}
