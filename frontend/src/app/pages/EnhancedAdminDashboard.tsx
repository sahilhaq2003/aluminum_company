import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../components/admin/DeleteConfirmModal";
import { ProductFormModal } from "../components/admin/ProductFormModal";
import { ProjectFormModal } from "../components/admin/ProjectFormModal";
import { Badge, Button, Card, Input } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";
import type { Product, Project } from "../types";

type Tab = "overview" | "projects" | "products";
type DashboardTab = Tab | "clients" | "settings";

export default function EnhancedAdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const {
    projects,
    products,
    addProject,
    updateProject,
    deleteProject,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useContent();

  const [tab, setTab] = useState<DashboardTab>("overview");
  const [q, setQ] = useState("");
  const [projectModal, setProjectModal] = useState<Project | null | "new">(null);
  const [productModal, setProductModal] = useState<Product | null | "new">(null);
  const [deleteState, setDeleteState] = useState<{
    type: "project" | "product";
    id: string;
    title: string;
  } | null>(null);

  const filteredProjects = useMemo(
    () =>
      projects.filter((p) =>
        `${p.title} ${p.location} ${p.client}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [projects, q],
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        `${p.name} ${p.category} ${p.description}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [products, q],
  );

  const stats = [
    { label: "Total Projects", value: projects.length },
    { label: "Active Products", value: products.length },
    { label: "Clients", value: "120+" },
    { label: "Revenue", value: "$4.2M" },
  ];

  return (
    <main className="grid min-h-screen grid-cols-[250px_1fr] bg-[#edf1f6]">
      <aside className="flex flex-col border-r border-slate-200 bg-white p-5">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Admin Panel</h2>
          <p className="mt-1 text-sm text-slate-500">Welcome, {user?.username ?? "Admin User"}</p>
        </div>

        <div className="mt-6 space-y-2">
          {(["overview", "projects", "products", "clients", "settings"] as DashboardTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full rounded-md px-4 py-2.5 text-left text-sm font-semibold capitalize transition ${
                tab === t
                  ? "bg-[#1f3f99] text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-auto border-t border-slate-200 pt-4 text-xs text-slate-500">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2026 AlumTech</p>
        </div>
      </aside>

      <section className="p-7">
        <div className="mb-4 flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center gap-6 text-sm text-slate-700">
            <button onClick={() => navigate("/")} className="hover:text-[#1f3f99]">Home</button>
            <button onClick={() => navigate("/projects")} className="hover:text-[#1f3f99]">Projects</button>
            <button onClick={() => navigate("/products")} className="hover:text-[#1f3f99]">Products</button>
            <button onClick={() => navigate("/about")} className="hover:text-[#1f3f99]">About</button>
            <button onClick={() => navigate("/contact")} className="hover:text-[#1f3f99]">Contact</button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-500">+1 234 567 890</p>
            <Button className="border border-slate-300 bg-white text-slate-900" onClick={() => navigate("/admin")}>
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
              {tab === "clients" && "Manage all your client relationships"}
              {tab === "settings" && "Manage your account and application preferences"}
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
              {stats.map((s) => (
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
                  {projects.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center justify-between rounded-md bg-slate-50 p-3">
                      <div>
                        <p className="font-semibold text-slate-900">{p.title}</p>
                        <p className="text-sm text-slate-600">{p.client} - {p.year}</p>
                      </div>
                      <Badge className="bg-[#1f3f99] text-white">Completed</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-md p-5">
                <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <Button className="w-full bg-[#1f3f99] text-white" onClick={() => setProjectModal("new")}>
                    Add New Project
                  </Button>
                  <Button className="w-full bg-[#1f3f99] text-white" onClick={() => setProductModal("new")}>
                    Add New Product
                  </Button>
                  <Button className="w-full border border-slate-300 bg-white text-slate-900" onClick={() => setTab("clients")}>
                    Manage Clients
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {tab === "projects" && (
          <Card className="overflow-hidden rounded-md">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h3 className="text-lg font-bold text-slate-900">Projects Management</h3>
              <Button className="bg-[#1f3f99] text-white" onClick={() => setProjectModal("new")}>
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
                    <th>Category</th>
                    <th>Status</th>
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
                      <td>{p.category}</td>
                      <td>
                        <Badge className={p.year < new Date().getFullYear() ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>
                          {p.year < new Date().getFullYear() ? "Completed" : "In Progress"}
                        </Badge>
                      </td>
                      <td className="space-x-3">
                        <button className="font-semibold text-[#1f3f99]" onClick={() => setProjectModal(p)}>Edit</button>
                        <button className="font-semibold text-red-600" onClick={() => setDeleteState({ type: "project", id: p.id, title: p.title })}>Delete</button>
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
              <h3 className="text-lg font-bold text-slate-900">Products Management</h3>
              <Button className="bg-[#1f3f99] text-white" onClick={() => setProductModal("new")}>
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
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="border-t border-slate-200">
                      <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.price}</td>
                      <td>{p.stock}</td>
                      <td>
                        <Badge className={p.stock > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}>
                          {p.stock > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="space-x-3">
                        <button className="font-semibold text-[#1f3f99]" onClick={() => setProductModal(p)}>Edit</button>
                        <button className="font-semibold text-red-600" onClick={() => setDeleteState({ type: "product", id: p.id, title: p.name })}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {tab === "clients" && (
          <Card className="rounded-md p-10 text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-2xl">👥</div>
            <h3 className="text-2xl font-bold text-slate-900">Client Management Coming Soon</h3>
            <p className="mt-2 text-slate-600">
              This feature will allow you to manage client information, track communications, and more.
            </p>
          </Card>
        )}

        {tab === "settings" && (
          <Card className="rounded-md p-5">
            <div className="mb-4 flex gap-3 text-sm">
              <span className="rounded-md bg-[#1f3f99] px-3 py-1 text-white">General</span>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-slate-700">Company Info</span>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-slate-700">Security</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">General Settings</h3>
            <div className="mt-4 grid gap-3">
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-700">Site Name</p>
                <Input value="AlumTech" readOnly />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-700">Contact Email</p>
                <Input value="info@alumtech.com" readOnly />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-700">Phone Number</p>
                <Input value="+1 234 567 890" readOnly />
              </div>
            </div>
            <Button className="mt-4 bg-[#1f3f99] text-white">Save Changes</Button>
          </Card>
        )}
      </section>

      <ProjectFormModal
        open={projectModal !== null}
        initial={projectModal && projectModal !== "new" ? projectModal : undefined}
        onClose={() => setProjectModal(null)}
        onSubmit={(p) => {
          if (projectModal === "new") addProject(p);
          else updateProject(p);
          setProjectModal(null);
          toast.success("Project saved");
        }}
      />

      <ProductFormModal
        open={productModal !== null}
        initial={productModal && productModal !== "new" ? productModal : undefined}
        onClose={() => setProductModal(null)}
        onSubmit={(p) => {
          if (productModal === "new") addProduct(p);
          else updateProduct(p);
          setProductModal(null);
          toast.success("Product saved");
        }}
      />

      <DeleteConfirmModal
        open={deleteState !== null}
        title={`Delete ${deleteState?.title}?`}
        onClose={() => setDeleteState(null)}
        onConfirm={() => {
          if (!deleteState) return;
          if (deleteState.type === "project") deleteProject(deleteState.id);
          else deleteProduct(deleteState.id);
          toast.success("Deleted");
          setDeleteState(null);
        }}
      />
    </main>
  );
}
