/**
 * محلّل حاوية ملف .pcap الكلاسيكي (libpcap) — Global Header + سجلات الـ Packets.
 * مش .pcapng (بنية مختلفة تمامًا بـ Blocks) — لو الملف .pcapng بنرفضه بوضوح
 * بدل ما نحاول نفسّره غلط.
 */

export interface PcapGlobalHeader {
  littleEndian: boolean;
  versionMajor: number;
  versionMinor: number;
  snapLen: number;
  linkType: number;
  nanosecondResolution: boolean;
}

export interface RawPacketRecord {
  tsSeconds: number;
  /** ميكروثانية أو نانوثانية — حسب nanosecondResolution في الـ Header */
  tsFraction: number;
  originalLength: number;
  data: Uint8Array;
}

export class PcapFormatError extends Error {}

const MAGIC_MICRO_BE = 0xa1b2c3d4;
const MAGIC_MICRO_LE = 0xd4c3b2a1;
const MAGIC_NANO_BE = 0xa1b23c4d;
const MAGIC_NANO_LE = 0x4d3cb2a1;
const PCAPNG_MAGIC = 0x0a0d0d0a;

const GLOBAL_HEADER_SIZE = 24;
const RECORD_HEADER_SIZE = 16;

export function parsePcapFile(buffer: ArrayBuffer): { header: PcapGlobalHeader; records: RawPacketRecord[] } {
  if (buffer.byteLength < GLOBAL_HEADER_SIZE) {
    throw new PcapFormatError('File is too small to be a valid .pcap capture.');
  }

  const view = new DataView(buffer);
  const magicBigEndian = view.getUint32(0, false);

  if (magicBigEndian === PCAPNG_MAGIC) {
    throw new PcapFormatError('This looks like a .pcapng file — only classic .pcap captures are supported.');
  }

  let littleEndian: boolean;
  let nanosecondResolution = false;

  if (magicBigEndian === MAGIC_MICRO_BE) {
    littleEndian = false;
  } else if (magicBigEndian === MAGIC_MICRO_LE) {
    littleEndian = true;
  } else if (magicBigEndian === MAGIC_NANO_BE) {
    littleEndian = false;
    nanosecondResolution = true;
  } else if (magicBigEndian === MAGIC_NANO_LE) {
    littleEndian = true;
    nanosecondResolution = true;
  } else {
    throw new PcapFormatError('Unrecognized file signature — not a valid .pcap capture.');
  }

  const versionMajor = view.getUint16(4, littleEndian);
  const versionMinor = view.getUint16(6, littleEndian);
  const snapLen = view.getUint32(16, littleEndian);
  const linkType = view.getUint32(20, littleEndian);

  const header: PcapGlobalHeader = {
    littleEndian,
    versionMajor,
    versionMinor,
    snapLen,
    linkType,
    nanosecondResolution,
  };

  const records: RawPacketRecord[] = [];
  let offset = GLOBAL_HEADER_SIZE;

  while (offset + RECORD_HEADER_SIZE <= buffer.byteLength) {
    const tsSeconds = view.getUint32(offset, littleEndian);
    const tsFraction = view.getUint32(offset + 4, littleEndian);
    const capturedLength = view.getUint32(offset + 8, littleEndian);
    const originalLength = view.getUint32(offset + 12, littleEndian);
    offset += RECORD_HEADER_SIZE;

    if (capturedLength > buffer.byteLength - offset) {
      // ملف مقطوع في النص — بنوقف هنا بأمان بدل ما نطلع خطأ ونضيّع اللي اتقرا لحد كده
      break;
    }

    const data = new Uint8Array(buffer, offset, capturedLength);
    records.push({ tsSeconds, tsFraction, originalLength, data });
    offset += capturedLength;
  }

  return { header, records };
}
