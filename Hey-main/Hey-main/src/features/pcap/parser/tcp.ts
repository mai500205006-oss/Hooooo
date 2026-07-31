import { ByteCursor } from './bytes';

export interface TcpSegment {
  sourcePort: number;
  destPort: number;
  sequence: number;
  acknowledgment: number;
  flags: string[];
  window: number;
  payload: Uint8Array;
  details: string[];
}

const MIN_TCP_HEADER_BYTES = 20;

const FLAG_BITS: [number, string][] = [
  [0x01, 'FIN'],
  [0x02, 'SYN'],
  [0x04, 'RST'],
  [0x08, 'PSH'],
  [0x10, 'ACK'],
  [0x20, 'URG'],
  [0x40, 'ECE'],
  [0x80, 'CWR'],
];

export function parseTcp(bytes: Uint8Array): TcpSegment | null {
  if (bytes.length < MIN_TCP_HEADER_BYTES) return null;

  const cursor = new ByteCursor(bytes);
  const sourcePort = cursor.u16();
  const destPort = cursor.u16();
  const sequence = cursor.u32();
  const acknowledgment = cursor.u32();
  const offsetByte = cursor.u8();
  const dataOffset = (offsetByte >> 4) * 4;
  const flagsByte = cursor.u8();
  const window = cursor.u16();
  cursor.skip(4); // Checksum + Urgent Pointer

  if (dataOffset < MIN_TCP_HEADER_BYTES) return null;

  const flags = FLAG_BITS.filter(([bit]) => (flagsByte & bit) !== 0).map(([, name]) => name);
  const payload = bytes.length >= dataOffset ? bytes.subarray(dataOffset) : new Uint8Array(0);

  return {
    sourcePort,
    destPort,
    sequence,
    acknowledgment,
    flags,
    window,
    payload,
    details: [
      `Source Port: ${sourcePort}`,
      `Destination Port: ${destPort}`,
      `Sequence Number: ${sequence}`,
      `Acknowledgment Number: ${acknowledgment}`,
      `Header Length: ${dataOffset} bytes`,
      `Flags: ${flags.length > 0 ? flags.join(', ') : '—'}`,
      `Window Size: ${window}`,
    ],
  };
}
