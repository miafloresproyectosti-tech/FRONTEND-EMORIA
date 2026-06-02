import { createContext, useContext } from "react";

import type { ThemeKey } from "../themes/themeEngine";
import type { EmoriaTheme } from "../themes/themeEngine";

interface ThemeContextType {
  currentUniverse: ThemeKey;
  currentTheme: EmoriaTheme;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const useTheme = () => useContext(ThemeContext);
