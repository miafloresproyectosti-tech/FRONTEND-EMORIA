import { useEffect, useState } from "react";
import { apiRequest } from "../services/apiClient";

export interface Stats {
  streak: number;
  sessions_month: number;
  diary_count: number;
  wellness_score: number | null;
emotion_score: number | null; 
  weekly_evolution: { day: string; mood: number | null; sessions: number }[];
  activities_by_type: Record<string, number>;
}

export const logActivity = async (type: string, durationSeconds = 0): Promise<boolean> => {
  try {
    await apiRequest("/activities", {
      method: "POST",
      body: { type, duration_seconds: durationSeconds },
    });
    return true;
  } catch (err) {
    console.error("logActivity failed:", err);
    return false;
  }
};

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiRequest<Stats>("/activities/stats");
        setStats(data);
      } catch (err) {
        // ignore
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { stats, isLoading };
};