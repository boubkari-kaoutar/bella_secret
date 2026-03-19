"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function BestSellers() {
  const t = useTranslations("bestsellers");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const sectionRef = useRef<HTMLElement>(null);

  // products with "Best-seller" badge first, then fill to 4
  const bestSellers = [
    ...products.filter((p) => p.badge === "Best-seller"),
    ...products.filter((p) => p.badge !== "Best-seller"),
  ].slice(0, 4);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Horizontal scroll hint on mobile
    const cards = sectionRef.current.querySelectorAll(".product-slide");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Decorative gold top border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D39C16] to-transparent" />

      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, #D39C16, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionTitle
            badge={t("badge")}
            title={t("title")}
            highlight={t("highlight")}
            subtitle={t("subtitle")}
          />
          <Link
            href={`/${locale}/shop`}
            className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-black border-b border-black/30 pb-0.5 hover:border-black transition-colors duration-300"
          >
            {t("viewAll")}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-slide drop-shadow-md hover:drop-shadow-xl transition-all duration-300">
              <ProductCard
                product={product}
                locale={locale}
                buyLabel={t("cta")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
