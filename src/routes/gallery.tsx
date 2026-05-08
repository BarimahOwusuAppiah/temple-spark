import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { StickyScrollGallery } from "@/components/ui/sticky-scroll";
import { IcgcLogo } from "@/components/site/IcgcLogo";
import { getGallery, type GallerySunday } from "@/lib/store";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

// ── Sunday section ────────────────────────────────────────────────────────────
function SundaySection({
  sunday,
  index,
}: {
  sunday: GallerySunday;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-10 border-b border-white/[0.06] last:border-b-0">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          className={`mb-10 flex flex-col ${isEven ? "items-start" : "items-end text-right"}`}
        >
          <p className="text-amber-400 uppercase tracking-[0.3em] text-[10px] font-semibold mb-2 flex items-center gap-2">
            <ImageIcon size={11} />
            {sunday.date}
          </p>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
            {sunday.theme}
          </h3>
          {sunday.verse && (
            <p className="mt-2 font-display italic text-white/45 text-sm md:text-base">
              "{sunday.verse}"
            </p>
          )}
          <div
            className={`mt-4 h-px w-14 bg-gradient-to-r from-amber-400 to-amber-400/20 rounded-full ${
              isEven ? "" : "ml-auto"
            }`}
          />
        </motion.div>

        {/* Photo grid */}
        {sunday.photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[260px] gap-2 md:gap-3">
            {sunday.photos.map((photo, pi) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: pi * 0.07, ease: [0.22, 1, 0.36, 1] as const }}
                className={`relative overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer ${
                  photo.span === "wide" ? "col-span-2" :
                  photo.span === "tall" ? "row-span-2" : ""
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {photo.alt && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-xs font-medium uppercase tracking-wider">{photo.alt}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/30 border border-white/10 rounded-2xl">
            <ImageIcon size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No photos yet — add them in the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function GalleryPage() {
  const [sundays, setSundays] = useState<GallerySunday[]>([]);
  useEffect(() => { setSundays(getGallery()); }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
      <Navbar revealAfterVh={0} />

      <main>
        {/* Sticky scroll hero — no padding wrapper */}
        <StickyScrollGallery />

        {/* Sunday-by-Sunday sections */}
        <div className="bg-slate-950">

          {/* Bridge header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 md:pt-20 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-12 bg-amber-400/40" />
                <IcgcLogo size={24} />
                <span className="h-px w-12 bg-amber-400/40" />
              </div>
              <p className="text-amber-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
                Sunday by Sunday
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
                A record of{" "}
                <span className="italic text-amber-400">God's faithfulness</span>
              </h2>
              <p className="mt-4 text-white/45 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                Every week, something beautiful happens in this house. Here is the evidence.
              </p>
            </motion.div>
          </div>

          {/* Individual Sunday sections */}
          {sundays.length === 0 ? (
            <div className="text-center py-20 text-white/30 px-4">
              <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No Sunday galleries yet.</p>
              <p className="text-xs mt-1 text-white/20">Go to <a href="/admin" className="underline text-amber-400/60">Admin Panel</a> to add Sunday sections and photos.</p>
            </div>
          ) : (
            sundays.map((sunday, i) => (
              <SundaySection key={sunday.id} sunday={sunday} index={i} />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
