import axios from "axios";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // Basic Auth admin@gmail.com:admin@123
    Authorization: "Basic YWRtaW5AZ21haWwuY29tOmFkbWluQDEyMw==",
  },
});

export const publicApi = {
  getProjects: async () => {
    const res = await api.get("/public/projects");
    return res.data;
  },
  getProjectById: async (id) => {
    const res = await api.get(`/public/projects/${id}`);
    return res.data;
  },
  getProducts: async () => {
    const res = await api.get("/public/products");
    return res.data;
  },
};

export const adminApi = {
  getProjects: async () => {
    const res = await api.get("/admin/projects");
    return res.data;
  },
  getProducts: async () => {
    const res = await api.get("/admin/products");
    return res.data;
  },
  getProductCategories: async () => {
    const res = await api.get("/admin/product-categories");
    return res.data;
  },
  createProject: async (project) => {
    const res = await api.post("/admin/projects", project);
    return res.data;
  },
  updateProject: async (id, project) => {
    const res = await api.put(`/admin/projects/${id}`, project);
    return res.data;
  },
  deleteProject: async (id) => {
    await api.delete(`/admin/projects/${id}`);
  },
  createProduct: async (product) => {
    const res = await api.post("/admin/products", product);
    return res.data;
  },
  updateProduct: async (id, product) => {
    const res = await api.put(`/admin/products/${id}`, product);
    return res.data;
  },
  deleteProduct: async (id) => {
    await api.delete(`/admin/products/${id}`);
  },
  uploadImage: async (file) => {
    const { supabase } = await import("./utils/supabase");
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (uploadError) {
      console.error("❌ Image upload failed. Did you create a PUBLIC bucket named 'images'?", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from("images").getPublicUrl(filePath);
    console.log("✅ Image uploaded. Public URL:", data.publicUrl);
    return data.publicUrl;
  },
  addProjectCategory: async (projectId, name) => {
    const res = await api.post("/admin/project-categories", { projectId, name });
    return res.data;
  },
  addProjectImage: async (categoryId, imageUrl, caption) => {
    const res = await api.post("/admin/project-images", { categoryId, imageUrl, caption });
    return res.data;
  },
};
