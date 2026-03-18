"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Menu, X, Globe, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "shop", href: "/shop" },
  { key: "blog", href: "/blog" },
  { key: "reseller", href: "/reseller" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || "fr";
  const { count, setIsOpen } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const otherLocale = locale === "fr" ? "ar" : "fr";
  const otherLang = locale === "fr" ? "عربي" : "FR";

  // Build alternate path
  const switchLangHref = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate nav links in
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current.querySelectorAll(".nav-link"),
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out", delay: 1.8 }
    );
  }, []);

  const isActive = (href: string) => {
    const full = `/${locale}${href === "/" ? "" : href}`;
    return pathname === full || (href !== "/" && pathname.startsWith(full));
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo — LOGO-2.jpg on dark bg, LOGO-1.png on white bg */}
            <Link href={`/${locale}`} className="flex items-center gap-3 flex-shrink-0">
              <Image
                src={scrolled ? "/images/LOGO-1.png" : "/images/LOGO-2.jpg"}
                alt="Bella Secret"
                width={44}
                height={44}
                className="object-contain"
              />
              <div className="hidden sm:block">
                <p
                  className={`font-bold text-base leading-tight transition-colors ${scrolled ? "text-black" : "text-white"}`}
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Bella Secret
                </p>
                <p className="text-[10px] tracking-[0.2em] text-[#D39C16] uppercase">
                  Nature House
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === "/" ? "" : link.href}`}
                  className={`nav-link text-sm font-medium relative group transition-colors ${
                    scrolled ? "text-gray-700 hover:text-black" : "text-white/90 hover:text-white"
                  } ${isActive(link.href) ? (scrolled ? "text-black" : "text-white") : ""}`}
                >
                  {t(link.key)}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#D39C16] transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <Link
                href={switchLangHref}
                className={`flex items-center gap-1.5 text-xs font-medium border rounded-full px-3 py-1.5 transition-all ${
                  scrolled
                    ? "border-gray-200 text-gray-600 hover:border-[#D39C16] hover:text-[#D39C16]"
                    : "border-white/30 text-white/80 hover:border-white hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {otherLang}
              </Link>

              {/* CTA */}
              <Link
                href={`/${locale}/shop`}
                className="hidden lg:flex items-center gap-2 text-xs font-semibold tracking-wide text-black bg-[#EBD060] hover:bg-[#D39C16] px-4 py-2.5 rounded-full transition-all duration-300 uppercase"
              >
                {t("shop")}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsOpen(true)}
                className={`relative p-2 rounded-full transition-colors ${
                  scrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Panier"
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#EBD060] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  scrolled ? "text-black hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-[99] bg-white shadow-xl border-b border-gray-100 lg:hidden overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/${locale}${link.href === "/" ? "" : link.href}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-[#EBD060]/20 text-black font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-100">
                <Link
                  href={`/${locale}/shop`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-3 bg-[#EBD060] hover:bg-[#D39C16] text-black font-semibold rounded-full text-sm transition-colors"
                >
                  {t("shop")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
