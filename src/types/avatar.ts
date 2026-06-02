import type { ThemeKey } from "../themes/themeEngine";

export type UserGender = "female" | "male";

export interface AvatarProfile {
  gender: UserGender;
  universe: ThemeKey;
  avatarId: string;
}
