import { ThemeToggle } from './ThemeToggle';
import { AuthButton } from './AuthButton';
import { Link } from 'react-router';

export function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      <Link to="/" className="font-mono text-preset-1 text-neutral-900 dark:text-white hover:opacity-80 transition-opacity">
        devfinder
      </Link>
      <div className="flex items-center gap-300">
        <ThemeToggle />
        <AuthButton />
      </div>
    </header>
  );
}
