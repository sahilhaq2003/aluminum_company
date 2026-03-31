import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button, Input, Label, Textarea } from "../components/ui";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  return (
    <main className="bg-[#f2f4f7]">
      <section className="bg-[#1f3f99] py-16 text-white">
        <div className="mx-auto w-[min(1200px,92vw)] text-center">
          <h1 className="text-5xl font-black">Contact Us</h1>
          <p className="mt-3 text-lg text-blue-100">
            Get in touch with our team for inquiries, quotes, or support
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1200px,92vw)] gap-7 py-12 md:grid-cols-[2fr_1fr]">
        <form
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.fullName || !form.email || !form.subject || !form.message) {
              return toast.error("Please fill required fields");
            }
            toast.success("Message sent successfully");
            setForm({
              fullName: "",
              email: "",
              phone: "",
              company: "",
              subject: "",
              message: "",
            });
          }}
        >
          <h2 className="text-4xl font-black text-slate-900">Send us a Message</h2>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <Label>Full Name *</Label>
              <Input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 234 567 890"
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Your Company"
              />
            </div>
          </div>

          <div className="mt-3">
            <Label>Subject *</Label>
            <Input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="Project inquiry"
            />
          </div>
          <div className="mt-3">
            <Label>Message *</Label>
            <Textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your project requirements..."
            />
          </div>
          <Button
            type="submit"
            className="mt-4 bg-[#1f3f99] text-white hover:bg-[#173277]"
          >
            Send Message
          </Button>
        </form>

        <aside>
          <h2 className="text-4xl font-black text-slate-900">Get in Touch</h2>
          <div className="mt-4 space-y-4">
            {[
              { title: "Phone", lines: ["+1 234 567 890", "+1 234 567 891"] },
              { title: "Email", lines: ["info@alumtech.com", "sales@alumtech.com"] },
              { title: "Address", lines: ["123 Industrial Avenue", "Business District, NY 10001"] },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-lg font-bold text-slate-900">{item.title}</p>
                {item.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-slate-600">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] pb-12">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <iframe
            title="AlumTech office location map"
            src="https://maps.google.com/maps?q=Business%20District%20NY%2010001&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-[320px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
