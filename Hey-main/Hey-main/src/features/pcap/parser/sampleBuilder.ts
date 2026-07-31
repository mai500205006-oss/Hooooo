import type { SampleCapture } from '../types';
import { PcapFormatError } from './pcapFile';

/**
 * بيبني بايتات .pcap حقيقية وصحيحة لعينات الـ Sample Captures — نفس فكرة
 * "generate a small real capture" بدل توليد بيانات وهمية بالنص. الـ Bytes دي
 * بتتحلل بعدين بنفس الـ Parser الحقيقي (parser/index.ts) زي أي ملف مرفوع.
 * الـ Checksums متسيبة صفر عمدًا — الـ Parser عندنا مش بيتحقق منها أصلًا.
 */

function macBytes(mac: string): Uint8Array {
  return new Uint8Array(mac.split(':').map((h) => parseInt(h, 16)));
}

function ipv4Bytes(ip: string): Uint8Array {
  return new Uint8Array(ip.split('.').map(Number));
}

function concat(...chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

function u16(value: number): Uint8Array {
  return new Uint8Array([(value >> 8) & 0xff, value & 0xff]);
}

function u32(value: number): Uint8Array {
  return new Uint8Array([(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff]);
}

function buildEthernetFrame(destMac: string, srcMac: string, etherType: number, payload: Uint8Array): Uint8Array {
  return concat(macBytes(destMac), macBytes(srcMac), u16(etherType), payload);
}

function buildIpv4Header(protocol: number, srcIp: string, destIp: string, payloadLength: number, id: number): Uint8Array {
  const totalLength = 20 + payloadLength;
  return concat(
    new Uint8Array([0x45, 0x00]), // Version 4, IHL 5 words; DSCP/ECN 0
    u16(totalLength),
    u16(id),
    new Uint8Array([0x40, 0x00]), // Flags: Don't Fragment
    new Uint8Array([64]), // TTL
    new Uint8Array([protocol]),
    u16(0), // Header checksum
    ipv4Bytes(srcIp),
    ipv4Bytes(destIp)
  );
}

function buildTcpHeader(srcPort: number, destPort: number, seq: number, ack: number, flags: number): Uint8Array {
  return concat(
    u16(srcPort),
    u16(destPort),
    u32(seq),
    u32(ack),
    new Uint8Array([5 << 4]), // Data offset 5 (no options), reserved bits 0
    new Uint8Array([flags]),
    u16(64240), // Window size
    u16(0), // Checksum
    u16(0) // Urgent pointer
  );
}

function buildUdpHeader(srcPort: number, destPort: number, payloadLength: number): Uint8Array {
  return concat(u16(srcPort), u16(destPort), u16(8 + payloadLength), u16(0));
}

function buildIcmpEcho(type: number, identifier: number, sequence: number): Uint8Array {
  return concat(new Uint8Array([type, 0]), u16(0), u16(identifier), u16(sequence));
}

function buildArp(opcode: number, senderMac: string, senderIp: string, targetMac: string, targetIp: string): Uint8Array {
  return concat(
    u16(1), // Hardware type: Ethernet
    u16(0x0800), // Protocol type: IPv4
    new Uint8Array([6, 4]), // Hardware/Protocol address lengths
    u16(opcode),
    macBytes(senderMac),
    ipv4Bytes(senderIp),
    macBytes(targetMac),
    ipv4Bytes(targetIp)
  );
}

function buildTcpFrameWithPayload(
  srcIp: string,
  destIp: string,
  srcPort: number,
  destPort: number,
  seq: number,
  ack: number,
  flags: number,
  id: number,
  payload: Uint8Array
): Uint8Array {
  const tcp = concat(buildTcpHeader(srcPort, destPort, seq, ack, flags), payload);
  const ip = buildIpv4Header(6, srcIp, destIp, tcp.length, id);
  return buildEthernetFrame(GATEWAY_MAC, HOST_MAC, 0x0800, concat(ip, tcp));
}

// --- TLS ClientHello/ServerHello encoding — بايتات حقيقية بصيغة TLS Record/Handshake فعلية ---

function u8(value: number): Uint8Array {
  return new Uint8Array([value & 0xff]);
}

function u24(value: number): Uint8Array {
  return new Uint8Array([(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff]);
}

function asciiBytes(text: string): Uint8Array {
  return new Uint8Array(Array.from(text).map((c) => c.charCodeAt(0)));
}

function buildTlsExtension(type: number, data: Uint8Array): Uint8Array {
  return concat(u16(type), u16(data.length), data);
}

function buildSniExtensionData(hostname: string): Uint8Array {
  const nameBytes = asciiBytes(hostname);
  const nameEntry = concat(u8(0), u16(nameBytes.length), nameBytes); // name_type + length + name
  return concat(u16(nameEntry.length), nameEntry); // server_name_list length + entry
}

function buildAlpnExtensionData(protocols: string[]): Uint8Array {
  const entries = concat(...protocols.map((p) => concat(u8(p.length), asciiBytes(p))));
  return concat(u16(entries.length), entries);
}

function buildSupportedVersionsClientData(versions: number[]): Uint8Array {
  const list = concat(...versions.map((v) => u16(v)));
  return concat(u8(list.length), list);
}

const TLS_HELLO_RANDOM = new Uint8Array(32).map((_, i) => (i * 7 + 11) % 256);

function buildClientHelloRecord(hostname: string): Uint8Array {
  const cipherSuites = concat(u16(0x1301), u16(0xc02b), u16(0xc02f));
  const extensions = concat(
    buildTlsExtension(0, buildSniExtensionData(hostname)),
    buildTlsExtension(16, buildAlpnExtensionData(['h2', 'http/1.1'])),
    buildTlsExtension(43, buildSupportedVersionsClientData([0x0304, 0x0303]))
  );

  const body = concat(
    u16(0x0303), // client_version (legacy_version)
    TLS_HELLO_RANDOM,
    u8(0), // session_id length = 0 (empty)
    u16(cipherSuites.length),
    cipherSuites,
    u8(1), // compression methods length
    u8(0), // null compression
    u16(extensions.length),
    extensions
  );

  const handshake = concat(u8(1), u24(body.length), body); // Handshake Type 1 = ClientHello
  return concat(u8(22), u16(0x0303), u16(handshake.length), handshake); // Content Type 22 = Handshake
}

function buildServerHelloRecord(): Uint8Array {
  const extensions = buildTlsExtension(43, u16(0x0304)); // supported_versions (selected: TLS 1.3)

  const body = concat(
    u16(0x0303), // server_version (legacy_version)
    TLS_HELLO_RANDOM,
    u8(0), // session_id length = 0 (empty)
    u16(0x1301), // selected cipher suite
    u8(0), // compression method: null
    u16(extensions.length),
    extensions
  );

  const handshake = concat(u8(2), u24(body.length), body); // Handshake Type 2 = ServerHello
  return concat(u8(22), u16(0x0303), u16(handshake.length), handshake); // Content Type 22 = Handshake
}

const HOST_MAC = 'aa:bb:cc:00:11:22';
const GATEWAY_MAC = 'aa:bb:cc:00:11:01';

const HOST_IP = '192.168.1.46';
const GATEWAY_IP = '192.168.1.1';
const REMOTE_IPS = ['142.250.74.14', '104.16.132.229', '17.253.5.203'];
const DNS_SERVER_IP = '8.8.8.8';

function buildTcpFrame(
  srcIp: string,
  destIp: string,
  srcPort: number,
  destPort: number,
  seq: number,
  ack: number,
  flags: number,
  id: number
): Uint8Array {
  const tcp = buildTcpHeader(srcPort, destPort, seq, ack, flags);
  const ip = buildIpv4Header(6, srcIp, destIp, tcp.length, id);
  return buildEthernetFrame(GATEWAY_MAC, HOST_MAC, 0x0800, concat(ip, tcp));
}

function buildUdpFrame(srcIp: string, destIp: string, srcPort: number, destPort: number, id: number): Uint8Array {
  const udp = buildUdpHeader(srcPort, destPort, 0);
  const ip = buildIpv4Header(17, srcIp, destIp, udp.length, id);
  return buildEthernetFrame(GATEWAY_MAC, HOST_MAC, 0x0800, concat(ip, udp));
}

function buildIcmpFrame(srcIp: string, destIp: string, type: number, seq: number, id: number): Uint8Array {
  const icmp = buildIcmpEcho(type, 1, seq);
  const ip = buildIpv4Header(1, srcIp, destIp, icmp.length, id);
  return buildEthernetFrame(GATEWAY_MAC, HOST_MAC, 0x0800, concat(ip, icmp));
}

function buildArpFrame(opcode: number, senderIp: string, targetIp: string): Uint8Array {
  const arp = buildArp(opcode, HOST_MAC, senderIp, opcode === 1 ? '00:00:00:00:00:00' : GATEWAY_MAC, targetIp);
  return buildEthernetFrame(opcode === 1 ? 'ff:ff:ff:ff:ff:ff' : GATEWAY_MAC, HOST_MAC, 0x0806, arp);
}

const SYN = 0x02;
const SYN_ACK = 0x12;
const ACK = 0x10;
const PSH_ACK = 0x18;
const FIN_ACK = 0x11;

function buildFramesForProtocol(protocol: SampleCapture['protocol']): Uint8Array[] {
  const frames: Uint8Array[] = [];

  if (protocol === 'TLS') {
    for (let i = 0; i < 4; i++) {
      const remote = REMOTE_IPS[i % REMOTE_IPS.length];
      const clientHello = buildClientHelloRecord(`example${i}.com`);
      const serverHello = buildServerHelloRecord();

      frames.push(
        buildTcpFrame(HOST_IP, remote, 51000 + i, 443, 1000 + i, 0, SYN, i),
        buildTcpFrame(remote, HOST_IP, 443, 51000 + i, 5000 + i, 1001 + i, SYN_ACK, i),
        buildTcpFrame(HOST_IP, remote, 51000 + i, 443, 1001 + i, 5001 + i, ACK, i),
        buildTcpFrameWithPayload(HOST_IP, remote, 51000 + i, 443, 1001 + i, 5001 + i, PSH_ACK, i, clientHello),
        buildTcpFrameWithPayload(
          remote,
          HOST_IP,
          443,
          51000 + i,
          5001 + i,
          1001 + i + clientHello.length,
          PSH_ACK,
          i,
          serverHello
        )
      );
    }
  } else if (protocol === 'HTTP') {
    for (let i = 0; i < 8; i++) {
      const remote = REMOTE_IPS[i % REMOTE_IPS.length];
      frames.push(
        buildTcpFrame(HOST_IP, remote, 52000 + i, 80, 2000 + i, 0, SYN, i),
        buildTcpFrame(remote, HOST_IP, 80, 52000 + i, 6000 + i, 2001 + i, SYN_ACK, i),
        buildTcpFrame(HOST_IP, remote, 52000 + i, 80, 2001 + i, 6001 + i, PSH_ACK, i)
      );
    }
  } else if (protocol === 'DNS') {
    for (let i = 0; i < 10; i++) {
      frames.push(
        buildUdpFrame(HOST_IP, DNS_SERVER_IP, 53000 + i, 53, i),
        buildUdpFrame(DNS_SERVER_IP, HOST_IP, 53, 53000 + i, i)
      );
    }
  } else if (protocol === 'ICMP') {
    for (let i = 0; i < 12; i++) {
      const remote = REMOTE_IPS[i % REMOTE_IPS.length];
      frames.push(buildIcmpFrame(HOST_IP, remote, 8, i, i), buildIcmpFrame(remote, HOST_IP, 0, i, i));
    }
  } else if (protocol === 'ARP') {
    for (let i = 0; i < 8; i++) {
      const target = i % 2 === 0 ? GATEWAY_IP : `192.168.1.${60 + i}`;
      frames.push(buildArpFrame(1, HOST_IP, target));
      if (i % 2 === 0) frames.push(buildArpFrame(2, GATEWAY_IP, HOST_IP));
    }
  } else {
    // SSDP وأي بروتوكول تاني مش مربوط بعينة مخصصة — نرجّع Session TCP بسيطة كـ fallback
    for (let i = 0; i < 6; i++) {
      frames.push(buildTcpFrame(HOST_IP, REMOTE_IPS[0], 50000 + i, 1900, 1000 + i, i, ACK, i));
    }
  }

  frames.push(
    buildTcpFrame(HOST_IP, REMOTE_IPS[0], 55000, 443, 9000, 1, FIN_ACK, 999) // نهاية الجلسة، تنوّع بسيط
  );

  return frames;
}

/** مبنى الـ Global Header لملف .pcap — Little-Endian، Microsecond resolution، LINKTYPE_ETHERNET */
function buildPcapContainer(frames: Uint8Array[]): ArrayBuffer {
  const recordsSize = frames.reduce((sum, f) => sum + 16 + f.length, 0);
  const buffer = new ArrayBuffer(24 + recordsSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint32(0, 0xa1b2c3d4, true);
  view.setUint16(4, 2, true);
  view.setUint16(6, 4, true);
  view.setInt32(8, 0, true);
  view.setUint32(12, 0, true);
  view.setUint32(16, 65535, true);
  view.setUint32(20, 1, true); // LINKTYPE_ETHERNET

  let offset = 24;
  frames.forEach((frame, i) => {
    const totalMicros = i * 20000; // فرق 20ms بين كل Packet والتاني، للعرض بس
    const tsSec = Math.floor(totalMicros / 1_000_000);
    const tsUsec = totalMicros % 1_000_000;
    view.setUint32(offset, tsSec, true);
    view.setUint32(offset + 4, tsUsec, true);
    view.setUint32(offset + 8, frame.length, true);
    view.setUint32(offset + 12, frame.length, true);
    offset += 16;
    bytes.set(frame, offset);
    offset += frame.length;
  });

  return buffer;
}

/**
 * بيبني ArrayBuffer حقيقي بصيغة .pcap لعينة معيّنة — نفس الـ Parser الحقيقي
 * (parseCaptureBuffer) هو اللي بيفكه تشفير بعد كده، زي أي ملف مرفوع بالظبط.
 */
export function buildSampleCaptureBuffer(sample: SampleCapture): ArrayBuffer {
  const frames = buildFramesForProtocol(sample.protocol);
  if (frames.length === 0) {
    throw new PcapFormatError(`No sample frames available for protocol "${sample.protocol}".`);
  }
  return buildPcapContainer(frames);
}
