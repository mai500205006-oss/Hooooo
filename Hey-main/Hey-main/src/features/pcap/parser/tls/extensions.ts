import { ByteCursor } from '../bytes';
import { TLS_EXTENSION_TYPE_NAMES, tlsVersionName } from './constants';
import type { TlsExtensionsResult } from './types';

const EXT_SERVER_NAME = 0;
const EXT_ALPN = 16;
const EXT_SUPPORTED_VERSIONS = 43;

function parseServerNameExtension(data: Uint8Array): string | null {
  if (data.length < 5) return null;
  const cursor = new ByteCursor(data);
  cursor.u16(); // server_name_list length
  const nameType = cursor.u8();
  if (nameType !== 0) return null; // 0 = host_name، بس ده اللي بنستخرجه
  const nameLength = cursor.u16();
  if (cursor.remaining() < nameLength) return null;
  const nameBytes = cursor.slice(nameLength);
  return Array.from(nameBytes)
    .map((b) => String.fromCharCode(b))
    .join('');
}

function parseAlpnExtension(data: Uint8Array): string[] {
  if (data.length < 2) return [];
  const cursor = new ByteCursor(data);
  const listLength = cursor.u16();
  const protocols: string[] = [];
  const end = Math.min(cursor.offset + listLength, data.length);
  while (cursor.offset < end) {
    const len = cursor.u8();
    if (cursor.remaining() < len) break;
    const nameBytes = cursor.slice(len);
    protocols.push(
      Array.from(nameBytes)
        .map((b) => String.fromCharCode(b))
        .join('')
    );
  }
  return protocols;
}

/** ClientHello بتبعت قائمة نسخ، ServerHello بيرجع نسخة واحدة مختارة — الشكلين مختلفين */
function parseSupportedVersionsExtension(data: Uint8Array, isClientHello: boolean): string[] {
  if (isClientHello) {
    if (data.length < 1) return [];
    const cursor = new ByteCursor(data);
    const listLength = cursor.u8();
    const versions: string[] = [];
    const end = Math.min(1 + listLength, data.length);
    while (cursor.offset + 2 <= end) {
      versions.push(tlsVersionName(cursor.u16()));
    }
    return versions;
  }
  if (data.length < 2) return [];
  return [tlsVersionName(new ByteCursor(data).u16())];
}

export function parseExtensions(bytes: Uint8Array, isClientHello: boolean): TlsExtensionsResult {
  const extensions: TlsExtensionsResult['extensions'] = [];
  let sni: string | null = null;
  let alpn: string[] = [];
  let supportedVersions: string[] = [];

  const cursor = new ByteCursor(bytes);
  while (cursor.remaining() >= 4) {
    const type = cursor.u16();
    const length = cursor.u16();
    if (cursor.remaining() < length) break;
    const data = cursor.slice(length);

    extensions.push({ type, name: TLS_EXTENSION_TYPE_NAMES[type] ?? `Unknown (${type})`, length });

    if (type === EXT_SERVER_NAME) {
      sni = parseServerNameExtension(data);
    } else if (type === EXT_ALPN) {
      alpn = parseAlpnExtension(data);
    } else if (type === EXT_SUPPORTED_VERSIONS) {
      supportedVersions = parseSupportedVersionsExtension(data, isClientHello);
    }
  }

  return { extensions, sni, alpn, supportedVersions };
}
