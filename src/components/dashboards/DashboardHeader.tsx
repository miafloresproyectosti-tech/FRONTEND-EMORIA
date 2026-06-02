import { motion } from "framer-motion";

import {
  Bell,
  Search,
  Sparkles,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

interface Props {
  companion?: string;
}

export default function DashboardHeader({
  companion = "AMARIS",
}: Props) {
  const { currentTheme } = useTheme();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        relative
        w-full
        mb-8
        rounded-[30px]
        overflow-hidden
        border
        backdrop-blur-3xl
        shadow-[var(--theme-shadow)]
      "
      style={{
        backgroundColor: currentTheme.card,
        borderColor: currentTheme.border,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.glow}, transparent)`,
          opacity: 0.18,
        }}
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          lg:flex-row
          items-start
          lg:items-center
          justify-between
          gap-6
          px-6
          py-6
        "
      >
        <div>
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              text-sm
              mb-4
            "
            style={{
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
              color: currentTheme.primary,
            }}
          >
            <Sparkles size={16} />
            EMORIA AI ACTIVE
          </motion.div>

          <h1
            className="
              text-[30px]
              md:text-[52px]
              font-black
              leading-tight
            "
            style={{ color: currentTheme.text }}
          >
            Bienvenido a EMORIA
          </h1>

          <p
            className="
              mt-3
              text-sm
              md:text-lg
              max-w-[700px]
              leading-relaxed
            "
            style={{ color: currentTheme.muted }}
          >
            Tu asistente actual es{" "}
            <span
              className="font-semibold"
              style={{ color: currentTheme.primary }}
            >
              {companion}
            </span>
            . El sistema emocional inteligente ya está sincronizado contigo.
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-4
            w-full
            lg:w-auto
          "
        >
          <div
            className="
              relative
              flex-1
              lg:w-[320px]
            "
          >
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
              "
              style={{ color: currentTheme.muted }}
            />

            <input
              type="text"
              placeholder="Buscar emociones, sesiones..."
              className="
                w-full
                h-[54px]
                rounded-2xl
                border
                pl-12
                pr-4
                outline-none
                transition-all
              "
              style={{
                backgroundColor: currentTheme.surfaceStrong,
                borderColor: currentTheme.border,
                color: currentTheme.text,
              }}
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              relative
              w-[54px]
              h-[54px]
              rounded-2xl
              border
              flex
              items-center
              justify-center
              overflow-hidden
            "
            style={{
              backgroundColor: currentTheme.surfaceStrong,
              borderColor: currentTheme.border,
              color: currentTheme.text,
            }}
          >
            <div
              className="
                absolute
                top-3
                right-3
                w-2
                h-2
                rounded-full
                animate-pulse
              "
              style={{ backgroundColor: currentTheme.primary }}
            />

            <Bell size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
