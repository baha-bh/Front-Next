import { createClient } from "../lib/supabaseServer";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <p>Пожалуйста, войдите в систему</p>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-8">
      <h1>Добро пожаловать, {profile?.username || user.email}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
