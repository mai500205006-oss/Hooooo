import type { CaptureFileInfo, Packet, PacketProtocol } from '../types';
import { parsePcapFile, PcapFormatError } from './pcapFile';
import { parseEthernet } from './ethernet';
import { parseArp } from './arp';
import { parseIPv4 } from './ipv4';
import { parseIPv6 } from './ipv6';
import { parseTcp } from './tcp';
import { parseUdp } from './udp';
import { parseIcmp } from './icmp';
import { toHexAscii } from './bytes';
import { parseTlsLayer } from './tls';

export { PcapFormatError } from './pcapFile';

const LINKTYPE_ETHERNET = 1;

/** استدلال بروتوكول التطبيق من رقم البورت المعروف — نفس الأسلوب اللي Wireshark بيستخدمه
 * فوق التحليل الحقيقي لطبقة النقل (TCP/UDP)، مش بديل عنه. */
const PORT_PROTOCOL_HINTS: Record<number, PacketProtocol> = {
  80: 'HTTP',
  443: 'TLS',
  53: 'DNS',
  1900: 'SSDP',
};

function inferAppProtocol(sourcePort: number | null, destPort: number | null, fallback: PacketProtocol): PacketProtocol {
  // بنطبّق التخمين بالبورت بس لو طبقة النقل لسه TCP/UDP عام — أي بروتوكول اتأكد
  // فعليًا من محتوى حقيقي (زي TLS من TLS Record Layer) بيفضل زي ما هو، من غير استبدال
  if (fallback !== 'TCP' && fallback !== 'UDP') return fallback;
  if (destPort !== null && PORT_PROTOCOL_HINTS[destPort]) return PORT_PROTOCOL_HINTS[destPort];
  if (sourcePort !== null && PORT_PROTOCOL_HINTS[sourcePort]) return PORT_PROTOCOL_HINTS[sourcePort];
  return fallback;
}

interface TransportResult {
  sourcePort: number | null;
  destPort: number | null;
  protocol: PacketProtocol;
  info: string;
}

function decodeTransport(
  ipProtocol: number,
  payload: Uint8Array,
  layers: { name: string; details: string[] }[]
): TransportResult {
  if (ipProtocol === 6) {
    const tcp = parseTcp(payload);
    if (tcp) {
      layers.push({ name: 'Transmission Control Protocol', details: tcp.details });
      const flagPrefix = tcp.flags.length > 0 ? `[${tcp.flags.join(', ')}] ` : '';
      const tcpInfo = `${flagPrefix}Seq=${tcp.sequence} Ack=${tcp.acknowledgment} Win=${tcp.window} Len=${tcp.payload.length}`;

      if (tcp.payload.length > 0) {
        const tls = parseTlsLayer(tcp.payload);
        if (tls) {
          layers.push(...tls.layers);
          return { sourcePort: tcp.sourcePort, destPort: tcp.destPort, protocol: 'TLS', info: tls.info };
        }
      }

      return { sourcePort: tcp.sourcePort, destPort: tcp.destPort, protocol: 'TCP', info: tcpInfo };
    }
  } else if (ipProtocol === 17) {
    const udp = parseUdp(payload);
    if (udp) {
      layers.push({ name: 'User Datagram Protocol', details: udp.details });
      return { sourcePort: udp.sourcePort, destPort: udp.destPort, protocol: 'UDP', info: `Len=${udp.length}` };
    }
  } else if (ipProtocol === 1 || ipProtocol === 58) {
    const icmp = parseIcmp(payload);
    if (icmp) {
      layers.push({
        name: ipProtocol === 58 ? 'Internet Control Message Protocol v6' : 'Internet Control Message Protocol',
        details: icmp.details,
      });
      return { sourcePort: null, destPort: null, protocol: 'ICMP', info: icmp.label };
    }
  }
  return { sourcePort: null, destPort: null, protocol: 'TCP', info: 'Unrecognized transport payload' };
}

function decodePacket(no: number, timestamp: number, originalLength: number, raw: Uint8Array): Packet {
  const layers: { name: string; details: string[] }[] = [
    { name: 'Frame', details: [`Captured Length: ${raw.length} bytes`, `Original Length: ${originalLength} bytes`] },
  ];

  const { hexDump, asciiDump } = toHexAscii(raw);

  const eth = parseEthernet(raw);
  if (!eth) {
    return {
      id: `pkt-${no}`,
      no,
      timestamp,
      sourceIp: '—',
      destIp: '—',
      sourcePort: null,
      destPort: null,
      protocol: 'TCP',
      length: originalLength,
      info: 'Truncated or unsupported link-layer frame',
      layers,
      hexDump,
      asciiDump,
    };
  }
  layers.push({ name: 'Ethernet II', details: eth.details });

  let protocol: PacketProtocol = 'TCP';
  let sourceIp = '—';
  let destIp = '—';
  let sourcePort: number | null = null;
  let destPort: number | null = null;
  let info = 'Unrecognized network-layer payload';

  if (eth.etherType === 0x0806) {
    const arp = parseArp(eth.payload);
    if (arp) {
      protocol = 'ARP';
      sourceIp = arp.senderIp;
      destIp = arp.targetIp;
      info =
        arp.operation === 'request'
          ? `Who has ${arp.targetIp}? Tell ${arp.senderIp}`
          : `${arp.senderIp} is at ${arp.senderMac}`;
      layers.push({ name: 'Address Resolution Protocol', details: arp.details });
    }
  } else if (eth.etherType === 0x0800) {
    const ip = parseIPv4(eth.payload);
    if (ip) {
      sourceIp = ip.sourceIp;
      destIp = ip.destIp;
      layers.push({ name: 'Internet Protocol Version 4', details: ip.details });
      const transport = decodeTransport(ip.protocol, ip.payload, layers);
      sourcePort = transport.sourcePort;
      destPort = transport.destPort;
      info = transport.info;
      protocol = inferAppProtocol(sourcePort, destPort, transport.protocol);
    }
  } else if (eth.etherType === 0x86dd) {
    const ip6 = parseIPv6(eth.payload);
    if (ip6) {
      sourceIp = ip6.sourceIp;
      destIp = ip6.destIp;
      layers.push({ name: 'Internet Protocol Version 6', details: ip6.details });
      const transport = decodeTransport(ip6.nextHeader, ip6.payload, layers);
      sourcePort = transport.sourcePort;
      destPort = transport.destPort;
      info = transport.info;
      protocol = inferAppProtocol(sourcePort, destPort, transport.protocol);
    }
  }

  return {
    id: `pkt-${no}`,
    no,
    timestamp,
    sourceIp,
    destIp,
    sourcePort,
    destPort,
    protocol,
    length: originalLength,
    info,
    layers,
    hexDump,
    asciiDump,
  };
}

/**
 * نقطة الدخول الرئيسية للـ Parser: بتاخد بايتات ملف .pcap حقيقية وترجّع
 * Packets متوافقة تمامًا مع النوع Packet اللي الـ UI الحالي شغّال عليه.
 * كل طبقة (Ethernet/IPv4/IPv6/TCP/UDP/ICMP/ARP) بتتفك تشفيرها فعليًا من البايتات،
 * مفيش قوالب ولا بيانات وهمية.
 */
export function parseCaptureBuffer(buffer: ArrayBuffer, fileName: string): { fileInfo: CaptureFileInfo; packets: Packet[] } {
  const { header, records } = parsePcapFile(buffer);

  if (header.linkType !== LINKTYPE_ETHERNET) {
    throw new PcapFormatError(
      `Unsupported link type (${header.linkType}) — only Ethernet-linked captures are supported.`
    );
  }

  const fractionDivisor = header.nanosecondResolution ? 1e9 : 1e6;
  const firstTimestamp = records[0] ? records[0].tsSeconds + records[0].tsFraction / fractionDivisor : 0;

  const packets = records.map((record, i) => {
    const absoluteTimestamp = record.tsSeconds + record.tsFraction / fractionDivisor;
    const timestamp = Number((absoluteTimestamp - firstTimestamp).toFixed(6));
    return decodePacket(i + 1, timestamp, record.originalLength, record.data);
  });

  const fileInfo: CaptureFileInfo = {
    fileName,
    fileSize: buffer.byteLength,
    packetCount: packets.length,
    durationSeconds: Number((packets[packets.length - 1]?.timestamp ?? 0).toFixed(3)),
    linkType: 'Ethernet',
  };

  return { fileInfo, packets };
}
