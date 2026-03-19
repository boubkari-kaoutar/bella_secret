"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface AnimatedButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "outline" | "dark" | "outline-light";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const SIZES = {
  sm: { px: "22px", py: "11px", fontSize: "10px", gap: "6px" },
  md: { px: "30px", py: "15px", fontSize: "12px", gap: "8px" },
  lg: { px: "40px", py: "18px", fontSize: "13px", gap: "10px" },
};

const VARIANTS = {
  gold: {
    bg: "#EBD060",
    color: "#000",
    border: "none",
    fillBg: "#111",
    fillColor: "#fff",
    hoverShadow: "0 12px 40px rgba(211,156,22,0.45), 0 4px 16px rgba(0,0,0,0.1)",
  },
  outline: {
    bg: "transparent",
    color: "#000",
    border: "1.5px solid #000",
    fillBg: "#000",
    fillColor: "#fff",
    hoverShadow: "0 10px 32px rgba(0,0,0,0.18)",
  },
  dark: {
    bg: "#111",
    color: "#fff",
    border: "none",
    fillBg: "#D39C16",
    fillColor: "#000",
    hoverShadow: "0 12px 40px rgba(0,0,0,0.35)",
  },
  "outline-light": {
    bg: "transparent",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.6)",
    fillBg: "#fff",
    fillColor: "#000",
    hoverShadow: "0 10px 32px rgba(255,255,255,0.2)",
  },
} as const;

interface InnerProps {
  variant: keyof typeof VARIANTS;
  size: keyof typeof SIZES;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  isButton?: boolean;
}

function ButtonCore({ variant = "gold", size = "md", children, disabled, className = "", onClick, type = "button", isButton }: InnerProps) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const cfg = VARIANTS[variant];
  const sz = SIZES[size];

  // Magnetic effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setPos({ x, y });
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setPos({ x: 0, y: 0 });
  };

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: sz.gap,
    overflow: "hidden",
    borderRadius: "6px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.13em",
    cursor: disabled ? "default" : "pointer",
    padding: `${sz.py} ${sz.px}`,
    fontSize: sz.fontSize,
    backgroundColor: cfg.bg,
    color: hovered ? cfg.fillColor : cfg.color,
    border: cfg.border,
    transition: "color 0.15s ease 0.1s",
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? "none" : "auto",
  };

  const content = (
    <motion.span
      ref={ref}
      style={baseStyle}
      animate={{
        x: pos.x,
        y: pos.y,
        boxShadow: hovered ? cfg.hoverShadow : "0 2px 8px rgba(0,0,0,0.06)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={`btn-shine ${className}`}
    >
      {/* Liquid fill sweep */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: cfg.fillBg,
          transformOrigin: "left center",
          borderRadius: "inherit",
          zIndex: 0,
        }}
      />

      {/* Text — dual layer slide */}
      <span style={{ position: "relative", overflow: "hidden", display: "inline-flex", flexDirection: "column", zIndex: 1 }}>
        {/* Layer 1: slides up on hover */}
        <motion.span
          animate={{ y: hovered ? "-100%" : "0%" }}
          transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "inline-flex", alignItems: "center", gap: sz.gap, whiteSpace: "nowrap" }}
        >
          {children}
        </motion.span>
        {/* Layer 2: enters from below on hover */}
        <motion.span
          animate={{ y: hovered ? "-100%" : "0%" }}
          transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: sz.gap,
            whiteSpace: "nowrap",
            position: "absolute",
            top: "100%",
            left: 0,
          }}
        >
          {children}
        </motion.span>
      </span>
    </motion.span>
  );

  if (isButton) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-block" }}>
        {content}
      </button>
    );
  }

  return content;
}

export default function AnimatedButton({ href, onClick, variant = "gold", size = "md", children, className = "", type = "button", disabled = false }: AnimatedButtonProps) {
  if (href) {
    return (
      <Link href={href} style={{ display: "inline-block", textDecoration: "none" }}>
        <ButtonCore variant={variant} size={size} className={className} disabled={disabled}>
          {children}
        </ButtonCore>
      </Link>
    );
  }

  return (
    <ButtonCore variant={variant} size={size} className={className} disabled={disabled} onClick={onClick} type={type} isButton>
      {children}
    </ButtonCore>
  );
}
