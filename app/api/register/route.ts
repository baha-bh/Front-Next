import { NextRequest } from "next/server";
import { createClient } from "../../lib/supabaseServer";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    const supabase = await createClient();

    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return new Response(JSON.stringify({ error: signUpError.message }), { status: 400 });
    }

    if (!userData.user) {
      return new Response(JSON.stringify({ error: "Не удалось создать пользователя" }), { status: 400 });
    }

    const userId = userData.user.id;

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert([{ id: userId, username: name, email }]); 

    if (profileError) {
      return new Response(JSON.stringify({ error: profileError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, userId }));
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
