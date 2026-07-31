export type CryptoAdapterOptions = {
  keyId?: string;
  ivLength?: number;
};

export interface EncryptedPayload {
  version: 1;
  keyId: string;
  iv: string;
  ciphertext: string;
  tag?: string;
}

const DEFAULT_IV_LENGTH = 12;
const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER = new TextDecoder();

function toBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function fromBase64(value: string): ArrayBuffer {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

function getKeyMaterial(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    TEXT_ENCODER.encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  ).then((baseKey) =>
    crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new Uint8Array(16),
        iterations: 100_000,
        hash: 'SHA-256',
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt'],
    ),
  );
}

export async function encryptPayload(payload: unknown, secret: string, options: CryptoAdapterOptions = {}): Promise<EncryptedPayload> {
  const key = await getKeyMaterial(secret);
  const iv = crypto.getRandomValues(new Uint8Array(options.ivLength ?? DEFAULT_IV_LENGTH));
  const data = TEXT_ENCODER.encode(JSON.stringify(payload));
  const cipherBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return {
    version: 1,
    keyId: options.keyId ?? 'default',
    iv: toBase64(iv),
    ciphertext: toBase64(cipherBuffer),
  };
}

export async function decryptPayload<T>(payload: EncryptedPayload, secret: string): Promise<T> {
  const key = await getKeyMaterial(secret);
  const iv = fromBase64(payload.iv);
  const ciphertext = fromBase64(payload.ciphertext);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, ciphertext);
  return JSON.parse(TEXT_DECODER.decode(decrypted) as string) as T;
}

export function isWebCryptoSupported(): boolean {
  return typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined';
}
