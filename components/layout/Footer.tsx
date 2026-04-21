"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";

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
    <footer className="bg-[#EDE8E0] text-gray-800 border-t border-[#D9D3C8]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/LOGO-1.png"
                alt="Bella Secret"
                width={72}
                height={72}
                className="object-contain"
              />
              <div>
                <p
                  className="font-bold text-lg text-black"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Bella Secret
                </p>
                <p className="text-[10px] text-[#D39C16] tracking-[0.2em] uppercase">
                  Nature House
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              {t("tagline")}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/bella.secretofficiel/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#EBD060] hover:border-[#EBD060] transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/212771010999`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-black font-semibold text-sm uppercase tracking-widest mb-5">
              {t("links_title")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-600 text-sm hover:text-[#D39C16] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-black font-semibold text-sm uppercase tracking-widest mb-5">
              {t("contact_title")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-gray-600 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-[#D39C16] flex-shrink-0" />
                <span>+212 771 010 999</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-600 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-[#D39C16] flex-shrink-0" />
                <span>bella.secretnature@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-[#D39C16] flex-shrink-0" />
                <span>Maroc</span>
              </li>
              <li className="mt-4">
                <p className="text-gray-400 text-xs">Salma Benabouche</p>
                <p className="text-gray-400 text-xs">Bella Secret COOP</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">{t("rights")}</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="text-gray-500 text-xs hover:text-[#D39C16] transition-colors">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}`} className="text-gray-500 text-xs hover:text-[#D39C16] transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
