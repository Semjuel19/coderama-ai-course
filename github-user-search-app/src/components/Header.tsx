import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="flex items-center justify-between w-full">
      <h1 className="font-mono text-preset-1 text-neutral-900 dark:text-white">
        devfinder
      </h1>
      <ThemeToggle />
    </header>
  );
}
