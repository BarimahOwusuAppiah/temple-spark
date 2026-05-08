/**
 * StickyScrollGallery
 *
 * The component fills exactly 100vh — no blank space below.
 * It has its own internal scroll container. As you scroll inside it,
 * the left column moves up and the right column moves down.
 * The centre column stays fixed.
 *
 * The HandWrittenTitle overlays on load and fades as you scroll.
 *
 * ✏️  Edit LEFT_IMAGES, CENTRE_IMAGES, RIGHT_IMAGES below.
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";

// Images served from /public/images/ — no Vite bundling, smaller build
const g = (n: number) => `/images/gallery${n}.jpg`;

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  EDIT YOUR IMAGES HERE
// ─────────────────────────────────────────────────────────────────────────────

const LEFT_IMAGES = [
  { src: g(1),  alt: "Gallery 1"  },
  { src: g(2),  alt: "Gallery 2"  },
  { src: g(3),  alt: "Gallery 3"  },
  { src: g(4),  alt: "Gallery 4"  },
  { src: g(5),  alt: "Gallery 5"  },
  { src: g(6),  alt: "Gallery 6"  },
  { src: g(7),  alt: "Gallery 7"  },
  { src: g(8),  alt: "Gallery 8"  },
  { src: g(9),  alt: "Gallery 9"  },
  { src: g(10), alt: "Gallery 10" },
  { src: g(21), alt: "Gallery 21" },
];

const CENTRE_IMAGES = [
  { src: g(22), alt: "Gallery 22", tall: true  },
  { src: g(23), alt: "Gallery 23", tall: false },
  { src: g(24), alt: "Gallery 24", tall: false },
  { src: g(11), alt: "Gallery 11", tall: true  },
  { src: g(25), alt: "Gallery 25", tall: false },
];

const RIGHT_IMAGES = [
  { src: g(12), alt: "Gallery 12" },
  { src: g(13), alt: "Gallery 13" },
  { src: g(14), alt: "Gallery 14" },
  { src: g(15), alt: "Gallery 15" },
  { src: g(16), alt: "Gallery 16" },
  { src: g(17), alt: "Gallery 17" },
  { src: g(18), alt: "Gallery 18" },
  { src: g(19), alt: "Gallery 19" },
  { src: g(20), alt: "Gallery 20" },
  { src: g(26), alt: "Gallery 26" },
  { src: g(27), alt: "Gallery 27" },
  { src: g(2),  alt: "Gallery 2"  },
];

// ─────────────────────────────────────────────────────────────────────────────
// END EDIT ZONE
// ─────────────────────────────────────────────────────────────────────────────

export function StickyScrollGallery() {
  // scrollRef is the internal scroll container — h-screen, overflow-y-scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track scroll progress INSIDE the container (not the page)
  const { scrollYProgress } = useScroll({ container: scrollRef });

  // Title fades out after first 8% of internal scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const titleY       = useTransform(scrollYProgress, [0, 0.08], [0, -24]);

  // Progress bar
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Scroll hint
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Column travel — how far left/right columns move (% of their own height)
  const travel = 72;
  const leftY  = useTransform(scrollYProgress, [0, 1], ["0%",        `-${travel}%`]);
  const rightY = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, "0%"       ]);

  return (
    // ── Outer shell: exactly h-screen, no overflow to the page ──────────────
    <div className="h-screen w-full bg-slate-950 relative">

      {/* ── Internal scroll container — this is what the user scrolls ──────── */}
      <div
        ref={scrollRef}
        className="h-full w-full overflow-y-scroll"
        // The inner content must be taller than h-screen to allow scrolling.
        // We use a tall inner div as the scroll target.
      >
        {/* Tall inner content — creates the scroll room inside the container */}
        <div style={{ height: "500vh" }} className="relative">

          {/* ── Sticky panel — sticks inside the scroll container ── */}
          <div className="sticky top-0 h-screen overflow-hidden">

            {/* Grid background */}
            <div className="absolute inset-0 bg-slate-950">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />
            </div>

            {/* Three-column grid */}
            <div className="relative h-full grid grid-cols-12 gap-2 px-2 overflow-hidden">

              {/* LEFT — moves up */}
              <motion.div
                style={{ y: leftY }}
                className="col-span-4 flex flex-col gap-2 py-2 will-change-transform"
              >
                {[...LEFT_IMAGES, ...LEFT_IMAGES].map((img, i) => (
                  <div key={i} className="relative w-full aspect-[3/4] shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
                  </div>
                ))}
              </motion.div>

              {/* CENTRE — never moves */}
              <div className="col-span-4 h-full flex flex-col gap-2 py-2 overflow-hidden">
                {CENTRE_IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-xl shrink-0 ${img.tall ? "flex-[2]" : "flex-[1]"}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* RIGHT — moves down */}
              <motion.div
                style={{ y: rightY }}
                className="col-span-4 flex flex-col gap-2 py-2 will-change-transform"
              >
                {[...RIGHT_IMAGES, ...RIGHT_IMAGES].map((img, i) => (
                  <div key={i} className="relative w-full aspect-[3/4] shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* HandWrittenTitle overlay */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative z-10 w-full">
                <HandWrittenTitle
                  title="Welcome to Our Gallery"
                  subtitle="A visual record of God's faithfulness — Sunday by Sunday."
                  color="white"
                />
              </div>
            </motion.div>

            {/* Eyebrow */}
            <div className="absolute top-6 left-6 z-30 flex items-center gap-3">
              <span className="w-5 h-px bg-amber-400/70" />
              <p className="text-amber-400 uppercase tracking-[0.3em] text-[10px] font-semibold">
                ICGC Greater Grace — Gallery
              </p>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-30">
              <motion.div style={{ width: barWidth }} className="h-full bg-amber-400 origin-left" />
            </div>

            {/* Scroll hint */}
            <motion.div
              style={{ opacity: hintOpacity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/40"
            >
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-10 bg-gradient-to-b from-amber-400/60 to-transparent"
              />
              <span className="text-[10px] uppercase tracking-[0.28em] font-medium">Scroll</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyScrollGallery;
