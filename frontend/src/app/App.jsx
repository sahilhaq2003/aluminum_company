import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ContentProvider>{children}</ContentProvider>
    </AuthProvider>
  );
}
