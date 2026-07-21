import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: true,
    persistSession: true,
  },
});

/**
 * Generates a raw nonce and its SHA-256 hashed counterpart for Google ID Token auth.
 * Google GIS expects the hashed nonce, while Supabase GoTrue expects the raw nonce
 * so it can hash it server-side and verify the match.
 */
export async function generateNonce(): Promise<{ rawNonce: string; hashedNonce: string }> {
  const rawNonce = crypto.randomUUID();
  const encoder = new TextEncoder();
  const data = encoder.encode(rawNonce);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return { rawNonce, hashedNonce };
}



