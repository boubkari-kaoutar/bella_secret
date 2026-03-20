"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderBottom: "1.5px solid #e5e7eb",
  padding: "10px 0",
  fontSize: "14px",
  color: "#000",
  outline: "none",
  backgroundColor: "transparent",
  borderRadius: 0,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#9CA3AF",
  marginBottom: "4px",
};

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const infos = [
    { icon: Phone, label: t("label_phone"), value: t("phone"), href: "tel:+212762627500" },
    { icon: Mail, label: t("label_email"), value: "contact@bellasecret.ma", href: "mailto:contact@bellasecret.ma" },
    { icon: MapPin, label: t("label_address"), value: t("address"), href: "#" },
  ];

  return (
    <div style={{ backgroundColor: "#FAF6F0", minHeight: "100vh" }}>
      {/* Header */}
      <section style={{ paddingTop: "120px", paddingBottom: "64px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D39C16", marginBottom: "16px" }}>
              {t("badge")}
            </p>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, color: "#000", lineHeight: 1.15, marginBottom: "16px" }}>
              {t("title")}{" "}
              <span style={{ color: "#000" }}>
                {t("highlight")}
              </span>
            </h1>
            <p style={{ fontSize: "15px", color: "#6B7280", maxWidth: "480px", lineHeight: 1.7 }}>{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — info + image */}
            <ScrollReveal>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {infos.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      display: "flex", alignItems: "center", gap: "18px",
                      padding: "24px 0",
                      borderBottom: "1px solid #e8e3dc",
                      textDecoration: "none",
                    }}
                  >
                    <div style={{
                      width: 42, height: 42, borderRadius: "12px",
                      backgroundColor: "rgba(235,208,96,0.1)",
                      border: "1px solid rgba(211,156,22,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon size={16} color="#D39C16" />
                    </div>
                    <div>
                      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B0A898", marginBottom: "3px" }}>{label}</p>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "#111" }} dir="ltr">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Image */}
              <div style={{ marginTop: "36px", borderRadius: "20px", overflow: "hidden", height: "260px", position: "relative" }}>
                <img
                  src="/images/contact.jpeg"
                  alt="Bella Secret"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 24 }}>
                  <p style={{ color: "#EBD060", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "4px" }}>Bella Secret</p>
                  <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, fontFamily: "Playfair Display, serif" }}>Nature House — Maroc</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal delay={0.15}>
              <div style={{ backgroundColor: "#fff", borderRadius: "24px", padding: "40px 36px" }}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: "40px 0" }}>
                    <CheckCircle size={52} color="#D39C16" style={{ margin: "0 auto 16px" }} />
                    <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>{t("sent_title")}</h3>
                    <p style={{ color: "#6B7280", fontSize: "14px" }}>{t("sent_sub")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label style={labelStyle}>{t("name")}</label>
                        <input type="text" placeholder={t("name")} required style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>{t("email")}</label>
                        <input type="email" placeholder={t("email")} required style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>{t("subject")}</label>
                      <input type="text" placeholder={t("subject")} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t("message")}</label>
                      <textarea rows={5} placeholder={t("message")} required style={{ ...inputStyle, resize: "none" }} />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover="hover"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "10px",
                        backgroundColor: "#111", color: "#fff",
                        fontWeight: 700, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase",
                        padding: "13px 26px", borderRadius: "999px",
                        border: "none", cursor: "pointer", alignSelf: "flex-start",
                      }}
                    >
                      {t("submit")}
                      <motion.span
                        variants={{ hover: { x: 5 } }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Send size={13} />
                      </motion.span>
                    </motion.button>
                  </form>
                )}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
