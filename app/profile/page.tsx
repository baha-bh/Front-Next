"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Loader2, Scroll, Book, Users, Shield, Pencil, Check, X, Lock, LogOut, Eye, EyeOff } from "lucide-react";

import { supabase } from "../lib/supabase";
import { useSavedItems } from "@/context/SavedItemsContext";
import SpellCard from "@/app/component/SpellCard2";
import BookCard from "@/app/component/BookCard"; 
import UnitCard from "@/app/component/UnitCard"; 

type Tab = "spells" | "books" | "units";

export default function ProfilePage() {
  const router = useRouter();
  const { savedSpells, savedBooks, savedUnits, isLoading: isDataLoading } = useSavedItems();
  const [activeTab, setActiveTab] = useState<Tab>("spells");

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [favoriteSpellsData, setFavoriteSpellsData] = useState<any[]>([]);
  const [favoriteBooksData, setFavoriteBooksData] = useState<any[]>([]);
  const [favoriteUnitsData, setFavoriteUnitsData] = useState<any[]>([]); 
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  useEffect(() => {
    const fetchProfileData = async (currentUser: any) => {
      setUser(currentUser);
      
      if (currentUser) {
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
        if (profileData) {
          setProfile(profileData);
          setNewUsername(profileData.username || currentUser.email?.split("@")[0] || "");
        } else {
          setNewUsername(currentUser.email?.split("@")[0] || "");
        }
      } else {
        setProfile(null);
        setNewUsername("");
      }
      setIsAuthLoading(false);
    };

    supabase.auth.getUser().then(({ data: { user } }) => fetchProfileData(user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchProfileData(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isDataLoading) return;
      setIsLoadingContent(true);

      try {
      
        if (savedSpells.length > 0) {
          const { data } = await supabase
            .from('spells')
            .select(`*, books (id, name, image)`)
            .in('name', savedSpells);
          
          if (data) {
            setFavoriteSpellsData(data.map((s: any) => ({
              ...s,
              bookName: s.books?.name,
              bookImage: s.books?.image
            })));
          }
        } else {
           setFavoriteSpellsData([]);
        }

        
        if (savedBooks.length > 0) {
          const { data } = await supabase
            .from('books')
            .select('*')
            .in('name', savedBooks); 
            
          if (data) setFavoriteBooksData(data);
        } else {
           setFavoriteBooksData([]);
        }

        if (savedUnits.length > 0) {
          const { data } = await supabase
            .from('units')
            .select('*')
            .in('name', savedUnits); 
            
          if (data) setFavoriteUnitsData(data);
        } else {
           setFavoriteUnitsData([]);
        }

      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setIsLoadingContent(false);
      }
    };

    if (!isDataLoading) fetchFavorites();

  }, [isDataLoading]); 


  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      const updates = {
        id: user.id,
        username: newUsername,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;

      setProfile({ ...profile, ...updates });
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      alert("Ошибка обновления профиля: " + error.message);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Пароль должен быть не менее 6 символов");
      return;
    }

    setIsPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      alert("Пароль успешно изменен!");
      setIsChangingPassword(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error(error);
      alert("Ошибка смены пароля: " + error.message);
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const displayedSpells = useMemo(() => favoriteSpellsData.filter(s => savedSpells.includes(s.name)), [favoriteSpellsData, savedSpells]);
  const displayedBooks = useMemo(() => favoriteBooksData.filter(b => savedBooks.includes(b.name)), [favoriteBooksData, savedBooks]);
  const displayedUnits = useMemo(() => favoriteUnitsData.filter(u => savedUnits.includes(u.name)), [favoriteUnitsData, savedUnits]);


  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
       
      const publicUrlWithCacheBust = `${publicUrl}?t=${new Date().getTime()}`;

      const updates = {
        id: user.id,
        avatar_url: publicUrlWithCacheBust,
        email: user.email,
        updated_at: new Date(),
      };

      const { error: updateError } = await supabase.from('profiles').upsert(updates);
      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrlWithCacheBust });
      alert("Аватар обновлен!");

    } catch (error: any) {
      console.error(error);
      alert("Ошибка: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white gap-6">
        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center text-4xl border border-zinc-700">
          <Shield className="w-10 h-10 text-zinc-500" />
        </div>
        <h1 className="text-2xl font-bold text-amber-500">Доступ закрыт</h1>
        <Link href="/login" className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg transition-all">
          Войти в аккаунт
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-gray-100 font-sans pb-20">
      {/* HEADER */}
      <div className="relative w-full bg-zinc-900 border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/bg-pattern.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-zinc-900/80 to-zinc-950" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12 flex flex-col md:flex-row items-center md:items-end gap-8">
          {/* Аватар */}
          <div className="relative group">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-zinc-950 shadow-2xl shadow-amber-900/30 overflow-hidden bg-zinc-800 ring-2 ring-amber-500/30">
               <Image
                src={profile?.avatar_url || "/default-avatar.png"}
                alt="avatar"
                fill
                className="object-cover"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300 z-10"
              >
                <Camera className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />
          </div>

          <div className="flex-1 text-center md:text-left mb-2">
            {isEditing ? (
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <input 
                  type="text" 
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 text-white px-3 py-1 rounded text-2xl font-bold focus:outline-none focus:border-amber-500"
                />
                <button onClick={handleUpdateProfile} className="p-2 bg-green-600/20 text-green-500 border border-green-600/50 rounded hover:bg-green-600/40 transition-colors">
                  <Check size={20}/>
                </button>
                <button onClick={() => setIsEditing(false)} className="p-2 bg-red-600/20 text-red-500 border border-red-600/50 rounded hover:bg-red-600/40 transition-colors">
                  <X size={20}/>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 justify-center md:justify-start group/edit mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                  {profile?.username || user.email?.split("@")[0]}
                </h1>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="opacity-0 group-hover/edit:opacity-100 transition-all text-zinc-400 hover:text-amber-500 p-1"
                  title="Редактировать имя"
                >
                  <Pencil size={18} />
                </button>
              </div>
            )}
            <p className="text-zinc-400 text-sm mt-1"> {user.email}</p>

            {/* Смена пароля и Выход */}
            <div className="mt-4 flex flex-col items-center md:items-start gap-3">
              {!isChangingPassword ? (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsChangingPassword(true)}
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-amber-500 transition-colors"
                  >
                    <Lock size={14} />
                    Сменить пароль
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={14} />
                    Выйти
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 bg-zinc-900/80 p-4 rounded-lg border border-zinc-700 mt-2 w-full max-w-xs backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-sm font-bold text-zinc-300">Новый пароль</h3>
                  
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Минимум 6 символов"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-zinc-950 border border-zinc-700 text-white px-3 py-2 pr-10 rounded text-sm w-full focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-zinc-950 border border-zinc-700 text-white px-3 py-2 rounded text-sm w-full focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  
                  <div className="flex gap-2 mt-1">
                    <button 
                      onClick={handleChangePassword} 
                      disabled={isPasswordLoading}
                      className="flex-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-black text-sm font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPasswordLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto"/> : "Сохранить"}
                    </button>
                    <button 
                      onClick={() => {
                        setIsChangingPassword(false);
                        setNewPassword("");
                        setConfirmPassword("");
                      }} 
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded border border-zinc-700 transition-colors"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <StatBadge icon={<Scroll size={14} />} label="Заклинаний" value={savedSpells.length} />
              <StatBadge icon={<Book size={14} />} label="Книг" value={savedBooks.length} />
              <StatBadge icon={<Users size={14} />} label="Армия" value={savedUnits.length} />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full px-6 mt-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-zinc-800 pb-1">
          <TabButton active={activeTab === "spells"} onClick={() => setActiveTab("spells")} label="Заклинания" count={savedSpells.length} />
          <TabButton active={activeTab === "books"} onClick={() => setActiveTab("books")} label="Книги Магии" count={savedBooks.length} />
          <TabButton active={activeTab === "units"} onClick={() => setActiveTab("units")} label="Войска" count={savedUnits.length} />
        </div>

        <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          {isDataLoading || isLoadingContent ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-amber-600" />
              <p>Открываем гримуар...</p>
            </div>
          ) : (
            <>
              {/* --- ЗАКЛИНАНИЯ --- */}
              {activeTab === "spells" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedSpells.length > 0 ? (
                    displayedSpells.map((spell) => (
                      <SpellCard 
                        key={spell.id} 
                        spell={spell}        
                      />
                    ))
                  ) : (
                    <EmptyState title="Гримуар пуст" desc="Вы еще не сохранили ни одного заклинания." link="/spells" icon={<Scroll className="w-12 h-12 text-zinc-600 mb-4" />} />
                  )}
                </div>
              )}

              {/* --- СПИСОК КНИГ --- */}
              {activeTab === "books" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedBooks.length > 0 ? (
                    displayedBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))
                  ) : (
                    <EmptyState title="Библиотека пуста" desc="Древние тома еще не собраны." link="/books" icon={<Book className="w-12 h-12 text-zinc-600 mb-4" />} />
                  )}
                </div>
              )}

              {/* --- СПИСОК ЮНИТОВ --- */}
              {activeTab === "units" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {displayedUnits.length > 0 ? (
                    displayedUnits.map((unit) => (
                      <UnitCard key={unit.id} unit={unit} />
                    ))
                  ) : (
                    <EmptyState title="Казармы пусты" desc="Воины еще не собраны." link="/warriors" icon={<Users className="w-12 h-12 text-zinc-600 mb-4" />} />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

// Вспомогательные компоненты
function StatBadge({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-gray-300">
      <span className="text-amber-500">{icon}</span>
      <span>{label}: <span className="font-bold text-white">{value}</span></span>
    </div>
  );
}

function TabButton({ active, onClick, label, count }: { active: boolean, onClick: () => void, label: string, count: number }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-t-lg transition-all duration-300 flex items-center gap-2 group ${
        active
          ? "text-amber-400 border-b-2 border-amber-500 bg-zinc-900/30"
          : "text-gray-500 hover:text-gray-300 hover:bg-zinc-900/50 border-b-2 border-transparent"
      }`}
    >
      <span className="font-bold tracking-wide">{label}</span>
      {count > 0 && (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
          active ? "bg-amber-500/20 text-amber-400" : "bg-zinc-800 text-gray-500 group-hover:text-gray-300"
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

function EmptyState({ title, desc, link, icon }: { title: string; desc: string; link: string; icon: React.ReactNode }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
      {icon}
      <h3 className="text-xl font-bold text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm text-center">{desc}</p>
      <Link href={link} className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg">Исследовать</Link>
    </div>
  );
}
