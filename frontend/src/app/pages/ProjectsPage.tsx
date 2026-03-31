import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";
import { categories } from "../utils";
import { Input } from "../components/ui";

export default function ProjectsPage() {
  const { projects } = useContent();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          `${p.title} ${p.location} ${p.description}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [projects, category, search],
  );

  return (
    <main className="bg-[#f2f4f7]">
      <section className="bg-[#1f3f99] py-16 text-white">
        <div className="mx-auto w-[min(1200px,92vw)] text-center">
          <h1 className="text-5xl font-black">Our Projects</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
            Discover our portfolio of exceptional aluminium installations across
            residential, commercial, and industrial sectors.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/70 py-4">
        <div className="mx-auto flex w-[min(1200px,92vw)] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition duration-300 ${
                  category === c
                    ? "border-[#1f3f99] bg-[#1f3f99] text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-[#1f3f99] hover:text-[#1f3f99]"
                }`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <Input
            className="w-full max-w-xs border-slate-200 bg-white text-sm"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] py-10">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <h3 className="text-2xl font-bold text-slate-900">No projects found</h3>
            <p className="mt-2 text-slate-500">Try changing filters or search text.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {filtered.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group relative overflow-hidden rounded-xl shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463]/85 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-[#13a8ff] px-2 py-1 text-xs font-semibold text-white">
                  {project.category}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs text-blue-100">
                    {project.location} - {project.year}
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold leading-tight">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-[min(900px,92vw)] text-center">
          <h2 className="text-5xl font-black text-slate-900">Have a Project in Mind?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Let&apos;s discuss how we can bring your vision to life with our premium aluminium solutions.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-block rounded-md bg-[#1f3f99] px-6 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#173277]"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      <footer className="bg-[#0d1b34] py-12 text-slate-200">
        <div className="mx-auto grid w-[min(1200px,92vw)] gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-extrabold text-white">AlumTech</h3>
            <p className="mt-3 text-sm text-slate-300">
              Leading provider of premium aluminium solutions for windows, doors,
              and facades since 1985.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white">Quick Links</h4>
            <div className="mt-3 space-y-2 text-sm">
              <Link to="/" className="block hover:text-white">Home</Link>
              <Link to="/about" className="block hover:text-white">About</Link>
              <Link to="/projects" className="block hover:text-white">Projects</Link>
              <Link to="/products" className="block hover:text-white">Products</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white">Our Services</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-200">
              <p>Aluminium Windows</p>
              <p>Glass Doors</p>
              <p>Facade Systems</p>
              <p>Custom Solutions</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white">Contact Us</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-200">
              <p>123 Industrial Avenue, Business District</p>
              <p>+1 234 567 890</p>
              <p>info@alumtech.com</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
