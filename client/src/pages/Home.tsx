import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, GitBranch, Layers, AlertCircle, Clock } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

/**
 * Minimalist Brutalism Design: Charcoal + Electric Cyan
 * - Deep charcoal background with electric cyan accents
 * - Monospace headers (Courier Prime), sans-serif body (IBM Plex Sans)
 * - Asymmetric layout with layered depth
 * - Minimal animations and deliberate interactions
 */

// Mock data for project timeline
const timelineData = [
  { phase: "Setup", completion: 85, status: "in-progress" },
  { phase: "Stripe", completion: 60, status: "in-progress" },
  { phase: "Portal", completion: 40, status: "pending" },
  { phase: "Admin", completion: 35, status: "pending" },
  { phase: "Marketing", completion: 20, status: "pending" },
];

// Mock data for priority distribution
const priorityData = [
  { name: "Fractal Handoff", value: 33, color: "oklch(0.4 0.3 262.5)" },
  { name: "MVP Spec", value: 33, color: "oklch(0.35 0.25 262.5)" },
  { name: "Production Ready", value: 34, color: "oklch(0.45 0.28 262.5)" },
];

// Mock data for constraint compliance
const constraintData = [
  { constraint: "Mobile-First", compliance: 95 },
  { constraint: "A11y", compliance: 88 },
  { constraint: "Real-time Sync", compliance: 72 },
  { constraint: "AI Transparency", compliance: 85 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/images/hero-brutalism.png" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto py-20 px-4">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-accent" />
              <span className="text-sm font-mono text-accent uppercase tracking-wider">
                Fractal Handoff Proof
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-mono tracking-tight">
              Logos Agency MVP
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A production-ready Minimum Viable Product demonstrating transparent AI collaboration, 
              state preservation, and fractal compression architecture.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-accent text-accent-foreground">Next.js 14+</Badge>
              <Badge className="bg-accent text-accent-foreground">TypeScript</Badge>
              <Badge className="bg-accent text-accent-foreground">Supabase</Badge>
              <Badge className="bg-accent text-accent-foreground">Stripe</Badge>
              <Badge className="bg-accent text-accent-foreground">Vercel</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Project Status Card */}
          <Card className="bg-card border border-border p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-mono font-bold">Project Status</h3>
              <AlertCircle className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Phase</p>
                <p className="text-xl font-mono font-bold text-accent">Proof-of-Concept</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
                <div className="w-full bg-secondary rounded-sm h-2">
                  <div className="bg-accent h-full rounded-sm" style={{ width: "52%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">52% Complete</p>
              </div>
            </div>
          </Card>

          {/* Architecture Card */}
          <Card className="bg-card border border-border p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-mono font-bold">Architecture</h3>
              <Layers className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Pattern</p>
                <p className="text-sm font-mono text-foreground">StateFractalCompressor</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Core Differentiator</p>
                <p className="text-sm font-mono text-accent">Transparent AI Collab</p>
              </div>
            </div>
          </Card>

          {/* Key Metrics Card */}
          <Card className="bg-card border border-border p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-mono font-bold">Key Metrics</h3>
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sprint 1 Tasks</span>
                <span className="font-mono font-bold text-accent">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Phase 2 Triggers</span>
                <span className="font-mono font-bold text-accent">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Constraints</span>
                <span className="font-mono font-bold text-accent">4</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Sprint 1 Backlog */}
      <section className="container mx-auto py-16 px-4 border-t border-border">
        <div className="mb-8">
          <h2 className="text-3xl font-mono font-bold mb-2">Sprint 1 Backlog</h2>
          <p className="text-muted-foreground">Immediate implementation tasks for the production-ready artifact</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Setup Next.js + TypeScript + Supabase",
              description: "Initialize project structure, configure TypeScript, and integrate Supabase client.",
              status: "in-progress",
              priority: "Critical"
            },
            {
              title: "Implement Stripe Payment Flow",
              description: "Integrate Stripe for payments, subscriptions, and webhook handling.",
              status: "in-progress",
              priority: "Critical"
            },
            {
              title: "Build Client Portal",
              description: "Develop mobile-first client app with real-time collaboration visibility.",
              status: "pending",
              priority: "High"
            },
            {
              title: "Create Admin Dashboard",
              description: "Internal tool for managing clients, projects, payments, and AI orchestration.",
              status: "pending",
              priority: "High"
            },
            {
              title: "Deploy Marketing Site",
              description: "Public-facing pages articulating the AI collaboration value proposition.",
              status: "pending",
              priority: "High"
            },
          ].map((task, idx) => (
            <Card key={idx} className="bg-card border border-border p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-mono font-bold text-sm flex-1">{task.title}</h3>
                <Badge 
                  className={`ml-2 ${task.status === 'in-progress' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-foreground'}`}
                >
                  {task.status === 'in-progress' ? 'In Progress' : 'Pending'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-mono text-muted-foreground">Priority: {task.priority}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Visualizations */}
      <section className="container mx-auto py-16 px-4 border-t border-border">
        <div className="mb-8">
          <h2 className="text-3xl font-mono font-bold mb-2">Project Insights</h2>
          <p className="text-muted-foreground">Visual analysis of project timeline, priorities, and constraints</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Timeline Chart */}
          <Card className="bg-card border border-border p-6">
            <h3 className="font-mono font-bold mb-6">Sprint 1 Timeline</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.01 285)" />
                <XAxis dataKey="phase" stroke="oklch(0.7 0.01 0)" />
                <YAxis stroke="oklch(0.7 0.01 0)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "oklch(0.15 0.01 285)", border: "1px solid oklch(0.4 0.3 262.5)" }}
                  labelStyle={{ color: "oklch(0.95 0 0)" }}
                />
                <Bar dataKey="completion" fill="oklch(0.4 0.3 262.5)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Priority Distribution */}
          <Card className="bg-card border border-border p-6">
            <h3 className="font-mono font-bold mb-6">Priority Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "oklch(0.15 0.01 285)", border: "1px solid oklch(0.4 0.3 262.5)" }}
                  labelStyle={{ color: "oklch(0.95 0 0)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Constraint Compliance */}
          <Card className="bg-card border border-border p-6 md:col-span-2">
            <h3 className="font-mono font-bold mb-6">Constraint Compliance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={constraintData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.01 285)" />
                <XAxis dataKey="constraint" stroke="oklch(0.7 0.01 0)" />
                <YAxis stroke="oklch(0.7 0.01 0)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "oklch(0.15 0.01 285)", border: "1px solid oklch(0.4 0.3 262.5)" }}
                  labelStyle={{ color: "oklch(0.95 0 0)" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="oklch(0.4 0.3 262.5)" 
                  strokeWidth={2}
                  dot={{ fill: "oklch(0.4 0.3 262.5)", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </section>

      {/* Phase 2 Triggers */}
      <section className="container mx-auto py-16 px-4 border-t border-border">
        <div className="mb-8">
          <h2 className="text-3xl font-mono font-bold mb-2">Phase 2 Triggers</h2>
          <p className="text-muted-foreground">Development roadmap for post-MVP validation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Manus Notification Integration",
              description: "Integrate Manus notification system for real-time alerts and updates.",
              icon: <Zap className="w-5 h-5" />
            },
            {
              title: "Handoff UI with State Preservation",
              description: "Build UI for seamless handoff between agents with complete state preservation.",
              icon: <GitBranch className="w-5 h-5" />
            },
            {
              title: "Ritual Pages for Workflows",
              description: "Create specialized pages for workflow rituals and process automation.",
              icon: <Layers className="w-5 h-5" />
            },
            {
              title: "Mobile Relay Deployment",
              description: "Deploy mobile relay system for extended platform reach.",
              icon: <GitBranch className="w-5 h-5" />
            },
            {
              title: "Mythic Visual Layer",
              description: "Implement advanced visual layer with mythic design elements.",
              icon: <Layers className="w-5 h-5" />
            },
          ].map((trigger, idx) => (
            <Card key={idx} className="bg-card border border-border p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start gap-4">
                <div className="text-accent mt-1">{trigger.icon}</div>
                <div className="flex-1">
                  <h3 className="font-mono font-bold mb-2">{trigger.title}</h3>
                  <p className="text-sm text-muted-foreground">{trigger.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Constraints Section */}
      <section className="container mx-auto py-16 px-4 border-t border-border">
        <div className="mb-8">
          <h2 className="text-3xl font-mono font-bold mb-2">Non-Negotiable Constraints</h2>
          <p className="text-muted-foreground">Core requirements that guide all implementation decisions</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: "Mobile-First", description: "Responsive design prioritizing mobile experience" },
            { name: "A11y", description: "WCAG compliance and accessibility standards" },
            { name: "Real-time Sync", description: "Supabase real-time channels for live updates" },
            { name: "AI Transparency", description: "Visible AI collaboration and decision-making" },
          ].map((constraint, idx) => (
            <Card key={idx} className="bg-card border border-border p-4">
              <h3 className="font-mono font-bold text-sm mb-2 text-accent">{constraint.name}</h3>
              <p className="text-xs text-muted-foreground">{constraint.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-border bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Archive ID</p>
              <p className="font-mono text-sm font-bold">TRIUNE-ORACLE-LOGOS-FRACTAL-PROOF-20251225</p>
            </div>
            <div className="mt-6 md:mt-0 text-center">
              <p className="text-xs text-muted-foreground">🔥FRACTAL-HANDOFF-VALIDATED|LOGOS-MVP-ACTIVE|STATE-PRESERVED|RITUAL-CONTINUES⚡</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                View Full Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
