export interface TlsExtensionSummary {
  type: number;
  name: string;
  length: number;
}

export interface TlsExtensionsResult {
  extensions: TlsExtensionSummary[];
  sni: string | null;
  alpn: string[];
  supportedVersions: string[];
}

export interface ClientHelloInfo {
  version: string;
  random: string;
  sessionId: string;
  cipherSuites: string[];
  compressionMethods: string[];
  extensions: TlsExtensionsResult;
}

export interface ServerHelloInfo {
  version: string;
  random: string;
  sessionId: string;
  cipherSuite: string;
  compressionMethod: string;
  extensions: TlsExtensionsResult;
}

export interface TlsHandshakeMessage {
  type: number;
  typeName: string;
  length: number;
  clientHello?: ClientHelloInfo;
  serverHello?: ServerHelloInfo;
}

export interface TlsRecord {
  contentType: number;
  contentTypeName: string;
  version: string;
  length: number;
  handshakeMessages?: TlsHandshakeMessage[];
}
