import { Input } from '@components/shared';

export function IocToolbar({ query, onQueryChange }: { query: string; onQueryChange: (v: string) => void }) {
  return (
    <Input
      placeholder="Search IOCs or tags..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="w-full mb-3"
    />
  );
}
