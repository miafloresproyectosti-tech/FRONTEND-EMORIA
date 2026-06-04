// import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// export interface EmotionalHistoryEntry {
//   id: string;
//   createdAt: string;
//   companion: string;
//   recognizedEmotion?: string | null;
//   depressionScore: number;
//   anxietyScore: number;
//   stressScore: number;
//   depressionSeverity: string;
//   anxietySeverity: string;
//   stressSeverity: string;
// }

// interface EmotionalHistoryContextType {
//   entries: EmotionalHistoryEntry[];
//   addEntry: (entry: Omit<EmotionalHistoryEntry, "id" | "createdAt">) => void;
//   clearHistory: () => void;
// }

// const STORAGE_KEY = "emoria-emotional-history";

// const EmotionalHistoryContext = createContext<EmotionalHistoryContextType | undefined>(undefined);

// const loadEntries = (): EmotionalHistoryEntry[] => {
//   try {
//     const raw = window.localStorage.getItem(STORAGE_KEY);
//     if (!raw) return [];
//     const parsed = JSON.parse(raw) as EmotionalHistoryEntry[];
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     return [];
//   }
// };

// export function EmotionalHistoryProvider({ children }: { children: ReactNode }) {
//   const [entries, setEntries] = useState<EmotionalHistoryEntry[]>(() => {
//     if (typeof window === "undefined") return [];
//     return loadEntries();
//   });

//   useEffect(() => {
//     window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
//   }, [entries]);

//   const addEntry = (entry: Omit<EmotionalHistoryEntry, "id" | "createdAt">) => {
//     const nextEntry: EmotionalHistoryEntry = {
//       id: crypto?.randomUUID?.() ?? `${Date.now()}`,
//       createdAt: new Date().toISOString(),
//       ...entry,
//     };

//     setEntries((prev) => [nextEntry, ...prev]);
//   };

//   const clearHistory = () => setEntries([]);

//   return (
//     <EmotionalHistoryContext.Provider value={{ entries, addEntry, clearHistory }}>
//       {children}
//     </EmotionalHistoryContext.Provider>
//   );
// }

// export const useEmotionalHistory = () => {
//   const context = useContext(EmotionalHistoryContext);
//   if (!context) {
//     throw new Error("useEmotionalHistory debe ser usado dentro de EmotionalHistoryProvider");
//   }
//   return context;
// };

import {
  createContext, useContext, useEffect,
  useState, useCallback, type ReactNode
} from "react";

const API_URL = import.meta.env.VITE_API_URL as string;

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
  isLoading: boolean;
  addEntry: (entry: Omit<EmotionalHistoryEntry, "id" | "createdAt">) => Promise<void>;
  clearHistory: () => void;
}

const EmotionalHistoryContext = createContext<EmotionalHistoryContextType | undefined>(undefined);

// Convierte snake_case de Laravel a camelCase de React
const mapEntry = (raw: Record<string, unknown>): EmotionalHistoryEntry => ({
  id:                 String(raw.id),
  createdAt:          String(raw.created_at),
  companion:          String(raw.companion),
  recognizedEmotion:  raw.recognized_emotion ? String(raw.recognized_emotion) : null,
  depressionScore:    Number(raw.depression_score),
  anxietyScore:       Number(raw.anxiety_score),
  stressScore:        Number(raw.stress_score),
  depressionSeverity: String(raw.depression_severity),
  anxietySeverity:    String(raw.anxiety_severity),
  stressSeverity:     String(raw.stress_severity),
});

export function EmotionalHistoryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries]   = useState<EmotionalHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  // Cargar entradas desde Laravel al montar
  const fetchEntries = useCallback(async () => {
    const token = getToken();
    if (!token) { setIsLoading(false); return; }

    try {
      const res = await fetch(`${API_URL}/api/emotional-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json() as Record<string, unknown>[];
      setEntries(data.map(mapEntry));
    } catch {
      // Si falla el API, queda vacío
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void fetchEntries(); }, [fetchEntries]);

  // Guardar nueva entrada en Laravel
  const addEntry = async (entry: Omit<EmotionalHistoryEntry, "id" | "createdAt">) => {
    const token = getToken();
    if (!token) return;

    const res = await fetch(`${API_URL}/api/emotional-history`, {
      method: "POST",
      headers: {
        Authorization:  `Bearer ${token}`,
        Accept:         "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companion:            entry.companion,
        recognized_emotion:   entry.recognizedEmotion ?? null,
        depression_score:     entry.depressionScore,
        anxiety_score:        entry.anxietyScore,
        stress_score:         entry.stressScore,
        depression_severity:  entry.depressionSeverity,
        anxiety_severity:     entry.anxietySeverity,
        stress_severity:      entry.stressSeverity,
      }),
    });

    const saved = await res.json() as Record<string, unknown>;
    setEntries((prev) => [mapEntry(saved), ...prev]);
  };

  const clearHistory = () => setEntries([]);

  return (
    <EmotionalHistoryContext.Provider value={{ entries, isLoading, addEntry, clearHistory }}>
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