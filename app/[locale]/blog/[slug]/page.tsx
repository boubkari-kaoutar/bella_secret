import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Link2 } from "lucide-react";
import { blogPosts } from "@/lib/data";

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const displayTitle = isAr && post.titleAr ? post.titleAr : post.title;
  const displayCategory = isAr && post.categoryAr ? post.categoryAr : post.category;
  const displayDate = isAr && post.dateAr ? post.dateAr : post.date;
  const displayReadTime = isAr && post.readTimeAr ? post.readTimeAr : post.readTime;
  
  // Type assertion or fallback since content/contentAr are newly added properties to data.ts
  const content = (post as any).content || post.excerpt;
  const contentAr = (post as any).contentAr || post.excerptAr;
  const displayContent = isAr && contentAr ? contentAr : content;
  
  const backText = isAr ? "العودة إلى المدونة" : "Retour au blog";
  const shareText = isAr ? "مشاركة المقال" : "Partager l'article";
  const relatedTitle = isAr ? "مقالات قد تعجبك" : "Ces articles pourraient vous intéresser";

  // Get other posts for the "Related Articles" section
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <article className="bg-[#FAF6F0] min-h-screen pb-24">
      {/* Hero Header with massive Image */}
      <div className="relative w-full h-[60vh] min-h-[450px] md:min-h-[550px] bg-black overflow-hidden relative">
        <Image 
          src={post.image} 
          alt={displayTitle} 
          fill 
          className="object-cover opacity-65"
          priority
        />
        {/* Gradients for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-black/20 to-black/40" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-24 pb-12" dir={isAr ? "rtl" : "ltr"}>
          <span className="bg-[#D39C16] text-white text-[10px] md:text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-lg">
            {displayCategory}
          </span>
          <h1 className="max-w-4xl text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-xl" style={{ fontFamily: "Playfair Display, serif" }}>
            {displayTitle}
          </h1>
          <div className="flex items-center gap-6 text-white/90 text-xs md:text-sm font-semibold tracking-widest uppercase drop-shadow-md">
            <span className="flex items-center gap-2"><Calendar size={14} /> {displayDate}</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span className="flex items-center gap-2"><Clock size={14} /> {displayReadTime}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
        
        {/* Navigation & Share Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-12 gap-4" dir={isAr ? "rtl" : "ltr"}>
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D39C16] font-semibold text-[13px] uppercase tracking-wider transition-colors" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={16} className={isAr ? "rotate-180" : ""} />
            {backText}
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-[11px] uppercase tracking-wider font-bold">{shareText}</span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#D39C16] hover:bg-[#D39C16]/10 transition-colors">
                <Facebook size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#D39C16] hover:bg-[#D39C16]/10 transition-colors">
                <Twitter size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#D39C16] hover:bg-[#D39C16]/10 transition-colors">
                <Link2 size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed md:leading-loose mb-20 drop-cap" style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
          {displayContent?.split('\n').map((paragraph: string, index: number) => {
            if (!paragraph.trim()) return null;
            // Optionally make the first paragraph styled differently
            const isFirst = index === 0;
            return (
              <p key={index} className={`mb-8 ${isFirst ? "text-xl md:text-2xl text-black font-medium leading-relaxed" : "text-[16px] md:text-[17px] text-gray-600"}`} style={isFirst ? { fontFamily: "Playfair Display, serif" } : {}}>
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-16" />

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div dir={isAr ? "rtl" : "ltr"}>
            <h3 className="text-2xl font-bold text-center text-black mb-10" style={{ fontFamily: "Playfair Display, serif" }}>
              {relatedTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((relPost) => {
                const relTitle = isAr && relPost.titleAr ? relPost.titleAr : relPost.title;
                const relCat = isAr && relPost.categoryAr ? relPost.categoryAr : relPost.category;
                return (
                  <Link href={`/${locale}/blog/${relPost.slug}`} key={relPost.id} className="group block text-decoration-none">
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100">
                      <Image src={relPost.image} alt={relTitle} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className={`absolute top-3 ${isAr ? "left-3" : "right-3"}`}>
                        <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                          {relCat}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-black group-hover:text-[#D39C16] transition-colors line-clamp-2" style={{ fontFamily: "Playfair Display, serif" }}>
                      {relTitle}
                    </h4>
                    <span className="text-[#D39C16] text-[11px] font-bold uppercase tracking-widest mt-2 block">
                      {backText.includes("Retour") ? "Lire l'article" : "اقرأ المقال"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
