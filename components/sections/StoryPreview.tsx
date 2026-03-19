"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Leaf, Award, Microscope } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function StoryPreview() {
  const t = useTranslations("story");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Image parallax
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.set(imageRef.current, { y: self.progress * -50 });
        }
      },
    });

    // Content reveal
    const storyAnims = contentRef.current?.querySelectorAll(".story-anim");
    if (!storyAnims) return;
    gsap.fromTo(
      storyAnims,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-[#FAF6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              <div ref={imageRef} className="absolute inset-0 scale-110">
                <Image
                  src="/images/salma_bella_secret.png"
                  alt="Salma Benabouche – Fondatrice Bella Secret"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 -right-5 bg-[#EBD060] rounded-2xl p-5 shadow-2xl">
              <p className="text-black font-bold text-2xl" style={{ fontFamily: "Playfair Display, serif" }}>
                6
              </p>
              <p className="text-black/70 text-xs uppercase tracking-widest">{t("years_label")}</p>
            </div>

            {/* Decorative blob */}
            <div
              className="absolute -left-8 -top-8 w-40 h-40 rounded-full opacity-20 blob-animate"
              style={{ background: "radial-gradient(circle, #EBD060, transparent)" }}
            />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="story-anim inline-block text-[#D39C16] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              {t("badge")}
            </span>
            <h2
              className="story-anim text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {t("title")}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #EBD060, #D39C16)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("highlight")}
              </span>
            </h2>
            <p className="story-anim text-gray-600 text-base leading-relaxed mb-8">
              {t("text")}
            </p>

            {/* Feature points */}
            <div className="story-anim space-y-4 mb-10">
              {[
                { icon: Microscope, text: t("point1") },
                { icon: Leaf, text: t("point2") },
                { icon: Award, text: t("point3") },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EBD060]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#EBD060]" />
                  </div>
                  <span className="text-gray-600 text-sm">{text}</span>
                </div>
              ))}
            </div>

            <div className="story-anim">
              <AnimatedButton href={`/${locale}/about`} variant="gold" size="md">
                {t("cta")}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
