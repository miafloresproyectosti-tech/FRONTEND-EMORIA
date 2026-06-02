import { motion } from "framer-motion";
import { useEffect } from "react";

import amarisFace from "../../assets/avatar/amaris.png";

interface Props {
  onFinish: () => void;
}

export default function AmarisPanel({
  onFinish,
}: Props) {

  useEffect(() => {

    const timer = setTimeout(() => {

      onFinish();

    }, 4000);

    return () => clearTimeout(timer);

  }, [onFinish]);

  return (

    <div
      className="
        fixed
        inset-0
        z-[600]

        overflow-hidden

        bg-black

        flex
        items-center
        justify-center

        px-4
      "
    >

      {/* BACKGROUND */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-[#040404]
          via-[#08080f]
          to-black
        "
      />

      {/* HALO CENTRAL */}
      <div
        className="
          absolute

          top-1/2
          left-1/2

          -translate-x-1/2
          -translate-y-1/2

          w-[700px]
          h-[700px]

          rounded-full

          bg-pink-500/10

          blur-[180px]
        "
      />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.03]

          bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]

          bg-[size:50px_50px]
        "
      />

      {/* CONTENT */}
      <motion.div

        initial={{
          opacity: 0,
          scale: 0.92,
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
          z-10

          flex
          flex-col
          items-center

          text-center
        "
      >

<motion.div

  animate={{
    scale: [1, 1.02, 1],
  }}

  transition={{
    duration: 4,
    repeat: Infinity,
  }}

  className="
    relative

    w-[320px]
    h-[320px]

    sm:w-[450px]
    sm:h-[450px]

    md:w-[580px]
    md:h-[580px]

    lg:w-[700px]
    lg:h-[700px]

      xl:w-[820px]
      xl:h-[820px]
  "
>

  {/* HALO ROSA */}
  <div
    className="
      absolute
      inset-0

      rounded-full

      bg-pink-400/20

      blur-[80px]
    "
  />

  {/* BORDE */}
  <div
    className="
      absolute
      inset-0

      rounded-full

      border-[3px]

      border-pink-300/40
    "
  />

  {/* CÍRCULO BRILLANTE */}
  <div
    className="
      absolute
      inset-[10px]

      rounded-full

      border

      border-pink-200/30
    "
  />

  {/* FOTO */}
<div
  className="
    absolute
    inset-[12px]

    rounded-full

    overflow-hidden
  "
>

    <img
      src={amarisFace}
      alt="AMARIS"
      className="
        w-full
        h-full

        object-cover

        scale- [1.45]
        object-top
      "
    />

  </div>

</motion.div>

        {/* NAME */}
        <h1
          className="
            text-white

            text-5xl
            sm:text-6xl
            md:text-8xl

            font-black

            tracking-[10px]

            drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]
          "
        >
          AMARIS
        </h1>

        {/* SUBTITLE */}
        <div
          className="
            mt-3

            px-5
            py-2

            rounded-full

            border
            border-pink-500/20

            bg-pink-500/10

            text-pink-300

            text-xs
            sm:text-sm

            uppercase
            tracking-[3px]
          "
        >
          Emotional AI Companion
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            mt-8

            text-white/70

            text-base
            sm:text-lg
            md:text-2xl

            leading-relaxed

            max-w-[850px]
          "
        >
          Tu compañera emocional impulsada por inteligencia artificial.
          Comprende tus emociones, te escucha y te acompaña en cada etapa
          de tu bienestar personal.
        </p>

      </motion.div>

    </div>

  );

}