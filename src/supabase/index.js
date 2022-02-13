import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// const supabaseUrl = 'https://raazhqlzhxsrpdjologa.supabase.co'
// const supabaseAnonKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjg4OTk4MCwiZXhwIjoxOTUyNDY1OTgwfQ.6DTQcazzSb5AoldRNVwp1a_iw9b9a7KSg9KU-F-Pp0o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
