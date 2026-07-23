import { Navigate, createBrowserRouter } from "react-router";
import { MainLayout } from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EnhancedAdminDashboard from "./pages/EnhancedAdminDashboard";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProductsPage from "./pages/ProductsPage";

function Protected({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

const NotFound = () => (
  <main className="mx-auto w-[min(900px,92vw)] py-20">
    <h1 className="text-4xl font-black">404 - Page not found</h1>
  </main>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:id", element: <ProjectDetailPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <Protected>
        <EnhancedAdminDashboard />
      </Protected>
    ),
  },
  { path: "*", element: <NotFound /> },
]);
