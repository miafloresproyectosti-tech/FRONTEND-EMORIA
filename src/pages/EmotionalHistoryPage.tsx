import {
  Award,
  BarChart3,
  Brain,
  CalendarDays,
  Flame,
  HeartPulse,
  Lightbulb,
  ShieldCheck,
  Smile,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEmotionalHistory } from "../context/EmotionalHistoryContext";

const weeklyEvolution = [
  { day: "Lun", bienestar: 64, calma: 58, energia: 52 },
  { day: "Mar", bienestar: 70, calma: 62, energia: 60 },
  { day: "Mie", bienestar: 68, calma: 65, energia: 57 },
  { day: "Jue", bienestar: 76, calma: 71, energia: 68 },
  { day: "Vie", bienestar: 82, calma: 74, energia: 73 },
  { day: "Sab", bienestar: 88, calma: 80, energia: 79 },
  { day: "Dom", bienestar: 84, calma: 78, energia: 75 },
];

const dominantEmotions = [
  { name: "Calma", value: 34, color: "var(--theme-primary)" },
  { name: "Motivacion", value: 26, color: "var(--theme-secondary)" },
  { name: "Gratitud", value: 22, color: "var(--theme-accent)" },
  { name: "Tension", value: 18, color: "rgba(255,255,255,0.45)" },
];

const monthlyStats = [
  { week: "S1", sesiones: 8, bienestar: 68 },
  { week: "S2", sesiones: 11, bienestar: 74 },
  { week: "S3", sesiones: 9, bienestar: 79 },
  { week: "S4", sesiones: 13, bienestar: 84 },
];

const insights = [
  "Tu bienestar sube cuando combinas diario emocional y respiracion en el mismo dia.",
  "Los picos de tension aparecen con mas frecuencia antes de las 10:00 p. m.",
  "La musica guiada esta asociada con una mejora promedio de 14 puntos en calma.",
];

const recommendations = [
  "Agenda una sesion breve de respiracion al cerrar el dia.",
  "Usa el diario cuando detectes tension alta durante dos dias seguidos.",
  "Repite la playlist de calma los dias con energia menor a 60%.",
];

const achievements = [
  { title: "7 dias de registro", detail: "Constancia emocional semanal" },
  { title: "Racha de calma", detail: "4 sesiones con mejora sostenida" },
  { title: "Diario activo", detail: "12 entradas reflexivas este mes" },
];

const summaryCards = [
  { title: "Bienestar semanal", value: "84%", change: "+16%", icon: HeartPulse },
  { title: "Emocion dominante", value: "Calma", change: "34%", icon: Smile },
  { title: "Racha emocional", value: "12 dias", change: "+3", icon: Flame },
  { title: "Sesiones del mes", value: "41", change: "+9", icon: CalendarDays },
];

export default function EmotionalHistoryPage() {
  const { entries } = useEmotionalHistory();
  const recentEntries = entries.slice(0, 4);

  return (
    <section className="w-full min-h-screen text-white pb-8">
      <div className="mb-8 sm:mb-10">
        <p className="text-[var(--theme-primary)] uppercase tracking-[0.28em] text-xs sm:text-sm font-bold mb-3">
          Analisis profundo
        </p>
        <h1 className="text-3xl sm:text-5xl font-black">Historial Emocional</h1>
        <p className="text-white/60 mt-4 max-w-3xl text-base sm:text-lg">
          Evolucion, patrones y recomendaciones generadas a partir de tus registros emocionales.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 mb-6">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-[24px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-6 shadow-[var(--theme-shadow)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <Icon className="text-[var(--theme-primary)]" size={24} />
                <span className="text-[var(--theme-accent)] text-sm font-bold">
                  {item.change}
                </span>
              </div>
              <p className="text-white/50 text-sm">{item.title}</p>
              <h2 className="text-3xl sm:text-4xl font-black mt-2">{item.value}</h2>
            </article>
          );
        })}
      </div>

      <section className="rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl mb-6">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <p className="text-[var(--theme-primary)] uppercase tracking-[0.24em] text-xs font-bold">Registros recientes</p>
            <h2 className="text-2xl font-black">Historial conectado</h2>
          </div>
          <span className="text-white/50 text-sm">{entries.length} registro{entries.length === 1 ? "" : "s"}</span>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[var(--theme-border)] bg-white/[0.04] p-6 text-white/60">
            No hay registros en tu Historial Emocional aún. Completa el autoreporte DASS-21 para que tus resultados aparezcan aquí.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {recentEntries.map((entry) => (
              <article key={entry.id} className="rounded-3xl border border-[var(--theme-border)] bg-white/[0.06] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/50 font-semibold">{new Date(entry.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}</p>
                <h3 className="mt-3 text-lg font-bold text-white">{entry.companion} · {entry.recognizedEmotion ?? "Sin emoción detectada"}</h3>
                <div className="mt-4 space-y-2 text-sm text-white/70">
                  <p>Depresión: {entry.depressionScore} ({entry.depressionSeverity})</p>
                  <p>Ansiedad: {entry.anxietyScore} ({entry.anxietySeverity})</p>
                  <p>Estrés: {entry.stressScore} ({entry.stressSeverity})</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-[var(--theme-primary)]" size={24} />
              <h2 className="text-2xl sm:text-3xl font-black">Evolucion semanal</h2>
            </div>
            <span className="text-white/45 text-sm">Ultimos 7 dias</span>
          </div>

          <div className="h-[300px] sm:h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyEvolution}>
                <defs>
                  <linearGradient id="wellnessGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--theme-chart)" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="var(--theme-chart)" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.55)" />
                <YAxis stroke="rgba(255,255,255,0.55)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,10,16,0.92)",
                    border: "1px solid var(--theme-border)",
                    borderRadius: "14px",
                    color: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bienestar"
                  stroke="var(--theme-chart)"
                  strokeWidth={4}
                  fill="url(#wellnessGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="calma"
                  stroke="var(--theme-primary)"
                  strokeWidth={2}
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="energia"
                  stroke="var(--theme-secondary)"
                  strokeWidth={2}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Smile className="text-[var(--theme-accent)]" size={24} />
            <h2 className="text-2xl font-black">Emociones predominantes</h2>
          </div>

          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dominantEmotions}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={54}
                  outerRadius={88}
                  paddingAngle={5}
                >
                  {dominantEmotions.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,10,16,0.92)",
                    border: "1px solid var(--theme-border)",
                    borderRadius: "14px",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-4">
            {dominantEmotions.map((emotion) => (
              <div key={emotion.name} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ background: emotion.color }}
                  />
                  <span className="text-white/70 truncate">{emotion.name}</span>
                </div>
                <span className="font-bold">{emotion.value}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-[var(--theme-primary)]" size={24} />
            <h2 className="text-2xl font-black">Insights IA</h2>
          </div>

          <div className="space-y-3">
            {insights.map((insight) => (
              <div key={insight} className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-[var(--theme-accent)] mt-0.5 shrink-0" size={18} />
                  <p className="text-white/68 leading-relaxed">{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="text-[var(--theme-accent)]" size={24} />
            <h2 className="text-2xl font-black">Racha emocional</h2>
          </div>

          <div className="flex items-end gap-3 mb-5">
            <span className="text-6xl font-black">12</span>
            <span className="text-white/55 mb-2">dias consecutivos</span>
          </div>

          <div className="h-3 rounded-full bg-white/10 overflow-hidden mb-4">
            <div className="h-full w-[80%] bg-[image:var(--theme-button)]" />
          </div>

          <p className="text-white/60 leading-relaxed">
            Mantienes una secuencia estable de registros, respiracion y reflexion guiada.
          </p>
        </section>

        <section className="xl:col-span-1 rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-[var(--theme-secondary)]" size={24} />
            <h2 className="text-2xl font-black">Estadisticas mensuales</h2>
          </div>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyStats}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.55)" />
                <YAxis stroke="rgba(255,255,255,0.55)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,10,16,0.92)",
                    border: "1px solid var(--theme-border)",
                    borderRadius: "14px",
                    color: "white",
                  }}
                />
                <Bar dataKey="sesiones" radius={[8, 8, 0, 0]} fill="var(--theme-primary)" />
                <Bar dataKey="bienestar" radius={[8, 8, 0, 0]} fill="var(--theme-secondary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="xl:col-span-2 rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-[var(--theme-primary)]" size={24} />
            <h2 className="text-2xl font-black">Recomendaciones personalizadas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((recommendation, index) => (
              <article key={recommendation} className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[image:var(--theme-button)] font-black">
                  {index + 1}
                </div>
                <p className="text-white/70 leading-relaxed">{recommendation}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="xl:col-span-3 rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-[var(--theme-accent)]" size={24} />
            <h2 className="text-2xl font-black">Logros emocionales</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <article key={achievement.title} className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-5">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-[var(--theme-primary)]" size={22} />
                  <h3 className="font-black text-lg">{achievement.title}</h3>
                </div>
                <p className="text-white/55">{achievement.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
