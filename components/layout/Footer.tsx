"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  const navLinks = [
    { label: nav("home"), href: `/${locale}` },
    { label: nav("about"), href: `/${locale}/about` },
    { label: nav("shop"), href: `/${locale}/shop` },
    { label: nav("blog"), href: `/${locale}/blog` },
    { label: nav("reseller"), href: `/${locale}/reseller` },
    { label: nav("contact"), href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/LOGO-2.jpg"
                alt="Bella Secret"
                width={50}
                height={50}
                className="object-contain"
              />
              <div>
                <p
                  className="font-bold text-lg text-white"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Bella Secret
                </p>
                <p className="text-[10px] text-[#D39C16] tracking-[0.2em] uppercase">
                  Nature House
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              {t("tagline")}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/bella.secretofficiel/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#EBD060] hover:border-[#EBD060] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/212762627500`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              {t("links_title")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 text-sm hover:text-[#EBD060] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              {t("contact_title")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-[#D39C16] flex-shrink-0" />
                <span>+212 762 627 500</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-[#D39C16] flex-shrink-0" />
                <span>contact@bellasecret.ma</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-[#D39C16] flex-shrink-0" />
                <span>Maroc</span>
              </li>
              <li className="mt-4">
                <p className="text-gray-500 text-xs">Salma Benabouche</p>
                <p className="text-gray-500 text-xs">Bella Secret COOP</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">{t("rights")}</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="text-gray-600 text-xs hover:text-[#EBD060] transition-colors">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}`} className="text-gray-600 text-xs hover:text-[#EBD060] transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
