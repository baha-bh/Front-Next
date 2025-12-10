"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SavedItemsContextType {
  savedSpells: string[];
  savedBooks: string[];
  savedUnits: string[];
  isLoading: boolean;
  toggleSpell: (name: string) => void;
  toggleBook: (name: string) => void; // Принимаем имя
  toggleUnit: (name: string) => void; // Принимаем имя
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [savedSpells, setSavedSpells] = useState<string[]>([]);
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [savedUnits, setSavedUnits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      try {
        setSavedSpells(JSON.parse(localStorage.getItem("saved_spells") || "[]"));
        setSavedBooks(JSON.parse(localStorage.getItem("saved_books") || "[]"));
        setSavedUnits(JSON.parse(localStorage.getItem("saved_units") || "[]"));
      } catch (e) {
        console.error("Ошибка чтения localStorage", e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const toggleItem = (key: string, currentList: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    const newList = currentList.includes(item)
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];
    
    setList(newList);
    localStorage.setItem(key, JSON.stringify(newList));
  };

  const toggleSpell = (name: string) => toggleItem("saved_spells", savedSpells, setSavedSpells, name);
  const toggleBook = (name: string) => toggleItem("saved_books", savedBooks, setSavedBooks, name);
  const toggleUnit = (name: string) => toggleItem("saved_units", savedUnits, setSavedUnits, name);

  return (
    <SavedItemsContext.Provider value={{ savedSpells, savedBooks, savedUnits, isLoading, toggleSpell, toggleBook, toggleUnit }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (!context) throw new Error("useSavedItems must be used within a SavedItemsProvider");
  return context;
}
