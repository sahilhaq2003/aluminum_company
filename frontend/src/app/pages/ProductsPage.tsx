import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";
import { categories } from "../utils";
import { Input } from "../components/ui";

export default function ProductsPage() {
  const { products } = useContent();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          `${p.name} ${p.description} ${p.category}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [products, category, search],
  );

  return (
    <main className="bg-[#f2f4f7]">
      <section className="bg-[#1f3f99] py-16 text-white">
        <div className="mx-auto w-[min(1200px,92vw)] text-center">
          <h1 className="text-5xl font-black">Our Products</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
            Premium aluminium solutions engineered for performance, durability,
            and aesthetic excellence.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1200px,92vw)] gap-6 py-10 md:grid-cols-[260px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Categories</h3>
          <div className="mt-3 space-y-1">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`block w-full rounded-md px-3 py-2 text-left text-sm font-medium transition duration-300 ${
                  category === c
                    ? "bg-[#1f3f99] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {c === "All" ? "All Products" : c}
              </button>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold text-slate-900">Search</h3>
          <Input
            className="mt-2 border-slate-200 text-sm"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="mt-6 rounded-lg bg-slate-100 p-4">
            <p className="text-sm font-bold text-slate-900">Need Help?</p>
            <p className="mt-1 text-xs text-slate-600">
              Our team can help you pick the right aluminium system.
            </p>
            <Link
              to="/contact"
              className="mt-3 inline-block rounded-md bg-[#13a8ff] px-3 py-2 text-xs font-semibold text-white"
            >
              Contact Sales
            </Link>
          </div>
        </aside>

        <div>
          <p className="mb-3 text-sm text-slate-500">
            Showing {filtered.length} products
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <h3 className="text-2xl font-bold text-slate-900">No products found</h3>
              <p className="mt-2 text-slate-500">
                Try changing category or search text.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-xl font-bold leading-tight text-slate-900">
                      {p.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                      {p.description}
                    </p>
                    <ul className="mt-3 space-y-1 text-xs text-slate-600">
                      {p.features.slice(0, 2).map((feature) => (
                        <li key={feature}>- {feature}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-slate-500">Price</p>
                        <p className="font-extrabold text-[#1f3f99]">{p.price}</p>
                      </div>
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${
                          p.stock > 0
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto w-[min(900px,92vw)] text-center">
          <h2 className="text-5xl font-black text-slate-900">Custom Solutions Available</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Can&apos;t find what you&apos;re looking for? We offer custom aluminium
            solutions tailored to your specific requirements.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-block rounded-md bg-[#1f3f99] px-6 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#173277]"
          >
            Request Custom Quote
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
