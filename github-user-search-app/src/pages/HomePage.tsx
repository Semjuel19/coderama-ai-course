import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { UserProfile } from '@/components/UserProfile';
import { fetchGitHubUser } from '@/services/githubApi';
import type { GitHubUser } from '@/types/github';

export function HomePage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await fetchGitHubUser(username);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center px-200 md:px-400 lg:px-0 py-400 md:py-500 lg:py-[130px]">
      <div className="w-full max-w-[730px] flex flex-col gap-400 md:gap-500">
        <Header />
        <SearchBar onSearch={handleSearch} isLoading={isLoading} error={error} />
        {user && <UserProfile user={user} />}
      </div>
    </main>
  );
}
