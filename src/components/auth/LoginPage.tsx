import { useMemo, useState } from "react";

import { Mars, UserRound, Venus } from "lucide-react";

import { login, register, userExists } from "../../auth/authStore";
import type { AvatarProfile, UserGender, UserRole } from "../../auth/types";

interface LoginPageProps {
  onLoggedIn: (
    session: { role: UserRole; identifier: string; displayName: string; gender?: UserGender; avatar?: AvatarProfile },
    isNewUser: boolean
  ) => void;
}

export default function LoginPage({ onLoggedIn }: LoginPageProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [gender, setGender] = useState<UserGender | null>(null);

  const role: UserRole = "USUARIO";
  const [mode, setMode] = useState<"choose" | "login" | "register">("choose");
  const trimmedIdentifier = identifier.trim();
  const isValidIdentifier = trimmedIdentifier.length >= 3;

  const userStatus = useMemo<"existing" | "new" | "unknown">(() => {
    if (!isValidIdentifier) return "unknown";
    return userExists(trimmedIdentifier) ? "existing" : "new";
  }, [isValidIdentifier, trimmedIdentifier]);

  const canSubmit =
    isValidIdentifier &&
    password.trim().length >= 4 &&
    !loading &&
    mode !== "choose" &&
    (mode === "login" || Boolean(gender));

  const handleSubmit = async () => {
    setError(null);
    setInfo(null);

    if (!isValidIdentifier) {
      setError("Ingresa tu usuario (mínimo 3 caracteres).");
      return;
    }

    if (password.trim().length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    if (mode === "register" && !gender) {
      setError("Selecciona femenino o masculino para mostrarte personajes compatibles.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        if (userStatus === "new") {
          throw new Error("USER_NOT_FOUND");
        }

        const session = login({
          role,
          identifier: trimmedIdentifier,
          password,
        });

        onLoggedIn(
          {
            role: session.role,
            identifier: session.identifier,
            displayName: session.displayName,
            gender: session.gender,
            avatar: session.avatar,
          },
          false
        );

        setInfo(`Hola de nuevo, ${session.displayName}. Gracias por volver a EMORIA.`);
      } else {
        if (userStatus === "existing") {
          throw new Error("USER_EXISTS");
        }

        const session = register({
          role,
          identifier: trimmedIdentifier,
          password,
          displayName: trimmedIdentifier,
          gender: gender ?? "female",
        });

        onLoggedIn(
          {
            role: session.role,
            identifier: session.identifier,
            displayName: session.displayName,
            gender: session.gender,
          },
          true
        );

        setInfo(
          "¡Bienvenido a EMORIA! Esta plataforma es totalmente discreta y está diseñada para ayudarte a explorar tu estado emocional usando solo usuario y contraseña."
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "USER_NOT_FOUND") {
          setError("No se encontró una cuenta con ese usuario. Si eres nuevo, regístrate primero.");
        } else if (err.message === "USER_EXISTS") {
          setError("El usuario ya existe. Selecciona iniciar sesión para acceder.");
        } else if (err.message === "INVALID_CREDENTIALS") {
          setError("Contraseña incorrecta. Revisa e inténtalo otra vez.");
        } else {
          setError("Ocurrió un error. Revisa tus datos e inténtalo nuevamente.");
        }
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderChoice = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-block rounded-2xl bg-gradient-to-br from-[rgba(90,240,255,0.2)] to-[rgba(175,90,255,0.2)] p-3 border border-white/10">
          <svg className="w-6 h-6 text-[rgba(90,240,255,0.9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 font-semibold">Bienvenido a</p>
          <h1 className="text-5xl font-black text-white mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[rgba(90,240,255,0.95)] to-[rgba(175,90,255,0.95)]">EMORIA</h1>
        </div>
        <p className="text-base leading-relaxed text-white/60">
          Tu espacio seguro y discreto para explorar tu estado emocional. Solo necesitas usuario y contraseña.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-semibold">¿Qué deseas hacer?</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => {
              setMode("login");
              setError(null);
              setInfo(null);
            }}
            className="group rounded-2xl border border-white/10 bg-gradient-to-br from-[rgba(90,240,255,0.1)] to-transparent px-5 py-5 text-left text-white transition hover:border-[rgba(90,240,255,0.4)] hover:bg-[rgba(90,240,255,0.12)] hover:shadow-[0_0_20px_rgba(90,240,255,0.15)]"
            type="button"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-white/50 group-hover:text-white/70 transition">Acceso</p>
                <p className="mt-2 text-base font-bold text-white">Tengo cuenta</p>
                <p className="mt-1 text-xs text-white/50">Ingresa con tus credenciales</p>
              </div>
              <div className="text-[rgba(90,240,255,0.6)] group-hover:text-[rgba(90,240,255,0.9)] transition">→</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMode("register");
              setError(null);
              setInfo(null);
            }}
            className="group rounded-2xl border border-white/10 bg-gradient-to-br from-[rgba(175,90,255,0.1)] to-transparent px-5 py-5 text-left text-white transition hover:border-[rgba(175,90,255,0.4)] hover:bg-[rgba(175,90,255,0.12)] hover:shadow-[0_0_20px_rgba(175,90,255,0.15)]"
            type="button"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-white/50 group-hover:text-white/70 transition">Nuevo aquí</p>
                <p className="mt-2 text-base font-bold text-white">Crear cuenta</p>
                <p className="mt-1 text-xs text-white/50">Regístrate en segundos</p>
              </div>
              <div className="text-[rgba(175,90,255,0.6)] group-hover:text-[rgba(175,90,255,0.9)] transition">→</div>
            </div>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur px-4 py-3 text-xs text-white/50 space-y-1">
        <p className="font-semibold text-white/60">🔒 Privacidad asegurada</p>
        <p>Solo utilizamos usuario y contraseña. Tus datos emocionales permanecen seguros.</p>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold">{mode === "login" ? "Acceso" : "Registro"}</p>
          <h2 className="text-3xl font-black text-white">
            {mode === "login" ? "Accede a EMORIA" : "Únete a EMORIA"}
          </h2>
          <p className="text-sm text-white/60 mt-2">
            {mode === "login" 
              ? "Ingresa con tu usuario y contraseña para continuar."
              : "Crea tu cuenta en solo dos pasos: usuario y contraseña."}
          </p>
        </div>
        <button
          onClick={() => {
            setMode("choose");
            setError(null);
            setInfo(null);
            setPassword("");
            setIdentifier("");
            setGender(null);
          }}
          className="text-sm text-white/50 hover:text-white/80 transition font-medium flex items-center gap-1 whitespace-nowrap"
          type="button"
        >
          ← Volver
        </button>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-white/70">Usuario</span>
          <div className="mt-2 relative group">
            <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[rgba(90,240,255,0.7)] transition" size={18} />
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full h-[48px] rounded-xl border border-white/10 bg-white/[0.02] pl-12 pr-4 text-white outline-none transition focus:border-[rgba(90,240,255,0.5)] focus:bg-white/[0.05] focus:shadow-[0_0_12px_rgba(90,240,255,0.1)]"
              placeholder="ej: Merle"
              type="text"
              autoComplete="username"
            />
          </div>
          {isValidIdentifier && (
            <p className="mt-2 text-xs text-white/50">
              {userStatus === "existing" 
                ? "✓ Usuario encontrado" 
                : userStatus === "new"
                ? "✓ Usuario disponible"
                : ""}
            </p>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-white/70">Contraseña</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[48px] rounded-xl border border-white/10 bg-white/[0.02] px-4 text-white outline-none transition focus:border-[rgba(90,240,255,0.5)] focus:bg-white/[0.05] focus:shadow-[0_0_12px_rgba(90,240,255,0.1)]"
            placeholder="Min. 4 caracteres"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </label>

        {mode === "register" && (
          <div className="block">
            <span className="text-sm font-semibold text-white/70">Avatar</span>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {([
                { value: "female", label: "Femenino", Icon: Venus },
                { value: "male", label: "Masculino", Icon: Mars },
              ] as const).map((option) => {
                const Icon = option.Icon;
                const selected = gender === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => setGender(option.value)}
                    className={`flex h-[48px] items-center justify-center gap-2 rounded-xl border font-bold transition ${
                      selected
                        ? "border-[rgba(90,240,255,0.55)] bg-[rgba(90,240,255,0.14)] text-white shadow-[0_0_16px_rgba(90,240,255,0.16)]"
                        : "border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/[0.05] hover:text-white"
                    }`}
                    type="button"
                  >
                    <Icon size={18} />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {userStatus !== "unknown" && (
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4 text-sm text-white/70">
          {mode === "login" ? (
            userStatus === "existing" ? (
              <p className="text-white/80">✓ <span className="font-semibold">Cuenta encontrada</span> — Ingresa tu contraseña para continuar.</p>
            ) : (
              <p className="text-white/80">✗ <span className="font-semibold">No existe esta cuenta</span> — Si eres nuevo, vuelve atrás para registrarte.</p>
            )
          ) : userStatus === "new" ? (
            <p className="text-white/80">✓ <span className="font-semibold">Usuario disponible</span> — Continúa para completar tu registro.</p>
          ) : (
            <p className="text-white/80">✗ <span className="font-semibold">Usuario ya existe</span> — Si ya tienes cuenta, vuelve atrás e inicia sesión.</p>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {info && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          <p className="font-semibold">Éxito</p>
          <p>{info}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full h-[52px] rounded-xl bg-gradient-to-r from-[rgba(90,240,255,0.25)] to-[rgba(90,240,255,0.15)] border border-[rgba(90,240,255,0.5)] text-white font-bold transition hover:from-[rgba(90,240,255,0.35)] hover:to-[rgba(90,240,255,0.25)] hover:shadow-[0_0_20px_rgba(90,240,255,0.2)] disabled:opacity-50 disabled:hover:from-[rgba(90,240,255,0.25)] disabled:hover:to-[rgba(90,240,255,0.15)] disabled:hover:shadow-none"
        type="button"
      >
        {loading ? "Procesando..." : mode === "login" ? "Iniciar sesión" : "Crear mi cuenta"}
      </button>

      <p className="text-white/40 text-xs text-center">
        {mode === "login" ? "¿Eres nuevo? Vuelve atrás para registrarte" : "¿Ya tienes cuenta? Vuelve atrás e inicia sesión"}
      </p>
    </div>
  );

  return (
    <div className="relative w-full min-h-dvh flex items-center justify-center p-4 bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-[rgba(90,240,255,0.25)] blur-[110px]" />
        <div className="absolute -bottom-60 -left-60 w-[520px] h-[520px] rounded-full bg-[rgba(175,90,255,0.20)] blur-[130px]" />
      </div>

      <div className="relative w-full max-w-xl rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.55)] p-6 sm:p-8">
        {mode === "choose" ? renderChoice() : renderForm()}
      </div>
    </div>
  );
}

