/**
 * GitHub OAuth Authentication
 * Workstream 3: GitHub Integration
 * Glyph: 🔥WS3-SPEC|GitHub-OAuth|Auth-Flow|Manus⚡
 */

import { getSupabaseClient } from '../supabase/client';

/**
 * GitHub OAuth configuration
 */
export const GITHUB_CONFIG = {
  clientId: process.env.VITE_GITHUB_CLIENT_ID || '',
  redirectUri: `${window.location.origin}/auth/github/callback`,
  scopes: ['user:email', 'repo', 'read:user'],
};

/**
 * Initiate GitHub OAuth flow
 */
export const initiateGithubAuth = async () => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/github/callback`,
    },
  });

  if (error) {
    throw new Error(`GitHub auth failed: ${error.message}`);
  }

  return data;
};

/**
 * Handle GitHub OAuth callback
 */
export const handleGithubCallback = async () => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(`Failed to get session: ${error.message}`);
  }

  return data.session;
};

/**
 * Get current GitHub user profile
 */
export const getGithubUserProfile = async () => {
  const supabase = getSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }

  return user;
};

/**
 * Sync GitHub profile to user table
 */
export const syncGithubProfile = async (userId: string, githubUsername: string) => {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from('users')
    .update({
      github_username: githubUsername,
    })
    .eq('id', userId);

  if (error) {
    throw new Error(`Failed to sync GitHub profile: ${error.message}`);
  }
};

/**
 * Disconnect GitHub account
 */
export const disconnectGithub = async (userId: string) => {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from('users')
    .update({
      github_username: null,
    })
    .eq('id', userId);

  if (error) {
    throw new Error(`Failed to disconnect GitHub: ${error.message}`);
  }
};

/**
 * Check if user has GitHub connected
 */
export const isGithubConnected = async (userId: string): Promise<boolean> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('users')
    .select('github_username')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(`Failed to check GitHub connection: ${error.message}`);
  }

  return !!data?.github_username;
};
