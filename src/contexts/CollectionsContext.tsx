import React, { createContext, useContext, useState, useEffect } from "react";

export interface Collection {
  id: string;
  name: string;
  description: string;
  toolIds: Set<string>;
  createdAt: number;
}

interface CollectionsContextType {
  collections: Map<string, Collection>;
  createCollection: (name: string, description: string) => string;
  deleteCollection: (collectionId: string) => void;
  addToolToCollection: (collectionId: string, toolId: string) => void;
  removeToolFromCollection: (collectionId: string, toolId: string) => void;
  renameCollection: (collectionId: string, name: string, description: string) => void;
}

const CollectionsContext = createContext<CollectionsContextType | undefined>(undefined);

export const CollectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<Map<string, Collection>>(new Map());
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("exploreus_collections");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Array<Record<string, unknown>>;
        const restored = new Map<string, Collection>(
          parsed.map((col: Record<string, unknown>) => {
            const collection: Collection = {
              id: col.id as string,
              name: col.name as string,
              description: col.description as string,
              toolIds: new Set(col.toolIds as string[]),
              createdAt: col.createdAt as number,
            };
            return [col.id as string, collection];
          })
        );
        setCollections(restored);
      } catch (e) {
        console.error("Failed to load collections:", e);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage when collections change
  useEffect(() => {
    if (mounted) {
      const serialized = Array.from(collections.values()).map((col) => ({
        ...col,
        toolIds: Array.from(col.toolIds),
      }));
      localStorage.setItem("exploreus_collections", JSON.stringify(serialized));
    }
  }, [collections, mounted]);

  const createCollection = (name: string, description: string): string => {
    const id = `col_${Date.now()}`;
    setCollections((prev) => {
      const updated = new Map(prev);
      updated.set(id, {
        id,
        name,
        description,
        toolIds: new Set(),
        createdAt: Date.now(),
      });
      return updated;
    });
    return id;
  };

  const deleteCollection = (collectionId: string) => {
    setCollections((prev) => {
      const updated = new Map(prev);
      updated.delete(collectionId);
      return updated;
    });
  };

  const addToolToCollection = (collectionId: string, toolId: string) => {
    setCollections((prev) => {
      const updated = new Map(prev);
      const col = updated.get(collectionId);
      if (col) {
        col.toolIds.add(toolId);
      }
      return updated;
    });
  };

  const removeToolFromCollection = (collectionId: string, toolId: string) => {
    setCollections((prev) => {
      const updated = new Map(prev);
      const col = updated.get(collectionId);
      if (col) {
        col.toolIds.delete(toolId);
      }
      return updated;
    });
  };

  const renameCollection = (collectionId: string, name: string, description: string) => {
    setCollections((prev) => {
      const updated = new Map(prev);
      const col = updated.get(collectionId);
      if (col) {
        col.name = name;
        col.description = description;
      }
      return updated;
    });
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        createCollection,
        deleteCollection,
        addToolToCollection,
        removeToolFromCollection,
        renameCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("useCollections must be used within CollectionsProvider");
  }
  return context;
};
