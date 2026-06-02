import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface EmotionalHistoryEntry {
  id: string;
  createdAt: string;
  companion: string;
  recognizedEmotion?: string | null;
  depressionScore: number;
  anxietyScore: number;
  stressScore: number;
  depressionSeverity: string;
  anxietySeverity: string;
  stressSeverity: string;
}

interface EmotionalHistoryContextType {
  entries: EmotionalHistoryEntry[];
  addEntry: (entry: Omit<EmotionalHistoryEntry, "id" | "createdAt">) => void;
  clearHistory: () => void;
}

const STORAGE_KEY = "emoria-emotional-history";

const EmotionalHistoryContext = createContext<EmotionalHistoryContextType | undefined>(undefined);

const loadEntries = (): EmotionalHistoryEntry[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as EmotionalHistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function EmotionalHistoryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<EmotionalHistoryEntry[]>(() => {
    if (typeof window === "undefined") return [];
    return loadEntries();
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: Omit<EmotionalHistoryEntry, "id" | "createdAt">) => {
    const nextEntry: EmotionalHistoryEntry = {
      id: crypto?.randomUUID?.() ?? `${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...entry,
    };

    setEntries((prev) => [nextEntry, ...prev]);
  };

  const clearHistory = () => setEntries([]);

  return (
    <EmotionalHistoryContext.Provider value={{ entries, addEntry, clearHistory }}>
      {children}
    </EmotionalHistoryContext.Provider>
  );
}

export const useEmotionalHistory = () => {
  const context = useContext(EmotionalHistoryContext);
  if (!context) {
    throw new Error("useEmotionalHistory debe ser usado dentro de EmotionalHistoryProvider");
  }
  return context;
};
