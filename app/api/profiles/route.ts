// app/api/testSupabase/route.ts (Next.js 13+)
import { createClient } from "../../lib/supabaseServer";

export async function GET() {
  const supabase = await createClient();
  
  // Попробуем получить таблицы или сделать простой запрос
  const { data, error } = await supabase.from("profiles").select("*").limit(1);

  if (error) {
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true, data }), { status: 200 });
}
