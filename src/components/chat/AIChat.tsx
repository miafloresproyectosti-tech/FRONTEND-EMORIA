import { useState } from "react";

import {
  Send,
  Bot,
  User,
  Sparkles,
  Brain,
} from "lucide-react";

interface Props {
  companion?: "amaris" | "kael";
}

export default function AIChat({
  companion = "amaris",
}: Props) {

  /* =========================================================
     INITIAL MESSAGE
  ========================================================= */

  const initialMessage =

    companion === "amaris"

      ? "Hola 💖 soy AMARIS. Estoy aquí para acompañarte emocionalmente."

      : "Hola ⚡ soy KAEL. Analizaré tus emociones y patrones mentales.";

  /* =========================================================
     STATES
  ========================================================= */

  const [messages, setMessages] = useState([

    {
      role: "ai",
      text: initialMessage,
    },

  ]);

  const [input, setInput] =
    useState("");

  /* =========================================================
     GENERATE RESPONSE
  ========================================================= */

  const generarRespuestaIA = (
    text: string
  ) => {

    const t = text.toLowerCase();

    /* =====================================
       AMARIS
    ===================================== */

    if (companion === "amaris") {

      if (t.includes("triste")) {

        return "Lo siento mucho 💖. Estoy aquí contigo. ¿Quieres contarme qué ocurrió?";

      }

      if (t.includes("feliz")) {

        return "Eso me alegra muchísimo ✨. Quiero saber más sobre ese momento.";

      }

      if (t.includes("estres")) {

        return "Respira lentamente conmigo 🌸. Todo estará bien paso a paso.";

      }

      return "Entiendo cómo te sientes 💕. Estoy aquí para escucharte.";

    }

    /* =====================================
       KAEL
    ===================================== */

    if (t.includes("triste")) {

      return "Detecto un estado emocional bajo. Recomiendo liberar tensión y reorganizar pensamientos.";

    }

    if (t.includes("feliz")) {

      return "Estado positivo detectado ⚡. Tu motivación actual es elevada.";

    }

    if (t.includes("estres")) {

      return "Nivel de estrés identificado. Sugiero pausa mental y respiración guiada.";

    }

    return "Procesando emociones y patrones cognitivos.";

  };

  /* =========================================================
     SEND
  ========================================================= */

  const handleSend = () => {

    if (!input.trim()) return;

    const userMessage = {

      role: "user",
      text: input,

    };

    const aiMessage = {

      role: "ai",
      text: generarRespuestaIA(input),

    };

    setMessages([

      ...messages,
      userMessage,
      aiMessage,

    ]);

    setInput("");

  };

  /* =========================================================
     CURRENT STYLE
  ========================================================= */

  const isAmaris =
    companion === "amaris";

  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div
      className="
        w-full
        h-[min(700px,calc(100dvh-220px))]
        min-h-[460px]
        md:h-[700px]

        flex
        flex-col

        rounded-[24px]
        sm:rounded-[35px]

        border
        border-[var(--theme-border)]

        overflow-hidden

        backdrop-blur-2xl

        bg-[var(--theme-card)]
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          p-4
          sm:p-5

          border-b
          border-[var(--theme-border)]

          flex
          items-center
          gap-4
        "
      >

        <div
          className={`
            w-12
            h-12
            sm:w-14
            sm:h-14

            rounded-2xl

            flex
            items-center
            justify-center

            shadow-2xl

            ${
              isAmaris

                ? `
                  bg-[image:var(--theme-button)]
                `

                : `
                  bg-[image:var(--theme-button)]
                `
            }
          `}
        >

          {isAmaris

            ? <Sparkles size={24} />

            : <Brain size={24} />
          }

        </div>

        <div>

          <h2
            className="
              text-white
              font-black
              text-lg
              sm:text-xl
            "
          >

            {isAmaris
              ? "AMARIS AI"
              : "KAEL AI"}

          </h2>

          <p
            className="
              text-white/50
              text-sm
            "
          >

            {isAmaris

              ? "Asistente emocional activa"

              : "IA analítica avanzada"
            }

          </p>

        </div>

      </div>

      {/* =====================================================
          MESSAGES
      ===================================================== */}

      <div
        className="
          flex-1

          overflow-y-auto

          p-4
          sm:p-5

          space-y-5
        "
      >

        {messages.map((msg, i) => (

          <div

            key={i}

            className={`
              flex
              items-start
              gap-3

              ${
                msg.role === "user"

                  ? "justify-end"

                  : "justify-start"
              }
            `}
          >

            {/* AI ICON */}
            {msg.role === "ai" && (

              <div
                className={`
                  w-10
                  h-10

                  rounded-full

                  flex
                  items-center
                  justify-center

                  ${
                    isAmaris

                      ? "bg-[var(--theme-hover)]"

                      : "bg-[var(--theme-hover)]"
                  }
                `}
              >

                <Bot size={18} />

              </div>

            )}

            {/* MESSAGE */}
            <div
              className={`
                max-w-[86%]
                sm:max-w-[75%]

                px-4
                sm:px-5
                py-3
                sm:py-4

                rounded-[24px]

                text-sm
                lg:text-base

                leading-relaxed

                ${
                  msg.role === "user"

                    ? `
                      bg-[image:var(--theme-button)]
                      text-white
                    `

                    : `
                      bg-white/10
                      text-white
                    `
                }
              `}
            >

              {msg.text}

            </div>

            {/* USER ICON */}
            {msg.role === "user" && (

              <div
                className="
                  w-10
                  h-10

                  rounded-full

                  bg-white/10

                  flex
                  items-center
                  justify-center
                "
              >

                <User size={18} />

              </div>

            )}

          </div>

        ))}

      </div>

      {/* =====================================================
          INPUT
      ===================================================== */}

      <div
        className="
          p-4
          sm:p-5

          border-t
          border-[var(--theme-border)]

          flex
          flex-col
          sm:flex-row
          gap-4
        "
      >

        <input

          value={input}

          onChange={(e) =>
            setInput(e.target.value)
          }

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleSend();

            }

          }}

          placeholder="Escribe cómo te sientes..."

          className="
            flex-1
            min-w-0

            px-4
            sm:px-5
            py-4

            rounded-2xl

            bg-white/5

            border
            border-[var(--theme-border)]

            text-white

            outline-none

            focus:border-[var(--theme-primary)]
          "
        />

        <button

          onClick={handleSend}

          className={`
            px-5
            py-4

            rounded-2xl

            flex
            items-center
            justify-center

            transition-all

            hover:scale-105

            ${
              isAmaris

                ? `
                  bg-[image:var(--theme-button)]
                `

                : `
                  bg-[image:var(--theme-button)]
                `
            }
          `}
        >

          <Send size={20} />

        </button>

      </div>

    </div>

  );

}
