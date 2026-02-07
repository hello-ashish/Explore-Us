import { Search, X, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useSearchHistory } from "@/hooks/use-search-history";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { history, addSearch, clearHistory, removeFromHistory } = useSearchHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (query: string) => {
    onChange(query);
    if (query.trim()) {
      addSearch(query);
    }
  };

  const handleHistoryClick = (query: string) => {
    onChange(query);
    addSearch(query);
    setIsFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search AI tools, categories, or tasks..."
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        className="search-glass w-full pl-14 pr-12"
      />
      {value && (
        <button
          onClick={() => handleSearch("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}

      {/* Search History Dropdown */}
      <AnimatePresence>
        {isFocused && history.length > 0 && !value && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-20"
          >
            <div className="p-2 space-y-1">
              <div className="px-3 py-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Recent Searches
                </p>
                <button
                  onClick={() => clearHistory()}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </div>
              {history.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleHistoryClick(query)}
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted transition-colors flex items-center justify-between group"
                >
                  <span>{query}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(query);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;
