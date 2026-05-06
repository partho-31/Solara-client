"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  LogOut,
  TrendingUp,
  ShoppingBag,
  Star,
  DollarSign,
  Pencil,
  Trash2,
  X,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type Tab = "overview" | "add" | "manage";
type Badge = "new" | "popular" | "sale" | "";

interface Product {
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

// ── Seed Data ──────────────────────────────────────────────────────────────

const SEED_PRODUCTS: Product[] = [
  { id: 1, name: "Linen Oversized Blazer", category: "outerwear", price: 189, badge: "new",     emoji: "🧥", colors: ["Ivory","Camel","Black"],   stock: 24, sales: 38 },
  { id: 2, name: "Silk Slip Dress",        category: "tops",      price: 145, badge: "popular", emoji: "👗", colors: ["Sage","Blush","Onyx"],    stock: 12, sales: 91 },
  { id: 3, name: "Wide-Leg Trousers",      category: "bottoms",   price: 98,  badge: "",        emoji: "👖", colors: ["Stone","Charcoal"],        stock: 30, sales: 22 },
  { id: 4, name: "Cashmere Turtleneck",    category: "tops",      price: 220, oldPrice: 275, badge: "sale", emoji: "🧶", colors: ["Cream","Rust"], stock: 8,  sales: 57 },
  { id: 5, name: "Tailored Mini Skirt",    category: "bottoms",   price: 79,  badge: "new",     emoji: "🩱", colors: ["White","Tan","Black"],     stock: 19, sales: 14 },
  { id: 6, name: "Leather Crossbody Bag",  category: "accessories",price: 165,badge: "popular", emoji: "👜", colors: ["Cognac","Black"],          stock: 7,  sales: 63 },
];

const BADGE_STYLES: Record<string, string> = {
  new:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  popular: "bg-amber-50 text-amber-700 border-amber-200",
  sale:    "bg-red-50 text-red-600 border-red-200",
  "":      "bg-stone-100 text-stone-400 border-stone-200",
};

const CAT_BG: Record<string, string> = {
  tops:       "bg-purple-50",
  bottoms:    "bg-blue-50",
  outerwear:  "bg-amber-50",
  accessories:"bg-rose-50",
};

// ── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, sub, color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col gap-4
      hover:shadow-[0_8px_32px_rgba(15,14,12,0.08)] transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-[0.14em] uppercase text-stone-400 font-medium">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
          <Icon size={16} className="text-white" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-light text-stone-900"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {value}
        </p>
        <p className="text-xs text-stone-400 mt-1">{sub}</p>
      </div>
    </div>
  );
}

// ── Overview Tab ───────────────────────────────────────────────────────────

function OverviewTab({ products }: { products: Product[] }) {
  const totalRevenue = products.reduce((s, p) => s + p.price * p.sales, 0);
  const totalSales   = products.reduce((s, p) => s + p.sales, 0);
  const avgRating    = 4.8;
  const lowStock     = products.filter((p) => p.stock < 10);

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Revenue"  value={`$${totalRevenue.toLocaleString()}`} sub="All time earnings"        color="bg-amber-500"   />
        <StatCard icon={ShoppingBag} label="Total Sales"   value={totalSales.toString()}               sub="Units sold across store"  color="bg-stone-800"   />
        <StatCard icon={Boxes}       label="Products Live" value={products.length.toString()}           sub="Active in your store"     color="bg-emerald-600" />
        <StatCard icon={Star}        label="Avg. Rating"   value={avgRating.toString()}                 sub="From customer reviews"    color="bg-rose-500"    />
      </div>

      {/* Top performers */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-stone-900 tracking-wide">
            Top Performing Products
          </h3>
          <span className="text-xs text-stone-400 tracking-wide">By sales</span>
        </div>
        <div className="divide-y divide-stone-50">
          {[...products]
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5)
            .map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-4
                hover:bg-stone-50 transition-colors">
                <span className="text-xs font-semibold text-stone-300 w-4">
                  {i + 1}
                </span>
                <div className={`w-10 h-10 rounded-lg ${CAT_BG[p.category] || "bg-stone-100"}
                  flex items-center justify-center text-xl flex-shrink-0`}>
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800 truncate">{p.name}</p>
                  <p className="text-xs text-stone-400 capitalize">{p.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-stone-900">{p.sales} sold</p>
                  <p className="text-xs text-stone-400">${p.price}</p>
                </div>
                {/* Mini bar */}
                <div className="w-20 h-1.5 bg-stone-100 rounded-full overflow-hidden flex-shrink-0">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${(p.sales / 100) * 100}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Low stock alert */}
      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-red-500" />
            <span className="text-xs font-semibold tracking-[0.12em] uppercase text-red-600">
              Low Stock Alert
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map((p) => (
              <span key={p.id}
                className="text-xs px-3 py-1.5 bg-white border border-red-200
                  text-red-600 rounded-full font-medium">
                {p.emoji} {p.name} — {p.stock} left
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Add / Edit Product Form ────────────────────────────────────────────────

function ProductForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Product>;
  onSave: (p: Omit<Product, "id" | "sales">) => void;
  onCancel?: () => void;
}) {
  const [name,     setName]     = useState(initial?.name     ?? "");
  const [category, setCategory] = useState(initial?.category ?? "tops");
  const [price,    setPrice]    = useState(initial?.price?.toString()    ?? "");
  const [oldPrice, setOldPrice] = useState(initial?.oldPrice?.toString() ?? "");
  const [badge,    setBadge]    = useState<Badge>(initial?.badge ?? "");
  const [emoji,    setEmoji]    = useState(initial?.emoji  ?? "");
  const [colors,   setColors]   = useState(initial?.colors?.join(", ") ?? "");
  const [stock,    setStock]    = useState(initial?.stock?.toString()   ?? "");

  const isEdit = !!initial?.id;

  const handleSubmit = () => {
    if (!name || !price || !stock) return;
    onSave({
      name,
      category,
      price:    parseFloat(price),
      oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
      badge,
      emoji:    emoji || "📦",
      colors:   colors.split(",").map((c) => c.trim()).filter(Boolean),
      stock:    parseInt(stock),
    });
  };

  const inputCls = `w-full px-4 py-3 text-sm text-stone-800 bg-[#faf8f4]
    border border-stone-200 rounded-sm outline-none
    focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20
    transition-all duration-200 placeholder:text-stone-300`;

  const labelCls = `block text-[0.7rem] tracking-[0.12em] uppercase
    text-stone-400 font-semibold mb-1.5`;

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      {/* Form header */}
      <div className="px-8 py-5 border-b border-stone-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-light text-stone-900"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {isEdit ? "Edit Product" : "Add New Product"}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5 tracking-wide">
            {isEdit ? "Update the product details below" : "Fill in the details to list a new product"}
          </p>
        </div>
        {onCancel && (
          <button onClick={onCancel}
            className="text-stone-400 hover:text-stone-800 transition-colors cursor-pointer">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="p-8 space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Product Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Linen Oversized Blazer"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputCls}
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="outerwear">Outerwear</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelCls}>Price ($) *</label>
            <input
              type="number" min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Original Price ($)</label>
            <input
              type="number" min="0"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              placeholder="Optional (for sale)"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Stock *</label>
            <input
              type="number" min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Units available"
              className={inputCls}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelCls}>Badge</label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value as Badge)}
              className={inputCls}
            >
              <option value="">None</option>
              <option value="new">New</option>
              <option value="popular">Popular</option>
              <option value="sale">Sale</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Emoji Icon</label>
            <input
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="e.g. 👗"
              maxLength={4}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Colors (comma separated)</label>
            <input
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              placeholder="e.g. Black, White, Sage"
              className={inputCls}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-100" />

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-xs tracking-[0.1em] uppercase font-semibold
                text-stone-500 border border-stone-200 rounded-sm
                hover:border-stone-800 hover:text-stone-900
                transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 text-xs tracking-[0.1em] uppercase font-semibold
              text-white bg-stone-900 border border-stone-900 rounded-sm
              hover:bg-amber-600 hover:border-amber-600
              transition-all duration-300 cursor-pointer"
          >
            {isEdit ? "Save Changes" : "Add to Store"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Manage Tab ─────────────────────────────────────────────────────────────

function ManageTab({
  products,
  onEdit,
  onDelete,
}: {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat    = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 text-sm text-stone-800 bg-white
              border border-stone-200 rounded-sm outline-none
              focus:border-amber-500 transition-all placeholder:text-stone-300"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-stone-400" />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="py-2.5 px-3 text-sm text-stone-600 bg-white border border-stone-200
              rounded-sm outline-none focus:border-amber-500 transition-all cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="outerwear">Outerwear</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <span className="hidden sm:flex items-center text-xs text-stone-400 tracking-wide">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Product table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center
          gap-4 px-6 py-3 border-b border-stone-100 bg-stone-50">
          {["", "Product", "Category", "Price", "Stock", "Actions"].map((h) => (
            <span key={h} className="text-[0.65rem] tracking-[0.14em] uppercase
              text-stone-400 font-semibold">
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-stone-400 text-sm">
            No products found.
          </div>
        ) : (
          <div className="divide-y divide-stone-50">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center
                  gap-4 px-6 py-4 hover:bg-stone-50 transition-colors group"
              >
                {/* Emoji */}
                <div className={`w-10 h-10 rounded-lg ${CAT_BG[p.category] || "bg-stone-100"}
                  flex items-center justify-center text-xl flex-shrink-0`}>
                  {p.emoji}
                </div>

                {/* Name + badge */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-stone-800 truncate">{p.name}</p>
                    {p.badge && (
                      <span className={`text-[0.6rem] px-2 py-0.5 rounded-full border
                        font-semibold tracking-[0.08em] uppercase ${BADGE_STYLES[p.badge]}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {p.colors.join(" · ")}
                  </p>
                </div>

                {/* Category */}
                <span className="text-xs text-stone-500 capitalize hidden sm:block">
                  {p.category}
                </span>

                {/* Price */}
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-stone-900">${p.price}</p>
                  {p.oldPrice && (
                    <p className="text-xs text-stone-300 line-through">${p.oldPrice}</p>
                  )}
                </div>

                {/* Stock */}
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                  ${p.stock < 10
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-700"
                  }`}>
                  {p.stock} left
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(p)}
                    className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50
                      rounded-md transition-all cursor-pointer"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50
                      rounded-md transition-all cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────

function Sidebar({
  active,
  setActive,
  user,
  onLogout,
}: {
  active: Tab;
  setActive: (t: Tab) => void;
  user: { name: string; email: string; image?: string };
  onLogout: () => void;
}) {
  const items: { tab: Tab; icon: React.ElementType; label: string }[] = [
    { tab: "overview", icon: LayoutDashboard, label: "Overview"       },
    { tab: "add",      icon: PackagePlus,     label: "Add Product"    },
    { tab: "manage",   icon: Boxes,           label: "Manage Products"},
  ];

  return (
    <aside className="flex flex-col w-64 flex-shrink-0 min-h-screen bg-stone-900 border-r border-stone-800">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-stone-800">
        <Link href="/"
          className="text-xl font-semibold tracking-[0.18em] text-white no-underline"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Quick<span className="text-amber-500">Cart</span>
        </Link>
        <p className="text-[0.65rem] tracking-[0.14em] uppercase text-stone-500 mt-1">
          Seller Dashboard
        </p>
      </div>

      {/* User info */}
      <div className="px-6 py-5 border-b border-stone-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center
          justify-center text-white text-xs font-bold flex-shrink-0">
          {user.name?.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{user.name}</p>
          <p className="text-xs text-stone-500 truncate">{user.email}</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {items.map(({ tab, icon: Icon, label }) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm
              font-medium tracking-wide transition-all duration-200 cursor-pointer
              ${active === tab
                ? "bg-amber-600 text-white shadow-[0_4px_16px_rgba(180,140,60,0.3)]"
                : "text-stone-400 hover:bg-stone-800 hover:text-white"
              }`}
          >
            <Icon size={16} />
            {label}
            {active === tab && (
              <ChevronRight size={12} className="ml-auto opacity-70" />
            )}
          </button>
        ))}
      </nav>

      {/* Back to store + logout */}
      <div className="px-3 py-5 border-t border-stone-800 space-y-1">
        <Link href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            text-stone-400 hover:bg-stone-800 hover:text-white
            transition-all duration-200 no-underline">
          <ShoppingBag size={16} />
          Back to Store
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            text-stone-400 hover:bg-red-900/30 hover:text-red-400
            transition-all duration-200 cursor-pointer"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ── Dashboard Page (main export) ───────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab,   setActiveTab]   = useState<Tab>("overview");
  const [products,    setProducts]    = useState<Product[]>(SEED_PRODUCTS);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [nextId,      setNextId]      = useState(SEED_PRODUCTS.length + 1);

  // Mock user — replace with your AuthContext
  const user = { name: "Sofia Rahman", email: "sofia@quickcart.com" };

  const handleAddProduct = (data: Omit<Product, "id" | "sales">) => {
    setProducts((prev) => [...prev, { ...data, id: nextId, sales: 0 }]);
    setNextId((n) => n + 1);
    setActiveTab("manage");
  };

  const handleEditSave = (data: Omit<Product, "id" | "sales">) => {
    if (!editProduct) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editProduct.id ? { ...data, id: p.id, sales: p.sales } : p
      )
    );
    setEditProduct(null);
    setActiveTab("manage");
  };

  const handleDelete = (id: number) => {
    if (confirm("Remove this product from your store?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (p: Product) => {
    setEditProduct(p);
    setActiveTab("add");
  };

  const tabTitles: Record<Tab, { title: string; sub: string }> = {
    overview: { title: "Store Overview",    sub: "Your performance at a glance"           },
    add:      { title: editProduct ? "Edit Product" : "Add New Product",
                sub: editProduct ? "Update your product details" : "List a new item in your store" },
    manage:   { title: "Manage Products",   sub: `${products.length} items in your store` },
  };

  return (
    <div className="flex min-h-screen bg-[#faf8f4]"
      style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* Sidebar */}
      <Sidebar
        active={activeTab}
        setActive={(t) => {
          if (t !== "add") setEditProduct(null);
          setActiveTab(t);
        }}
        user={user}
        onLogout={() => console.log("logout")}
      />

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#faf8f4]/90 backdrop-blur-md
          border-b border-stone-200 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-stone-900"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {tabTitles[activeTab].title}
            </h1>
            <p className="text-xs text-stone-400 tracking-wide mt-0.5">
              {tabTitles[activeTab].sub}
            </p>
          </div>

          {/* Quick action */}
          {activeTab !== "add" && (
            <button
              onClick={() => { setEditProduct(null); setActiveTab("add"); }}
              className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.1em]
                uppercase font-semibold text-white bg-stone-900 rounded-sm border border-stone-900
                hover:bg-amber-600 hover:border-amber-600
                transition-all duration-300 cursor-pointer"
            >
              <PackagePlus size={14} />
              Add Product
            </button>
          )}
        </header>

        {/* Tab content */}
        <div className="p-8">
          {activeTab === "overview" && (
            <OverviewTab products={products} />
          )}

          {activeTab === "add" && (
            <ProductForm
              initial={editProduct ?? undefined}
              onSave={editProduct ? handleEditSave : handleAddProduct}
              onCancel={editProduct ? () => { setEditProduct(null); setActiveTab("manage"); } : undefined}
            />
          )}

          {activeTab === "manage" && (
            <ManageTab
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
}