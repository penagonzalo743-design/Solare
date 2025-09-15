// Supabase Configuration
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ⚠️ IMPORTANTE: Reemplaza con tus credenciales de Supabase
const SUPABASE_URL = 'https://pdufdbynsbhznnvvzujm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkdWZkYnluc2Joem5udnZ6dWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NjU3MDIsImV4cCI6MjA3MjM0MTcwMn0.8AdR-DD2EPeBVPbSjkBNkGaENM97Hn1uzDc5tl9Ognw'

// Crear cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Exportar cliente para uso en otros archivos
window.supabase = supabase

console.log('Supabase client initialized successfully')

export { supabase }