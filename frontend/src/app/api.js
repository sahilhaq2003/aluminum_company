import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

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
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/admin/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.imageId;
  },
  addProjectCategory: async (projectId, name) => {
    const res = await api.post("/admin/project-categories", { projectId, name });
    return res.data;
  },
  addProjectImage: async (categoryId, imageId, caption) => {
    const res = await api.post("/admin/project-images", { categoryId, imageId, caption });
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
