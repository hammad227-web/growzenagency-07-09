/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { BookingFormData, SupabaseBookingRecord } from '../types';

export const SUPABASE_PROJECT_ID = 'fmwmswxjcengzxzakupg';
export const SUPABASE_DEFAULT_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_DEFAULT_KEY = 'sb_publishable_isA3KJeLuZ8gBwMT_2kXkA_U31HGo_k';

const metaEnv = (import.meta as any).env || {};
export const supabaseUrl =
  (metaEnv.VITE_SUPABASE_URL as string) || SUPABASE_DEFAULT_URL;
export const supabaseAnonKey =
  (metaEnv.VITE_SUPABASE_ANON_KEY as string) || SUPABASE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SUPABASE_SQL_SETUP = `-- Copy and paste this into your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- Then click "Run" to create the bookings table with Row Level Security:

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  service TEXT NOT NULL,
  budget TEXT,
  package_tier TEXT,
  message TEXT,
  status TEXT DEFAULT 'new'
);

-- If you already created the bookings table previously, run this to add the budget column:
-- ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS budget TEXT;

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public visitor submissions for appointment booking
CREATE POLICY "Allow anonymous bookings insert"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading bookings
CREATE POLICY "Allow reading bookings"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);
`;

const LOCAL_STORAGE_KEY = 'growzen_bookings_backup';

export function getLocalBookings(): SupabaseBookingRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalBooking(record: SupabaseBookingRecord): void {
  try {
    const list = getLocalBookings();
    list.unshift(record);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
  } catch (err) {
    console.warn('Could not cache booking locally', err);
  }
}

export interface SaveBookingResult {
  success: boolean;
  id?: string;
  source: 'supabase' | 'local_backup';
  tableMissing?: boolean;
  error?: string;
}

export async function saveBookingToSupabase(
  formData: BookingFormData
): Promise<SaveBookingResult> {
  const localRecord: SupabaseBookingRecord = {
    id: `local-${Date.now()}`,
    created_at: new Date().toISOString(),
    full_name: formData.fullName.trim(),
    phone: formData.phone.trim(),
    email: formData.email.trim(),
    service: formData.service,
    budget: formData.budget?.trim() || '',
    package_tier: formData.packageTier,
    message: formData.message.trim(),
    status: 'new',
    source: 'local_backup',
  };

  // Always back up locally first so zero leads are ever dropped
  saveLocalBooking(localRecord);

  try {
    // Attempt inserting into 'bookings' table with budget
    const insertPayload: Record<string, any> = {
      full_name: localRecord.full_name,
      phone: localRecord.phone,
      email: localRecord.email,
      service: localRecord.service,
      package_tier: localRecord.package_tier,
      message: localRecord.message,
      status: 'new',
    };

    if (localRecord.budget) {
      insertPayload.budget = localRecord.budget;
    }

    let { data, error } = await supabase
      .from('bookings')
      .insert([insertPayload])
      .select('id, created_at')
      .single();

    // If budget column does not exist yet in user's existing table, retry without column
    if (error && (error.message?.includes('budget') || error.code === '42703')) {
      const fallbackMessage = localRecord.budget
        ? `[Budget: ${localRecord.budget}]\n${localRecord.message}`
        : localRecord.message;

      const fallbackPayload = {
        full_name: localRecord.full_name,
        phone: localRecord.phone,
        email: localRecord.email,
        service: localRecord.service,
        package_tier: localRecord.package_tier,
        message: fallbackMessage,
        status: 'new',
      };

      const retryRes = await supabase
        .from('bookings')
        .insert([fallbackPayload])
        .select('id, created_at')
        .single();

      if (!retryRes.error) {
        return {
          success: true,
          id: retryRes.data?.id,
          source: 'supabase',
        };
      }
    }

    if (error) {
      console.warn('Supabase insert notice:', error);

      // Check if table does not exist in schema cache
      const isTableMissing =
        error.code === 'PGRST205' ||
        error.message?.includes('Could not find the table') ||
        error.message?.includes('relation "public.bookings" does not exist');

      return {
        success: true, // Saved in local backup
        source: 'local_backup',
        tableMissing: isTableMissing,
        error: error.message,
      };
    }

    return {
      success: true,
      id: data?.id,
      source: 'supabase',
    };
  } catch (err: any) {
    console.error('Failed to communicate with Supabase:', err);
    return {
      success: true, // Saved in local backup
      source: 'local_backup',
      error: err?.message || 'Network error while contacting Supabase',
    };
  }
}

export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  tableExists: boolean;
  message: string;
}> {
  try {
    const { error } = await supabase.from('bookings').select('id').limit(1);

    if (!error) {
      return {
        connected: true,
        tableExists: true,
        message: 'Supabase connection verified! The bookings table is ready.',
      };
    }

    if (
      error.code === 'PGRST205' ||
      error.message?.includes('Could not find the table')
    ) {
      return {
        connected: true,
        tableExists: false,
        message:
          'Connected to Supabase project, but "bookings" table needs to be created in your Supabase SQL Editor.',
      };
    }

    return {
      connected: false,
      tableExists: false,
      message: `Supabase returned: ${error.message}`,
    };
  } catch (err: any) {
    return {
      connected: false,
      tableExists: false,
      message: `Connection check failed: ${err?.message || 'Unknown network error'}`,
    };
  }
}

export async function fetchRecentBookings(): Promise<{
  bookings: SupabaseBookingRecord[];
  source: 'supabase' | 'local_backup';
}> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);

    if (!error && data && data.length >= 0) {
      return {
        bookings: data.map((item) => ({ ...item, source: 'supabase' })),
        source: 'supabase',
      };
    }
  } catch (err) {
    console.warn('Error fetching from Supabase, using local backup', err);
  }

  return {
    bookings: getLocalBookings(),
    source: 'local_backup',
  };
}
