"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Plus } from "lucide-react";
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

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, nameAr: product.nameAr, price: product.price, image: product.image });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#EBD060]/50 hover:shadow-[0_8px_40px_rgba(211,156,22,0.15)] transition-all duration-500"
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 bg-[#EBD060] hover:bg-[#D39C16] text-black text-xs font-bold py-3 rounded-2xl uppercase tracking-wider transition-colors duration-200 shadow-lg"
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
              className={`w-3 h-3 ${
                i < product.rating
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
      </div>
    </motion.div>
  );
}
