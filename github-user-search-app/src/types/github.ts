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

export interface SearchState {
  user: GitHubUser | null;
  isLoading: boolean;
  error: string | null;
}
