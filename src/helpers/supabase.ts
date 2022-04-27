import { createClient } from '@supabase/supabase-js';
//import { definitions } from '../types/BudgetRow'

// const url = import.meta.env.SUPABASE_URL
// console.log('url', url)

export const supabase = createClient(
  'https://fqjkcbtskhbgwflttkky.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxamtjYnRza2hiZ3dmbHR0a2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDczOTA2MTEsImV4cCI6MTk2Mjk2NjYxMX0.JUkwApHHI0W8XwQ7TUQUWnIgMfbrouF42jSIqq8GxV4'
)