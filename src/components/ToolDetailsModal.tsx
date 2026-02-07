import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AITool } from "@/data/tools";
import { Heart, ExternalLink, Copy, Check, Star } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCollections } from "@/contexts/CollectionsContext";
import { useState } from "react";

interface ToolDetailsModalProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
  allTools: AITool[];
}

export const ToolDetailsModal: React.FC<ToolDetailsModalProps> = ({
  tool,
  isOpen,
  onClose,
  allTools,
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { collections } = useCollections();
  const [copied, setCopied] = useState(false);

  if (!tool) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(tool.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedTools = tool.relatedTools
    ? allTools.filter((t) => tool.relatedTools?.includes(t.id))
    : [];

  const pricingColor =
    tool.pricing === "free"
      ? "bg-green-500/10 text-green-700 dark:text-green-400"
      : tool.pricing === "freemium"
        ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
        : "bg-purple-500/10 text-purple-700 dark:text-purple-400";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-4xl">{tool.icon}</span>
              <div>
                <DialogTitle className="text-2xl">{tool.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={pricingColor}>
                    {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
                  </Badge>
                  {tool.trending && (
                    <Badge className="bg-red-500/10 text-red-700 dark:text-red-400">
                      🔥 Trending
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                isFavorite(tool.id) ? removeFavorite(tool.id) : addFavorite(tool.id)
              }
              className="text-2xl hover:scale-110 transition-transform"
            >
              {isFavorite(tool.id) ? "❤️" : "🤍"}
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{tool.description}</p>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-lg">{tool.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{tool.reviews} reviews</p>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Related Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {relatedTools.map((relTool) => (
                  <div
                    key={relTool.id}
                    className="p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{relTool.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{relTool.name}</p>
                        <p className="text-xs text-muted-foreground">{relTool.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Collections Info */}
          {Array.from(collections.values()).some((col) =>
            col.toolIds.has(tool.id)
          ) && (
            <div>
              <h3 className="font-semibold mb-2">In Collections</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(collections.values())
                  .filter((col) => col.toolIds.has(tool.id))
                  .map((col) => (
                    <Badge key={col.id} variant="outline">
                      📁 {col.name}
                    </Badge>
                  ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              asChild
              className="flex-1"
              onClick={() => {
                window.open(tool.url, "_blank");
              }}
            >
              <a href={tool.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Tool
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
