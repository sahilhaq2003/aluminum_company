import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { publicApi } from "../api";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(null);

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
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="mt-4 text-slate-500">Loading project details...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="mx-auto w-[min(900px,92vw)] py-20">
        <h1 className="text-3xl font-black">Project not found</h1>
      </main>
    );
  }

  // Map categories/images to gallery
  const gallery =
    project.categories?.flatMap((cat) => cat.images.map((img) => img.imageUrl)) ||
    [];
  const displayGallery = gallery.length > 0 ? gallery : [project.coverImageUrl];

  return (
    <main className="bg-[#f2f4f7]">
      <section className="relative h-[360px] overflow-hidden md:h-[420px]">
        <ImageWithFallback
          src={project.coverImageUrl}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d47]/90 to-[#0a2463]/20" />
        <div className="absolute bottom-7 left-1/2 w-[min(1200px,92vw)] -translate-x-1/2 text-white">
          <Link to="/projects" className="text-xs text-blue-100 hover:text-white">
            ← Back to Projects
          </Link>
          <h1 className="mt-3 text-4xl font-black md:text-5xl">{project.title}</h1>
          <p className="mt-3 text-sm text-blue-100">
            {project.location} · {project.year}
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1200px,92vw)] gap-7 py-10 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-4xl font-black text-slate-900">Project Overview</h2>
          <p className="mt-5 text-slate-600">{project.description}</p>

          {project.challenge && (
            <>
              <h3 className="mt-7 text-3xl font-bold text-slate-900">
                The Challenge
              </h3>
              <p className="mt-3 text-slate-600">{project.challenge}</p>
            </>
          )}

          {project.solution && (
            <>
              <h3 className="mt-7 text-3xl font-bold text-slate-900">
                Our Solution
              </h3>
              <p className="mt-3 text-slate-600">{project.solution}</p>
            </>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-[#f6f7fb] p-5 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900">Project Details</h3>
          <div className="mt-4 space-y-3 text-sm">
            {project.client && (
              <div>
                <p className="text-slate-500">Client</p>
                <p className="font-semibold text-slate-900">{project.client}</p>
              </div>
            )}
            <div>
              <p className="text-slate-500">Location</p>
              <p className="font-semibold text-slate-900">{project.location}</p>
            </div>
            <div>
              <p className="text-slate-500">Year Completed</p>
              <p className="font-semibold text-slate-900">{project.year}</p>
            </div>
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-block w-full rounded-md bg-[#1f3f99] px-4 py-2.5 text-center text-sm font-semibold text-white transition duration-300 hover:bg-[#173277]"
          >
            Start Similar Project
          </Link>
        </aside>
      </section>

      <section className="border-t border-slate-200 bg-[#edf0f4] py-10">
        <div className="mx-auto w-[min(1200px,92vw)]">
          <h2 className="text-4xl font-black text-slate-900">Project Gallery</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {displayGallery.map((img, i) => (
              <button
                key={`${img}-${i}`}
                onClick={() => setActive(img)}
                className="overflow-hidden rounded-xl border border-slate-200 shadow-sm"
              >
                <ImageWithFallback
                  src={img}
                  alt={`${project.title} gallery ${i + 1}`}
                  className="h-52 w-full object-cover transition duration-300 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {(project.scope || project.results) && (
        <section className="bg-[#f2f4f7] py-12">
          <div className="mx-auto grid w-[min(1200px,92vw)] gap-6 md:grid-cols-2">
            {project.scope && (
              <div>
                <h3 className="text-3xl font-bold text-slate-900">Project Scope</h3>
                <p className="mt-3 text-slate-600">{project.scope}</p>
              </div>
            )}
            {project.results && (
              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  Results & Impact
                </h3>
                <p className="mt-3 text-slate-600">{project.results}</p>
              </div>
            )}
          </div>
        </section>
      )}

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

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActive(null)}
        >
          <ImageWithFallback
            src={active}
            alt="Gallery preview"
            className="max-h-[85vh] max-w-[92vw] rounded-xl"
          />
        </div>
      )}
    </main>
  );
}
