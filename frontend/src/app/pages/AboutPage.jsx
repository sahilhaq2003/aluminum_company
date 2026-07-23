import { Link } from "react-router";
import Footer from "../components/Footer";

const values = [
  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Quality Excellence", desc: "We maintain the highest standards in every project, using premium grade materials and rigorous quality control." },
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "Customer Focus", desc: "Your satisfaction drives everything we do, from initial consultation through final installation and beyond." },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Innovation", desc: "Constantly evolving with the latest aluminium technologies, including smart glass and BIPV integration." },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Reliability", desc: "On-time delivery and professional service you can trust, backed by our comprehensive warranty program." },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop"
          alt="Aluminium manufacturing facility"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative mx-auto w-[min(1280px,94vw)] text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-300">Our Company</p>
          <h1 className="mt-3 text-5xl font-black text-white">About AlumTech</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100/80">
            35+ years of excellence in designing, manufacturing, and installing premium aluminium solutions.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1280px,94vw)] items-center gap-12 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#FB923C]">Our Story</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-slate-900">
            From Workshop to Industry Leader
          </h2>
          <p className="mt-5 text-slate-500 leading-relaxed">
            Founded in 1985, AlumTech began as a small family workshop with a simple mission:
            deliver the highest quality aluminium craftsmanship. Over three decades, we've grown
            into one of the nation's most trusted aluminium solutions providers.
          </p>
          <p className="mt-4 text-slate-500 leading-relaxed">
            Today, our 50,000 sqft state-of-the-art manufacturing facility houses CNC machining
            centers, automated powder coating lines, and thermal break assembly stations. We serve
            residential, commercial, and industrial clients across the region with products that
            combine aesthetic excellence with superior performance.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["1985", "Founded"],
              ["50K sqft", "Facility"],
              ["50+", "Team"],
            ].map(([val, label]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-extrabold text-[#EA580C]">{val}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
            alt="AlumTech manufacturing facility"
            className="rounded-2xl object-cover shadow-2xl"
            style={{ height: "420px", width: "100%" }}
          />
          <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-5 shadow-xl">
            <p className="text-3xl font-extrabold text-[#EA580C]">1,200+</p>
            <p className="text-sm font-medium text-slate-500">Projects Completed</p>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFBF5] py-20">
        <div className="mx-auto w-[min(1280px,94vw)]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#FB923C]">Core Values</p>
            <h2 className="mt-3 text-4xl font-black text-slate-900">What Drives Us</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              The principles that guide everything we do, from the factory floor to the job site.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:border-[#FB923C]/20 hover:shadow-lg">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] shadow-lg shadow-[#C2410C]/20 transition group-hover:scale-110">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
