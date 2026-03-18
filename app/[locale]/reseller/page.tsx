"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Package, HeartHandshake, Percent, Truck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

const icons = [Percent, Package, Truck, TrendingUp, HeartHandshake, CheckCircle];

export default function ResellerPage() {
  const t = useTranslations("reseller");
  const [submitted, setSubmitted] = useState(false);

  const benefits = t.raw("benefits") as { title: string; desc: string }[];

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1.5px solid #e5e7eb", borderRadius: "12px",
    padding: "12px 16px", fontSize: "14px", color: "#000",
    outline: "none", backgroundColor: "#fff",
  };

  return (
    <div>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("subtitle")}
        image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=600&fit=crop"
      />

      {/* Benefits */}
      <section style={{ padding: "56px 0", backgroundColor: "#FAF6F0" }}>
        <div className="max-w-7xl mx-auto" style={{ padding: "0 24px" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 700, textAlign: "center", color: "#000", marginBottom: "40px" }}>
            {t("advantages_title")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {benefits.map((b, i) => {
              const Icon = icons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  style={{ backgroundColor: "#fff", borderRadius: "18px", padding: "24px", border: "1px solid #f0f0f0" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "rgba(235,208,96,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                    <Icon size={18} color="#D39C16" />
                  </div>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "15px", fontWeight: 700, color: "#000", marginBottom: "6px" }}>{b.title}</h3>
                  <p style={{ color: "#6B7280", fontSize: "13px", lineHeight: 1.6 }}>{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "56px 0", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 700, color: "#000", marginBottom: "8px" }}>
              {t("form_title")}
            </h2>
            <p style={{ color: "#6B7280", fontSize: "14px" }}>{t("form_sub")}</p>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "48px 24px", backgroundColor: "#FAF6F0", borderRadius: "20px", border: "1px solid rgba(235,208,96,0.2)" }}>
              <CheckCircle size={52} color="#D39C16" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>{t("sent_title")}</h3>
              <p style={{ color: "#6B7280" }}>{t("sent_sub")}</p>
            </motion.div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { key: "name", label: t("name"), type: "text" },
                { key: "company", label: t("company"), type: "text" },
                { key: "city", label: t("city"), type: "text" },
                { key: "phone", label: t("phone"), type: "tel" },
                { key: "email", label: t("email"), type: "email" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.label} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{t("message")}</label>
                <textarea rows={4} placeholder={t("message")} style={{ ...inputStyle, resize: "none" }} />
              </div>
              <button type="submit" style={{ backgroundColor: "#EBD060", color: "#000", fontWeight: 700, padding: "15px", borderRadius: "999px", fontSize: "14px", border: "none", cursor: "pointer", letterSpacing: "0.04em" }}>
                {t("submit")}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
