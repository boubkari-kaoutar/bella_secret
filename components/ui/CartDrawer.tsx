"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const DELIVERY_FREE_THRESHOLD = 500;
const DELIVERY_FEE = 30;

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, count } = useCart();
  const params = useParams();
  const locale = (params?.locale as string) || "fr";
  const isAr = locale === "ar";
  const t = useTranslations("cart");

  const deliveryFee = total >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal = total + deliveryFee;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: isAr ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 ${isAr ? "left-0" : "right-0"} h-full w-full max-w-md z-[151] bg-white shadow-2xl flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D39C16]" />
                <h2 className="font-bold text-base" style={{ fontFamily: "Playfair Display, serif" }}>
                  {t("title")}
                </h2>
                {count > 0 && (
                  <span className="bg-[#EBD060] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag className="w-14 h-14 text-gray-200" />
                  <p className="text-gray-400 text-sm">{t("empty")}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold text-[#D39C16] underline underline-offset-2"
                  >
                    {t("continue_shopping")}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-gray-50">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF6F0]">
                        <Image src={item.image} alt={isAr && item.nameAr ? item.nameAr : item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-black leading-snug mb-1 line-clamp-2" style={{ fontFamily: "Playfair Display, serif" }}>
                          {isAr && item.nameAr ? item.nameAr : item.name}
                        </h3>
                        <p className="text-[#D39C16] font-bold text-sm">{item.price} MAD</p>
                        {/* Quantity */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#D39C16] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#D39C16] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="text-sm font-bold text-black">{item.price * item.quantity} MAD</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 bg-[#FAF6F0]">
                {/* Delivery */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{t("subtotal")}</span>
                    <span>{total} MAD</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{t("delivery")}</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-semibold">{t("free")}</span>
                    ) : (
                      <span>{deliveryFee} MAD</span>
                    )}
                  </div>
                  {total < DELIVERY_FREE_THRESHOLD && (
                    <p className="text-[10px] text-gray-400">
                      {t("free_threshold", { amount: DELIVERY_FREE_THRESHOLD - total })}
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                    <span>{t("total")}</span>
                    <span className="text-[#D39C16]">{grandTotal} MAD</span>
                  </div>
                </div>

                <Link
                  href={`/${locale}/checkout`}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-black text-white font-semibold py-3.5 rounded-full text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors"
                >
                  {t("checkout")}
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center text-gray-400 text-xs mt-3 hover:text-black transition-colors"
                >
                  {t("continue_shopping")}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
