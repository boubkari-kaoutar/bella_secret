"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  image?: string;
}

export default function PageHero({ badge, title, highlight, subtitle, image }: PageHeroProps) {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#FAF6F0",
        paddingTop: "130px",
        paddingBottom: "32px",
        overflow: "hidden",
      }}
    >
      {image && (
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src={image} alt={title} fill className="object-cover" style={{ opacity: 0.08 }} sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(250,246,240,0.85) 0%, #FAF6F0 100%)" }} />
        </div>
      )}

      <div className="max-w-7xl mx-auto" style={{ padding: "0 24px", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          {badge && (
            <span style={{
              display: "block", marginBottom: "14px",
              color: "#D39C16", fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.25em", textTransform: "uppercase",
            }}>
              {badge}
            </span>
          )}
          <h1 style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700, lineHeight: 1.15,
            color: "#111", marginBottom: subtitle ? "16px" : 0,
          }}>
            {title}{" "}
            {highlight && (
              <span style={{
                background: "linear-gradient(135deg,#EBD060,#D39C16)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {highlight}
              </span>
            )}
          </h1>
          {subtitle && (
            <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.65, maxWidth: "540px" }}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
