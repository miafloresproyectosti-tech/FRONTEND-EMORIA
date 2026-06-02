import type { AvatarProfile, UserGender } from "../types/avatar";
export type { UserGender, AvatarProfile } from "../types/avatar";

export type UserRole = "USUARIO";

export interface UserSession {
  role: UserRole;
  identifier: string; // DNI o correo (lo que elija el usuario)
  displayName: string;
  createdAt: number;
  gender?: UserGender;
  avatar?: AvatarProfile;
}

export interface UserRecord {
  identifier: string;
  passwordHash: string; // demo
  displayName: string;
  role: UserRole;
  createdAt: number;
  gender?: UserGender;
  avatar?: AvatarProfile;
}


