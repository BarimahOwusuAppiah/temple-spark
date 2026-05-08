import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✏️ Formspree endpoint — replace with your own if needed
const FORMSPREE_URL = "https://formspree.io/f/mzdoabzo";
import { saveSubmission } from "@/lib/store";

export const Route = createFileRoute("/next-steps")({
  component: NextStepsPage,
});

const interests = [
  "Joining the Church",
  "Volunteering",
  "Bible Study",
  "Water Baptism",
  "Prayer Request",
  "General Enquiry",
];

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  interest: z.enum(interests as [string, ...string[]]),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

function NextStepsPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          full_name: parsed.data.full_name,
          email:     parsed.data.email,
          phone:     parsed.data.phone,
          interest:  parsed.data.interest,
          message:   parsed.data.message || "",
        }),
      });
      if (!res.ok) throw new Error("Network error");
      // Also save locally for admin view
      saveSubmission({
        full_name: parsed.data.full_name,
        email:     parsed.data.email,
        phone:     parsed.data.phone,
        interest:  parsed.data.interest,
        message:   parsed.data.message || "",
      });
      setDone(true);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary text-sm mb-8 story-link"
          >
            <ArrowLeft size={16} /> Back home
          </Link>

          <p className="text-primary uppercase tracking-[0.3em] text-xs font-medium mb-3">
            Your Next Step
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground font-semibold leading-tight text-balance">
            Let's walk this <span className="italic text-primary">together</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Fill in your details and a member of our team will reach out within 48 hours.
          </p>

          {done ? (
            <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-10 text-center animate-fade-up">
              <CheckCircle2 className="mx-auto text-primary mb-4" size={56} strokeWidth={1.5} />
              <h2 className="font-display text-3xl text-primary font-semibold">
                Thank you!
              </h2>
              <p className="mt-3 text-muted-foreground">
                Your response has been received. We'll be in touch soon — God bless you.
              </p>
              <Link
                to="/"
                className="inline-block mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary-glow transition-all"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 space-y-6 bg-card rounded-2xl shadow-soft p-4 sm:p-6 md:p-8 lg:p-10 border border-border">
              <Field label="Full Name" error={errors.full_name}>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => onChange("full_name", e.target.value)}
                  className="input-base"
                  maxLength={100}
                  required
                />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className="input-base"
                  maxLength={255}
                  required
                />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  className="input-base"
                  maxLength={30}
                  required
                />
              </Field>
              <Field label="I am interested in" error={errors.interest}>
                <Select
                  value={form.interest}
                  onValueChange={(v) => onChange("interest", v)}
                >
                  <SelectTrigger
                    className="w-full h-auto px-4 py-3.5 text-base rounded-[0.6rem] border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <SelectValue placeholder="Select an option…" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-border shadow-elegant">
                    {interests.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="text-base py-3 px-4 cursor-pointer rounded-lg focus:bg-primary/8 focus:text-primary data-[state=checked]:text-primary data-[state=checked]:font-medium"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Additional message (optional)" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => onChange("message", e.target.value)}
                  className="input-base min-h-[120px] resize-y"
                  maxLength={1000}
                />
              </Field>

              {errors.form && (
                <p className="text-sm text-destructive">{errors.form}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-4 font-medium tracking-wide hover:bg-primary-glow transition-all shadow-elegant disabled:opacity-60"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Submitting…" : "Submit my next step"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />

      <style>{`
        .input-base {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 0.6rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          color: var(--color-foreground);
          font-size: 1rem;
          transition: border-color .2s, box-shadow .2s;
          outline: none;
        }
        .input-base:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-foreground mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-destructive">{error}</span>}
    </label>
  );
}
