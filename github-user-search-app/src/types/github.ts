import { z } from 'zod';

export const GitHubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string(),
  html_url: z.string(),
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

export interface SearchState {
  user: GitHubUser | null;
  isLoading: boolean;
  error: string | null;
}
