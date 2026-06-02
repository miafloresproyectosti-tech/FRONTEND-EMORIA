import { useState } from "react";

import {
  Bot,
  CalendarDays,
  Check,
  Heart,
  Lock,
  MessageCircle,
  Palette,
  ShieldCheck,
  Sparkles,
  UserCircle,
} from "lucide-react";

import AmarisImg from "../assets/avatar/Amaris.png";
import KaelImg from "../assets/avatar/Kael.png";
import type { CompanionType } from "../types/companion";
import type { ThemeKey } from "../themes/themeEngine";
import { themes, themeNameByKey } from "../themes/themeEngine";
import type { AvatarOption } from "../themes/avatarCatalog";
import type { UserGender } from "../types/avatar";

interface ProfilePageProps {
  selectedUniverse: ThemeKey;
  selectedCompanion: CompanionType;
  onCompanionChange: (companion: CompanionType) => void;
  displayName?: string; // Nombre del usuario logueado
  gender: UserGender;
  selectedAvatar?: AvatarOption | null;
}

const themeEditionByKey: Record<ThemeKey, string> = {
  naruto: "Hokage Edition",
  dbz: "Saiyan Focus",
  jjk: "Cursed Energy Calm",
  kny: "Respiracion Serena",
  disney: "Dream Edition",
  pixar: "Creative Balance",
  simpsons: "Springfield Mood",
  rickandmorty: "Portal Edition",
  batman: "Gotham Night",
  ironman: "Arc Reactor",
  spiderman: "Friendly Balance",
  thor: "Asgard Edition",
  chucky: "Brave Mode",
  conjuro: "Safe Ritual",
  demonio: "Demon Retreat",
  aro: "Aro Balance",
} as Record<ThemeKey, string>;



export default function ProfilePage({
  selectedUniverse,
  selectedCompanion,
  onCompanionChange,
  displayName = "Usuario",
  gender,
  selectedAvatar,
}: ProfilePageProps) {
  const [goals, setGoals] = useState({
    stress: true,
    focus: true,
    sleep: false,
    motivation: true,
  });
  const [personalPhrase, setPersonalPhrase] = useState("Mi bienestar emocional es importante.");

  const isKael = selectedCompanion === "kael";
  const companion = {
    name: isKael ? "KAEL" : "AMARIS",
    image: isKael ? KaelImg : AmarisImg,
    specialty: isKael
      ? "Especialista en productividad emocional"
      : "Especialista en bienestar emocional",
  };
  const activeTheme = themes[selectedUniverse];

  const toggleGoal = (key: keyof typeof goals) => {
    setGoals((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <section className="w-full min-h-screen text-white pb-8">
      <div className="mb-8">
        <p className="text-[var(--theme-primary)] uppercase text-sm font-bold mb-3">
          Quien soy dentro de EMORIA
        </p>
        <h1 className="text-3xl sm:text-5xl font-black">Perfil</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-3 rounded-[34px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 shadow-[var(--theme-shadow)] backdrop-blur-2xl overflow-hidden relative">
          <div className="absolute top-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-[var(--theme-glow)] blur-[120px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            {selectedAvatar ? (
              <img
                src={selectedAvatar.image}
                alt={selectedAvatar.name}
                className="h-24 w-24 rounded-[28px] object-cover object-top shadow-[0_0_34px_var(--theme-glow)]"
              />
            ) : (
              <div className="w-24 h-24 rounded-[28px] bg-[image:var(--theme-gradient)] flex items-center justify-center shadow-[0_0_34px_var(--theme-glow)]">
                <UserCircle size={48} />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-4xl sm:text-6xl font-black">{displayName}</h2>
              <p className="text-white/60 mt-3 text-lg">
                Miembro EMORIA <span className="text-white/35">desde mayo 2025</span>
              </p>
              <p className="text-white/55 mt-2">
                Avatar {gender === "female" ? "femenino" : "masculino"}
                {selectedAvatar ? `: ${selectedAvatar.name}` : ": pendiente de elegir"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-5">
            <Bot className="text-[var(--theme-primary)]" size={24} />
            <h2 className="text-2xl font-black">Mi companero IA</h2>
          </div>

          <div className="rounded-[26px] border border-[var(--theme-border)] bg-white/[0.04] p-5 text-center">
            <img src={companion.image} alt={companion.name} className="mx-auto h-28 w-28 rounded-[26px] object-cover shadow-[0_0_30px_var(--theme-glow)]" />
            <h3 className="mt-4 text-3xl font-black">{companion.name}</h3>
            <p className="text-white/55 mt-2">{companion.specialty}</p>
          </div>

          <button
            onClick={() => onCompanionChange(isKael ? "amaris" : "kael")}
            className="mt-4 w-full rounded-2xl bg-[image:var(--theme-button)] px-5 py-4 font-bold transition active:scale-[0.98]"
          >
            Cambiar companero IA
          </button>
        </section>

        <section className="xl:col-span-2 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-5">
            <Palette className="text-[var(--theme-primary)]" size={24} />
            <h2 className="text-2xl font-black">Mi universo</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-5 items-stretch">
            <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-5">
              <p className="text-white/50">Universo actual</p>
              <h3 className="text-4xl font-black mt-2">{themeNameByKey[selectedUniverse]}</h3>
              <p className="text-white/50 mt-5">Tema</p>
              <p className="text-2xl font-black text-[var(--theme-primary)] mt-2">
                {themeEditionByKey[selectedUniverse]}
              </p>
              <p className="text-white/50 mt-5">Personaje</p>
              <p className="text-2xl font-black mt-2">
                {selectedAvatar?.name ?? "Sin avatar seleccionado"}
              </p>
            </div>

            <div
              className="min-h-[220px] rounded-[26px] border border-[var(--theme-border)] bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url(${activeTheme.background})` }}
            >
              <div className="h-full min-h-[220px] bg-black/25 p-4 flex items-end">
                <span className="rounded-full bg-black/55 px-4 py-2 text-sm font-bold backdrop-blur-md">
                  Vista previa
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="xl:col-span-2 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-5">
            <Heart className="text-[var(--theme-primary)]" size={24} />
            <h2 className="text-2xl font-black">Objetivo emocional</h2>
          </div>

          <p className="text-white/55 mb-4">Mi objetivo principal</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "stress", label: "Reducir estres" },
              { key: "focus", label: "Mejorar concentracion" },
              { key: "sleep", label: "Dormir mejor" },
              { key: "motivation", label: "Sentirme mas motivado" },
            ].map((goal) => {
              const checked = goals[goal.key as keyof typeof goals];

              return (
                <button
                  key={goal.key}
                  onClick={() => toggleGoal(goal.key as keyof typeof goals)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    checked
                      ? "border-[var(--theme-primary)] bg-[var(--theme-hover)]"
                      : "border-[var(--theme-border)] bg-white/[0.04] text-white/65"
                  }`}
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${checked ? "bg-[var(--theme-primary)]" : "bg-white/10"}`}>
                    {checked && <Check size={15} className="text-[var(--theme-on-primary)]" />}
                  </span>
                  <span className="font-semibold">{goal.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-5">
            <MessageCircle className="text-[var(--theme-primary)]" size={24} />
            <h2 className="text-2xl font-black">Frase personal</h2>
          </div>
          <textarea
            value={personalPhrase}
            onChange={(event) => setPersonalPhrase(event.target.value)}
            className="min-h-[150px] w-full resize-none rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-4 text-lg text-white outline-none transition focus:border-[var(--theme-primary)]"
          />
        </section>

        <section className="rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-5">
            <Lock className="text-[var(--theme-primary)]" size={24} />
            <h2 className="text-2xl font-black">Bienestar y privacidad</h2>
          </div>
          <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-5">
            <ShieldCheck className="text-[var(--theme-accent)] mb-4" size={28} />
            <p className="text-xl font-black">Tus datos emocionales son privados.</p>
            <p className="text-white/60 mt-3 leading-relaxed">
              EMORIA utiliza tu informacion unicamente para personalizar tu experiencia.
            </p>
          </div>
        </section>

        <section className="xl:col-span-2 rounded-[30px] border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-5">
            <CalendarDays className="text-[var(--theme-primary)]" size={24} />
            <h2 className="text-2xl font-black">Mi actividad</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-5">
              <p className="text-white/50">Ultima sesion</p>
              <p className="text-3xl font-black mt-2">Hoy</p>
            </div>
            <div className="rounded-2xl border border-[var(--theme-border)] bg-white/[0.04] p-5">
              <p className="text-white/50">Sesion mas reciente</p>
              <p className="text-3xl font-black mt-2">Respiracion guiada</p>
            </div>
          </div>
        </section>

        <section className="xl:col-span-3 rounded-[30px] border border-[var(--theme-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-[var(--theme-shadow)] backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <Sparkles className="text-[var(--theme-primary)]" size={24} />
            <p className="text-white/70">
              Este perfil evita pedir datos sensibles innecesarios y se enfoca en tu experiencia dentro de EMORIA.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
