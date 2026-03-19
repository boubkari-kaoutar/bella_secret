"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import PageHero from "@/components/ui/PageHero";
import { products } from "@/lib/data";
import { SlidersHorizontal } from "lucide-react";
import { useParams } from "next/navigation";



export default function ShopPage() {
  const t = useTranslations("shop");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const [activeCategory, setActiveCategory] = useState("Tout");

  const filterMappings: Record<string, string> = {
    "Tout": t("all"),
    "Corps": t("filter_corps"),
    "Visage": t("filter_visage"),
    "Soins intimes": t("filter_intimes"),
    "Cheveux": t("filter_cheveux"),
    "Bain & Hammam": t("filter_hammam"),
    "Mains & Pieds": t("filter_mains"),
    "Soins thérapeutiques": t("filter_therapeutiques"),
    "Coffrets & Cadeaux": t("filter_coffrets"),
    "Décor & Accessoires": t("filter_decor"),
    "Ambiance & Senteurs": t("filter_ambiance"),
  };

  const filtered = activeCategory === "Tout"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const getButtonStyle = (value: string) => ({
    flexShrink: 0,
    padding: "7px 16px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
    border: activeCategory === value ? "1.5px solid #EBD060" : "1.5px solid #e5e7eb",
    backgroundColor: activeCategory === value ? "#EBD060" : "transparent",
    color: activeCategory === value ? "#000" : "#6B7280",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.03em",
  });

  return (
    <div>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("subtitle")}
        image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=600&fit=crop"
      />

      {/* Category filter */}
      <div style={{
        position: "sticky", top: "64px", zIndex: 40,
        backgroundColor: "#fff", borderBottom: "1px solid #f0f0f0",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <div className="max-w-7xl mx-auto" style={{ padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", padding: "12px 0", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            
            {/* All */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <SlidersHorizontal size={15} color="#9CA3AF" />
              <button onClick={() => setActiveCategory("Tout")} style={getButtonStyle("Tout")}>
                {filterMappings["Tout"]}
              </button>
            </div>

            {/* Soins de beauté */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, borderLeft: "1px solid #e5e7eb", paddingLeft: "24px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "4px" }}>
                {t("group_beaute")}
              </span>
              {["Corps", "Visage", "Soins intimes", "Cheveux", "Bain & Hammam", "Mains & Pieds"].map((c) => (
                <button key={c} onClick={() => setActiveCategory(c)} style={getButtonStyle(c)}>
                  {filterMappings[c]}
                </button>
              ))}
            </div>

            {/* Others */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, borderLeft: "1px solid #e5e7eb", paddingLeft: "24px" }}>
              {["Soins thérapeutiques", "Coffrets & Cadeaux", "Décor & Accessoires", "Ambiance & Senteurs"].map((c) => (
                <button key={c} onClick={() => setActiveCategory(c)} style={getButtonStyle(c)}>
                  {filterMappings[c]}
                </button>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* Products */}
      <section style={{ padding: "48px 0", backgroundColor: "#FAF6F0" }}>
        <div className="max-w-7xl mx-auto" style={{ padding: "0 24px" }}>
          <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "24px" }}>
            {filtered.length} {filtered.length > 1 ? t("count_many") : t("count_one")}
          </p>
          <motion.div
            layout
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}
          >
            {filtered.map((product) => (
              <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <ProductCard product={product} locale={locale} buyLabel={t("buyNow")} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 24px", backgroundColor: "#FAF6F0", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.4rem, 3vw, 1.8rem)", color: "#000", fontWeight: 700, marginBottom: "12px" }}>
          {t("cta_title")}
        </h2>
        <p style={{ color: "#6B7280", marginBottom: "24px", fontSize: "14px" }}>{t("cta_sub")}</p>
        <a
          href="https://wa.me/212762627500?text=Bonjour%20Bella%20Secret"
          target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#EBD060", color: "#000", fontWeight: 700, padding: "14px 32px", borderRadius: "999px", fontSize: "14px", textDecoration: "none", transition: "background 0.2s" }}
        >
          {t("cta_btn")}
        </a>
      </section>
    </div>
  );
}
