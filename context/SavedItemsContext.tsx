"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../app/lib/supabase";

interface SavedItemsContextType {
  savedSpells: string[];
  savedBooks: string[];
  savedUnits: string[];
  isLoading: boolean;
  isAuthenticated: boolean;
  toggleSpell: (name: string) => void;
  toggleBook: (name: string) => void;
  toggleUnit: (name: string) => void;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [savedSpells, setSavedSpells] = useState<string[]>([]);
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [savedUnits, setSavedUnits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const isAuthenticated = !!userId;

  // 1. Следим за авторизацией
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Загружаем данные при смене пользователя
  useEffect(() => {
    const load = () => {
      setIsLoading(true);
      try {
        // Если пользователь не авторизован, используем ключ 'guest'
        // Если авторизован - используем его ID
        const suffix = userId ? `_${userId}` : "_guest";

        setSavedSpells(JSON.parse(localStorage.getItem(`saved_spells${suffix}`) || "[]"));
        setSavedBooks(JSON.parse(localStorage.getItem(`saved_books${suffix}`) || "[]"));
        setSavedUnits(JSON.parse(localStorage.getItem(`saved_units${suffix}`) || "[]"));
      } catch (e) {
        console.error("Ошибка чтения localStorage", e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [userId]);

  const toggleItem = (keyBase: string, currentList: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    const newList = currentList.includes(item)
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];
    
    setList(newList);
    
    const suffix = userId ? `_${userId}` : "_guest";
    localStorage.setItem(`${keyBase}${suffix}`, JSON.stringify(newList));
  };

  const toggleSpell = (name: string) => toggleItem("saved_spells", savedSpells, setSavedSpells, name);
  const toggleBook = (name: string) => toggleItem("saved_books", savedBooks, setSavedBooks, name);
  const toggleUnit = (name: string) => toggleItem("saved_units", savedUnits, setSavedUnits, name);

  return (
    <SavedItemsContext.Provider value={{ savedSpells, savedBooks, savedUnits, isLoading, isAuthenticated, toggleSpell, toggleBook, toggleUnit }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (!context) throw new Error("useSavedItems must be used within a SavedItemsProvider");
  return context;
}
