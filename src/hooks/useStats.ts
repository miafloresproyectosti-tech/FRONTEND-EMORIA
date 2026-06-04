import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL as string;

export interface Stats {
  streak: number;
  sessions_month: number;
  diary_count: number;
  wellness_score: number | null;
emotion_score: number | null; 
  weekly_evolution: { day: string; mood: number | null; sessions: number }[];
  activities_by_type: Record<string, number>;
}

export const logActivity = async (type: string, durationSeconds = 0) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  await fetch(`${API_URL}/api/activities`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, duration_seconds: durationSeconds }),
  });
};

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setIsLoading(false); return; }

    fetch(`${API_URL}/api/activities/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data as Stats))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return { stats, isLoading };
};