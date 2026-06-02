import { motion } from "framer-motion";
import { useEffect } from "react";

import kaelFace from "../../assets/avatar/kael.png";

interface Props {
  onFinish: () => void;
}

export default function KaelPanel({
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
          from-[#020617]
          via-[#050b16]
          to-black
        "
      />

      {/* HALO TECNOLÓGICO */}
      <div
        className="
          absolute

          top-1/2
          left-1/2

          -translate-x-1/2
          -translate-y-1/2

          w-[800px]
          h-[800px]

          rounded-full

          bg-cyan-500/10

          blur-[180px]
        "
      />

      {/* GRID FUTURISTA */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.04]

          bg-[linear-gradient(rgba(0,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.12)_1px,transparent_1px)]

          bg-[size:50px_50px]
        "
      />

      {/* CONTENT */}
<motion.div

  animate={{
    scale: [1, 1.03, 1],
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

  {/* HALO */}
  <div
    className="
      absolute
      inset-0

      rounded-full

      bg-cyan-400/20

      blur-[80px]
    "
  />

  {/* ANILLO EXTERNO */}
  <div
    className="
      absolute
      inset-0

      rounded-full

      border-[3px]
      border-cyan-400/40
    "
  />

  {/* ANILLO GIRATORIO */}
  <motion.div

    animate={{
      rotate: 360,
    }}

    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}

    className="
      absolute
      inset-[-12px]

      rounded-full

      border-2
      border-dashed

      border-cyan-400/30
    "
  />

  {/* FOTO */}
  <div
    className="
      absolute
      inset-[18px]

      rounded-full

      overflow-hidden

      bg-black
    "
  >

    <img
      src={kaelFace}
      alt="KAEL"
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

    </div>

  );

}