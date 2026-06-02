/* ================= BACKGROUNDS ================= */

/* Anime */
import narutoBg from "../assets/backgrounds/anime/naruto.jpg";
import dbzBg from "../assets/backgrounds/anime/dbz.jpg";
import jjkBg from "../assets/backgrounds/anime/jujustsu.jpg";
import knyBg from "../assets/backgrounds/anime/kny.jpg";

/* Animacion */
import disneyBg from "../assets/backgrounds/animacion/disney.jpg";
import pixarBg from "../assets/backgrounds/animacion/pixar.jpg";
import simpsonsBg from "../assets/backgrounds/animacion/simpsons.jpg";
import rickandmortyBg from "../assets/backgrounds/animacion/rickandmorthy.jpg";

/* Marvel / DC */
import batmanBg from "../assets/backgrounds/marvel/batman.jpg";
import ironmanBg from "../assets/backgrounds/marvel/iroman.jpg";
import spidermanBg from "../assets/backgrounds/marvel/spiderman.jpg";
import thorBg from "../assets/backgrounds/marvel/thor.jpg";

/* Terror */
import chuckyBg from "../assets/backgrounds/terror/chucky.jpg";
import conjuroBg from "../assets/backgrounds/terror/conjuro.jpg";
import demonioBg from "../assets/backgrounds/terror/demonio.jpg";

export type ThemeKey = 
  | "naruto"
  | "dbz"
  | "jjk"
  | "kny"
  | "disney"
  | "pixar"
  | "simpsons"
  | "rickandmorty"
  | "batman"
  | "ironman"
  | "spiderman"
  | "thor"
  | "chucky"
  | "demonio"
  | "conjuro";

export interface EmoriaTheme {
  background: string;
  overlay: string;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  highlight: string;
  card: string;
  border: string;
  chart: string;
  button: string;
  gradient: string;
  hover: string;
  shadow: string;
  particle: string;
  text: string;
  muted: string;
  surface: string;
  surfaceStrong: string;
  onPrimary: string;
  danger: string;
  success: string;
  warning: string;
}

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "").trim();
  const full = normalized.length === 3
    ? normalized.split("").map((value) => value + value).join("")
    : normalized;

  const value = Number.parseInt(full, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const rgba = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const buildTheme = (
  theme: Omit<EmoriaTheme, "card" | "border" | "chart" | "button" | "gradient" | "hover" | "shadow" | "particle" | "text" | "muted" | "surface" | "surfaceStrong" | "onPrimary" | "danger" | "success" | "warning"> & Partial<Pick<EmoriaTheme, "highlight" | "card" | "border" | "chart" | "button" | "gradient" | "hover" | "shadow" | "particle" | "text" | "muted" | "surface" | "surfaceStrong" | "onPrimary" | "danger" | "success" | "warning">>
): EmoriaTheme => {
  const card = theme.card ?? rgba(theme.secondary, 0.34);
  const border = theme.border ?? rgba(theme.primary, 0.22);
  const chart = theme.chart ?? theme.primary;
  const button = theme.button ?? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;
  const gradient = theme.gradient ?? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})`;
  const hover = theme.hover ?? rgba(theme.primary, 0.12);
  const shadow = theme.shadow ?? `0 18px 75px ${rgba(theme.primary, 0.18)}`;
  const particle = theme.particle ?? rgba(theme.accent, 0.7);
  const text = theme.text ?? "#f8fafc";
  const muted = theme.muted ?? rgba("#ffffff", 0.64);
  const surface = theme.surface ?? rgba(theme.secondary, 0.16);
  const surfaceStrong = theme.surfaceStrong ?? rgba(theme.secondary, 0.28);
  const onPrimary = theme.onPrimary ?? "#ffffff";

  return {
    ...theme,
    card,
    border,
    chart,
    button,
    gradient,
    hover,
    shadow,
    particle,
    text,
    muted,
    surface,
    surfaceStrong,
    onPrimary,
    danger: theme.danger ?? theme.highlight,
    success: theme.success ?? theme.accent,
    warning: theme.warning ?? theme.primary,
  };
};

export const themes = {
  naruto: buildTheme({
    background: narutoBg,
    overlay:
      "linear-gradient(135deg, rgba(251, 228, 7, 0.22), rgba(15, 15, 15, 0.58) 48%, rgba(242, 163, 11, 0.18))",
    primary: "#fbe407",
    secondary: "#0b0b0b",
    accent: "#ffe182",
    glow: "#f2a30b",
    highlight: "#0c2fdf",
    card: "rgba(9, 9, 12, 0.62)",
    border: "rgba(251, 228, 7, 0.22)",
    chart: "#fbe407",
    button: "linear-gradient(135deg, #fbe407, #f2a30b)",
    gradient: "linear-gradient(135deg, #fbe407, #f2a30b, #ffe182)",
    hover: "rgba(251, 228, 7, 0.14)",
    shadow: "0 18px 80px rgba(242, 163, 11, 0.24)",
    particle: "rgba(255, 225, 130, 0.72)",
    text: "#f8fafc",
    muted: "rgba(248, 250, 252, 0.72)",
    surface: "rgba(11, 11, 11, 0.18)",
    surfaceStrong: "rgba(11, 11, 11, 0.36)",
    onPrimary: "#0b0b0b",
  }),

  dbz: buildTheme({
    background: dbzBg,
    overlay:
      "linear-gradient(135deg, rgba(255, 69, 0, 0.20), rgba(0, 0, 139, 0.34) 52%, rgba(255, 215, 0, 0.16))",
    primary: "#ff4500",
    secondary: "#00008b",
    accent: "#ffd700",
    glow: "#1e90ff",
    highlight: "#7b68ee",
    card: "rgba(4, 8, 26, 0.62)",
    border: "rgba(30, 144, 255, 0.24)",
    chart: "#ffd700",
    button: "linear-gradient(135deg, #ff4500, #1e90ff)",
    gradient: "linear-gradient(135deg, #ff4500, #ffd700, #1e90ff)",
    hover: "rgba(30, 144, 255, 0.14)",
    shadow: "0 18px 80px rgba(30, 144, 255, 0.22)",
    particle: "rgba(255, 215, 0, 0.72)",
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.68)",
    surface: "rgba(0, 0, 139, 0.16)",
    surfaceStrong: "rgba(0, 0, 139, 0.28)",
    onPrimary: "#ffffff",
  }),

  jjk: buildTheme({
    background: jjkBg,
    overlay:
      "linear-gradient(135deg, rgba(140, 53, 69, 0.26), rgba(36, 62, 115, 0.38) 52%, rgba(38, 1, 1, 0.28))",
    primary: "#8c3545",
    secondary: "#243e73",
    accent: "#bf5e3b",
    glow: "#f2c4b3",
    highlight: "#260101",
    card: "rgba(18, 16, 30, 0.68)",
    border: "rgba(242, 196, 179, 0.22)",
    chart: "#f2c4b3",
    button: "linear-gradient(135deg, #8c3545, #243e73)",
    gradient: "linear-gradient(135deg, #8c3545, #bf5e3b, #f2c4b3)",
    hover: "rgba(242, 196, 179, 0.12)",
    shadow: "0 18px 80px rgba(36, 62, 115, 0.22)",
    particle: "rgba(242, 196, 179, 0.72)",
    text: "#f8fafc",
    muted: "rgba(248, 250, 252, 0.68)",
    surface: "rgba(36, 62, 115, 0.16)",
    surfaceStrong: "rgba(36, 62, 115, 0.28)",
    onPrimary: "#ffffff",
  }),

  kny: buildTheme({
    background: knyBg,
    overlay:
      "linear-gradient(135deg, rgba(255, 69, 0, 0.24), rgba(30, 144, 255, 0.30) 48%, rgba(255, 215, 0, 0.14))",
    primary: "#ff4500",
    secondary: "#1e90ff",
    accent: "#ffd700",
    glow: "#ff69b4",
    highlight: "#00a86b",
    card: "rgba(12, 12, 18, 0.64)",
    border: "rgba(255, 215, 0, 0.24)",
    chart: "#ff69b4",
    button: "linear-gradient(135deg, #ff4500, #1e90ff)",
    gradient: "linear-gradient(135deg, #ff4500, #ffd700, #ff69b4)",
    hover: "rgba(255, 215, 0, 0.14)",
    shadow: "0 18px 80px rgba(255, 105, 180, 0.22)",
    particle: "rgba(224, 238, 238, 0.72)",
    text: "#f8fafc",
    muted: "rgba(248, 250, 252, 0.68)",
    surface: "rgba(30, 144, 255, 0.16)",
    surfaceStrong: "rgba(30, 144, 255, 0.28)",
    onPrimary: "#0b0b0b",
  }),

  disney: buildTheme({
    background: disneyBg,
    overlay:
      "linear-gradient(135deg, rgba(56, 189, 248, 0.22), rgba(129, 140, 248, 0.34) 50%, rgba(240, 171, 252, 0.14))",
    primary: "#38bdf8",
    secondary: "#818cf8",
    accent: "#f0abfc",
    glow: "#7dd3fc",
    highlight: "#0f172a",
    card: "rgba(8, 24, 44, 0.56)",
    border: "rgba(125, 211, 252, 0.24)",
    chart: "#7dd3fc",
    button: "linear-gradient(135deg, #38bdf8, #818cf8)",
    gradient: "linear-gradient(135deg, #38bdf8, #818cf8, #f0abfc)",
    hover: "rgba(125, 211, 252, 0.14)",
    shadow: "0 18px 80px rgba(56, 189, 248, 0.2)",
    particle: "rgba(186, 230, 253, 0.74)",
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.66)",
    surface: "rgba(2, 8, 23, 0.18)",
    surfaceStrong: "rgba(2, 8, 23, 0.34)",
    onPrimary: "#0b0b0b",
  }),

  pixar: buildTheme({
    background: pixarBg,
    overlay:
      "linear-gradient(135deg, rgba(34, 197, 94, 0.20), rgba(56, 189, 248, 0.28) 50%, rgba(249, 115, 22, 0.16))",
    primary: "#22c55e",
    secondary: "#38bdf8",
    accent: "#f97316",
    glow: "#4ade80",
    highlight: "#0f172a",
    card: "rgba(7, 30, 38, 0.54)",
    border: "rgba(74, 222, 128, 0.24)",
    chart: "#4ade80",
    button: "linear-gradient(135deg, #22c55e, #38bdf8)",
    gradient: "linear-gradient(135deg, #22c55e, #38bdf8, #f97316)",
    hover: "rgba(74, 222, 128, 0.14)",
    shadow: "0 18px 80px rgba(34, 197, 94, 0.2)",
    particle: "rgba(134, 239, 172, 0.72)",
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.66)",
    surface: "rgba(7, 30, 38, 0.18)",
    surfaceStrong: "rgba(7, 30, 38, 0.34)",
    onPrimary: "#0b0b0b",
  }),

  simpsons: buildTheme({
    background: simpsonsBg,
    overlay:
      "linear-gradient(135deg, rgba(255, 217, 0, 0.22), rgba(46, 107, 230, 0.30) 50%, rgba(241, 66, 39, 0.16))",
    primary: "#ffd900",
    secondary: "#2e6be6",
    accent: "#f14227",
    glow: "#4ea844",
    highlight: "#ed55b8",
    card: "rgba(37, 30, 5, 0.54)",
    border: "rgba(255, 217, 0, 0.24)",
    chart: "#ffd900",
    button: "linear-gradient(135deg, #ffd900, #2e6be6)",
    gradient: "linear-gradient(135deg, #ffd900, #2e6be6, #f14227)",
    hover: "rgba(255, 217, 0, 0.14)",
    shadow: "0 18px 80px rgba(255, 217, 0, 0.18)",
    particle: "rgba(255, 217, 0, 0.74)",
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.66)",
    surface: "rgba(37, 30, 5, 0.18)",
    surfaceStrong: "rgba(37, 30, 5, 0.34)",
    onPrimary: "#0b0b0b",
  }),

  rickandmorty: buildTheme({
    background: rickandmortyBg,
    overlay:
      "linear-gradient(135deg, rgba(132, 204, 22, 0.20), rgba(34, 211, 238, 0.30) 50%, rgba(168, 85, 247, 0.16))",
    primary: "#84cc16",
    secondary: "#22d3ee",
    accent: "#a855f7",
    glow: "#bef264",
    highlight: "#0f172a",
    card: "rgba(8, 31, 20, 0.58)",
    border: "rgba(132, 204, 22, 0.24)",
    chart: "#84cc16",
    button: "linear-gradient(135deg, #84cc16, #22d3ee)",
    gradient: "linear-gradient(135deg, #84cc16, #22d3ee, #a855f7)",
    hover: "rgba(132, 204, 22, 0.14)",
    shadow: "0 18px 80px rgba(132, 204, 22, 0.2)",
    particle: "rgba(190, 242, 100, 0.72)",
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.68)",
    surface: "rgba(8, 31, 20, 0.18)",
    surfaceStrong: "rgba(8, 31, 20, 0.34)",
    onPrimary: "#0b0b0b",
  }),

  batman: buildTheme({
    background: batmanBg,
    overlay:
      "linear-gradient(135deg, rgba(58, 58, 60, 0.28), rgba(0, 0, 0, 0.70) 48%, rgba(28, 28, 28, 0.24))",
    primary: "#3a3a3c",
    secondary: "#4e3629",
    accent: "#0a1128",
    glow: "#c2b280",
    highlight: "#1c1c1c",
    danger: "#7a1c1c",
    card: "rgba(2, 6, 23, 0.72)",
    border: "rgba(194, 178, 128, 0.22)",
    chart: "#c2b280",
    button: "linear-gradient(135deg, #3a3a3c, #0a1128)",
    gradient: "linear-gradient(135deg, #3a3a3c, #c2b280, #0a1128)",
    hover: "rgba(194, 178, 128, 0.12)",
    shadow: "0 18px 80px rgba(0, 0, 0, 0.36)",
    particle: "rgba(194, 178, 128, 0.64)",
    text: "#f8fafc",
    muted: "rgba(248, 250, 252, 0.68)",
    surface: "rgba(10, 17, 40, 0.16)",
    surfaceStrong: "rgba(10, 17, 40, 0.32)",
    onPrimary: "#ffffff",
  }),

  ironman: buildTheme({
    background: ironmanBg,
    overlay:
      "linear-gradient(135deg, rgba(228, 54, 54, 0.28), rgba(0, 0, 0, 0.64) 50%, rgba(80, 74, 74, 0.20))",
    primary: "#e23636",
    secondary: "#000000",
    accent: "#504a4a",
    glow: "#518cca",
    highlight: "#f78f3f",
    card: "rgba(35, 8, 8, 0.62)",
    border: "rgba(81, 140, 202, 0.24)",
    chart: "#f78f3f",
    button: "linear-gradient(135deg, #e23636, #f78f3f)",
    gradient: "linear-gradient(135deg, #e23636, #518cca, #f78f3f)",
    hover: "rgba(81, 140, 202, 0.14)",
    shadow: "0 18px 80px rgba(81, 140, 202, 0.22)",
    particle: "rgba(247, 143, 63, 0.7)",
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.68)",
    surface: "rgba(0, 0, 0, 0.18)",
    surfaceStrong: "rgba(0, 0, 0, 0.34)",
    onPrimary: "#ffffff",
  }),

spiderman: buildTheme({
  background: spidermanBg,
  overlay:
    "linear-gradient(135deg, rgba(180,0,0,0.28), rgba(10,35,120,0.42) 50%, rgba(0,0,0,0.20))",

  primary: "#d62828",
  secondary: "#003049",
  accent: "#fcbf49",
  glow: "#5dade2",
  highlight: "#ffffff",

  card: "rgba(8,15,35,0.68)",
  border: "rgba(93,173,226,0.22)",

  chart: "#5dade2",

  button:
    "linear-gradient(135deg,#d62828,#003049)",

  gradient:
    "linear-gradient(135deg,#d62828,#003049,#5dade2)",

  hover:
    "rgba(93,173,226,0.12)",

  shadow:
    "0 18px 80px rgba(0,48,73,0.30)",

  particle:
    "rgba(93,173,226,0.70)",

  text: "#ffffff",
  muted: "rgba(255,255,255,0.70)",
  surface: "rgba(0,48,73,0.18)",
  surfaceStrong: "rgba(0,48,73,0.32)",
  onPrimary: "#ffffff",
}),

  thor: buildTheme({
    background: thorBg,
    overlay:
      "linear-gradient(135deg, rgba(226, 54, 54, 0.18), rgba(0, 0, 0, 0.56) 48%, rgba(81, 140, 202, 0.22))",
    primary: "#e23636",
    secondary: "#000000",
    accent: "#504a4a",
    glow: "#518cca",
    highlight: "#f78f3f",
    card: "rgba(7, 20, 38, 0.62)",
    border: "rgba(81, 140, 202, 0.28)",
    chart: "#518cca",
    button: "linear-gradient(135deg, #e23636, #518cca)",
    gradient: "linear-gradient(135deg, #e23636, #518cca, #f78f3f)",
    hover: "rgba(81, 140, 202, 0.14)",
    shadow: "0 18px 80px rgba(81, 140, 202, 0.22)",
    particle: "rgba(247, 143, 63, 0.7)",
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.68)",
    surface: "rgba(0, 0, 0, 0.18)",
    surfaceStrong: "rgba(0, 0, 0, 0.34)",
    onPrimary: "#ffffff",
  }),
  chucky: buildTheme({
    background: chuckyBg,
    overlay:
      "linear-gradient(135deg, rgba(0, 93, 164, 0.20), rgba(190, 17, 38, 0.34) 48%, rgba(255, 204, 0, 0.12))",
    primary: "#005da4",
    secondary: "#ce1126",
    accent: "#ffcc00",
    glow: "#00a859",
    highlight: "#ffffff",
    danger: "#b81d24",
    card: "rgba(9, 5, 8, 0.74)",
    border: "rgba(255, 204, 0, 0.24)",
    chart: "#ffcc00",
    button: "linear-gradient(135deg, #005da4, #ce1126)",
    gradient: "linear-gradient(135deg, #005da4, #ffcc00, #ce1126)",
    hover: "rgba(255, 204, 0, 0.14)",
    shadow: "0 18px 80px rgba(184, 29, 36, 0.22)",
    particle: "rgba(255, 204, 0, 0.66)",
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.68)",
    surface: "rgba(0, 0, 0, 0.18)",
    surfaceStrong: "rgba(0, 0, 0, 0.34)",
    onPrimary: "#ffffff",
  }),

  conjuro: buildTheme({
    background: conjuroBg,
    overlay:
      "linear-gradient(135deg, rgba(13, 13, 17, 0.36), rgba(74, 75, 81, 0.28) 48%, rgba(142, 22, 22, 0.20))",
    primary: "#0d0d11",
    secondary: "#4a4b51",
    accent: "#8e1616",
    glow: "#d3c7a8",
    highlight: "#4a3c31",
    card: "rgba(3, 7, 18, 0.78)",
    border: "rgba(211, 199, 168, 0.22)",
    chart: "#d3c7a8",
    button: "linear-gradient(135deg, #4a4b51, #8e1616)",
    gradient: "linear-gradient(135deg, #0d0d11, #4a4b51, #d3c7a8)",
    hover: "rgba(211, 199, 168, 0.12)",
    shadow: "0 18px 80px rgba(0, 0, 0, 0.44)",
    particle: "rgba(203, 213, 225, 0.48)",
    text: "#f8fafc",
    muted: "rgba(248, 250, 252, 0.64)",
    surface: "rgba(13, 13, 17, 0.18)",
    surfaceStrong: "rgba(13, 13, 17, 0.34)",
    onPrimary: "#ffffff",
  }),

  demonio: buildTheme({
  background: demonioBg,
  overlay:
    "linear-gradient(135deg, rgba(3,3,3,0.45), rgba(158,0,0,0.25) 50%, rgba(42,58,43,0.18))",

  primary: "#030303",
  secondary: "#9e0000",
  accent: "#d1bc8a",
  glow: "#ff3b3b",
  highlight: "#2a3a2b",

  card: "rgba(10,10,10,0.80)",
  border: "rgba(255,59,59,0.20)",

  chart: "#ff3b3b",

  button:
    "linear-gradient(135deg,#9e0000,#ff3b3b)",

  gradient:
    "linear-gradient(135deg,#030303,#9e0000,#2a3a2b)",

  hover: "rgba(255,59,59,0.10)",

  shadow:
    "0 18px 80px rgba(158,0,0,0.40)",

  particle:
    "rgba(255,59,59,0.40)",

  text: "#f5f5f5",

  muted:
    "rgba(245,245,245,0.60)",

  surface:
    "rgba(3,3,3,0.18)",

  surfaceStrong:
    "rgba(3,3,3,0.34)",

  onPrimary: "#ffffff",
}),


} as const;

export type EmoriaThemesMap = typeof themes;

export const themeKeys = Object.keys(themes) as ThemeKey[];

export const getThemeVars = (theme: EmoriaTheme) =>
  ({
    "--theme-primary": theme.primary,
    "--theme-secondary": theme.secondary,
    "--theme-accent": theme.accent,
    "--theme-glow": theme.glow,
    "--theme-overlay": theme.overlay,
    "--theme-highlight": theme.highlight,
    "--theme-card": theme.card,
    "--theme-border": theme.border,
    "--theme-chart": theme.chart,
    "--theme-button": theme.button,
    "--theme-gradient": theme.gradient,
    "--theme-hover": theme.hover,
    "--theme-shadow": theme.shadow,
    "--theme-particle": theme.particle,
    "--theme-text": theme.text,
    "--theme-muted": theme.muted,
    "--theme-surface": theme.surface,
    "--theme-surface-strong": theme.surfaceStrong,
    "--theme-on-primary": theme.onPrimary,
  }) as Record<`--theme-${string}`, string>;

export const getThemeBackgroundStyle = (theme: EmoriaTheme) => ({
  backgroundImage: `url(${theme.background})`,
});

export const themeNameByKey: Record<ThemeKey, string> = {
  naruto: "Naruto",
  dbz: "Dragon Ball",
  jjk: "Jujutsu Kaisen",
  kny: "Demon Slayer",
  disney: "Disney",
  pixar: "Pixar",
  simpsons: "The Simpsons",
  rickandmorty: "Rick & Morty",
  batman: "Batman",
  ironman: "Iron Man",
  spiderman: "Spider-Man",
  thor: "Thor",
  chucky: "Chucky",
  conjuro: "El Conjuro",
  demonio: "La noche del Demonio",
};