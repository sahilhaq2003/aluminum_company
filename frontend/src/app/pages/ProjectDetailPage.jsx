import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { useContent } from "../context/ContentContext";
import { publicApi } from "../api";
import Footer from "../components/Footer";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { products } = useContent();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [galleryCategory, setGalleryCategory] = useState("All");

  useEffect(() => {
    if (id) {
      publicApi
        .getProjectById(id)
        .then((data) => {
          setProject(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch project", err);
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <main className="mx-auto w-[min(900px,92vw)] py-40 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#EA580C] border-t-transparent" />
        <p className="mt-4 text-gray-500">Loading project details...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="mx-auto w-[min(900px,92vw)] py-20">
        <h1 className="text-3xl font-black text-black">Project not found</h1>
      </main>
    );
  }

  const projectCategories = project.categories || [];
  const categoryNames = projectCategories.map((c) => c.name);
  const filteredGallery =
    galleryCategory === "All"
      ? projectCategories.flatMap((cat) =>
          cat.images.map((img) => ({ imageUrl: img.imageUrl, caption: img.caption, category: cat.name }))
        )
      : projectCategories
          .filter((cat) => cat.name === galleryCategory)
          .flatMap((cat) =>
            cat.images.map((img) => ({ imageUrl: img.imageUrl, caption: img.caption, category: cat.name }))
          );
  const displayGallery = filteredGallery.length > 0 ? filteredGallery : project.coverImageUrl ? [{ imageUrl: project.coverImageUrl, caption: "Cover", category: "All" }] : [];

  return (
    <main>
      <section className="relative h-[360px] overflow-hidden md:h-[420px]">
        <ImageWithFallback
          src={project.coverImageUrl}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute bottom-7 left-1/2 w-[min(1280px,94vw)] -translate-x-1/2 text-white">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-200 hover:text-white transition">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Projects
          </Link>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">{project.title}</h1>
          <p className="mt-3 text-sm text-orange-100">
            {project.location} &middot; {project.year}
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1280px,94vw)] gap-8 py-12 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-4xl font-black text-black">Project Overview</h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">{project.description}</p>

          {project.challenge && (
            <>
              <h3 className="mt-8 text-2xl font-bold text-black">The Challenge</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{project.challenge}</p>
            </>
          )}

          {project.solution && (
            <>
              <h3 className="mt-8 text-2xl font-bold text-black">Our Solution</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">{project.solution}</p>
            </>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-gray-100 bg-[#FFFBF5] p-6 shadow-sm">
          <h3 className="text-xl font-bold text-black">Project Details</h3>
          <div className="mt-5 space-y-4 text-sm">
            {[
              ["Client", project.client],
              ["Location", project.location],
              ["Year", project.year],
              ["Category", project.categories?.[0]?.name],
            ].filter(([, v]) => v).map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{label}</p>
                <p className="mt-1 font-semibold text-black">{value}</p>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-6 flex items-center justify-center gap-2 w-full rounded-xl bg-[#EA580C] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#EA580C]/20 transition hover:bg-[#9A3412]"
          >
            Start Similar Project
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </aside>
      </section>

      {displayGallery.length > 0 && (
        <section className="border-t border-gray-100 bg-[#FFFBF5] py-12">
          <div className="mx-auto w-[min(1280px,94vw)]">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FB923C]">Portfolio</p>
            <h2 className="mt-2 text-3xl font-black text-black">Project Gallery</h2>
            {categoryNames.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {["All", ...categoryNames].map((c) => (
                  <button
                    key={c}
                    onClick={() => setGalleryCategory(c)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                      galleryCategory === c
                        ? "bg-[#EA580C] text-white shadow-sm"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-[#EA580C] hover:text-[#EA580C]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {displayGallery.map((item, i) => (
                <button
                  key={`${item.imageUrl}-${i}`}
                  onClick={() => setActive(item)}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg text-left"
                >
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.caption || `${project.title} gallery ${i + 1}`}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    {item.category && item.category !== "All" && (
                      <span className="absolute right-3 top-3 rounded-lg bg-[#EA580C]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        {item.category}
                      </span>
                    )}
                  </div>
                  {item.caption && (
                    <p className="px-4 py-3 text-xs font-medium text-gray-500">{item.caption}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.productCategories && project.productCategories.length > 0 && (
        <section className="py-12">
          <div className="mx-auto w-[min(1280px,94vw)]">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FB923C]">Products Used</p>
            <h2 className="mt-2 text-3xl font-black text-black">Related Products</h2>
            <p className="mt-2 text-gray-500">
              Browse the product categories featured in this project.
            </p>
            {project.productCategories.map((catName) => {
              const catProducts = Array.isArray(products)
                ? products.filter((p) => p.categoryName === catName)
                : [];
              if (catProducts.length === 0) return null;
              return (
                <div key={catName} className="mt-8">
                  <h3 className="text-xl font-bold text-black border-b border-gray-200 pb-2">
                    {catName}
                  </h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {catProducts.map((p) => (
                      <Link
                        key={p.id}
                        to="/products"
                        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <ImageWithFallback
                            src={p.imageUrl}
                            alt={p.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          />
                          <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#EA580C] backdrop-blur-sm">
                            {p.categoryName}
                          </span>
                        </div>
                        <div className="p-4">
                          <h4 className="text-base font-extrabold text-black leading-tight">{p.name}</h4>
                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">{p.description}</p>
                          {p.price && (
                            <p className="mt-3 text-sm font-bold text-[#EA580C]">{p.price}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {(project.scope || project.results) && (
        <section className="py-12">
          <div className="mx-auto grid w-[min(1280px,94vw)] gap-6 md:grid-cols-2">
            {project.scope && (
              <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-black">Project Scope</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{project.scope}</p>
              </div>
            )}
            {project.results && (
              <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-black">Results & Impact</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{project.results}</p>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActive(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback
              src={active.imageUrl}
              alt={active.caption || "Gallery preview"}
              className="max-h-[80vh] max-w-[92vw] rounded-xl"
            />
            {active.caption && (
              <p className="mt-3 text-center text-sm text-white/80">{active.caption}</p>
            )}
            <button
              onClick={() => setActive(null)}
              className="absolute -top-3 -right-3 grid h-8 w-8 place-items-center rounded-full bg-white text-gray-600 shadow-lg transition hover:text-black"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
