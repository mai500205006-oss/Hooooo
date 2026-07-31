/** جداول ثابتة لأسماء قيم بروتوكول TLS — IANA TLS Parameters (نطاق فرعي شائع بس) */

export const TLS_VERSION_NAMES: Record<number, string> = {
  0x0300: 'SSL 3.0',
  0x0301: 'TLS 1.0',
  0x0302: 'TLS 1.1',
  0x0303: 'TLS 1.2',
  0x0304: 'TLS 1.3',
};

export function tlsVersionName(value: number): string {
  return TLS_VERSION_NAMES[value] ?? `Unknown (0x${value.toString(16).padStart(4, '0')})`;
}

export const TLS_CONTENT_TYPE_NAMES: Record<number, string> = {
  20: 'Change Cipher Spec',
  21: 'Alert',
  22: 'Handshake',
  23: 'Application Data',
  24: 'Heartbeat',
};

export const TLS_HANDSHAKE_TYPE_NAMES: Record<number, string> = {
  0: 'Hello Request',
  1: 'Client Hello',
  2: 'Server Hello',
  4: 'New Session Ticket',
  8: 'Encrypted Extensions',
  11: 'Certificate',
  12: 'Server Key Exchange',
  13: 'Certificate Request',
  14: 'Server Hello Done',
  15: 'Certificate Verify',
  16: 'Client Key Exchange',
  20: 'Finished',
};

export const TLS_EXTENSION_TYPE_NAMES: Record<number, string> = {
  0: 'server_name',
  5: 'status_request',
  10: 'supported_groups',
  11: 'ec_point_formats',
  13: 'signature_algorithms',
  16: 'application_layer_protocol_negotiation',
  23: 'extended_master_secret',
  35: 'session_ticket',
  41: 'pre_shared_key',
  43: 'supported_versions',
  45: 'psk_key_exchange_modes',
  51: 'key_share',
};

export const TLS_COMPRESSION_METHOD_NAMES: Record<number, string> = {
  0: 'null',
  1: 'DEFLATE',
};

/** أشهر Cipher Suites — نطاق مختصر يغطي معظم حالات TLS 1.2/1.3 الشائعة */
export const TLS_CIPHER_SUITE_NAMES: Record<number, string> = {
  0x1301: 'TLS_AES_128_GCM_SHA256',
  0x1302: 'TLS_AES_256_GCM_SHA384',
  0x1303: 'TLS_CHACHA20_POLY1305_SHA256',
  0xc02b: 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
  0xc02c: 'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384',
  0xc02f: 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
  0xc030: 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384',
  0xcca8: 'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256',
  0xcca9: 'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
  0x009c: 'TLS_RSA_WITH_AES_128_GCM_SHA256',
  0x009d: 'TLS_RSA_WITH_AES_256_GCM_SHA384',
  0x002f: 'TLS_RSA_WITH_AES_128_CBC_SHA',
  0x0035: 'TLS_RSA_WITH_AES_256_CBC_SHA',
  0x00ff: 'TLS_EMPTY_RENEGOTIATION_INFO_SCSV',
};

export function cipherSuiteName(id: number): string {
  const hex = `0x${id.toString(16).padStart(4, '0')}`;
  return TLS_CIPHER_SUITE_NAMES[id] ? `${TLS_CIPHER_SUITE_NAMES[id]} (${hex})` : `Unknown (${hex})`;
}

export function compressionMethodName(id: number): string {
  return TLS_COMPRESSION_METHOD_NAMES[id] ?? `Unknown (${id})`;
}
