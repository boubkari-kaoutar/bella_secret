"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

const row1 = [...reviewImages, ...reviewImages];
const row2 = [...reviewImages].reverse().concat([...reviewImages].reverse());

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          width: max-content;
          animation: marquee-left 28s linear infinite;
        }
        .marquee-track-right {
          display: flex;
          width: max-content;
          animation: marquee-right 32s linear infinite;
        }
        .marquee-wrap:hover .marquee-track-left,
        .marquee-wrap:hover .marquee-track-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14">
          <SectionTitle
            badge={t("badge")}
            title={t("title")}
            highlight={t("highlight")}
            subtitle={t("subtitle")}
            center
          />
        </ScrollReveal>
      </div>

      {/* ── Marquee rows ── */}
      <div className="marquee-wrap" style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "64px" }}>
        {/* Row 1 — left */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          {/* Fade edges */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div className="marquee-track-left">
            {row1.map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i % reviewImages.length)}
                style={{
                  flexShrink: 0, width: 200, height: 260, margin: "0 8px",
                  borderRadius: 16, overflow: "hidden", cursor: "zoom-in",
                  border: "1px solid #f0f0f0",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(211,156,22,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Image src={src} alt={`Avis ${i + 1}`} width={200} height={260} style={{ objectFit: "cover", width: "100%", height: "100%" }} sizes="200px" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div className="marquee-track-right">
            {row2.map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i % reviewImages.length)}
                style={{
                  flexShrink: 0, width: 200, height: 260, margin: "0 8px",
                  borderRadius: 16, overflow: "hidden", cursor: "zoom-in",
                  border: "1px solid #f0f0f0",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(211,156,22,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Image src={src} alt={`Avis ${i + 1}`} width={200} height={260} style={{ objectFit: "cover", width: "100%", height: "100%" }} sizes="200px" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-14 pt-10 border-t border-gray-100"
        >
          {[
            { value: "500+", label: t("stat1") },
            { value: "4.9/5", label: t("stat2") },
            { value: "100%", label: t("stat3") },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-black" style={{ fontFamily: "Playfair Display, serif" }}>
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
