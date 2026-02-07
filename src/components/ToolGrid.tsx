import { motion, AnimatePresence } from "framer-motion";
import ToolCard from "./ToolCard";
import { type AITool } from "@/data/tools";

interface ToolGridProps {
  tools: AITool[];
  onToolClick?: (tool: AITool) => void;
}

const ToolGrid = ({ tools, onToolClick }: ToolGridProps) => {
  if (tools.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <motion.span
          className="text-5xl mb-4 block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔍
        </motion.span>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          No tools found
        </h3>
        <p className="text-muted-foreground">
          Try a different search term or category
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <AnimatePresence mode="popLayout">
        {tools.map((tool, index) => (
          <ToolCard 
            key={tool.id} 
            tool={tool} 
            index={index}
            onDetailsClick={onToolClick || (() => {})}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToolGrid;
