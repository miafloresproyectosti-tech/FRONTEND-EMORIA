import { useState, useEffect, useLayoutEffect } from "react";

import type { CSSProperties } from "react";

import LoginPage from "./components/auth/LoginPage";
import { getSession, logout as clearLocalSession, updateUserProfile, getStoredUserProfile } from "./auth/authStore";
import { logout as logoutWithApi } from "./services/authService";
import { useUser } from "./context/UserContext";

import { Menu } from "lucide-react";

import type { TabType } from "./types/navigation";
import type { CompanionType } from "./types/companion";
import type { AvatarProfile, UserGender } from "./types/avatar";
import type { AvatarOption } from "./themes/avatarCatalog";
import { getAvatarById, getFirstAvatarForUniverse } from "./themes/avatarCatalog";
import { apiRequest } from "./services/apiClient";
import {
  type ThemeKey,
  themes,
  getThemeBackgroundStyle,
  getThemeVars,
} from "./themes/themeEngine";
import { getCursorDataUrl } from "./themes/cursorUtils";
import { ThemeContext } from "./context/ThemeContext";
import FloatingParticles from "./layouts/FloatingParticles";

import Sidebar from "./components/sidebar/Sidebar.tsx";


import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import ExercisesPage from "./pages/ExercisesPage";
import EmotionalHistoryPage from "./pages/EmotionalHistoryPage";
import NearbyPsychologistsPage from "./pages/NearbyPsychologistsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import JournalPage from "./pages/JournalPage";
import MusicTherapyPage from "./pages/MusicTherapyPage";

import IntroScreen from "./components/intro/IntroScreen";
import EmoriaScanner from "./components/intro/EmoriaScanner";
import EmotionalQuestions from "./components/intro/EmotionalQuestions";
import EmotionResult from "./components/intro/EmotionResult";
import UniverseSelector from "./pages/UniverseSelector";
import CompanionSelector from "./components/ai/CompanionSelector";
import AmarisPanel from "./components/ai/AmarisPanel";
import KaelPanel from "./components/ai/KaelPanel";

export default function App() {
  const { setUser } = useUser();
  const initialSession = getSession();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSubModule, setActiveSubModule] = useState<"none" | "journal" | "music">("none");
  const storedProfile = initialSession ? getStoredUserProfile(initialSession.identifier) : null;
  const [selectedUniverse, setSelectedUniverse] = useState<ThemeKey>(
    initialSession?.avatar?.universe ?? storedProfile?.avatar?.universe ?? "naruto"
  );
  const [selectedCompanion, setSelectedCompanion] = useState<CompanionType | null>(null);
  const [appearanceMode, setAppearanceMode] = useState<"dark" | "light">("dark");
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [universeChosen, setUniverseChosen] = useState(Boolean(initialSession?.avatar));
  const [selectedAvatarProfile, setSelectedAvatarProfile] = useState<AvatarProfile | null>(
    () => initialSession?.avatar ?? storedProfile?.avatar ?? null
  );

  const [session, setSession] = useState<
    | {
        role: "USUARIO";
        identifier: string;
        displayName: string;
        gender?: UserGender;
        avatar?: AvatarProfile;
      }
    | null
  >(() => {
    if (!initialSession) return null;
    return {
      role: initialSession.role,
      identifier: initialSession.identifier,
      displayName: initialSession.displayName,
      gender: initialSession.gender,
      avatar: initialSession.avatar,
    };
  });

  // Sincronizar session con UserContext
  useEffect(() => {
    if (session) {
      setUser({
        role: session.role,
        identifier: session.identifier,
        displayName: session.displayName,
        gender: session.gender,
        avatar: session.avatar,
      });
    } else {
      setUser(null);
    }
  }, [session, setUser]);

  const [flow, setFlow] = useState(() => ({
    intro: !Boolean(initialSession),
    scanner: false,
    questions: false,
    result: false,
    universe: false,
    companion: false,
    amarisPanel: false,
    kaelPanel: false,
  }));

  const handleIntroFinish = () => setFlow((p) => ({ ...p, intro: false, scanner: true }));
  const handleScannerFinish = () => setFlow((p) => ({ ...p, scanner: false, questions: true }));
  const handleQuestionsFinish = () => setFlow((p) => ({ ...p, questions: false, result: true }));
  const handleResultFinish = () => setFlow((p) => ({ ...p, result: false, universe: true }));

  const persistAvatarProfile = (profile: AvatarProfile | null) => {
    setSelectedAvatarProfile(profile);
    if (!session || !profile) return;

    const updatedSession = updateUserProfile(session.identifier, {
      gender: profile.gender,
      avatar: profile,
    });

    setSession((current) => current ? { ...current, ...(updatedSession ?? {}), avatar: profile, gender: profile.gender } : current);
    // Persist minimal profile (gender + universe) to backend
    (async () => {
      try {
        await apiRequest("/profile", {
          method: "POST",
          body: { gender: profile.gender, universe: profile.universe },
        });
      } catch (err) {
        // non-fatal; keep local state and log
        // eslint-disable-next-line no-console
        console.error("Failed to sync profile to backend:", err);
      }
    })();
  };

  const handleUniverseSelect = (universe: ThemeKey, avatar: AvatarOption | null) => {
    const gender = session?.gender ?? avatar?.gender ?? storedProfile?.gender ?? "female";
    const finalAvatar = avatar ?? getFirstAvatarForUniverse(universe, gender);
    const nextAvatarProfile = finalAvatar
      ? {
          gender,
          universe,
          avatarId: finalAvatar.id,
        }
      : null;

    setSelectedUniverse(universe);
    setUniverseChosen(true);
    persistAvatarProfile(nextAvatarProfile);
    setFlow((p) => ({ ...p, universe: false, companion: true }));
  };

  const handleCompanionSelect = (companion: CompanionType) => {
    setSelectedCompanion(companion);
    setFlow((p) => ({
      ...p,
      companion: false,
      amarisPanel: companion === "amaris",
      kaelPanel: companion === "kael",
    }));
  };

  const handleAmarisPanelFinish = () => setFlow((p) => ({ ...p, amarisPanel: false }));
  const handleKaelPanelFinish = () => setFlow((p) => ({ ...p, kaelPanel: false }));

  const handleLogout = () => {
    void logoutWithApi().finally(() => {
      clearLocalSession();
    });
    setSession(null);
    setActiveTab("dashboard");
    setActiveSubModule("none");
    setFlow({
      intro: true,
      scanner: false,
      questions: false,
      result: false,
      universe: false,
      companion: false,
      amarisPanel: false,
      kaelPanel: false,
    });
    setSelectedUniverse("naruto");
    setSelectedCompanion(null);
    setSelectedAvatarProfile(null);
    setAppearanceMode("dark");
    setParticlesEnabled(true);
  };

  const isReady =
    !flow.intro &&
    !flow.scanner &&
    !flow.questions &&
    !flow.result &&
    !flow.universe &&
    !flow.companion &&
    !flow.amarisPanel &&
    !flow.kaelPanel;

  const currentTheme = themes[selectedUniverse];
  const companionParam = selectedCompanion ?? "amaris";
  const selectedAvatar = getAvatarById(selectedAvatarProfile?.avatarId);
  const [cursorUrl, setCursorUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    if (!universeChosen) {
      setCursorUrl(undefined);
      return () => {
        alive = false;
      };
    }

    getCursorDataUrl(selectedUniverse)
      .then((url) => {
        if (alive) {
          setCursorUrl(url);
        }
      })
      .catch(() => {
        if (alive) {
          setCursorUrl(undefined);
        }
      });

    return () => {
      alive = false;
    };
  }, [selectedUniverse, universeChosen]);

  useLayoutEffect(() => {
    const styleId = "emoria-cursor-style";
    const existing = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!cursorUrl) {
      if (existing) existing.remove();
      document.body.style.cursor = "";
      return;
    }

    const cursorRule = `url(${cursorUrl}) 16 16`;
    const css = `
      /* Global custom cursor (exclude text inputs) */
      body, #root { cursor: ${cursorRule}, auto !important; }
      /* Clickable elements should show pointer fallback while keeping the custom image */
      button, a, [role="button"], .cursor-pointer, [class*="btn"], [class*="button"] { cursor: ${cursorRule}, pointer !important; }
      /* Keep text inputs selectable */
      input, textarea, select { cursor: text !important; }
    `;

    if (existing) {
      existing.innerHTML = css;
    } else {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = css;
      document.head.appendChild(style);
    }

    // also set body cursor as a fallback
    document.body.style.cursor = `${cursorRule}, auto`;
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
      document.body.style.cursor = "";
    };
  }, [cursorUrl]);

  const themeStyle = {
    ...getThemeBackgroundStyle(currentTheme),
    ...getThemeVars(currentTheme),
    ...(cursorUrl ? { cursor: `url(${cursorUrl}) 16 16, auto` } : {}),
  } as CSSProperties & Record<`--theme-${string}`, string>;

  if (!session) {
    return (
      <LoginPage
        onLoggedIn={(s, isNewUser) => {
          const hasAvatarProfile = Boolean(s.avatar);

          setSession({
            role: s.role,
            identifier: s.identifier,
            displayName: s.displayName,
            gender: s.gender,
            avatar: s.avatar,
          });
          setSelectedAvatarProfile(s.avatar ?? null);
          if (hasAvatarProfile && s.avatar) {
            setSelectedUniverse(s.avatar.universe);
          }
          setUniverseChosen(hasAvatarProfile);
          if (isNewUser) {
            setFlow({
              intro: true,
              scanner: false,
              questions: false,
              result: false,
              universe: false,
              companion: false,
              amarisPanel: false,
              kaelPanel: false,
            });
          } else {
            setFlow({
              intro: false,
              scanner: false,
              questions: false,
              result: false,
              universe: false,
              companion: false,
              amarisPanel: false,
              kaelPanel: false,
            });
          }
        }}
      />
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        currentUniverse: selectedUniverse,
        currentTheme,
      }}
    >
      <div
        className="relative w-full h-dvh overflow-hidden bg-cover bg-center transition-all duration-1000"
        style={themeStyle}
      >
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: currentTheme.overlay, opacity: appearanceMode === "dark" ? 0.82 : 0.46 }}
        />
        {appearanceMode === "light" && (
          <div className="absolute inset-0 bg-white/20 transition-all duration-1000" />
        )}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at 80% 12%, var(--theme-glow), transparent 34%), radial-gradient(circle at 12% 88%, var(--theme-secondary), transparent 36%)`,
            opacity: appearanceMode === "dark" ? 0.28 : 0.16,
          }}
        />
        {particlesEnabled && <FloatingParticles />}

        {flow.intro && <IntroScreen onStart={handleIntroFinish} />}
        {flow.scanner && <EmoriaScanner onFinish={handleScannerFinish} />}
        {flow.questions && <EmotionalQuestions onFinish={handleQuestionsFinish} />}
        {flow.result && <EmotionResult onFinish={handleResultFinish} />}
        {flow.universe && <UniverseSelector gender={session.gender ?? storedProfile?.gender ?? "female"} onSelect={handleUniverseSelect} />}
        {flow.companion && <CompanionSelector onSelect={handleCompanionSelect} />}
        {flow.amarisPanel && <AmarisPanel onFinish={handleAmarisPanelFinish} />}
        {flow.kaelPanel && <KaelPanel onFinish={handleKaelPanelFinish} />}

        {isReady && (
          <div className="relative z-10 flex h-full w-full overflow-hidden">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
              displayName={session.displayName}
              avatar={selectedAvatar}
              onLogout={handleLogout}
            />

            <main className="relative flex-1 min-w-0 overflow-y-auto p-4 sm:p-6">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="absolute top-4 left-4 z-50 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-2 text-[var(--theme-text)] backdrop-blur-xl transition-all hover:bg-[var(--theme-hover)]"
                  aria-label="Abrir menú"
                >
                  <Menu size={20} />
                </button>
              )}

              {activeTab === "dashboard" && (
                <DashboardPage
                  onOpenJournal={() => setActiveSubModule("journal")}
                  onOpenMusic={() => setActiveSubModule("music")}
                  displayName={session.displayName}
                />
              )}

              {activeTab === "chat" && <ChatPage companion={companionParam} />}

              {activeTab === "exercises" && (
                <ExercisesPage
                  companion={companionParam}
                  onNavigateToNearby={() => setActiveTab("nearbyPsychologists")}
                />
              )}

              {activeTab === "emotionalHistory" && <EmotionalHistoryPage />}

              {activeTab === "nearbyPsychologists" && <NearbyPsychologistsPage />}

              {activeTab === "settings" && (
                <SettingsPage
                  selectedUniverse={selectedUniverse}
                  onUniverseChange={(theme) => {
                    setSelectedUniverse(theme);
                    setUniverseChosen(true);
                    const nextAvatar = getFirstAvatarForUniverse(
                      theme,
                      session.gender ?? selectedAvatarProfile?.gender ?? storedProfile?.gender ?? "female"
                    );
                    if (nextAvatar) {
                      persistAvatarProfile({
                        gender: nextAvatar.gender,
                        universe: nextAvatar.universe,
                        avatarId: nextAvatar.id,
                      });
                    }
                  }}
                  selectedCompanion={companionParam}
                  onCompanionChange={setSelectedCompanion}
                  appearanceMode={appearanceMode}
                  onAppearanceModeChange={setAppearanceMode}
                  particlesEnabled={particlesEnabled}
                  onParticlesEnabledChange={setParticlesEnabled}
                  displayName={session.displayName}
                  gender={session.gender ?? selectedAvatarProfile?.gender ?? storedProfile?.gender ?? "female"}
                  selectedAvatar={selectedAvatar}
                  onAvatarChange={(avatar) => {
                    const nextProfile: AvatarProfile = {
                      gender: avatar.gender,
                      universe: avatar.universe,
                      avatarId: avatar.id,
                    };

                    setSelectedUniverse(avatar.universe);
                    setUniverseChosen(true);
                    persistAvatarProfile(nextProfile);
                  }}
                />
              )}

              {activeTab === "profile" && (
                <ProfilePage
                  selectedUniverse={selectedUniverse}
                  selectedCompanion={companionParam}
                  onCompanionChange={setSelectedCompanion}
                  displayName={session.displayName}
                  gender={session.gender ?? selectedAvatarProfile?.gender ?? storedProfile?.gender ?? "female"}
                  selectedAvatar={selectedAvatar}
                />
              )}

              {activeSubModule === "journal" && (
                <JournalPage
                  companion={companionParam}
                  onBack={() => setActiveSubModule("none")}
                />
              )}

              {activeSubModule === "music" && (
                <MusicTherapyPage
                  companion={companionParam}
                  onBack={() => setActiveSubModule("none")}
                />
              )}
            </main>
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}
