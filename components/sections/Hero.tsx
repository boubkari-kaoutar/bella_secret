"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ChevronDown, Leaf, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 1.9 });

    tl.fromTo(
        ".hero-title-line",
        { opacity: 0, y: 50, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(".hero-ctas", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(
        ".hero-stats",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.2"
      );

    // Video subtle parallax on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (videoRef.current) {
          gsap.set(videoRef.current, { y: self.progress * 80 });
        }
      },
    });

    return () => { tl.kill(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0d0c0a" }}
    >
      {/* ── Video background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: "blur(1px)" }}
        />

        {/* Dark base overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,9,7,0.32)" }} />

        {/* Gradient left — makes text readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(10,9,7,0.72) 0%, rgba(10,9,7,0.42) 45%, rgba(10,9,7,0.05) 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to top, rgba(10,9,7,0.45), transparent)" }}
        />
      </div>

      {/* ── Floating gold particles ── */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            left: `${15 + i * 11}%`,
            top: `${25 + (i % 4) * 18}%`,
            backgroundColor: "#EBD060",
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Gold accent line right ── */}
      <div
        className="absolute right-0 top-1/4 bottom-1/4 w-[1px] hidden lg:block"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(211,156,22,0.3), transparent)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 lg:pt-32 pb-10 lg:pb-17">
        <div className="max-w-2xl xl:max-w-3xl">


          {/* Title line 1 */}
          <div className="overflow-hidden mb-1">
            <h1
              className="hero-title-line opacity-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("title1")}
            </h1>
          </div>

          {/* Title line 2 — gold gradient */}
          <div className="overflow-hidden mb-1">
            <h1
              className="hero-title-line opacity-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              style={{
                fontFamily: "Playfair Display, serif",
                background: "linear-gradient(135deg, #EBD060 0%, #D39C16 60%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("title2")}
            </h1>
          </div>

          {/* Title line 3 — gold gradient */}
          <div className="overflow-hidden mb-8">
            <h1
              className="hero-title-line opacity-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              style={{
                fontFamily: "Playfair Display, serif",
                background: "linear-gradient(135deg, #EBD060 0%, #D39C16 60%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("title3")}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-sub opacity-0 text-white/65 text-base sm:text-lg leading-relaxed max-w-lg mb-10">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="hero-ctas opacity-0 flex flex-wrap gap-4 mb-16">
            <AnimatedButton href={`/${locale}/shop`} variant="gold" size="lg">
              {t("cta")}
            </AnimatedButton>
            <AnimatedButton href={`/${locale}/about`} variant="outline-light" size="lg">
              {t("cta2")}
            </AnimatedButton>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {[
              { value: t("stat1_value"), label: t("stat1_label") },
              { value: t("stat2_value"), label: t("stat2_label") },
              { value: t("stat3_value"), label: t("stat3_label") },
            ].map((stat, i) => (
              <div key={stat.label} className="hero-stats opacity-0">
                {i > 0 && (
                  <div className="hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 w-px h-6 bg-white/15" />
                )}
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    background: "linear-gradient(135deg, #EBD060, #D39C16)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/40" />
      </motion.div>
    </section>
  );
}
