"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = "Tìm kiếm bài viết...",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to search results page with query parameter
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      clearSearch();
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div
        className={`relative flex items-center transition-all duration-200 ${
          isFocused ? "shadow-lg shadow-primary/10" : "shadow-md"
        }`}
      >
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-200" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full pl-12 pr-12 py-4 bg-card/50 border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 text-lg ${
              isFocused ? "shadow-lg shadow-primary/10" : "shadow-md"
            }`}
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-accent"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={!query.trim()}
          className={`ml-3 px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-primary/25 ${
            query.trim()
              ? "hover:from-primary/90 hover:to-primary/70 hover:scale-105"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Tìm kiếm
        </button>
      </div>

      {/* Search Suggestions (optional - for future enhancement) */}
      {isFocused && query && (
        <div className="absolute top-full mt-2 w-full bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-4 text-sm text-muted-foreground">
            Nhấn Enter để tìm kiếm &ldquo;{query}&rdquo;
          </div>
        </div>
      )}
    </form>
  );
}
