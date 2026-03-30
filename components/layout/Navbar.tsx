"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Menu, X, Globe, ShoppingBag, ShoppingCart } from "lucide-react";
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
  const switchLangHref = pathname.replace(`/${locale}`, `/${otherLocale}`);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current.querySelectorAll(".nav-link"),
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: "power2.out", delay: 1.8 }
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
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(211,156,22,0.15)"
            : "0 1px 0 rgba(211,156,22,0.12)",
        }}
      >
        {/* Gold accent line top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent 0%, #D39C16 40%, #EBD060 60%, transparent 100%)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between transition-all duration-500"
            style={{ height: scrolled ? "60px" : "72px" }}
          >
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 flex-shrink-0">
              <motion.div whileHover={{ rotate: -3 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/images/LOGO-1.png"
                  alt="Bella Secret"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </motion.div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-7">
              {links.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === "/" ? "" : link.href}`}
                  className={`nav-link relative group transition-colors duration-200 ${
                    isActive(link.href) ? "text-black" : "text-gray-500 hover:text-black"
                  }`}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {t(link.key)}
                  {/* Active/hover underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-300"
                    style={{
                      width: isActive(link.href) ? "100%" : "0%",
                      background: "linear-gradient(90deg, #EBD060, #D39C16)",
                    }}
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-300 group-hover:w-full"
                    style={{
                      width: "0%",
                      background: "linear-gradient(90deg, #EBD060, #D39C16)",
                      opacity: isActive(link.href) ? 0 : 1,
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1">
              {/* BOUTIQUE CTA */}
              <Link
                href={`/${locale}/shop`}
                className="hidden lg:flex items-center gap-2 transition-all duration-300"
                style={{
                  background: "#111",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "9px 20px",
                  borderRadius: "999px",
                  boxShadow: "0 2px 14px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 22px rgba(0,0,0,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 14px rgba(0,0,0,0.2)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <ShoppingBag style={{ width: 12, height: 12 }} />
                {t("shop")}
              </Link>

              {/* Divider */}
              <div className="hidden lg:block w-px h-5 bg-gray-200 mx-2" />

              {/* Language switcher */}
              <Link
                href={switchLangHref}
                className="flex items-center gap-1.5 transition-all duration-200 rounded-full px-3 py-1.5 hover:bg-gray-100"
                style={{ color: "#111" }}
              >
                <Globe className="w-3.5 h-3.5" />
                <span
                  className="hidden sm:inline font-semibold"
                  style={{ fontSize: "11px", letterSpacing: "0.06em" }}
                >
                  {otherLang}
                </span>
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 rounded-full transition-all duration-200 hover:bg-gray-100"
                style={{ color: "#111" }}
                aria-label="Panier"
              >
                <ShoppingCart style={{ width: 18, height: 18 }} />
                {count > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 text-white font-bold flex items-center justify-center rounded-full"
                    style={{
                      width: 16, height: 16, fontSize: "9px",
                      background: "linear-gradient(135deg, #D39C16, #7A5C0A)",
                    }}
                  >
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-full transition-colors text-gray-700 hover:bg-gray-100 ml-1"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[60px] left-0 right-0 z-[99] lg:hidden overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              borderBottom: "1px solid rgba(211,156,22,0.15)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/${locale}${link.href === "/" ? "" : link.href}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center py-3 px-4 rounded-xl text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-200 ${
                      isActive(link.href)
                        ? "text-black bg-[#EBD060]/15"
                        : "text-gray-500 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {isActive(link.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D39C16] mr-2 flex-shrink-0" />
                    )}
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 mt-2 border-t border-gray-100 flex gap-3">
                <Link
                  href={`/${locale}/shop`}
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 font-bold text-[11px] uppercase tracking-[0.12em] rounded-full transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #B8860B 0%, #6B4C08 100%)",
                    color: "#fff",
                    boxShadow: "0 2px 14px rgba(184,134,11,0.3)",
                  }}
                >
                  <ShoppingBag style={{ width: 13, height: 13 }} />
                  {t("shop")}
                </Link>
                <Link
                  href={switchLangHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-full border font-semibold text-[11px] transition-all duration-200"
                  style={{ color: "#B8860B", borderColor: "rgba(211,156,22,0.35)", backgroundColor: "#FBF6EC" }}
                >
                  <Globe style={{ width: 13, height: 13 }} />
                  {otherLang}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
