"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!loaderRef.current) return;

    const tl = gsap.timeline();

    // Animate logo in
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      )
      .to(progressRef.current, {
        width: "100%",
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => setVisible(false),
        },
        "+=0.2"
      );

    return () => { tl.kill(); };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF6F0]"
    >
      {/* Blob bg */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blob-animate opacity-10"
          style={{ background: "radial-gradient(circle, #EBD060 0%, transparent 70%)" }}
        />
      </div>

      <div ref={logoRef} className="relative z-10 mb-6">
        <Image
          src="/images/LOGO-1.png"
          alt="Bella Secret"
          width={100}
          height={100}
          className="object-contain"
          priority
        />
      </div>

      <div ref={textRef} className="relative z-10 text-center mb-10">
        <p
          className="text-black text-2xl tracking-[0.4em] uppercase"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Bella Secret
        </p>
        <p className="text-[#D39C16] text-xs tracking-[0.3em] uppercase mt-1">
          Nature House
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-48 h-[1px] bg-gray-200 overflow-hidden rounded-full">
        <div
          ref={progressRef}
          className="h-full w-0 rounded-full"
          style={{ background: "linear-gradient(90deg, #EBD060, #D39C16)" }}
        />
      </div>
    </div>
  );
}
