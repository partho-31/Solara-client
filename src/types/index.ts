// ── Dashboard Shared Types ─────────────────────────────────────────────────

export type Tab = "overview" | "add" | "manage";

export type Badge = "new" | "popular" | "sale" | "";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge: Badge;
  emoji: string;
  colors: string[];
  stock: number;
  sales: number;
}

export interface DashboardUser {
  name: string;
  email: string;
  image?: string;
}

// ── Shared constants ───────────────────────────────────────────────────────

export const BADGE_STYLES: Record<string, string> = {
  new:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  popular: "bg-amber-50 text-amber-700 border-amber-200",
  sale:    "bg-red-50 text-red-600 border-red-200",
  "":      "bg-stone-100 text-stone-400 border-stone-200",
};

export const CAT_BG: Record<string, string> = {
  tops:        "bg-purple-50",
  bottoms:     "bg-blue-50",
  outerwear:   "bg-amber-50",
  accessories: "bg-rose-50",
};

export const SEED_PRODUCTS: Product[] = [
  { id: 1, name: "Linen Oversized Blazer", category: "outerwear",   price: 189, badge: "new",     emoji: "🧥", colors: ["Ivory","Camel","Black"],  stock: 24, sales: 38 },
  { id: 2, name: "Silk Slip Dress",        category: "tops",        price: 145, badge: "popular", emoji: "👗", colors: ["Sage","Blush","Onyx"],    stock: 12, sales: 91 },
  { id: 3, name: "Wide-Leg Trousers",      category: "bottoms",     price: 98,  badge: "",        emoji: "👖", colors: ["Stone","Charcoal"],        stock: 30, sales: 22 },
  { id: 4, name: "Cashmere Turtleneck",    category: "tops",        price: 220, oldPrice: 275, badge: "sale", emoji: "🧶", colors: ["Cream","Rust"], stock: 8,  sales: 57 },
  { id: 5, name: "Tailored Mini Skirt",    category: "bottoms",     price: 79,  badge: "new",     emoji: "🩱", colors: ["White","Tan","Black"],     stock: 19, sales: 14 },
  { id: 6, name: "Leather Crossbody Bag",  category: "accessories", price: 165, badge: "popular", emoji: "👜", colors: ["Cognac","Black"],          stock: 7,  sales: 63 },
];