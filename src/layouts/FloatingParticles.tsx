import { motion } from "framer-motion";

/* =========================================================
   PARTICLES
========================================================= */

const particles = Array.from(
  { length: 28 },
  (_, i) => ({
    id: i,

    size:
      Math.random() * 10 + 3,

    left:
      Math.random() * 100,

    top:
      Math.random() * 100,

    duration:
      Math.random() * 18 + 10,

    delay:
      Math.random() * 5,

    opacity:
      Math.random() * 0.4 + 0.1,
  })
);

/* =========================================================
   COMPONENT
========================================================= */

export default function FloatingParticles() {

  return (

    <div
      className="
        absolute
        inset-0
        overflow-hidden
        z-0
        pointer-events-none
      "
    >

      {particles.map((particle) => (

        <motion.div
          key={particle.id}

          className="
            absolute
            rounded-full

            bg-[var(--theme-particle)]

            backdrop-blur-md
          "

          style={{
            width: particle.size,
            height: particle.size,

            left: `${particle.left}%`,
            top: `${particle.top}%`,

            opacity: particle.opacity,

            filter: "blur(1px)",
          }}

          animate={{

            y: [0, -60, 0],

            x: [0, 25, -10, 0],

            opacity: [
              particle.opacity,
              particle.opacity + 0.2,
              particle.opacity,
            ],

            scale: [1, 1.4, 1],

          }}

          transition={{
            duration: particle.duration,

            repeat: Infinity,

            delay: particle.delay,

            ease: "easeInOut",
          }}
        />

      ))}

      {/* =========================================================
          BIG GLOW PARTICLES
      ========================================================= */}

      <motion.div
        className="
          absolute

          top-[10%]
          right-[15%]

          w-[180px]
          h-[180px]

          rounded-full

          blur-[90px]
        "
        style={{ backgroundColor: "var(--theme-glow)" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="
          absolute

          bottom-[10%]
          left-[10%]

          w-[220px]
          h-[220px]

          rounded-full

          blur-[110px]
        "
        style={{ backgroundColor: "var(--theme-secondary)", opacity: 0.12 }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />

    </div>

  );
}
