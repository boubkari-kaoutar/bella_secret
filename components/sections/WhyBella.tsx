"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Leaf, FlaskConical, Sparkles, Heart, Globe, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const icons = [Leaf, FlaskConical, Sparkles, Heart, Globe, Users];
const LABELS_FR = ["NATURALITÉ", "SCIENCE", "PATRIMOINE", "BIEN-ÊTRE", "ÉCOLOGIE", "SOCIAL"];
const LABELS_AR = ["الطبيعية", "العلم", "التراث المغربي", "الصحة والثقة", "الالتزام البيئي", "المسؤولية الاجتماعية"];
const COLORS = ["#EBD060", "#D39C16", "#B8860B", "#EBD060", "#D39C16", "#B8860B"];
const AUTO_DELAY = 3500;

const stackBehind = [
  { rotate: 5,  x: 22, y: -14, scale: 0.95, opacity: 0.75 },
  { rotate: 10, x: 44, y: -28, scale: 0.90, opacity: 0.45 },
  { rotate: 15, x: 66, y: -42, scale: 0.85, opacity: 0.22 },
];

export default function WhyBella() {
  const t = useTranslations("why");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const LABELS = locale === "ar" ? LABELS_AR : LABELS_FR;
  const leftRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = t.raw("items") as { title: string; desc: string }[];

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setActive((a) => (a + 1) % items.length);
    }, AUTO_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, items.length]);

  // Left reveal
  useEffect(() => {
    if (!leftRef.current) return;
    gsap.fromTo(
      leftRef.current.querySelectorAll(".left-anim"),
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.7, stagger: 0.13, ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 78%", once: true },
      }
    );
  }, []);

  const handleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDirection(1);
    setActive((a) => (a + 1) % items.length);
  };

  const handleDotClick = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* ── Left: text ── */}
          <div ref={leftRef} className="lg:sticky lg:top-28">
            <span className="left-anim opacity-0 inline-block text-[#D39C16] text-[11px] font-bold tracking-[0.25em] uppercase mb-5">
              {t("badge")}
            </span>
            <h2
              className="left-anim opacity-0 text-4xl sm:text-5xl font-bold text-black leading-tight mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("title")}{" "}
              <span style={{
                background: "linear-gradient(135deg, #EBD060, #D39C16)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t("highlight")}
              </span>
            </h2>

            <div className="left-anim opacity-0 w-10 h-[3px] bg-gradient-to-r from-[#EBD060] to-[#D39C16] rounded-full mb-6" />

            <p className="left-anim opacity-0 text-gray-500 text-base leading-relaxed mb-10 max-w-sm">
              {t("subtitle")}
            </p>

            {/* Dots nav */}
            <div className="left-anim opacity-0 flex items-center gap-2 mb-10">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    backgroundColor: i === active ? "#D39C16" : "#E5E7EB",
                  }}
                />
              ))}
            </div>

            {/* MMPS */}
            <div className="left-anim opacity-0">
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-4">{t("certified")}</p>
              <div className="inline-flex items-center gap-4 bg-[#FAF6F0] rounded-2xl px-6 py-4 border border-gray-100">
                <img src="/images/mmps.png" alt="MMPS" className="h-10 object-contain" />
                <div className="border-l border-gray-200 pl-4">
                  <p className="text-xs font-semibold text-black">{t("mmps_name")}</p>
                  <p className="text-xs text-gray-400">{t("mmps_sub")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Stacked cards ── */}
          <div className="relative flex items-center justify-start" style={{ minHeight: 460, paddingRight: 80 }}>
            <div
              className="relative w-full max-w-[420px]"
              style={{ height: 400 }}
              onClick={handleClick}
            >
              {/* Cards behind */}
              {stackBehind.map((s, i) => (
                <div
                  key={`behind-${i}`}
                  className="absolute inset-0 rounded-3xl bg-white border border-gray-100"
                  style={{
                    transform: `rotate(${s.rotate}deg) translateX(${s.x}px) translateY(${s.y}px) scale(${s.scale})`,
                    transformOrigin: "bottom center",
                    opacity: s.opacity,
                    zIndex: 3 - i,
                    boxShadow: "0 12px 48px rgba(0,0,0,0.08)",
                    transition: "transform 0.4s ease, opacity 0.4s ease",
                  }}
                />
              ))}

              {/* Front card — animated */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60, rotate: direction * 4, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -direction * 80, rotate: -direction * 6, scale: 0.93 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0 rounded-3xl bg-white border border-gray-100 p-8 flex flex-col cursor-pointer select-none"
                  style={{ zIndex: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)" }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: COLORS[active] + "20" }}
                    >
                      {(() => { const Icon = icons[active]; return <Icon style={{ width: 20, height: 20, color: COLORS[active] }} />; })()}
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
                      {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: COLORS[active] }}>
                    {LABELS[active]}
                  </p>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold text-black mb-4 leading-snug"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {items[active].title}
                  </h3>

                  {/* Desc */}
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {items[active].desc}
                  </p>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50">
                    <div className="flex gap-1.5">
                      {items.map((_, i) => (
                        <span
                          key={i}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === active ? 20 : 6,
                            height: 6,
                            backgroundColor: i === active ? COLORS[active] : "#E5E7EB",
                            display: "inline-block",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-300 font-medium uppercase tracking-widest">
                      Tap to next →
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
