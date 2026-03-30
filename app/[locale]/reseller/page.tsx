"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

const LABELS_FR = ["TARIFS", "STOCK", "LIVRAISON", "CROISSANCE", "PARTENARIAT", "QUALITÉ"];
const LABELS_AR = ["أسعار", "مخزون", "توصيل", "نمو", "شراكة", "جودة"];

export default function ResellerPage() {
  const t = useTranslations("reseller");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const isAr = locale === "ar";
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", city: "", phone: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Demande Revendeur — Bella Secret*\n\n👤 *Nom:* ${form.name}\n🏪 *Boutique/Société:* ${form.company}\n📍 *Ville:* ${form.city}\n📞 *Téléphone:* ${form.phone}\n📧 *Email:* ${form.email}\n\n💬 *Message:*\n${form.message}`;
    window.open(`https://wa.me/212762627500?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

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
      <section className="py-16 lg:py-24 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-center mb-14" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#000" }}>
              {t("advantages_title")}
            </h2>
          </ScrollReveal>

          {/* Bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr" dir={isAr ? "rtl" : "ltr"}>
            {benefits.map((b, i) => {
              const isFeatured = i === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`group relative rounded-3xl overflow-hidden cursor-default transition-all duration-400 ${isFeatured ? "sm:col-span-2 lg:col-span-2" : ""}`}
                  style={{
                    backgroundColor: isFeatured ? "#111" : "#fff",
                    border: isFeatured ? "1px solid rgba(211,156,22,0.2)" : "1px solid #F0F0F0",
                    padding: "32px",
                    minHeight: isFeatured ? 220 : 190,
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: isFeatured
                      ? "0 16px 48px rgba(211,156,22,0.2), 0 4px 16px rgba(0,0,0,0.15)"
                      : "0 12px 40px rgba(211,156,22,0.12), 0 2px 10px rgba(0,0,0,0.06)",
                    borderColor: "rgba(211,156,22,0.5)",
                  }}
                >
                  {/* Ghost number — left in RTL, right in LTR */}
                  <span
                    className="absolute top-3 font-bold select-none pointer-events-none leading-none"
                    style={{
                      [isAr ? "left" : "right"]: "20px",
                      fontSize: "6rem",
                      color: isFeatured ? "rgba(235,208,96,0.07)" : "rgba(211,156,22,0.06)",
                      fontFamily: "Playfair Display, serif",
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Gold top bar */}
                  <div
                    className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to right, transparent, #D39C16, transparent)" }}
                  />


                  {/* Label */}
                  <p
                    className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2"
                    style={{ color: "#D39C16" }}
                  >
                    {isAr ? LABELS_AR[i] : LABELS_FR[i]}
                  </p>

                  {/* Title */}
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: isFeatured ? "1.15rem" : "0.95rem",
                      color: isFeatured ? "#fff" : "#000",
                    }}
                  >
                    {b.title}
                  </h3>

                  {/* Desc */}
                  <p style={{ color: isFeatured ? "rgba(255,255,255,0.5)" : "#9CA3AF", fontSize: "13px", lineHeight: 1.6 }}>
                    {b.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: "56px 0", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 700, color: "#000", marginBottom: "8px" }}>
                {t("form_title")}
              </h2>
              <p style={{ color: "#6B7280", fontSize: "14px" }}>{t("form_sub")}</p>
            </div>
          </ScrollReveal>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "48px 24px", backgroundColor: "#FAF6F0", borderRadius: "20px", border: "1px solid rgba(235,208,96,0.2)" }}>
              <CheckCircle size={52} color="#D39C16" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>{t("sent_title")}</h3>
              <p style={{ color: "#6B7280" }}>{t("sent_sub")}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { key: "name", label: t("name"), type: "text" },
                { key: "company", label: t("company"), type: "text" },
                { key: "city", label: t("city"), type: "text" },
                { key: "phone", label: t("phone"), type: "tel" },
                { key: "email", label: t("email"), type: "email" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{f.label}</label>
                  <input name={f.key} type={f.type} placeholder={f.label} value={form[f.key as keyof typeof form]} onChange={handleChange} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{t("message")}</label>
                <textarea name="message" rows={4} placeholder={t("message")} value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: "none" }} />
              </div>
              <motion.button
                type="submit"
                whileHover="hover"
                initial="rest"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  background: "linear-gradient(135deg, #B8860B 0%, #6B4C08 100%)",
                  color: "#fff", fontWeight: 700,
                  fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "14px 32px", borderRadius: "999px",
                  border: "none", cursor: "pointer", position: "relative", overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(184,134,11,0.35)", alignSelf: "stretch",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(184,134,11,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(184,134,11,0.35)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <motion.span
                  variants={{ rest: { x: "-100%", opacity: 0 }, hover: { x: "100%", opacity: 1 } }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)", pointerEvents: "none" }}
                />
                {t("submit")}
                <motion.svg
                  variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </motion.svg>
              </motion.button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
