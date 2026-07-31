import { ByteCursor } from './bytes';

export interface UdpDatagram {
  sourcePort: number;
  destPort: number;
  length: number;
  payload: Uint8Array;
  details: string[];
}

const UDP_HEADER_BYTES = 8;

export function parseUdp(bytes: Uint8Array): UdpDatagram | null {
  if (bytes.length < UDP_HEADER_BYTES) return null;

  const cursor = new ByteCursor(bytes);
  const sourcePort = cursor.u16();
  const destPort = cursor.u16();
  const length = cursor.u16();
  cursor.skip(2); // Checksum

  return {
    sourcePort,
    destPort,
    length,
    payload: bytes.subarray(UDP_HEADER_BYTES),
    details: [`Source Port: ${sourcePort}`, `Destination Port: ${destPort}`, `Length: ${length}`],
  };
}
