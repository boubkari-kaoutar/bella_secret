"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Plus, Heart, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: number;
  name: string;
  nameAr?: string;
  category: string;
  categoryAr?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  badgeAr?: string;
  description?: string;
  descriptionAr?: string;
}

interface ProductCardProps {
  product: Product;
  locale?: string;
  buyLabel?: string;
}

export default function ProductCard({
  product,
  locale = "fr",
  buyLabel = "Acheter",
}: ProductCardProps) {
  const { addItem } = useCart();
  const isAr = locale === "ar";
  const displayName = isAr && product.nameAr ? product.nameAr : product.name;
  const displayCategory = isAr && product.categoryAr ? product.categoryAr : product.category;
  const displayBadge = isAr && product.badgeAr ? product.badgeAr : product.badge;

  const displayDescription = isAr && product.descriptionAr ? product.descriptionAr : product.description;
  const defaultDescription = isAr 
    ? "عناية طبيعية وأصيلة مصممة لإبراز جمالك اليومي بكنوز المغرب."
    : "Un soin naturel et authentique conçu pour sublimer votre beauté au quotidien avec les trésors du Maroc.";

  const ariaFavorite = isAr ? "المفضلة" : "Favoris";
  const ariaPreview = isAr ? "نظرة سريعة" : "Aperçu";

  const tiltRef = useRef<HTMLDivElement>(null);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, nameAr: product.nameAr, price: product.price, image: product.image });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    tiltRef.current.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.025)`;
    tiltRef.current.style.transition = "transform 0.08s ease-out";
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    tiltRef.current.style.transition = "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ transformStyle: "preserve-3d" }}
    >
    <div
      ref={tiltRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#EBD060]/50 transition-all duration-500"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Badge */}
      {displayBadge && (
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-black text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
            {displayBadge}
          </span>
        </div>
      )}

      {/* Image area */}
      <div className="relative h-56 bg-[#F7F3EE] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </motion.div>

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.03, backgroundColor: "#D39C16" }}
            whileTap={{ scale: 0.97 }}
            style={{ backgroundColor: "#EBD060" }}
            className="w-full flex items-center justify-center gap-2 text-black text-xs font-bold py-3 rounded uppercase tracking-wider shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {buyLabel}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-[10px] text-[#D39C16] font-bold uppercase tracking-[0.2em] mb-1.5">
          {displayCategory}
        </p>

        {/* Name */}
        <h3
          className="text-sm font-semibold text-black leading-snug mb-2.5 line-clamp-2 group-hover:text-[#1A1A1A] transition-colors"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {displayName}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < product.rating
                  ? "fill-[#EBD060] text-[#EBD060]"
                  : "fill-gray-100 text-gray-200"
                }`}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({product.reviews})</span>
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-bold text-base text-black"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {product.price} <span className="text-xs font-semibold text-gray-500">MAD</span>
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-300 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.08, backgroundColor: "#D39C16" }}
            whileTap={{ scale: 0.93 }}
            className="flex items-center justify-center w-9 h-9 rounded-2xl bg-black text-white transition-colors duration-200 shadow-sm hover:shadow-md"
            style={{ backgroundColor: "#000" }}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </div>

        {/* Hover Details Section */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
          <div className="overflow-hidden flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mt-2" dir="auto">
              {displayDescription || defaultDescription}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <button className="text-gray-400 hover:text-red-500 transition-colors p-1" aria-label={ariaFavorite}>
                <Heart className="w-5 h-5" />
              </button>

              <motion.button
                onClick={handleAdd}
                whileHover={{ scale: 1.04, backgroundColor: "#D39C16" }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: "#EBD060" }}
                className="text-black font-bold py-2 px-5 rounded text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {buyLabel}
              </motion.button>

              <button className="text-gray-400 hover:text-black transition-colors p-1" aria-label={ariaPreview}>
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
}
