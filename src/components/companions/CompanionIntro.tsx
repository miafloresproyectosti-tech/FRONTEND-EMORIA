import { motion } from "framer-motion";
import {
  useEffect,
  useState,
} from "react";

import emoriaFace from
"../../assets/backgrounds/emoria/Emoria.png";

interface Props {
  onContinue: () => void;
}

export default function CompanionIntro({
  onContinue,
}: Props) {

  /* =========================================================
     TEXT
  ========================================================= */

  const fullText =
`
He completado tu análisis emocional.

Ahora necesito saber
quién será tu acompañante principal
durante esta experiencia.

Puedes elegir entre
AMARIS o KAEL.
`;

  const [displayedText, setDisplayedText] =
    useState("");

  /* =========================================================
     TYPEWRITER
  ========================================================= */

  useEffect(() => {

    let index = 0;

    const interval = setInterval(() => {

      setDisplayedText(
        fullText.slice(0, index)
      );

      index++;

      if (index > fullText.length) {

        clearInterval(interval);

      }

    }, 28);

    return () => clearInterval(interval);

  }, []);

  /* =========================================================
     AUTO CONTINUE
  ========================================================= */

  useEffect(() => {

    const timer = setTimeout(() => {

      onContinue();

    }, 9000);

    return () => clearTimeout(timer);

  }, [onContinue]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <motion.div

      initial={{ opacity: 0 }}

      animate={{ opacity: 1 }}

      exit={{ opacity: 0 }}

      className="
        fixed
        inset-0
        z-[450]

        overflow-hidden

        bg-black

        flex
        items-end
        justify-center
      "
    >

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <motion.img

        initial={{
          scale: 1.04,
          opacity: 0,
        }}

        animate={{
          scale: 1,
          opacity: 1,
        }}

        transition={{
          duration: 2,
        }}

        src={emoriaFace}

        alt="EMORIA"

        className="
          absolute
          inset-0

          w-full
          h-full

          object-cover
          object-center
        "
      />

      {/* DARK */}
      <div
        className="
          absolute
          inset-0

          bg-black/50
        "
      />

      {/* PURPLE LIGHT */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)]
        "
      />

      {/* SCAN LINE */}
      <motion.div

        animate={{
          opacity: [0.2, 0.9, 0.2],
        }}

        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}

        className="
          absolute
          top-[38%]
          left-0

          w-full
          h-[2px]

          bg-gradient-to-r
          from-transparent
          via-violet-400
          to-transparent
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-20

          w-full

          px-4
          md:px-10

          pb-10
          md:pb-16

          flex
          justify-center
        "
      >

        {/* PANEL */}
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
            delay: 0.5,
            duration: 1,
          }}

          className="
            relative

            w-full
            max-w-[950px]

            rounded-[30px]

            border
            border-violet-400/30

            bg-[#060312]/78

            backdrop-blur-3xl

            shadow-[0_0_60px_rgba(139,92,246,0.3)]

            px-6
            md:px-12

            py-8
            md:py-10
          "
        >

          {/* INNER LIGHT */}
          <div
            className="
              absolute
              inset-0

              rounded-[30px]

              bg-[linear-gradient(135deg,rgba(139,92,246,0.06),transparent)]
            "
          />

          {/* TEXT */}
          <div
            className="
              relative
              z-10
            "
          >

            <p
              className="
                whitespace-pre-line

                text-white/95

                text-[20px]
                sm:text-[24px]
                md:text-[34px]

                leading-relaxed

                font-light
              "
            >

              {displayedText}

              <motion.span

                animate={{
                  opacity: [0, 1, 0],
                }}

                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}

                className="
                  inline-block
                  ml-1

                  text-violet-400
                "
              >

                |

              </motion.span>

            </p>

          </div>

        </motion.div>

      </div>

    </motion.div>

  );

}