# PRP: GitHub OAuth Integration (Phase 2)

## Overview

Integrate GitHub OAuth authentication flow into the existing GitHub User Search App. This includes implementing a "Sign in with GitHub" button in the navbar, session management (login/logout), protected routes, and a user profile page displaying the authenticated user's top 10 public repositories.

**Confidence Score: 8.5/10**

*Reasoning: Complete implementation plan with Express backend for token exchange. Frontend implementation is well-defined with clear patterns from existing codebase. Comprehensive configuration guide ensures proper setup.*

---

## 1. Context & Requirements

### 1.1 Feature Summary

Implement GitHub OAuth authentication with:
- **Navbar Enhancement**: Add "Sign in with GitHub" button (right-aligned)
- **OAuth Flow**: Complete web application flow with GitHub
- **Session Management**: Login/logout functionality with state persistence
- **Authenticated State UI**: Display user avatar, username, and logout button
- **Protected Route**: `/profile` page accessible only when authenticated
- **Profile Page Content**:
  - User's top 10 public repositories with:
    - Repo name (link to GitHub)
    - Description
    - Stars count
    - Primary language
    - Last updated date

### 1.2 Tech Stack Additions

| Technology | Version | Purpose |
|------------|---------|---------|
| react-router | ^7.x | Client-side routing |
| (existing) axios | ^1.13.x | HTTP requests |
| (existing) zod | ^4.x | Schema validation |

### 1.3 GitHub OAuth Flow

**Documentation Reference**: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

#### Web Application Flow Steps:
1. **Redirect to GitHub**: `GET https://github.com/login/oauth/authorize`
   - Required params: `client_id`, `redirect_uri`, `scope`, `state`
2. **GitHub Callback**: User redirected back with `code` and `state`
3. **Exchange Code for Token**: `POST https://github.com/login/oauth/access_token`
   - **CRITICAL**: This must happen server-side (client_secret required)
4. **Use Token**: Access GitHub API with `Authorization: Bearer TOKEN`

#### Required OAuth Scopes
**Documentation Reference**: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps

```
read:user    - Read user profile data
repo         - Access to public repos (for listing)
```

**Note**: For public repos only, `public_repo` scope is sufficient. If only reading user profile, `read:user` is enough.

### 1.4 API Endpoints

#### Get Authenticated User
```
GET https://api.github.com/user
Authorization: Bearer {access_token}
```

#### Get User's Repositories
```
GET https://api.github.com/user/repos?sort=updated&per_page=10&type=public
Authorization: Bearer {access_token}
```

**Response Schema for Repos:**
```typescript
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  private: boolean;
}
```

---

## 2. Architecture Decision: Express Backend

### 2.1 The Problem

GitHub OAuth requires `client_secret` for token exchange. This **cannot** be exposed in frontend code.

### 2.2 Solution: Simple Express Backend

This PRP uses a **simple Express backend** to handle OAuth token exchange securely. The backend will:
- Accept authorization code from frontend
- Exchange code for access token using client_secret
- Return access token to frontend

**Architecture:**
```
Frontend (React) <---> Express Server <---> GitHub OAuth API
     ↓                        ↓
Port 5173              Port 3001
```

### 2.3 Environment Variables

Two separate environment files are needed:

**Frontend: `github-user-search-app/.env`**
```env
VITE_GITHUB_CLIENT_ID=your_client_id_here
VITE_REDIRECT_URI=http://localhost:5173/callback
```

**Backend: `server/.env`**
```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
PORT=3001
```

---

## 3. Configuration Setup Guide

### 3.1 Step-by-Step Configuration Process

Follow these steps **before starting implementation** to set up all required credentials and configuration.

---

#### Step 1: Create GitHub OAuth Application

1. **Navigate to GitHub Developer Settings**
   - Go to: https://github.com/settings/developers
   - Click "OAuth Apps" in the left sidebar
   - Click "New OAuth App" button

2. **Fill in Application Details**
   ```
   Application name: DevFinder (or your preferred name)
   Homepage URL: http://localhost:5173
   Application description: GitHub User Search Application with OAuth
   Authorization callback URL: http://localhost:5173/callback
   ```

3. **Create the Application**
   - Click "Register application"
   - You'll be redirected to your new OAuth App page

4. **Copy Your Credentials**
   - **Client ID**: Copy this value (visible immediately)
   - **Client Secret**: Click "Generate a new client secret"
     - ⚠️ **CRITICAL**: Copy this immediately - you won't see it again!
     - If lost, generate a new one

5. **Store Credentials Securely**
   - Save in a password manager or secure note
   - Never commit these to version control
   - Never share client secret publicly

---

#### Step 2: Configure Frontend Environment

1. **Navigate to Frontend Directory**
   ```bash
   cd github-user-search-app
   ```

2. **Create Frontend `.env` File**
   ```bash
   touch .env
   ```

3. **Add Environment Variables**
   
   Open `.env` and add:
   ```env
   # GitHub OAuth Configuration
   VITE_GITHUB_CLIENT_ID=your_client_id_from_step_1
   VITE_REDIRECT_URI=http://localhost:5173/callback
   ```

4. **Replace Placeholder Values**
   - Replace `your_client_id_from_step_1` with actual Client ID from Step 1
   - Keep the exact format (no quotes needed)

5. **Verify `.gitignore` Includes `.env`**
   
   Check `github-user-search-app/.gitignore` contains:
   ```
   .env
   .env.local
   .env.*.local
   ```

---

#### Step 3: Configure Backend Environment

1. **Create Backend Directory**
   ```bash
   cd ..  # Back to project root
   mkdir -p server
   cd server
   ```

2. **Initialize Backend Project**
   ```bash
   npm init -y
   ```

3. **Install Backend Dependencies**
   ```bash
   npm install express cors axios dotenv
   ```

4. **Create Backend `.env` File**
   ```bash
   touch .env
   ```

5. **Add Backend Environment Variables**
   
   Open `server/.env` and add:
   ```env
   # GitHub OAuth Configuration
   GITHUB_CLIENT_ID=your_client_id_from_step_1
   GITHUB_CLIENT_SECRET=your_client_secret_from_step_1
   
   # Server Configuration
   PORT=3001
   NODE_ENV=development
   
   # CORS Configuration (Frontend URL)
   FRONTEND_URL=http://localhost:5173
   ```

6. **Replace Placeholder Values**
   - `GITHUB_CLIENT_ID`: Same value as frontend
   - `GITHUB_CLIENT_SECRET`: Secret from Step 1
   - Keep other values as shown

7. **Create Backend `.gitignore`**
   ```bash
   touch .gitignore
   ```
   
   Add to `server/.gitignore`:
   ```
   node_modules/
   .env
   .env.local
   .DS_Store
   ```

---

#### Step 4: Verification Checklist

Before proceeding with implementation, verify:

- [ ] GitHub OAuth App created successfully
- [ ] Client ID copied and stored securely
- [ ] Client Secret copied and stored securely
- [ ] Frontend `.env` file created with `VITE_GITHUB_CLIENT_ID`
- [ ] Frontend `.env` file has correct callback URL
- [ ] Frontend `.env` is in `.gitignore`
- [ ] Backend directory created at project root
- [ ] Backend `package.json` initialized
- [ ] Backend dependencies installed (express, cors, axios, dotenv)
- [ ] Backend `.env` file created with both secrets
- [ ] Backend `.env` is in `.gitignore`
- [ ] Both Client IDs match in frontend and backend `.env`

---

#### Step 5: Environment Variables Reference

**Summary of All Required Variables:**

| Variable | Location | Value | Secret? | Purpose |
|----------|----------|-------|---------|---------|
| `VITE_GITHUB_CLIENT_ID` | Frontend `.env` | `Gha...` | No | Identify OAuth app to GitHub |
| `VITE_REDIRECT_URI` | Frontend `.env` | `http://localhost:5173/callback` | No | OAuth callback URL |
| `GITHUB_CLIENT_ID` | Backend `.env` | `Gha...` | No | Identify OAuth app to GitHub |
| `GITHUB_CLIENT_SECRET` | Backend `.env` | `ghs...` | **YES** | Authenticate with GitHub |
| `PORT` | Backend `.env` | `3001` | No | Backend server port |
| `FRONTEND_URL` | Backend `.env` | `http://localhost:5173` | No | CORS configuration |

---

#### Step 6: Testing Configuration (Before Implementation)

1. **Test Frontend Environment Loading**
   ```bash
   cd github-user-search-app
   node -e "console.log(require('dotenv').config())"
   ```
   Should not show errors.

2. **Test Backend Environment Loading**
   ```bash
   cd server
   node -e "require('dotenv').config(); console.log('CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? 'SET' : 'MISSING'); console.log('CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING');"
   ```
   Should output:
   ```
   CLIENT_ID: SET
   CLIENT_SECRET: SET
   ```

---

#### Step 7: Production Configuration (Future)

When deploying to production, update:

**Frontend Production Variables:**
```env
VITE_GITHUB_CLIENT_ID=your_client_id
VITE_REDIRECT_URI=https://your-domain.com/callback
```

**Backend Production Variables:**
```env
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

**GitHub OAuth App Production Settings:**
- Create a **separate** OAuth App for production
- Set Homepage URL: `https://your-domain.com`
- Set Callback URL: `https://your-domain.com/callback`

⚠️ **Never use the same OAuth app for development and production!**

---

## 4. Design System Compliance

### 4.1 Design Tokens (from existing codebase)

Reference: `src/index.css`

**Colors:**
- Background: `bg-neutral-100 dark:bg-neutral-900`
- Card: `bg-neutral-0 dark:bg-neutral-800`
- Primary button: `bg-blue-500 hover:bg-blue-300`
- Text primary: `text-neutral-700 dark:text-white`
- Text secondary: `text-neutral-500 dark:text-white`

**Typography:**
- Logo: `text-preset-1` (26px, bold)
- Button: `text-preset-5` (16px, bold)
- Body: `text-preset-6` (15px, regular)
- Small: `text-preset-7` (13px, regular)

**Spacing:**
- Use existing spacing scale: `gap-200`, `gap-300`, `px-300`, `py-150`, etc.

**Border Radius:**
- Buttons: `rounded-10`
- Cards: `rounded-16` or `rounded-[15px]`
- Avatar: `rounded-full`

**Shadows:**
- Cards: `shadow-card`

### 4.2 Component Styling Patterns

Reference existing components for consistency:
- `src/components/Header.tsx` - Header layout
- `src/components/SearchBar.tsx` - Button styling
- `src/components/UserProfile.tsx` - Card layout
- `src/components/ThemeToggle.tsx` - Interactive elements

---

## 5. Folder Structure Updates

```
/github-user-search-app
├── /src
│   ├── /components
│   │   ├── Header.tsx          # MODIFY: Add auth UI
│   │   ├── Navbar.tsx          # NEW: Extracted navbar component
│   │   ├── AuthButton.tsx      # NEW: Sign in/out button
│   │   ├── UserAvatar.tsx      # NEW: Avatar with dropdown
│   │   ├── RepoCard.tsx        # NEW: Repository card component
│   │   ├── RepoList.tsx        # NEW: Repository list component
│   │   └── ProtectedRoute.tsx  # NEW: Route guard component
│   ├── /pages
│   │   ├── HomePage.tsx        # EXISTING
│   │   ├── ProfilePage.tsx     # NEW: User profile with repos
│   │   └── CallbackPage.tsx    # NEW: OAuth callback handler
│   ├── /services
│   │   ├── githubApi.ts        # MODIFY: Add authenticated endpoints
│   │   └── authService.ts      # NEW: OAuth service
│   ├── /store
│   │   ├── themeContext.tsx    # EXISTING
│   │   └── authContext.tsx     # NEW: Auth state management
│   ├── /types
│   │   ├── github.ts           # MODIFY: Add repo types
│   │   └── auth.ts             # NEW: Auth types
│   ├── App.tsx                 # MODIFY: Add routing
│   └── main.tsx                # MODIFY: Add BrowserRouter
```

---

## 6. Implementation Tasks

### Phase 1: Setup & Dependencies

#### Task 1.1: Install React Router
```bash
cd github-user-search-app
npm install react-router
```

#### Task 1.2: Create Environment File
```bash
# Create .env file
touch .env
```

**.env:**
```env
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_REDIRECT_URI=http://localhost:5173/callback
```

**.gitignore (add):**
```
.env
.env.local
```

### Phase 2: Types & Schemas

#### Task 2.1: Create Auth Types

**src/types/auth.ts:**
```typescript
import { z } from 'zod';

export const AuthUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
  name: z.string().nullable(),
  html_url: z.string(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

#### Task 2.2: Update GitHub Types

**src/types/github.ts (add):**
```typescript
// Add to existing file

export const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  html_url: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string(),
  private: z.boolean(),
});

export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

export const GitHubReposSchema = z.array(GitHubRepoSchema);
```

### Phase 3: Auth Context & Service

#### Task 3.1: Create Auth Service

**src/services/authService.ts:**
```typescript
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

// Generate random state for CSRF protection
export function generateState(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Build GitHub OAuth authorization URL
export function getGitHubAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'read:user public_repo',
    state: state,
  });
  
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

// Exchange code for access token (requires backend proxy)
export async function exchangeCodeForToken(code: string): Promise<string> {
  // This should call your backend endpoint
  // Example: POST /api/auth/github/callback
  const response = await fetch('/api/auth/github/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }
  
  const data = await response.json();
  return data.access_token;
}

// Storage helpers
const TOKEN_KEY = 'github_access_token';

export function saveToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function saveState(state: string): void {
  sessionStorage.setItem('oauth_state', state);
}

export function getState(): string | null {
  return sessionStorage.getItem('oauth_state');
}

export function removeState(): void {
  sessionStorage.removeItem('oauth_state');
}
```

#### Task 3.2: Create Auth Context

**src/store/authContext.tsx:**
```typescript
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser, AuthState } from '@/types/auth';
import { AuthUserSchema } from '@/types/auth';
import { getToken, saveToken, removeToken } from '@/services/authService';
import axios from 'axios';

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  handleCallback: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;

  // Fetch user data with token
  const fetchUser = useCallback(async (token: string) => {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const validatedUser = AuthUserSchema.parse(response.data);
      setUser(validatedUser);
      setAccessToken(token);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      removeToken();
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  // Initialize auth state from storage
  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUser(token).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  // Redirect to GitHub OAuth
  const login = useCallback(() => {
    const { generateState, getGitHubAuthUrl, saveState } = require('@/services/authService');
    const state = generateState();
    saveState(state);
    window.location.href = getGitHubAuthUrl(state);
  }, []);

  // Handle OAuth callback
  const handleCallback = useCallback(async (code: string) => {
    setIsLoading(true);
    try {
      const { exchangeCodeForToken } = await import('@/services/authService');
      const token = await exchangeCodeForToken(code);
      saveToken(token);
      await fetchUser(token);
    } catch (error) {
      console.error('OAuth callback failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetchUser]);

  // Logout
  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        isLoading,
        login,
        logout,
        handleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Phase 4: Update GitHub API Service

#### Task 4.1: Add Authenticated Endpoints

**src/services/githubApi.ts (update):**
```typescript
import axios, { AxiosError } from 'axios';
import type { GitHubUser, GitHubRepo } from '@/types/github';
import { GitHubUserSchema, GitHubReposSchema } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

// Existing function (unchanged)
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

// NEW: Fetch authenticated user's repositories
export const fetchUserRepos = async (
  accessToken: string,
  limit: number = 10
): Promise<GitHubRepo[]> => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/user/repos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        sort: 'updated',
        per_page: limit,
        type: 'public',
      },
    });
    const validatedData = GitHubReposSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized');
      }
      throw new Error('Failed to fetch repositories');
    }
    throw error;
  }
};
```

### Phase 5: Components

#### Task 5.1: Create Auth Button Component

**src/components/AuthButton.tsx:**
```typescript
import { useAuth } from '@/store/authContext';
import { GitHubIcon } from '@/assets/icons';

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
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
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
        </a>
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
```

#### Task 5.2: Add GitHub Icon

**src/assets/icons/index.tsx (add):**
```typescript
// Add to existing icons file

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
    </svg>
  );
}
```

#### Task 5.3: Update Header Component

**src/components/Header.tsx:**
```typescript
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
```

#### Task 5.4: Create Protected Route Component

**src/components/ProtectedRoute.tsx:**
```typescript
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/store/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="font-mono text-preset-4 text-neutral-500 dark:text-neutral-200">
          Loading...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
```

#### Task 5.5: Create Repo Card Component

**src/components/RepoCard.tsx:**
```typescript
import type { GitHubRepo } from '@/types/github';
import { StarIcon, LinkIcon } from '@/assets/icons';
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
```

#### Task 5.6: Create Repo List Component

**src/components/RepoList.tsx:**
```typescript
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
```

### Phase 6: Pages

#### Task 6.1: Create Profile Page

**src/pages/ProfilePage.tsx:**
```typescript
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
```

#### Task 6.2: Create Callback Page

**src/pages/CallbackPage.tsx:**
```typescript
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '@/store/authContext';
import { getState, removeState } from '@/services/authService';

export function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function processCallback() {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const storedState = getState();

      // Validate state to prevent CSRF
      if (!state || state !== storedState) {
        setError('Invalid state parameter. Please try again.');
        return;
      }

      removeState();

      if (!code) {
        setError('No authorization code received.');
        return;
      }

      try {
        await handleCallback(code);
        navigate('/profile', { replace: true });
      } catch (err) {
        setError('Authentication failed. Please try again.');
      }
    }

    processCallback();
  }, [searchParams, handleCallback, navigate]);

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center px-200">
        <div className="bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-card p-600 max-w-md text-center">
          <h1 className="font-mono text-preset-1 text-red-500 mb-300">
            Authentication Error
          </h1>
          <p className="font-mono text-preset-6 text-neutral-500 dark:text-neutral-200 mb-400">
            {error}
          </p>
          <a
            href="/"
            className="font-mono text-preset-5 text-blue-500 dark:text-blue-300 hover:underline"
          >
            Return to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
      <div className="font-mono text-preset-4 text-neutral-500 dark:text-neutral-200">
        Authenticating...
      </div>
    </main>
  );
}
```

### Phase 7: App Assembly & Routing

#### Task 7.1: Update App.tsx

**src/App.tsx:**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from '@/store/themeContext';
import { AuthProvider } from '@/store/authContext';
import { HomePage } from '@/pages/HomePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { CallbackPage } from '@/pages/CallbackPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
```

#### Task 7.2: Update HomePage to Include Header

**src/pages/HomePage.tsx (update):**
```typescript
import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { UserProfile } from '@/components/UserProfile';
import { fetchGitHubUser } from '@/services/githubApi';
import type { GitHubUser } from '@/types/github';

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

### Phase 8: Express Backend Setup

#### Task 8.1: Create Backend Package

**server/package.json:**
```json
{
  "name": "devfinder-oauth-server",
  "version": "1.0.0",
  "description": "OAuth token exchange server for DevFinder",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "keywords": ["oauth", "github", "express"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "axios": "^1.13.0",
    "dotenv": "^16.3.1"
  }
}
```

#### Task 8.2: Create Express Server

**server/index.js:**
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Environment validation
const requiredEnvVars = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// OAuth token exchange endpoint
app.post('/api/auth/github/callback', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    console.log('🔄 Exchanging code for token...');
    
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token, error, error_description } = response.data;

    if (error) {
      console.error('❌ GitHub OAuth error:', error, error_description);
      return res.status(400).json({ 
        error: error_description || error 
      });
    }

    if (!access_token) {
      console.error('❌ No access token in response');
      return res.status(400).json({ 
        error: 'No access token received from GitHub' 
      });
    }

    console.log('✅ Token exchange successful');
    res.json({ access_token });
    
  } catch (error) {
    console.error('❌ Token exchange failed:', error.message);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      return res.status(error.response.status).json({ 
        error: error.response.data.error_description || 'Token exchange failed' 
      });
    }
    
    res.status(500).json({ error: 'Internal server error during token exchange' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ OAuth server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Token exchange: POST http://localhost:${PORT}/api/auth/github/callback`);
});
```

#### Task 8.3: Update Vite Config for API Proxy

**github-user-search-app/vite.config.ts (update):**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
```

#### Task 8.4: Create Backend README

**server/README.md:**
```markdown
# DevFinder OAuth Server

Express server for handling GitHub OAuth token exchange.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Configure environment variables in \`.env\`:
   \`\`\`env
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   \`\`\`

3. Start server:
   \`\`\`bash
   npm run dev  # Development with auto-reload
   npm start    # Production
   \`\`\`

## Endpoints

- \`GET /health\` - Health check
- \`POST /api/auth/github/callback\` - Exchange OAuth code for access token

## Security Notes

- Never commit \`.env\` file
- Client secret must remain server-side only
- CORS configured for frontend URL only
\`\`\`

---

## 7. Validation Gates

### 7.1 Build Validation
```bash
npm run build
# Must complete without errors
```

### 7.2 Type Checking
```bash
npx tsc --noEmit
# Must pass with no type errors
```

### 7.3 Lint Validation
```bash
npm run lint
# Must pass with no errors
```

### 7.4 Backend Validation

**Start Backend Server:**
```bash
cd server
npm start
```

**Test Health Endpoint:**
```bash
curl http://localhost:3001/health
# Expected: {"status":"ok","timestamp":"..."}
```

**Test Environment Loading:**
```bash
cd server
node -e "require('dotenv').config(); console.log('CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? '✓ SET' : '✗ MISSING'); console.log('CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? '✓ SET' : '✗ MISSING');"
```

### 7.5 Manual Testing Checklist

#### Authentication Flow
- [ ] Click "Sign in with GitHub" redirects to GitHub OAuth page
- [ ] After authorization, redirected back to `/callback`
- [ ] Callback processes and redirects to `/profile`
- [ ] User avatar and username display in header
- [ ] Logout button clears session and returns to home

#### Protected Routes
- [ ] Accessing `/profile` when not logged in redirects to home
- [ ] Accessing `/profile` when logged in shows profile page
- [ ] Refreshing `/profile` page maintains authentication

#### Profile Page
- [ ] User info section displays avatar, name, username
- [ ] Repository list shows up to 10 repos
- [ ] Each repo shows: name (link), description, stars, language, updated date
- [ ] Empty state shows when user has no public repos
- [ ] Error state shows when API fails

#### Session Persistence
- [ ] Refreshing page maintains login state
- [ ] Opening new tab maintains login state (sessionStorage)
- [ ] Closing browser clears session

#### Design Consistency
- [ ] All new components match existing design system
- [ ] Dark/light mode works on all new components
- [ ] Responsive design works at 375px, 768px, 1440px

---

## 8. Error Handling Strategy

### 8.1 OAuth Errors
- **Invalid state**: Display error message, link to retry
- **No code**: Display error message, link to retry
- **Token exchange failure**: Display error message, link to retry
- **User fetch failure**: Clear token, redirect to home

### 8.2 API Errors
- **401 Unauthorized**: Clear token, redirect to home
- **Rate limiting**: Display appropriate message
- **Network errors**: Display retry option

### 8.3 Loading States
- Show skeleton loaders for auth button
- Show skeleton loaders for repo list
- Show "Authenticating..." during callback

---

## 9. Documentation References

### GitHub OAuth
- **Authorizing OAuth Apps**: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
- **OAuth Scopes**: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
- **Creating OAuth App**: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

### React Router
- **Documentation**: https://reactrouter.com/
- **BrowserRouter**: https://reactrouter.com/en/main/router-components/browser-router
- **Protected Routes**: https://reactrouter.com/en/main/start/tutorial#protecting-routes

### GitHub API
- **Get authenticated user**: https://docs.github.com/en/rest/users/users#get-the-authenticated-user
- **List user repos**: https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user

---

## 10. Gotchas & Considerations

### 10.1 OAuth Security
- **NEVER** expose `client_secret` in frontend code
- Always validate `state` parameter to prevent CSRF
- Use `sessionStorage` for tokens (cleared on browser close)
- Consider token refresh for long sessions

### 10.2 GitHub OAuth App Setup
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Homepage URL: `http://localhost:5173`
4. Set Authorization callback URL: `http://localhost:5173/callback`
5. Copy Client ID and Client Secret

### 10.3 Rate Limiting
- Authenticated requests: 5,000 requests/hour
- Unauthenticated: 60 requests/hour
- Display rate limit info if needed

### 10.4 React Router v7
- Import from `react-router` (not `react-router-dom`)
- Use `useNavigate` for programmatic navigation
- Use `Navigate` component for redirects

### 10.5 Session vs Local Storage
- `sessionStorage`: Cleared when browser closes (more secure)
- `localStorage`: Persists across sessions
- This PRP uses `sessionStorage` for security

### 10.6 CORS Issues
- Backend must handle CORS for token exchange
- GitHub API supports CORS for authenticated requests

---

## 11. Success Criteria

1. [ ] "Sign in with GitHub" button visible in header
2. [ ] OAuth flow completes successfully
3. [ ] User avatar and username display when logged in
4. [ ] Logout functionality works
5. [ ] `/profile` route is protected
6. [ ] Profile page displays user info
7. [ ] Top 10 repos display with all required fields
8. [ ] Session persists on page refresh
9. [ ] All components match design system
10. [ ] Dark/light mode works on all new components
11. [ ] Responsive design at all breakpoints
12. [ ] Error states handled gracefully
13. [ ] Loading states displayed appropriately

---

## 12. Pre-Implementation Checklist

Before starting implementation, **complete Section 3 (Configuration Setup Guide)**, then verify:

1. [ ] GitHub OAuth App created with correct callback URL
2. [ ] Client ID and Client Secret copied and stored securely
3. [ ] Frontend `.env` file created with `VITE_GITHUB_CLIENT_ID` and callback URL
4. [ ] Backend directory created at project root (`server/`)
5. [ ] Backend dependencies installed (express, cors, axios, dotenv)
6. [ ] Backend `.env` file created with both secrets and configuration
7. [ ] Both `.env` files are in `.gitignore`
8. [ ] React Router will be installed during implementation

---

## 13. Running the Application

Once implementation is complete:

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd github-user-search-app
npm run dev
# Frontend runs on http://localhost:5173
```

**Access the application:**
- Open browser to http://localhost:5173
- Click "Sign in with GitHub"
- Complete OAuth flow
- View profile at http://localhost:5173/profile

---

**PRP Confidence Score: 8.5/10**

*Reasoning: Complete implementation plan with Express backend for token exchange. Frontend implementation is well-defined with clear patterns from existing codebase. Comprehensive configuration guide with step-by-step instructions ensures proper setup. Main uncertainty is Figma designs - UI follows existing design patterns but may need adjustment.*

**Risk Factors:**
- No Figma designs for new components (mitigated by following existing design system)
- First-time OAuth implementation (mitigated by comprehensive documentation)
- Two-server setup complexity (mitigated by clear instructions)

**Mitigation:**
- Complete Express backend implementation provided
- Step-by-step configuration guide (Section 3)
- Detailed OAuth setup with verification steps
- Security best practices documented throughout
- Design system tokens referenced for consistency
- Validation gates ensure quality
