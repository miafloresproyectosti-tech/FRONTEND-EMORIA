import narutoBg from "../assets/backgrounds/anime/naruto.jpg";
import jjkBg from "../assets/backgrounds/anime/jujutsu.jpg";
import demonBg from "../assets/backgrounds/anime/demonslayer.jpg";
import dragonBg from "../assets/backgrounds/anime/dragonball.jpg";

import batmanBg from "../assets/backgrounds/marvel/batman.jpg";
import ironmanBg from "../assets/backgrounds/marvel/ironman.jpg";
import spidermanBg from "../assets/backgrounds/marvel/spiderman.jpg";

import scifiBg from "../assets/backgrounds/scifi/bladerunner.jpg";

import horrorBg from "../assets/backgrounds/terror/conjuro.jpg";

/* =========================================================
   THEMES
========================================================= */

export const backgroundThemes = {

  /* =========================================================
     ANIME
  ========================================================= */

  Naruto: {
    background: narutoBg,

    overlay:
      "from-orange-950/70 via-black/50 to-orange-500/20",

    primary:
      "from-orange-500 to-red-500",

    glow:
      "shadow-orange-500/20",

    card:
      "bg-black/30 backdrop-blur-2xl border border-orange-400/10",

    text:
      "text-orange-50",
  },

  "Jujutsu Kaisen": {
    background: jjkBg,

    overlay:
      "from-[#14001f]/80 via-black/60 to-[#5b21b6]/20",

    primary:
      "from-purple-500 to-pink-500",

    glow:
      "shadow-purple-500/20",

    card:
      "bg-black/35 backdrop-blur-2xl border border-purple-400/10",

    text:
      "text-purple-50",
  },

  "Demon Slayer": {
    background: demonBg,

    overlay:
      "from-red-950/80 via-black/60 to-orange-500/20",

    primary:
      "from-red-500 to-orange-500",

    glow:
      "shadow-red-500/20",

    card:
      "bg-black/35 backdrop-blur-2xl border border-red-400/10",

    text:
      "text-red-50",
  },

  "Dragon Ball": {
    background: dragonBg,

    overlay:
      "from-orange-950/70 via-blue-950/60 to-yellow-500/20",

    primary:
      "from-yellow-400 to-orange-500",

    glow:
      "shadow-yellow-500/20",

    card:
      "bg-black/30 backdrop-blur-2xl border border-yellow-400/10",

    text:
      "text-yellow-50",
  },

  /* =========================================================
     MARVEL
  ========================================================= */

  Batman: {
    background: batmanBg,

    overlay:
      "from-black/85 via-zinc-950/70 to-yellow-500/10",

    primary:
      "from-yellow-400 to-orange-500",

    glow:
      "shadow-yellow-500/20",

    card:
      "bg-black/40 backdrop-blur-2xl border border-yellow-400/10",

    text:
      "text-yellow-50",
  },

  Ironman: {
    background: ironmanBg,

    overlay:
      "from-red-950/80 via-black/60 to-yellow-500/20",

    primary:
      "from-red-500 to-yellow-400",

    glow:
      "shadow-red-500/20",

    card:
      "bg-black/35 backdrop-blur-2xl border border-red-400/10",

    text:
      "text-red-50",
  },

  Spiderman: {
    background: spidermanBg,

    overlay:
      "from-red-900/80 via-blue-950/60 to-black/50",

    primary:
      "from-red-500 to-blue-500",

    glow:
      "shadow-red-500/20",

    card:
      "bg-black/35 backdrop-blur-2xl border border-red-400/10",

    text:
      "text-red-50",
  },

  /* =========================================================
     SCI-FI
  ========================================================= */

  SciFi: {
    background: scifiBg,

    overlay:
      "from-cyan-950/80 via-black/60 to-blue-900/30",

    primary:
      "from-cyan-400 to-blue-500",

    glow:
      "shadow-cyan-500/20",

    card:
      "bg-black/35 backdrop-blur-2xl border border-cyan-400/10",

    text:
      "text-cyan-50",
  },

  /* =========================================================
     HORROR
  ========================================================= */

  Horror: {
    background: horrorBg,

    overlay:
      "from-black/90 via-red-950/70 to-black/60",

    primary:
      "from-red-700 to-red-500",

    glow:
      "shadow-red-900/30",

    card:
      "bg-black/50 backdrop-blur-2xl border border-red-700/10",

    text:
      "text-zinc-100",
  },

};

/* =========================================================
   DEFAULT THEME
========================================================= */

export const defaultTheme =
  backgroundThemes.Naruto;