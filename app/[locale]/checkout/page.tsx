"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Truck, CreditCard, Banknote, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const DELIVERY_OPTIONS = [
  { id: "standard", fee: 30, days: "2-3" },
  { id: "express", fee: 50, days: "24h" },
];
const FREE_THRESHOLD = 500;

const MOROCCO_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kénitra", "Tétouan", "Salé", "Mohammedia",
  "El Jadida", "Béni Mellal", "Nador", "Settat", "Safi", "Khouribga",
  "Laâyoune", "Dakhla",
];

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "fr";
  const isAr = locale === "ar";
  const { items, total, clearCart } = useCart();

  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    address: "", city: "", notes: "",
  });
  const [cardForm, setCardForm] = useState({
    number: "", name: "", expiry: "", cvv: "",
  });
  const [loading, setLoading] = useState(false);

  // const deliveryOption = DELIVERY_OPTIONS.find((d) => d.id === delivery)!;
  // const deliveryFee = total >= FREE_THRESHOLD ? 0 : deliveryOption.fee;
  // const grandTotal = total + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const deliveryLabel = delivery === "standard"
      ? "Livraison standard (2-3 jours)"
      : "Livraison express (24h)";

    const paymentLabel = payment === "cod"
      ? "Paiement à la livraison"
      : "Carte bancaire";

    const productLines = items
      .map((item) => `  • ${isAr && item.nameAr ? item.nameAr : item.name} × ${item.quantity}`)
      .join("\n");

    const message = [
      "🛍️ *NOUVELLE COMMANDE — Bella Secret*",
      "",
      "👤 *Informations client :*",
      `Nom : ${form.firstName} ${form.lastName}`,
      `Téléphone : ${form.phone}`,
      form.email ? `Email : ${form.email}` : "",
      "",
      "📦 *Produits commandés :*",
      productLines,
      "",
      "📍 *Livraison :*",
      `Adresse : ${form.address}`,
      `Ville : ${form.city}`,
      `Mode : ${deliveryLabel}`,
      "",
      `💳 *Paiement :* ${paymentLabel}`,
      form.notes ? `\n📝 *Remarques :* ${form.notes}` : "",
    ]
      .filter((line) => line !== "")
      .join("\n");

    const whatsappUrl = `https://wa.me/212762627500?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    clearCart();
    setLoading(false);
    router.push(`/${locale}/checkout/success`);
  };

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D39C16] transition-colors bg-white";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F0] px-4 pt-24 text-center">
        <p className="text-gray-500 text-lg mb-6">{t("empty_cart")}</p>
        <a href={`/${locale}/shop`} className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold">
          {t("go_shop")}
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
          {t("title")}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ─── Left: Form ─── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Delivery Info */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-bold text-base mb-5 flex items-center gap-2" style={{ fontFamily: "Playfair Display, serif" }}>
                  <Truck className="w-4 h-4 text-[#D39C16]" />
                  {t("delivery_info")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>{t("first_name")} *</label>
                    <input className={inputCls} required value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>{t("last_name")} *</label>
                    <input className={inputCls} required value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>{t("phone")} *</label>
                    <input className={inputCls} type="tel" required value={form.phone}
                      placeholder="+212 6XX XXX XXX"
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>{t("email")}</label>
                    <input className={inputCls} type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>{t("address")} *</label>
                    <input className={inputCls} required value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>{t("city")} *</label>
                    <select className={inputCls} required value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}>
                      <option value="">{t("select_city")}</option>
                      {MOROCCO_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>{t("notes")}</label>
                    <textarea rows={2} className={inputCls} value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-bold text-base mb-5" style={{ fontFamily: "Playfair Display, serif" }}>
                  {t("delivery_method")}
                </h2>
                <div className="space-y-3">
                  {DELIVERY_OPTIONS.map((opt) => {
                    const isFree = total >= FREE_THRESHOLD;
                    const fee = isFree ? 0 : opt.fee;
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          delivery === opt.id ? "border-[#D39C16] bg-[#EBD060]/5" : "border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input type="radio" name="delivery" value={opt.id}
                            checked={delivery === opt.id}
                            onChange={() => setDelivery(opt.id)}
                            className="accent-[#D39C16]"
                          />
                          <div>
                            <p className="text-sm font-semibold text-black">
                              {opt.id === "standard" ? t("delivery_standard") : t("delivery_express")}
                            </p>
                            <p className="text-xs text-gray-400">
                              {opt.id === "standard" ? t("days_standard", { days: opt.days }) : t("days_express")}
                            </p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${fee === 0 ? "text-green-600" : "text-black"}`}>
                          {fee === 0 ? t("free") : `${opt.fee} MAD`}
                        </span>
                      </label>
                    );
                  })}
                  {total >= FREE_THRESHOLD && (
                    <p className="text-xs text-green-600 font-medium px-1">✓ {t("free_delivery_applied")}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="font-bold text-base mb-5 flex items-center gap-2" style={{ fontFamily: "Playfair Display, serif" }}>
                  <CreditCard className="w-4 h-4 text-[#D39C16]" />
                  {t("payment_method")}
                </h2>
                <div className="space-y-3 mb-5">
                  {/* COD */}
                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payment === "cod" ? "border-[#D39C16] bg-[#EBD060]/5" : "border-gray-100 hover:border-gray-200"
                  }`}>
                    <input type="radio" name="payment" value="cod"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      className="accent-[#D39C16]"
                    />
                    <Banknote className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">{t("cod")}</p>
                      <p className="text-xs text-gray-400">{t("cod_desc")}</p>
                    </div>
                  </label>

                  {/* Card */}
                  <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payment === "card" ? "border-[#D39C16] bg-[#EBD060]/5" : "border-gray-100 hover:border-gray-200"
                  }`}>
                    <input type="radio" name="payment" value="card"
                      checked={payment === "card"}
                      onChange={() => setPayment("card")}
                      className="accent-[#D39C16]"
                    />
                    <CreditCard className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">{t("card")}</p>
                      <p className="text-xs text-gray-400">{t("card_desc")}</p>
                    </div>
                  </label>
                </div>

                {/* Card form */}
                {payment === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 pt-4 border-t border-gray-100"
                  >
                    <div>
                      <label className={labelCls}>{t("card_number")}</label>
                      <input className={inputCls} placeholder="1234 5678 9012 3456" maxLength={19}
                        value={cardForm.number}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                          setCardForm({ ...cardForm, number: v });
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>{t("card_name")}</label>
                      <input className={inputCls} placeholder="SALMA BENABOUCHE"
                        value={cardForm.name}
                        onChange={(e) => setCardForm({ ...cardForm, name: e.target.value.toUpperCase() })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>{t("card_expiry")}</label>
                        <input className={inputCls} placeholder="MM/AA" maxLength={5}
                          value={cardForm.expiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, "");
                            if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                            setCardForm({ ...cardForm, expiry: v });
                          }}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>CVV</label>
                        <input className={inputCls} placeholder="123" maxLength={3} type="password"
                          value={cardForm.cvv}
                          onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, "") })}
                        />
                      </div>
                    </div>
                    {/* Secure badges */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">🔒 SSL</span>
                      <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">Visa</span>
                      <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">Mastercard</span>
                      <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">CMI</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* ─── Right: Order Summary ─── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 sticky top-24">
                {/* Mobile toggle */}
                <button
                  type="button"
                  onClick={() => setSummaryOpen(!summaryOpen)}
                  className="flex items-center justify-between w-full px-6 py-4 lg:cursor-default"
                >
                  <h2 className="font-bold text-base" style={{ fontFamily: "Playfair Display, serif" }}>
                    {t("order_summary")} ({items.length})
                  </h2>
                  <span className="lg:hidden">
                    {summaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                <div className={`${summaryOpen ? "block" : "hidden"} lg:block`}>
                  <div className="px-6 pb-4 space-y-4 border-b border-gray-50">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#FAF6F0]">
                          <Image src={item.image} alt={isAr && item.nameAr ? item.nameAr : item.name} fill className="object-cover" sizes="56px" />
                          <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-black line-clamp-2" style={{ fontFamily: "Playfair Display, serif" }}>
                            {isAr && item.nameAr ? item.nameAr : item.name}
                          </p>
                        </div>
                        {/* <p className="text-sm font-bold text-black flex-shrink-0">{item.price * item.quantity} MAD</p> */}
                      </div>
                    ))}
                  </div>

                  {/* <div className="px-6 py-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{t("subtotal")}</span>
                      <span>{total} MAD</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{t("delivery_fee")}</span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold">{t("free")}</span>
                      ) : (
                        <span>{deliveryFee} MAD</span>
                      )}
                    </div>
                    <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-100">
                      <span>{t("total")}</span>
                      <span className="text-[#D39C16] text-lg">{grandTotal} MAD</span>
                    </div>
                  </div> */}

                  <div className="px-6 pb-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#EBD060] hover:bg-[#D39C16] text-black font-bold py-4 rounded-full text-sm tracking-wide transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : null}
                      {loading ? t("processing") : t("confirm_order")}
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-3">
                      🔒 {t("secure_note")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
