import { motion } from "framer-motion";

import AIChat from "../components/chat/AIChat";
import type { CompanionType } from "../types/companion"; // Ajusta esta ruta si tus tipos están en otra carpeta

import {
  Brain,
  Sparkles,
  ShieldCheck,
  Bot,
} from "lucide-react";

/* ================= TYPES ================= */
interface ChatPageProps {
  companion: CompanionType;
}

/* ================= COMPONENT ================= */
export default function ChatPage({ companion }: ChatPageProps) {

  return (

    <div
      className="
        w-full
        min-h-screen
        text-white
      "
    >

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div
        className="
          mb-10
          flex
          flex-col
          lg:flex-row
          items-start
          lg:items-center
          justify-between
          gap-6
        "
      >

        {/* LEFT */}
        <div>

          <p
            className="
              text-[var(--theme-primary)]
              uppercase
              tracking-[0.35em]
              text-sm
              font-bold
              mb-4
            "
          >
            EMORIA AI CHAT
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-6xl
              font-black
              leading-tight
            "
          >

            Conversa con tu
            <br />

            <span
              className="
                bg-[image:var(--theme-gradient)]
                bg-clip-text
                text-transparent
              "
            >
              Inteligencia Emocional
            </span>

          </h1>

        </div>

        {/* RIGHT */}
        <motion.div

          animate={{
            opacity: [0.6, 1, 0.6],
          }}

          transition={{
            duration: 3,
            repeat: Infinity,
          }}

          className="
            px-4
            sm:px-6
            py-3
            sm:py-4
            rounded-[24px]
            border
            border-[var(--theme-border)]
            bg-[var(--theme-card)]
            backdrop-blur-2xl
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-green-400
                shadow-[0_0_18px_rgba(74,222,128,0.9)]
              "
            />

            <span
              className="
                text-white/70
                text-sm
              "
            >
              IA conectada en tiempo real
            </span>

          </div>

        </motion.div>

      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          2xl:grid-cols-[1.5fr_0.55fr]
          gap-6
          lg:gap-8
          items-start
        "
      >

        {/* =================================================
            CHAT
        ================================================= */}

        <div className="min-w-0">

          {/* Le pasamos el companion también al componente interno del chat */}
          <AIChat companion={companion} />

        </div>

        {/* =================================================
            RIGHT PANEL
        ================================================= */}

        <div
          className="
            space-y-6
          "
        >

          {/* =============================================
              STATUS
          ============================================= */}

          <div
            className="
              rounded-[30px]
              border
              border-[var(--theme-border)]
              bg-[var(--theme-card)]
              backdrop-blur-2xl
              p-5
              sm:p-7
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
                mb-6
              "
            >

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[image:var(--theme-button)]
                  flex
                  items-center
                  justify-center
                "
              >

                <Bot size={28} />

              </div>

              <div>

                <h2
                  className="
                    text-2xl
                    font-black
                  "
                >
                  {/* Convertimos el nombre a Mayúsculas para que encaje estéticamente */}
                  {companion ? companion.toUpperCase() : "EMORIA"}
                </h2>

                <p
                  className="
                    text-white/50
                    text-sm
                  "
                >
                  Emotional AI System
                </p>

              </div>

            </div>

            <div
              className="
                space-y-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span className="text-white/60">
                  Estado IA
                </span>

                <span className="text-green-400">
                  Activa
                </span>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span className="text-white/60">
                  Emoción detectada
                </span>

                <span className="text-[var(--theme-primary)]">
                  Positiva
                </span>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span className="text-white/60">
                  Sincronización
                </span>

                <span className="text-[var(--theme-accent)]">
                  98%
                </span>

              </div>

            </div>

          </div>

          {/* =============================================
              FEATURES
          ============================================= */}

          <div
            className="
              rounded-[30px]
              border
              border-[var(--theme-border)]
              bg-[var(--theme-card)]
              backdrop-blur-2xl
              p-5
              sm:p-7
            "
          >

            <h2
              className="
                text-2xl
                font-black
                mb-6
              "
            >
              Capacidades IA
            </h2>

            <div
              className="
                space-y-5
              "
            >

              {[
                {
                  icon: Brain,
                  title: "Análisis emocional",
                  color: "text-[var(--theme-primary)]",
                },
                {
                  icon: Sparkles,
                  title: "Respuestas inteligentes",
                  color: "text-[var(--theme-secondary)]",
                },
                {
                  icon: ShieldCheck,
                  title: "Privacidad segura",
                  color: "text-[var(--theme-accent)]",
                },
              ].map((item, index) => {

                const Icon = item.icon;

                return (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-[var(--theme-hover)]
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <Icon
                        className={item.color}
                        size={22}
                      />

                    </div>

                    <div>

                      <h3
                        className="
                          font-semibold
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          text-white/45
                          text-sm
                        "
                      >
                        Sistema avanzado EMORIA
                      </p>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}
