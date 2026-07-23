import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "alum-auth-user";
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const login = (username, password, remember) => {
    if (username === "admin@gmail.com" && password === "admin@123") {
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
