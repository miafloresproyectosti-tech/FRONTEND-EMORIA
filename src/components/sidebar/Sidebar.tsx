import { useMemo } from "react";

import {
  Brain,
  History,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  UserCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import type { TabType } from "../../types/navigation";
import { useTheme } from "../../context/ThemeContext";
import type { AvatarOption } from "../../themes/avatarCatalog";

// TS guard: React namespace is used for React.ElementType in menu typings
// (file doesn't import React because of the new JSX transform).
import type React from "react";


const menu: {
  id: TabType;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "Chat IA", icon: MessageSquare },
  { id: "exercises", label: "Ejercicios", icon: Brain },
  { id: "emotionalHistory", label: "Historial Emocional", icon: History },
  { id: "nearbyPsychologists", label: "Psicólogos Cercanos", icon: MapPin },
  { id: "settings", label: "Configuración", icon: Settings },
  { id: "profile", label: "Perfil", icon: UserCircle },
];

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  displayName?: string;
  avatar?: AvatarOption | null;
  onLogout: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  displayName,
  avatar,
  onLogout,
}: SidebarProps) {

  const { currentTheme } = useTheme();

  const themeStyle = useMemo(
    () => ({
      backgroundImage: currentTheme.button,
      color: currentTheme.onPrimary,
    }),
    [currentTheme.button, currentTheme.onPrimary]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -290, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -290, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed lg:relative z-50 w-[min(290px,calc(100vw-24px))] h-dvh flex flex-col justify-between px-5 py-6 backdrop-blur-3xl border-r overflow-y-auto shadow-[var(--theme-shadow)]"
          style={{
            backgroundColor: currentTheme.card,
            borderColor: currentTheme.border,
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_34px_var(--theme-glow)]"
                  style={themeStyle}
                >
                  <Sparkles className="text-white" size={24} />
                </div>

                <div className="min-w-0">
                  <h1 className="text-[28px] font-black text-[var(--theme-text)]">
                    EMORIA
                  </h1>
                  <p className="text-[var(--theme-muted)] text-sm">
                    Emotional AI
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-[var(--theme-muted)] hover:bg-[var(--theme-hover)] hover:text-[var(--theme-text)] transition"
                aria-label="Cerrar menú"
              >
                <Menu size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {menu.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="relative flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-left transition-all"
                    style={
                      isActive
                        ? {
                            backgroundImage: currentTheme.button,
                            color: currentTheme.onPrimary,
                            boxShadow: `0 0 28px ${currentTheme.glow}`,
                          }
                        : {
                            color: currentTheme.muted,
                          }
                    }
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="text-[14px] leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6">
            <div
              className="p-4 rounded-2xl border mb-4 backdrop-blur-xl"
              style={{
                borderColor: currentTheme.border,
                backgroundColor: currentTheme.surface,
              }}
            >
              <div className="flex items-center gap-4">
                {avatar ? (
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="h-12 w-12 rounded-xl object-cover object-top shadow-[0_0_24px_var(--theme-glow)]"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-xl shadow-[0_0_24px_var(--theme-glow)]"
                    style={{ backgroundImage: currentTheme.gradient }}
                  />
                )}
                <div>
                  <h3 className="text-[var(--theme-text)] font-semibold">
                    {displayName || "Valeria"}
                  </h3>
                  <p className="text-[var(--theme-muted)] text-sm">{avatar?.name ?? "Premium"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border backdrop-blur-xl transition-all active:scale-95"
              style={{
                borderColor: currentTheme.border,
                backgroundColor: currentTheme.surface,
                color: currentTheme.muted,
              }}
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
