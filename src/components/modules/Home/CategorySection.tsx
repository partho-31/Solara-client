"use client";

import Link from "next/link";



interface Category {
  id: number;
  label: string;
  tag: string;
  description: string;
  cta: string;
  href: string;
  emoji: string;
  itemCount: number;
  accent: string;       
  textAccent: string;  
  borderAccent: string;
  reverse: boolean;     
}


const CATEGORIES: Category[] = [
  {
    id: 1,
    label: "Women's Fashion",
    tag: "New Season",
    description:
      "From fluid silhouettes to tailored classics — our women's edit blends contemporary design with timeless elegance. Discover pieces that move with you.",
    cta: "Shop Women",
    href: "/collections",
    emoji: "👗",
    itemCount: 84,
    accent: "bg-amber-50",
    textAccent: "text-amber-700",
    borderAccent: "border-amber-200",
    reverse: false,
  },
  {
    id: 2,
    label: "Men's Collection",
    tag: "Essentials",
    description:
      "Refined basics and statement outerwear built for the modern man. Every piece is crafted for versatility — dress it up, dress it down.",
    cta: "Shop Men",
    href: "/collections",
    emoji: "🧥",
    itemCount: 62,
    accent: "bg-stone-100",
    textAccent: "text-stone-600",
    borderAccent: "border-stone-300",
    reverse: true,
  },
  {
    id: 3,
    label: "Accessories",
    tag: "Statement Pieces",
    description:
      "The right accessory transforms any look. Bags, jewellery, scarves and more — thoughtfully curated to complete your wardrobe story.",
    cta: "Shop Accessories",
    href: "/collections",
    emoji: "👜",
    itemCount: 45,
    accent: "bg-rose-50",
    textAccent: "text-rose-600",
    borderAccent: "border-rose-200",
    reverse: false,
  },
];



function CategoryBanner({ category }: { category: Category }) {
  const {
    label, tag, description, cta, href,
    emoji, itemCount, accent,
    textAccent, borderAccent, reverse,
  } = category;

  return (
    <div
      className={`group flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-stretch min-h-85 rounded-xl overflow-hidden
        border border-stone-200 shadow-sm
        hover:shadow-[0_12px_40px_rgba(15,14,12,0.1)]
        transition-shadow duration-500`}
    >
      {/* ── Visual / Emoji Panel ── */}
      <div
        className={`relative shrink-0 w-full md:w-[42%] ${accent}
          flex items-center justify-center overflow-hidden
          min-h-55 md:min-h-0`}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,transparent,transparent 32px,rgba(0,0,0,0.03) 32px,rgba(0,0,0,0.03) 33px)",
          }}
        />

        {/* Item count badge */}
        <span
          className={`absolute top-4 left-4 text-[0.68rem] font-semibold
            tracking-[0.12em] uppercase px-3 py-1 rounded-full
            border ${borderAccent} ${textAccent} bg-white/80 backdrop-blur-sm`}
        >
          {itemCount} items
        </span>

        {/* Main emoji — floats on hover */}
        <span
          className="relative z-10 text-[7rem] leading-none select-none
            transition-transform duration-700 ease-in-out
            group-hover:-translate-y-3 group-hover:scale-110
            drop-shadow-[0_16px_32px_rgba(0,0,0,0.12)]"
          aria-hidden="true"
        >
          {emoji}
        </span>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16
          bg-linear-to-t from-white/20 to-transparent" />
      </div>

      {/* ── Text Panel ── */}
      <div
        className="flex flex-col justify-center gap-5 flex-1
          px-8 md:px-12 py-10 bg-white"
      >
        {/* Tag */}
        <span
          className={`inline-flex self-start text-[0.68rem] font-semibold
            tracking-[0.16em] uppercase px-3 py-1 rounded-full
            border ${borderAccent} ${textAccent} bg-opacity-10`}
        >
          {tag}
        </span>

        {/* Heading */}
        <div>
          <h3
            className="text-3xl md:text-4xl font-light text-stone-900 leading-tight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {label}
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed font-light max-w-md">
            {description}
          </p>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-amber-500" />

        {/* CTA */}
        <div className="flex items-center gap-6">
          <Link href={href}>
            <button
              className="flex items-center gap-2 px-6 py-3 text-[0.8rem]
                tracking-[0.12em] uppercase font-semibold text-white
                bg-stone-900 rounded-sm border border-stone-900
                hover:bg-amber-600 hover:border-amber-600
                transition-all duration-300 cursor-pointer group/btn"
            >
              {cta}
              <span
                className="transition-transform duration-300
                  group-hover/btn:translate-x-1"
              >
                →
              </span>
            </button>
          </Link>

          <Link
            href={href}
            className="text-[0.78rem] tracking-[0.08em] uppercase text-stone-400
              hover:text-stone-900 transition-colors duration-200
              border-b border-transparent hover:border-stone-400 pb-px"
          >
            View all {itemCount}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── CategorySection (main export) ─────────────────────────────────────────

export default function CategorySection() {
  return (
    <section id="categories" className="py-24 px-6 md:px-10 bg-[#faf8f4]">

      {/* ── Section header ── */}
      <div className="max-w-6xl mx-auto mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-px bg-amber-600" />
          <span
            className="text-[0.7rem] tracking-[0.2em] uppercase
              text-amber-600 font-semibold"
          >
            Browse by Category
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl font-light text-stone-900 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Shop the <em className="italic text-amber-600">Edit</em>
          </h2>
          <p className="text-sm text-stone-400 font-light max-w-xs leading-relaxed">
            Every category, curated with intention. Find exactly what you are
            looking for — or discover something new.
          </p>
        </div>
      </div>

      {/* ── Banners ── */}
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {CATEGORIES.map((cat) => (
          <CategoryBanner key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}