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
