import { useState, useEffect } from "react";

const SEARCH_HISTORY_KEY = "exploreus_search_history";
const MAX_HISTORY = 10;

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load search history:", e);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage when history changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    }
  }, [history, mounted]);

  const addSearch = (query: string) => {
    if (!query.trim()) return;
    setHistory((prev) => {
      // Remove if already exists to avoid duplicates
      const filtered = prev.filter((q) => q !== query);
      // Add to beginning and limit to MAX_HISTORY
      return [query, ...filtered].slice(0, MAX_HISTORY);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (query: string) => {
    setHistory((prev) => prev.filter((q) => q !== query));
  };

  return { history, addSearch, clearHistory, removeFromHistory };
};
