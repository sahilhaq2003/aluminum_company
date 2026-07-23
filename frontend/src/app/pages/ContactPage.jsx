import { useState } from "react";
import { toast } from "sonner";
import { publicApi } from "../api";
import { Button, Input, Label, Textarea } from "../components/ui";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.subject || !form.message) {
      return toast.error("Please fill required fields");
    }
    setSubmitting(true);
    try {
      await publicApi.submitContact(form);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="relative overflow-hidden py-20">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1800&auto=format&fit=crop"
          alt="Modern office space"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative mx-auto w-[min(1280px,94vw)] text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-300">Reach Out</p>
          <h1 className="mt-3 text-5xl font-black text-white">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100/80">
            Get in touch with our team for inquiries, quotes, or support
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-[min(1200px,92vw)] gap-7 py-12 md:grid-cols-[2fr_1fr]">
        <form
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit}
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
            className="mt-4 bg-[#C2410C] text-white hover:bg-[#9A3412]"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>

        <aside>
          <h2 className="text-4xl font-black text-slate-900">Get in Touch</h2>
          <div className="mt-4 space-y-4">
            {[
              { title: "Phone", lines: ["+1 234 567 890", "+1 234 567 891"] },
              { title: "Email", lines: ["info@alumtech.com", "sales@alumtech.com"] },
              {
                title: "Address",
                lines: ["123 Industrial Avenue", "Business District, NY 10001"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-lg font-bold text-slate-900">{item.title}</p>
                {item.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm text-slate-600">
                    {line}
                  </p>
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

      <Footer />
    </main>
  );
}
