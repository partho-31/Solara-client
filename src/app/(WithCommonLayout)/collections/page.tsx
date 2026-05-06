"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  cat: string;
  price: number;
  createdAt: string;
  emoji: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Linen Blazer",
    cat: "outerwear",
    price: 189,
    createdAt: "2026-05-01",
    emoji: "🧥",
  },
  {
    id: 2,
    name: "Silk Slip Dress",
    cat: "tops",
    price: 145,
    createdAt: "2026-04-28",
    emoji: "👗",
  },
  {
    id: 3,
    name: "Wide-Leg Pants",
    cat: "bottoms",
    price: 98,
    createdAt: "2026-04-20",
    emoji: "👖",
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    cat: "tops",
    price: 220,
    createdAt: "2026-05-02",
    emoji: "🧶",
  },
  {
    id: 5,
    name: "Leather Bag",
    cat: "accessories",
    price: 165,
    createdAt: "2026-04-10",
    emoji: "👜",
  },
  {
    id: 6,
    name: "Trench Coat",
    cat: "outerwear",
    price: 295,
    createdAt: "2026-03-25",
    emoji: "🧣",
  },
];

export default function CollectionsPage() {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    return initialProducts
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (minPrice ? p.price >= Number(minPrice) : true))
      .filter((p) => (maxPrice ? p.price <= Number(maxPrice) : true))
      .sort((a, b) =>
        sort === "newest"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }, [search, minPrice, maxPrice, sort]);

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#0f0e0c] py-25">
      {/* HEADER */}
      <div className="px-6 md:px-16 pt-16 pb-10">
        <p className="text-xs tracking-[0.25em] uppercase text-[#b8975a]">
          Curated Collection
        </p>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">
          This Season’s Edit
        </h1>
        <p className="text-gray-500 mt-3 max-w-xl">
          Minimal, timeless pieces designed with intention and quiet luxury.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="px-6 md:px-16 pb-8">
        <div className="grid md:grid-cols-4 gap-3 bg-white border border-[#e2dbd0] p-4 rounded-sm">
          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
          />

          {/* Min Price */}
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min price"
            className="px-4 py-2 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
          />

          {/* Max Price */}
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max price"
            className="px-4 py-2 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
          />

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="px-4 py-2 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="px-6 md:px-16 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link href={`collections/${p.id}`} key={p.id}>
              <div className="bg-white border border-[#e2dbd0] rounded-sm overflow-hidden hover:shadow-lg transition">
                {/* IMAGE */}
                <div className="h-56 flex items-center justify-center bg-[#f0ebf4] text-6xl">
                  {p.emoji}
                </div>

                {/* BODY */}
                <div className="p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    {p.cat}
                  </p>

                  <h2 className="font-serif text-lg mt-1">{p.name}</h2>

                  <div className="flex justify-between items-center mt-3">
                    <span className="font-medium">${p.price}</span>

                    <button className="text-xs uppercase tracking-widest border border-[#0f0e0c] px-3 py-1 hover:bg-[#0f0e0c] hover:text-white transition">
                      Add
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 mt-3">
                    Added: {p.createdAt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in this filter.
          </div>
        )}
      </div>
    </div>
  );
}
