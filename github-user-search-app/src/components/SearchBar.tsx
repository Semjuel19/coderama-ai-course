import { useState } from 'react';
import type { FormEvent } from 'react';
import { SearchIcon } from '@/assets/icons';

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function SearchBar({ onSearch, isLoading, error }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-card h-[69px] pl-300 pr-150 py-100">
        <SearchIcon className="w-6 h-6 text-blue-500 dark:text-blue-300 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub username…"
          className="flex-1 bg-transparent font-mono text-preset-3 md:text-preset-3 text-preset-3-mobile text-neutral-700 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-white/70 outline-none ml-250 md:ml-250 ml-100"
        />
        {error && (
          <span className="font-mono text-preset-5 text-red-500 mr-300 whitespace-nowrap">
            {error}
          </span>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-300 text-white font-mono text-preset-5 px-300 md:px-300 px-250 py-150 rounded-10 transition-colors disabled:opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
}
