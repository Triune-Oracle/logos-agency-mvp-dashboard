import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_FRONTEND_FORGE_API_URL || '';
const supabaseAnonKey = process.env.VITE_FRONTEND_FORGE_API_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

/**
 * Real-time subscription for collaboration sessions
 * Enables live AI activity visibility in client portal
 */
export const subscribeToCollaborationUpdates = (
  projectId: string,
  callback: (payload: Record<string, unknown>) => void
) => {
  const channel = supabase
    .channel(`collaboration_${projectId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'collaboration_sessions',
        filter: `project_id=eq.${projectId}`,
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return channel;
};

/**
 * Real-time subscription for project updates
 */
export const subscribeToProjectUpdates = (
  projectId: string,
  callback: (payload: Record<string, unknown>) => void
) => {
  const channel = supabase
    .channel(`project_${projectId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'projects',
        filter: `id=eq.${projectId}`,
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return channel;
};
