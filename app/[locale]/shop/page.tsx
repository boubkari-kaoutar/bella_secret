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
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(211,156,22,0.1)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      }}>
        <div className="max-w-7xl mx-auto" style={{ padding: "0 24px", position: "relative" }}>
          {/* Fade right */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 48, background: "linear-gradient(to left, rgba(255,255,255,0.97), transparent)", zIndex: 1, pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 0", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {/* Filter icon */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, marginRight: "8px" }}>
              <SlidersHorizontal size={14} color="#D39C16" />
            </div>

            {/* All */}
            <motion.button
              onClick={() => setActiveCategory("Tout")}
              style={{ flexShrink: 0, position: "relative", padding: "7px 18px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", cursor: "pointer", backgroundColor: "transparent", color: activeCategory === "Tout" ? "#000" : "#9CA3AF", transition: "color 0.2s" }}
            >
              {activeCategory === "Tout" && (
                <motion.span layoutId="activePill" style={{ position: "absolute", inset: 0, borderRadius: "999px", backgroundColor: "#EBD060", zIndex: -1 }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              {filterMappings["Tout"]}
            </motion.button>

            {/* Separator */}
            <div style={{ width: 1, height: 20, backgroundColor: "#e5e7eb", flexShrink: 0, margin: "0 10px" }} />

            {/* Group label */}
            <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#D39C16", flexShrink: 0, marginRight: "4px" }}>
              {t("group_beaute")}
            </span>

            {["Corps", "Visage", "Soins intimes", "Cheveux", "Bain & Hammam", "Mains & Pieds"].map((c) => (
              <motion.button
                key={c}
                onClick={() => setActiveCategory(c)}
                style={{ flexShrink: 0, position: "relative", padding: "7px 16px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", border: "none", cursor: "pointer", backgroundColor: "transparent", color: activeCategory === c ? "#000" : "#6B7280", transition: "color 0.2s" }}
              >
                {activeCategory === c && (
                  <motion.span layoutId="activePill" style={{ position: "absolute", inset: 0, borderRadius: "999px", backgroundColor: "#EBD060", zIndex: -1 }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                {filterMappings[c]}
              </motion.button>
            ))}

            {/* Separator */}
            <div style={{ width: 1, height: 20, backgroundColor: "#e5e7eb", flexShrink: 0, margin: "0 10px" }} />

            {["Soins thérapeutiques", "Coffrets & Cadeaux", "Décor & Accessoires", "Ambiance & Senteurs"].map((c) => (
              <motion.button
                key={c}
                onClick={() => setActiveCategory(c)}
                style={{ flexShrink: 0, position: "relative", padding: "7px 16px", borderRadius: "999px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em", border: "none", cursor: "pointer", backgroundColor: "transparent", color: activeCategory === c ? "#000" : "#6B7280", transition: "color 0.2s" }}
              >
                {activeCategory === c && (
                  <motion.span layoutId="activePill" style={{ position: "absolute", inset: 0, borderRadius: "999px", backgroundColor: "#EBD060", zIndex: -1 }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                {filterMappings[c]}
              </motion.button>
            ))}
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
        <motion.a
          href="https://wa.me/212762627500?text=Bonjour%20Bella%20Secret"
          target="_blank" rel="noopener noreferrer"
          whileHover="hover"
          initial="rest"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "linear-gradient(135deg, #B8860B 0%, #6B4C08 100%)",
            color: "#fff", fontWeight: 700,
            fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "14px 32px", borderRadius: "999px",
            textDecoration: "none", position: "relative", overflow: "hidden",
            boxShadow: "0 4px 20px rgba(184,134,11,0.35)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(184,134,11,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(184,134,11,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
        >
          {/* shimmer */}
          <motion.span
            variants={{ rest: { x: "-100%", opacity: 0 }, hover: { x: "100%", opacity: 1 } }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)", pointerEvents: "none" }}
          />
          {t("cta_btn")}
          <motion.svg
            variants={{ rest: { x: 0 }, hover: { x: 5 } }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </motion.svg>
        </motion.a>
      </section>
    </div>
  );
}
