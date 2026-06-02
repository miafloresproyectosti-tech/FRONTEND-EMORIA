import { motion } from "framer-motion";

import {
  ArrowRight,
} from "lucide-react";

import {
  useState,
} from "react";

interface Props {
  onFinish: () => void;
}

export default function EmotionalQuestions({
  onFinish,
}: Props) {

  /* =========================================================
     QUESTIONS
  ========================================================= */

  const questions = [

    "¿Cómo te sientes hoy?",

    "¿Qué deseas mejorar emocionalmente?",

    "¿Qué esperas de EMORIA?",

  ];

  /* =========================================================
     STATES
  ========================================================= */

  const [
    currentQuestion,
    setCurrentQuestion,
  ] = useState(0);

  const [
    answers,
    setAnswers,
  ] = useState([
    "",
    "",
    "",
  ]);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (
    value: string
  ) => {

    const updated = [...answers];

    updated[currentQuestion] =
      value;

    setAnswers(updated);

  };

  /* =========================================================
     HANDLE NEXT
  ========================================================= */

  const handleNext = () => {

    if (
      !answers[
        currentQuestion
      ].trim()
    ) return;

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

    }

    else {

      setTimeout(() => {

        onFinish();

      }, 800);

    }

  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div
      className="
        fixed
        inset-0

        z-[400]

        overflow-hidden

        bg-black

        flex
        items-center
        justify-center
      "
    >

      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.22),transparent_70%)]
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

      {/* LIGHT */}
      <motion.div

        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}

        transition={{
          duration: 6,
          repeat: Infinity,
        }}

        className="
          absolute

          w-[700px]
          h-[700px]

          rounded-full

          bg-violet-500/10

          blur-[160px]
        "
      />

      {/* MAIN */}
      <div
        className="
          relative
          z-20

          w-full
          max-w-[1050px]

          px-4
          md:px-8
        "
      >

        <motion.div

          key={currentQuestion}

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
          }}

          className="
            relative

            rounded-[38px]

            border
            border-violet-400/20

            bg-white/5

            backdrop-blur-3xl

            overflow-hidden

            shadow-[0_0_80px_rgba(139,92,246,0.25)]

            p-6
            md:p-12
          "
        >

          {/* INNER LIGHT */}
          <div
            className="
              absolute
              inset-0

              bg-[linear-gradient(135deg,rgba(139,92,246,0.08),transparent)]
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10
            "
          >

            {/* STEP */}
            <div
              className="
                text-violet-300/70

                tracking-[3px]

                uppercase

                text-sm
                md:text-base
              "
            >

              Pregunta {
                currentQuestion + 1
              } de {
                questions.length
              }

            </div>

            {/* QUESTION */}
            <h1
              className="
                mt-6

                text-white

                text-[30px]
                md:text-[58px]

                font-black

                leading-tight
              "
            >

              {
                questions[
                  currentQuestion
                ]
              }

            </h1>

            {/* TEXTAREA */}
            <textarea

              value={
                answers[
                  currentQuestion
                ]
              }

              onChange={(e) =>
                handleChange(
                  e.target.value
                )
              }

              placeholder="
Escribe aquí tu respuesta...
              "

              className="
                mt-10

                w-full

                min-h-[220px]
                md:min-h-[260px]

                rounded-[30px]

                border
                border-violet-400/20

                bg-black/30

                backdrop-blur-2xl

                px-6
                py-6

                text-white

                text-lg
                md:text-2xl

                placeholder:text-white/30

                resize-none

                outline-none

                focus:border-violet-400/60

                transition-all
              "
            />

            {/* BOTTOM */}
            <div
              className="
                mt-10

                flex
                flex-col
                md:flex-row

                items-center
                justify-between

                gap-6
              "
            >

              {/* PROGRESS */}
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                {questions.map((_, index) => (

                  <motion.div

                    key={index}

                    animate={{
                      scale:
                        currentQuestion === index
                          ? [1, 1.15, 1]
                          : 1,
                    }}

                    transition={{
                      duration: 1.5,
                      repeat:
                        currentQuestion === index
                          ? Infinity
                          : 0,
                    }}

                    className={`
                      h-[12px]

                      rounded-full

                      transition-all

                      ${
                        currentQuestion === index

                          ? `
                            w-[52px]
                            bg-violet-400
                          `

                          : `
                            w-[12px]
                            bg-white/20
                          `
                      }
                    `}
                  />

                ))}

              </div>

              {/* BUTTON */}
              <motion.button

                whileHover={{
                  scale: 1.04,
                }}

                whileTap={{
                  scale: 0.96,
                }}

                onClick={handleNext}

                disabled={
                  !answers[
                    currentQuestion
                  ].trim()
                }

                className="
                  relative

                  overflow-hidden

                  px-8
                  md:px-12

                  py-4

                  rounded-[22px]

                  bg-[#14052d]

                  border
                  border-violet-400/40

                  text-white

                  text-sm
                  md:text-lg

                  tracking-[2px]

                  font-semibold

                  shadow-[0_0_40px_rgba(139,92,246,0.4)]

                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >

                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-r
                    from-violet-500/30
                    to-cyan-400/20
                  "
                />

                <span
                  className="
                    relative
                    z-10

                    flex
                    items-center
                    gap-3
                  "
                >

                  CONTINUAR

                  <ArrowRight size={22} />

                </span>

              </motion.button>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

}