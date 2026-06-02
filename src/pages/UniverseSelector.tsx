import { useState } from "react";
import { motion } from "framer-motion";
import type { ThemeKey } from "../types/theme";
import { themes } from "../themes/themeEngine";
import type { AvatarOption } from "../themes/avatarCatalog";
import { getAvatarsForUniverse } from "../themes/avatarCatalog";
import type { UserGender } from "../types/avatar";

/* ================= TYPES ================= */

interface Universe {
  id: ThemeKey;
  title: string;
  image: string;
}

interface Category {
  category: string;
  universes: Universe[];
}

interface Props {
  gender: UserGender;
  onSelect: (universe: ThemeKey, avatar: AvatarOption | null) => void;
}

/* ================= DATA ================= */

const categories: Category[] = [
  {
    category: "Anime",
    universes: [
      {
        id: "naruto",
        title: "Naruto",
        image: themes.naruto.background,
      },
      {
        id: "dbz",
        title: "Dragon Ball Z",
        image: themes.dbz.background,
      },
      {
        id: "jjk",
        title: "Jujutsu Kaisen",
        image: themes.jjk.background,
      },
      {
        id: "kny",
        title: "Demon Slayer",
        image: themes.kny.background,
      },
    ],
  },

  {
    category: "Animación",
    universes: [
      {
        id: "disney",
        title: "Disney",
        image: themes.disney.background,
      },
      {
        id: "pixar",
        title: "Pixar",
        image: themes.pixar.background,
      },
      {
        id: "simpsons",
        title: "The Simpsons",
        image: themes.simpsons.background,
      },
      {
        id: "rickandmorty",
        title: "Rick & Morty",
        image: themes.rickandmorty.background,
      },
    ],
  },

  {
    category: "Marvel",
    universes: [
      {
        id: "batman",
        title: "Batman",
        image: themes.batman.background,
      },
      {
        id: "ironman",
        title: "Iron Man",
        image: themes.ironman.background,
      },
      {
        id: "spiderman",
        title: "Spider-Man",
        image: themes.spiderman.background,
      },
      {
        id: "thor",
        title: "Thor",
        image: themes.thor.background,
      },
    ],
  },
  {
    category: "Terror",
    universes: [
      {
        id: "chucky",
        title: "Chucky",
        image: themes.chucky.background,
      },
            {
        id: "demonio",
        title: "El Demonio",
        image: themes.demonio.background,
      },
      {
        id: "conjuro",
        title: "El Conjuro",
        image: themes.conjuro.background,
      },
    ],
  },
];

/* ================= COMPONENT ================= */

const genderLabel: Record<UserGender, string> = {
  female: "femeninos",
  male: "masculinos",
};

export default function UniverseSelector({ gender, onSelect }: Props) {
  const [pendingUniverse, setPendingUniverse] = useState<Universe | null>(null);
  const pendingTheme = pendingUniverse ? themes[pendingUniverse.id] : null;
  const avatars = pendingUniverse ? getAvatarsForUniverse(pendingUniverse.id, gender) : [];

  if (pendingUniverse && pendingTheme) {
    return (
      <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/85 backdrop-blur-3xl px-6 py-14">
        <div className="max-w-[1300px] mx-auto">
          <button
            onClick={() => setPendingUniverse(null)}
            className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-white/70 hover:text-white hover:bg-white/[0.08] transition"
            type="button"
          >
            Volver a universos
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-8 items-start">
            <section
              className="min-h-[460px] rounded-[30px] border border-white/10 bg-cover bg-center overflow-hidden shadow-2xl"
              style={{
                backgroundImage: `url(${pendingUniverse.image})`,
                borderColor: pendingTheme.border,
                boxShadow: pendingTheme.shadow,
              }}
            >
              <div className="min-h-[460px] bg-gradient-to-t from-black via-black/35 to-transparent p-7 flex flex-col justify-end">
                <p className="uppercase tracking-[0.26em] text-sm font-bold text-white/55">
                  Universo elegido
                </p>
                <h1 className="mt-3 text-5xl font-black text-white">{pendingUniverse.title}</h1>
                <p className="mt-4 text-white/65">
                  Elige uno de los personajes {genderLabel[gender]} disponibles.
                </p>
              </div>
            </section>

            <section>
              <div className="mb-6">
                <p className="uppercase tracking-[0.3em] text-sm font-bold text-[var(--theme-primary)]">
                  Avatar del usuario
                </p>
                <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white">
                  Lista de personajes
                </h2>
              </div>

              {avatars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {avatars.map((avatar) => (
                    <motion.button
                      key={avatar.id}
                      whileHover={{ y: -4, scale: 1.02 }}
                      onClick={() => onSelect(pendingUniverse.id, avatar)}
                      className="group min-h-[260px] rounded-[26px] border border-white/10 bg-white/[0.04] p-4 text-left shadow-2xl transition hover:bg-white/[0.08]"
                      style={{
                        borderColor: pendingTheme.border,
                      }}
                      type="button"
                    >
                      <img
                        src={avatar.image}
                        alt={avatar.name}
                        className="h-44 w-full rounded-[22px] object-cover object-top shadow-[0_0_28px_var(--theme-glow)]"
                      />
                      <p className="mt-4 text-2xl font-black text-white">{avatar.name}</p>
                      <p className="mt-1 text-white/55 group-hover:text-white/75 transition">
                        Seleccionar avatar
                      </p>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 text-white/70">
                  <p className="text-2xl font-black text-white">No hay personajes disponibles</p>
                  <p className="mt-2">
                    Este universo todavia no tiene avatares {genderLabel[gender]} en assets.
                  </p>
                  <button
                    onClick={() => onSelect(pendingUniverse.id, null)}
                    className="mt-5 rounded-2xl bg-[image:var(--theme-button)] px-5 py-3 font-bold text-white"
                    type="button"
                  >
                    Continuar sin avatar
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/85 backdrop-blur-3xl px-6 py-14">

      {/* HEADER */}
      <div className="text-center mb-16">
        <p className="uppercase tracking-[0.35em] text-[var(--theme-primary)] text-sm font-bold mb-5">
          EMORIA AI
        </p>

        <h1 className="text-5xl lg:text-7xl font-black text-white">
          Elige tu universo
        </h1>

        <p className="text-white/50 mt-6 text-lg">
          Personaliza completamente tu experiencia emocional.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-[1700px] mx-auto space-y-20">

        {categories.map((section) => (
          <div key={section.category}>

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-4xl font-black text-white mb-2">
                {section.category}
              </h2>

              <div className="w-28 h-[4px] rounded-full bg-[image:var(--theme-gradient)]" />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">

              {section.universes.map((universe) => {
                const theme = themes[universe.id];

                return (
                <motion.div
                  key={universe.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setPendingUniverse(universe)}
                  className="relative h-[360px] rounded-[35px] overflow-hidden cursor-pointer border border-white/10 shadow-2xl group"
                  style={{
                    borderColor: theme.border,
                    boxShadow: theme.shadow,
                  }}
                >

                  {/* IMAGE */}
                  <img
                    src={universe.image}
                    alt={universe.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 20%, ${theme.glow}, transparent 58%)`,
                    }}
                  />

                  {/* TEXT */}
                  <div className="absolute bottom-0 left-0 p-7 z-10">
                    <h2 className="text-3xl font-black text-white mb-2">
                      {universe.title}
                    </h2>

                    <p className="text-white/60 group-hover:text-white transition">
                      Seleccionar universo
                    </p>
                  </div>

                </motion.div>
                );
              })}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
