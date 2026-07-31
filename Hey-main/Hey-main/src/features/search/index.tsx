import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useNavigate } from 'react-router-dom';
import { useGlobalSearch } from './useGlobalSearch';
import { SearchBar } from './components/SearchBar';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ResultsList } from './components/ResultsList';

registerPlugin({ id: 'search', name: 'Global Search', version: '0.1.0', slot: 'main' });

export function SearchPage() {
  const { isLoading, query, setQuery, category, setCategory, categories, results } =
    useGlobalSearch();
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader title="Global Search" subtitle="Search across investigations, notes, cases, and more" />

      {isLoading ? (
        <LoadingSpinner label="Building search index..." />
      ) : (
        <div className="space-y-3">
          <SearchBar query={query} onQueryChange={setQuery} />
          <CategoryFilterBar categories={categories} active={category} onChange={setCategory} />
          <ResultsList results={results} onOpen={(path) => navigate(path)} />
        </div>
      )}
    </div>
  );
}
