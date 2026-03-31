import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AdminUser } from "../types";

type AuthContextType = {
  user: AdminUser | null;
  login: (username: string, password: string, remember: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

const STORAGE_KEY = "alum-auth-user";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  });

  const login = (username: string, password: string, remember: boolean): boolean => {
    if (username === "admin" && password === "admin123") {
      const nextUser = { username };
      setUser(nextUser);
      if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: Boolean(user) }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
