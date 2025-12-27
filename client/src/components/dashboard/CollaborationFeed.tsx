import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface CollaborationSession {
  id: string;
  agent_name: string;
  activity_type: string;
  status: string;
  created_at: string;
}

interface CollaborationFeedProps {
  projectId?: string;
  sessions?: CollaborationSession[];
}

/**
 * CollaborationFeed Component
 * Displays real-time AI agent activity for transparent collaboration
 * Minimalist Brutalism: Clean feed with minimal visual noise
 */
export function CollaborationFeed({ 
  projectId = "demo",
  sessions = [
    {
      id: "1",
      agent_name: "claude-sonnet-4",
      activity_type: "analysis",
      status: "active",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      agent_name: "deepseek-research",
      activity_type: "research",
      status: "completed",
      created_at: new Date(Date.now() - 300000).toISOString(),
    },
  ]
}: CollaborationFeedProps) {
  const [displaySessions, setDisplaySessions] = useState<CollaborationSession[]>(sessions);

  useEffect(() => {
    // In a real app, this would subscribe to Supabase real-time updates
    // For now, we'll just display the mock data
    setDisplaySessions(sessions);
  }, [sessions, projectId]);

  return (
    <Card className="bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono font-bold">Real-time Collaboration</h3>
        <Badge className="bg-accent text-accent-foreground animate-pulse">
          Live
        </Badge>
      </div>

      <div className="space-y-4">
        {displaySessions.length > 0 ? (
          displaySessions.map((session) => (
            <div 
              key={session.id} 
              className="border-l-2 border-accent pl-4 py-2 hover:bg-secondary/50 transition-colors rounded-r"
            >
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant="outline"
                  className={`${
                    session.status === "active"
                      ? "border-accent text-accent"
                      : "border-muted text-muted-foreground"
                  }`}
                >
                  {session.agent_name}
                </Badge>
                <span className={`text-xs font-mono ${
                  session.status === "active"
                    ? "text-accent"
                    : "text-muted-foreground"
                }`}>
                  {session.status === "active" ? "● Active" : "✓ Completed"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {session.activity_type.charAt(0).toUpperCase() + session.activity_type.slice(1)}
              </p>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">
                  {new Date(session.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            No active collaboration sessions
          </p>
        )}
      </div>
    </Card>
  );
}
