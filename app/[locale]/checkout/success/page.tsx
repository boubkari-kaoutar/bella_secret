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
            <svg viewBox="0 0 32 32" className="w-4 h-4 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.827.74 5.48 2.031 7.788L0 32l8.418-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.771-1.854l-.486-.289-5.001 1.193 1.215-4.865-.317-.499A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.299-.863.1-.398-.2-1.681-.619-3.203-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.2-.232.266-.398.399-.664.132-.265.066-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.685l-.764-.013c-.265 0-.697.1-1.062.498-.365.398-1.394 1.362-1.394 3.322s1.427 3.854 1.626 4.12c.199.265 2.808 4.286 6.803 6.012.951.41 1.693.655 2.271.839.954.304 1.823.261 2.509.158.765-.114 2.354-.962 2.686-1.891.332-.93.332-1.727.232-1.892-.099-.165-.365-.265-.763-.464z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
