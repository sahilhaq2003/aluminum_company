import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { publicApi } from "../api";

const ContentContext = createContext(undefined);

export function ContentProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const [projData, prodData] = await Promise.all([
        publicApi.getProjects(),
        publicApi.getProducts(),
      ]);
      setProjects(Array.isArray(projData) ? projData : []);
      setProducts(Array.isArray(prodData) ? prodData : []);
    } catch (err) {
      console.error("Failed to fetch content", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(
    () => ({
      projects,
      products,
      isLoading,
      refresh,
    }),
    [projects, products, isLoading],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
