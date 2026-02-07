import { useState, useMemo } from "react";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import ToolGrid from "@/components/ToolGrid";
import StatsBar from "@/components/StatsBar";
import CursorGlow from "@/components/CursorGlow";
import { ToolDetailsModal } from "@/components/ToolDetailsModal";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { TrendingSection } from "@/components/TrendingSection";
import { CollectionsPanel } from "@/components/CollectionsPanel";
import { ExportTools } from "@/components/ExportTools";
import { ThemeToggle } from "@/components/ThemeToggle";
import { aiTools, AITool } from "@/data/tools";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [pricing, setPricing] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "rating" | "reviews" | "trending">("name");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  const filteredTools = useMemo(() => {
    let filtered = aiTools;

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((tool) => favorites.has(tool.id));
    }

    // Filter by pricing
    if (pricing.length > 0) {
      filtered = filtered.filter((tool) => pricing.includes(tool.pricing));
    }

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          tool.category.toLowerCase().includes(query)
      );
    }

    // Sort filtering results
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "reviews") {
        return b.reviews - a.reviews;
      } else if (sortBy === "trending") {
        // Trending tools first, then by rating
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return b.rating - a.rating;
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, activeCategory, pricing, sortBy, showFavoritesOnly, favorites]);

  const handleToolClick = (tool: AITool) => {
    setSelectedTool(tool);
    setIsDetailsOpen(true);
  };

  const handleResetFilters = () => {
    setPricing([]);
    setSortBy("name");
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CursorGlow />

      {/* Subtle background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10">
        <HeroSection />

        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-20">
          {/* Top Controls */}
          <div className="flex flex-col gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <AdvancedFilters
                  pricing={pricing}
                  onPricingChange={setPricing}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onReset={handleResetFilters}
                />
                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                >
                  <Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
                  Favorites ({favorites.size})
                </Button>
                <CollectionsPanel />
              </div>
              <div className="flex gap-2">
                <ExportTools tools={filteredTools} fileName="ai-tools" />
                <ThemeToggle />
              </div>
            </div>
          </div>

          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <StatsBar
            totalTools={aiTools.length}
            filteredCount={filteredTools.length}
            activeCategory={activeCategory}
          />

          {/* Trending Section - Only show in "All Tools" */}
          {activeCategory === "all" && !showFavoritesOnly && (
            <TrendingSection tools={aiTools} onToolClick={handleToolClick} />
          )}

          {/* Tools Grid */}
          <ToolGrid tools={filteredTools} onToolClick={handleToolClick} />

          {/* Tool Details Modal */}
          <ToolDetailsModal
            tool={selectedTool}
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            allTools={aiTools}
          />
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border/50 py-8 mt-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              Built with ✨ — Discover the right AI tool for every task
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
