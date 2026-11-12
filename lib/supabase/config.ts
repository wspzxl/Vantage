/**
 * True once real Supabase credentials exist. Until then, auth is bypassed
 * in demo mode (see proxy/middleware and dashboard layout) so the UI is
 * clickable without an account. Remove the demo-mode branches once this
 * is always true in every environment that matters.
 */
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
