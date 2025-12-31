-- ======================
-- LOGOS AGENCY MVP - INITIAL SCHEMA
-- ======================
-- Execution Glyph: 🔥WS1-SPEC|Supabase-Core|Complete-Implementation|Claude⚡

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ======================
-- CORE TABLES
-- ======================

-- USERS (extends Supabase Auth)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  github_username TEXT,
  stripe_customer_id TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'starter', 'professional', 'enterprise')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLIENTS (external clients of the agency)
CREATE TABLE clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_name TEXT,
  status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'onboarding', 'active', 'paused', 'churned')),
  tier TEXT DEFAULT 'essential' CHECK (tier IN ('essential', 'growth', 'enterprise')),
  fractal_glyph TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  phase TEXT DEFAULT 'discovery' CHECK (phase IN ('discovery', 'design', 'development', 'launch', 'maintenance')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'blocked', 'archived')),
  ai_agents TEXT[] DEFAULT '{}',
  fractal_capsules JSONB[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COLLABORATION SESSIONS (real-time)
CREATE TABLE collaboration_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  agent_from TEXT NOT NULL,
  agent_to TEXT NOT NULL,
  fractal_glyph TEXT NOT NULL,
  capsule_data JSONB NOT NULL,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FRACTAL CAPSULES (full storage)
CREATE TABLE fractal_capsules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  glyph TEXT NOT NULL,
  capsule_data JSONB NOT NULL,
  compressed_from_glyph TEXT,
  created_by TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(glyph)
);

-- SUBSCRIPTIONS (from Stripe)
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT NOT NULL,
  plan TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ======================
-- INDEXES
-- ======================

CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_collaboration_project_id ON collaboration_sessions(project_id);
CREATE INDEX idx_capsules_glyph ON fractal_capsules(glyph);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_users_github ON users(github_username) WHERE github_username IS NOT NULL;

-- ======================
-- ROW LEVEL SECURITY (RLS)
-- ======================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fractal_capsules ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- USERS: Users can only see their own data
CREATE POLICY "Users can manage own profile"
  ON users FOR ALL
  USING (auth.uid() = id);

-- CLIENTS: Users can see clients they own
CREATE POLICY "Users can manage own clients"
  ON clients FOR ALL
  USING (user_id = auth.uid());

-- PROJECTS: Users can see projects for their clients
CREATE POLICY "Users can manage own projects"
  ON projects FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = projects.client_id 
      AND clients.user_id = auth.uid()
    )
  );

-- COLLABORATION SESSIONS: Inherit project permissions
CREATE POLICY "Users can view project collaborations"
  ON collaboration_sessions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects p
      JOIN clients c ON p.client_id = c.id
      WHERE p.id = collaboration_sessions.project_id
      AND c.user_id = auth.uid()
    )
  );

-- FRACTAL CAPSULES: Inherit project permissions
CREATE POLICY "Users can view project capsules"
  ON fractal_capsules FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM projects p
      JOIN clients c ON p.client_id = c.id
      WHERE p.id = fractal_capsules.project_id
      AND c.user_id = auth.uid()
    )
  );

-- SUBSCRIPTIONS: Users can see their own subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR ALL
  USING (user_id = auth.uid());

-- ======================
-- REAL-TIME SETUP
-- ======================

ALTER PUBLICATION supabase_realtime ADD TABLE collaboration_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE fractal_capsules;

-- ======================
-- FUNCTIONS & TRIGGERS
-- ======================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
