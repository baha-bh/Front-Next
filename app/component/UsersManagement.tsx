"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Search, Check, X, Edit } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log("Fetching users...");
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      
      console.log("Users fetch result:", { data, error });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: selectedRole })
        .eq("id", userId);

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, role: selectedRole } : u));
      setEditingUser(null);
    } catch (error: any) {
      alert("Ошибка обновления роли: " + error.message);
    }
  };

  const filteredUsers = users.filter(u => 
    (u.username?.toLowerCase().includes(search.toLowerCase()) || 
     u.email?.toLowerCase().includes(search.toLowerCase()) ||
     u.id.includes(search))
  );

  return (
    <div className="h-full flex flex-col relative z-10">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-bold text-white">Управление пользователями</h2>
          <p className="text-zinc-500 text-sm mt-1">Назначение ролей и модерация</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Поиск пользователя..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-yellow-500 w-64"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl backdrop-blur-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-900/80 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="p-4 text-zinc-400 font-medium border-b border-zinc-800">Пользователь</th>
                <th className="p-4 text-zinc-400 font-medium border-b border-zinc-800">Email</th>
                <th className="p-4 text-zinc-400 font-medium border-b border-zinc-800">Роль</th>
                <th className="p-4 text-zinc-400 font-medium border-b border-zinc-800 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden relative">
                        {user.avatar_url ? (
                          <Image src={user.avatar_url} alt={user.username} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                            {user.username?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-white">{user.username || "Без имени"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400 text-sm">{user.email || "—"}</td>
                  <td className="p-4">
                    {editingUser === user.id ? (
                      <select 
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="bg-zinc-950 border border-zinc-700 text-white px-2 py-1 rounded text-sm focus:outline-none focus:border-yellow-500"
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                        user.role === 'moderator' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {user.role || 'user'}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingUser === user.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleUpdateRole(user.id)}
                          className="p-1.5 bg-green-600/20 text-green-500 rounded hover:bg-green-600/30 transition-colors"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => setEditingUser(null)}
                          className="p-1.5 bg-red-600/20 text-red-500 rounded hover:bg-red-600/30 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          setEditingUser(user.id);
                          setSelectedRole(user.role || "user");
                        }}
                        className="p-1.5 text-zinc-500 hover:text-yellow-500 transition-colors"
                        title="Изменить роль"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </div>
  );
}
