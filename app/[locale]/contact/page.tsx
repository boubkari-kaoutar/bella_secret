"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
              <ScrollReveal>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: 20, height: 20, flexShrink: 0 }} aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <div>
                    <p style={{ fontWeight: 700, color: "#fff", fontSize: "14px" }}>{t("whatsapp")}</p>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>{t("fast_reply")}</p>
                  </div>
                </a>
              </div>
              </ScrollReveal>

              {/* Form */}
              <ScrollReveal delay={0.15}>
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
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
