CREATE TABLE IF NOT EXISTS social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  platform_username TEXT,
  late_account_id TEXT NOT NULL,
  connected_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own social accounts" ON social_accounts
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE generated_posts ADD COLUMN IF NOT EXISTS published_to JSONB DEFAULT '{}';
