import { ByteCursor } from '../bytes';
import { TLS_CONTENT_TYPE_NAMES, tlsVersionName } from './constants';
import { parseHandshakeMessages } from './handshake';
import type { TlsRecord } from './types';

const RECORD_HEADER_BYTES = 5; // content_type(1) + version(2) + length(2)
const HANDSHAKE_CONTENT_TYPE = 22;

function looksLikeTlsRecord(bytes: Uint8Array): boolean {
  if (bytes.length < RECORD_HEADER_BYTES) return false;
  const contentType = bytes[0];
  if (!(contentType in TLS_CONTENT_TYPE_NAMES)) return false;
  const majorVersion = bytes[1];
  return majorVersion === 3; // كل نسخ SSL 3.0 / TLS 1.0-1.3 بتبدأ بـ Major Version = 3
}

/** بيقسّم حمولة TCP لسلسلة TLS Records — ممكن يبقى فيه أكتر من Record في نفس الـ Segment */
export function parseTlsRecords(bytes: Uint8Array): TlsRecord[] | null {
  if (!looksLikeTlsRecord(bytes)) return null;

  const records: TlsRecord[] = [];
  const cursor = new ByteCursor(bytes);

  while (cursor.remaining() >= RECORD_HEADER_BYTES) {
    const contentType = cursor.u8();
    const versionValue = cursor.u16();
    const length = cursor.u16();

    if (cursor.remaining() < length) break;
    const payload = cursor.slice(length);

    const record: TlsRecord = {
      contentType,
      contentTypeName: TLS_CONTENT_TYPE_NAMES[contentType] ?? `Unknown (${contentType})`,
      version: tlsVersionName(versionValue),
      length,
    };

    if (contentType === HANDSHAKE_CONTENT_TYPE) {
      record.handshakeMessages = parseHandshakeMessages(payload);
    }

    records.push(record);
  }

  return records.length > 0 ? records : null;
}
