"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollUp}
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Retour en haut"
          style={{
            position: "fixed",
            bottom: "88px",
            right: "24px",
            zIndex: 49,
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: "#111",
            color: "#fff",
            border: "1px solid rgba(211,156,22,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          <ChevronUp style={{ width: 18, height: 18 }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
