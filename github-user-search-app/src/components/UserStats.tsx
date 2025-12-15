interface UserStatsProps {
  repos: number;
  followers: number;
  following: number;
}

export function UserStats({ repos, followers, following }: UserStatsProps) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-10 px-400 md:px-400 px-250 py-200 flex md:flex-row flex-col md:justify-between gap-200">
      <div className="flex flex-col gap-050">
        <span className="font-mono text-preset-7 text-neutral-500 dark:text-white">
          Repos
        </span>
        <span className="font-mono text-preset-2 text-neutral-700 dark:text-white">
          {repos}
        </span>
      </div>
      <div className="flex flex-col gap-050">
        <span className="font-mono text-preset-7 text-neutral-500 dark:text-white">
          Followers
        </span>
        <span className="font-mono text-preset-2 text-neutral-700 dark:text-white">
          {followers}
        </span>
      </div>
      <div className="flex flex-col gap-050">
        <span className="font-mono text-preset-7 text-neutral-500 dark:text-white">
          Following
        </span>
        <span className="font-mono text-preset-2 text-neutral-700 dark:text-white">
          {following}
        </span>
      </div>
    </div>
  );
}
