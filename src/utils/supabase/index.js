/* library imports */
import { createClient } from '@supabase/supabase-js'
import { env } from '../'

/* supabase credentials */
const anonymousKey = env('SUPABASE_ANON_KEY')
const supabaseUrl = env('SUPABASE_URL')

/* init supabase */
export const supabase = createClient(supabaseUrl, anonymousKey)
