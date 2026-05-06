"use client";

import { PackagePlus, Menu } from "lucide-react";
import { Tab } from "../../types/index";

// ── Types ──────────────────────────────────────────────────────────────────

interface DashboardHeaderProps {
  activeTab: Tab;
  isEditing: boolean;
  productCount: number;
  onAddClick: () => void;
  // Mobile sidebar toggle
  onMobileMenuOpen: () => void;
}

// ── Tab meta ───────────────────────────────────────────────────────────────

function getTabMeta(
  tab: Tab,
  isEditing: boolean,
  productCount: number
): { title: string; sub: string } {
  switch (tab) {
    case "overview":
      return {
        title: "Store Overview",
        sub: "Your performance at a glance",
      };
    case "add":
      return {
        title: isEditing ? "Edit Product" : "Add New Product",
        sub: isEditing
          ? "Update your product details"
          : "List a new item in your store",
      };
    case "manage":
      return {
        title: "Manage Products",
        sub: `${productCount} item${productCount !== 1 ? "s" : ""} in your store`,
      };
  }
}

// ── DashboardHeader ────────────────────────────────────────────────────────

export default function DashboardHeader({
  activeTab,
  isEditing,
  productCount,
  onAddClick,
  onMobileMenuOpen,
}: DashboardHeaderProps) {
  const { title, sub } = getTabMeta(activeTab, isEditing, productCount);

  return (
    <header
      className="sticky top-0 z-30 bg-[#faf8f4]/90 backdrop-blur-md
        border-b border-stone-200 px-4 sm:px-8 py-4 sm:py-5
        flex items-center justify-between gap-4"
    >
      {/* Left — hamburger (mobile) + title */}
      <div className="flex items-center gap-3 min-w-0">

        {/* Hamburger — only on small screens */}
        <button
          onClick={onMobileMenuOpen}
          aria-label="Open sidebar menu"
          className="lg:hidden flex-shrink-0 p-2 -ml-1 rounded-md
            text-stone-500 hover:text-stone-900 hover:bg-stone-100
            transition-all duration-200 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        {/* Title block */}
        <div className="min-w-0">
          <h1
            className="text-xl sm:text-2xl font-light text-stone-900 truncate"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {title}
          </h1>
          <p className="text-xs text-stone-400 tracking-wide mt-0.5 hidden sm:block">
            {sub}
          </p>
        </div>
      </div>

      {/* Right — quick-add button (hidden on Add tab) */}
      {activeTab !== "add" && (
        <button
          onClick={onAddClick}
          className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5
            text-xs tracking-[0.1em] uppercase font-semibold
            text-white bg-stone-900 rounded-sm border border-stone-900
            hover:bg-amber-600 hover:border-amber-600
            transition-all duration-300 cursor-pointer"
        >
          <PackagePlus size={14} />
          <span className="hidden sm:inline">Add Product</span>
        </button>
      )}
    </header>
  );
}