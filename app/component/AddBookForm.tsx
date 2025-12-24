"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Plus, Book, Trash2, Edit } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AddBookForm() {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [booksList, setBooksList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    aspect: "Astral",
    tier: 1,
    description: "",
    bonus: "",
    image: "",
  });

  const fetchBooks = async () => {
    const { data } = await supabase.from("books").select("*").order("created_at", { ascending: false });
    if (data) setBooksList(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `books/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images") 
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      const publicUrlWithTime = `${publicUrl}?t=${Date.now()}`;

      console.log("Image uploaded, URL:", publicUrlWithTime); 
      setFormData(prev => ({ ...prev, image: publicUrl })); 
      setImagePreview(publicUrlWithTime); 
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Ошибка загрузки: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting book data:", formData); 

    if (!formData.image && !editingId) {
      if (!confirm("Изображение не загружено. Продолжить без него?")) return;
    }

    try {
      if (editingId) {
        console.log("Updating book with ID:", editingId, "Data:", formData);
        const { error } = await supabase.from("books").update(formData).eq("id", editingId);
        if (error) throw error;
        alert("Книга успешно обновлена!");
      } else {
        const { error } = await supabase.from("books").insert([formData]);
        if (error) throw error;
        alert("Книга успешно добавлена!");
      }
      
      setFormData({ name: "", aspect: "Astral", tier: 1, description: "", bonus: "", image: "" });
      setImagePreview(null);
      setEditingId(null);
      fetchBooks(); 
    } catch (error: any) {
      alert("Ошибка сохранения: " + error.message);
    }
  };

  const handleEdit = (book: any) => {
    setEditingId(book.id);
    setFormData({
      name: book.name,
      aspect: book.aspect,
      tier: book.tier,
      description: book.description,
      bonus: book.bonus,
      image: book.image
    });
    setImagePreview(book.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", aspect: "Astral", tier: 1, description: "", bonus: "", image: "" });
    setImagePreview(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить эту книгу?")) return;
    try {
      
      const { count, error: countError } = await supabase
        .from("spells")
        .select("*", { count: 'exact', head: true })
        .eq("book_id", id);

      if (countError) throw countError;

      if (count && count > 0) {
        alert(`Ошибка: К этой книге привязано ${count} заклинаний. Сначала удалите их (во вкладке Заклинания), чтобы удалить книгу.`);
        return;
      }

      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
      fetchBooks();
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
             <h2 className="text-2xl font-bold text-white">Библиотека Книг</h2>
             <p className="text-zinc-500 text-sm mt-1">Управление книгами магии</p>
           </div>
           <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-mono text-zinc-400 border border-zinc-700">
             {booksList.length} книг
           </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
           <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {booksList.map((book) => (
                <div key={book.id} className="group flex items-start gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 hover:border-yellow-500/30 hover:bg-zinc-900 transition-all">
                  <div className="relative w-16 h-16 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-700 group-hover:border-yellow-500/50 transition-colors">
                    {book.image ? (
                      <Image src={book.image} alt={book.name} fill className="object-cover" unoptimized />
                    ) : (
                      <Book className="w-8 h-8 text-zinc-700 m-auto absolute inset-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-200 truncate pr-2">{book.name}</h4>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(book)}
                          className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                          title="Редактировать"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(book.id)}
                          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          title="Удалить"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-yellow-500/80 font-mono mt-0.5">{book.aspect} • Tier {book.tier}</p>
                    <p className="text-xs text-zinc-500 line-clamp-2 mt-2">{book.description}</p>
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
               {editingId ? "Редактирование" : "Новая Книга"}
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
                    placeholder="Название книги"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Аспект</label>
                    <select
                      value={formData.aspect}
                      onChange={(e) => setFormData({ ...formData, aspect: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                      {["Astral", "Chaos", "Materium", "Nature", "Order", "Shadow"].map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Tier</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: parseInt(e.target.value) })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none"
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
                    placeholder="Описание книги..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Бонус</label>
                  <input
                    type="text"
                    value={formData.bonus}
                    onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none"
                    placeholder="+10 к мане..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Изображение</label>
                  <div className="space-y-3">
                    {imagePreview && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950">
                        <Image src={imagePreview} alt="Preview" fill className="object-contain" unoptimized />
                      </div>
                    )}
                    <label className="cursor-pointer flex items-center justify-center gap-2 w-full p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 border-dashed transition-colors text-zinc-400 hover:text-white">
                      <Upload size={18} />
                      <span className="text-sm">{uploading ? "Загрузка..." : "Загрузить обложку"}</span>
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
