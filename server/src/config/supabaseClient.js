import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // pastikan .env dimuat

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Supabase URL atau ANON KEY belum terdefinisi di .env");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
