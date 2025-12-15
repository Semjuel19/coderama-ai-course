# PRP: GitHub User Search App (Phase 1)

## Overview

Build a GitHub User Search Dashboard application using React 18.3, TypeScript, Vite, Tailwind CSS, shadcn/ui, Zod, and Axios. The app allows users to search for GitHub users by username and displays their public profile information with full responsive design and dark/light mode support.

**Confidence Score: 8.5/10**

---

## 1. Context & Requirements

### 1.1 Feature Summary

A public page that allows users to:
- Search GitHub users by username
- Display user profile with:
  - Avatar, name, username
  - Bio, location, website
  - Stats: Public Repos | Followers | Following
  - Join date
  - Repos count
- Support dark and light mode
- Fully responsive (Desktop, Tablet, Mobile)

### 1.2 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.x | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 5.x | Build Tool |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | latest | Component Library |
| Zod | 3.x | Schema Validation |
| Axios | 1.x | HTTP Client |

### 1.3 API Endpoint

```
GET https://api.github.com/users/{username}
```

**Response Schema:**
```typescript
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}
```

---

## 2. Design System (from Figma)

### 2.1 Color Palette

#### Neutral Colors
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| neutral-900 | #141D2F | Background (dark) |
| neutral-800 | #1E2A47 | Card background (dark) |
| neutral-700 | #2B3442 | Text primary (light) |
| neutral-500 | #4B6A9B | Text secondary (light) |
| neutral-300 | #697C9A | - |
| neutral-200 | #90A4D4 | Text secondary (dark) |
| neutral-100 | #F6F8FF | Background (light) |
| neutral-0 | #FFFFFF | Card background (light) |

#### Accent Colors
| Token | Value | Usage |
|-------|-------|-------|
| blue-500 | #0079FF | Primary button, links |
| blue-300 | #60ABFF | Button hover, accent (dark) |
| red-500 | #F74646 | Error states |

### 2.2 Typography

**Font Family:** Space Mono (Google Fonts)

| Preset | Size | Weight | Line Height | Letter Spacing | Usage |
|--------|------|--------|-------------|----------------|-------|
| text-preset-1 | 26px | Bold (700) | 1.2 | 0 | Logo, Name |
| text-preset-2 | 22px | Bold (700) | 1.4 | 0 | Stats numbers |
| text-preset-3 | 18px | Regular (400) | 1.4 | 0 | Search input |
| text-preset-3-mobile | 13px | Regular (400) | 1.4 | 0 | Search input (mobile) |
| text-preset-4 | 16px | Regular (400) | 1.5 | 0 | Username |
| text-preset-5 | 16px | Bold (700) | 1.5 | 0 | Button text |
| text-preset-6 | 15px | Regular (400) | 1.5 | 0 | Bio, links |
| text-preset-7 | 13px | Regular (400) | 1.5 | 0 | Stats labels |
| text-preset-8 | 13px | Bold (700) | 1.4 | 2.5px | Theme toggle |

### 2.3 Spacing Scale

| Token | Value |
|-------|-------|
| spacing-0 | 0px |
| spacing-025 | 2px |
| spacing-050 | 4px |
| spacing-075 | 6px |
| spacing-100 | 8px |
| spacing-125 | 10px |
| spacing-150 | 12px |
| spacing-200 | 16px |
| spacing-250 | 20px |
| spacing-300 | 24px |
| spacing-400 | 32px |
| spacing-500 | 40px |
| spacing-600 | 48px |
| spacing-800 | 64px |
| spacing-1000 | 80px |

### 2.4 Border Radius

| Token | Value |
|-------|-------|
| radius-0 | 0px |
| radius-4 | 4px |
| radius-6 | 6px |
| radius-8 | 8px |
| radius-10 | 10px |
| radius-12 | 12px |
| radius-16 | 16px |
| radius-20 | 20px |
| radius-24 | 24px |
| radius-full | 999px |

### 2.5 Shadows

```css
/* Card shadow */
box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.2);

/* Focus ring (light mode) */
box-shadow: 0px 0px 0px 3px #F6F8FF, 0px 0px 0px 5px #0079FF;

/* Focus ring (dark mode) */
box-shadow: 0px 0px 0px 3px #141D2F, 0px 0px 0px 5px #0079FF;
```

### 2.6 Responsive Breakpoints

| Breakpoint | Width | Container Width |
|------------|-------|-----------------|
| Desktop | ≥1440px | 730px |
| Tablet | 768px-1439px | 100% (32px padding) |
| Mobile | <768px | 100% (16px padding) |

---

## 3. Folder Structure

Follow the recommended React 2025 folder structure:

```
/github-user-search-app
├── /public
│   ├── index.html
│   └── favicon.ico
├── /src
│   ├── /assets
│   │   ├── /icons          # SVG icons (search, location, twitter, etc.)
│   │   └── /images
│   ├── /components
│   │   ├── /ui             # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── UserProfile.tsx
│   │   ├── UserStats.tsx
│   │   ├── UserLinks.tsx
│   │   └── ThemeToggle.tsx
│   ├── /hooks
│   │   ├── useTheme.ts
│   │   └── useGitHubUser.ts
│   ├── /layouts
│   │   └── MainLayout.tsx
│   ├── /pages
│   │   └── HomePage.tsx
│   ├── /services
│   │   └── githubApi.ts
│   ├── /store
│   │   └── themeContext.tsx
│   ├── /styles
│   │   └── index.css
│   ├── /types
│   │   └── github.ts
│   ├── /utils
│   │   └── formatDate.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 4. Implementation Tasks

### Phase 1: Project Setup

#### Task 1.1: Initialize Vite Project
```bash
npm create vite@latest github-user-search-app -- --template react-ts
cd github-user-search-app
npm install
```

#### Task 1.2: Install Dependencies
```bash
# Core dependencies
npm install axios zod

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui setup
npm install -D @types/node
npx shadcn@latest init
```

**shadcn/ui init options:**
- Style: Default
- Base color: Slate
- CSS variables: Yes
- Tailwind config: tailwind.config.js
- Components location: @/components
- Utils location: @/lib/utils

#### Task 1.3: Configure Tailwind with Design Tokens

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: '#FFFFFF',
          100: '#F6F8FF',
          200: '#90A4D4',
          300: '#697C9A',
          500: '#4B6A9B',
          700: '#2B3442',
          800: '#1E2A47',
          900: '#141D2F',
        },
        blue: {
          300: '#60ABFF',
          500: '#0079FF',
        },
        red: {
          500: '#F74646',
        },
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'preset-1': ['26px', { lineHeight: '1.2', fontWeight: '700' }],
        'preset-2': ['22px', { lineHeight: '1.4', fontWeight: '700' }],
        'preset-3': ['18px', { lineHeight: '1.4', fontWeight: '400' }],
        'preset-3-mobile': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        'preset-4': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'preset-5': ['16px', { lineHeight: '1.5', fontWeight: '700' }],
        'preset-6': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'preset-7': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'preset-8': ['13px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '2.5px' }],
      },
      spacing: {
        '025': '2px',
        '050': '4px',
        '075': '6px',
        '100': '8px',
        '125': '10px',
        '150': '12px',
        '200': '16px',
        '250': '20px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
        '600': '48px',
        '800': '64px',
        '1000': '80px',
      },
      borderRadius: {
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
      },
      boxShadow: {
        'card': '0px 16px 30px -10px rgba(70, 96, 187, 0.2)',
        'focus-light': '0px 0px 0px 3px #F6F8FF, 0px 0px 0px 5px #0079FF',
        'focus-dark': '0px 0px 0px 3px #141D2F, 0px 0px 0px 5px #0079FF',
      },
    },
  },
  plugins: [],
}
```

#### Task 1.4: Add Google Font

**index.html:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### Phase 2: Core Types & Services

#### Task 2.1: Define Types with Zod

**src/types/github.ts:**
```typescript
import { z } from 'zod';

export const GitHubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  name: z.string().nullable(),
  company: z.string().nullable(),
  blog: z.string(),
  location: z.string().nullable(),
  bio: z.string().nullable(),
  twitter_username: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
});

export type GitHubUser = z.infer<typeof GitHubUserSchema>;

export interface SearchState {
  user: GitHubUser | null;
  isLoading: boolean;
  error: string | null;
}
```

#### Task 2.2: Create API Service

**src/services/githubApi.ts:**
```typescript
import axios, { AxiosError } from 'axios';
import { GitHubUser, GitHubUserSchema } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
    const validatedData = GitHubUserSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new Error('No results');
      }
      throw new Error('Failed to fetch user');
    }
    throw error;
  }
};
```

### Phase 3: Theme System

#### Task 3.1: Create Theme Provider

**src/store/themeContext.tsx:**
```typescript
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### Phase 4: Components

#### Task 4.1: Create Header Component

**src/components/Header.tsx:**
```typescript
import { useTheme } from '@/store/themeContext';
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
```

#### Task 4.2: Create Theme Toggle Component

**src/components/ThemeToggle.tsx:**
```typescript
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
```

#### Task 4.3: Create Search Bar Component

**src/components/SearchBar.tsx:**
```typescript
import { useState, FormEvent } from 'react';
import { SearchIcon } from '@/assets/icons';

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function SearchBar({ onSearch, isLoading, error }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-card h-[69px] pl-300 pr-150 py-100">
        <SearchIcon className="w-6 h-6 text-blue-500 dark:text-blue-300 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub username…"
          className="flex-1 bg-transparent font-mono text-preset-3 md:text-preset-3 text-preset-3-mobile text-neutral-700 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-white/70 outline-none ml-250 md:ml-250 ml-100"
        />
        {error && (
          <span className="font-mono text-preset-5 text-red-500 mr-300 whitespace-nowrap">
            {error}
          </span>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-300 text-white font-mono text-preset-5 px-300 md:px-300 px-250 py-150 rounded-10 transition-colors disabled:opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
}
```

#### Task 4.4: Create User Profile Component

**src/components/UserProfile.tsx:**
```typescript
import { GitHubUser } from '@/types/github';
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
```

#### Task 4.5: Create User Stats Component

**src/components/UserStats.tsx:**
```typescript
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
```

#### Task 4.6: Create User Links Component

**src/components/UserLinks.tsx:**
```typescript
import { LocationIcon, TwitterIcon, LinkIcon, CompanyIcon } from '@/assets/icons';

interface UserLinksProps {
  location: string | null;
  twitter: string | null;
  blog: string;
  company: string | null;
}

export function UserLinks({ location, twitter, blog, company }: UserLinksProps) {
  const linkClass = (available: boolean) =>
    `flex items-center gap-200 font-mono text-preset-6 ${
      available
        ? 'text-neutral-500 dark:text-white'
        : 'text-neutral-500 dark:text-white opacity-50'
    }`;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-200">
      <div className={linkClass(!!location)}>
        <LocationIcon className="w-5 h-5 shrink-0" />
        <span>{location || 'Not Available'}</span>
      </div>
      <div className={linkClass(!!twitter)}>
        <TwitterIcon className="w-5 h-5 shrink-0" />
        {twitter ? (
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            @{twitter}
          </a>
        ) : (
          <span>Not Available</span>
        )}
      </div>
      <div className={linkClass(!!blog)}>
        <LinkIcon className="w-5 h-5 shrink-0" />
        {blog ? (
          <a
            href={blog.startsWith('http') ? blog : `https://${blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline truncate"
          >
            {blog}
          </a>
        ) : (
          <span>Not Available</span>
        )}
      </div>
      <div className={linkClass(!!company)}>
        <CompanyIcon className="w-5 h-5 shrink-0" />
        <span>{company || 'Not Available'}</span>
      </div>
    </div>
  );
}
```

### Phase 5: Icons

#### Task 5.1: Create SVG Icon Components

**src/assets/icons/index.tsx:**
```typescript
export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6087 0C4.7591 0 0 4.7591 0 10.6087C0 16.4583 4.7591 21.2174 10.6087 21.2174C13.2128 21.2174 15.5978 20.2965 17.4563 18.7696L22.575 23.8883C22.9397 24.253 23.5303 24.253 23.895 23.8883C24.2597 23.5236 24.2597 22.933 23.895 22.5683L18.7763 17.4496C20.3032 15.5911 21.2174 13.2061 21.2174 10.6087C21.2174 4.7591 16.4583 0 10.6087 0ZM2.08696 10.6087C2.08696 5.91052 5.91052 2.08696 10.6087 2.08696C15.3069 2.08696 19.1304 5.91052 19.1304 10.6087C19.1304 15.3069 15.3069 19.1304 10.6087 19.1304C5.91052 19.1304 2.08696 15.3069 2.08696 10.6087Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0C3.13401 0 0 3.13401 0 7C0 10.866 7 20 7 20C7 20 14 10.866 14 7C14 3.13401 10.866 0 7 0ZM7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 2.79875C19.2563 3.125 18.4637 3.34125 17.6375 3.44625C18.4875 2.93875 19.1363 2.14125 19.4412 1.18C18.6488 1.6525 17.7738 1.98625 16.8412 2.1725C16.0887 1.37125 15.0162 0.875 13.8462 0.875C11.5763 0.875 9.74875 2.7175 9.74875 4.97625C9.74875 5.30125 9.77625 5.61375 9.84375 5.91125C6.435 5.745 3.41875 4.11125 1.3925 1.6225C1.03875 2.23625 0.83125 2.93875 0.83125 3.695C0.83125 5.115 1.5625 6.37375 2.6525 7.1025C1.99375 7.09 1.3475 6.89875 0.8 6.5975V6.6475C0.8 8.63 2.22125 10.2775 4.085 10.6562C3.75125 10.7487 3.3875 10.7925 3.01 10.7925C2.7475 10.7925 2.4825 10.7787 2.23375 10.7263C2.765 12.35 4.2725 13.5538 6.065 13.5925C4.67 14.6838 2.89875 15.3412 0.98125 15.3412C0.645 15.3412 0.3225 15.3275 0 15.2887C1.81625 16.4562 3.96875 17.125 6.29 17.125C13.835 17.125 17.96 10.875 17.96 5.4575C17.96 5.27625 17.9538 5.10125 17.945 4.9275C18.7588 4.35 19.4425 3.62875 20 2.79875Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.40416 5.01207C5.04862 7.44921 5.04862 11.4066 7.40416 13.8438C7.77618 14.2273 8.38262 14.2273 8.75464 13.8438C9.12667 13.4602 9.12667 12.8348 8.75464 12.4513C7.14296 10.7894 7.14296 8.06641 8.75464 6.40453L12.1 3.00672C13.7117 1.34484 16.3611 1.34484 17.9728 3.00672C19.5845 4.66861 19.5845 7.39158 17.9728 9.05765L16.2684 10.7988C16.2386 11.0858 16.1791 11.3727 16.0899 11.6597C15.9114 12.2337 15.6435 12.7781 15.2863 13.2734C15.5765 13.1663 15.8667 13.0296 16.1272 12.8633L16.1569 12.8337L18.9165 10.0023C21.2721 7.56515 21.2721 3.60777 18.9165 1.17063C16.561 -1.26651 12.6923 -1.26651 10.3368 1.17063L7.40416 5.01207Z"
        fill="currentColor"
      />
      <path
        d="M13.439 6.15625C13.067 5.77269 12.4606 5.77269 12.0885 6.15625C11.7165 6.5398 11.7165 7.16516 12.0885 7.54872C13.7002 9.21061 13.7002 11.9336 12.0885 13.5955L8.66361 17.0229C7.05765 18.6789 4.40826 18.6789 2.80231 17.0229C1.19635 15.3669 1.19635 12.6439 2.80231 10.9761L4.50673 9.23494C4.53651 8.94795 4.59606 8.66096 4.68539 8.37397C4.86389 7.79999 5.13178 7.25565 5.48901 6.76022C5.19879 6.86732 4.90856 7.00405 4.64812 7.17042L4.61834 7.20006L1.85871 10.0315C-0.496903 12.4686 -0.496903 16.426 1.85871 18.8631C4.21432 21.3003 8.08295 21.3003 10.4386 18.8631L13.439 14.9882C15.7945 12.5765 15.7945 8.59343 13.439 6.15625Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CompanyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8583 1.55835L1.7 0.166687C1.275 0.100021 0.841666 0.216688 0.516666 0.491688C0.191666 0.775021 0 1.18335 0 1.60835V19.1667C0 19.625 0.375 20 0.833333 20H3.54166V15.625C3.54166 14.8167 4.19166 14.1667 5 14.1667H7.08333C7.89166 14.1667 8.54166 14.8167 8.54166 15.625V20H12.0833V3.00002C12.0833 2.28335 11.5667 1.67502 10.8583 1.55835ZM4.58333 12.2917H3.33333C2.87499 12.2917 2.49999 11.9167 2.49999 11.4583C2.49999 11 2.87499 10.625 3.33333 10.625H4.58333C5.04166 10.625 5.41666 11 5.41666 11.4583C5.41666 11.9167 5.04166 12.2917 4.58333 12.2917ZM3.33333 9.16668H4.58333C5.04166 9.16668 5.41666 8.79168 5.41666 8.33335C5.41666 7.87502 5.04166 7.50002 4.58333 7.50002H3.33333C2.87499 7.50002 2.49999 7.87502 2.49999 8.33335C2.49999 8.79168 2.87499 9.16668 3.33333 9.16668ZM4.58333 6.04168H3.33333C2.87499 6.04168 2.49999 5.66668 2.49999 5.20835C2.49999 4.75002 2.87499 4.37502 3.33333 4.37502H4.58333C5.04166 4.37502 5.41666 4.75002 5.41666 5.20835C5.41666 5.66668 5.04166 6.04168 4.58333 6.04168ZM8.74999 12.2917H7.49999C7.04166 12.2917 6.66666 11.9167 6.66666 11.4583C6.66666 11 7.04166 10.625 7.49999 10.625H8.74999C9.20833 10.625 9.58333 11 9.58333 11.4583C9.58333 11.9167 9.20833 12.2917 8.74999 12.2917ZM7.49999 9.16668H8.74999C9.20833 9.16668 9.58333 8.79168 9.58333 8.33335C9.58333 7.87502 9.20833 7.50002 8.74999 7.50002H7.49999C7.04166 7.50002 6.66666 7.87502 6.66666 8.33335C6.66666 8.79168 7.04166 9.16668 7.49999 9.16668ZM8.74999 6.04168H7.49999C7.04166 6.04168 6.66666 5.66668 6.66666 5.20835C6.66666 4.75002 7.04166 4.37502 7.49999 4.37502H8.74999C9.20833 4.37502 9.58333 4.75002 9.58333 5.20835C9.58333 5.66668 9.20833 6.04168 8.74999 6.04168Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9166 7.79169L18.85 9.03335C19.5308 9.17502 20 9.77502 20 10.4667V19.1667C20 19.625 19.625 20 19.1666 20H12.9166V7.79169ZM15.8333 17.5H17.0833C17.5416 17.5 17.9166 17.125 17.9166 16.6667C17.9166 16.2084 17.5416 15.8334 17.0833 15.8334H15.8333C15.375 15.8334 15 16.2084 15 16.6667C15 17.125 15.375 17.5 15.8333 17.5ZM17.0833 14.375H15.8333C15.375 14.375 15 14 15 13.5417C15 13.0834 15.375 12.7084 15.8333 12.7084H17.0833C17.5416 12.7084 17.9166 13.0834 17.9166 13.5417C17.9166 14 17.5416 14.375 17.0833 14.375Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.5133 11.3967C19.3087 11.3453 19.0982 11.4181 18.9615 11.5846C18.2782 12.4182 17.4348 13.1002 16.4757 13.5973C15.4818 14.1116 14.3916 14.3778 13.2759 14.3778C12.1602 14.3778 11.07 14.1116 10.0761 13.5973C9.11702 13.1002 8.27361 12.4182 7.59032 11.5846C6.88988 10.7295 6.37635 9.74758 6.07501 8.68877C5.76224 7.59281 5.68256 6.44973 5.84115 5.32094C5.99974 4.19215 6.39349 3.11905 7.00131 2.15712C7.59032 1.22376 8.36231 0.418704 9.27289 -0.214844C9.43148 -0.324219 9.50544 -0.519531 9.46258 -0.706055C9.41972 -0.892578 9.26684 -1.03867 9.07682 -1.07578C8.04007 -1.28252 6.97475 -1.30109 5.92086 -1.13027C4.83268 -0.954883 3.79593 -0.579102 2.84821 -0.0219727C1.93192 0.517578 1.11707 1.21233 0.450066 2.03882C-0.234655 2.88818 -0.754326 3.85011 -1.08424 4.88633C-1.42559 5.95685 -1.56704 7.08564 -1.49879 8.21443C-1.43054 9.34322 -1.15206 10.4377 -0.678241 11.4511C-0.187139 12.5045 0.496209 13.4493 1.34533 14.2415C2.22302 15.0594 3.24834 15.7027 4.37366 16.1312C5.53612 16.5769 6.78145 16.7922 8.03821 16.7665C9.29497 16.7408 10.5289 16.4746 11.6714 15.9861C12.7796 15.5147 13.7788 14.8371 14.6222 13.9877C15.4371 13.1698 16.0963 12.2022 16.5587 11.1374C16.6327 10.9649 16.5873 10.7667 16.4448 10.6402C16.3023 10.5137 16.0963 10.4781 15.9148 10.5466C15.0143 10.8814 14.0609 11.0539 13.0961 11.0539C12.1313 11.0539 11.1779 10.8814 10.2774 10.5466C9.41401 10.2289 8.62059 9.75615 7.93159 9.14912C7.26459 8.56066 6.71392 7.85162 6.30874 7.05371C5.88642 6.22151 5.62508 5.31523 5.53969 4.38187C5.45431 3.44851 5.54541 2.50658 5.80675 1.60887C5.85532 1.43805 5.79278 1.25703 5.64562 1.14766C5.49846 1.03828 5.29701 1.02114 5.13271 1.10479C4.14882 1.60887 3.27684 2.29506 2.55926 3.12155C1.85882 3.92803 1.31386 4.85282 0.948506 5.85189C0.571437 6.88811 0.394133 7.98407 0.428996 9.08003C0.463859 10.176 0.710343 11.2548 1.15552 12.2539C1.61784 13.2872 2.27341 14.2149 3.08255 14.9985C3.92025 15.8078 4.90414 16.4511 5.98089 16.8882C7.09478 17.3409 8.29154 17.5733 9.49973 17.5733C10.7079 17.5733 11.9047 17.3409 13.0186 16.8882C14.0953 16.4511 15.0792 15.8078 15.9169 14.9985C16.726 14.2149 17.3816 13.2872 17.8439 12.2539C17.9179 12.0831 17.8725 11.8849 17.73 11.7584C17.5875 11.6319 17.3803 11.5961 17.1988 11.6797C16.2983 12.0145 15.3449 12.187 14.3801 12.187C13.4153 12.187 12.4619 12.0145 11.5614 11.6797C10.698 11.362 9.90459 10.8893 9.21559 10.2823C8.54859 9.69384 7.99792 8.9848 7.59274 8.18689C7.17042 7.35469 6.90908 6.44841 6.82369 5.51505C6.73831 4.58169 6.82941 3.63976 7.09075 2.74205C7.13932 2.57123 7.07678 2.39021 6.92962 2.28084C6.78246 2.17146 6.58101 2.15432 6.41671 2.23797C5.43282 2.74205 4.56084 3.42824 3.84326 4.25473C3.14282 5.06121 2.59786 5.986 2.23251 6.98507C1.85544 8.02129 1.67814 9.11725 1.713 10.2132C1.74786 11.3092 1.99435 12.388 2.43952 13.3871C2.90184 14.4204 3.55741 15.3481 4.36655 16.1317C5.20425 16.941 6.18814 17.5843 7.26489 18.0214C8.37878 18.4741 9.57554 18.7065 10.7837 18.7065C11.9919 18.7065 13.1887 18.4741 14.3026 18.0214C15.3793 17.5843 16.3632 16.941 17.2009 16.1317C18.01 15.3481 18.6656 14.4204 19.1279 13.3871C19.5902 12.388 19.8367 11.3092 19.8716 10.2132C19.8773 10.0167 19.7348 9.84588 19.5419 9.80877L19.5133 11.3967Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path
          d="M10 14.1667C12.3012 14.1667 14.1667 12.3012 14.1667 10C14.1667 7.69882 12.3012 5.83334 10 5.83334C7.69882 5.83334 5.83334 7.69882 5.83334 10C5.83334 12.3012 7.69882 14.1667 10 14.1667Z"
          fill="currentColor"
        />
        <path
          d="M10 0.833344C10.4602 0.833344 10.8333 1.20644 10.8333 1.66668V3.33334C10.8333 3.79358 10.4602 4.16668 10 4.16668C9.53977 4.16668 9.16668 3.79358 9.16668 3.33334V1.66668C9.16668 1.20644 9.53977 0.833344 10 0.833344Z"
          fill="currentColor"
        />
        <path
          d="M10 15.8333C10.4602 15.8333 10.8333 16.2064 10.8333 16.6667V18.3333C10.8333 18.7936 10.4602 19.1667 10 19.1667C9.53977 19.1667 9.16668 18.7936 9.16668 18.3333V16.6667C9.16668 16.2064 9.53977 15.8333 10 15.8333Z"
          fill="currentColor"
        />
        <path
          d="M2.92893 2.92893C3.25437 2.6035 3.78201 2.6035 4.10744 2.92893L5.28595 4.10744C5.61139 4.43288 5.61139 4.96052 5.28595 5.28595C4.96052 5.61139 4.43288 5.61139 4.10744 5.28595L2.92893 4.10744C2.6035 3.78201 2.6035 3.25437 2.92893 2.92893Z"
          fill="currentColor"
        />
        <path
          d="M14.714 14.714C15.0395 14.3886 15.5671 14.3886 15.8926 14.714L17.0711 15.8926C17.3965 16.218 17.3965 16.7456 17.0711 17.0711C16.7456 17.3965 16.218 17.3965 15.8926 17.0711L14.714 15.8926C14.3886 15.5671 14.3886 15.0395 14.714 14.714Z"
          fill="currentColor"
        />
        <path
          d="M0.833344 10C0.833344 9.53977 1.20644 9.16668 1.66668 9.16668H3.33334C3.79358 9.16668 4.16668 9.53977 4.16668 10C4.16668 10.4602 3.79358 10.8333 3.33334 10.8333H1.66668C1.20644 10.8333 0.833344 10.4602 0.833344 10Z"
          fill="currentColor"
        />
        <path
          d="M15.8333 10C15.8333 9.53977 16.2064 9.16668 16.6667 9.16668H18.3333C18.7936 9.16668 19.1667 9.53977 19.1667 10C19.1667 10.4602 18.7936 10.8333 18.3333 10.8333H16.6667C16.2064 10.8333 15.8333 10.4602 15.8333 10Z"
          fill="currentColor"
        />
        <path
          d="M5.28595 14.714C5.61139 15.0395 5.61139 15.5671 5.28595 15.8926L4.10744 17.0711C3.78201 17.3965 3.25437 17.3965 2.92893 17.0711C2.6035 16.7456 2.6035 16.218 2.92893 15.8926L4.10744 14.714C4.43288 14.3886 4.96052 14.3886 5.28595 14.714Z"
          fill="currentColor"
        />
        <path
          d="M17.0711 2.92893C17.3965 3.25437 17.3965 3.78201 17.0711 4.10744L15.8926 5.28595C15.5671 5.61139 15.0395 5.61139 14.714 5.28595C14.3886 4.96052 14.3886 4.43288 14.714 4.10744L15.8926 2.92893C16.218 2.6035 16.7456 2.6035 17.0711 2.92893Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
```

### Phase 6: Utilities

#### Task 6.1: Create Date Formatter

**src/utils/formatDate.ts:**
```typescript
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
```

### Phase 7: Main App Assembly

#### Task 7.1: Create Home Page

**src/pages/HomePage.tsx:**
```typescript
import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { UserProfile } from '@/components/UserProfile';
import { fetchGitHubUser } from '@/services/githubApi';
import { GitHubUser } from '@/types/github';

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
```

#### Task 7.2: Update App.tsx

**src/App.tsx:**
```typescript
import { ThemeProvider } from '@/store/themeContext';
import { HomePage } from '@/pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
```

#### Task 7.3: Update main.tsx

**src/main.tsx:**
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### Task 7.4: Update Global Styles

**src/styles/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply box-border;
  }
  
  body {
    @apply font-mono antialiased;
  }
}
```

---

## 5. Validation Gates

### 5.1 Build Validation
```bash
npm run build
# Must complete without errors
```

### 5.2 Type Checking
```bash
npx tsc --noEmit
# Must pass with no type errors
```

### 5.3 Lint Validation
```bash
npm run lint
# Must pass with no errors
```

### 5.4 Manual Testing Checklist

- [ ] Search for "octocat" - should display profile
- [ ] Search for "nonexistentuser12345" - should show "No results" error
- [ ] Toggle dark/light mode - should persist on refresh
- [ ] Test responsive design at 375px, 768px, 1440px widths
- [ ] Verify all links open in new tab
- [ ] Check "Not Available" displays for missing data
- [ ] Verify avatar loads correctly
- [ ] Test keyboard navigation (Tab, Enter)

---

## 6. Error Handling Strategy

### 6.1 API Errors
- 404: Display "No results" inline in search bar
- Network errors: Display generic error message
- Rate limiting: Display appropriate message

### 6.2 Loading States
- Show disabled button during search
- Maintain previous results until new search completes

### 6.3 Empty States
- Show placeholder text for missing bio
- Show "Not Available" for missing links
- Handle null/undefined gracefully

---

## 7. Documentation References

### Official Documentation
- React 18: https://react.dev/
- Vite: https://vite.dev/guide/
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com/docs
- Zod: https://zod.dev/
- Axios: https://axios-http.com/docs/intro

### GitHub API
- Users endpoint: https://docs.github.com/en/rest/users/users#get-a-user

### Design Reference
- Figma Design System: https://www.figma.com/design/f6VpvlfuYvOTlaanXb46ir/github-user-search-app

---

## 8. Gotchas & Considerations

### 8.1 GitHub API Rate Limiting
- Unauthenticated requests: 60 requests/hour
- Consider adding rate limit handling for production

### 8.2 Tailwind Dark Mode
- Uses `class` strategy (not `media`)
- Requires manual class toggle on `<html>` element

### 8.3 Space Mono Font
- Must be loaded from Google Fonts
- Ensure font weights 400 and 700 are included

### 8.4 shadcn/ui Customization
- Components are copied to your project
- Customize in `src/components/ui/`
- May need to adjust for design system colors

### 8.5 TypeScript Path Aliases
- Configure `@/` alias in both `tsconfig.json` and `vite.config.ts`
- Required for clean imports

---

## 9. Success Criteria

1. ✅ Project builds without errors
2. ✅ TypeScript compiles without errors
3. ✅ Search functionality works with GitHub API
4. ✅ User profile displays all required information
5. ✅ Dark/light mode toggle works and persists
6. ✅ Responsive design matches Figma at all breakpoints
7. ✅ Error states display correctly
8. ✅ Loading states are handled
9. ✅ Accessibility: keyboard navigation works
10. ✅ Design tokens match Figma specifications

---

**PRP Confidence Score: 8.5/10**

*Reasoning: High confidence due to comprehensive Figma design context, clear API requirements, and well-documented tech stack. Minor uncertainty around exact pixel-perfect implementation without direct Figma access during development.*
