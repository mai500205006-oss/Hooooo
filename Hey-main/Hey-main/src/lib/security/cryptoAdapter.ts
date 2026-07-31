export type CryptoAdapterOptions = {
  keyId?: string;
  ivLength?: number;
};

export interface EncryptedPayload {
  version: 1;
  keyId: string;
  iv?: string;
  ciphertext: string;
  tag?: string;
}

const DEFAULT_IV_LENGTH = 16;
const AES_BLOCK_SIZE = 16;
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

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function padPkcs7(data: Uint8Array): Uint8Array {
  const paddingLength = AES_BLOCK_SIZE - (data.length % AES_BLOCK_SIZE);
  const padded = new Uint8Array(data.length + paddingLength);
  padded.set(data);
  padded.fill(paddingLength, data.length);
  return padded;
}

function unpadPkcs7(data: Uint8Array): Uint8Array {
  if (data.length === 0 || data.length % AES_BLOCK_SIZE !== 0) {
    throw new Error('Invalid CBC payload length');
  }

  const paddingLength = data[data.length - 1];
  if (paddingLength < 1 || paddingLength > AES_BLOCK_SIZE) {
    throw new Error('Invalid CBC padding');
  }

  const startIndex = data.length - paddingLength;
  for (let index = startIndex; index < data.length; index += 1) {
    if (data[index] !== paddingLength) {
      throw new Error('Invalid CBC padding');
    }
  }

  return data.slice(0, startIndex);
}

async function getKeyMaterial(secret: string): Promise<CryptoKey> {
  const today = new Date().toISOString().slice(0, 10);
  const keyMaterial = TEXT_ENCODER.encode(`${secret}${today}`);
  const digest = await crypto.subtle.digest('SHA-256', keyMaterial);
  return crypto.subtle.importKey('raw', digest, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
}

export async function encryptPayload(payload: unknown, secret: string, options: CryptoAdapterOptions = {}): Promise<EncryptedPayload> {
  const key = await getKeyMaterial(secret);
  const ivLength = options.ivLength ?? DEFAULT_IV_LENGTH;
  if (ivLength !== AES_BLOCK_SIZE) {
    throw new Error('AES-CBC requires a 16-byte IV');
  }

  const iv = crypto.getRandomValues(new Uint8Array(ivLength));
  const data = TEXT_ENCODER.encode(JSON.stringify(payload));
  const padded = padPkcs7(data);
  const plaintext = padded.buffer.slice(padded.byteOffset, padded.byteOffset + padded.byteLength) as ArrayBuffer;
  const cipherBuffer = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, plaintext);
  const combined = new Uint8Array(iv.length + cipherBuffer.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(cipherBuffer), iv.length);

  return {
    version: 1,
    keyId: options.keyId ?? 'default',
    iv: toBase64(iv),
    ciphertext: toBase64(combined),
  };
}

export async function decryptPayload<T>(payload: EncryptedPayload, secret: string): Promise<T> {
  const key = await getKeyMaterial(secret);
  const combined = fromBase64(payload.ciphertext);
  const iv = combined.slice(0, AES_BLOCK_SIZE);
  const ciphertext = combined.slice(AES_BLOCK_SIZE);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, ciphertext);
  const unpadded = unpadPkcs7(new Uint8Array(decrypted));
  return JSON.parse(TEXT_DECODER.decode(unpadded) as string) as T;
}

export function isWebCryptoSupported(): boolean {
  return typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined';
}
