import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { type AITool } from "@/data/tools";
import { useRef, useState } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: AITool;
  index: number;
  onDetailsClick: (tool: AITool) => void;
}

const ToolCard = ({ tool, index, onDetailsClick }: ToolCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(tool.id)) {
      removeFavorite(tool.id);
    } else {
      addFavorite(tool.id);
    }
  };

  const pricingColor =
    tool.pricing === "free"
      ? "bg-green-500/10 text-green-700 dark:text-green-400"
      : tool.pricing === "freemium"
        ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
        : "bg-purple-500/10 text-purple-700 dark:text-purple-400";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onDetailsClick(tool)}
      className="glass-card group block p-6 cursor-pointer relative"
    >
      {/* Mouse-follow spotlight */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, hsl(${tool.color} / 0.12), transparent 60%)`,
          }}
        />
      )}

      {/* Accent glow line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(${tool.color}), transparent)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <motion.span
              className="text-3xl"
              whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              {tool.icon}
            </motion.span>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                {tool.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteClick}
              className="text-lg hover:scale-110 transition-transform"
            >
              {isFavorite(tool.id) ? "❤️" : "🤍"}
            </button>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-grow">
          {tool.description}
        </p>

        {/* Rating and Pricing */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium">{tool.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({tool.reviews})</span>
          </div>
          <Badge className={pricingColor + " text-xs"}>
            {tool.pricing === "free" ? "Free" : tool.pricing === "freemium" ? "Freemium" : "Paid"}
          </Badge>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/50 group-hover:border-primary/20 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ToolCard;
