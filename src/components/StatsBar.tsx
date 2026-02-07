import { motion } from "framer-motion";
import { categories } from "@/data/tools";

interface StatsBarProps {
  totalTools: number;
  filteredCount: number;
  activeCategory: string;
}

const StatsBar = ({ totalTools, filteredCount, activeCategory }: StatsBarProps) => {
  const activeCat = categories.find((c) => c.id === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between w-full max-w-7xl mx-auto mb-2"
    >
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-display font-bold text-foreground">
          {activeCat?.name || "All Tools"}
        </h2>
        <motion.span
          key={filteredCount}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm text-muted-foreground glass-surface px-3 py-1"
        >
          {filteredCount} {filteredCount === 1 ? "tool" : "tools"}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default StatsBar;
