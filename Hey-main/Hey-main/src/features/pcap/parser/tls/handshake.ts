import { ByteCursor } from '../bytes';
import { TLS_HANDSHAKE_TYPE_NAMES } from './constants';
import { parseClientHello } from './clientHello';
import { parseServerHello } from './serverHello';
import type { TlsHandshakeMessage } from './types';

const HANDSHAKE_HEADER_BYTES = 4; // type(1) + length(3)
const CLIENT_HELLO = 1;
const SERVER_HELLO = 2;

/** حمولة TLS Record من نوع Handshake ممكن تحتوي على أكتر من رسالة Handshake ورا بعض */
export function parseHandshakeMessages(bytes: Uint8Array): TlsHandshakeMessage[] {
  const messages: TlsHandshakeMessage[] = [];
  const cursor = new ByteCursor(bytes);

  while (cursor.remaining() >= HANDSHAKE_HEADER_BYTES) {
    const type = cursor.u8();
    const length = cursor.u24();
    if (cursor.remaining() < length) break;
    const body = cursor.slice(length);

    const message: TlsHandshakeMessage = {
      type,
      typeName: TLS_HANDSHAKE_TYPE_NAMES[type] ?? `Unknown (${type})`,
      length,
    };

    if (type === CLIENT_HELLO) {
      message.clientHello = parseClientHello(body) ?? undefined;
    } else if (type === SERVER_HELLO) {
      message.serverHello = parseServerHello(body) ?? undefined;
    }

    messages.push(message);
  }

  return messages;
}
