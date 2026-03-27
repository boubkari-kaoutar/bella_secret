"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({ badge, title, highlight, subtitle, center = false, light = false }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".st-anim"),
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      }
    );
  }, []);

  return (
    <div ref={ref} style={{ textAlign: center ? "center" : "left" }}>

      <h2 className="st-anim" style={{
        fontFamily: "Playfair Display, serif",
        fontSize: "clamp(1.8rem, 4vw, 3rem)",
        fontWeight: 700,
        lineHeight: 1.2,
        color: light ? "#fff" : "#000",
        margin: 0,
      }}>
        {title}{" "}
        {highlight && (
          <span style={{
            background: "linear-gradient(135deg,#EBD060,#D39C16)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="st-anim" style={{
          marginTop: "14px",
          fontSize: "15px",
          lineHeight: 1.7,
          color: light ? "#9CA3AF" : "#6B7280",
          maxWidth: "580px",
          ...(center ? { marginLeft: "auto", marginRight: "auto" } : {}),
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
