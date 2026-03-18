"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1.5px solid #e5e7eb", borderRadius: "12px",
    padding: "12px 16px", fontSize: "14px", color: "#000",
    outline: "none", transition: "border 0.2s", backgroundColor: "#fff",
  };

  return (
    <div>
      <PageHero
        badge={t("badge")}
        title={t("title")}
        highlight={t("highlight")}
        subtitle={t("subtitle")}
      />

      <section style={{ padding: "56px 0", backgroundColor: "#FAF6F0" }}>
        <div className="max-w-7xl mx-auto" style={{ padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }} className="lg:grid-cols-5-3">

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {/* Info cards + WhatsApp */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: Phone, label: t("label_phone"), value: t("phone"), href: "tel:+212762627500" },
                  { icon: Mail, label: t("label_email"), value: "contact@bellasecret.ma", href: "mailto:contact@bellasecret.ma" },
                  { icon: MapPin, label: t("label_address"), value: t("address"), href: "#" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} style={{ display: "flex", alignItems: "flex-start", gap: "14px", backgroundColor: "#fff", borderRadius: "16px", padding: "18px", border: "1px solid #f0f0f0", textDecoration: "none", transition: "border 0.2s" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "10px", backgroundColor: "rgba(235,208,96,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color="#D39C16" />
                    </div>
                    <div>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "3px" }}>{label}</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#000" }}>{value}</p>
                    </div>
                  </a>
                ))}

                <a href="https://wa.me/212762627500?text=Bonjour%20Bella%20Secret" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "#25D366", borderRadius: "16px", padding: "18px", textDecoration: "none" }}>
                  <MessageCircle size={20} color="#fff" />
                  <div>
                    <p style={{ fontWeight: 700, color: "#fff", fontSize: "14px" }}>{t("whatsapp")}</p>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>{t("fast_reply")}</p>
                  </div>
                </a>
              </div>

              {/* Form */}
              <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #f0f0f0" }}>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: "center", padding: "40px 0" }}>
                    <CheckCircle size={52} color="#D39C16" style={{ margin: "0 auto 16px" }} />
                    <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>{t("sent_title")}</h3>
                    <p style={{ color: "#6B7280", fontSize: "14px" }}>{t("sent_sub")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{t("name")}</label>
                        <input type="text" placeholder={t("name")} required style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{t("email")}</label>
                        <input type="email" placeholder={t("email")} required style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{t("subject")}</label>
                      <input type="text" placeholder={t("subject")} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{t("message")}</label>
                      <textarea rows={5} placeholder={t("message")} required
                        style={{ ...inputStyle, resize: "none" }} />
                    </div>
                    <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", backgroundColor: "#000", color: "#fff", fontWeight: 700, padding: "14px", borderRadius: "999px", fontSize: "14px", border: "none", cursor: "pointer" }}>
                      <Send size={15} /> {t("submit")}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
