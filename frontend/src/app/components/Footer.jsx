import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#1a0a00] text-slate-300">
      <div className="mx-auto grid w-[min(1280px,94vw)] gap-10 py-14 md:grid-cols-4">
        <div>
          <img src="/logo-light.svg" alt="AlumTech" className="mb-4 h-8 w-auto" />
          <p className="text-sm leading-7 text-slate-400">
            Leading provider of premium aluminium solutions for windows, doors,
            and facades since 1985. ISO 9001:2015 certified.
          </p>
          <div className="mt-4 flex gap-3">
            {["facebook", "linkedin", "twitter"].map((s) => (
              <span key={s} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg bg-white/5 text-xs text-slate-400 transition hover:bg-[#EA580C] hover:text-white">
                {s[0].toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <div className="mt-4 space-y-2.5 text-sm">
            {[["Home", "/"], ["About", "/about"], ["Projects", "/projects"], ["Products", "/products"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} to={to} className="block text-slate-400 transition hover:text-[#FB923C]">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
          <div className="mt-4 space-y-2.5 text-sm text-slate-400">
            <p>Aluminium Windows</p>
            <p>Glass Doors & Partitions</p>
            <p>Curtain Wall Systems</p>
            <p>Facade Engineering</p>
            <p>Custom Solutions</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <div className="flex items-start gap-2.5">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#FB923C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>123 Industrial Avenue<br/>Business District, Colombo</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="h-4 w-4 shrink-0 text-[#FB923C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>+94 11 234 5678</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="h-4 w-4 shrink-0 text-[#FB923C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>info@alumtech.lk</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        <div className="mx-auto flex w-[min(1280px,94vw)] items-center justify-between">
          <p>&copy; {new Date().getFullYear()} AlumTech Solutions. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <span className="cursor-pointer hover:text-slate-300">Privacy Policy</span>
            <span className="cursor-pointer hover:text-slate-300">Terms of Service</span>
            <Link to="/login" className="cursor-pointer hover:text-[#FB923C] transition">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
