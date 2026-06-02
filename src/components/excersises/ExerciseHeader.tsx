import { Sparkles, Bot, MessageSquareCode } from "lucide-react";
import type { CompanionType } from "../../types/companion"; // Ajusta la ruta según tu proyecto

/* ================= TYPES ================= */
interface ExerciseHeaderProps {
  companion?: CompanionType | null;
}

/* ================= COMPONENT ================= */
export default function ExerciseHeader({ companion = "amaris" }: ExerciseHeaderProps) {
  
  // CONFIGURACIÓN DINÁMICA SEGÚN EL COMPANION
  const aiConfig = {
    amaris: {
      name: "AMARIS",
      role: "Guía de Armonía Emocional",
      instruction: "Hola. He preparado estas actividades para ayudarte a desacelerar la mente, canalizar tu energía mística y encontrar tu centro. Elige el ejercicio que resuene con lo que sientes justo ahora.",
      gradient: "from-pink-500 via-purple-500 to-indigo-600",
      textGradient: "from-pink-400 to-purple-400",
      glowColor: "bg-purple-500/20",
    },
    kael: {
      name: "KAEL",
      role: "Estratega de Enfoque Mental",
      instruction: "Código optimizado para tu bienestar. Estos ejercicios están diseñados para reestructurar tus niveles de estrés y calibrar tu concentración. Elige tu próximo objetivo táctico.",
      gradient: "from-orange-500 via-amber-500 to-cyan-500",
      textGradient: "from-orange-400 to-cyan-400",
      glowColor: "bg-cyan-500/20",
    }
  };

  // Si por alguna razón viene null o un valor extraño, cae en "amaris" por defecto
  const currentAI = aiConfig[companion === "kael" ? "kael" : "amaris"];

  return (
    <section
      className="
        mb-10
        rounded-[35px]
        border
        border-white/10
        bg-black/40
        backdrop-blur-3xl
        p-8
        overflow-hidden
        relative
        shadow-2xl
      "
    >
      {/* DINAMIC GLOW DE FONDO */}
      <div
        className={`
          absolute
          top-[-120px]
          right-[-120px]
          w-[350px]
          h-[350px]
          rounded-full
          ${currentAI.glowColor}
          blur-[130px]
          transition-all
          duration-700
        `}
      />

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        
        {/* LADO IZQUIERDO: TÍTULO DEL PANEL */}
        <div className="max-w-[600px]">
          <div
            className="
              flex
              items-center
              gap-3
              mb-5
            "
          >
            <div
              className={`
                w-12
                h-12
                rounded-2xl
                bg-gradient-to-r
                ${currentAI.gradient}
                flex
                items-center
                justify-center
                shadow-lg
                transition-all
                duration-700
              `}
            >
              <Sparkles size={22} className="text-white animate-pulse" />
            </div>

            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.4em]">
              Sistemas de Bienestar · EMORIA
            </p>
          </div>

          <h1
            className="
              text-4xl
              lg:text-5xl
              font-black
              leading-none
              tracking-tight
              mb-4
            "
          >
            Ejercicios
            <span
              className={`
                bg-gradient-to-r
                ${currentAI.textGradient}
                bg-clip-text
                text-transparent
                ml-3
                transition-all
                duration-700
              `}
            >
              Inteligentes
            </span>
          </h1>

          <p className="text-white/50 text-base leading-relaxed">
            Actividades biomecánicas e impulsadas por IA para regular el estrés,
            estabilizar el ritmo cardíaco y optimizar tu rendimiento cognitivo.
          </p>
        </div>

        {/* LADO DERECHO: CUADRO DE DIÁLOGO DE LA IA (INSTRUCCIONES) */}
        <div 
          className="
            flex-1
            max-w-[550px]
            w-full
            rounded-3xl
            border
            border-white/5
            bg-white/[0.03]
            p-6
            relative
            backdrop-blur-xl
            before:absolute
            before:inset-0
            before:rounded-3xl
            before:bg-gradient-to-br
            before:from-white/5
            before:to-transparent
            before:pointer-events-none
          "
        >
          {/* Tag superior de la IA */}
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 text-white/80">
                <Bot size={18} className="animate-bounce" />
              </div>
              <div>
                <h4 className="text-sm font-black tracking-wider text-white">
                  {currentAI.name}
                </h4>
                <p className="text-[10px] text-white/40 uppercase font-semibold">
                  {currentAI.role}
                </p>
              </div>
            </div>
            
            {/* Estado interactivo simulado */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
              <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">
                Instrucción
              </span>
            </div>
          </div>

          {/* Texto de instrucción directo de la IA */}
          <div className="flex gap-3 items-start">
            <MessageSquareCode size={16} className="text-white/30 mt-1 flex-shrink-0" />
            <p className="text-white/80 text-sm leading-relaxed italic">
              "{currentAI.instruction}"
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}