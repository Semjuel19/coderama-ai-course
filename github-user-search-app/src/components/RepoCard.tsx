import type { GitHubRepo } from '@/types/github';
import { StarIcon } from '@/assets/icons';
import { formatDate } from '@/utils/formatDate';

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-card p-300 flex flex-col gap-200">
      <div className="flex items-start justify-between gap-200">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-preset-5 text-blue-500 dark:text-blue-300 hover:underline truncate"
        >
          {repo.name}
        </a>
        <div className="flex items-center gap-100 shrink-0">
          <StarIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-200" />
          <span className="font-mono text-preset-7 text-neutral-500 dark:text-neutral-200">
            {repo.stargazers_count}
          </span>
        </div>
      </div>
      
      {repo.description && (
        <p className="font-mono text-preset-7 text-neutral-500 dark:text-white opacity-75 line-clamp-2">
          {repo.description}
        </p>
      )}
      
      <div className="flex items-center gap-300 flex-wrap">
        {repo.language && (
          <div className="flex items-center gap-100">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="font-mono text-preset-7 text-neutral-500 dark:text-neutral-200">
              {repo.language}
            </span>
          </div>
        )}
        <span className="font-mono text-preset-7 text-neutral-500 dark:text-neutral-200">
          Updated {formatDate(repo.updated_at)}
        </span>
      </div>
    </div>
  );
}
