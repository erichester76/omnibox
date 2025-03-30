/* src/client.js */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://appid.supabase.co', 'anon-public-key')

export {
  supabase
}