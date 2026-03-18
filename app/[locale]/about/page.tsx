"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedButton from "@/components/ui/AnimatedButton";
import {
  Leaf, FlaskConical, Globe, Heart, Award, Users
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const icons = [Leaf, FlaskConical, Award, Heart, Globe, Users];

export default function AboutPage() {
  const t = useTranslations("about");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const timelineRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-black overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&h=1080&fit=crop"
            alt="About Bella Secret"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
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
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{t("story")}</p>
              <blockquote className="border-l-4 border-[#EBD060] pl-5 py-1 my-6">
                <p
                  className="text-black text-xl font-semibold italic"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  « {t("question")} »
                </p>
              </blockquote>
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
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionTitle
              badge={t("values_badge")}
              title={t("values_title")}
              highlight={t("values_highlight")}
              center
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#EBD060]/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EBD060]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#D39C16]" />
                  </div>
                  <h3 className="font-semibold text-black mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-black overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionTitle
              badge={t("timeline_badge")}
              title={t("timeline_title")}
              highlight={t("timeline_highlight")}
              center
              light
            />
          </div>

          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {timelineEvents.map((event, i) => (
                <div
                  key={i}
                  className={`timeline-item flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1 hidden md:block" />

                  {/* Dot */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#EBD060] text-black flex items-center justify-center font-bold text-sm z-10">
                    {event.year.slice(2)}
                  </div>

                  <div className={`flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                    <p className="text-[#EBD060] text-xs font-semibold mb-1">{event.year}</p>
                    <h3
                      className="text-white font-semibold mb-1.5"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{event.desc}</p>
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
        </div>
      </section>

      {/* Future */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        </div>
      </section>

      {/* Treasures */}
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        </div>
      </section>
    </div>
  );
}
