import { Header } from '@/components/Header';
import { RepoList } from '@/components/RepoList';
import { useAuth } from '@/store/authContext';
import { Link } from 'react-router';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center px-200 md:px-400 lg:px-0 py-400 md:py-500 lg:py-[130px]">
      <div className="w-full max-w-[730px] flex flex-col gap-400 md:gap-500">
        <Header />
        
        {/* User Info Section */}
        <div className="bg-neutral-0 dark:bg-neutral-800 rounded-[15px] shadow-card p-300 md:p-600">
          <div className="flex items-center gap-300">
            <img
              src={user?.avatar_url}
              alt={`${user?.login}'s avatar`}
              className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full"
            />
            <div className="flex flex-col gap-050">
              <h1 className="font-mono text-preset-1 text-neutral-700 dark:text-white">
                {user?.name || user?.login}
              </h1>
              <a
                href={user?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-preset-4 text-blue-500 dark:text-blue-300 hover:underline"
              >
                @{user?.login}
              </a>
            </div>
          </div>
        </div>

        {/* Repos Section */}
        <div className="flex flex-col gap-300">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-preset-2 text-neutral-700 dark:text-white">
              Public Repositories
            </h2>
            <span className="font-mono text-preset-7 text-neutral-500 dark:text-neutral-200">
              Top 10 (recently updated)
            </span>
          </div>
          <RepoList />
        </div>

        {/* Back Link */}
        <Link
          to="/"
          className="font-mono text-preset-6 text-blue-500 dark:text-blue-300 hover:underline"
        >
          &larr; Back to search
        </Link>
      </div>
    </main>
  );
}
