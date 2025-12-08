"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase"; 

type SavedItemsContextType = {
  savedSpells: string[];
  savedBooks: string[];
  savedUnits: string[];
  toggleFavorite: (itemId: string, type: "spell" | "book" | "unit") => Promise<void>;
  isSaved: (itemId: string, type: "spell" | "book" | "unit") => boolean;
  isLoading: boolean;
};

interface FavoriteItem {
  item_id: string;
  item_type: string;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const [savedSpells, setSavedSpells] = useState<string[]>([]);
  const [savedBooks, setSavedBooks] = useState<string[]>([]);
  const [savedUnits, setSavedUnits] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchFavorites(session.user.id);
      } else {
   
        setSavedSpells([]);
        setSavedBooks([]);
        setSavedUnits([]);
        setIsLoading(false);
      }
    };

    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchFavorites(session.user.id);
      } else {
        setSavedSpells([]);
        setSavedBooks([]);
        setSavedUnits([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchFavorites = async (userId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("favorites")
      .select("item_id, item_type")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching favorites:", error);
    } else if (data) {
      const favorites = data as unknown as FavoriteItem[];
      
      setSavedSpells(favorites.filter((f) => f.item_type === "spell").map((f) => f.item_id));
      setSavedBooks(favorites.filter((f) => f.item_type === "book").map((f) => f.item_id));
      setSavedUnits(favorites.filter((f) => f.item_type === "unit").map((f) => f.item_id));
    }
    setIsLoading(false);
  };

  const toggleFavorite = async (itemId: string, type: "spell" | "book" | "unit") => {
    if (!user) {
      alert("Please login to save items!");
      return;
    }

    let currentList: string[] = [];
    let setList: React.Dispatch<React.SetStateAction<string[]>> = () => {};

    if (type === "spell") { currentList = savedSpells; setList = setSavedSpells; }
    if (type === "book") { currentList = savedBooks; setList = setSavedBooks; }
    if (type === "unit") { currentList = savedUnits; setList = setSavedUnits; }

    const isAlreadySaved = currentList.includes(itemId);

    if (isAlreadySaved) {
      setList(prev => prev.filter(id => id !== itemId));
    } else {
      setList(prev => [...prev, itemId]);
    }

    try {
      if (isAlreadySaved) {

        const { error } = await supabase
          .from("favorites")
          .delete()
          .match({ user_id: user.id, item_id: itemId, item_type: type });
        if (error) throw error;
      } else {

        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, item_id: itemId, item_type: type });
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);

      alert("Failed to save. Please try again.");

    }
  };

  const isSaved = (itemId: string, type: "spell" | "book" | "unit") => {
    if (type === "spell") return savedSpells.includes(itemId);
    if (type === "book") return savedBooks.includes(itemId);
    if (type === "unit") return savedUnits.includes(itemId);
    return false;
  };

  return (
    <SavedItemsContext.Provider
      value={{
        savedSpells,
        savedBooks,
        savedUnits,
        toggleFavorite,
        isSaved,
        isLoading
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
}

export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (!context) throw new Error("useSavedItems must be used within a SavedItemsProvider");
  return context;
};