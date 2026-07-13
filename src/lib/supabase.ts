import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sivkfzikalbtrqgednrd.supabase.co';
const supabaseAnonKey = 'sb_publishable_ljCW8MnxzwV-GGAlCVt_ZQ_oTTTO5Gq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
