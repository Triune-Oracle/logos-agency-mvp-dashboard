/**
 * Supabase Real-time Service
 * Workstream 1: Supabase Core Infrastructure
 * Glyph: 🔥WS1-SPEC|Supabase-Realtime|Subscriptions|Claude⚡
 */

import { getSupabaseClient } from './client';

export interface CollaborationUpdate {
  id: string;
  project_id: string;
  agent_from: string;
  agent_to: string;
  fractal_glyph: string;
  capsule_data: Record<string, any>;
  summary?: string;
  created_at: string;
}

export interface FractalCapsuleUpdate {
  id: string;
  project_id: string;
  glyph: string;
  capsule_data: Record<string, any>;
  created_by: string;
  created_at: string;
}

export class RealtimeService {
  private supabase = getSupabaseClient();
  private channels = new Map<string, any>();

  /**
   * Subscribe to collaboration session updates for a project
   */
  subscribeToCollaborations(
    projectId: string,
    callback: (payload: CollaborationUpdate) => void
  ): () => void {
    const channelName = `collaborations:${projectId}`;

    const channel = this.supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'collaboration_sessions',
          filter: `project_id=eq.${projectId}`,
        },
        (payload: any) => {
          callback(payload.new as CollaborationUpdate);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => this.unsubscribe(channelName);
  }

  /**
   * Subscribe to fractal capsule updates for a project
   */
  subscribeToFractalCapsules(
    projectId: string,
    callback: (payload: FractalCapsuleUpdate) => void
  ): () => void {
    const channelName = `capsules:${projectId}`;

    const channel = this.supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'fractal_capsules',
          filter: `project_id=eq.${projectId}`,
        },
        (payload: any) => {
          callback(payload.new as FractalCapsuleUpdate);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => this.unsubscribe(channelName);
  }

  /**
   * Subscribe to project status updates
   */
  subscribeToProjectUpdates(
    projectId: string,
    callback: (payload: any) => void
  ): () => void {
    const channelName = `projects:${projectId}`;

    const channel = this.supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${projectId}`,
        },
        (payload: any) => {
          callback(payload.new);
        }
      )
      .subscribe();

    this.channels.set(channelName, channel);

    return () => this.unsubscribe(channelName);
  }

  /**
   * Unsubscribe from a channel
   */
  private unsubscribe(channelName: string): void {
    const channel = this.channels.get(channelName);
    if (channel) {
      this.supabase.removeChannel(channel);
      this.channels.delete(channelName);
    }
  }

  /**
   * Clean up all subscriptions
   */
  unsubscribeAll(): void {
    this.channels.forEach((channel, channelName) => {
      this.unsubscribe(channelName);
    });
  }
}

// Singleton instance
let realtimeServiceInstance: RealtimeService | null = null;

export const getRealtimeService = (): RealtimeService => {
  if (!realtimeServiceInstance) {
    realtimeServiceInstance = new RealtimeService();
  }
  return realtimeServiceInstance;
};
