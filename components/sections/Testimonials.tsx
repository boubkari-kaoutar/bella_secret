"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

const reviewImages = [
  "/images/review1.jpeg",
  "/images/review2.jpeg",
  "/images/review3.jpeg",
  "/images/review4.jpeg",
  "/images/review5.jpeg",
  "/images/review6.jpeg",
  "/images/review7.jpeg",
  "/images/review8.jpeg",
];

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setCurrent((c) => (c === 0 ? reviewImages.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === reviewImages.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionTitle
            badge={t("badge")}
            title={t("title")}
            highlight={t("highlight")}
            subtitle={t("subtitle")}
            center
          />
        </div>

        {/* ── Desktop grid 4 cols × 2 rows ── */}
        <div className="hidden md:grid grid-cols-4 gap-4">
          {reviewImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden cursor-zoom-in border border-gray-100 hover:border-[#EBD060]/40 hover:shadow-[0_4px_30px_rgba(211,156,22,0.15)] transition-all duration-400"
              style={{ aspectRatio: "4/5" }}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={src}
                alt={`Avis client ${i + 1}`}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 1200px) 25vw, 280px"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-black text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  {t("see")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile slider ── */}
        <div className="md:hidden">
          <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0"
                onClick={() => setLightbox(current)}
              >
                <Image
                  src={reviewImages[current]}
                  alt={`Avis client ${current + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5 px-1">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#D39C16] hover:text-[#D39C16] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {reviewImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-6 h-2 bg-[#D39C16]" : "w-2 h-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#D39C16] hover:text-[#D39C16] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-14 pt-10 border-t border-gray-100"
        >
          {[
            { value: "500+", label: t("stat1") },
            { value: "4.9/5", label: t("stat2") },
            { value: "100%", label: t("stat3") },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-2xl font-bold text-black"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {s.value}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={reviewImages[lightbox]}
                alt={`Avis client ${lightbox + 1}`}
                fill
                className="object-cover"
                sizes="400px"
              />
            </motion.div>

            {/* Prev / Next inside lightbox */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! === 0 ? reviewImages.length - 1 : l! - 1)); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((l) => (l! === reviewImages.length - 1 ? 0 : l! + 1)); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-sm uppercase tracking-widest"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
