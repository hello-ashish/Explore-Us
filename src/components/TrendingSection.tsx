import React from "react";
import { AITool } from "@/data/tools";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp } from "lucide-react";

interface TrendingSectionProps {
  tools: AITool[];
  onToolClick: (tool: AITool) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  tools,
  onToolClick,
}) => {
  const trendingTools = tools.filter((t) => t.trending).slice(0, 6);

  if (trendingTools.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-red-500" />
        <h2 className="text-xl font-semibold">🔥 Trending Now</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingTools.map((tool) => (
          <Card
            key={tool.id}
            className="p-4 cursor-pointer hover:border-primary/50 transition-all hover:shadow-lg"
            onClick={() => onToolClick(tool)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{tool.icon}</span>
              <Badge className="bg-red-500/10 text-red-700 dark:text-red-400">
                Trending
              </Badge>
            </div>
            <h3 className="font-semibold mb-1">{tool.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {tool.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{tool.rating.toFixed(1)}</span>
              </div>
              <Badge
                variant="secondary"
                className="text-xs"
              >
                {tool.pricing === "free"
                  ? "Free"
                  : tool.pricing === "freemium"
                    ? "Freemium"
                    : "Paid"}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
