import type { GitHubUser } from '@/types/github';
import { UserStats } from './UserStats';
import { UserLinks } from './UserLinks';
import { formatDate } from '@/utils/formatDate';

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-neutral-0 dark:bg-neutral-800 rounded-[15px] shadow-card p-600 md:p-600 p-300">
      {/* Desktop/Tablet Layout */}
      <div className="hidden md:flex gap-400">
        <img
          src={user.avatar_url}
          alt={`${user.name || user.login}'s avatar`}
          className="w-[117px] h-[117px] rounded-full shrink-0"
        />
        <div className="flex-1 flex flex-col gap-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-025">
              <h2 className="font-mono text-preset-1 text-neutral-700 dark:text-white">
                {user.name || user.login}
              </h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-preset-4 text-blue-500 dark:text-blue-300 hover:underline"
              >
                @{user.login}
              </a>
            </div>
            <span className="font-mono text-preset-6 text-neutral-500 dark:text-white">
              Joined {formatDate(user.created_at)}
            </span>
          </div>
          <p className="font-mono text-preset-6 text-neutral-500 dark:text-white opacity-75">
            {user.bio || 'This profile has no bio'}
          </p>
          <UserStats
            repos={user.public_repos}
            followers={user.followers}
            following={user.following}
          />
          <UserLinks
            location={user.location}
            twitter={user.twitter_username}
            blog={user.blog}
            company={user.company}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col gap-300">
        <div className="flex gap-250 items-start">
          <img
            src={user.avatar_url}
            alt={`${user.name || user.login}'s avatar`}
            className="w-[70px] h-[70px] rounded-full shrink-0"
          />
          <div className="flex flex-col gap-050">
            <div className="flex flex-col gap-025">
              <h2 className="font-mono text-preset-1 text-neutral-700 dark:text-white">
                {user.name || user.login}
              </h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-preset-4 text-blue-500 dark:text-blue-300 hover:underline"
              >
                @{user.login}
              </a>
            </div>
            <span className="font-mono text-preset-6 text-neutral-500 dark:text-white">
              Joined {formatDate(user.created_at)}
            </span>
          </div>
        </div>
        <p className="font-mono text-preset-6 text-neutral-500 dark:text-white opacity-75">
          {user.bio || 'This profile has no bio'}
        </p>
        <UserStats
          repos={user.public_repos}
          followers={user.followers}
          following={user.following}
        />
        <UserLinks
          location={user.location}
          twitter={user.twitter_username}
          blog={user.blog}
          company={user.company}
        />
      </div>
    </div>
  );
}
