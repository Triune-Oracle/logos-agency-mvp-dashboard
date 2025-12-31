/**
 * Supabase Browser Client
 * Workstream 1: Supabase Core Infrastructure
 * Glyph: 🔥WS1-SPEC|Supabase-Core|Browser-Client|Claude⚡
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const createClient = () => {
  return createSupabaseClient(
    process.env.VITE_FRONTEND_FORGE_API_URL || '',
    process.env.VITE_FRONTEND_FORGE_API_KEY || ''
  );
};

// Singleton instance for use in React components
let supabaseInstance: any = null;

export const getSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createClient();
  }
  return supabaseInstance;
};

// Export the client type
export type SupabaseClient = ReturnType<typeof createClient>;
