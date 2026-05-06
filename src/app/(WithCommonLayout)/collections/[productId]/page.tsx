"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number | null;
  description: string;
  emoji: string;
  colors: string[];
  category: string;
};

const product: Product = {
  id: 1,
  name: "Linen Oversized Blazer",
  price: 189,
  oldPrice: 240,
  description:
    "A timeless oversized blazer crafted from breathable linen. Designed for effortless layering with a structured yet relaxed silhouette.",
  emoji: "🧥",
  colors: ["Ivory", "Camel", "Black"],
  category: "Outerwear",
};

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#0f0e0c] py-25 ">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16 grid lg:grid-cols-2 gap-12">

        {/* LEFT: IMAGE */}
        <div className="bg-[#1c1a16] relative overflow-hidden flex items-center justify-center min-h-130">
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,#b8975a20_40px,#b8975a20_41px)]" />

          <div className="text-[10rem] animate-[float_6s_ease-in-out_infinite]">
            {product.emoji}
          </div>

          <div className="absolute bottom-6 left-6 bg-white/10 border border-[#b8975a55] backdrop-blur-md text-white px-4 py-3 rounded-sm">
            <p className="text-xs uppercase tracking-widest text-[#e8d9b8]">
              Category
            </p>
            <p className="font-serif text-lg">{product.category}</p>
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          {/* TAG */}
          <p className="text-xs uppercase tracking-[0.25em] text-[#b8975a]">
            New Arrival
          </p>

          {/* TITLE */}
          <h1 className="font-serif text-4xl md:text-5xl mt-2 leading-tight">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-medium">${product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          {/* COLORS */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
              Select Color
            </p>

            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border text-sm transition ${
                    selectedColor === color
                      ? "border-[#b8975a] bg-[#f3ede2]"
                      : "border-[#e2dbd0] bg-white"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex gap-3">
            <button className="flex-1 bg-[#0f0e0c] text-white py-3 text-xs uppercase tracking-widest hover:bg-[#b8975a] transition">
              Add to Cart
            </button>

           
          </div>

          {/* INFO BLOCKS */}
          <div className="mt-10 space-y-4 text-sm text-gray-600">
            

            <div className="flex justify-between border-b border-[#e2dbd0] pb-3">
              <span>Returns</span>
              <span>60 days easy return</span>
            </div>

            <div className="flex justify-between">
              <span>Material</span>
              <span>Premium Linen Blend</span>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="border-t border-[#e2dbd0] px-6 md:px-16 py-16">
        <h2 className="font-serif text-2xl mb-6">Style Notes</h2>

        <p className="text-gray-600 leading-relaxed max-w-3xl">
          This blazer is designed for modern layering — structured shoulders
          meet a relaxed drape. Pair it with tailored trousers or minimal
          denim for a refined everyday look. Crafted for versatility, built for
          timeless wear.
        </p>
      </div>
    </div>
  );
}