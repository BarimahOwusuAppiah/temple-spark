import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import pastorPhoto1 from "@/assets/pastor-profile-1.png";
import pastorPhoto2 from "@/assets/pastor-profile-2.png";
import pastorPhoto3 from "@/assets/pastor-profile-3.png";
import pastorPhoto4 from "@/assets/pastor-profile-4.png";
import { IcgcLogo } from "@/components/site/IcgcLogo";
import {
  BookOpen,
  Heart,
  Shield,
  Star,
  Users,
  Globe,
  ArrowRight,
  ChevronDown,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/hero-worship.jpg";
const communityImg1 = "/images/church2.jpg";
const communityImg2 = "/images/church3.jpg";
const communityImg3 = "/images/whowearepage.jpg";
import pastorImg from "@/assets/pastor-profile-1.png";

// ─────────────────────────────────────────────
// ✏️  EDIT CONTENT HERE
// ─────────────────────────────────────────────

const CHURCH_NAME = "ICGC Greater Grace Temple";
const TAGLINE = "A Place of Grace. A House of Power.";

const INTRO = {
  eyebrow: "Who We Are",
  heading: "More than a church ~ \na family on mission.",
  body: "We are a Christ-centred community committed to transforming lives through faith, love, and service. Whether you are searching, returning, or walking through our doors for the very first time — you belong here. Grace meets you exactly where you are.",
  verse: '"For it is by grace you have been saved, through faith." — Ephesians 2:8',
};

const IDENTITY = {
  eyebrow: "Our Identity",
  heading: "Bible-believing. Spirit-led. Kingdom-focused.",
  body: "We are a Bible-believing church dedicated to raising disciples of Jesus Christ and impacting our community through love and truth. Every sermon, every prayer meeting, every act of service flows from one conviction: the Gospel changes everything.",
  pillars: [
    "Grounded in the authority of Scripture",
    "Empowered by the Holy Spirit",
    "Committed to discipleship and spiritual growth",
    "Engaged in community transformation",
  ],
};

// ─────────────────────────────────────────────
// ✏️  EDIT YOUR LEADERS HERE
// Replace src with imported local assets, e.g.:
//   import leaderPhoto from "@/assets/leader-name.jpg";
// ─────────────────────────────────────────────
const LEADERS = [
  {
    src: pastorPhoto1,
    name: "Pastor",
    role: "Senior Pastor",
    bio: "Shepherd, teacher, and visionary leader of Greater Grace Temple.",
  },
  {
    src: pastorPhoto2,
    name: "Associate Pastor",
    role: "Associate Pastor",
    bio: "Committed to discipleship, prayer, and building the next generation.",
  },
  {
    src: pastorPhoto3,
    name: "Worship Leader",
    role: "Director of Worship",
    bio: "Leading the congregation into the presence of God through Spirit-filled worship.",
  },
  {
    src: pastorPhoto4,
    name: "Youth Pastor",
    role: "Youth & Young Adults",
    bio: "Raising a generation of bold, faith-filled young people for the Kingdom.",
  },
];

const VALUES = [
  {
    icon: BookOpen,
    title: "Faith",
    body: "We anchor every decision in the Word of God and trust Him in every season.",
  },
  {
    icon: Heart,
    title: "Love",
    body: "We pursue radical, unconditional love  for God, for one another, and for our city.",
  },
  {
    icon: Shield,
    title: "Integrity",
    body: "We hold ourselves to the highest standard of honesty, transparency, and character.",
  },
  {
    icon: Star,
    title: "Excellence",
    body: "We honour God by giving our very best in worship, service, and daily life.",
  },
  {
    icon: Users,
    title: "Community",
    body: "We are stronger together. We celebrate diversity and build genuine belonging.",
  },
  {
    icon: Globe,
    title: "Service",
    body: "We exist not to be served but to serve  in our church, our city, and the nations.",
  },
];

const HISTORY = {
  eyebrow: "Our Story",
  heading: "From a seed of faith\nto a house of power.",
  paragraphs: [
    "ICGC Greater Grace Temple was planted with a simple but bold conviction that God's grace is sufficient for every person, in every circumstance. What began as a small gathering of believers hungry for the Word has grown into a thriving congregation that reaches across Accra and beyond.",
    "Through years of faithful preaching, prayer, and service, God has built something beautiful here. Families have been restored, young people have found purpose, and lives have been radically transformed by the power of the Gospel.",
    "Today we stand on the shoulders of those who prayed, sacrificed, and believed  and we press forward with the same fire that started it all.",
  ],
  founded: "Est. in Accra, Ghana",
};

const WHAT_TO_EXPECT = [
  { title: "Vibrant Worship", body: "Spirit-filled praise that draws you into God's presence." },
  { title: "Practical Teaching", body: "Biblical messages that speak directly to real life." },
  { title: "Warm Welcome", body: "Come as you are  no dress code, no performance required." },
  { title: "~90 Min Services", body: "Engaging from start to finish, every Sunday." },
];

// ─────────────────────────────────────────────
// END EDIT ZONE
// ─────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const Route = createFileRoute("/who-we-are")({
  component: WhoWeArePage,
});

// ── Rotating scripture carousel ──────────────────────────────────────────────
const SCRIPTURES = [
  { verse: "Where the Spirit of the Lord is, there is freedom.", ref: "2 Corinthians 3:17" },
  { verse: "My grace is sufficient for you, for my power is made perfect in weakness.", ref: "2 Corinthians 12:9" },
  { verse: "For it is by grace you have been saved, through faith.", ref: "Ephesians 2:8" },
  { verse: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
  { verse: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { verse: "Trust in the Lord with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
];

function RotatingScripture() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SCRIPTURES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = SCRIPTURES[index];

  return (
    <div className="border-l-2 border-gold/60 pl-5 min-h-[7rem] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <p className="font-display italic text-white/90 text-2xl md:text-3xl lg:text-4xl leading-snug">
            "{current.verse}"
          </p>
          <p className="mt-4 text-gold text-sm uppercase tracking-[0.28em] font-medium">
            — {current.ref}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-5">
        {SCRIPTURES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Scripture ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-gold" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function WhoWeArePage() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar revealAfterVh={0} />

      <main>
        {/* ── 1. HERO ─────────────────────────────────────── */}
        <section className="relative h-[92vh] min-h-[600px] flex items-end overflow-hidden">
          <img
            src={heroImg}
            alt="Congregation in worship"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12 md:pb-20 lg:pb-28">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gold uppercase tracking-[0.32em] text-xs font-semibold mb-5"
            >
              {INTRO.eyebrow}
            </motion.p>

            <TypewriterEffectSmooth
              words={[
                { text: "More" },
                { text: "than" },
                { text: "a" },
                { text: "church", className: "text-gold italic" },
                { text: "—" },
                { text: "a" },
                { text: "family", className: "text-gold italic" },
                { text: "on" },
                { text: "mission." },
              ]}
              className="!justify-start font-display font-semibold text-white !my-0 mt-2"
              cursorClassName="bg-gold"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.2 }}
              className="mt-6 text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed"
            >
              {TAGLINE}
            </motion.p>

            {/* Rotating scripture block */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 3.6 }}
              className="mt-10 max-w-2xl"
            >
              <RotatingScripture />
            </motion.div>
          </div>
        </section>

        {/* ── 2. INTRO BODY ───────────────────────────────── */}
        <section className="bg-background py-14 md:py-24 lg:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-14 bg-gold/70" />
              <IcgcLogo size={30} />
              <span className="h-px w-14 bg-gold/70" />
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              {INTRO.body}
            </motion.p>

            <motion.p
              variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mt-8 font-display text-base md:text-lg italic text-muted-foreground/80"
            >
              {INTRO.verse}
            </motion.p>
          </div>
        </section>

        {/* ── 3. IDENTITY ─────────────────────────────────── */}
        <section className="bg-muted/30 border-y border-border/50 py-14 md:py-24 lg:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <p className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-5">
                {IDENTITY.eyebrow}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-balance">
                {IDENTITY.heading}
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                {IDENTITY.body}
              </p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {IDENTITY.pillars.map((pillar, i) => {
                const icons = [BookOpen, Shield, Users, Globe];
                const Icon = icons[i];
                const accents = [
                  "border-primary/25 hover:border-primary/50",
                  "border-gold/25 hover:border-gold/50",
                  "border-primary/20 hover:border-primary/40",
                  "border-gold/20 hover:border-gold/40",
                ];
                const iconColors = [
                  "text-primary bg-primary/10",
                  "text-gold-foreground bg-gold/15",
                  "text-primary bg-primary/10",
                  "text-gold-foreground bg-gold/15",
                ];
                return (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -3 }}
                    className={`relative flex items-start gap-4 rounded-2xl border bg-background ${accents[i]} px-5 py-5 shadow-soft transition-all duration-300 overflow-hidden`}
                  >
                    {/* Faded number watermark */}
                    <span className="absolute -right-1 -bottom-2 font-display font-bold text-7xl text-foreground/[0.04] select-none pointer-events-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <span className={`shrink-0 mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg ${iconColors[i]}`}>
                      <Icon size={17} strokeWidth={1.8} />
                    </span>

                    {/* Text */}
                    <span className="font-display text-base md:text-lg font-semibold text-foreground leading-snug">
                      {pillar}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </section>

        {/* ── 4. OUR LEADERS ──────────────────────────────── */}
        <section className="bg-primary-deep py-14 md:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(0.62 0.13 158 / 0.35), transparent)" }}
          />
          {/* Faint logo watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
            <IcgcLogo size={480} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-12 bg-gold/50" />
                <IcgcLogo size={28} />
                <span className="h-px w-12 bg-gold/50" />
              </div>
              <p className="text-gold uppercase tracking-[0.32em] text-xs font-semibold mb-4">
                Our Leaders
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
                Guided by{" "}
                <span className="italic text-gold">wisdom &amp; grace</span>
              </h2>
              <p className="mt-4 text-white/55 max-w-lg mx-auto leading-relaxed">
                Men and women called, equipped, and committed to shepherding this house with integrity and love.
              </p>
            </div>

            {/* Leader cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {LEADERS.map((leader, i) => (
                <motion.div
                  key={leader.name}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8 }}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Photo */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl mb-5 shadow-elegant ring-1 ring-white/10">
                    <img
                      src={leader.src}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Role badge — bottom of photo */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block bg-gold/90 text-gold-foreground text-[10px] uppercase tracking-[0.22em] font-semibold px-3 py-1 rounded-full">
                        {leader.role}
                      </span>
                    </div>

                    {/* Gold border glow on hover */}
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-gold/0 group-hover:ring-gold/40 transition-all duration-500 pointer-events-none" />
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white leading-tight">
                    {leader.name}
                  </h3>

                  {/* Bio */}
                  <p className="mt-2 text-white/55 text-sm leading-relaxed max-w-[220px]">
                    {leader.bio}
                  </p>

                  {/* Decorative line */}
                  <div className="mt-4 w-8 h-px bg-gradient-to-r from-gold/60 to-transparent rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. CORE VALUES ──────────────────────────────── */}
        <section className="bg-background py-14 md:py-24 lg:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                Core Values
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                What we stand for
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
                These six values are not just words on a wall  they shape how we worship, serve, and live together.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-border bg-card p-7 shadow-soft hover:border-primary/40 hover:shadow-elegant transition-all"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                    <v.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. COMMUNITY PHOTOS ─────────────────────────── */}
        <section className="bg-muted/20 border-y border-border/50 py-14 md:py-24 lg:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Images mosaic */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="col-span-2 rounded-2xl overflow-hidden h-48 sm:h-64 md:h-80">
                <img src={communityImg1} alt="Church community in fellowship" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="rounded-2xl overflow-hidden h-32 sm:h-44 md:h-52">
                <img src={communityImg2} alt="Open Bible in morning light" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="rounded-2xl overflow-hidden h-32 sm:h-44 md:h-52">
                <img src={communityImg3} alt="Worship band on stage" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <p className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-4 mt-6 lg:mt-0">
                Our Community
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-balance">
                A family where{" "}
                <span className="italic text-primary">everyone</span> belongs.
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                We are a diverse and welcoming family  individuals, couples, young people, and children  all growing together in faith. No matter your background, your story, or where you are in your journey, there is a place for you here.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                From vibrant youth gatherings to deep-rooted men's and women's fellowships, our community is built on genuine relationships and a shared love for Christ.
              </p>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 mt-8 text-primary font-medium story-link"
              >
                Explore our ministries
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 7. HISTORY ──────────────────────────────────── */}
        <section className="bg-background py-14 md:py-24 lg:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Sticky label */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <p className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                  {HISTORY.eyebrow}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight whitespace-pre-line">
                  {HISTORY.heading}
                </h2>
                <div className="mt-8 h-px w-16 bg-gradient-to-r from-primary to-gold/60 rounded-full" />
                <p className="mt-6 text-sm text-muted-foreground/70 uppercase tracking-widest font-medium">
                  {HISTORY.founded}
                </p>
              </motion.div>
            </div>

            {/* Paragraphs */}
            <div className="lg:col-span-8 space-y-6">
              {HISTORY.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="text-muted-foreground text-lg leading-relaxed border-l-2 border-border pl-6"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. PASTOR HIGHLIGHT ─────────────────────────── */}
        <section className="bg-primary-deep py-14 md:py-20 lg:py-28 px-4 sm:px-6 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%, oklch(0.42 0.10 158 / 0.5), transparent)" }}
          />
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="shrink-0 w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-gold/30 shadow-elegant"
            >
              <img src={pastorImg} alt="Our Pastor" className="w-full h-full object-cover object-top" />
            </motion.div>

            <motion.div
              variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <p className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                Our Leadership
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-white leading-tight max-w-2xl">
                Led by wisdom, passion, and a heart for people.
              </h2>
              <p className="mt-4 text-white/65 leading-relaxed max-w-xl">
                Our pastor shepherds this congregation with humility, biblical conviction, and a deep love for every soul that walks through our doors. Under his leadership, Greater Grace Temple continues to grow in faith, unity, and Kingdom impact.
              </p>
              <Link
                to="/pastors"
                className="group inline-flex items-center gap-2 mt-7 text-gold font-medium story-link"
              >
                Meet our pastor
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── 9. WHAT TO EXPECT ───────────────────────────── */}
        <section className="bg-background py-14 md:py-24 lg:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-primary uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                First Time?
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                Here's what to expect
              </h2>
              <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
                We want you to feel at home from the moment you arrive. No surprises  just a warm, genuine welcome.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHAT_TO_EXPECT.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
                  className="rounded-2xl bg-muted/40 border border-border p-6 md:p-7"
                >
                  <span className="font-display text-5xl font-bold text-primary/15 leading-none block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. CTA ─────────────────────────────────────── */}
        <section className="relative bg-primary-deep py-28 md:py-40 px-6 overflow-hidden">
          {/* layered background glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 90% 55% at 50% 0%, oklch(0.42 0.10 158 / 0.55), transparent)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 80% 100%, oklch(0.78 0.13 85 / 0.08), transparent)" }}
          />
          {/* faint ICGC logo watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06]">
            <IcgcLogo size={480} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* ornament */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className="h-px w-14 bg-gold/40" />
              <IcgcLogo size={26} />
              <span className="h-px w-14 bg-gold/40" />
            </motion.div>

            {/* eyebrow */}
            <motion.p
              variants={fadeUp} custom={0.5} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.32em] text-[10px] sm:text-xs font-semibold mb-6"
            >
              You are welcome here
            </motion.p>

            {/* typewriter headline */}
            <TypewriterEffectSmooth
              words={[
                { text: "Come" },
                { text: "as" },
                { text: "you" },
                { text: "are.", className: "text-gold" },
                { text: "Leave" },
                { text: "changed", className: "text-gold italic" },
                { text: "forever." },
              ]}
              className="justify-center font-display font-semibold text-white"
              cursorClassName="bg-gold"
            />

            {/* sub-copy */}
            <motion.p
              variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mt-4 text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            >
              Join us this Sunday and experience the warmth, the worship, and the Word
              that has been transforming lives in Accra and beyond.
            </motion.p>

            {/* service time chips */}
            <motion.div
              variants={fadeUp} custom={1.5} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              {[
                { icon: CalendarDays, label: "Sunday 7:00 AM" },
                { icon: CalendarDays, label: "Sunday 9:30 AM" },
                { icon: MapPin,        label: "Accra, Ghana"   },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm px-4 py-2 text-xs text-white/75 font-medium"
                >
                  <Icon size={13} className="text-gold" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/next-steps"
                className="group inline-flex items-center gap-2 bg-gold text-gold-foreground px-7 py-4 rounded-full font-semibold hover:brightness-110 transition-all shadow-elegant"
              >
                Plan Your Visit
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-white/25 text-white/90 px-7 py-4 rounded-full font-medium hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
              >
                View Service Times
              </Link>
            </motion.div>

            {/* scripture */}
            <motion.p
              variants={fadeUp} custom={2.5} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mt-12 font-display italic text-white/35 text-sm md:text-base"
            >
              "My grace is sufficient for you."  2 Corinthians 12:9
            </motion.p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
