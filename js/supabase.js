// Supabase Configuration
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ⚠️ IMPORTANTE: Reemplaza con tus credenciales de Supabase
const SUPABASE_URL = 'https://tu-proyecto.supabase.co'
const SUPABASE_ANON_KEY = 'tu-clave-anonima-aqui'

// Crear cliente de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Exportar cliente para uso en otros archivos
window.supabase = supabase

console.log('Supabase client initialized successfully')

export { supabase }