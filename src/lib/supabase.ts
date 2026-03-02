import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

// Check if we are in production. Since this is an ISP block issue in India,
// routing through the same-origin Vercel deployment acts as a proxy.
const isProd = import.meta.env.PROD;

// Use the relative path for Vercel rewrites in production, otherwise use the direct URL locally.
const clientUrl = isProd ? '/api/supabase' : supabaseUrl;

export const supabase = createClient(clientUrl, supabaseAnonKey, {
    global: {
        headers: {
            // Keep the original URL for Host headers if required by Supabase, 
            // though the JS client usually handles this with the anon key
        }
    }
});
