// ==========================================
// KYNENCE LAB — SUPABASE CLIENT V1.0
// ==========================================

const KYNENCE_SUPABASE_URL = "https://kixrhervwyfzyyksnleh.supabase.co";
const KYNENCE_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeHJoZXJ2d3lmenl5a3NubGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3NDU2MjYsImV4cCI6MjExMDMyMTYyNn0._wrSwC7OlaTuOplXocjcug3Ufy6ZsZ-UUxb4GPtZTMI"
const kynenceSupabase = window.supabase.createClient(
 KYNENCE_SUPABASE_URL,
 KYNENCE_SUPABASE_KEY
);

window.kynenceSupabase = kynenceSupabase;

console.log("[KYNENCE] Supabase conectado.");