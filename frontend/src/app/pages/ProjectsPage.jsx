import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { Input } from "../components/ui";
import Footer from "../components/Footer";

export default function ProjectsPage() {
  const { projects, products, productCategories, isLoading } = useContent();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categoryNames = useMemo(
    () => productCategories.map((c) => c.name),
    [productCategories],
  );

  const projectsList = Array.isArray(projects) ? projects : [];
  const productsList = Array.isArray(products) ? products : [];

  const filtered = useMemo(
    () =>
      projectsList.filter(
        (p) =>
          (category === "All" ||
            (p.productCategories && p.productCategories.includes(category))) &&
          `${p.title} ${p.client} ${p.location} ${(p.productCategories || []).join(" ")}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [projectsList, category, search],
  );

  const categoryProducts = useMemo(() => {
    if (category === "All") return [];
    return productsList
      .filter((p) => p.categoryName === category)
      .map((p) => {
        const linkedProjects = projectsList.filter(
          (proj) =>
            proj.productCategories && proj.productCategories.includes(category),
        );
        return { ...p, linkedProjects };
      });
  }, [productsList, projectsList, category]);

  if (isLoading) {
    return (
      <main className="bg-[#FFF7ED] py-40 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#EA580C] border-t-transparent" />
        <p className="mt-4 text-slate-500">Loading projects...</p>
      </main>
    );
  }

  return (
    <main>
      <section className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop"
          alt="Modern building projects"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative mx-auto w-[min(1280px,94vw)] text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-300">Portfolio</p>
          <h1 className="mt-3 text-5xl font-black text-white">Our Projects</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100/80">
            Discover our portfolio of exceptional aluminium installations across
            residential, commercial, and industrial sectors.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-5">
        <div className="mx-auto flex w-[min(1280px,94vw)] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap gap-2">
            {["All", ...categoryNames].map((c) => (
              <button
                key={c}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                  category === c
                    ? "bg-[#EA580C] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#EA580C] hover:text-[#EA580C]"
                }`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <Input
              className="border-slate-200 bg-slate-50 pl-10 text-sm"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1280px,94vw)] py-12">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
            <h3 className="text-2xl font-bold text-slate-900">No projects found</h3>
            <p className="mt-2 text-slate-500">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={project.coverImageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d47]/80 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium text-slate-400">{project.location} &middot; {project.year}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900 leading-tight">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">{project.description}</p>
                  {project.productCategories && project.productCategories.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.productCategories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-md bg-[#EA580C]/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#EA580C]"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {category !== "All" && categoryProducts.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <h2 className="text-xl font-bold text-slate-900">
                {category} <span className="text-slate-400 font-normal">Products</span>
              </h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <p className="mt-2 text-center text-sm text-slate-500">
              Products in the <span className="font-semibold text-[#EA580C]">{category}</span> category used across our projects
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categoryProducts.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FB923C]/20 hover:shadow-xl"
                >
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-md bg-[#EA580C]/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {p.categoryName}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug transition group-hover:text-[#EA580C]">{p.name}</h4>
                    {p.price && (
                      <p className="mt-1.5 text-xs font-bold text-[#EA580C]">{p.price}</p>
                    )}
                    {p.linkedProjects.length > 0 && (
                      <div className="mt-3 border-t border-slate-100 pt-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Used in</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {p.linkedProjects.slice(0, 2).map((proj) => (
                            <Link
                              key={proj.id}
                              to={`/projects/${proj.id}`}
                              className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600 transition hover:bg-[#EA580C]/5 hover:text-[#EA580C]"
                            >
                              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                              {proj.title}
                            </Link>
                          ))}
                          {p.linkedProjects.length > 2 && (
                            <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                              +{p.linkedProjects.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {category !== "All" && categoryProducts.length === 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <h2 className="text-xl font-bold text-slate-900">
                {category} <span className="text-slate-400 font-normal">Products</span>
              </h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <p className="mt-4 text-center text-sm text-slate-400">No products in this category yet.</p>
          </div>
        )}
      </section>

      <section className="bg-[#FFFBF5] py-16">
        <div className="mx-auto w-[min(900px,94vw)] text-center">
          <h2 className="text-4xl font-black text-slate-900">Have a Project in Mind?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Let's discuss how we can bring your vision to life with our premium aluminium solutions.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#EA580C] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#EA580C]/20 transition hover:bg-[#9A3412]"
          >
            Start Your Project
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
