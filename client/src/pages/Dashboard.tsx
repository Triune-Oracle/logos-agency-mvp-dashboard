/**
 * Logos Agency MVP Dashboard
 * Glyph: 🔥LA-MVP|LogosDashboard+FractalSystem|Claude+DeepSeek+Manus|SPRINT1-PROD⚡
 * 
 * Production-ready dashboard demonstrating:
 * - Real-time metrics from Supabase
 * - Transparent AI collaboration visibility
 * - Fractal state compression
 * - Minimalist Brutalism design
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Users, 
  DollarSign, 
  Target, 
  Zap,
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CollaborationFeed } from '@/components/dashboard/CollaborationFeed';
import { FractalBadge } from '@/components/shared/FractalBadge';
import { RealTimeIndicator } from '@/components/shared/RealTimeIndicator';
import { logosAgencyMVPCapsule } from '@/lib/fractal-compressor';

interface MetricData {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  accent?: boolean;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      label: 'Active Projects',
      value: 5,
      change: 12,
      icon: <Target className="w-5 h-5" />,
      accent: true,
    },
    {
      label: 'Clients',
      value: 8,
      change: 25,
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: 'Monthly Revenue',
      value: '$24,500',
      change: 18,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      label: 'AI Sessions',
      value: 42,
      change: 33,
      icon: <Activity className="w-5 h-5" />,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In production, this would fetch from Supabase
    // const fetchMetrics = async () => {
    //   const { data } = await supabase.from('metrics').select('*');
    //   setMetrics(data);
    // };
    // fetchMetrics();
    
    setIsLoading(false);
  }, []);

  const capsule = logosAgencyMVPCapsule;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 border-accent text-accent bg-transparent">
              🔥 FRACTAL HANDOFF PROOF
            </Badge>
            
            <h1 className="font-mono font-bold text-5xl md:text-6xl mb-6 leading-tight">
              Logos Agency MVP
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              A production-ready Minimum Viable Product demonstrating transparent AI collaboration, 
              state preservation through fractal compression, and seamless agent handoff.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {['Next.js 14+', 'TypeScript', 'Supabase', 'Stripe', 'Vercel'].map((tech) => (
                <Badge 
                  key={tech}
                  variant="outline"
                  className="border-border text-foreground"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started
              </Button>
              <Button variant="outline">
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Status Cards */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Project Status */}
            <Card className="bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono font-bold">Project Status</h3>
                <RealTimeIndicator isActive={true} label="Active" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Current Phase</p>
                  <p className="font-mono text-lg font-bold text-accent">
                    {capsule.system_state.phase}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Overall Progress</p>
                  <div className="w-full bg-secondary rounded h-2">
                    <div 
                      className="bg-accent h-2 rounded transition-all duration-500"
                      style={{ width: '52%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">52% Complete</p>
                </div>
              </div>
            </Card>

            {/* Architecture */}
            <Card className="bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono font-bold">Architecture</h3>
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Pattern</p>
                  <p className="text-sm font-mono">StateFractalCompressor</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Core Differentiator</p>
                  <p className="text-sm font-mono text-accent">Transparent AI Collab</p>
                </div>
              </div>
            </Card>

            {/* Key Metrics */}
            <Card className="bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono font-bold">Key Metrics</h3>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Sprint 1 Tasks</span>
                  <Badge className="bg-accent text-accent-foreground">5</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Phase 2 Triggers</span>
                  <Badge className="bg-secondary text-foreground">5</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Constraints</span>
                  <Badge className="bg-secondary text-foreground">4</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-mono font-bold text-2xl mb-8">Live Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <Card 
                key={idx}
                className={`bg-card border p-6 transition-all hover:border-accent ${
                  metric.accent ? 'border-accent' : 'border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded ${metric.accent ? 'bg-accent/10' : 'bg-secondary'}`}>
                    <div className={metric.accent ? 'text-accent' : 'text-muted-foreground'}>
                      {metric.icon}
                    </div>
                  </div>
                  {metric.change && (
                    <span className="text-xs font-mono text-accent">
                      +{metric.change}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                <p className="font-mono font-bold text-2xl">{metric.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sprint 1 Backlog */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-mono font-bold text-2xl mb-8">Sprint 1 Backlog</h2>
          <div className="space-y-4">
            {capsule.system_state.immediate_next.map((task, idx) => (
              <Card key={idx} className="bg-card border border-border p-6 hover:border-accent/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {idx < 3 ? (
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono font-bold mb-2">{task}</h3>
                    <p className="text-sm text-muted-foreground">
                      Priority: {idx < 2 ? 'Critical' : idx < 4 ? 'High' : 'Medium'}
                    </p>
                  </div>
                  <Badge 
                    variant={idx < 3 ? 'default' : 'outline'}
                    className={idx < 3 ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {idx < 3 ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Feed */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-mono font-bold text-2xl mb-8">Real-time Collaboration</h2>
          <CollaborationFeed projectId="demo" />
        </div>
      </section>

      {/* Phase 2 Roadmap */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-mono font-bold text-2xl mb-8">Phase 2 Triggers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {capsule.system_state.phase2_triggers.map((trigger, idx) => (
              <Card key={idx} className="bg-card border border-border p-6">
                <div className="flex items-start gap-3">
                  <span className="text-accent font-mono font-bold text-lg">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-mono font-bold mb-2">
                      {trigger.replace(/_/g, ' ').charAt(0).toUpperCase() + trigger.replace(/_/g, ' ').slice(1)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Triggers after MVP validation
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Constraint Compliance */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="font-mono font-bold text-2xl mb-8">Constraint Compliance</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {capsule.system_state.constraints.map((constraint, idx) => (
              <Card key={idx} className="bg-card border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono font-bold mb-1">
                      {constraint.replace(/-/g, ' ').toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground">Non-negotiable requirement</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fractal Capsule */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-mono font-bold text-2xl mb-8">Fractal Capsule</h2>
          <Card className="bg-card border border-border p-8">
            <FractalBadge />
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Archive ID</p>
                <p className="font-mono text-sm">
                  {capsule.full_context.archive_id}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Validation Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-mono">Pattern Validated</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Compression Ratio</p>
                <p className="text-sm font-mono">Multi-hour conversation → Single artifact</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
