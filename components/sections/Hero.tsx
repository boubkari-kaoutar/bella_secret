"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
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
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 1.9 });

    // Badge
    tl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      // Title lines
      .fromTo(
        ".hero-title-line",
        { opacity: 0, y: 50, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(
        ".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        ".hero-ctas",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".hero-stats",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.2"
      );

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.set(imageRef.current, { y: self.progress * 120 });
        }
        if (blobRef.current) {
          gsap.set(blobRef.current, { y: self.progress * 60 });
        }
      },
    });

    return () => { tl.kill(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background image with overlay */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=1920&h=1080&fit=crop"
          alt="Bella Secret Hero"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Animated blob */}
      <div
        ref={blobRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20 blob-animate hidden lg:block"
        style={{
          background: "radial-gradient(circle at 30% 40%, #EBD060 0%, #D39C16 50%, transparent 70%)",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#EBD060]/60"
          style={{
            left: `${20 + i * 13}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <div ref={textRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="hero-badge opacity-0 inline-flex items-center gap-2 border border-[#EBD060]/40 text-[#EBD060] text-xs px-4 py-2 rounded-full mb-8 backdrop-blur-sm bg-white/5">
            <Leaf className="w-3.5 h-3.5" />
            {t("badge")}
            <span className="w-1 h-1 rounded-full bg-[#EBD060]" />
            <Award className="w-3.5 h-3.5" />
          </div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <h1
              className="hero-title-line opacity-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("title1")}
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1
              className="hero-title-line opacity-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              style={{
                fontFamily: "Playfair Display, serif",
                background: "linear-gradient(135deg, #EBD060, #D39C16)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("title2")}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-sub opacity-0 text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
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
          <div className="flex flex-wrap gap-8">
            {[
              { value: t("stat1_value"), label: t("stat1_label") },
              { value: t("stat2_value"), label: t("stat2_label") },
              { value: t("stat3_value"), label: t("stat3_label") },
            ].map((stat) => (
              <div key={stat.label} className="hero-stats opacity-0">
                <p
                  className="text-2xl font-bold text-[#EBD060]"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
