import axios from "axios";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: "Basic YWRtaW5AZ21haWwuY29tOmFkbWluQDEyMw==",
  },
});

const publicApiRaw = axios.create({
  baseURL: API_BASE_URL,
});

export const publicApi = {
  getProjects: async () => {
    const res = await publicApiRaw.get("/public/projects");
    return res.data;
  },
  getProjectById: async (id) => {
    const res = await publicApiRaw.get(`/public/projects/${id}`);
    return res.data;
  },
  getProducts: async () => {
    const res = await publicApiRaw.get("/public/products");
    return res.data;
  },
  getProductCategories: async () => {
    const res = await publicApiRaw.get("/public/product-categories");
    return res.data;
  },
  submitContact: async (contact) => {
    const res = await publicApiRaw.post("/public/contact", contact);
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
  getStats: async () => {
    const res = await api.get("/admin/stats");
    return res.data;
  },
  getContacts: async () => {
    const res = await api.get("/admin/contacts");
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
      console.error("Image upload failed.", uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from("images").getPublicUrl(filePath);
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
  markContactRead: async (id) => {
    const res = await api.put(`/admin/contacts/${id}/read`);
    return res.data;
  },
  deleteContact: async (id) => {
    await api.delete(`/admin/contacts/${id}`);
  },
};
