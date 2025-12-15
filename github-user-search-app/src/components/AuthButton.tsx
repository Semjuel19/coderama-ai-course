import { useAuth } from '@/store/authContext';
import { GitHubIcon } from '@/assets/icons';
import { Link } from 'react-router';

export function AuthButton() {
  const { isAuthenticated, isLoading, login, logout, user } = useAuth();

  if (isLoading) {
    return (
      <div className="w-[140px] h-[40px] bg-neutral-200 dark:bg-neutral-700 rounded-10 animate-pulse" />
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-200">
        <Link
          to="/profile"
          className="flex items-center gap-150"
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-mono text-preset-7 text-neutral-700 dark:text-white hidden sm:inline">
            {user.login}
          </span>
        </Link>
        <button
          onClick={logout}
          className="font-mono text-preset-7 text-neutral-500 dark:text-neutral-200 hover:text-red-500 dark:hover:text-red-500 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="flex items-center gap-150 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-preset-7 px-200 py-100 rounded-10 hover:opacity-80 transition-opacity"
    >
      <GitHubIcon className="w-5 h-5" />
      <span className="hidden sm:inline">Sign in with GitHub</span>
      <span className="sm:hidden">Sign in</span>
    </button>
  );
}
