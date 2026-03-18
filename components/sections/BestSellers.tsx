"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { products } from "@/lib/data";
import { ArrowRight } from "lucide-react";

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
    <section ref={sectionRef} className="py-20 lg:py-28 bg-[#FAF6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionTitle
            badge={t("badge")}
            title={t("title")}
            highlight={t("highlight")}
            subtitle={t("subtitle")}
          />
          <AnimatedButton href={`/${locale}/shop`} variant="outline" size="sm">
            {t("viewAll")} <ArrowRight className="w-3.5 h-3.5" />
          </AnimatedButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map((product) => (
            <div key={product.id} className="product-slide">
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
