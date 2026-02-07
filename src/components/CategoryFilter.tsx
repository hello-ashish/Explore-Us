import { motion } from "framer-motion";
import { categories } from "@/data/tools";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="flex flex-wrap justify-center gap-3 w-full max-w-5xl mx-auto"
    >
      {categories.map((category, i) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;

        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`category-chip flex items-center gap-2 ${isActive ? "active" : ""}`}
          >
            <Icon className="h-4 w-4" />
            <span>{category.name}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default CategoryFilter;
