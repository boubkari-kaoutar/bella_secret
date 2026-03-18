"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "212762627500";
const WHATSAPP_MSG = "Bonjour%20Bella%20Secret%2C%20je%20voudrais%20plus%20d'informations.";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-2xl px-4 py-3 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-5 h-5 fill-white stroke-none" />
      <span className="text-sm font-medium overflow-hidden max-w-0 group-hover:max-w-[120px] transition-all duration-300 whitespace-nowrap">
        WhatsApp
      </span>
    </motion.a>
  );
}
