import { Link } from "react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useContent } from "../context/ContentContext";
import { ImageWithFallback } from "../components/ImageWithFallback";
import Footer from "../components/Footer";

const heroSlides = [
  { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1800&auto=format&fit=crop", alt: "Modern office interior" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1800&auto=format&fit=crop", alt: "Skyscraper facade" },
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1800&auto=format&fit=crop", alt: "Glass curtain wall" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1800&auto=format&fit=crop", alt: "Contemporary building design" },
];

const stats = [
  { value: "500+", label: "Satisfied Clients" },
  { value: "35+", label: "Years Experience" },
  { value: "1,200+", label: "Projects Completed" },
  { value: "50+", label: "Team Members" },
];

const features = [
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Premium Quality", desc: "ISO 9001 certified manufacturing with the highest grade aluminium alloys." },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Expert Installation", desc: "Certified installation teams with 35+ years of combined field experience." },
  { icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", title: "Custom Design", desc: "Tailored solutions engineered to your exact architectural specifications." },
  { icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z", title: "Energy Efficient", desc: "Thermal break technology reducing energy consumption by up to 40%." },
  { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: "10 Year Warranty", desc: "Industry-leading warranty coverage on all products and installations." },
  { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", title: "24/7 Support", desc: "Round-the-clock customer service and emergency maintenance response." },
];

export default function HomePage() {
  const { projects, isLoading } = useContent();
  const featured = Array.isArray(projects) ? projects.slice(0, 3) : [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF7ED]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EA580C] border-t-transparent" />
      </div>
    );
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative mx-auto flex min-h-[620px] w-[min(1280px,94vw)] flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="max-w-4xl text-5xl font-black leading-[1.1] text-white md:text-7xl">
              Engineered
              <span className="bg-gradient-to-r from-[#FB923C] to-[#FDBA74] bg-clip-text text-transparent"> Aluminium </span>
              Excellence
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-orange-100/90">
              From concept to installation, we deliver premium aluminium windows, doors,
              curtain walls, and facade systems that define modern architecture.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              to="/projects"
              className="rounded-xl bg-[#FB923C] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#FB923C]/25 transition hover:bg-[#EA580C] hover:shadow-xl"
            >
              View Our Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20"
            >
              Get a Free Quote
            </Link>
          </motion.div>
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-8 bg-[#FB923C]" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-10 z-10">
        <div className="mx-auto grid w-[min(1100px,94vw)] grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-lg shadow-slate-200/50">
              <p className="text-3xl font-extrabold text-[#EA580C]">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-[min(1280px,94vw)] py-20">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#FB923C]">Why Choose Us</p>
          <h2 className="mt-3 text-4xl font-black text-slate-900 md:text-5xl">
            Built on Trust & Innovation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Three decades of engineering excellence, backed by cutting-edge technology and a commitment to sustainable construction.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:border-[#FB923C]/20 hover:shadow-lg hover:shadow-slate-200/50">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] shadow-lg shadow-[#C2410C]/20 transition group-hover:scale-110">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About snippet */}
      <section className="bg-[#FFFBF5] py-20">
        <div className="mx-auto grid w-[min(1280px,94vw)] items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#FB923C]">About AlumTech</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-slate-900">
              Redefining Aluminium<br/>Since 1985
            </h2>
            <p className="mt-5 text-slate-500 leading-relaxed">
              From a small workshop to a nationally recognized leader, AlumTech has spent over three decades pushing the boundaries of what aluminium can achieve in modern architecture. Our vertically integrated manufacturing ensures quality control at every stage.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {["ISO 9001 Certified", "LEED Partner", "AAMA Accredited", "100% Recyclable"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                  <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#EA580C] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#EA580C]/20 transition hover:bg-[#9A3412]"
            >
              Learn More About Us
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
              alt="Aluminium manufacturing facility"
              className="rounded-2xl object-cover shadow-2xl"
              style={{ height: "420px", width: "100%" }}
            />
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-[#FB923C] p-5 text-white shadow-xl">
              <p className="text-3xl font-extrabold">35+</p>
              <p className="text-sm font-medium text-orange-100">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FB923C]">Portfolio</p>
            <h2 className="mt-3 text-4xl font-black text-slate-900">Featured Projects</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Explore our portfolio of exceptional projects showcasing our expertise across commercial, residential, and hospitality sectors.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featured.map((project, i) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <ImageWithFallback
                  src={project.coverImageUrl}
                  alt={project.title}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d47]/90 via-[#0a1d47]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-lg bg-[#FB923C]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {project.categoryName}
                  </span>
                  <h3 className="mt-2 text-xl font-extrabold text-white leading-tight">{project.title}</h3>
                  <p className="mt-1 text-xs text-orange-100">{project.location} &middot; {project.year}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#EA580C] px-6 py-3 text-sm font-bold text-[#EA580C] transition hover:bg-[#EA580C] hover:text-white"
            >
              View All Projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#FFFBF5] py-20">
        <div className="mx-auto w-[min(900px,94vw)] text-center">
          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#FB923C] to-[#C2410C] shadow-lg shadow-[#FB923C]/20">
            <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          </div>
          <p className="mx-auto max-w-2xl text-xl italic leading-relaxed text-slate-600">
            "AlumTech delivered exceptional quality on our corporate headquarters project. Their curtain wall system exceeded our thermal performance targets by 35%, and the installation was completed ahead of schedule."
          </p>
          <div className="mt-6">
            <p className="font-bold text-slate-900">John Anderson</p>
            <p className="text-sm text-slate-500">CEO, BuildCorp International</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#EA580C] py-20">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FB923C]/10" />
        <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-[#FB923C]/10" />
        <div className="relative mx-auto w-[min(900px,94vw)] text-center">
          <h2 className="text-4xl font-black text-white md:text-5xl">Ready to Start Your Project?</h2>
          <p className="mx-auto mt-4 max-w-xl text-orange-200">
            Get a free consultation and detailed quote from our engineering team. Let us bring your vision to life.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-xl bg-[#FB923C] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#FB923C]/25 transition hover:bg-[#EA580C]"
            >
              Get Free Consultation
            </Link>
            <a
              href="tel:+1234567890"
              className="rounded-xl border border-white/30 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Call +1 234 567 890
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
