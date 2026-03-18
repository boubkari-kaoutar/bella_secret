"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/Loader";
import WhatsAppButton from "@/components/WhatsAppButton";
import LenisProvider from "@/components/LenisProvider";
import CartDrawer from "@/components/ui/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <LenisProvider>
        <Loader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CartDrawer />
      </LenisProvider>
    </CartProvider>
  );
}
