import { useEffect, useState } from "react";
import { X, Calendar, ChevronDown, Sparkles } from "lucide-react";
import type { CompanionType } from "../types/companion";
import { createDiaryEntry, getDiaryEntries } from "../services/diaryService";
import type { DiaryEntry } from "../services/diaryService";
import { logActivity } from "../hooks/useStats";

// Assets nativos
import AmarisImg from "../assets/avatar/Amaris.png";
import KaelImg from "../assets/avatar/Kael.png";

interface JournalPageProps {
  companion: CompanionType;
  onBack: () => void;
}

type MoodType = "muy-bien" | "bien" | "neutral" | "mal" | "muy-mal" | null;

export default function JournalPage({ companion, onBack }: JournalPageProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType>(null);
  const [journalText, setJournalText] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [savingEntry, setSavingEntry] = useState(false);
  const [entryError, setEntryError] = useState<string | null>(null);

  const isKael = companion === "kael";
  const avatarUrl = isKael ? KaelImg : AmarisImg;
  const companionName = isKael ? "Kael" : "Amaris";

  const moods = [
    { id: "muy-bien", emoji: "😊", label: "Muy bien" },
    { id: "bien", emoji: "🙂", label: "Bien" },
    { id: "neutral", emoji: "😐", label: "Neutral" },
    { id: "mal", emoji: "🙁", label: "Mal" },
    { id: "muy-mal", emoji: "😫", label: "Muy mal" },
  ] as const;

  useEffect(() => {
    let alive = true;
    setLoadingEntries(true);
    setEntryError(null);

    getDiaryEntries()
      .then((data) => {
        if (alive) setEntries(data);
      })
      .catch(() => {
        if (alive) setEntryError("No se pudo cargar tu historial del diario.");
      })
      .finally(() => {
        if (alive) setLoadingEntries(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const formatEntryDate = (value?: string) => {
    if (!value) return "Sin fecha";

    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  };

  const handleSaveEntry = async () => {
    const content = journalText.trim();
    if (!content || savingEntry) return;

    setSavingEntry(true);
    setEntryError(null);

    try {
      const createdEntry = await createDiaryEntry({ content });
      setEntries((current) => [createdEntry, ...current]);
      void logActivity("diary"); 
      setJournalText("");
      setSelectedMood(null);
      setShowHistory(true);
    } catch {
      setEntryError("No se pudo guardar la entrada. Revisa tu sesion e intentalo otra vez.");
    } finally {
      setSavingEntry(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f4f7fa] text-slate-800 font-sans flex flex-col justify-between overflow-y-auto lg:overflow-hidden min-h-screen select-none">
      
      {/* ================= CAPA 1: AVATAR AJUSTADO BIEN ARRIBA Y ULTRA RESPONSIVE ================= */}
      <div className="absolute inset-0 z-0 flex items-start lg:items-center justify-center pointer-events-none px-4">
        {/* Glow de fondo para dar profundidad */}
        <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[var(--theme-glow)] blur-[120px] rounded-full top-12 left-1/2 -translate-x-1/2 pointer-events-none" />
        
        <img 
          src={avatarUrl} 
          alt={`${companionName} Background`} 
          // 'lg:h-[68vh]' evita que baje hasta el fondo, y 'lg:-translate-y-[12%]' lo empuja limpiamente hacia arriba
          // En mobile cambiamos a una opacidad sutil para mantener una lectura perfecta
          className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] lg:max-w-[520px] h-[55vh] sm:h-[60vh] lg:h-[68vh] object-contain opacity-20 lg:opacity-100 transition-all duration-500 mt-16 sm:mt-20 lg:mt-0 lg:-translate-y-[12%]"
        />
      </div>

      {/* ================= CAPA 2: INTERFAZ HUD SUPERPUESTA (Z-10) ================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-8 h-full gap-6">
        
        {/* BOTÓN SUPERIOR DE SALIDA */}
        <header className="w-full flex justify-end">
          <button
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-600 shadow-sm border border-[var(--theme-border)] backdrop-blur-md transition-all active:scale-95"
          >
            <X size={18} />
          </button>
        </header>

        {/* DISTRIBUCIÓN SUPERIOR: REJILLA FLEXIBLE EN ESCRITORIO */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-start w-full pt-2">
          
          {/* Bloque Izquierdo: Textos e IA */}
          <div className="col-span-1 lg:col-span-4 space-y-4 sm:space-y-5 text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-light text-slate-900 tracking-tight leading-none">
                Tu diario,
              </h1>
              <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-black text-[var(--theme-primary)] tracking-tight mt-1 leading-none">
                tu espacio <span className="inline-block text-[var(--theme-secondary)] text-xl sm:text-2xl font-normal">✦</span>
              </h1>
              <p className="text-slate-400 text-xs mt-2.5 font-medium max-w-[260px] leading-relaxed">
                Escribe libremente, reflexiona y conócete mejor cada día.
              </p>
            </div>

            {/* Globo IA */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[var(--theme-border)] shadow-[0_8px_30px_rgba(148,163,184,0.03)] w-full max-w-md lg:max-w-sm">
              <div className="flex items-center gap-1.5 text-[var(--theme-primary)] text-[10px] font-bold tracking-wider uppercase">
                <Sparkles size={12} />
                {companionName} IA
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                Hola, soy {companionName}. Este es tu espacio personal. Escribe sin miedo, estoy aquí para escucharte y acompañarte en tu proceso.
              </p>
            </div>
          </div>

          {/* Columna Central Oculta: Espacio asignado al rostro levantado de Amaris/Kael */}
          <div className="hidden lg:block lg:col-span-5 h-full pointer-events-none" />

          {/* Columna Derecha: Tarjeta de Cita Textual */}
          <div className="col-span-1 lg:col-span-3 flex lg:justify-end">
            <div className="bg-[#1a2331] text-slate-200 rounded-2xl p-4 sm:p-5 shadow-xl w-full max-w-sm lg:max-w-[240px] relative border border-[var(--theme-border)]">
              <span className="text-2xl sm:text-3xl font-serif text-[var(--theme-primary)] absolute top-1 left-4">“</span>
              <p className="text-xs italic leading-relaxed text-slate-300 pt-3 font-medium">
                Escribir es descubrir lo que tu alma ya sabe, pero aún no ha dicho.
              </p>
              <div className="w-5 h-[1px] bg-slate-700 mt-3 sm:mt-4 mb-1" />
              <p className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">{companionName}</p>
            </div>
          </div>

        </main>

        {/* ================= PANEL INFERIOR CONTENDEDOR BLANCO (RESPONSIVE DE 1 A 12 COLUMNAS) ================= */}
        <footer className="w-full bg-white/95 backdrop-blur-md rounded-[22px] lg:rounded-[24px] border border-[var(--theme-border)] shadow-[0_15px_50px_rgba(148,163,184,0.08)] p-4 sm:p-5 lg:p-6 mt-auto">
          <div className="space-y-4">
            
            {/* Cabecera del Panel (Fecha & Botón) */}
            <div className="flex flex-row items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div className="flex items-center gap-1.5 text-slate-700 text-xs font-bold cursor-pointer hover:text-[var(--theme-primary)] transition">
                <Calendar size={14} className="text-slate-400" />
                <span className="truncate">Hoy, 12 de mayo de 2024</span>
                <ChevronDown size={14} className="text-slate-400 flex-shrink-0" />
              </div>
              
              <button
                type="button"
                onClick={() => setShowHistory((current) => !current)}
                className="text-[11px] sm:text-xs font-bold text-[var(--theme-primary)] px-2.5 py-1.5 bg-[var(--theme-hover)] rounded-xl transition whitespace-nowrap"
              >
                {showHistory ? "Ocultar historial" : "Ver entradas anteriores"}
              </button>
            </div>

            {/* Formulario Interno split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 pt-1">
              
              {/* Bloque Izquierdo: Emojis lineales */}
              <div className="col-span-1 lg:col-span-4 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">¿Cómo te sientes hoy?</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Selecciona tu estado de ánimo</p>
                  
                  <div className="grid grid-cols-5 gap-1 mt-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                    {moods.map((m) => {
                      const isSelected = selectedMood === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedMood(m.id)}
                          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition-all duration-200 ${
                            isSelected 
                              ? "bg-white border border-slate-200/80 shadow-sm font-bold scale-105 text-slate-900" 
                              : "hover:bg-white/40 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <span className="text-lg sm:text-xl mb-0.5">{m.emoji}</span>
                          <span className="text-[8px] sm:text-[9px] text-slate-500 font-semibold tracking-tight truncate max-w-full">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reflexión Ocultable en pantallas muy pequeñas */}
                <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 text-left hidden sm:block">
                  <div className="flex items-center gap-1 text-[var(--theme-primary)] font-bold text-[9px] uppercase tracking-wider">
                    <Sparkles size={11} /> Reflexión del día
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium leading-normal">
                    Cada emoción que sientes es una guía hacia tu crecimiento.
                  </p>
                </div>
              </div>

              {/* Bloque Derecho: Entrada de Escritura */}
              <div className="col-span-1 lg:col-span-8 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">¿Qué te gustaría escribir hoy?</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Escribe lo que sientes, piensas o lo que te haya pasado.</p>
                </div>
                
                <div className="relative flex-1">
                  <textarea
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value.slice(0, 1000))}
                    placeholder="Comienza a escribir aquí..."
                    className="w-full min-h-[90px] sm:min-h-[105px] bg-slate-50 border border-[var(--theme-border)] rounded-xl p-3 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--theme-glow)] focus:border-[var(--theme-primary)] transition-all resize-none"
                  />
                  <span className="absolute bottom-3 right-4 text-[9px] sm:text-[10px] text-slate-400 font-mono font-medium">
                    {journalText.length} / 1000
                  </span>
                </div>

                {/* Guardar entrada */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveEntry}
                    disabled={!journalText.trim() || savingEntry}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                      !journalText.trim() || savingEntry
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                        : "bg-[image:var(--theme-button)] shadow-[var(--theme-shadow)]"
                    }`}
                  >
                    <span>💾</span> Guardar entrada
                  </button>
                </div>
              </div>

            </div>

            {entryError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                {entryError}
              </div>
            )}

            {showHistory && (
              <div className="max-h-[220px] overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                {loadingEntries ? (
                  <p className="text-xs font-semibold text-slate-400">Cargando entradas...</p>
                ) : entries.length === 0 ? (
                  <p className="text-xs font-semibold text-slate-400">Aun no tienes entradas guardadas.</p>
                ) : (
                  <div className="space-y-2">
                    {entries.map((entry) => (
                      <article key={entry.id} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--theme-primary)]">
                          {formatEntryDate(entry.created_at)}
                        </p>
                        <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">
                          {entry.content}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </footer>

      </div>
    </div>
  );
}
