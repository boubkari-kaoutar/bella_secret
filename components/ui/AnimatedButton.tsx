"use client";

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

const sizes = { sm: "px-5 py-2.5 text-xs", md: "px-7 py-3.5 text-sm", lg: "px-9 py-4 text-base" };

function getStyle(variant: string): React.CSSProperties {
  if (variant === "gold")           return { backgroundColor: "#EBD060", color: "#000" };
  if (variant === "outline")        return { border: "2px solid #000", color: "#000", backgroundColor: "transparent" };
  if (variant === "dark")           return { backgroundColor: "#000", color: "#fff" };
  if (variant === "outline-light")  return { border: "2px solid #fff", color: "#fff", backgroundColor: "transparent" };
  return {};
}

export default function AnimatedButton({ href, onClick, variant = "gold", size = "md", children, className = "", type = "button", disabled = false }: AnimatedButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide cursor-pointer select-none ${sizes[size]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;
  const style = getStyle(variant);

  const inner = (
    <motion.span
      className={cls}
      style={style}
      whileHover={{ scale: 1.04, opacity: 0.92 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.span>
  );

  if (href) return <Link href={href} style={{ display: "inline-block" }}>{inner}</Link>;

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cls}
      style={style}
      whileHover={{ scale: 1.04, opacity: 0.92 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
