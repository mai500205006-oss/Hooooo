import { useState } from 'react';
import { logger } from '@utils/logger';
import { parseCaptureBuffer, PcapFormatError } from './parser';
import { buildSampleCaptureBuffer } from './parser/sampleBuilder';
import type { CaptureFileInfo, Packet, SampleCapture } from './types';

// تأخير بسيط بس عشان الـ Loading State يبان بشكل واقعي — التحليل نفسه فعلي ومش مصطنع
const PARSE_DELAY_MS = 300;

export type CaptureStatus = 'empty' | 'loading' | 'loaded' | 'error';

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة PCAP Viewer:
 * رفع ملف .pcap حقيقي أو اختيار عينة جاهزة، وتحليل البايتات فعليًا عن طريق
 * الـ Parser الطبقي في ./parser (Ethernet → IPv4/IPv6/ARP → TCP/UDP/ICMP).
 * كل التحليل بيحصل في المتصفح — مفيش Backend ولا API.
 */
export function usePcapCapture() {
  const [status, setStatus] = useState<CaptureStatus>('empty');
  const [fileInfo, setFileInfo] = useState<CaptureFileInfo | null>(null);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const applyResult = (result: { fileInfo: CaptureFileInfo; packets: Packet[] }) => {
    setFileInfo(result.fileInfo);
    setPackets(result.packets);
    setStatus('loaded');
  };

  const applyError = (error: unknown, fallbackMessage: string, scope: string) => {
    const message = error instanceof PcapFormatError ? error.message : fallbackMessage;
    logger.error(fallbackMessage, error, scope);
    setErrorMessage(message);
    setStatus('error');
  };

  const loadFile = (file: File): void => {
    setStatus('loading');
    setFileInfo(null);
    setPackets([]);
    setErrorMessage(null);

    file
      .arrayBuffer()
      .then((buffer) => {
        window.setTimeout(() => {
          try {
            applyResult(parseCaptureBuffer(buffer, file.name));
          } catch (error) {
            applyError(error, 'Failed to parse this capture file.', 'pcap');
          }
        }, PARSE_DELAY_MS);
      })
      .catch((error) => applyError(error, 'Failed to read this file.', 'pcap'));
  };

  const loadSample = (sample: SampleCapture): void => {
    setStatus('loading');
    setFileInfo(null);
    setPackets([]);
    setErrorMessage(null);

    window.setTimeout(() => {
      try {
        const buffer = buildSampleCaptureBuffer(sample);
        applyResult(parseCaptureBuffer(buffer, `${sample.id}.pcap`));
      } catch (error) {
        applyError(error, 'Failed to generate this sample capture.', 'pcap');
      }
    }, PARSE_DELAY_MS);
  };

  const reset = (): void => {
    setStatus('empty');
    setFileInfo(null);
    setPackets([]);
    setErrorMessage(null);
  };

  return { status, fileInfo, packets, errorMessage, loadFile, loadSample, reset };
}
