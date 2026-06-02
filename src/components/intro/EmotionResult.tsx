import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Activity,
  ShieldCheck,
} from "lucide-react";

interface Props {
  onFinish: () => void;
}

export default function EmotionResult({
  onFinish,
}: Props) {

  const emotions = [

    {
      label: "Estrés",
      value: 68,
      color: "from-violet-500 to-fuchsia-400",
    },

    {
      label: "Energía",
      value: 72,
      color: "from-cyan-400 to-blue-500",
    },

    {
      label: "Creatividad",
      value: 91,
      color: "from-pink-500 to-rose-400",
    },

    {
      label: "Ansiedad Social",
      value: 38,
      color: "from-orange-400 to-yellow-300",
    },

  ];

  return (

    <div
      className="
        fixed
        inset-0
        z-[400]

        bg-black

        overflow-y-auto

        flex
        items-center
        justify-center

        px-4
        py-10
      "
    >

      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_70%)]
        "
      />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.05]

          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]

          bg-[size:40px_40px]
        "
      />

      {/* CONTENT */}
      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 1,
        }}

        className="
          relative
          z-20

          w-full
          max-w-[1200px]
        "
      >

        {/* TITLE */}
        <div className="text-center mb-12">

          <motion.h1

            initial={{
              opacity: 0,
              y: -20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="
              text-white

              text-[34px]
              md:text-[72px]

              font-black

              tracking-[6px]
            "
          >

            ANÁLISIS COMPLETADO

          </motion.h1>

          <p
            className="
              text-violet-300/70

              text-sm
              md:text-xl

              tracking-[3px]

              mt-4
            "
          >

            EMORIA Emotional Intelligence System

          </p>

        </div>

        {/* MAIN GRID */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2

            gap-8
          "
        >

          {/* LEFT PANEL */}
          <motion.div

            initial={{
              opacity: 0,
              x: -30,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.2,
            }}

            className="
              rounded-[34px]

              bg-white/5

              backdrop-blur-3xl

              border
              border-white/10

              p-8
            "
          >

            <div className="flex items-center gap-4 mb-8">

              <div
                className="
                  w-16
                  h-16

                  rounded-2xl

                  bg-violet-500/20

                  flex
                  items-center
                  justify-center
                "
              >

                <Brain
                  className="
                    text-violet-300
                  "
                  size={32}
                />

              </div>

              <div>

                <h2
                  className="
                    text-white

                    text-2xl

                    font-bold
                  "
                >
                  Perfil Emocional
                </h2>

                <p
                  className="
                    text-white/50
                  "
                >
                  Estado cognitivo detectado
                </p>

              </div>

            </div>

            {/* EMOTIONS */}
            <div className="space-y-6">

              {emotions.map((emotion, index) => (

                <div key={index}>

                  <div
                    className="
                      flex
                      justify-between

                      mb-2
                    "
                  >

                    <span
                      className="
                        text-white
                        font-medium
                      "
                    >
                      {emotion.label}
                    </span>

                    <span
                      className="
                        text-violet-300
                        font-bold
                      "
                    >
                      {emotion.value}%
                    </span>

                  </div>

                  <div
                    className="
                      h-[14px]

                      rounded-full

                      bg-white/10

                      overflow-hidden
                    "
                  >

                    <motion.div

                      initial={{
                        width: 0,
                      }}

                      animate={{
                        width: `${emotion.value}%`,
                      }}

                      transition={{
                        duration: 1.5,
                        delay: index * 0.2,
                      }}

                      className={`
                        h-full

                        rounded-full

                        bg-gradient-to-r
                        ${emotion.color}
                      `}
                    />

                  </div>

                </div>

              ))}

            </div>

          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div

            initial={{
              opacity: 0,
              x: 30,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: 0.4,
            }}

            className="
              rounded-[34px]

              bg-white/5

              backdrop-blur-3xl

              border
              border-white/10

              p-8
            "
          >

            {/* AI STATUS */}
            <div className="space-y-6">

              {/* CARD */}
              <div
                className="
                  rounded-[28px]

                  border
                  border-violet-400/20

                  bg-violet-500/10

                  p-6
                "
              >

                <div className="flex items-center gap-4">

                  <Sparkles
                    className="
                      text-violet-300
                    "
                    size={32}
                  />

                  <div>

                    <h3
                      className="
                        text-white

                        text-xl

                        font-bold
                      "
                    >
                      Universo Recomendado
                    </h3>

                    <p
                      className="
                        text-violet-200/80
                        mt-1
                      "
                    >
                      SCI-FI
                    </p>

                  </div>

                </div>

              </div>

              {/* CARD */}
              <div
                className="
                  rounded-[28px]

                  border
                  border-cyan-400/20

                  bg-cyan-500/10

                  p-6
                "
              >

                <div className="flex items-center gap-4">

                  <Activity
                    className="
                      text-cyan-300
                    "
                    size={32}
                  />

                  <div>

                    <h3
                      className="
                        text-white

                        text-xl

                        font-bold
                      "
                    >
                      Companion Compatible
                    </h3>

                    <p
                      className="
                        text-cyan-200/80
                        mt-1
                      "
                    >
                      EMORIA
                    </p>

                  </div>

                </div>

              </div>

              {/* CARD */}
              <div
                className="
                  rounded-[28px]

                  border
                  border-pink-400/20

                  bg-pink-500/10

                  p-6
                "
              >

                <div className="flex items-center gap-4">

                  <ShieldCheck
                    className="
                      text-pink-300
                    "
                    size={32}
                  />

                  <div>

                    <h3
                      className="
                        text-white

                        text-xl

                        font-bold
                      "
                    >
                      Perfil Detectado
                    </h3>

                    <p
                      className="
                        text-pink-200/80
                        mt-1
                      "
                    >
                      Creativo · Reflexivo · Adaptativo
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* BUTTON */}
            <motion.button

              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.97,
              }}

              onClick={onFinish}

              className="
                mt-10

                w-full

                py-5

                rounded-[24px]

                bg-gradient-to-r
                from-violet-500
                via-fuchsia-500
                to-cyan-400

                text-white

                text-lg
                md:text-2xl

                font-bold

                shadow-[0_0_40px_rgba(139,92,246,0.45)]
              "
            >

              CONTINUAR

            </motion.button>

          </motion.div>

        </div>

      </motion.div>

    </div>
  );
}