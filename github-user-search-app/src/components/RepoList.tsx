import { useState, useEffect } from 'react';
import type { GitHubRepo } from '@/types/github';
import { fetchUserRepos } from '@/services/githubApi';
import { useAuth } from '@/store/authContext';
import { RepoCard } from './RepoCard';

export function RepoList() {
  const { accessToken } = useAuth();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRepos() {
      if (!accessToken) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchUserRepos(accessToken, 10);
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load repositories');
      } finally {
        setIsLoading(false);
      }
    }

    loadRepos();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-200">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-card p-300 h-[120px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-card p-300">
        <p className="font-mono text-preset-6 text-red-500">{error}</p>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-card p-300">
        <p className="font-mono text-preset-6 text-neutral-500 dark:text-neutral-200">
          No public repositories found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-200">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
