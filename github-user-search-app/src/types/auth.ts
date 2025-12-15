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
