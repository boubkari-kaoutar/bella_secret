"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, Package, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const t = useTranslations("checkout");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-gray-100 shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-[#EBD060]/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-[#D39C16]" />
        </motion.div>

        <h1
          className="text-2xl font-bold text-black mb-3"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          {t("success_title")}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {t("success_sub")}
        </p>

        <div className="bg-[#FAF6F0] rounded-2xl p-5 mb-8 space-y-3 text-left">
          <div className="flex items-center gap-3">
            <Package className="w-4 h-4 text-[#D39C16] flex-shrink-0" />
            <p className="text-sm text-gray-600">{t("success_delivery_note")}</p>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
            <p className="text-sm text-gray-600">{t("success_whatsapp_note")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={`/${locale}/shop`}
            className="w-full bg-black text-white font-semibold py-3.5 rounded-full text-sm hover:bg-[#1a1a1a] transition-colors"
          >
            {t("success_continue")}
          </Link>
          <a
            href="https://wa.me/212762627500"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-[#25D366] text-[#25D366] font-semibold py-3.5 rounded-full text-sm hover:bg-[#25D366]/5 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
