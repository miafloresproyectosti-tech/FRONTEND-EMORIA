import { useTheme } from "../context/ThemeContext";

export default function BackgroundEffects() {
  const { currentTheme } = useTheme();

  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: currentTheme.overlay,
          opacity: 0.85,
        }}
      />

      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at top right, ${currentTheme.glow}33, transparent 28%), radial-gradient(circle at bottom left, ${currentTheme.secondary}55, transparent 32%), radial-gradient(circle at center, ${currentTheme.primary}22, transparent 38%)`,
          opacity: 0.9,
        }}
      />

      <div
        className="
          absolute
          top-[-180px]
          right-[-120px]
          w-[500px]
          h-[500px]
          rounded-full
          blur-[130px]
          animate-pulse
          z-0
        "
        style={{ backgroundColor: currentTheme.glow, opacity: 0.45 }}
      />

      <div
        className="
          absolute
          bottom-[-180px]
          left-[-120px]
          w-[420px]
          h-[420px]
          rounded-full
          blur-[120px]
          animate-pulse
          z-0
        "
        style={{ backgroundColor: currentTheme.secondary, opacity: 0.2 }}
      />

      <div
        className="
          absolute
          top-[20%]
          left-[35%]
          w-[350px]
          h-[350px]
          rounded-full
          blur-[100px]
          z-0
        "
        style={{ backgroundColor: currentTheme.primary, opacity: 0.18 }}
      />

      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle, transparent 45%, rgba(0, 0, 0, 0.55) 100%)`,
        }}
      />
    </>
  );
}
