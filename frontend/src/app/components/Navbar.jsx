import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-[min(1200px,92vw)] items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold text-[#0A2463]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-[4px] bg-[#1f3f99] text-sm font-bold text-white">
              AL
            </span>
            <span className="text-lg tracking-tight">AlumTech</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition ${
                    isActive
                      ? "text-[#0A2463] underline underline-offset-8"
                      : "text-slate-700 hover:text-[#0A2463]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <p className="hidden text-sm text-slate-600 lg:block">+1 234 567 890</p>
            {user ? (
              <>
                <Link
                  to="/admin"
                  className="btn-box bg-[#1f3f99] text-white rounded-[4px] px-4 py-2 text-sm font-semibold"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-box border border-red-200 text-red-600 rounded-[4px] px-4 py-2 text-sm font-semibold hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-box btn-outline rounded-[4px] px-4 py-2 text-sm font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
