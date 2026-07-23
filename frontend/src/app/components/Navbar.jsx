import { Link, NavLink, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function MainLayout() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF7ED] text-slate-900">
      {/* Top Bar */}
      <div className="hidden border-b border-white/5 bg-[#111111] md:block">
        <div className="mx-auto flex h-9 w-[min(1280px,94vw)] items-center justify-between text-[11px] font-medium text-slate-400">
          <div className="flex items-center gap-5">
            <a href="tel:+94112345678" className="flex items-center gap-1.5 transition hover:text-white">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +94 11 234 5678
            </a>
            <a href="mailto:info@alumtech.lk" className="flex items-center gap-1.5 transition hover:text-white">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              info@alumtech.lk
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Colombo, Sri Lanka
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-40 border-b border-orange-100 bg-white/95 backdrop-blur-xl shadow-[0_2px_12px_rgba(234,88,12,0.06)]">
        <div className="relative mx-auto flex h-[72px] w-[min(1280px,94vw)] items-center justify-between">
          <Link to="/" className="flex items-center gap-0">
            <img src="/logo.svg" alt="AlumTech" className="h-10 w-auto" />
          </Link>

          <nav className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative rounded-lg px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#EA580C] text-white shadow-md shadow-[#EA580C]/20"
                      : "text-slate-600 hover:bg-orange-50 hover:text-[#EA580C]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user && (
              <Link
                to="/admin"
                className="rounded-lg bg-[#EA580C] px-5 py-2.5 text-[13px] font-bold text-white shadow-md shadow-[#EA580C]/20 transition hover:bg-[#C2410C] hover:shadow-lg"
              >
                Dashboard
              </Link>
            )}
            <button
              className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-[#EA580C] md:hidden transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-orange-100 bg-white px-4 py-3 shadow-lg md:hidden">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-[#EA580C] text-white" : "text-slate-600 hover:bg-orange-50 hover:text-[#EA580C]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-2">
              <a href="tel:+94112345678" className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-orange-50 hover:text-[#EA580C]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +94 11 234 5678
              </a>
            </div>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
}
