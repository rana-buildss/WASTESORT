import { createClient } from '@supabase/supabase-js';

// Safe access to environment variables in Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// Supabase publishable keys are intended for browser use with RLS enabled.
// Keep the legacy anon variable supported for existing deployments.
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabasePublishableKey && !supabaseUrl.includes('placeholder')
);

// Graceful client: if not configured, exports a mock/safe client that doesn't crash the application
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;

/** Performs a real, read-only request so the UI or diagnostics can verify setup. */
export async function verifySupabaseConnection(): Promise<{ connected: boolean; error?: string }> {
  if (!supabase) return { connected: false, error: 'Supabase credentials are not configured.' };
  const { error } = await supabase.from('waste_rules').select('id', { head: true, count: 'exact' });
  return error ? { connected: false, error: error.message } : { connected: true };
}
