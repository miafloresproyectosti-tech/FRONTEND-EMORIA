import { motion } from "framer-motion";
import {
  ScanFace,
  Brain,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// 1. Cambiamos el nombre en la interfaz a 'onContinue'
interface Props {
  onContinue: () => void;
}

// 2. Lo recibimos aquí como 'onContinue'
export default function FaceScanScreen({
  onContinue,
}: Props) {

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        flex
        items-center
        justify-center
        px-6
      "
    >
      {/* BACKDROP */}
      <div
        className="
          absolute
          inset-0
          bg-black/70
          backdrop-blur-xl
        "
      />

      {/* MAIN CARD */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
          relative
          w-full
          max-w-[950px]
          rounded-[40px]
          border
          border-white/10
          bg-black/30
          backdrop-blur-3xl
          overflow-hidden
          shadow-[0_0_80px_rgba(0,0,0,0.55)]
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            top-[-120px]
            right-[-120px]
            w-[320px]
            h-[320px]
            rounded-full
            bg-orange-500/20
            blur-[120px]
          "
        />

        <div
          className="
            grid
            lg:grid-cols-2
          "
        >
          {/* LEFT */}
          <div
            className="
              p-10
              lg:p-14
              flex
              flex-col
              justify-center
            "
          >
            {/* BADGE */}
            <div
              className="
                mb-6
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-orange-500
                  to-pink-500
                  flex
                  items-center
                  justify-center
                "
              >
                <Sparkles className="text-white" />
              </div>

              <div>
                <p
                  className="
                    text-orange-400
                    text-sm
                    font-bold
                    uppercase
                    tracking-wider
                  "
                >
                  Emotional AI
                </p>
                <p
                  className="
                    text-white/40
                    text-sm
                  "
                >
                  Escaneo Inteligente
                </p>
              </div>
            </div>

            {/* TITLE */}
            <h1
              className="
                text-5xl
                lg:text-6xl
                font-black
                leading-tight
                text-white
              "
            >
              EMORIA
              <br />
              <span
                className="
                  bg-gradient-to-r
                  from-orange-400
                  to-pink-500
                  bg-clip-text
                  text-transparent
                "
              >
                AI SCAN
              </span>
            </h1>

            {/* TEXT */}
            <p
              className="
                mt-6
                text-white/60
                leading-relaxed
                max-w-[420px]
              "
            >
              Nuestro sistema analizará tus expresiones faciales y emociones para construir una experiencia emocional totalmente personalizada.
            </p>

            {/* BUTTON */}
            <button
              onClick={onContinue} // 3. Vinculamos el clic a 'onContinue'
              className="
                mt-10
                w-fit
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-orange-500
                to-pink-500
                font-semibold
                text-white
                flex
                items-center
                gap-3
                hover:scale-[1.03]
                transition-all
                duration-300
                shadow-2xl
              "
            >
              Iniciar escaneo
              <ArrowRight size={20} />
            </button>
          </div>

          {/* RIGHT */}
          <div
            className="
              relative
              min-h-[500px]
              flex
              items-center
              justify-center
              p-10
            "
          >
            {/* CAMERA */}
            <div
              className="
                relative
                w-[320px]
                h-[420px]
                rounded-[40px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-2xl
                overflow-hidden
                flex
                items-center
                justify-center
              "
            >
              {/* GRID */}
              <div
                className="
                  absolute
                  inset-0
                  bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
                  bg-[size:35px_35px]
                "
              />

              {/* FACE ICON */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="
                  relative
                  z-10
                "
              >
                <ScanFace
                  size={140}
                  className="text-orange-400"
                />
              </motion.div>

              {/* SCAN LINE */}
              <motion.div
                animate={{
                  y: [-180, 180],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  w-full
                  h-[3px]
                  bg-orange-400
                  shadow-[0_0_20px_rgba(255,120,0,0.8)]
                "
              />

              {/* CORNERS */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-orange-400 rounded-tl-xl" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-orange-400 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-orange-400 rounded-bl-xl" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-orange-400 rounded-br-xl" />
            </div>

            {/* FLOATING INFO */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="
                absolute
                bottom-14
                right-8
                rounded-2xl
                border
                border-white/10
                bg-black/40
                backdrop-blur-xl
                p-4
              "
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Brain className="text-orange-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs">IA emocional</p>
                  <h3 className="text-white font-bold">Analizando...</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}