import React, { createContext, useContext, useState, useEffect } from "react";

interface FavoritesContextType {
  favorites: Set<string>;
  addFavorite: (toolId: string) => void;
  removeFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("exploreus_favorites");
    if (saved) {
      try {
        setFavorites(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to load favorites:", e);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("exploreus_favorites", JSON.stringify(Array.from(favorites)));
    }
  }, [favorites, mounted]);

  const addFavorite = (toolId: string) => {
    setFavorites((prev) => new Set(prev).add(toolId));
  };

  const removeFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      updated.delete(toolId);
      return updated;
    });
  };

  const isFavorite = (toolId: string) => favorites.has(toolId);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
