// import DashboardHeader from "../components/dashboards/DashboardHeader";
// import AIChat from "../components/chat/AIChat";

// import {
//   Brain,
//   Sparkles,
//   ArrowRight,
//   Activity,
//   Heart,
//   Flame,
//   Radio, // Importamos un icono ideal para Music Therapy
// } from "lucide-react";

// import {
//   LineChart,
//   Line,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";

// /* ================= DATA ================= */
// const chartData = [
//   { day: "Lun", mood: 60 },
//   { day: "Mar", mood: 72 },
//   { day: "Mié", mood: 65 },
//   { day: "Jue", mood: 80 },
//   { day: "Vie", mood: 76 },
//   { day: "Sáb", mood: 88 },
//   { day: "Dom", mood: 92 },
// ];

// // INTERFAZ CORREGIDA: Se añade 'onOpenMusic' para coincidir al 100% con App.tsx
// interface Props {
//   companion?: string;
//   onBack?: () => void;
//   onOpenJournal: () => void; 
//   onOpenMusic: () => void; // <-- Propiedad requerida agregada exitosamente
//   displayName?: string; // Nombre del usuario logueado
// }

// export default function DashboardPage({ companion, onBack, onOpenJournal, onOpenMusic, displayName = "Usuario" }: Props) {
//   void companion;
//   void onBack;

//   return (
//     <div className="w-full min-h-screen text-white pb-8">

//       {/* HEADER GLOBAL */}
//       <DashboardHeader />

//       {/* ================= GRID PRINCIPAL ================= */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10 items-start">

//         {/* ================= LEFT ================= */}
//         <div className="xl:col-span-2 space-y-6 lg:space-y-10 min-w-0">

//           {/* TOPBAR CON ACCIONES MULTIMÓDULO */}
//           <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-6">

//             <div>
//               <p className="text-white/50 text-sm mb-2">
//                 Emotional AI Platform
//               </p>

//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
//                 Bienvenida,
//                 <span className="bg-[image:var(--theme-gradient)] bg-clip-text text-transparent ml-3">
//                   {displayName}
//                 </span>
//               </h1>
//             </div>

//             {/* BOTONERA ACCIONES RÁPIDAS (DIARIO & MÚSICA) */}
//             <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              
//               {/* Botón: Terapia de Sonido (Nuevo Trigger Conectado) */}
//               <button 
//                 onClick={onOpenMusic}
//                 className="justify-center px-5 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-[var(--theme-hover)] border border-[var(--theme-border)] flex items-center gap-3 font-semibold shadow-xl backdrop-blur-md hover:scale-[1.03] active:scale-95 transition"
//               >
//                 <Radio size={18} className="text-[var(--theme-primary)] animate-pulse" />
//                 <span>Terapia de Sonido</span>
//               </button>

//               {/* Botón: Diario Emocional */}
//               <button 
//                 onClick={onOpenJournal}
//                 className="justify-center px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[image:var(--theme-button)] flex items-center gap-3 font-semibold shadow-xl hover:scale-[1.03] active:scale-95 transition"
//               >
//                 <Sparkles size={18} />
//                 <span>Abrir Diario Emocional</span>
//                 <ArrowRight size={18} />
//               </button>

//             </div>

//           </div>

//           {/* HERO */}
//           <section className="relative overflow-hidden rounded-[24px] sm:rounded-[35px] border border-[var(--theme-border)] bg-[var(--theme-card)] backdrop-blur-2xl p-5 sm:p-8 shadow-2xl">

//             <div className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] rounded-full bg-[var(--theme-glow)] blur-[140px]" />

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-10">

//               <div>
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-11 h-11 rounded-2xl bg-[image:var(--theme-button)] flex items-center justify-center">
//                     <Brain size={20} />
//                   </div>

//                   <span className="text-white/60 text-sm">
//                     Emotional Intelligence System
//                   </span>
//                 </div>

//                 <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight mb-5 lg:mb-6">
//                   Tu bienestar
//                   <br />
//                   impulsado por IA
//                 </h2>

//                 <p className="text-white/60 text-base lg:text-lg max-w-[650px]">
//                   Analiza emociones, detecta patrones y mejora tu bienestar con inteligencia artificial.
//                 </p>
//               </div>

//               <div className="rounded-[24px] sm:rounded-[30px] border border-[var(--theme-border)] bg-white/5 backdrop-blur-xl p-5 sm:p-6">

//                 <p className="text-white/50 text-sm mb-2">
//                   Estado emocional
//                 </p>

//                 <h3 className="text-3xl font-black mb-6">
//                   Excelente
//                 </h3>

//                 <div className="flex items-end gap-3">
//                   <span className="text-5xl sm:text-6xl font-black">82%</span>
//                   <span className="text-[var(--theme-accent)] mb-2">+12%</span>
//                 </div>

//               </div>

//             </div>
//           </section>

//         </div>

//         {/* ================= CHAT ================= */}
//         <div className="xl:col-span-1">
//           <div className="xl:sticky xl:top-8">
//             <AIChat />
//           </div>
//         </div>

//         {/* ================= STATS ================= */}
//         <div className="xl:col-span-3">
//           <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-7">

//             {[
//               { title: "Bienestar", value: "82%", icon: Heart, color: "text-[var(--theme-primary)]" },
//               { title: "Mentalidad", value: "76%", icon: Activity, color: "text-[var(--theme-secondary)]" },
//               { title: "Racha", value: "12 días", icon: Flame, color: "text-[var(--theme-accent)]" },
//               { title: "IA activa", value: "24/7", icon: Sparkles, color: "text-[var(--theme-primary)]" },
//             ].map((card, i) => {
//               const Icon = card.icon;

//               return (
//                 <div
//                   key={i}
//                   className="rounded-[24px] sm:rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] backdrop-blur-xl p-5 sm:p-7 shadow-xl hover:translate-y-[-6px] hover:bg-[var(--theme-hover)] transition"
//                 >
//                   <div className="flex items-center justify-between mb-6">
//                     <Icon className={card.color} size={22} />
//                     <span className="text-[var(--theme-accent)] text-sm font-semibold">
//                       +8%
//                     </span>
//                   </div>

//                   <h3 className="text-3xl sm:text-4xl font-black mb-2">
//                     {card.value}
//                   </h3>

//                   <p className="text-white/55 text-base">
//                     {card.title}
//                   </p>
//                 </div>
//               );
//             })}

//           </section>
//         </div>

//         {/* ================= CHART ================= */}
//         <div className="xl:col-span-3">

//           <section className="rounded-[24px] sm:rounded-[35px] border border-[var(--theme-border)] bg-[var(--theme-card)] backdrop-blur-2xl p-5 sm:p-8 lg:p-10 shadow-2xl">

//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 sm:mb-8">
//               <h2 className="text-2xl lg:text-3xl font-black">
//                 Tendencia emocional
//               </h2>

//               <span className="text-white/40 text-sm">
//                 Últimos 7 días
//               </span>
//             </div>

//             <div className="h-[280px] sm:h-[360px] lg:h-[420px] w-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={chartData}>
//                   <CartesianGrid stroke="rgba(255,255,255,0.06)" />
//                   <XAxis dataKey="day" stroke="#ffffff70" />
//                   <YAxis stroke="#ffffff70" />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="mood"
//                     stroke="var(--theme-chart)"
//                     strokeWidth={4}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//           </section>

//         </div>

//       </div>
//     </div>
//   );
// }

import DashboardHeader from "../components/dashboards/DashboardHeader";
import AIChat from "../components/chat/AIChat";
import { useStats } from "../hooks/useStats";
import {
  Brain, Sparkles, ArrowRight,
  Activity, Heart, Flame, Radio,
} from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

interface Props {
  companion?: string;
  onBack?: () => void;
  onOpenJournal: () => void;
  onOpenMusic: () => void;
  displayName?: string;
}

export default function DashboardPage({
  companion, onBack, onOpenJournal, onOpenMusic, displayName = "Usuario"
}: Props) {
  void companion;
  void onBack;

  const { stats, isLoading } = useStats();

  // Fallback a datos demo si aún no hay datos reales
  const chartData = stats?.weekly_evolution.map((item) => ({
    day: item.day,
    mood: item.mood ?? 0,
  })) ?? [
    { day: "Lun", mood: 0 }, { day: "Mar", mood: 0 },
    { day: "Mié", mood: 0 }, { day: "Jue", mood: 0 },
    { day: "Vie", mood: 0 }, { day: "Sáb", mood: 0 },
    { day: "Dom", mood: 0 },
  ];

  const wellnessScore = stats?.wellness_score ?? null;
  const streak        = stats?.streak ?? 0;
  const sessions      = stats?.sessions_month ?? 0;

  const statCards = [
    {
      title: "Bienestar",
      value: isLoading ? "..." : wellnessScore !== null ? `${wellnessScore}%` : "—",
      icon: Heart,
      color: "text-[var(--theme-primary)]",
    },
    {
      title: "Sesiones",
      value: isLoading ? "..." : `${sessions}`,
      icon: Activity,
      color: "text-[var(--theme-secondary)]",
    },
    {
      title: "Racha",
      value: isLoading ? "..." : `${streak} días`,
      icon: Flame,
      color: "text-[var(--theme-accent)]",
    },
    {
      title: "IA activa",
      value: "24/7",
      icon: Sparkles,
      color: "text-[var(--theme-primary)]",
    },
  ];

  return (
    <div className="w-full min-h-screen text-white pb-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10 items-start">
        <div className="xl:col-span-2 space-y-6 lg:space-y-10 min-w-0">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-6">
            <div>
              <p className="text-white/50 text-sm mb-2">Emotional AI Platform</p>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black">
                Bienvenida,
                <span className="bg-[image:var(--theme-gradient)] bg-clip-text text-transparent ml-3">
                  {displayName}
                </span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              <button
                onClick={onOpenMusic}
                className="justify-center px-5 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-[var(--theme-hover)] border border-[var(--theme-border)] flex items-center gap-3 font-semibold shadow-xl backdrop-blur-md hover:scale-[1.03] active:scale-95 transition"
              >
                <Radio size={18} className="text-[var(--theme-primary)] animate-pulse" />
                <span>Terapia de Sonido</span>
              </button>
              <button
                onClick={onOpenJournal}
                className="justify-center px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[image:var(--theme-button)] flex items-center gap-3 font-semibold shadow-xl hover:scale-[1.03] active:scale-95 transition"
              >
                <Sparkles size={18} />
                <span>Abrir Diario Emocional</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <section className="relative overflow-hidden rounded-[24px] sm:rounded-[35px] border border-[var(--theme-border)] bg-[var(--theme-card)] backdrop-blur-2xl p-5 sm:p-8 shadow-2xl">
            <div className="absolute top-[-120px] right-[-100px] w-[320px] h-[320px] rounded-full bg-[var(--theme-glow)] blur-[140px]" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[image:var(--theme-button)] flex items-center justify-center">
                    <Brain size={20} />
                  </div>
                  <span className="text-white/60 text-sm">Emotional Intelligence System</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black leading-tight mb-5 lg:mb-6">
                  Tu bienestar<br />impulsado por IA
                </h2>
                <p className="text-white/60 text-base lg:text-lg max-w-[650px]">
                  Analiza emociones, detecta patrones y mejora tu bienestar con inteligencia artificial.
                </p>
              </div>

              {/* Tarjeta de bienestar — ahora dinámica */}
              <div className="rounded-[24px] sm:rounded-[30px] border border-[var(--theme-border)] bg-white/5 backdrop-blur-xl p-5 sm:p-6">
                <p className="text-white/50 text-sm mb-2">Estado emocional</p>
                <h3 className="text-2xl sm:text-3xl font-black mb-6">
                  {wellnessScore === null ? "Sin datos aún" : wellnessScore >= 80 ? "Excelente" : wellnessScore >= 60 ? "Bien" : wellnessScore >= 40 ? "Regular" : "Necesita atención"}
                </h3>
                <div className="flex items-end gap-3">
                  <span className="text-5xl sm:text-6xl font-black">
                    {isLoading ? "..." : wellnessScore !== null ? `${wellnessScore}%` : "—"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="xl:col-span-1">
          <div className="xl:sticky xl:top-8">
            <AIChat />
          </div>
        </div>

        {/* STATS — ahora dinámicas */}
        <div className="xl:col-span-3">
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-7">
            {statCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="rounded-[24px] sm:rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] backdrop-blur-xl p-5 sm:p-7 shadow-xl hover:translate-y-[-6px] hover:bg-[var(--theme-hover)] transition"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Icon className={card.color} size={22} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-2">{card.value}</h3>
                  <p className="text-white/55 text-base">{card.title}</p>
                </div>
              );
            })}
          </section>
        </div>

        {/* CHART — ahora dinámico */}
        <div className="xl:col-span-3">
          <section className="rounded-[24px] sm:rounded-[35px] border border-[var(--theme-border)] bg-[var(--theme-card)] backdrop-blur-2xl p-5 sm:p-8 lg:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 sm:mb-8">
              <h2 className="text-2xl lg:text-3xl font-black">Tendencia emocional</h2>
              <span className="text-white/40 text-sm">Últimos 7 días</span>
            </div>
            <div className="h-[280px] sm:h-[360px] lg:h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" stroke="#ffffff70" />
                  <YAxis stroke="#ffffff70" domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="var(--theme-chart)" strokeWidth={4} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}