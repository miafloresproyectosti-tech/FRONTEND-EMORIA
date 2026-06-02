import { useState } from "react";

import {
  Bell,
  Bot,
  ChevronDown,
  Database,
  Download,
  Eye,
  FileDown,
  Flame,
  Globe2,
  KeyRound,
  Languages,
  LocateFixed,
  Lock,
  MapPin,
  Music,
  Palette,
  Phone,
  Shield,
  Sparkles,
  Trash2,
  User,
  Wand2,
} from "lucide-react";

import AmarisImg from "../assets/avatar/Amaris.png";
import KaelImg from "../assets/avatar/Kael.png";
import type { CompanionType } from "../types/companion";
import type { ThemeKey } from "../themes/themeEngine";
import { themeKeys, themeNameByKey } from "../themes/themeEngine";
import type { AvatarOption } from "../themes/avatarCatalog";
import { getAvatarsForUniverse } from "../themes/avatarCatalog";
import type { UserGender } from "../types/avatar";

interface SettingsPageProps {
  selectedUniverse: ThemeKey;
  onUniverseChange: (theme: ThemeKey) => void;
  selectedCompanion: CompanionType;
  onCompanionChange: (companion: CompanionType) => void;
  appearanceMode: "dark" | "light";
  onAppearanceModeChange: (mode: "dark" | "light") => void;
  particlesEnabled: boolean;
  onParticlesEnabledChange: (enabled: boolean) => void;
  displayName: string;
  gender: UserGender;
  selectedAvatar?: AvatarOption | null;
  onAvatarChange: (avatar: AvatarOption) => void;
}

const personalityLevels = ["Formal", "Amigable", "Motivacional", "Profesional"] as const;
const searchRadius = ["5 km", "10 km", "20 km", "50 km"] as const;
const reminderTimes = ["08:00", "12:00", "18:00"] as const;
const languages = ["Español", "English", "Português"] as const;

const settingsNavItems = [
  { id: "apariencia", icon: Palette, label: "Apariencia" },
  { id: "ia-companera", icon: Bot, label: "IA Companera" },
  { id: "notificaciones", icon: Bell, label: "Notificaciones" },
  { id: "privacidad", icon: Globe2, label: "Ubicacion" },
  { id: "psicologos-cercanos", icon: MapPin, label: "Psicologos Cercanos" },
  { id: "bienestar", icon: Music, label: "Bienestar" },
  { id: "cuenta", icon: User, label: "Cuenta" },
  { id: "seguridad", icon: Lock, label: "Seguridad" },
  { id: "idioma", icon: Languages, label: "Idioma" },
  { id: "datos-emocionales", icon: Database, label: "Gestion de datos" },
  { id: "emergencia", icon: Phone, label: "Emergencia" },
];

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Palette;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="h-11 w-11 rounded-2xl bg-[image:var(--theme-button)] flex items-center justify-center shadow-[0_0_26px_var(--theme-glow)] shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <div className="min-w-0">
        <h2 className="text-xl sm:text-2xl font-black">{title}</h2>
        {description && <p className="text-white/55 mt-1 leading-relaxed">{description}</p>}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] px-4 py-3 cursor-pointer">
      <span className="text-white/75">{label}</span>
      <input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" className="sr-only" />
      <span
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? "bg-[var(--theme-primary)]" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </label>
  );
}

function TextField({ label, value, type = "text" }: { label: string; value: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm text-white/55">{label}</span>
      <input
        type={type}
        defaultValue={value}
        className="mt-2 w-full rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-[var(--theme-primary)]"
      />
    </label>
  );
}

export default function SettingsPage({
  selectedUniverse,
  onUniverseChange,
  selectedCompanion,
  onCompanionChange,
  appearanceMode,
  onAppearanceModeChange,
  particlesEnabled,
  onParticlesEnabledChange,
  displayName,
  gender,
  selectedAvatar,
  onAvatarChange,
}: SettingsPageProps) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [glowEnabled, setGlowEnabled] = useState(true);
  const [personality, setPersonality] = useState<(typeof personalityLevels)[number]>("Amigable");
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    exercises: true,
    emotionalAlerts: true,
  });
  const [reminderTime, setReminderTime] = useState<(typeof reminderTimes)[number]>("08:00");
  const [privacy, setPrivacy] = useState({
    location: true,
    face: true,
    emotionalAnalysis: true,
    anonymousStats: false,
  });
  const [radius, setRadius] = useState<(typeof searchRadius)[number]>("10 km");
  const [wellness, setWellness] = useState({
    music: true,
    ambient: true,
    meditations: false,
  });
  const [security, setSecurity] = useState({
    faceRecognition: true,
    twoFactor: true,
  });
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Preferencias listas para ajustar");
  const [language, setLanguage] = useState<(typeof languages)[number]>("Español");

  const companionMeta = selectedCompanion === "kael"
    ? { name: "KAEL", image: KaelImg }
    : { name: "AMARIS", image: AmarisImg };
  const availableAvatars = getAvatarsForUniverse(selectedUniverse, gender);

  const showStatus = (message: string) => {
    setStatusMessage(message);
    window.setTimeout(() => setStatusMessage("Preferencias listas para ajustar"), 2600);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const downloadFile = (fileName: string, mimeType: string, content: string) => {
    const file = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportHistory = () => {
    downloadFile(
      "historial-emocional-emoria.json",
      "application/json",
      JSON.stringify(
        {
          usuario: "Valeria",
          bienestarSemanal: 84,
          rachaEmocional: 12,
          tema: themeNameByKey[selectedUniverse],
          ia: companionMeta.name,
        },
        null,
        2
      )
    );
    showStatus("Historial emocional exportado");
  };

  const handleDownloadPdf = () => {
    downloadFile(
      "historial-emocional-emoria.pdf",
      "application/pdf",
      "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 74 >>\nstream\nBT /F1 18 Tf 72 720 Td (EMORIA - Historial emocional exportado) Tj ET\nendstream\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF"
    );
    showStatus("PDF generado");
  };

  const handleDeleteHistory = () => {
    if (window.confirm("Quieres eliminar la cuenta de demostracion?")) {
      showStatus("Cuenta marcada para eliminacion");
    }
  };

  return (
    <section className="w-full min-h-screen text-white pb-8">
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <p className="text-[var(--theme-primary)] uppercase text-sm font-bold mb-3">
              Como funciona EMORIA
            </p>
            <h1 className="text-3xl sm:text-5xl font-black">Configuracion</h1>
            <p className="text-white/60 mt-3 max-w-2xl">
              Ajusta las opciones tecnicas de EMORIA: apariencia, IA, notificaciones, ubicacion, seguridad, idioma y datos.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] px-4 py-3 text-sm text-white/70 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            {statusMessage}
          </div>
        </div>
        <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,var(--theme-primary),transparent)]" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-6">
        <aside className="xl:sticky xl:top-6 h-fit rounded-[28px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-4 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <p className="px-4 pb-3 text-xs uppercase tracking-[0.22em] text-white/45 font-bold">
            Secciones
          </p>
          {settingsNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-white/70 hover:bg-[var(--theme-hover)] hover:text-white transition"
              >
                <Icon size={18} className="text-[var(--theme-primary)]" />
                <span className="font-semibold">{item.label}</span>
              </button>
            );
          })}
        </aside>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-w-0">
          <section id="apariencia" className="xl:col-span-2 scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Palette} title="Apariencia" description="Controla el modo visual y los efectos de la interfaz." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4">
                <label className="text-sm text-white/55">Cambiar universo</label>
                <div className="relative mt-2">
                  <select
                    value={selectedUniverse}
                    onChange={(event) => {
                      const nextTheme = event.target.value as ThemeKey;
                      onUniverseChange(nextTheme);
                      showStatus(`Tema cambiado a ${themeNameByKey[nextTheme]}`);
                    }}
                    className="w-full appearance-none rounded-2xl border border-[var(--theme-border)] bg-black/35 px-4 py-3 text-white outline-none focus:border-[var(--theme-primary)]"
                  >
                    {themeKeys.map((themeKey) => (
                      <option key={themeKey} value={themeKey} className="bg-slate-950">
                        {themeNameByKey[themeKey]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/55" size={18} />
                </div>
                <p className="mt-3 text-xl font-black">{themeNameByKey[selectedUniverse]}</p>
              </div>

              <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4">
                <p className="text-sm text-white/55 mb-3">Modo de interfaz</p>
                <div className="grid grid-cols-2 gap-3">
                  {(["dark", "light"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        onAppearanceModeChange(mode);
                        showStatus(mode === "dark" ? "Modo oscuro activado" : "Modo claro activado");
                      }}
                      className={`rounded-2xl border px-4 py-3 font-bold transition ${
                        appearanceMode === mode
                          ? "border-[var(--theme-primary)] bg-[var(--theme-hover)] text-white"
                          : "border-[var(--theme-border)] bg-white/[0.04] text-white/65"
                      }`}
                    >
                      {mode === "dark" ? "Modo oscuro" : "Modo claro"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
              <ToggleRow label="Particulas" checked={particlesEnabled} onChange={onParticlesEnabledChange} />
              <ToggleRow label="Animaciones" checked={animationsEnabled} onChange={setAnimationsEnabled} />
              <ToggleRow label="Glow dinamico" checked={glowEnabled} onChange={setGlowEnabled} />
            </div>
          </section>

          <section id="ia-companera" className="xl:col-span-2 scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Bot} title="Configuracion IA" description="Cambia la IA que acompana tu experiencia." />

            <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-5">
              <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4 text-center">
                <img src={companionMeta.image} alt={companionMeta.name} className="mx-auto h-28 w-28 rounded-[24px] object-cover shadow-[0_0_28px_var(--theme-glow)]" />
                <p className="mt-4 text-white/50 text-sm">IA actual</p>
                <h3 className="text-3xl font-black">{companionMeta.name}</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-white/55 mb-3">Cambiar IA</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(["amaris", "kael"] as const).map((companion) => (
                      <button
                        key={companion}
                        onClick={() => {
                          onCompanionChange(companion);
                          showStatus(`IA companera cambiada a ${companion === "amaris" ? "Amaris" : "Kael"}`);
                        }}
                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                          selectedCompanion === companion
                            ? "border-[var(--theme-primary)] bg-[var(--theme-hover)]"
                            : "border-[var(--theme-border)] bg-white/[0.04] hover:bg-white/[0.07]"
                        }`}
                      >
                        <span className="block text-xl font-black">{companion === "amaris" ? "Amaris" : "Kael"}</span>
                        <span className="text-white/55">{companion === "amaris" ? "Empatica y cercana" : "Directo y estrategico"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-white/55 mb-3">Nivel de personalidad</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    {personalityLevels.map((level) => (
                      <label key={level} className="flex items-center gap-3 rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] px-4 py-3 cursor-pointer">
                        <input
                          type="radio"
                          checked={personality === level}
                          onChange={() => setPersonality(level)}
                          className="accent-[var(--theme-primary)]"
                        />
                        <span>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="notificaciones" className="scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Bell} title="Notificaciones" />
            <div className="space-y-4">
              <ToggleRow label="Recordatorio diario" checked={notifications.dailyReminder} onChange={(checked) => setNotifications((state) => ({ ...state, dailyReminder: checked }))} />
              <div className="grid grid-cols-3 gap-3">
                {reminderTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setReminderTime(time);
                      showStatus(`Recordatorio diario configurado a las ${time}`);
                    }}
                    className={`rounded-2xl border px-4 py-3 font-bold transition ${
                      reminderTime === time
                        ? "border-[var(--theme-primary)] bg-[var(--theme-hover)]"
                        : "border-[var(--theme-border)] bg-white/[0.04] text-white/65"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <ToggleRow label="Ejercicios recomendados" checked={notifications.exercises} onChange={(checked) => setNotifications((state) => ({ ...state, exercises: checked }))} />
              <ToggleRow label="Alertas emocionales" checked={notifications.emotionalAlerts} onChange={(checked) => setNotifications((state) => ({ ...state, emotionalAlerts: checked }))} />
            </div>
          </section>

          <section id="privacidad" className="scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Globe2} title="Ubicacion" description="Necesario para Psicologos Cercanos." />
            <div className="grid grid-cols-1 gap-3">
              <ToggleRow label="Permitir ubicacion" checked={privacy.location} onChange={(checked) => setPrivacy((state) => ({ ...state, location: checked }))} />
              <ToggleRow label="Permitir reconocimiento facial" checked={privacy.face} onChange={(checked) => setPrivacy((state) => ({ ...state, face: checked }))} />
              <ToggleRow label="Permitir analisis emocional" checked={privacy.emotionalAnalysis} onChange={(checked) => setPrivacy((state) => ({ ...state, emotionalAnalysis: checked }))} />
            </div>
          </section>

          <section id="psicologos-cercanos" className="xl:col-span-2 scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={MapPin} title="Psicologos Cercanos" />
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-5">
              <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4">
                <div className="flex items-center gap-3 mb-3">
                  <LocateFixed className="text-[var(--theme-primary)]" size={20} />
                  <span className="font-bold">Ubicacion automatica</span>
                </div>
                <ToggleRow label="Activa" checked={privacy.location} onChange={(checked) => setPrivacy((state) => ({ ...state, location: checked }))} />
              </div>

              <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4">
                <p className="font-bold mb-3">Radio de busqueda</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {searchRadius.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setRadius(item);
                        showStatus(`Radio de busqueda ajustado a ${item}`);
                      }}
                      className={`rounded-2xl border px-4 py-3 font-bold transition ${
                        radius === item
                          ? "border-[var(--theme-primary)] bg-[var(--theme-hover)]"
                          : "border-[var(--theme-border)] bg-white/[0.04] text-white/65"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="bienestar" className="scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Music} title="Bienestar" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <ToggleRow label="Musica relajante automatica" checked={wellness.music} onChange={(checked) => setWellness((state) => ({ ...state, music: checked }))} />
              <ToggleRow label="Sonidos ambientales" checked={wellness.ambient} onChange={(checked) => setWellness((state) => ({ ...state, ambient: checked }))} />
              <ToggleRow label="Meditaciones guiadas" checked={wellness.meditations} onChange={(checked) => setWellness((state) => ({ ...state, meditations: checked }))} />
            </div>
          </section>

          <section id="cuenta" className="scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={User} title="Cuenta" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField label="Nombre" value={displayName} />
              <TextField label="Tipo de avatar" value={gender === "female" ? "Femenino" : "Masculino"} />
            </div>

            <div className="mt-5">
              <p className="text-sm text-white/55 mb-3">Avatar del usuario</p>
              {selectedAvatar && (
                <div className="mb-4 flex items-center gap-4 rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4">
                  <img
                    src={selectedAvatar.image}
                    alt={selectedAvatar.name}
                    className="h-16 w-16 rounded-2xl object-cover object-top shadow-[0_0_22px_var(--theme-glow)]"
                  />
                  <div>
                    <p className="text-xl font-black">{selectedAvatar.name}</p>
                    <p className="text-white/55">{themeNameByKey[selectedAvatar.universe]}</p>
                  </div>
                </div>
              )}

              {availableAvatars.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableAvatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => {
                        onAvatarChange(avatar);
                        showStatus(`Avatar cambiado a ${avatar.name}`);
                      }}
                      className={`rounded-2xl border p-3 text-left transition ${
                        selectedAvatar?.id === avatar.id
                          ? "border-[var(--theme-primary)] bg-[var(--theme-hover)]"
                          : "border-[var(--theme-border)] bg-white/[0.04] hover:bg-white/[0.07]"
                      }`}
                      type="button"
                    >
                      <img
                        src={avatar.image}
                        alt={avatar.name}
                        className="h-24 w-full rounded-xl object-cover object-top"
                      />
                      <span className="mt-2 block font-bold leading-tight">{avatar.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4 text-white/60">
                  Este universo aun no tiene avatares para tu seleccion.
                </p>
              )}
            </div>
          </section>

          <section id="seguridad" className="xl:col-span-2 scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Lock} title="Seguridad" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <button
                onClick={() => showStatus("Solicitud de cambio de contrasena enviada")}
                className="flex items-center justify-center gap-3 rounded-2xl bg-[image:var(--theme-button)] px-5 py-4 font-bold transition active:scale-[0.98]"
              >
                <KeyRound size={18} />
                Cambiar contrasena
              </button>
              <ToggleRow label="Reconocimiento facial activado" checked={security.faceRecognition} onChange={(checked) => setSecurity((state) => ({ ...state, faceRecognition: checked }))} />
              <ToggleRow label="Autenticacion en dos pasos" checked={security.twoFactor} onChange={(checked) => setSecurity((state) => ({ ...state, twoFactor: checked }))} />
            </div>
          </section>

          <section id="idioma" className="xl:col-span-2 scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Languages} title="Idioma" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {languages.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setLanguage(item);
                    showStatus(`Idioma seleccionado: ${item}`);
                  }}
                  className={`rounded-2xl border px-4 py-3 font-bold transition ${
                    language === item
                      ? "border-[var(--theme-primary)] bg-[var(--theme-hover)]"
                      : "border-[var(--theme-border)] bg-white/[0.04] text-white/65"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section id="datos-emocionales" className="xl:col-span-2 scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Database} title="Gestion de datos" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={handleExportHistory}
                className="flex items-center justify-center gap-3 rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] px-5 py-4 font-bold hover:bg-[var(--theme-hover)] transition active:scale-[0.98]"
              >
                <Download size={18} />
                Exportar historial emocional
              </button>
              <button
                onClick={handleDownloadPdf}
                className="flex items-center justify-center gap-3 rounded-2xl bg-[image:var(--theme-button)] px-5 py-4 font-bold transition active:scale-[0.98]"
              >
                <FileDown size={18} />
                Descargar PDF
              </button>
              <button
                onClick={handleDeleteHistory}
                className="flex items-center justify-center gap-3 rounded-2xl border border-red-400/35 bg-red-500/10 px-5 py-4 font-bold text-red-100 hover:bg-red-500/18 transition active:scale-[0.98]"
              >
                <Trash2 size={18} />
                Eliminar cuenta
              </button>
            </div>
          </section>

          <section id="emergencia" className="xl:col-span-2 scroll-mt-6 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <SectionHeader icon={Flame} title="Emergencia" description="Muy util para tu tesis." />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <TextField label="Contacto de emergencia" value="Mariana" />
              <TextField label="Telefono" value="+51 999 888 777" type="tel" />
              <ToggleRow label="Alertas de bienestar critico" checked={criticalAlerts} onChange={setCriticalAlerts} />
            </div>
          </section>

          <section className="xl:col-span-2 rounded-[30px] border border-[var(--theme-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5 sm:p-7 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-2xl bg-[image:var(--theme-button)] flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Diseno Premium</h2>
                  <p className="text-white/55 mt-1">Configuracion organizada para una experiencia clara, visual y escalable.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-[var(--theme-border)] bg-white/[0.04] px-4 py-2 text-sm text-white/70 flex items-center gap-2">
                  <Wand2 size={16} className="text-[var(--theme-primary)]" />
                  Tema vivo
                </span>
                <span className="rounded-full border border-[var(--theme-border)] bg-white/[0.04] px-4 py-2 text-sm text-white/70 flex items-center gap-2">
                  <Shield size={16} className="text-[var(--theme-primary)]" />
                  Privacidad
                </span>
                <span className="rounded-full border border-[var(--theme-border)] bg-white/[0.04] px-4 py-2 text-sm text-white/70 flex items-center gap-2">
                  <Eye size={16} className="text-[var(--theme-primary)]" />
                  Accesible
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
