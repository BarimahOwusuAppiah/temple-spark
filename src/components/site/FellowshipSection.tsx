import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const img1 = "/images/gallery26.jpg";
const img2 = "/images/gallery27.jpg";
const img3 = "/images/gallery25.jpg";
const img4 = "/images/gallery20.jpg";

// ─────────────────────────────────────────────────────────────
// ✏️  PHOTOS — swap any src with your own imported asset
// ─────────────────────────────────────────────────────────────
const photos = [
  { src: img1, alt: "Congregation in fellowship" },
  { src: img2, alt: "Open Bible with morning light" },
  { src: img3, alt: "Worship band on stage" },
  { src: img4, alt: "Pastor preaching at the pulpit" },
];

// ── Overlapping portrait cards (mobile) ──────────────────────
function OverlappingCards() {
  const [frontIndex, setFrontIndex] = useState(0);
  const backIndex = frontIndex === 0 ? 1 : 0;

  const front = photos[frontIndex];
  const back  = photos[backIndex];

  return (
    <div className="relative w-full max-w-xs mx-auto select-none" style={{ height: "300px" }}>

      {/* Back card — tap to bring to front */}
      <motion.div
        key={`back-${backIndex}`}
        onClick={() => setFrontIndex(backIndex)}
        animate={{ rotate: 5, zIndex: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute cursor-pointer"
        style={{ top: "28px", left: "44px", right: "0px", bottom: "0px" }}
        whileTap={{ scale: 0.97 }}
      >
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_16px_48px_-8px_rgba(0,0,0,0.28)] ring-1 ring-black/8">
          <img
            src={back.src}
            alt={back.alt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {/* Tap hint overlay */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors rounded-3xl flex items-end justify-center pb-4">
            <span className="text-white/70 text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100">
              Tap to swap
            </span>
          </div>
        </div>
      </motion.div>

      {/* Front card */}
      <motion.div
        key={`front-${frontIndex}`}
        animate={{ rotate: -3, zIndex: 10 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute"
        style={{ top: "0px", left: "0px", right: "44px", bottom: "28px" }}
      >
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_24px_64px_-8px_rgba(0,0,0,0.42)] ring-[3px] ring-white/80">
          <img
            src={front.src}
            alt={front.alt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Dot indicators */}
      <div className="absolute -bottom-7 left-0 right-0 flex justify-center gap-1.5">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setFrontIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              frontIndex === i ? "w-5 bg-primary" : "w-1.5 bg-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Desktop 4-column grid ─────────────────────────────────────
function PhotoGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {photos.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
          className={`relative overflow-hidden rounded-2xl group h-56 sm:h-72 md:h-80 lg:h-96 ${
            idx % 2 !== 0 ? "lg:translate-y-8" : ""
          }`}
        >
          <img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      ))}
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────
export function FellowshipSection() {
  return (
    <section className="relative bg-background py-16 md:py-28 lg:py-36 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-xs font-medium mb-4">
            Community
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-foreground font-semibold text-balance">
            Join Us in{" "}
            <span className="text-primary italic">Fellowship</span>
          </h2>
        </div>

        {/* Mobile: overlapping portrait cards */}
        <div className="sm:hidden mb-14">
          <OverlappingCards />
        </div>

        {/* Tablet + Desktop: 4-column grid */}
        <div className="hidden sm:block">
          <PhotoGrid />
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-24 text-center max-w-2xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl md:text-5xl text-foreground font-semibold leading-tight text-balance">
            How will you take your{" "}
            <span className="italic text-primary">next step?</span>
          </h3>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Every journey begins with one decision. Tell us where you'd like to grow.
          </p>
          <Link
            to="/next-steps"
            className="group inline-flex items-center gap-3 mt-8 text-primary font-medium text-base md:text-lg story-link"
          >
            Discover your way to take the next step
            <ArrowRight
              className="transition-transform group-hover:translate-x-1"
              size={18}
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
