import DashboardHeader from "../dashboards/DashboardHeader";
import AIChat from "../chat/AIChat";

import {
  Brain,
  Sparkles,
  ArrowRight,
  Activity,
  Heart,
  Flame,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ================= DATA ================= */
const chartData = [
  { day: "Lun", mood: 60 },
  { day: "Mar", mood: 72 },
  { day: "Mié", mood: 65 },
  { day: "Jue", mood: 80 },
  { day: "Vie", mood: 76 },
  { day: "Sáb", mood: 88 },
  { day: "Dom", mood: 92 },
];

interface Props {
  companion?: string;
  onBack?: () => void;
}

export default function DashboardPage({ companion, onBack }: Props) {
  void companion;
  void onBack;

  return (
    <div className="w-full min-h-screen text-white">

      {/* HEADER GLOBAL (si ya lo tienes en layout puedes quitarlo) */}
      <DashboardHeader />

      {/* ================= GRID PRINCIPAL ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">

        {/* ================= LEFT ================= */}
        <div className="xl:col-span-2 space-y-10">

          {/* TOPBAR */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            <div>
              <p className="text-white/50 text-sm mb-2">
                Emotional AI Platform
              </p>

              <h1 className="text-3xl lg:text-5xl font-black">
                Bienvenida,
                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent ml-3">
                  Valeria
                </span>
              </h1>
            </div>

            <button className="px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center gap-3 font-semibold shadow-xl hover:scale-[1.03] transition">
              <Sparkles size={18} />
              Analizar emociones
              <ArrowRight size={18} />
            </button>

          </div>

          {/* HERO */}
          <section className="relative overflow-hidden rounded-[35px] border border-white/10 bg-black/30 backdrop-blur-2xl p-8 shadow-2xl">

            <div className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] rounded-full bg-orange-500/20 blur-[140px]" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                    <Brain size={20} />
                  </div>

                  <span className="text-white/60 text-sm">
                    Emotional Intelligence System
                  </span>
                </div>

                <h2 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
                  Tu bienestar
                  <br />
                  impulsado por IA
                </h2>

                <p className="text-white/60 text-base lg:text-lg max-w-[650px]">
                  Analiza emociones, detecta patrones y mejora tu bienestar con inteligencia artificial.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6">

                <p className="text-white/50 text-sm mb-2">
                  Estado emocional
                </p>

                <h3 className="text-3xl font-black mb-6">
                  Excelente
                </h3>

                <div className="flex items-end gap-3">
                  <span className="text-6xl font-black">82%</span>
                  <span className="text-green-400 mb-2">+12%</span>
                </div>

              </div>

            </div>
          </section>

        </div>

        {/* ================= CHAT ================= */}
        <div className="xl:col-span-1">
          <div className="sticky top-8">
            <AIChat />
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="xl:col-span-3">
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">

            {[
              { title: "Bienestar", value: "82%", icon: Heart, color: "text-pink-400" },
              { title: "Mentalidad", value: "76%", icon: Activity, color: "text-cyan-400" },
              { title: "Racha", value: "12 días", icon: Flame, color: "text-orange-400" },
              { title: "IA activa", value: "24/7", icon: Sparkles, color: "text-purple-400" },
            ].map((card, i) => {
              const Icon = card.icon;

              return (
                <div
                  key={i}
                  className="rounded-[30px] border border-white/10 bg-black/25 backdrop-blur-xl p-7 shadow-xl hover:translate-y-[-6px] transition"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Icon className={card.color} size={22} />
                    <span className="text-green-400 text-sm font-semibold">
                      +8%
                    </span>
                  </div>

                  <h3 className="text-4xl font-black mb-2">
                    {card.value}
                  </h3>

                  <p className="text-white/55 text-base">
                    {card.title}
                  </p>
                </div>
              );
            })}

          </section>
        </div>

        {/* ================= CHART ================= */}
        <div className="xl:col-span-3">

          <section className="rounded-[35px] border border-white/10 bg-black/25 backdrop-blur-2xl p-10 shadow-2xl">

            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-black">
                Tendencia emocional
              </h2>

              <span className="text-white/40 text-sm">
                Últimos 7 días
              </span>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" stroke="#ffffff70" />
                  <YAxis stroke="#ffffff70" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#fb923c"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </section>

        </div>

      </div>
    </div>
  );
}