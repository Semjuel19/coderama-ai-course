import { useTheme } from '@/store/themeContext';
import { SunIcon, MoonIcon } from '@/assets/icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-200 group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="font-mono text-preset-8 uppercase tracking-[2.5px] text-neutral-500 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5 text-neutral-200 group-hover:text-neutral-100" />
      ) : (
        <MoonIcon className="w-5 h-5 text-neutral-500 group-hover:text-neutral-900" />
      )}
    </button>
  );
}
