import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { IcgcLogo } from "@/components/site/IcgcLogo";
import { getEvents, type Event } from "@/lib/store";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

// ── Featured event card ───────────────────────────────────────────────────────
function FeaturedCard({
  event,
  index,
}: {
  event: Event;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="show"
      className="group relative rounded-3xl overflow-hidden bg-primary-deep border border-white/10 shadow-elegant"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.62 0.13 158 / 0.3), transparent)" }}
      />

      {/* Faint logo watermark */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none opacity-[0.06] translate-x-8 translate-y-8">
        <IcgcLogo size={180} />
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Category badge */}
        <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.28em] font-semibold px-3 py-1 rounded-full border mb-5 ${event.color}`}>
          <Tag size={9} />
          {event.category}
        </span>

        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
          {event.title}
        </h3>

        <p className="mt-3 text-white/60 text-sm md:text-base leading-relaxed max-w-lg">
          {event.description}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Calendar size={14} className="text-gold shrink-0" />
            {event.date}
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock size={14} className="text-gold shrink-0" />
            {event.time}
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin size={14} className="text-gold shrink-0" />
            {event.location}
          </div>
        </div>

        <Link
          to="/next-steps"
          className="group/btn inline-flex items-center gap-2 mt-7 bg-gold text-gold-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
        >
          Plan to attend
          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

// ── Regular event card ────────────────────────────────────────────────────────
function EventCard({
  event,
  index,
}: {
  event: Event;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col rounded-2xl border border-border bg-card shadow-soft hover:border-primary/30 hover:shadow-elegant transition-all overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary to-gold/60" />

      <div className="p-5 md:p-6 flex flex-col flex-1">
        {/* Category */}
        <span className={`self-start inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full border mb-4 ${event.color}`}>
          <Tag size={8} />
          {event.category}
        </span>

        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground leading-tight">
          {event.title}
        </h3>

        <p className="mt-2 text-muted-foreground text-sm leading-relaxed flex-1">
          {event.description}
        </p>

        {/* Meta */}
        <div className="mt-5 space-y-2 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Calendar size={12} className="text-primary shrink-0" />
            {event.date}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <Clock size={12} className="text-primary shrink-0" />
            {event.time}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <MapPin size={12} className="text-primary shrink-0" />
            {event.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => { setEvents(getEvents()); }, []);

  const featured = events.filter((e) => e.featured);
  const regular  = events.filter((e) => !e.featured);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar revealAfterVh={0} />

      <main className="pt-16 md:pt-20">

        {/* ── Hero header ── */}
        <section className="relative bg-primary-deep overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-10">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.42 0.10 158 / 0.5), transparent)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
            <IcgcLogo size={400} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <IcgcLogo size={22} />
                <span className="h-px w-8 bg-gold/50" />
                <p className="text-gold uppercase tracking-[0.32em] text-xs font-semibold">
                  What's Coming Up
                </p>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-white leading-[0.95] tracking-tight">
                Upcoming
                <br />
                <span className="italic text-gold">Events</span>
              </h1>

              <p className="mt-6 text-white/60 text-base md:text-lg max-w-xl leading-relaxed">
                Join us for worship, prayer, fellowship, and community. There is always something happening at Greater Grace Temple.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Featured events ── */}
        {featured.length > 0 && (
          <section className="bg-background py-14 md:py-20 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">
              <p className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-8">
                Featured
              </p>
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {featured.map((event, i) => (
                  <FeaturedCard key={event.title} event={event} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── All upcoming events ── */}
        <section className="bg-muted/30 border-t border-border/50 py-14 md:py-20 px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
              <div>
                <p className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-2">
                  All Events
                </p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                  Mark your{" "}
                  <span className="italic text-primary">calendar</span>
                </h2>
              </div>
              <Link
                to="/next-steps"
                className="group inline-flex items-center gap-2 text-primary text-sm font-medium story-link shrink-0"
              >
                Plan a visit
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {regular.map((event, i) => (
                <EventCard key={event.title} event={event} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="bg-primary py-14 md:py-20 px-4 sm:px-6 lg:px-10 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 80% at 0% 50%, oklch(0.28 0.08 158 / 0.5), transparent)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
                Never miss an event.
              </h2>
              <p className="mt-2 text-primary-foreground/70 text-sm md:text-base">
                Connect with us and stay updated on everything happening at Greater Grace.
              </p>
            </div>
            <Link
              to="/next-steps"
              className="group shrink-0 inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-full font-semibold hover:bg-gold hover:text-gold-foreground transition-all shadow-elegant whitespace-nowrap"
            >
              Get Connected
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
