import { Input } from '@components/shared';

export function PacketSearchBar({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <Input
      placeholder="Search IP, port, protocol, info..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="w-full"
    />
  );
}
