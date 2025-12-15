import axios, { AxiosError } from 'axios';
import type { GitHubUser } from '@/types/github';
import { GitHubUserSchema } from '@/types/github';

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
