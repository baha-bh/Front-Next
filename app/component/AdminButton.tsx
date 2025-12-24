"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminButton() {
  const [role, setRole] = useState<string | null>(null);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    setRole(data?.role || null);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) checkAdmin(user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkAdmin(session.user.id);
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (role !== 'admin' && role !== 'moderator') return null;

  const isModerator = role === 'moderator';

  return (
    <Link 
      href="/admin" 
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-bold border ${
        isModerator 
          ? "bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 border-blue-900/50" 
          : "bg-red-900/30 hover:bg-red-900/50 text-red-400 border-red-900/50"
      }`}
    >
      {isModerator ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
      <span>{isModerator ? "Модератор" : "Админ"}</span>
    </Link>
  );
}
