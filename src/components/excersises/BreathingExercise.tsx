import { motion } from "framer-motion";

export default function BreathingExercise() {

  return (

    <section
      className="
        rounded-[35px]

        border
        border-white/10

        bg-black/25

        backdrop-blur-2xl

        p-10

        overflow-hidden

        relative
      "
    >

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-br
          from-cyan-500/10
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10

          flex
          flex-col
          items-center
          justify-center

          text-center
        "
      >

        <p
          className="
            text-cyan-400

            uppercase

            tracking-[0.3em]

            text-sm

            mb-8
          "
        >
          RESPIRACIÓN GUIADA
        </p>

        {/* CIRCLE */}
        <motion.div

          animate={{
            scale: [1, 1.15, 1],
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
          }}

          className="
            w-[220px]
            h-[220px]

            rounded-full

            bg-gradient-to-br
            from-cyan-400
            to-blue-500

            shadow-[0_0_80px_rgba(34,211,238,0.6)]

            flex
            items-center
            justify-center

            mb-10
          "
        >

          <span
            className="
              text-3xl
              font-black
            "
          >
            Inhala
          </span>

        </motion.div>

        <h2
          className="
            text-3xl
            font-black

            mb-4
          "
        >
          Relaja tu mente
        </h2>

        <p
          className="
            text-white/60

            max-w-[650px]
          "
        >
          Sigue el ritmo de respiración inteligente
          generado por EMORIA para reducir el estrés.
        </p>

      </div>

    </section>

  );

}