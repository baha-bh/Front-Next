"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Plus, Scroll, Trash2, Edit } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AddSpellForm() {
  const [books, setBooks] = useState<any[]>([]);
  const [spellsList, setSpellsList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    tier: 1,
    type: "Боевое заклинание",
    cost: "",
    description: "",
    icon: "",
    book_id: "", 
  });

  const fetchBooks = async () => {
    const { data } = await supabase.from("books").select("id, name").order("name");
    if (data) setBooks(data);
  };

  const fetchSpells = async () => {
    const { data } = await supabase.from("spells").select("*, books(name)").order("created_at", { ascending: false });
    if (data) setSpellsList(data);
  };

  useEffect(() => {
    fetchBooks();
    fetchSpells();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `spells/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from("images").upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);
      console.log("Spell icon uploaded, URL:", publicUrl);
      setFormData(prev => ({ ...prev, icon: publicUrl }));
      setImagePreview(publicUrl);
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Ошибка загрузки: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting spell data:", formData);

    if (!formData.icon && !editingId) {
      if (!confirm("Иконка не загружена. Продолжить без неё?")) return;
    }

    try {
      const payload = {
        ...formData,
        book_id: formData.book_id ? parseInt(formData.book_id) : null
      };

      console.log("Sending payload:", payload);

      if (editingId) {
        const { data, error } = await supabase
            .from("spells")
            .update(payload)
            .eq("id", editingId)
            .select();
            
        if (error) throw error;
        if (!data || data.length === 0) {
            throw new Error("Update succeeded but no data returned. Check permissions.");
        }
        alert("Заклинание успешно обновлено!");
      } else {
        const { data, error } = await supabase
            .from("spells")
            .insert([payload])
            .select();
            
        if (error) throw error;
        alert("Заклинание успешно добавлено!");
      }

      setFormData({ name: "", tier: 1, type: "Боевое заклинание", cost: "", description: "", icon: "", book_id: "" });
      setImagePreview(null);
      setEditingId(null);
      fetchSpells();
    } catch (error: any) {
      console.error("Save error:", error);
      alert("Ошибка сохранения: " + (error.message || error.details || JSON.stringify(error)));
    }
  };

  const handleEdit = (spell: any) => {
    setEditingId(spell.id);
    
    let costVal = spell.cost;
    if (typeof costVal === 'object' && costVal !== null) {
        costVal = Object.values(costVal).join(', ');
    }

    setFormData({
      name: spell.name,
      tier: spell.tier,
      type: spell.type,
      cost: costVal || "",
      description: spell.description,
      icon: spell.icon,
      book_id: spell.book_id ? spell.book_id.toString() : ""
    });
    setImagePreview(spell.icon);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", tier: 1, type: "Боевое заклинание", cost: "", description: "", icon: "", book_id: "" });
    setImagePreview(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить это заклинание?")) return;
    try {
      const { error } = await supabase.from("spells").delete().eq("id", id);
      if (error) throw error;
      fetchSpells();
    } catch (error: any) {
      alert("Ошибка удаления: " + error.message);
    }
  };

  return (
    <div className="flex h-full relative z-10">
      {/* Left: List */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-zinc-800 bg-zinc-950/50">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
           <div>
             <h2 className="text-2xl font-bold text-white">Библиотека Заклинаний</h2>
             <p className="text-zinc-500 text-sm mt-1">Управление заклинаниями</p>
           </div>
           <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-mono text-zinc-400 border border-zinc-700">
             {spellsList.length} заклинаний
           </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {spellsList.map((spell) => (
                <div key={spell.id} className="group flex items-start gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 hover:border-yellow-500/30 hover:bg-zinc-900 transition-all">
                  <div className="relative w-16 h-16 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-700 group-hover:border-yellow-500/50 transition-colors">
                    {spell.icon ? (
                      <Image src={spell.icon} alt={spell.name} fill className="object-cover" unoptimized />
                    ) : (
                      <Scroll className="w-8 h-8 text-zinc-700 m-auto absolute inset-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-200 truncate pr-2">{spell.name}</h4>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(spell)}
                          className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                          title="Редактировать"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(spell.id)}
                          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          title="Удалить"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-yellow-500/80 font-mono mt-0.5">
                      {spell.books?.name || "Без книги"} • Tier {spell.tier}
                    </p>
                    <p className="text-xs text-zinc-500 line-clamp-2 mt-2">{spell.description}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-[400px] flex flex-col bg-zinc-900 border-l border-zinc-800 shadow-2xl z-20">
         <div className="p-6 border-b border-zinc-800 bg-zinc-900">
            <h3 className="text-lg font-bold text-yellow-500 flex items-center gap-2">
               {editingId ? <Edit size={18} /> : <Plus size={18} />}
               {editingId ? "Редактирование" : "Новое Заклинание"}
            </h3>
         </div>
         
         <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-5">
               {/* Form Fields */}
               <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Название</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                    placeholder="Название заклинания"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Книга</label>
                    <select
                      value={formData.book_id}
                      onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                      <option value="">-- Выберите книгу --</option>
                      {books.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Tier</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: parseInt(e.target.value) })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Тип</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                      {[
                        "Боевое заклинание",
                        "Стратегическое заклинание",
                        "Чары для юнитов",
                        "Чары для города",
                        "Терраформирование",
                        "Осадный проект",
                        "Малая трансформация",
                        "Великая трансформация"
                      ].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Стоимость</label>
                    <input
                      type="text"
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none"
                      placeholder="30 маны"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Описание</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none resize-none"
                    placeholder="Описание заклинания..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Иконка</label>
                  <div className="space-y-3">
                    {imagePreview && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950">
                        <Image src={imagePreview} alt="Preview" fill className="object-contain" unoptimized />
                      </div>
                    )}
                    <label className="cursor-pointer flex items-center justify-center gap-2 w-full p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 border-dashed transition-colors text-zinc-400 hover:text-white">
                      <Upload size={18} />
                      <span className="text-sm">{uploading ? "Загрузка..." : "Загрузить иконку"}</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full py-3 font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${editingId ? "bg-blue-600 hover:bg-blue-500" : "bg-yellow-600 hover:bg-yellow-500"} text-black shadow-lg shadow-yellow-900/20`}
                  >
                    {editingId ? <Edit size={18} /> : <Plus size={18} />}
                    {editingId ? "Сохранить" : "Добавить"}
                  </button>
                  
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-all"
                    >
                      Отмена
                    </button>
                  )}
                </div>
            </form>
         </div>
      </div>
    </div>
  );
}
