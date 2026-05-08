import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { IcgcLogo } from "@/components/site/IcgcLogo";

// ═══════════════════════════════════════════════════════════════════════════
// ✏️  PASTOR PHOTOS — replace with your own files in src/assets/
// ═══════════════════════════════════════════════════════════════════════════
import pastorPhoto1 from "@/assets/pastor-profile-1.png";
import pastorPhoto2 from "@/assets/pastor-profile-2.png";
import pastorPhoto3 from "@/assets/pastor-profile-3.png";
import pastorPhoto4 from "@/assets/pastor-profile-4.png";

// ═══════════════════════════════════════════════════════════════════════════
// ✏️  PASTOR CONTENT — edit name, title, quote, and story chapters below
// ═══════════════════════════════════════════════════════════════════════════

const PASTOR = {
  name: "Pastor",
  title: "Senior Pastor, ICGC Greater Grace Temple",
  heroQuote: "Called, anointed, and appointed for such a time as this.",
  heroSub:
    "A vessel through whom God's word flows  transforming lives, restoring hope, and building a strong, faith-filled community in Accra and beyond.",
  heroPhoto: pastorPhoto1,
};

const CHAPTERS: {
  number: string;
  label: string;
  heading: string;
  body: string;
  photo: string;
  alt: string;
  verse: string;
  verseRef: string;
}[] = [
  {
    number: "01",
    label: "The Calling",
    heading: "A heart surrendered\nto God's purpose",
    body: "From the earliest days of ministry, our pastor has carried a singular conviction  that the Gospel is the power of God for salvation. With humility and unwavering faith, he has shepherded this congregation through every season, anchoring every decision in the Word of God and a deep love for people.",
    photo: pastorPhoto1,
    alt: "Pastor in prayer and ministry",
    verse: "Before I formed you in the womb I knew you, before you were born I set you apart.",
    verseRef: "Jeremiah 1:5",
  },
  {
    number: "02",
    label: "The Word",
    heading: "Faithful proclamation\nthat changes lives",
    body: "Every Sunday, the pulpit becomes a place of encounter. Bold, clear, and deeply practical  the preaching of our pastor meets people exactly where they are and calls them higher. Lives are rebuilt, families are restored, and faith is strengthened week after week.",
    photo: pastorPhoto2,
    alt: "Pastor preaching the Word",
    verse: "Preach the word; be prepared in season and out of season.",
    verseRef: "2 Timothy 4:2",
  },
  {
    number: "03",
    label: "The Mission",
    heading: "Raising a generation\nfor the Kingdom",
    body: "The vision extends far beyond the four walls of the church. Our pastor is committed to raising disciples who carry the same fire  into homes, workplaces, and communities. Through mentorship, discipleship programmes, and outreach, the Kingdom is advancing.",
    photo: pastorPhoto3,
    alt: "Pastor ministering on stage",
    verse: "Go and make disciples of all nations.",
    verseRef: "Matthew 28:19",
  },
  {
    number: "04",
    label: "The Legacy",
    heading: "Excellence, integrity\nand servant leadership",
    body: "Grounded in sound doctrine and committed to lifelong learning, our pastor models what it means to honour Christ in both public ministry and private devotion. His leadership is marked by integrity, excellence, and a servant's heart that inspires everyone around him.",
    photo: pastorPhoto4,
    alt: "Pastor formal portrait",
    verse: "Whoever wants to become great among you must be your servant.",
    verseRef: "Matthew 20:26",
  },
];

// ═══════════════════════════════════════════════════════════════════════════

export const Route = createFileRoute("/pastors")({
  component: PastorsPage,
});

// ── Parallax hero ─────────────────────────────────────────────────────────────
function PastorHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY    = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[92vh] min-h-[600px] overflow-hidden bg-primary-deep">
      {/* Parallax photo */}
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img
          src={PASTOR.heroPhoto}
          alt={PASTOR.name}
          className="w-full h-full object-cover object-top opacity-40"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/95 via-primary-deep/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 md:pb-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <IcgcLogo size={22} />
          <span className="h-px w-8 bg-gold/60" />
          <p className="text-gold uppercase tracking-[0.32em] text-xs font-semibold">
            Our Pastor
          </p>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-semibold text-white text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-tight"
        >
          {PASTOR.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-4 text-gold/80 font-display italic text-lg md:text-2xl"
        >
          {PASTOR.title}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-8 h-px w-24 bg-gradient-to-r from-gold to-transparent origin-left"
        />

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 max-w-2xl"
        >
          <p className="font-display italic text-white/90 text-xl md:text-3xl leading-snug">
            "{PASTOR.heroQuote}"
          </p>
          <p className="mt-5 text-white/55 text-base md:text-lg leading-relaxed font-sans">
            {PASTOR.heroSub}
          </p>
        </motion.blockquote>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8 md:right-12 z-10 flex flex-col items-center gap-2 text-white/30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
        />
        <span className="text-[9px] uppercase tracking-[0.3em] rotate-90 origin-center mt-2">Scroll</span>
      </motion.div>
    </section>
  );
}

// ── Chapter section ───────────────────────────────────────────────────────────
function Chapter({
  chapter,
  index,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
}) {
  const imageRight = index % 2 !== 0;

  return (
    <section className={`relative overflow-hidden ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}>
      {/* Large faded chapter number watermark */}
      <div
        className="absolute top-0 right-0 font-display font-bold text-[20vw] leading-none text-primary/[0.04] select-none pointer-events-none"
        aria-hidden
      >
        {chapter.number}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 md:py-28 lg:py-32">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 items-center ${imageRight ? "lg:[&>*:first-child]:order-2" : ""}`}>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            {/* Decorative frame offset */}
            <div className={`absolute -inset-3 rounded-3xl border border-gold/15 ${imageRight ? "-rotate-1" : "rotate-1"}`} />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-elegant">
              <img
                src={chapter.photo}
                alt={chapter.alt}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Chapter label on photo */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/15 text-white/80 text-[10px] uppercase tracking-[0.28em] font-semibold px-3 py-1.5 rounded-full">
                  <span className="text-gold">{chapter.number}</span>
                  <span className="w-px h-3 bg-white/20" />
                  {chapter.label}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col"
          >
            {/* Chapter number + label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-5xl font-bold text-primary/20 leading-none">
                {chapter.number}
              </span>
              <div>
                <p className="text-primary uppercase tracking-[0.3em] text-[10px] font-semibold">
                  {chapter.label}
                </p>
              </div>
            </div>

            {/* Heading */}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl xl:text-[3.25rem] font-semibold text-foreground leading-[1.08] tracking-tight whitespace-pre-line">
              {chapter.heading}
            </h2>

            {/* Gold rule */}
            <div className="mt-7 mb-7 h-px w-16 bg-gradient-to-r from-primary to-gold/50 rounded-full" />

            {/* Body */}
            <p className="text-muted-foreground text-base md:text-lg leading-[1.8] max-w-lg">
              {chapter.body}
            </p>

            {/* Scripture pull-quote */}
            <div className="mt-10 pl-5 border-l-2 border-gold/50">
              <p className="font-display italic text-foreground/80 text-lg md:text-xl leading-snug">
                "{chapter.verse}"
              </p>
              <p className="mt-2 text-gold text-xs uppercase tracking-[0.28em] font-semibold">
                — {chapter.verseRef}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Closing CTA ───────────────────────────────────────────────────────────────
function PastorCta() {
  return (
    <section className="bg-primary-deep py-24 md:py-32 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.62 0.13 158 / 0.3), transparent)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]">
        <IcgcLogo size={500} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-12 bg-gold/40" />
          <IcgcLogo size={26} />
          <span className="h-px w-12 bg-gold/40" />
        </div>

        <h2 className="font-display text-4xl md:text-6xl font-semibold text-white leading-tight text-balance">
          Come and{" "}
          <span className="italic text-gold">experience</span>{" "}
          the ministry.
        </h2>

        <p className="mt-6 text-white/55 text-lg leading-relaxed max-w-xl mx-auto">
          Join us this Sunday and sit under anointed teaching that will strengthen your faith and transform your life.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 bg-gold text-gold-foreground px-7 py-4 rounded-full font-semibold hover:brightness-110 transition-all shadow-elegant"
          >
            View Service Times
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/next-steps"
            className="inline-flex items-center gap-2 border border-white/25 text-white/90 px-7 py-4 rounded-full font-medium hover:bg-white/10 transition-all"
          >
            Plan Your Visit
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function PastorsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar revealAfterVh={0} />
      <main>
        <PastorHero />
        {CHAPTERS.map((chapter, i) => (
          <Chapter key={chapter.number} chapter={chapter} index={i} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
