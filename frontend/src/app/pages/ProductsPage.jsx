import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { Input } from "../components/ui";
import Footer from "../components/Footer";

export default function ProductsPage() {
  const { products, productCategories, isLoading } = useContent();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categoryNames = useMemo(
    () => productCategories.map((c) => c.name),
    [productCategories],
  );

  const productsList = Array.isArray(products) ? products : [];
  const filtered = useMemo(
    () =>
      productsList.filter(
        (p) =>
          (category === "All" || p.categoryName === category) &&
          `${p.name} ${p.description} ${p.categoryName}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [productsList, category, search],
  );

  if (isLoading) {
    return (
      <main className="bg-[#FFF7ED] py-40 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#EA580C] border-t-transparent" />
        <p className="mt-4 text-slate-500">Loading products...</p>
      </main>
    );
  }

  return (
    <main>
      <section className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop"
          alt="Aluminium products"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative mx-auto w-[min(1280px,94vw)] text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-300">Catalog</p>
          <h1 className="mt-3 text-5xl font-black text-white">Our Products</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100/80">
            Premium aluminium solutions engineered for performance, durability,
            and aesthetic excellence.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1280px,94vw)] gap-8 py-12 md:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-black">Categories</h3>
          <div className="mt-3 space-y-1">
            {["All", ...categoryNames].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`block w-full rounded-lg px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                  category === c
                    ? "bg-[#EA580C] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {c === "All" ? "All Products" : c}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-black">Search</h3>
            <div className="relative mt-2">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <Input
                className="border-gray-200 bg-gray-50 pl-10 text-sm"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] p-5">
            <p className="text-sm font-bold text-white">Need Help?</p>
            <p className="mt-1.5 text-xs leading-5 text-orange-200">
              Our experts can help you choose the right aluminium system for your project.
            </p>
            <Link
              to="/contact"
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#FB923C] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#EA580C]"
            >
              Contact Sales
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </aside>

        <div>
          <p className="mb-4 text-sm font-medium text-gray-500">
            Showing <span className="font-bold text-black">{filtered.length}</span> products
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gray-100">
                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-black">No products found</h3>
              <p className="mt-2 text-gray-500">Try changing the category or search text.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FB923C]/20 hover:shadow-2xl hover:shadow-gray-200/60"
                >
                  <div className="relative h-52 overflow-hidden">
                    <ImageWithFallback
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3.5 py-2 text-[11px] font-bold text-[#EA580C] shadow-lg backdrop-blur-sm transition hover:bg-white"
                      >
                        Enquire Now
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </Link>
                      {p.stock > 0 && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/90 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          In Stock
                        </span>
                      )}
                    </div>
                    <span className="absolute left-3 top-3 rounded-lg bg-[#EA580C]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {p.categoryName}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[15px] font-bold leading-snug text-black transition group-hover:text-[#EA580C]">{p.name}</h3>
                      {p.stock > 0 && (
                        <span className="mt-0.5 shrink-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-emerald-100" title="In Stock" />
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-gray-500">{p.description}</p>

                    {p.price && (
                      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Price</p>
                          <p className="mt-0.5 text-sm font-extrabold text-[#EA580C]">{p.price}</p>
                        </div>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1 rounded-lg border border-[#EA580C]/20 bg-[#EA580C]/5 px-3 py-1.5 text-[11px] font-bold text-[#EA580C] transition hover:bg-[#EA580C] hover:text-white"
                        >
                          Get Quote
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#FFFBF5] py-16">
        <div className="mx-auto w-[min(900px,94vw)] text-center">
          <h2 className="text-4xl font-black text-black">Custom Solutions Available</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Can't find what you're looking for? We offer custom aluminium solutions tailored to your specific requirements.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#EA580C] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#EA580C]/20 transition hover:bg-[#9A3412]"
          >
            Request Custom Quote
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
