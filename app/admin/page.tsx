"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert, Book, Scroll, Users, UserCog } from "lucide-react";
import { supabase } from "../lib/supabase";
import UsersManagement from "../component/UsersManagement";
import AddBookForm from "../component/AddBookForm";
import AddSpellForm from "../component/AddSpellForm";
import AddUnitForm from "../component/AddUnitForm";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"book" | "spell" | "unit" | "users">("book");

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin" || profile?.role === "moderator") {
        setIsAdmin(true);
        setUserRole(profile.role);
      } else {
        router.push("/"); 
      }
      setLoading(false);
    };
    checkAdmin();
  }, [router]);

  if (loading) return <div className="flex h-screen items-center justify-center bg-zinc-950 text-yellow-500"><Loader2 className="animate-spin w-10 h-10" /></div>;

  if (!isAdmin) return null;

  return (
    <div className="flex h-screen bg-zinc-950 text-gray-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col flex-shrink-0 z-20">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold text-yellow-500 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6" /> 
            Архимаг
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Панель управления</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab("book")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "book" 
                ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <Book size={20} />
            <span className="font-medium">Книги Магии</span>
          </button>
          
          <button
            onClick={() => setActiveTab("spell")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "spell" 
                ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <Scroll size={20} />
            <span className="font-medium">Заклинания</span>
          </button>
          
          <button
            onClick={() => setActiveTab("unit")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === "unit" 
                ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" 
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Юниты</span>
          </button>

          {userRole === "admin" && (
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === "users" 
                  ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" 
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              <UserCog size={20} />
              <span className="font-medium">Пользователи</span>
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-zinc-800">
           <button onClick={() => router.push('/')} className="w-full py-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
             Вернуться на сайт
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950 relative">
         {/* Background decoration */}
         <div className="absolute inset-0 bg-[url('/Background_Unitpanel.png')] opacity-5 pointer-events-none bg-cover bg-center" />
         
         {activeTab === "book" && <AddBookForm />}
         {activeTab === "spell" && <AddSpellForm />}
         {activeTab === "unit" && <AddUnitForm />}
         {activeTab === "users" && userRole === "admin" && <UsersManagement />}
      </main>
    </div>
  );
}
