import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { publicApi } from "../api";

const ContentContext = createContext(undefined);

export function ContentProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const [projData, prodData, catData] = await Promise.all([
        publicApi.getProjects(),
        publicApi.getProducts(),
        publicApi.getProductCategories(),
      ]);
      setProjects(Array.isArray(projData) ? projData : []);
      setProducts(Array.isArray(prodData) ? prodData : []);
      setProductCategories(Array.isArray(catData) ? catData : []);
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
      productCategories,
      isLoading,
      refresh,
    }),
    [projects, products, productCategories, isLoading],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
