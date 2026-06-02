import type { ThemeKey } from "./themeEngine";
import { themes, themeNameByKey } from "./themeEngine";
import type { UserGender } from "../types/avatar";

export interface AvatarOption {
  id: string;
  name: string;
  image: string;
  universe: ThemeKey;
  gender: UserGender;
}

const avatarModules = import.meta.glob("../assets/avatars/*/*/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const formatAvatarName = (value: string) =>
  value
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([0-9])/g, "$1 $2")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const isThemeKey = (value: string): value is ThemeKey => value in themes;
const isGender = (value: string): value is UserGender => value === "female" || value === "male";

export const avatarCatalog = Object.entries(avatarModules)
  .map(([path, image]) => {
    const match = path.match(/avatars\/([^/]+)\/([^/]+)\/([^/.]+)\.png$/);
    if (!match) return null;

    const [, universe, gender, fileName] = match;
    if (!isThemeKey(universe) || !isGender(gender)) return null;

    return {
      id: `${universe}:${gender}:${fileName}`,
      name: formatAvatarName(fileName),
      image,
      universe,
      gender,
    } satisfies AvatarOption;
  })
  .filter((avatar): avatar is AvatarOption => Boolean(avatar))
  .sort((a, b) => a.name.localeCompare(b.name));

export const getAvatarsForUniverse = (universe: ThemeKey, gender: UserGender) =>
  avatarCatalog.filter((avatar) => avatar.universe === universe && avatar.gender === gender);

export const getAvatarById = (avatarId?: string | null) =>
  avatarCatalog.find((avatar) => avatar.id === avatarId) ?? null;

export const getFirstAvatarForUniverse = (universe: ThemeKey, gender: UserGender) =>
  getAvatarsForUniverse(universe, gender)[0] ?? null;

export const getAvatarUniverseLabel = (avatar: AvatarOption) =>
  themeNameByKey[avatar.universe];
