"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Plus, Users, Trash2, Edit } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AddUnitForm() {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [unitsList, setUnitsList] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    culture: "",
    type: "",
    unitClass: "",
    tier: "I",
    health: 0,
    attack: 0,
    defense: 0,
    resistance: 0,
    movement: 32,
    image: "",

  });

  const fetchUnits = async () => {
    const { data } = await supabase.from("units").select("*").order("created_at", { ascending: false });
    if (data) {
      const mappedData = data.map((unit: any) => ({
        ...unit,
        unitClass: unit.unit_class || unit.unitClass
      }));
      setUnitsList(mappedData);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `units/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from("images").upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);
      console.log("Unit image uploaded, URL:", publicUrl);
      setFormData(prev => ({ ...prev, image: publicUrl }));
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
    console.log("Submitting unit data:", formData);

    if (!formData.image && !editingId) {
      if (!confirm("Изображение юнита не загружено. Продолжить без него?")) return;
    }

    try {
      const { unitClass, type, ...rest } = formData;
      const payload = {
        ...rest,
        unit_class: unitClass,
        type: type === "" ? null : type,
        upkeep: { resource1: "Gold", amount1: 0 }, 
        cost: { resource1: "Gold", amount1: 0 },   
      };

      if (editingId) {
        const { error } = await supabase.from("units").update(payload).eq("id", editingId);
        if (error) throw error;
        alert("Юнит успешно обновлен!");
      } else {
        const { error } = await supabase.from("units").insert([payload]);
        if (error) throw error;
        alert("Юнит успешно добавлен!");
      }

      setFormData({
        name: "", culture: "", type: "", unitClass: "", tier: "I",
        health: 0, attack: 0, defense: 0, resistance: 0, movement: 32, image: ""
      });
      setImagePreview(null);
      setEditingId(null);
      fetchUnits();
    } catch (error: any) {
      alert("Ошибка сохранения: " + error.message);
    }
  };

  const handleEdit = (unit: any) => {
    setEditingId(unit.id);
    setFormData({
      name: unit.name,
      culture: unit.culture,
      type: unit.type,
      unitClass: unit.unitClass,
      tier: unit.tier,
      health: unit.health,
      attack: unit.attack,
      defense: unit.defense,
      resistance: unit.resistance,
      movement: unit.movement,
      image: unit.image
    });
    setImagePreview(unit.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "", culture: "", type: "", unitClass: "", tier: "I",
      health: 0, attack: 0, defense: 0, resistance: 0, movement: 32, image: ""
    });
    setImagePreview(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этого юнита?")) return;
    try {
      const { error } = await supabase.from("units").delete().eq("id", id);
      if (error) throw error;
      fetchUnits();
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
             <h2 className="text-2xl font-bold text-white">Библиотека Юнитов</h2>
             <p className="text-zinc-500 text-sm mt-1">Управление юнитами</p>
           </div>
           <span className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-mono text-zinc-400 border border-zinc-700">
             {unitsList.length} юнитов
           </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
           <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {unitsList.map((unit) => (
                <div key={unit.id} className="group flex items-start gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 hover:border-yellow-500/30 hover:bg-zinc-900 transition-all">
                  <div className="relative w-16 h-16 bg-zinc-950 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-700 group-hover:border-yellow-500/50 transition-colors">
                    {unit.image ? (
                      <Image src={unit.image} alt={unit.name} fill className="object-cover" unoptimized />
                    ) : (
                      <Users className="w-8 h-8 text-zinc-700 m-auto absolute inset-0" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-200 truncate pr-2">{unit.name}</h4>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(unit)}
                          className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
                          title="Редактировать"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(unit.id)}
                          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          title="Удалить"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-yellow-500/80 font-mono mt-0.5">
                      {unit.culture} • {unit.unitClass} • Tier {unit.tier}
                    </p>
                    <div className="flex gap-2 mt-2 text-[10px] text-zinc-500">
                       <span title="HP">HP: {unit.health}</span>
                       <span title="ATK">ATK: {unit.attack}</span>
                       <span title="DEF">DEF: {unit.defense}</span>
                    </div>
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
               {editingId ? "Редактирование" : "Новый Юнит"}
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
                    placeholder="Название юнита"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Культура</label>
                    <select
                      value={formData.culture}
                      onChange={(e) => setFormData({ ...formData, culture: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                      <option value="">-- Выберите --</option>
                      {[
                        "Феодалы", "Высшие", "Варвар", "Мастерский", "Тьма", 
                        "Мистики", "Корсары", "Первобытные", "Присягнувшие", "Зодчие"
                      ].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Тип</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                      <option value="">-- Выберите --</option>
                      {[
                        "Фея", "Животное", "Чудовищный", "Демон", "Дракон", 
                        "Великаны и", "Полугиганты", "Элементаль", "Нежить", 
                        "Бесплотный", "Растение", "Ангел", "Конструкция", 
                        "Демон мрака", "Проклятый демон"
                      ].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Класс</label>
                    <select
                      value={formData.unitClass}
                      onChange={(e) => setFormData({ ...formData, unitClass: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                      <option value="">-- Выберите --</option>
                      {[
                        "Разведчик", "Застрельщик", "Боец", "Стрелок стрелки", 
                        "Воин с пикой", "Ударный воин", "Воин со щитом", 
                        "Боевые маг", "Воин поддержки", "Мифическое создание"
                      ].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-1.5">Tier</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2.5 text-white focus:border-yellow-500 outline-none appearance-none"
                    >
                      {["I", "II", "III", "IV", "V"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">HP</label>
                    <input type="number" value={formData.health} onChange={(e) => setFormData({ ...formData, health: parseInt(e.target.value) })} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:border-yellow-500 outline-none text-center" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">ATK</label>
                    <input type="number" value={formData.attack} onChange={(e) => setFormData({ ...formData, attack: parseInt(e.target.value) })} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:border-yellow-500 outline-none text-center" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">DEF</label>
                    <input type="number" value={formData.defense} onChange={(e) => setFormData({ ...formData, defense: parseInt(e.target.value) })} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:border-yellow-500 outline-none text-center" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">RES</label>
                    <input type="number" value={formData.resistance} onChange={(e) => setFormData({ ...formData, resistance: parseInt(e.target.value) })} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:border-yellow-500 outline-none text-center" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">MOV</label>
                    <input type="number" value={formData.movement} onChange={(e) => setFormData({ ...formData, movement: parseInt(e.target.value) })} className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:border-yellow-500 outline-none text-center" />
                  </div>
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
                      <span className="text-sm">{uploading ? "Загрузка..." : "Загрузить изображение"}</span>
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
