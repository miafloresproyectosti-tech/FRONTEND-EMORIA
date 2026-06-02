import type { AvatarProfile, UserGender, UserSession, UserRole } from "./types";

const STORAGE_KEY = "emoria_session_v1";
const USERS_KEY = "emoria_users_v1";


export type LoginPayload = {
  identifier: string; // nombre de usuario
  displayName?: string;
  role: UserRole; // solo USUARIO
  gender?: UserGender;
};

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  return safeParse<UserSession>(window.localStorage.getItem(STORAGE_KEY));
}

function getUsers(): Record<string, import("./types").UserRecord> {
  const raw = window.localStorage.getItem(USERS_KEY);
  const parsed = safeParse<Record<string, import("./types").UserRecord>>(raw);
  return parsed ?? {};
}

function setUsers(users: Record<string, import("./types").UserRecord>) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function userExists(identifier: string): boolean {
  if (typeof window === "undefined") return false;
  const id = identifier.trim();
  if (!id) return false;
  return Boolean(getUsers()[id]);
}

function simpleHash(input: string): string {
  // Demo only. Backend will replace this.
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

export function register(payload: {
  identifier: string;
  password: string;
  displayName?: string;
  role: UserRole;
  gender: UserGender;
}): UserSession {
  const id = payload.identifier.trim();
  const displayName = (payload.displayName && payload.displayName.trim()) || id;
  const passwordHash = simpleHash(payload.password);

  const users = getUsers();
  const existing = users[id];
  if (existing) {
    throw new Error("USER_EXISTS");
  }

  users[id] = {
    identifier: id,
    passwordHash,
    displayName,
    role: payload.role,
    createdAt: Date.now(),
    gender: payload.gender,
  };
  setUsers(users);

  const session: UserSession = {
    role: payload.role,
    identifier: id,
    displayName,
    createdAt: Date.now(),
    gender: payload.gender,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function login(payload: { identifier: string; password: string; role: UserRole; displayName?: string }): UserSession {
  const id = payload.identifier.trim();
  const users = getUsers();
  const existing = users[id];
  const passwordHash = simpleHash(payload.password);

  if (!existing) {
    throw new Error("USER_NOT_FOUND");
  }

  if (existing.passwordHash !== passwordHash) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const session: UserSession = {
    role: existing.role,
    identifier: existing.identifier,
    displayName: existing.displayName,
    createdAt: Date.now(),
    gender: existing.gender,
    avatar: existing.avatar,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}


export function logout(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function updateUserProfile(
  identifier: string,
  updates: { gender?: UserGender; avatar?: AvatarProfile }
): UserSession | null {
  if (typeof window === "undefined") return null;

  const id = identifier.trim();
  const users = getUsers();
  const existing = users[id];
  if (!existing) return null;

  users[id] = {
    ...existing,
    ...updates,
  };
  setUsers(users);

  const currentSession = getSession();
  if (!currentSession || currentSession.identifier !== id) return currentSession;

  const nextSession: UserSession = {
    ...currentSession,
    ...updates,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
  return nextSession;
}

