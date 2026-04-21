"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedButton from "@/components/ui/AnimatedButton";
import {
  Leaf, FlaskConical, Globe, Heart, Award, Users
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const LABELS_VALUES_FR = ["NATURALITÉ", "SCIENCE", "EXCELLENCE", "BIEN-ÊTRE", "GLOBAL", "COMMUNAUTÉ"];
const LABELS_VALUES_AR = ["الطبيعية", "العلم", "التراث المغربي", "الصحة والثقة", "الالتزام البيئي", "المسؤولية الاجتماعية"];

gsap.registerPlugin(ScrollTrigger);

const icons = [Leaf, FlaskConical, Award, Heart, Globe, Users];

export default function AboutClient() {
  const t = useTranslations("about");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const timelineRef = useRef<HTMLDivElement>(null);
  const valueItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeValue, setActiveValue] = useState(0);

  const LABELS_VALUES = locale === "ar" ? LABELS_VALUES_AR : LABELS_VALUES_FR;
  const timelineEvents = t.raw("timeline_events") as { year: string; title: string; desc: string }[];
  const values = t.raw("values") as { title: string; desc: string }[];

  useEffect(() => {
    if (!timelineRef.current) return;
    const items = timelineRef.current.querySelectorAll(".timeline-item");

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    const valueTriggers: ScrollTrigger[] = [];
    valueItemRefs.current.forEach((el, i) => {
      if (!el) return;
      valueTriggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setActiveValue(i),
          onEnterBack: () => setActiveValue(i),
        })
      );
    });

    return () => { valueTriggers.forEach((st) => st.kill()); };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-[#FAF6F0] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&h=1080&fit=crop"
            alt="About Bella Secret"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/85 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[#D39C16] text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          >
            {t("hero_badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t("hero_title")}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #EBD060, #D39C16)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("hero_subtitle")}
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <ScrollReveal>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{t("story")}</p>
                <blockquote className="border-l-4 border-[#EBD060] pl-5 py-1 my-6">
                  <p
                    className="text-black text-xl font-semibold italic"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    « {t("question")} »
                  </p>
                </blockquote>
              </ScrollReveal>
              <ScrollReveal delay={0.18}>
                <div className="grid grid-cols-2 gap-5 mt-8">
                  <div className="bg-[#FAF6F0] rounded-xl p-5">
                    <h4 className="font-bold text-black text-base mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                      {t("mission_title")}
                    </h4>
                    <p className="text-gray-500 text-sm">{t("mission_text")}</p>
                  </div>
                  <div className="bg-black rounded-xl p-5">
                    <h4 className="font-bold text-white text-base mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                      {t("vision_title")}
                    </h4>
                    <p className="text-gray-400 text-sm">{t("vision_text")}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[480px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/salma_bella_secret.png"
                alt="Salma Benabouche – Fondatrice"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                  Salma Benabouche
                </p>
                <p className="text-[#EBD060] text-sm">{t("founder_role")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-14 text-center">
          <SectionTitle
            badge={t("values_badge")}
            title={t("values_title")}
            highlight={t("values_highlight")}
            center
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT: Sticky card */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeValue}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative rounded-[28px] overflow-hidden"
                  style={{ minHeight: 500, boxShadow: "0 24px 64px rgba(0,0,0,0.14)" }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={`/images/piliers/${LABELS_VALUES_FR[activeValue]}.png`}
                      alt={LABELS_VALUES[activeValue]}
                      className="w-full h-full object-cover"
                      style={{ filter: "blur(1.5px)", transform: "scale(1.05)" }}
                    />
                    <div className="absolute inset-0" style={{ backgroundColor: "rgba(250,246,240,0.25)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,9,7,0.72) 0%, rgba(10,9,7,0.15) 55%, transparent 100%)" }} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-10">
                    <p className="text-[11px] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: "#EBD060" }}>
                      {LABELS_VALUES[activeValue]}
                    </p>
                    <h3 className="text-white text-3xl font-bold leading-snug" style={{ fontFamily: "Playfair Display, serif" }}>
                      {values[activeValue]?.title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: Scrollable items */}
            <div className="space-y-4">
              {values.map((v, i) => {
                const Icon = icons[i];
                const isActive = activeValue === i;
                return (
                  <motion.div
                    key={i}
                    ref={(el) => { valueItemRefs.current[i] = el; }}
                    animate={{
                      borderColor: isActive ? "rgba(211,156,22,0.35)" : "rgba(229,231,235,1)",
                      backgroundColor: isActive ? "#FFFDF8" : "#ffffff",
                      boxShadow: isActive ? "0 6px 28px rgba(211,156,22,0.10)" : "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl p-5 border cursor-default"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        animate={{ backgroundColor: isActive ? "rgba(235,208,96,0.18)" : "#F9FAFB" }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      >
                        <Icon style={{ width: 18, height: 18, color: isActive ? "#D39C16" : "#D1D5DB" }} />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5 transition-colors duration-300"
                          style={{ color: isActive ? "#D39C16" : "#D1D5DB" }}>
                          {LABELS_VALUES[i]}
                        </p>
                        <h3 className="font-semibold text-black mb-1" style={{ fontFamily: "Playfair Display, serif", fontSize: "0.95rem" }}>
                          {v.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionTitle
              badge={t("timeline_badge")}
              title={t("timeline_title")}
              highlight={t("timeline_highlight")}
              center
            />
          </div>

          <div ref={timelineRef} className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {timelineEvents.map((event, i) => (
                <div
                  key={i}
                  className={`timeline-item flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 hidden md:block" />

                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#EBD060] text-black flex items-center justify-center font-bold text-sm z-10">
                    {event.year.slice(2, 4)}
                  </div>

                  <div className={`flex-1 bg-[#FAF6F0] border border-gray-100 rounded-2xl p-5 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                    <p className="text-[#D39C16] text-xs font-semibold mb-1">{event.year}</p>
                    <h3
                      className="text-black font-semibold mb-1.5"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promise CTA */}
      <section className="py-20 bg-gradient-to-br from-[#EBD060] to-[#D39C16]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-black/60 text-xs font-semibold uppercase tracking-widest">{t("promise_badge")}</span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-black mt-3 mb-5"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("promise_title")}{" "}
              <span className="text-black/70">{t("promise_highlight")}</span>
            </h2>
            <p className="text-black/70 text-base leading-relaxed mb-8">{t("promise_text")}</p>
            <AnimatedButton href={`/${locale}/shop`} variant="dark" size="lg">
              {t("cta_shop")}
            </AnimatedButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Future */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2
              className="text-3xl sm:text-4xl font-bold text-black mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("future_title")}{" "}
              <span className="text-[#D39C16]">{t("future_highlight")}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("future_text")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Treasures */}
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2
              className="text-3xl sm:text-4xl font-bold text-black mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("treasures_title")}{" "}
              <span className="text-[#D39C16]">{t("treasures_highlight")}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("treasures_text")}
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
