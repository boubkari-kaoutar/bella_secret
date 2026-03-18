"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  const t = useTranslations("blog");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const isAr = locale === "ar";

  const posts = blogPosts.map((p) => ({
    ...p,
    displayTitle: isAr ? p.titleAr : p.title,
    displayExcerpt: isAr ? p.excerptAr : p.excerpt,
    displayCategory: isAr ? p.categoryAr : p.category,
    displayDate: isAr ? p.dateAr : p.date,
    displayReadTime: isAr ? p.readTimeAr : p.readTime,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-black" style={{ paddingTop: "120px", paddingBottom: "64px" }}>
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=1920&h=600&fit=crop"
            alt="Blog"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7), #000)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto" style={{ padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{ color: "#D39C16", fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
              {t("badge")}
            </span>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", marginBottom: "16px", lineHeight: 1.15 }}>
              {t("title")}{" "}
              <span style={{ background: "linear-gradient(135deg,#EBD060,#D39C16)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t("highlight")}
              </span>
            </h1>
            <p style={{ color: "#9CA3AF", maxWidth: "520px", fontSize: "15px", lineHeight: 1.6 }}>{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section style={{ padding: "56px 0", backgroundColor: "#FAF6F0" }}>
        <div className="max-w-7xl mx-auto" style={{ padding: "0 24px" }}>

          {/* Featured article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginBottom: "32px", backgroundColor: "#fff", borderRadius: "24px", overflow: "hidden", border: "1px solid #f0f0f0", display: "grid", gridTemplateColumns: "1fr" }}
            className="lg:grid-cols-2 lg:!grid"
          >
            <div style={{ position: "relative", minHeight: "260px" }}>
              <Image src={posts[0].image} alt={posts[0].displayTitle} fill className="object-cover" />
            </div>
            <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ display: "inline-block", background: "rgba(235,208,96,0.15)", color: "#D39C16", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {posts[0].displayCategory}
              </span>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: "#000", lineHeight: 1.25, marginBottom: "12px" }}>
                {posts[0].displayTitle}
              </h2>
              <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
                {posts[0].displayExcerpt}
              </p>
              <div style={{ display: "flex", gap: "20px", color: "#9CA3AF", fontSize: "12px", marginBottom: "24px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Calendar size={13} />{posts[0].displayDate}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={13} />{posts[0].displayReadTime}
                </span>
              </div>
              <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 700, color: "#000", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {t("readMore")} <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>

          {/* Other articles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {posts.slice(1).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ backgroundColor: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #f0f0f0", cursor: "pointer", transition: "box-shadow 0.3s" }}
                whileHover={{ boxShadow: "0 8px 32px rgba(211,156,22,0.12)", y: -4 }}
              >
                <div style={{ position: "relative", height: "200px" }}>
                  <Image src={post.image} alt={post.displayTitle} fill className="object-cover" />
                  <div style={{ position: "absolute", top: "12px", left: "12px" }}>
                    <span style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", color: "#fff", fontSize: "10px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px" }}>
                      {post.displayCategory}
                    </span>
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1rem", fontWeight: 700, color: "#000", marginBottom: "10px", lineHeight: 1.3 }}>
                    {post.displayTitle}
                  </h3>
                  <p style={{ color: "#6B7280", fontSize: "13px", lineHeight: 1.6, marginBottom: "14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                    {post.displayExcerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#9CA3AF", fontSize: "11px" }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={11} />{post.displayDate}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Clock size={11} />{post.displayReadTime}</span>
                    </div>
                    <ArrowRight size={13} color="#D39C16" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
