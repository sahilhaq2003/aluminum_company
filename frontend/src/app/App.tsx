import type { ReactNode } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ContentProvider>{children}</ContentProvider>
    </AuthProvider>
  );
}
