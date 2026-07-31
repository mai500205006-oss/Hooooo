import { Input } from '@components/shared';

export function ThreatToolbar({ query, onQueryChange }: { query: string; onQueryChange: (v: string) => void }) {
  return (
    <Input
      placeholder="Search threats, actors, malware..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="w-full mb-3"
    />
  );
}
