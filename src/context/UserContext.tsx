import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AvatarProfile, UserGender } from "../types/avatar";

export interface UserSession {
  role: "USUARIO";
  identifier: string;
  displayName: string;
  gender?: UserGender;
  avatar?: AvatarProfile;
}

interface UserContextType {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de UserProvider");
  }
  return context;
};
