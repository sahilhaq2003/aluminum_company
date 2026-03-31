export type Category = "Windows" | "Doors" | "Facades" | "Curtain Walls";

export type Project = {
  id: string;
  title: string;
  client: string;
  location: string;
  year: number;
  category: Category;
  description: string;
  challenge: string;
  solution: string;
  scope?: string;
  results?: string;
  mainImage: string;
  gallery: string[];
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: string;
  stock: number;
  image: string;
  features: string[];
  specifications: ProductSpec[];
};

export type AdminUser = {
  username: string;
};
