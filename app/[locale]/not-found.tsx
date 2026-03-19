"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d0c0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold glow bg */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(211,156,22,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Gold line top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #D39C16 30%, #EBD060 50%, #D39C16 70%, transparent)" }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 48 }}
      >
        <Link href="/fr" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Image src="/images/LOGO-2.jpg" alt="Bella Secret" width={44} height={44} className="object-contain rounded-xl" />
          <div>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>Bella Secret</p>
            <p style={{ fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: "#D39C16" }}>Nature House</p>
          </div>
        </Link>
      </motion.div>

      {/* 404 number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ position: "relative", marginBottom: 24, textAlign: "center" }}
      >
        <p
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(96px, 20vw, 180px)",
            fontWeight: 700,
            lineHeight: 1,
            background: "linear-gradient(135deg, rgba(235,208,96,0.15) 0%, rgba(211,156,22,0.08) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            userSelect: "none",
          }}
        >
          404
        </p>
        {/* Gold underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          style={{ height: 1, background: "linear-gradient(90deg, transparent, #D39C16, transparent)", margin: "0 auto" }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: 48 }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 12,
          }}
        >
          Page introuvable
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, maxWidth: 360, lineHeight: 1.7 }}>
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour découvrir nos soins naturels.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
      >
        <Link
          href="/fr"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            backgroundColor: "#EBD060", color: "#000",
            fontWeight: 700, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "13px 28px", borderRadius: "999px", textDecoration: "none",
            boxShadow: "0 4px 20px rgba(235,208,96,0.25)",
          }}
        >
          Retour à l'accueil
        </Link>
        <Link
          href="/fr/shop"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            backgroundColor: "transparent", color: "rgba(255,255,255,0.6)",
            fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "13px 28px", borderRadius: "999px", textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          Voir la boutique
        </Link>
      </motion.div>
    </div>
  );
}
