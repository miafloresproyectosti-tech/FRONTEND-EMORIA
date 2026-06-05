import { useState, useEffect, useRef } from "react";
import { X, Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, Radio, Brain } from "lucide-react";
import type { CompanionType } from "../types/companion";
import { logActivity } from "../hooks/useStats";

// Assets sin fondo
import AmarisImg from "../assets/avatar/Amarisfd.png";
import KaelImg from "../assets/avatar/Kaelfd.png";

interface MusicTherapyProps {
  companion: CompanionType;
  onBack: () => void;
}

export default function MusicTherapyPage({ companion, onBack }: MusicTherapyProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [durationSec, setDurationSec] = useState<number>(0);
  const [currentSec, setCurrentSec] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isKael = companion === "kael";
  const avatarUrl = isKael ? KaelImg : AmarisImg;
  const companionName = isKael ? "Kael" : "Amaris";

  const tracks = isKael ? [
    { id: 1, title: "Ondas Gamma 40Hz", type: "Enfoque Cognitivo", duration: "12:40", desc: "Optimización de la corteza prefrontal para alta concentración.", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { id: 2, title: "Frecuencia Solfeggio 528Hz", type: "Reparación Celular", duration: "15:00", desc: "Reducción de cortisol inducido por fatiga laboral.", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: 3, title: "Ruido Blanco Neuronal", type: "Aislamiento Acústico", duration: "20:00", desc: "Bloqueo de estímulos externos para sobrecarga sensorial.", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ] : [
    { id: 1, title: "Ondas Theta 4Hz", type: "Meditación Profunda", duration: "10:15", desc: "Conexión interna y relajación del sistema nervioso.", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { id: 2, title: "Frecuencia Solfeggio 432Hz", type: "Armonía Espiritual", duration: "18:30", desc: "Sintonización natural para aliviar la ansiedad.", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { id: 3, title: "Sonidos del Bosque de Amaris", type: "Naturaleza Inmersiva", duration: "14:20", desc: "Paisaje sonoro orgánico para calmar pensamientos.", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
  ];

  // Setup audio element and events
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    const onTime = () => {
      if (!audio || !audio.duration || isNaN(audio.duration)) return;
      setCurrentSec(audio.currentTime);
      setDurationSec(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onLoaded = () => {
      setDurationSec(audio.duration || 0);
    };

    const onEnded = async () => {
      setIsPlaying(false);
      setProgress(100);
      try {
        await logActivity("music");
      } catch (e) {
        // ignore
      }
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const handleTogglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // pause and log
      audio.pause();
      try {
        const ok = await logActivity("music");
        if (!ok) setSaveError("No se pudo registrar la actividad de música.");
        else setSaveError(null);
      } catch (e) {
        setSaveError("No se pudo registrar la actividad de música.");
      }
      setIsPlaying(false);
      return;
    }

    // start playing
    const track = tracks[selectedTrack];
    if (!track?.url) {
      setSaveError("Pista no disponible para reproducir.");
      return;
    }
    if (audio.src !== track.url) {
      audio.src = track.url;
      audio.load();
    }
    try {
      await audio.play();
      setIsPlaying(true);
      setSaveError(null);
    } catch (err) {
      setSaveError("No se pudo iniciar la reproducción. Revisa permisos o interacción del usuario.");
    }
  };

  // react to selectedTrack change: load and reset
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = tracks[selectedTrack];
    setProgress(0);
    setCurrentSec(0);
    setDurationSec(0);
    setIsPlaying(false);
    if (track?.url) {
      audio.src = track.url;
      audio.load();
    }
  }, [selectedTrack]);

  const formatTime = (sec: number) => {
    if (!sec || isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f4f7fa] text-slate-800 font-sans flex flex-col overflow-y-auto overflow-x-hidden min-h-dvh select-none animate-fadeIn">
      
      {/* ================= CAPA 1: AVATAR AGRANDADO DE IMPACTO CINEMÁTICO ================= */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none overflow-hidden">
        {/* Glow de fondo ampliado para cubrir al personaje gigante */}
        <div className="absolute w-[360px] sm:w-[600px] md:w-[800px] h-[360px] sm:h-[600px] md:h-[800px] bg-[var(--theme-glow)] blur-[120px] rounded-full bottom-1/4 left-1/2 -translate-x-1/2 pointer-events-none" />
        
        <img 
          src={avatarUrl} 
          alt={`${companionName} Terapia`} 
          className="w-auto h-[46vh] sm:h-[64vh] md:h-[72vh] lg:h-[88vh] max-w-none object-contain object-bottom opacity-20 lg:opacity-100 transition-all duration-500 translate-y-[4%] lg:translate-y-[6%]"
        />
      </div>

      {/* ================= CAPA 2: INTERFAZ HUD LIMPIA (Z-10) ================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto min-h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 gap-5 sm:gap-6">
        {saveError && (
          <div className="w-full p-2 bg-red-500 text-white rounded-md text-sm text-center">{saveError}</div>
        )}
        
        {/* BOTÓN SUPERIOR DE SALIDA */}
        <header className="w-full flex justify-end">
          <button
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-600 shadow-sm border border-[var(--theme-border)] backdrop-blur-md transition-all active:scale-95"
          >
            <X size={18} />
          </button>
        </header>

        {/* DISTRIBUCIÓN DE PANELES EN CUADRÍCULA FLOTANTE */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 my-2 lg:my-auto items-start w-full pt-2">
          
          {/* Bloque Izquierdo: Textos y Tracks */}
          <div className="col-span-1 lg:col-span-4 space-y-4 sm:space-y-5 text-left">
            <div>
              <span className="text-xs font-bold tracking-widest text-[var(--theme-primary)] uppercase">Módulo 3</span>
              <h1 className="text-2xl sm:text-3xl lg:text-[42px] font-light text-slate-900 tracking-tight leading-tight lg:leading-none mt-1">
                Terapia de
              </h1>
              <h1 className="text-2xl sm:text-3xl lg:text-[42px] font-black text-[var(--theme-primary)] tracking-tight mt-1 leading-tight lg:leading-none">
                Sonido <span className="inline-block text-[var(--theme-secondary)] text-lg sm:text-xl font-normal">♫</span>
              </h1>
            </div>

            {/* Lista de Frecuencias */}
            <div className="space-y-3 w-full max-w-md lg:max-w-sm">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Frecuencias Disponibles</p>
              
              {tracks.map((track, idx) => {
                const isActive = selectedTrack === idx;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      setSelectedTrack(idx);
                      setIsPlaying(false);
                      setProgress(0);
                    }}
                    className={`p-3 sm:p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                      isActive
                        ? "bg-white border-[var(--theme-border)] shadow-[var(--theme-shadow)] scale-[1.02]"
                        : "bg-white/70 hover:bg-white/90 border-[var(--theme-border)] shadow-sm"
                    }`}
                  >
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${isActive ? 'bg-[var(--theme-hover)] text-[var(--theme-primary)]' : 'bg-slate-100 text-slate-500'}`}>
                        {track.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{track.duration}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 mt-2">{track.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{track.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Columna Central Vacía: Espacio 100% libre para ver al personaje en primer plano */}
          <div className="hidden lg:block lg:col-span-5 h-full pointer-events-none" />

          {/* Columna Derecha: Panel de Info Reubicado */}
          <div className="col-span-1 lg:col-span-3 flex lg:justify-end">
            <div className="bg-[#1a2331]/95 backdrop-blur-md text-slate-200 rounded-2xl p-4 sm:p-5 shadow-xl w-full max-w-sm lg:max-w-[240px] border border-[var(--theme-border)] space-y-4">
              <div className="flex items-center gap-2 text-[var(--theme-primary)]">
                <Brain size={16} />
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Impacto Neuronal</span>
              </div>
              
              <div className="space-y-3">
                <div className="border-l-2 border-[var(--theme-primary)] pl-2.5">
                  <p className="text-[10px] text-slate-400 font-medium">Estado objetivo</p>
                  <p className="text-xs font-bold text-slate-200">{isKael ? "Descompresión y Enfoque" : "Reducción de Ritmo Alfa"}</p>
                </div>
                <div className="border-l-2 border-[var(--theme-primary)] pl-2.5">
                  <p className="text-[10px] text-slate-400 font-medium">Sugerencia de {companionName}</p>
                  <p className="text-[11px] text-slate-300 italic leading-relaxed">
                    "Usa auriculares para que las ondas binaurales calibren ambos hemisferios."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </main>

        {/* ================= PANEL INFERIOR CONTENEDOR ENCAJADO PERFECTO ================= */}
        <footer className="w-full bg-white/95 backdrop-blur-md rounded-[18px] sm:rounded-[22px] border border-[var(--theme-border)] shadow-[0_15px_50px_rgba(148,163,184,0.06)] p-4 sm:p-5 lg:p-6 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Metadata (Izquierda) */}
            <div className="md:col-span-4 flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-inner overflow-hidden flex-shrink-0">
                {isPlaying ? (
                  <div className="flex items-end gap-0.5 h-3.5">
                  <div className="w-0.5 bg-[var(--theme-primary)] animate-bounce" style={{ animationDuration: '0.5s' }} />
                    <div className="w-0.5 bg-[var(--theme-primary)] animate-bounce" style={{ animationDuration: '0.8s' }} />
                    <div className="w-0.5 bg-[var(--theme-primary)] animate-bounce" style={{ animationDuration: '0.4s' }} />
                  </div>
                ) : (
                  <Radio size={14} className="text-slate-500" />
                )}
              </div>
              <div className="truncate">
                <p className="text-[9px] font-bold text-[var(--theme-primary)] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={9} /> {tracks[selectedTrack].type}
                </p>
                <h3 className="text-xs font-bold text-slate-800 truncate">{tracks[selectedTrack].title}</h3>
              </div>
            </div>

            {/* Controles y Barra (Centro) */}
            <div className="md:col-span-5 flex flex-col items-center space-y-2 w-full min-w-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedTrack((t) => (t === 0 ? tracks.length - 1 : t - 1))}
                  className="text-slate-400 hover:text-slate-600 transition active:scale-90"
                >
                  <SkipBack size={15} fill="currentColor" />
                </button>
                
                <button
                  // Modifica el botón de play/pause:
                  onClick={handleTogglePlay}
                  className="w-9 h-9 rounded-full bg-[image:var(--theme-button)] text-white flex items-center justify-center shadow-md transition active:scale-95"
                >
                  {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                </button>

                <button 
                  onClick={() => setSelectedTrack((t) => (t === tracks.length - 1 ? 0 : t + 1))}
                  className="text-slate-400 hover:text-slate-600 transition active:scale-90"
                >
                  <SkipForward size={15} fill="currentColor" />
                </button>
              </div>

              {/* Barra de Tiempo */}
              <div className="w-full flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span>{formatTime(currentSec)}</span>
                <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden relative cursor-pointer">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[var(--theme-primary)] rounded-full transition-all" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{durationSec ? formatTime(durationSec) : tracks[selectedTrack].duration}</span>
              </div>
            </div>

            {/* Volumen (Derecha) */}
            <div className="md:col-span-3 hidden md:flex items-center justify-end gap-2 text-slate-400">
              <Volume2 size={14} />
              <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-slate-400" />
              </div>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
}
