"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Leaf, FlaskConical, Sparkles, Heart, Globe, Users } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const icons = [Leaf, FlaskConical, Sparkles, Heart, Globe, Users];

export default function WhyBella() {
  const t = useTranslations("why");
  const gridRef = useRef<HTMLDivElement>(null);

  const items = t.raw("items") as { title: string; desc: string }[];

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".why-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionTitle
            badge={t("badge")}
            title={t("title")}
            highlight={t("highlight")}
            center
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="why-card group bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#EBD060]/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EBD060]/10 group-hover:bg-[#EBD060]/20 flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-5 h-5 text-[#D39C16]" />
                </div>
                <h3
                  className="font-semibold text-black text-base mb-2"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* MMPS certification */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-6">
            {t("certified")}
          </p>
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl px-8 py-5 border border-gray-100 inline-flex items-center gap-4 shadow-sm">
              <img
                src="/images/mmps.png"
                alt="MMPS Certification"
                className="h-14 object-contain"
              />
              <div className="text-left border-l border-gray-100 pl-4">
                <p className="text-xs font-semibold text-black">{t("mmps_name")}</p>
                <p className="text-xs text-gray-500">{t("mmps_sub")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
