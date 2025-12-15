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
  // This calls the backend endpoint which handles the client_secret securely
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
