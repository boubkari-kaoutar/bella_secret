"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/ui/SectionTitle";
import { Instagram } from "lucide-react";

const instagramPosts = [
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1631730486784-74757b04a10e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1570194065650-d99fb4ee0b08?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1592158209630-3add4c695ba4?w=300&h=300&fit=crop",
];

export default function InstagramSection() {
  const t = useTranslations("instagram");

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <SectionTitle
            badge="Réseaux sociaux"
            title={t("title")}
            highlight={t("highlight")}
            center
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {instagramPosts.map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-xl group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={src}
                alt={`Instagram post ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 hover:border-[#D39C16] hover:text-[#D39C16] text-sm font-medium px-6 py-3 rounded-full transition-all duration-300"
          >
            <Instagram className="w-4 h-4" />
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
