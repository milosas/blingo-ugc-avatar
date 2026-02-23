-- Credits system: Stripe integration, credit transactions, subscription tracking
-- All users start with 10 free credits (already in 004_dashboard_credits.sql)

-- ============================================================================
-- ADD STRIPE AND SUBSCRIPTION FIELDS TO PROFILES
-- ============================================================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS social_subscription_active BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- ============================================================================
-- CREDIT TRANSACTIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'bonus')),
  description TEXT,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);
