import { useRef, type ChangeEvent } from 'react';
import { Button, Card } from '@components/shared';

export function UploadPanel({ onSelect }: { onSelect: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelect(file);
    e.target.value = '';
  };

  return (
    <Card className="text-center py-10">
      <p className="text-rk-text text-sm mb-1">Upload a packet capture</p>
      <p className="text-rk-muted text-xs mb-4">.pcap فقط (مش .pcapng) — التحليل بيحصل فعليًا في المتصفح، مفيش رفع لأي سيرفر</p>
      <Button onClick={() => inputRef.current?.click()}>Choose File</Button>
      <input ref={inputRef} type="file" accept=".pcap" className="hidden" onChange={handleChange} />
    </Card>
  );
}
