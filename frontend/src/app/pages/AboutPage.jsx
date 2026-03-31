import { Link } from "react-router";

export default function AboutPage() {
  return (
    <main className="bg-[#f2f4f7]">
      <section className="bg-[#1f3f99] py-16 text-white">
        <div className="mx-auto w-[min(1200px,92vw)] text-center">
          <h1 className="text-5xl font-black">About AlumTech</h1>
          <p className="mt-3 text-lg text-blue-100">
            35+ years of excellence in aluminium solutions
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1200px,92vw)] items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-black text-slate-900">Our Story</h2>
          <p className="mt-4 text-slate-600">
            Founded in 1985, AlumTech has grown from a small family business to
            one of the nation&apos;s leading aluminium solutions providers. Our
            journey has been driven by a commitment to quality, innovation, and
            customer satisfaction.
          </p>
          <p className="mt-4 text-slate-600">
            Today, we serve residential, commercial, and industrial clients
            across the region, delivering premium aluminium windows, doors, and
            facade systems that combine aesthetic excellence with superior
            performance.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
          alt="AlumTech team collaboration"
          className="h-[360px] w-full rounded-xl object-cover shadow-lg"
        />
      </section>

      <section className="py-14">
        <div className="mx-auto w-[min(1200px,92vw)] text-center">
          <h2 className="text-5xl font-black text-slate-900">Our Core Values</h2>
          <p className="mt-2 text-slate-500">
            The principles that guide everything we do
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              {
                title: "Quality Excellence",
                text: "We maintain the highest standards in every project we undertake.",
              },
              {
                title: "Customer Focus",
                text: "Your satisfaction is our priority, from design to installation.",
              },
              {
                title: "Innovation",
                text: "Constantly evolving with the latest aluminium technologies.",
              },
              {
                title: "Reliability",
                text: "On-time delivery and professional service you can trust.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#1f3f99] text-lg font-bold text-white">
                  ●
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
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
