import { Link } from "react-router";
import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

export default function HomePage() {
  const { projects } = useContent();
  const featured = projects.slice(0, 3);

  return (
    <main className="bg-[#f2f4f7]">
      <section className="relative min-h-[580px] overflow-hidden text-white">
        <img
          src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop"
          alt="Aluminium building facade"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A2463]/72" />
        <div className="relative mx-auto flex min-h-[580px] w-[min(1200px,92vw)] flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-5xl font-black leading-tight text-white md:text-6xl"
          >
            Premium Aluminium
            <span className="block text-[#1ea7ff]">Solutions</span>
          </motion.h1>
          <p className="mt-5 max-w-2xl text-lg text-blue-100">
            Transforming spaces with innovative aluminium windows, doors, and
            facade systems. Excellence in every detail.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/projects"
              className="rounded-md bg-[#13a8ff] px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#0e95e3]"
            >
              Explore Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-white/70 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-[#0A2463]"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#1f3f99] py-9 text-white">
        <div className="mx-auto grid w-[min(1100px,92vw)] gap-5 text-center md:grid-cols-3">
          {[
            ["500+", "Satisfied Clients"],
            ["35+", "Years Experience"],
            ["1000+", "Projects Completed"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-5xl font-extrabold text-white">{value}</p>
              <p className="mt-1 text-sm text-blue-100">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-[min(1200px,92vw)] items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <h2 className="max-w-md text-4xl font-black leading-tight text-slate-900">
            Leading the Industry in Aluminium Excellence
          </h2>
          <p className="mt-4 text-slate-600">
            With over 35 years of experience, we specialize in designing,
            manufacturing, and installing premium aluminium solutions for
            residential, commercial, and industrial projects.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-700">
            {[
              "Premium Quality Materials",
              "Expert Installation Team",
              "Custom Design Solutions",
              "Energy Efficient Systems",
              "10 Year Warranty",
              "24/7 Customer Support",
            ].map((item) => (
              <p key={item} className="rounded-md bg-white px-3 py-2 shadow-sm">
                {item}
              </p>
            ))}
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1534150034764-046bf225d3fa?q=80&w=1200&auto=format&fit=crop"
          alt="Aluminium manufacturing"
          className="h-[380px] w-full rounded-xl object-cover shadow-lg"
        />
      </section>

      <section className="py-16">
        <div className="mx-auto w-[min(1200px,92vw)] text-center">
          <h2 className="text-4xl font-black text-slate-900">Featured Projects</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Explore our portfolio of exceptional projects showcasing our
            expertise and craftsmanship.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-[#13a8ff] px-2 py-1 text-xs font-semibold text-white">
                  {project.category}
                </span>
                <div className="absolute bottom-3 left-3 text-left text-white">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="text-xs text-blue-100">{project.location}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/projects"
            className="mt-8 inline-block rounded-md border border-[#0A2463] px-5 py-2 text-sm font-semibold text-[#0A2463] transition duration-300 hover:bg-[#0A2463] hover:text-white"
          >
            View All Projects
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto w-[min(900px,92vw)] rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-4xl font-black text-slate-900">What Our Clients Say</h2>
          <p className="mt-2 text-slate-500">Trusted by leading businesses and homeowners</p>
          <p className="mx-auto mt-7 max-w-2xl text-base italic text-slate-700">
            "AlumTech delivered exceptional quality on our corporate headquarters
            project. Their attention to detail and professionalism exceeded our expectations."
          </p>
          <p className="mt-4 font-semibold text-slate-900">John Anderson</p>
          <p className="text-sm text-slate-500">CEO, BuildCorp</p>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#1f3f99] to-[#13a8ff] py-16 text-white">
        <div className="mx-auto w-[min(900px,92vw)] text-center">
          <h2 className="text-5xl font-black">Ready to Start Your Project?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Get in touch with our team for a free consultation and quote. We are here to bring your vision to life.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-block rounded-md bg-white px-6 py-2.5 font-semibold text-[#0A2463] transition duration-300 hover:bg-slate-100"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d1b34] py-12 text-slate-200">
        <div className="mx-auto grid w-[min(1200px,92vw)] gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-extrabold text-white">AlumTech</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
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
            <h4 className="font-bold text-white">Contact</h4>
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
