import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCollections, Collection } from "@/contexts/CollectionsContext";
import { BookMarked, Plus, Trash2, Edit2 } from "lucide-react";

export const CollectionsPanel: React.FC = () => {
  const { collections, createCollection, deleteCollection, renameCollection } =
    useCollections();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDesc, setNewCollectionDesc] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createCollection(newCollectionName, newCollectionDesc);
      setNewCollectionName("");
      setNewCollectionDesc("");
    }
  };

  const handleRename = (id: string) => {
    if (editName.trim()) {
      renameCollection(id, editName, editDesc);
      setEditingId(null);
      setEditName("");
      setEditDesc("");
    }
  };

  const handleEditStart = (col: Collection) => {
    setEditingId(col.id);
    setEditName(col.name);
    setEditDesc(col.description);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <BookMarked className="w-4 h-4" />
            Collections ({collections.size})
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px]">
          <SheetHeader>
            <SheetTitle>My Collections</SheetTitle>
            <SheetDescription>Organize tools into custom lists</SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-6">
            {/* Create New Collection */}
            <form onSubmit={handleCreate} className="space-y-2">
              <Input
                placeholder="Collection name"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
              <Input
                placeholder="Description (optional)"
                value={newCollectionDesc}
                onChange={(e) => setNewCollectionDesc(e.target.value)}
              />
              <Button
                type="submit"
                size="sm"
                className="w-full gap-2"
                disabled={!newCollectionName.trim()}
              >
                <Plus className="w-4 h-4" />
                Create Collection
              </Button>
            </form>

            {/* Collections List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {Array.from(collections.values()).map((col) => (
                <div
                  key={col.id}
                  className="p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{col.name}</p>
                      {col.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {col.description}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {col.toolIds.size} tools
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleEditStart(col)}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                      onClick={() => deleteCollection(col.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {collections.size === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No collections yet. Create one to organize your favorite tools!
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Collection Dialog */}
      <Dialog open={editingId !== null} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Collection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Collection name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <Input
              placeholder="Description"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => editingId && handleRename(editingId)}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
