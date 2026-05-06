import Link from "next/link";

type Product = {
  id: number;
  name: string;
  cat: string;
  emoji: string;
  price: number;
  oldPrice?: number | null;
  badge?: "new" | "popular" | "sale" | "";
  colors: string[];
};

const badgeStyles: Record<string, string> = {
  new: "bg-green-100 text-green-700",
  popular: "bg-yellow-100 text-yellow-700",
  sale: "bg-red-100 text-red-700",
};

const badgeLabel: Record<string, string> = {
  new: "New",
  popular: "Popular",
  sale: "Sale",
};

const bgMap: Record<string, string> = {
  tops: "#f0ebf4",
  bottoms: "#e8edf0",
  outerwear: "#f0ede6",
  accessories: "#f4ede8",
};

const emojiMap: Record<string, string> = {
  tops: "👗",
  bottoms: "👖",
  outerwear: "🧥",
  accessories: "👜",
};

const products: Product[] = [
  {
    id: 1,
    name: "Linen Oversized Blazer",
    cat: "outerwear",
    emoji: "🧥",
    price: 189,
    badge: "new",
    colors: ["Ivory", "Camel", "Black"],
  },
  {
    id: 2,
    name: "Silk Slip Dress",
    cat: "tops",
    emoji: "👗",
    price: 145,
    badge: "popular",
    colors: ["Sage", "Blush", "Onyx"],
  },
  {
    id: 3,
    name: "Wide-Leg Trousers",
    cat: "bottoms",
    emoji: "👖",
    price: 98,
    colors: ["Stone", "Charcoal", "Navy"],
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    cat: "tops",
    emoji: "🧶",
    price: 220,
    oldPrice: 275,
    badge: "sale",
    colors: ["Cream", "Rust", "Forest"],
  },
  {
    id: 5,
    name: "Tailored Mini Skirt",
    cat: "bottoms",
    emoji: "🩱",
    price: 79,
    badge: "new",
    colors: ["White", "Tan", "Black"],
  },
  {
    id: 6,
    name: "Leather Crossbody Bag",
    cat: "accessories",
    emoji: "👜",
    price: 165,
    badge: "popular",
    colors: ["Cognac", "Black", "Olive"],
  },
  {
    id: 7,
    name: "Trench Coat Classic",
    cat: "outerwear",
    emoji: "🧣",
    price: 295,
    oldPrice: 350,
    badge: "sale",
    colors: ["Beige", "Khaki"],
  },
  {
    id: 8,
    name: "Gold Chain Necklace",
    cat: "accessories",
    emoji: "📿",
    price: 55,
    badge: "new",
    colors: ["Gold", "Silver"],
  },
];

export default function Collections() {
  return (
    <section className="py-24 px-6 md:px-16 lg:px-20 bg-[#faf8f4]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#b8975a] flex items-center gap-2">
            <span className="w-5 h-px bg-[#b8975a]" />
            Curated for You
          </p>

          <h2 className="text-3xl md:text-4xl font-serif font-light mt-3">
            This Season&apos;s Edit
          </h2>

          <p className="text-gray-500 max-w-md mt-3 leading-relaxed">
            From wardrobe essentials to statement pieces — each item selected
            for its quality and craftsmanship.
          </p>
        </div>

        <a
          href="#"
          className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition"
        >
          View All →
        </a>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <Link href={`collections/${p.id}`} key={p.id}>
            <div
              className="bg-white border border-[#e2dbd0] rounded-sm overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-2 duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* IMAGE */}
              <div
                className="h-64 flex items-center justify-center text-5xl relative"
                style={{ backgroundColor: bgMap[p.cat] }}
              >
                {p.emoji || emojiMap[p.cat]}

                {p.badge && (
                  <span
                    className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-semibold ${
                      badgeStyles[p.badge]
                    }`}
                  >
                    {badgeLabel[p.badge]}
                  </span>
                )}
              </div>

              {/* BODY */}
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  {p.cat}
                </p>

                <h3 className="font-serif text-lg mt-1">{p.name}</h3>

                <p className="text-xs text-gray-400 mt-2">
                  {p.colors.join(" · ")}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="font-medium">${p.price}</span>
                    {p.oldPrice && (
                      <span className="text-xs line-through text-gray-400 ml-2">
                        ${p.oldPrice}
                      </span>
                    )}
                  </div>

                  <button className="text-xs uppercase border border-black px-3 py-1 hover:bg-black hover:text-white transition">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
