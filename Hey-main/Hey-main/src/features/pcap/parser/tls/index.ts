import { parseTlsRecords } from './record';
import type { ClientHelloInfo, ServerHelloInfo, TlsRecord } from './types';

export type { TlsRecord, TlsHandshakeMessage, ClientHelloInfo, ServerHelloInfo, TlsExtensionsResult, TlsExtensionSummary } from './types';
export { parseTlsRecords } from './record';

function extensionDetailLines(extensions: ClientHelloInfo['extensions'] | ServerHelloInfo['extensions']): string[] {
  const lines = [
    `Extensions (${extensions.extensions.length}):`,
    ...extensions.extensions.map((e) => `  - ${e.name} (type ${e.type}, len ${e.length})`),
  ];
  if (extensions.sni) lines.push(`Server Name (SNI): ${extensions.sni}`);
  if (extensions.alpn.length > 0) lines.push(`ALPN: ${extensions.alpn.join(', ')}`);
  if (extensions.supportedVersions.length > 0) lines.push(`Supported Versions: ${extensions.supportedVersions.join(', ')}`);
  return lines;
}

function clientHelloDetails(ch: ClientHelloInfo): string[] {
  return [
    `Version: ${ch.version}`,
    `Random: ${ch.random}`,
    `Session ID: ${ch.sessionId}`,
    `Cipher Suites (${ch.cipherSuites.length}):`,
    ...ch.cipherSuites.map((c) => `  - ${c}`),
    `Compression Methods: ${ch.compressionMethods.join(', ') || '—'}`,
    ...extensionDetailLines(ch.extensions),
  ];
}

function serverHelloDetails(sh: ServerHelloInfo): string[] {
  return [
    `Version: ${sh.version}`,
    `Random: ${sh.random}`,
    `Session ID: ${sh.sessionId}`,
    `Cipher Suite: ${sh.cipherSuite}`,
    `Compression Method: ${sh.compressionMethod}`,
    ...extensionDetailLines(sh.extensions),
  ];
}

/**
 * بيحوّل قائمة TLS Records المُحلَّلة لـ Layers متوافقة مع Packet.layers الحالي
 * في الـ UI (name + details[])، زائد جملة info مختصرة (زي "Client Hello" أو
 * "Server Hello, Certificate, Change Cipher Spec").
 */
export function formatTlsLayers(records: TlsRecord[]): { layers: { name: string; details: string[] }[]; info: string } {
  const layers: { name: string; details: string[] }[] = [];
  const summaryParts: string[] = [];

  for (const record of records) {
    layers.push({
      name: 'TLS Record Layer',
      details: [
        `Content Type: ${record.contentTypeName} (${record.contentType})`,
        `Version: ${record.version}`,
        `Length: ${record.length}`,
      ],
    });

    if (record.handshakeMessages && record.handshakeMessages.length > 0) {
      for (const msg of record.handshakeMessages) {
        summaryParts.push(msg.typeName);
        const details = [`Handshake Type: ${msg.typeName} (${msg.type})`, `Length: ${msg.length}`];

        if (msg.clientHello) details.push(...clientHelloDetails(msg.clientHello));
        else if (msg.serverHello) details.push(...serverHelloDetails(msg.serverHello));

        layers.push({ name: `TLS Handshake Protocol: ${msg.typeName}`, details });
      }
    } else {
      summaryParts.push(record.contentTypeName);
    }
  }

  return { layers, info: summaryParts.length > 0 ? summaryParts.join(', ') : 'TLS record' };
}

/**
 * نقطة الدخول للـ Parser: بتاخد حمولة TCP خام، وبترجّع Layers + info لو شكلها
 * TLS فعلاً، أو null لو مش TLS (عشان الـ caller يفضل على الـ TCP summary العادي).
 */
export function parseTlsLayer(payload: Uint8Array): { layers: { name: string; details: string[] }[]; info: string } | null {
  const records = parseTlsRecords(payload);
  if (!records) return null;
  return formatTlsLayers(records);
}
