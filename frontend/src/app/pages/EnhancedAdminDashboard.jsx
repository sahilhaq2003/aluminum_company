import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../components/admin/DeleteConfirmModal";
import { ProductFormModal } from "../components/admin/ProductFormModal";
import { ProjectFormModal } from "../components/admin/ProjectFormModal";
import { Badge, Button, Card, Input } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";
import { adminApi } from "../api";

export default function EnhancedAdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { projects, products, isLoading, refresh } = useContent();

  const [tab, setTab] = useState("overview");
  const [q, setQ] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [projectModal, setProjectModal] = useState(null);
  const [productModal, setProductModal] = useState(null);
  const [deleteState, setDeleteState] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ totalProjects: 0, totalProducts: 0, totalContacts: 0, unreadContacts: 0 });
  const [adminProjects, setAdminProjects] = useState([]);

  useEffect(() => {
    adminApi.getProductCategories().then(setProductCategories).catch(() => {});
    loadContacts();
    loadStats();
    loadAdminProjects();
  }, []);

  const loadAdminProjects = async () => {
    try {
      const data = await adminApi.getProjects();
      setAdminProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load admin projects", err);
    }
  };

  const loadContacts = async () => {
    try {
      const data = await adminApi.getContacts();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load contacts", err);
    }
  };

  const loadStats = async () => {
    try {
      const data = await adminApi.getStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProjects = useMemo(
    () =>
      adminProjects.filter((p) =>
        `${p.title} ${p.location} ${p.client}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [adminProjects, q],
  );

  const filteredProducts = useMemo(
    () =>
      safeProducts.filter((p) =>
        `${p.name} ${p.categoryName} ${p.description}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [safeProducts, q],
  );

  const overviewStats = [
    { label: "Total Projects", value: stats.totalProjects || adminProjects.length },
    { label: "Active Products", value: stats.totalProducts || safeProducts.length },
    { label: "Contact Messages", value: stats.totalContacts || contacts.length },
    { label: "Unread Messages", value: stats.unreadContacts || contacts.filter(c => !c.read).length },
  ];

  const handleProjectSubmit = async (p) => {
    try {
      if (projectModal === "new") {
        await adminApi.createProject(p);
        toast.success("Project created");
      } else if (projectModal) {
        await adminApi.updateProject(projectModal.id, p);
        toast.success("Project updated");
      }
      refresh();
      loadAdminProjects();
      setProjectModal(null);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleProductSubmit = async (p) => {
    try {
      if (productModal === "new") {
        await adminApi.createProduct(p);
        toast.success("Product created");
      } else if (productModal) {
        await adminApi.updateProduct(productModal.id, p);
        toast.success("Product updated");
      }
      refresh();
      setProductModal(null);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteState) return;
    try {
      if (deleteState.type === "project") {
        await adminApi.deleteProject(deleteState.id);
      } else if (deleteState.type === "product") {
        await adminApi.deleteProduct(deleteState.id);
      } else if (deleteState.type === "contact") {
        await adminApi.deleteContact(deleteState.id);
        loadContacts();
        loadStats();
      }
      toast.success("Deleted successfully");
      refresh();
      loadAdminProjects();
      setDeleteState(null);
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await adminApi.markContactRead(id);
      loadContacts();
      loadStats();
    } catch (err) {
      toast.error("Failed to mark as read");
    }
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">Loading...</div>
    );

  return (
    <main className="grid min-h-screen grid-cols-[250px_1fr] bg-[#edf1f6]">
      <aside className="flex flex-col border-r border-slate-200 bg-white p-5">
        <div>
          <img src="/logo.svg" alt="AlumTech" className="h-7 w-auto" />
          <p className="mt-2 text-sm text-slate-500">
            Welcome, {user?.username ?? "Admin User"}
          </p>
        </div>

        <div className="mt-6 space-y-2">
          {["overview", "projects", "products", "contacts", "settings"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                if (t === "contacts") loadContacts();
                if (t === "overview") loadStats();
              }}
              className={`w-full rounded-md px-4 py-2.5 text-left text-sm font-semibold capitalize transition ${
                tab === t
                  ? "bg-[#C2410C] text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t}
              {t === "contacts" && contacts.filter(c => !c.read).length > 0 && (
                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {contacts.filter(c => !c.read).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto border-t border-slate-200 pt-4 text-xs text-slate-500">
          <p>Version 1.0.0</p>
          <p className="mt-1">&copy; 2026 AlumTech</p>
        </div>
      </aside>

      <section className="p-7">
        <div className="mb-4 flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-6 text-sm text-slate-700">
            <button onClick={() => navigate("/")} className="hover:text-[#C2410C]">
              Home
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="hover:text-[#C2410C]"
            >
              Projects
            </button>
            <button
              onClick={() => navigate("/products")}
              className="hover:text-[#C2410C]"
            >
              Products
            </button>
            <button
              onClick={() => navigate("/about")}
              className="hover:text-[#C2410C]"
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-[#C2410C]"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-500">+1 234 567 890</p>
            <Button
              className="border border-slate-300 bg-white text-slate-900"
              onClick={() => navigate("/admin")}
            >
              Dashboard
            </Button>
            <Button
              className="border border-red-200 bg-white text-red-600"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black capitalize text-slate-900">{tab}</h1>
            <p className="text-sm text-slate-600">
              {tab === "overview" && "Track key business metrics"}
              {tab === "projects" && "Manage full project portfolio"}
              {tab === "products" && "Manage all products and inventory"}
              {tab === "contacts" && "View and manage contact form submissions"}
              {tab === "settings" &&
                "Manage your account and application preferences"}
            </p>
          </div>
          {(tab === "projects" || tab === "products") && (
            <Input
              className="max-w-sm border-slate-300 bg-white"
              placeholder={`Search ${tab}...`}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          )}
        </div>

        {tab === "overview" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              {overviewStats.map((s) => (
                <Card key={s.label} className="rounded-md p-5 shadow-sm">
                  <p className="text-sm text-slate-500">{s.label}</p>
                  <p className="mt-1 text-3xl font-black text-slate-900">{s.value}</p>
                </Card>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Card className="rounded-md p-5">
                <h3 className="text-xl font-bold text-slate-900">Recent Projects</h3>
                <div className="mt-4 space-y-3">
                  {adminProjects.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between rounded-md bg-slate-50 p-3"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{p.title}</p>
                        <p className="text-sm text-slate-600">
                          {p.client} - {p.year}
                        </p>
                      </div>
                      <Badge className="bg-[#C2410C] text-white">Completed</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-md p-5">
                <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <Button
                    className="w-full bg-[#C2410C] text-white"
                    onClick={() => setProjectModal("new")}
                  >
                    Add New Project
                  </Button>
                  <Button
                    className="w-full bg-[#C2410C] text-white"
                    onClick={() => setProductModal("new")}
                  >
                    Add New Product
                  </Button>
                  <Button
                    className="w-full border border-slate-300 bg-white text-slate-900"
                    onClick={() => {
                      setTab("contacts");
                      loadContacts();
                    }}
                  >
                    View Messages ({contacts.filter(c => !c.read).length} unread)
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === "projects" && (
          <Card className="overflow-hidden rounded-md">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h3 className="text-lg font-bold text-slate-900">
                Projects Management
              </h3>
              <Button
                className="bg-[#C2410C] text-white"
                onClick={() => setProjectModal("new")}
              >
                + New Project
              </Button>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="p-3">Title</th>
                    <th>Client</th>
                    <th>Location</th>
                    <th>Year</th>
                    <th>Gallery</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((p) => (
                    <tr key={p.id} className="border-t border-slate-200">
                      <td className="p-3 font-semibold text-slate-900">{p.title}</td>
                      <td>{p.client}</td>
                      <td>{p.location}</td>
                      <td>{p.year}</td>
                      <td>
                        {p.categories && p.categories.length > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-[#EA580C]/10 px-2 py-1 text-xs font-semibold text-[#EA580C]">
                            {p.categories.length} {p.categories.length === 1 ? "category" : "categories"}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">None</span>
                        )}
                      </td>
                      <td className="space-x-3">
                        <button
                          className="font-semibold text-[#C2410C]"
                          onClick={() => setProjectModal(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="font-semibold text-red-600"
                          onClick={() =>
                            setDeleteState({
                              type: "project",
                              id: p.id,
                              title: p.title,
                            })
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {tab === "products" && (
          <Card className="overflow-hidden rounded-md">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h3 className="text-lg font-bold text-slate-900">
                Products Management
              </h3>
              <Button
                className="bg-[#C2410C] text-white"
                onClick={() => setProductModal("new")}
              >
                + New Product
              </Button>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="p-3">Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="border-t border-slate-200">
                      <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                      <td>{p.categoryName}</td>
                      <td>{p.price}</td>
                      <td>{p.stock}</td>
                      <td className="space-x-3">
                        <button
                          className="font-semibold text-[#C2410C]"
                          onClick={() => setProductModal(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="font-semibold text-red-600"
                          onClick={() =>
                            setDeleteState({
                              type: "product",
                              id: p.id,
                              title: p.name,
                            })
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {tab === "contacts" && (
          <Card className="overflow-hidden rounded-md">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h3 className="text-lg font-bold text-slate-900">
                Contact Messages ({contacts.length})
              </h3>
              <Button
                className="border border-slate-300 bg-white text-slate-900"
                onClick={() => {
                  loadContacts();
                  loadStats();
                }}
              >
                Refresh
              </Button>
            </div>
            {contacts.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                No contact messages yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className={`p-4 ${!c.read ? "bg-orange-50" : "bg-white"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">{c.fullName}</p>
                          {!c.read && (
                            <Badge className="bg-orange-500 text-white text-[10px]">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{c.email} {c.phone ? `- ${c.phone}` : ""} {c.company ? `(${c.company})` : ""}</p>
                        <p className="mt-1 font-medium text-slate-700">{c.subject}</p>
                        <p className="mt-1 text-sm text-slate-600">{c.message}</p>
                        <p className="mt-2 text-xs text-slate-400">
                          {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {!c.read && (
                          <Button
                            className="border border-slate-300 bg-white text-slate-700 text-xs"
                            onClick={() => handleMarkRead(c.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        <button
                          className="text-red-500 hover:text-red-700 text-xs font-semibold"
                          onClick={() =>
                            setDeleteState({
                              type: "contact",
                              id: c.id,
                              title: `message from ${c.fullName}`,
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {tab === "settings" && (
          <Card className="rounded-md p-5">
            <div className="mb-4 flex gap-3 text-sm">
              <span className="rounded-md bg-[#C2410C] px-3 py-1 text-white">
                General
              </span>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-slate-700">
                Company Info
              </span>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-slate-700">
                Security
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">General Settings</h3>
            <div className="mt-4 grid gap-3">
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-700">Site Name</p>
                <Input value="AlumTech" readOnly />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-700">
                  Contact Email
                </p>
                <Input value="info@alumtech.com" readOnly />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-700">
                  Phone Number
                </p>
                <Input value="+1 234 567 890" readOnly />
              </div>
            </div>
            <Button className="mt-4 bg-[#C2410C] text-white">Save Changes</Button>
          </Card>
        )}
      </section>

      <ProjectFormModal
        open={projectModal !== null}
        initial={projectModal && projectModal !== "new" ? projectModal : undefined}
        productCategories={productCategories}
        onClose={() => setProjectModal(null)}
        onSubmit={handleProjectSubmit}
      />

      <ProductFormModal
        open={productModal !== null}
        categories={productCategories}
        initial={productModal && productModal !== "new" ? productModal : undefined}
        onClose={() => setProductModal(null)}
        onSubmit={handleProductSubmit}
      />

      <DeleteConfirmModal
        open={deleteState !== null}
        title={`Delete ${deleteState?.title}?`}
        onClose={() => setDeleteState(null)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  );
}
