import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Play, Pause, RotateCcw, ChevronRight, Heart, Clock, Wind } from "lucide-react";
import type { CompanionType } from "../types/companion";
import { logActivity } from "../hooks/useStats";

// Importación de assets
import AmarisImg from "../assets/avatar/Amarisfd.png";
import KaelImg from "../assets/avatar/Kaelfd.png";

interface BreathingPageProps {
  companion: CompanionType;
  onBack: () => void;
}

type BreathingState = "INHALA" | "SOSTÉN" | "EXHALA" | "ESPERA";

export default function BreathingPage({ companion, onBack }: BreathingPageProps) {
  const [isActive, setIsActive] = useState(false);
  const [cycleState, setCycleState] = useState<BreathingState>("ESPERA");
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [currentStep, setCurrentStep] = useState(1);

  const isKael = companion === "kael";
  const avatarUrl = isKael ? KaelImg : AmarisImg;

  /* Manejo del ciclo de respiración */
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (cycleState === "INHALA" || cycleState === "ESPERA") {
              setCycleState("SOSTÉN");
              setCurrentStep(2);
              return 4;
            } else if (cycleState === "SOSTÉN") {
              setCycleState("EXHALA");
              setCurrentStep(3);
              return 6;
            } else {
              setCycleState("INHALA");
              setCurrentStep(1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, cycleState]);

  const handleStart = () => {
    if (!isActive && cycleState === "ESPERA") {
      setCycleState("INHALA");
      setCurrentStep(1);
      setSecondsLeft(4);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
  if (isActive) {
    void logActivity("breathing"); // 👈 registra al parar
  }
  setIsActive(false);
  setCycleState("ESPERA");
  setCurrentStep(1);
  setSecondsLeft(4);
};

// Y en el botón de salida onBack, agrega:
const handleBack = () => {
  if (isActive) void logActivity("breathing");
  onBack();
};

  const maxDuration = cycleState === "EXHALA" ? 6 : 4;
  const strokeDashoffset = 282.7 - (282.7 * secondsLeft) / maxDuration;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#eef2f6] text-slate-800 font-sans flex flex-col p-4 sm:p-5 md:p-8 select-none overflow-y-auto overflow-x-hidden">
      
      {/* ================= BACKGROUND FIEL: AMARIS EN PANTALLA COMPLETA COMPLETA ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        <img 
          src={avatarUrl} 
          alt="Companion Render background" 
          className="w-full h-full object-cover object-center opacity-30 lg:opacity-100 scale-100 transition-all duration-700"
        />
        {/* Filtros de degradado e iluminación integrados para difuminar los bordes del recuadro original */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#eef2f6]/50 via-transparent to-[#eef2f6]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef2f6]/30 via-transparent to-[#eef2f6]/30" />
      </div>

      {/* ================= INTERFAZ HUD FLOTANTE SUPERPUESTA ================= */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto min-h-full flex flex-col justify-between gap-5">
        
        {/* BOTÓN SUPERIOR DE SALIDA */}
        <header className="w-full flex justify-end">
          <button
            onClick={handleBack}
            className="p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-600 shadow-md border border-[var(--theme-border)] transition-all active:scale-95"
          >
            <X size={18} />
          </button>
        </header>

        {/* DISTRIBUCIÓN GRID AMPLIA PARA SEPARAR LOS EXTREMOS */}
        <main className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 sm:gap-8 lg:gap-12 my-4 lg:my-auto items-center w-full">
          
          {/* SECCIÓN IZQUIERDA: TEXTO DE BIENVENIDA Y TARJETA GLASSMORPHIC */}
          <div className="space-y-4 sm:space-y-6 lg:max-w-md z-10">
            <div className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)]">
              <span className="text-xs font-bold tracking-widest text-[var(--theme-primary)] uppercase">Módulo 1</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
                Respira mejor,<br />vive mejor
              </h1>
              <p className="text-slate-700 text-sm mt-2 font-semibold max-w-sm">
                Aprende a realizar una respiración profunda y consciente para mejorar tu bienestar físico y mental.
              </p>
            </div>

            {/* Globo de Diálogo Flotante de la IA */}
            <div className="bg-white/75 backdrop-blur-md rounded-3xl p-4 sm:p-6 text-slate-800 border border-[var(--theme-border)] shadow-[var(--theme-shadow)]">
              <span className="text-[10px] font-bold px-2.5 py-1 bg-[var(--theme-hover)] text-[var(--theme-primary)] rounded-full tracking-wider uppercase">
                {isKael ? "KAEL IA" : "AMARIS IA"}
              </span>
              <p className="text-sm font-semibold leading-relaxed mt-3.5 text-slate-700">
                {isActive 
                  ? (cycleState === "INHALA" ? "Inhala suavemente por la nariz llenando tus pulmones." : cycleState === "SOSTÉN" ? "Mantén el aire con calma." : "Exhala todo el aire por la boca de forma pausada.") 
                  : "Hola, soy Amaris. En este módulo aprenderás una técnica simple pero poderosa para calmar tu mente, reducir el estrés y mejorar tu energía."
                }
              </p>
              {!isActive && (
                <button onClick={handleStart} className="text-sm font-bold text-[var(--theme-primary)] mt-3 flex items-center gap-1 hover:underline transition-all">
                  ¿Listo para comenzar? <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>

          {/* SECCIÓN DERECHA: PANEL DE PASOS Y ANILLO OSCURO INTERNO */}
          <div className="bg-white/90 backdrop-blur-md rounded-[24px] sm:rounded-[32px] border border-[var(--theme-border)] shadow-[var(--theme-shadow)] p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 max-w-md w-full lg:ml-auto z-10">
            
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Pasos de la respiración</h3>
              
              <div className="space-y-4 relative before:absolute before:left-[14px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100">
                {[
                  { id: 1, title: "Inhala por la nariz", desc: "Inhala lenta y profundamente por la nariz contando hasta 4." },
                  { id: 2, title: "Sostén el aire", desc: "Mantén el aire en tus pulmones contando hasta 4." },
                  { id: 3, title: "Exhala por la boca", desc: "Exhala lenta y completamente por la boca contando hasta 6." },
                  { id: 4, title: "Repite el ciclo", desc: "Repite este ciclo de 5 a 10 veces para mejores resultados." }
                ].map((step) => {
                  const isCurrent = currentStep === step.id && isActive;
                  return (
                    <div key={step.id} className={`flex gap-4 relative z-10 transition-all duration-300 ${isActive && !isCurrent ? "opacity-35" : "opacity-100"}`}>
                      <div className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center transition-all ${isCurrent ? "bg-[image:var(--theme-button)] text-white shadow-md" : "bg-slate-100 text-slate-500"}`}>
                        {step.id}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">{step.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Widget del Anillo de Respiración */}
            <div className="bg-[#1e2530] rounded-2xl p-4 sm:p-5 text-white flex flex-col items-center relative shadow-inner">
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-3">Visualización de la respiración</span>
              
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.05)" strokeWidth="3.5" fill="transparent" />
                  <motion.circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    stroke="var(--theme-chart)" 
                    strokeWidth="3.5" 
                    fill="transparent"
                    strokeDasharray="282.7"
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold tracking-wide capitalize text-white">
                    {cycleState === "ESPERA" ? "Inhala" : cycleState.toLowerCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">{secondsLeft} seg</span>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* ================= FOOTER: METADATOS METABÓLICOS Y BOTONES ================= */}
        <footer className="w-full space-y-4 z-10">
          
          {/* Detalles Técnicos Flotantes */}
          <div className="bg-white/75 border border-[var(--theme-border)] backdrop-blur-md rounded-2xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-around gap-3 sm:gap-4 text-slate-600 text-xs shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-500"><Wind size={15} /></div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Técnica</p>
                <p className="text-slate-800 text-xs font-bold">Respiración diafragmática profunda</p>
              </div>
            </div>
            <div className="w-[1px] h-5 bg-slate-300/60 hidden sm:block" />
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-500"><Clock size={15} /></div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Duración</p>
                <p className="text-slate-800 text-xs font-bold">5 - 7 minutos</p>
              </div>
            </div>
            <div className="w-[1px] h-5 bg-slate-300/60 hidden sm:block" />
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-500"><Heart size={15} /></div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Beneficios</p>
                <p className="text-slate-800 text-xs font-bold">Reduce estrés y mejora concentración</p>
              </div>
            </div>
          </div>

          {/* Disparadores principales */}
          <div className="flex justify-center items-center gap-3">
            {isActive && (
              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 shadow-sm transition-all active:scale-95"
              >
                <RotateCcw size={15} />
              </button>
            )}
            <button
              onClick={handleStart}
              className="w-full sm:w-auto justify-center px-6 sm:px-12 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all flex items-center gap-2 bg-[image:var(--theme-button)] shadow-lg active:scale-95"
            >
              {isActive ? (
                <>
                  <Pause size={13} fill="currentColor" /> Pausar práctica
                </>
              ) : (
                <>
                  <Play size={13} fill="currentColor" /> Comenzar práctica
                </>
              )}
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
