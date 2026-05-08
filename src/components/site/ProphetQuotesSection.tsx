import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import myphoto from "@/assets/pastor-profile-2.png"
import myphoto1 from "@/assets/pastor-profile-1.png"
const myphoto2 = "/images/church1.jpg";
const myphoto3 = "/images/church2.jpg";
const myphoto4 = "/images/church3.jpg";


// ============================================================
// ✏️  EDIT YOUR PROPHET IMAGES & QUOTES HERE
//
// To swap a photo:
//   1. Drop your image file into  src/assets/
//   2. Import it at the top of this block, e.g.:
//        import myPhoto from "@/assets/my-prophet-photo.jpg";
//   3. Replace the `src` value in the matching entry below.
//
// To change a quote, name, or title just edit the strings.
// To add a new prophet, copy one object and paste it at the end.
// ============================================================

// --- Option A: use local files from src/assets/ ---
// import johnWesleyPhoto   from "@/assets/john-wesley.jpg";
// import charlesSpurgeonPhoto from "@/assets/charles-spurgeon.jpg";
// import billionGrahamPhoto from "@/assets/billy-graham.jpg";
// import corrieTenBoomPhoto from "@/assets/corrie-ten-boom.jpg";
// import mylesMunroePhoto   from "@/assets/myles-munroe.jpg";

// --- Option B: use the URLs below (swap any URL with your own hosted image) ---

const prophetQuotes = [
  {
    // ✏️ Replace src with your own image of Billy Graham
    src: myphoto,
    name: "Billy Graham",
    designation: "Evangelist & Preacher",
    quote:
      "The will of God will never take you to where the grace of God will not protect you.",
  },
  {
    // ✏️ Replace src with your own image of Myles Munroe
    src: myphoto1,
    name: "Myles Munroe",
    designation: "Pastor & Kingdom Teacher",
    quote:
      "The greatest tragedy in life is not death, but a life without a purpose.",
  },
  {
    // ✏️ Replace src with your own image of Charles Spurgeon
    src: myphoto2,
    name: "Charles Spurgeon",
    designation: "The Prince of Preachers",
    quote:
      "A Bible that is falling apart usually belongs to someone who is not.",
  },
  {
    // ✏️ Replace src with your own image of Corrie ten Boom
    src: myphoto3,
    name: "Corrie ten Boom",
    designation: "Author & Evangelist",
    quote:
      "You can never learn that Christ is all you need, until Christ is all you have.",
  },
  {
    // ✏️ Replace src with your own image of John Wesley
    src: myphoto4,
    name: "John Wesley",
    designation: "Revivalist & Theologian",
    quote:
      "Do all the good you can, by all the means you can, in all the ways you can, as long as ever you can.",
  },
];

// ============================================================
// END OF EDIT ZONE — no need to touch anything below this line
// ============================================================

export function ProphetQuotesSection() {
  return (
    <section className="relative bg-primary-deep overflow-hidden py-20 md:py-28">
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.42 0.10 158 / 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 100% 100%, oklch(0.78 0.13 85 / 0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-12 bg-gold/50" />
            <span className="text-gold text-base select-none">✦</span>
            <span className="h-px w-12 bg-gold/50" />
          </div>

          <p className="text-gold uppercase tracking-[0.32em] text-[10px] sm:text-xs font-semibold mb-4">
            Words of Inspiration
          </p>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
            Voices of the{" "}
            <span className="italic text-gold">Faithful</span>
          </h2>

          <p className="mt-4 text-white/55 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Timeless wisdom from great men and women who walked in grace and truth.
          </p>
        </div>

        {/* Circular testimonials */}
        <div className="flex items-center justify-center">
          <CircularTestimonials
            testimonials={prophetQuotes}
            autoplay={true}
            colors={{
              name: "#f7f7ff",
              designation: "#c8b97a",
              testimony: "#d1d5db",
              arrowBackground: "#1a2e1a",
              arrowForeground: "#f1f1f7",
              arrowHoverBackground: "#c8b97a",
            }}
            fontSizes={{
              name: "1.55rem",
              designation: "0.875rem",
              quote: "1.075rem",
            }}
          />
        </div>
      </div>
    </section>
  );
}
