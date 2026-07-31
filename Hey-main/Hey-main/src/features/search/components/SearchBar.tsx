import { Input } from '@components/shared';

export function SearchBar({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <Input
      autoFocus
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search across everything..."
      className="w-full"
    />
  );
}
