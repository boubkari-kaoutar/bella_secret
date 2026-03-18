"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
      <section className="py-16 md:py-24 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10 md:gap-14 items-center">
          
          {/* Featured Card (Full Width) */}
          {posts.length > 0 && (
            <div className="w-full">
              <Link 
                href={`/${locale}/blog/${posts[0].slug}`} 
                className="block text-decoration-none"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  className="group relative w-full h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <Image 
                    src={posts[0].image} 
                    alt={posts[0].displayTitle} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end" dir={isAr ? "rtl" : "ltr"}>
                    <div className={`absolute top-6 ${isAr ? "left-6" : "right-6"}`}>
                      <span className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] md:text-[11px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/10">
                        {posts[0].displayCategory}
                      </span>
                    </div>

                    <div className="relative z-10 w-full md:w-3/4 lg:w-2/3">
                      <div className="flex items-center gap-4 text-white/80 text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
                        <span className="flex items-center gap-2"><Calendar size={13} /> {posts[0].displayDate}</span>
                        <span className="w-1 h-1 rounded-full bg-white/50" />
                        <span className="flex items-center gap-2"><Clock size={13} /> {posts[0].displayReadTime}</span>
                      </div>
                      <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.15] font-bold mb-4 drop-shadow-md" style={{ fontFamily: "Playfair Display, serif" }}>
                        {posts[0].displayTitle}
                      </h3>
                      <p className="text-white/85 text-[15px] sm:text-[17px] font-light line-clamp-2 md:line-clamp-3 mb-8">
                        {posts[0].displayExcerpt}
                      </p>
                      <div className="mt-auto">
                        <span className="text-[#D39C16] text-[12px] md:text-[13px] font-bold uppercase tracking-[0.15em] inline-flex items-center gap-2 pb-1.5 border-b border-[#D39C16]/50 group-hover:border-[#D39C16] transition-colors">
                          {t("readMore")} 
                          <ArrowRight size={15} className={`transition-transform duration-300 ${isAr ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </div>
          )}

          {/* Other Cards (Centered Grid) */}
          {posts.length > 1 && (
            <div className="flex flex-wrap justify-center w-full gap-6 md:gap-8">
              {posts.slice(1).map((post, i) => (
                <Link 
                  href={`/${locale}/blog/${post.slug}`} 
                  key={post.id} 
                  className="block text-decoration-none w-full md:w-[calc(50%-1.5rem)] xl:w-[480px]"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative w-full h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    <Image 
                      src={post.image} 
                      alt={post.displayTitle} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end" dir={isAr ? "rtl" : "ltr"}>
                      <div className={`absolute top-6 ${isAr ? "left-6" : "right-6"}`}>
                        <span className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                          {post.displayCategory}
                        </span>
                      </div>

                      <div className="relative z-10 w-full">
                        <div className="flex items-center gap-3 text-white/80 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
                          <span className="flex items-center gap-1.5"><Calendar size={11} /> {post.displayDate}</span>
                          <span className="w-1 h-1 rounded-full bg-white/50" />
                          <span className="flex items-center gap-1.5"><Clock size={11} /> {post.displayReadTime}</span>
                        </div>
                        <h3 className="text-white text-2xl sm:text-[28px] leading-[1.2] font-bold mb-3 drop-shadow-md" style={{ fontFamily: "Playfair Display, serif" }}>
                          {post.displayTitle}
                        </h3>
                        <p className="text-white/85 text-[13px] sm:text-[14px] font-light line-clamp-2 md:line-clamp-3 mb-6">
                          {post.displayExcerpt}
                        </p>
                        <div className="mt-auto">
                          <span className="text-[#D39C16] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] inline-flex items-center gap-2 pb-1.5 border-b border-[#D39C16]/50 group-hover:border-[#D39C16] transition-colors">
                            {t("readMore")} 
                            <ArrowRight size={14} className={`transition-transform duration-300 ${isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
