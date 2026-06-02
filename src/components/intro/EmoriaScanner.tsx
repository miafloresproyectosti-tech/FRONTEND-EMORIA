import { motion } from "framer-motion";
import {
  Camera,
  ScanFace,
  BrainCircuit,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  onFinish: () => void;
}

export default function EmoriaScanner({
  onFinish,
}: Props) {

  /* =========================================================
     STATES
  ========================================================= */

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [progress, setProgress] =
    useState(0);

  const [status, setStatus] =
    useState(
      "Inicializando sistema EMORIA..."
    );

  /* =========================================================
     CAMERA
  ========================================================= */

  useEffect(() => {

    const startCamera = async () => {

      try {

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
          });

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;
        }

      } catch (error) {

        console.error(error);

      }

    };

    startCamera();

  }, []);

  /* =========================================================
     SCANNER FLOW
  ========================================================= */

  useEffect(() => {

    const phases = [

      {
        value: 15,
        text:
          "Activando reconocimiento facial...",
      },

      {
        value: 30,
        text:
          "Detectando microexpresiones...",
      },

      {
        value: 50,
        text:
          "Analizando estado emocional...",
      },

      {
        value: 72,
        text:
          "Conectando con EMORIA CORE...",
      },

      {
        value: 88,
        text:
          "Sincronizando perfil cognitivo...",
      },

      {
        value: 100,
        text:
          "Análisis completado.",
      },

    ];

    let current = 0;

    const interval = setInterval(() => {

      if (current < phases.length) {

        setProgress(
          phases[current].value
        );

        setStatus(
          phases[current].text
        );

        current++;

      } else {

        clearInterval(interval);

        setTimeout(() => {

          onFinish();

        }, 1800);

      }

    }, 1800);

    return () => clearInterval(interval);

  }, [onFinish]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div
      className="
        fixed
        inset-0
        z-[300]

        bg-black

        flex
        items-center
        justify-center

        overflow-hidden
      "
    >

      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_70%)]

          animate-pulse
        "
      />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.06]

          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]

          bg-[size:40px_40px]
        "
      />

      {/* MAIN */}
      <div
        className="
          relative
          z-20

          w-full
          max-w-[1200px]

          px-4

          flex
          flex-col
          items-center
        "
      >

        {/* TITLE */}
        <motion.div

          initial={{
            opacity: 0,
            y: -30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="
            mb-8
            text-center
          "
        >

          <h1
            className="
              text-white

              text-[32px]
              md:text-[56px]

              font-black

              tracking-[6px]
            "
          >

            EMORIA SCAN

          </h1>

          <p
            className="
              text-violet-300/70

              mt-2

              text-sm
              md:text-lg

              tracking-[3px]
            "
          >

            Emotional Intelligence System

          </p>

        </motion.div>

        {/* CAMERA CONTAINER */}
        <motion.div

          initial={{
            opacity: 0,
            scale: 0.9,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            duration: 1,
          }}

          className="
            relative

            w-full
            max-w-[760px]

            aspect-video

            rounded-[34px]

            overflow-hidden

            border
            border-violet-400/30

            bg-black

            shadow-[0_0_80px_rgba(139,92,246,0.25)]
          "
        >

          {/* VIDEO */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline

            className="
              absolute
              inset-0

              w-full
              h-full

              object-cover

              scale-x-[-1]
            "
          />

          {/* DARK */}
          <div
            className="
              absolute
              inset-0
              bg-black/20
            "
          />

          {/* SCAN LINE */}
          <motion.div

            animate={{
              y: [
                -20,
                500,
                -20,
              ],
            }}

            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}

            className="
              absolute
              left-0

              w-full
              h-[3px]

              bg-gradient-to-r
              from-transparent
              via-violet-400
              to-transparent

              shadow-[0_0_30px_rgba(139,92,246,0.9)]
            "
          />

          {/* FACE FRAME */}
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center
            "
          >

            <motion.div

              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1],
              }}

              transition={{
                duration: 2,
                repeat: Infinity,
              }}

              className="
                w-[220px]
                h-[320px]

                md:w-[280px]
                md:h-[380px]

                border-2
                border-violet-400

                rounded-[40px]

                shadow-[0_0_40px_rgba(139,92,246,0.6)]
              "
            />

          </div>

          {/* HUD */}
          <div
            className="
              absolute
              top-5
              left-5

              flex
              gap-3
            "
          >

            <div
              className="
                p-3

                rounded-2xl

                bg-black/50
                backdrop-blur-xl

                border
                border-white/10
              "
            >

              <Camera
                className="
                  text-violet-300
                "
              />

            </div>

            <div
              className="
                p-3

                rounded-2xl

                bg-black/50
                backdrop-blur-xl

                border
                border-white/10
              "
            >

              <ScanFace
                className="
                  text-cyan-300
                "
              />

            </div>

            <div
              className="
                p-3

                rounded-2xl

                bg-black/50
                backdrop-blur-xl

                border
                border-white/10
              "
            >

              <BrainCircuit
                className="
                  text-pink-300
                "
              />

            </div>

          </div>

        </motion.div>

        {/* STATUS */}
        <motion.div

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="
            w-full
            max-w-[760px]

            mt-8
          "
        >

          {/* STATUS CARD */}
          <div
            className="
              p-6

              rounded-[28px]

              bg-white/5

              backdrop-blur-3xl

              border
              border-white/10
            "
          >

            {/* TOP */}
            <div
              className="
                flex
                items-center
                justify-between

                mb-4
              "
            >

              <h2
                className="
                  text-white

                  text-lg
                  md:text-2xl

                  font-semibold
                "
              >

                {status}

              </h2>

              <span
                className="
                  text-violet-300

                  text-2xl
                  md:text-4xl

                  font-black
                "
              >

                {progress}%

              </span>

            </div>

            {/* PROGRESS */}
            <div
              className="
                w-full
                h-[16px]

                rounded-full

                bg-white/10

                overflow-hidden
              "
            >

              <motion.div

                animate={{
                  width: `${progress}%`,
                }}

                transition={{
                  duration: 1,
                }}

                className="
                  h-full

                  rounded-full

                  bg-gradient-to-r
                  from-violet-500
                  via-fuchsia-400
                  to-cyan-400

                  shadow-[0_0_30px_rgba(139,92,246,0.7)]
                "
              />

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}