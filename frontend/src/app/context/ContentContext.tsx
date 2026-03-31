import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product, Project } from "../types";

type ContentContextType = {
  projects: Project[];
  products: Product[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
};

const STORAGE_KEY = "alum-content-v1";

const seedProjects: Project[] = [
  {
    id: "p1",
    title: "Skyline Business Tower",
    client: "Skyline Developments",
    location: "Dubai, UAE",
    year: 2025,
    category: "Curtain Walls",
    description: "Premium curtain wall package with thermally broken framing.",
    challenge: "Extreme heat and wind load requirements.",
    solution: "High-performance glazed curtain wall with reinforced anchors.",
    scope: "Design, fabrication, installation, and commissioning.",
    results: "24% improvement in energy performance against baseline.",
    mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "p2",
    title: "Azure Residences",
    client: "Azure Properties",
    location: "Doha, Qatar",
    year: 2024,
    category: "Windows",
    description: "Full window systems for a luxury residential complex.",
    challenge: "Acoustic insulation near high-traffic urban corridor.",
    solution: "Multi-chamber aluminium profiles with acoustic glazing.",
    mainImage: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1400&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"],
  },
  {
    id: "p3",
    title: "Northgate Logistics Hub",
    client: "Northgate Industrial",
    location: "Riyadh, KSA",
    year: 2026,
    category: "Doors",
    description: "Industrial aluminium door systems for high-use operations.",
    challenge: "Continuous heavy-duty operation and corrosion resistance.",
    solution: "Anodized finishes with reinforced hinges and seals.",
    mainImage: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=1400&auto=format&fit=crop",
    gallery: [],
  },
];

const seedProducts: Product[] = [
  {
    id: "pr1",
    name: "Thermal Sliding Window System",
    category: "Windows",
    description: "Slim profile aluminium sliding system with thermal break.",
    price: "$220 / sq.m",
    stock: 44,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop",
    features: ["Thermal break", "Acoustic insulation", "Powder-coated finish"],
    specifications: [
      { label: "Frame Depth", value: "120 mm" },
      { label: "Finish", value: "Anodized/Powder Coat" },
    ],
  },
  {
    id: "pr2",
    name: "Heavy Duty Pivot Door",
    category: "Doors",
    description: "Architectural pivot door for premium entries.",
    price: "$1,850 / unit",
    stock: 8,
    image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=1200&auto=format&fit=crop",
    features: ["Soft close", "Multi-lock option"],
    specifications: [{ label: "Max Height", value: "3.2 m" }],
  },
  {
    id: "pr3",
    name: "Unitized Curtain Wall",
    category: "Curtain Walls",
    description: "Factory-assembled unitized curtain wall for towers.",
    price: "$390 / sq.m",
    stock: 0,
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop",
    features: ["Fast installation", "High weather resistance"],
    specifications: [{ label: "U-Value", value: "1.8 W/m2K" }],
  },
];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ projects: Project[]; products: Product[] }>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { projects: seedProjects, products: seedProducts };
  });

  const persist = (next: { projects: Project[]; products: Product[] }) => {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const value = useMemo<ContentContextType>(
    () => ({
      projects: state.projects,
      products: state.products,
      addProject: (project) => persist({ ...state, projects: [project, ...state.projects] }),
      updateProject: (project) =>
        persist({
          ...state,
          projects: state.projects.map((p) => (p.id === project.id ? project : p)),
        }),
      deleteProject: (id) => persist({ ...state, projects: state.projects.filter((p) => p.id !== id) }),
      addProduct: (product) => persist({ ...state, products: [product, ...state.products] }),
      updateProduct: (product) =>
        persist({
          ...state,
          products: state.products.map((p) => (p.id === product.id ? product : p)),
        }),
      deleteProduct: (id) => persist({ ...state, products: state.products.filter((p) => p.id !== id) }),
    }),
    [state],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
