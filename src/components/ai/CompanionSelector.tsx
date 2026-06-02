import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Heart,
  Shield,
  Zap,
  ArrowRight
} from "lucide-react";

import type { CompanionType } from "../../types/companion";

interface Props {
  onSelect: (companion: CompanionType) => void;
}

export default function CompanionSelector({ onSelect }: Props) {
  return (
    <div className="fixed inset-0 z-[400] overflow-hidden bg-black">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#09090f] to-black" />

      {/* Glow izquierda */}
      <div className="absolute left-[-150px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/20 blur-[180px]" />

      {/* Glow derecha */}
      <div className="absolute right-[-150px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 blur-[180px]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.4em] text-orange-400 text-sm font-bold mb-5">
            EMORIA AI
          </p>

          <h1 className="text-6xl lg:text-8xl font-black text-white">
            Elige tu IA
          </h1>

          <p className="mt-6 text-white/60 text-xl max-w-[700px] mx-auto">
            Cada compañero está diseñado para acompañarte de forma
            diferente según tus necesidades emocionales y personales.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-10 w-full max-w-[1300px]">

          {/* ========================= */}
          {/* AMARIS */}
          {/* ========================= */}

          <motion.button
            whileHover={{
              y: -10,
              scale: 1.02
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect("amaris")}
            className="
              group
              relative
              overflow-hidden
              rounded-[40px]
              border
              border-pink-500/20
              bg-white/[0.03]
              backdrop-blur-2xl
              p-10
              text-left
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-pink-500/20 flex items-center justify-center mb-8">
                <Sparkles size={40} className="text-pink-300" />
              </div>

              <h2 className="text-5xl font-black text-white">
                AMARIS
              </h2>

              <p className="mt-5 text-pink-100/70 text-lg leading-relaxed">
                Especialista en apoyo emocional, bienestar mental y
                acompañamiento personalizado.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3 text-white/70">
                  <Heart size={18} />
                  Empática y comprensiva
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <Shield size={18} />
                  Espacio seguro para expresarte
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <Sparkles size={18} />
                  Recomendaciones de bienestar
                </div>

              </div>

              <div className="mt-10 flex items-center gap-3 text-pink-300 font-semibold">
                Comenzar con Amaris
                <ArrowRight size={18} />
              </div>
            </div>
          </motion.button>

          {/* ========================= */}
          {/* KAEL */}
          {/* ========================= */}

          <motion.button
            whileHover={{
              y: -10,
              scale: 1.02
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect("kael")}
            className="
              group
              relative
              overflow-hidden
              rounded-[40px]
              border
              border-cyan-500/20
              bg-white/[0.03]
              backdrop-blur-2xl
              p-10
              text-left
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 flex items-center justify-center mb-8">
                <Brain size={40} className="text-cyan-300" />
              </div>

              <h2 className="text-5xl font-black text-white">
                KAEL
              </h2>

              <p className="mt-5 text-cyan-100/70 text-lg leading-relaxed">
                Diseñado para ayudarte a analizar, organizar ideas y
                desarrollar estrategias efectivas.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3 text-white/70">
                  <Brain size={18} />
                  Pensamiento analítico
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <Zap size={18} />
                  Resolución de problemas
                </div>

                <div className="flex items-center gap-3 text-white/70">
                  <Shield size={18} />
                  Orientación estratégica
                </div>

              </div>

              <div className="mt-10 flex items-center gap-3 text-cyan-300 font-semibold">
                Comenzar con Kael
                <ArrowRight size={18} />
              </div>
            </div>
          </motion.button>

        </div>
      </div>
    </div>
  );
}