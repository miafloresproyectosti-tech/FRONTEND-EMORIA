import { useState } from "react";

import {
  Wind,
  BookHeart,
  Music4,
  ArrowRight,
  Brain,
  type LucideIcon,
} from "lucide-react";

import BreathingPage from "../pages/BreathingPage";
import JournalPage from "../pages/JournalPage";
import MusicTherapyPage from "../pages/MusicTherapyPage";
import ReflectionPage from "../pages/ReflectionPage";

/* ================= TYPES ================= */

interface Props {
  companion?: "amaris" | "kael"; //  Ahora TypeScript sabe exactamente qué valores se permiten
  onNavigateToNearby?: () => void;
}

type ExerciseId = "breathing" | "journal" | "music" | "reflection";

interface Exercise {
  id: ExerciseId;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

/* ================= COMPONENT ================= */

export default function ExercisesPage({
  companion = "amaris",
  onNavigateToNearby,
}: Props) {
  /* =========================================
     ACTIVE PAGE
  ========================================= */

  const [activePage, setActivePage] = useState<ExerciseId | null>(null);

  /* =========================================
     EXERCISES
  ========================================= */

  const exercises: Exercise[] = [
    {
      id: "breathing",
      title: "Respiración IA",
      description:
        "Reduce ansiedad y estabiliza tus emociones con respiración guiada.",
      icon: Wind,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      id: "journal",
      title: "Diario emocional",
      description:
        "Escribe cómo te sientes y deja que EMORIA te acompañe.",
      icon: BookHeart,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "music",
      title: "Music Therapy",
      description:
        "Escucha sonidos y música adaptados a tu estado emocional.",
      icon: Music4,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      id: "reflection",
      title: "Auto-Reconocimiento",
      description:
        "Reconoce tus emociones y completa tu autoreporte DASS-21.",
      icon: Brain,
      gradient: "from-emerald-500 to-green-600",
    },
  ];

  /* =========================================
     FULLSCREEN ROUTER
  ========================================= */

if (activePage === "breathing") {
  return (
    <BreathingPage
      companion={companion}
      onBack={() => setActivePage(null)}
    />
  );
}

  if (activePage === "journal") {
    return (
      <JournalPage
        companion={companion}
        onBack={() => setActivePage(null)}
      />
    );
  }

  if (activePage === "music") {
    return (
      <MusicTherapyPage
        companion={companion}
        onBack={() => setActivePage(null)}
      />
    );
  }

  if (activePage === "reflection") {
    return (
      <ReflectionPage
        companion={companion}
        onBack={() => setActivePage(null)}
        onNavigateToNearby={onNavigateToNearby}
      />
    );
  }


  /* =========================================
    MAIN PAGE
  ========================================= */

  return (
    <div className="w-full min-h-screen text-white pb-8">

      {/* HEADER */}
      <div className="mb-8 sm:mb-12">
        <p className="text-white/50 mb-3">
          Emotional Wellness System
        </p>

        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-4 sm:mb-5">
          Ejercicios{" "}
          <span className="bg-[image:var(--theme-gradient)] bg-clip-text text-transparent">
            EMORIA
          </span>
        </h1>

        <p className="text-white/60 text-base sm:text-lg max-w-[850px]">
          Explora herramientas inteligentes diseñadas para ayudarte a mejorar tu bienestar emocional.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">

        {exercises.map((exercise) => {
          const Icon = exercise.icon;

          return (
            <div
              key={exercise.id}
              className="group relative overflow-hidden rounded-[24px] sm:rounded-[35px] border border-[var(--theme-border)] bg-[var(--theme-card)] backdrop-blur-2xl p-5 sm:p-8 shadow-2xl transition-all hover:translate-y-[-8px] hover:bg-[var(--theme-hover)]"
            >
              {/* GLOW */}
              <div
                className="absolute top-[-60px] right-[-60px] w-[180px] h-[180px] rounded-full bg-[var(--theme-glow)] opacity-60 blur-[90px]"
              />

              {/* ICON */}
              <div
                className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-[image:var(--theme-button)] flex items-center justify-center mb-5 sm:mb-8 shadow-[0_0_28px_var(--theme-glow)]"
              >
                <Icon size={30} className="text-white" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">
                  {exercise.title}
                </h2>

                <p className="text-white/60 leading-relaxed mb-6 sm:mb-8">
                  {exercise.description}
                </p>

                <button
                  onClick={() => setActivePage(exercise.id)}
                  className="w-full sm:w-auto justify-center px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-[image:var(--theme-button)] flex items-center gap-3 font-bold hover:scale-[1.03] transition-all"
                >
                  Ingresar <ArrowRight size={18} />
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
