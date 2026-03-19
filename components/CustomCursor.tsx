"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const hide = () => setVisible(false);

    const attachToInteractives = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, label, select").forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", hide);
    attachToInteractives();

    const observer = new MutationObserver(attachToInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", hide);
      observer.disconnect();
    };
  }, [mx, my, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — spring lag */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
          pointerEvents: "none",
          borderRadius: "50%",
          border: `1.5px solid ${hovered ? "#D39C16" : "rgba(211,156,22,0.55)"}`,
          backgroundColor: hovered ? "rgba(235,208,96,0.07)" : "transparent",
        }}
        animate={{
          width: clicked ? 18 : hovered ? 46 : 30,
          height: clicked ? 18 : hovered ? 46 : 30,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      />

      {/* Inner dot — no lag */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
          pointerEvents: "none",
          borderRadius: "50%",
          backgroundColor: "#D39C16",
        }}
        animate={{
          width: hovered ? 0 : clicked ? 3 : 5,
          height: hovered ? 0 : clicked ? 3 : 5,
          opacity: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </>
  );
}
