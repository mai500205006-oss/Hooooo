import { ByteCursor, formatMac } from '../bytes';
import { cipherSuiteName, compressionMethodName, tlsVersionName } from './constants';
import { parseExtensions } from './extensions';
import type { ClientHelloInfo } from './types';

/** بنستخدم formatMac بس كوسيلة سريعة لعرض بايتات كـ hex متقطع بفواصل — مش MAC حقيقي */
function formatHex(bytes: Uint8Array): string {
  return formatMac(bytes);
}

const MIN_CLIENT_HELLO_BYTES = 2 + 32 + 1; // version + random + session_id length byte

export function parseClientHello(body: Uint8Array): ClientHelloInfo | null {
  if (body.length < MIN_CLIENT_HELLO_BYTES) return null;

  const cursor = new ByteCursor(body);
  const version = tlsVersionName(cursor.u16());
  const random = formatHex(cursor.slice(32));

  const sessionIdLength = cursor.u8();
  if (cursor.remaining() < sessionIdLength) return null;
  const sessionId = sessionIdLength > 0 ? formatHex(cursor.slice(sessionIdLength)) : '(empty)';

  if (cursor.remaining() < 2) return null;
  const cipherSuitesLength = cursor.u16();
  if (cursor.remaining() < cipherSuitesLength) return null;
  const cipherSuiteCount = Math.floor(cipherSuitesLength / 2);
  const cipherSuites: string[] = [];
  for (let i = 0; i < cipherSuiteCount; i++) {
    cipherSuites.push(cipherSuiteName(cursor.u16()));
  }

  if (cursor.remaining() < 1) return null;
  const compressionLength = cursor.u8();
  if (cursor.remaining() < compressionLength) return null;
  const compressionMethods: string[] = [];
  for (let i = 0; i < compressionLength; i++) {
    compressionMethods.push(compressionMethodName(cursor.u8()));
  }

  let extensions = { extensions: [], sni: null, alpn: [], supportedVersions: [] } as ClientHelloInfo['extensions'];
  if (cursor.remaining() >= 2) {
    const extensionsLength = cursor.u16();
    const extensionsBytes = cursor.slice(Math.min(extensionsLength, cursor.remaining()));
    extensions = parseExtensions(extensionsBytes, true);
  }

  return { version, random, sessionId, cipherSuites, compressionMethods, extensions };
}
