"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Tag,
  ChevronRight,
  X,
  Info,
  PackageOpen,
} from "lucide-react";

// ── shadcn/ui ──────────────────────────────────────────────────────────────
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ── Types ──────────────────────────────────────────────────────────────────

export interface CartItem {
  id: number;
  name: string;
  category: string;
  emoji: string; // swap with image: string when wired to backend
  price: number;
  originalPrice?: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  stock: number;
}

// ── Mock data — swap with your backend cart state / context ────────────────

const MOCK_CART: CartItem[] = [
  {
    id: 1,
    name: "Linen Oversized Blazer",
    category: "Outerwear",
    emoji: "🧥",
    price: 189,
    selectedColor: "Ivory",
    selectedSize: "M",
    quantity: 1,
    stock: 24,
  },
  {
    id: 2,
    name: "Silk Slip Dress",
    category: "Tops",
    emoji: "👗",
    price: 145,
    selectedColor: "Sage",
    selectedSize: "S",
    quantity: 2,
    stock: 12,
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    category: "Tops",
    emoji: "🧶",
    price: 220,
    originalPrice: 275,
    selectedColor: "Cream",
    selectedSize: "L",
    quantity: 1,
    stock: 8,
  },
];

const SUGGESTED = [
  {
    id: 5,
    name: "Tailored Mini Skirt",
    category: "Bottoms",
    emoji: "🩱",
    price: 79,
  },
  {
    id: 6,
    name: "Leather Crossbody Bag",
    category: "Accessories",
    emoji: "👜",
    price: 165,
  },
  {
    id: 8,
    name: "Gold Chain Necklace",
    category: "Accessories",
    emoji: "📿",
    price: 55,
  },
];

const FREE_SHIPPING_AT = 120;

// ── QuantityStepper ────────────────────────────────────────────────────────

function QuantityStepper({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center border border-stone-200 rounded-sm w-fit overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className="h-8 w-8 rounded-none hover:bg-stone-100 text-stone-500 disabled:opacity-30"
      >
        <Minus size={12} />
      </Button>

      <span
        className="w-9 h-8 flex items-center justify-center
        text-sm font-medium text-stone-800 border-x border-stone-200 select-none"
      >
        {value}
      </span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="h-8 w-8 rounded-none hover:bg-stone-100 text-stone-500 disabled:opacity-30"
      >
        <Plus size={12} />
      </Button>
    </div>
  );
}

// ── DeleteDialog ───────────────────────────────────────────────────────────

function DeleteDialog({
  item,
  open,
  onConfirm,
  onCancel,
}: {
  item: CartItem | null;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="max-w-sm border-stone-200 rounded-xl">
        <DialogHeader>
          <DialogTitle
            className="text-xl font-light text-stone-900"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Remove item?
          </DialogTitle>
          <DialogDescription className="text-sm text-stone-500 mt-1">
            <span className="font-medium text-stone-700">
              {item?.emoji} {item?.name}
            </span>{" "}
            will be removed from your bag.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 mt-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-stone-200 text-stone-600 hover:border-stone-800
                hover:text-stone-900 rounded-sm text-xs tracking-widest uppercase"
            >
              Keep it
            </Button>
          </DialogClose>
          <Button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white rounded-sm
              text-xs tracking-widest uppercase border-none"
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── CartTable — desktop ────────────────────────────────────────────────────

function CartTable({
  items,
  onRemoveRequest,
  onQuantityChange,
}: {
  items: CartItem[];
  onRemoveRequest: (item: CartItem) => void;
  onQuantityChange: (id: number, qty: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-stone-100 hover:bg-transparent">
          {["Product", "Qty", "Price", "Total", ""].map((h) => (
            <TableHead
              key={h}
              className="text-[0.62rem] tracking-[0.14em] uppercase
                text-stone-400 font-semibold first:pl-0 last:pr-0"
            >
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => {
          const saving = item.originalPrice
            ? item.originalPrice - item.price
            : null;

          return (
            <TableRow
              key={item.id}
              className="border-stone-100 hover:bg-stone-50/60 group align-top"
            >
              {/* ── Product ── */}
              <TableCell className="pl-0 py-5 w-[46%]">
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div
                    className="relative w-16 h-20 rounded-lg bg-stone-100
                    border border-stone-200 flex items-center justify-center
                    text-3xl shrink-0 overflow-hidden"
                  >
                    {item.emoji}
                    {item.originalPrice && (
                      <span
                        className="absolute top-0 right-0 text-[0.45rem]
                        font-bold bg-red-500 text-white px-1 py-0.5
                        rounded-bl-md leading-tight tracking-wide"
                      >
                        SALE
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 pt-1">
                    <p
                      className="text-[0.62rem] tracking-widest uppercase
                      text-stone-400 mb-0.5"
                    >
                      {item.category}
                    </p>
                    <p
                      className="text-sm font-medium text-stone-900 leading-snug mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.name}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge
                        variant="outline"
                        className="text-[0.6rem] px-2 h-5 border-stone-200
                          text-stone-500 font-normal rounded-full"
                      >
                        {item.selectedColor}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[0.6rem] px-2 h-5 border-stone-200
                          text-stone-500 font-normal rounded-full"
                      >
                        Size {item.selectedSize}
                      </Badge>
                      {item.stock < 10 && (
                        <Badge
                          variant="outline"
                          className="text-[0.6rem] px-2 h-5 border-red-200
                            text-red-500 bg-red-50 font-medium rounded-full"
                        >
                          {item.stock} left
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* ── Qty ── */}
              <TableCell className="py-5">
                <QuantityStepper
                  value={item.quantity}
                  max={item.stock}
                  onChange={(qty) => onQuantityChange(item.id, qty)}
                />
              </TableCell>

              {/* ── Unit price ── */}
              <TableCell className="py-5 text-right">
                <p className="text-sm font-medium text-stone-800">
                  ${item.price}
                </p>
                {item.originalPrice && (
                  <p className="text-xs text-stone-400 line-through">
                    ${item.originalPrice}
                  </p>
                )}
              </TableCell>

              {/* ── Row total ── */}
              <TableCell className="py-5 text-right">
                <p className="text-sm font-semibold text-stone-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                {saving && (
                  <p className="text-xs text-emerald-600 font-medium">
                    −${(saving * item.quantity).toFixed(2)} saved
                  </p>
                )}
              </TableCell>

              {/* ── Remove ── */}
              <TableCell className="py-5 pr-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveRequest(item)}
                        className="h-8 w-8 text-stone-300 hover:text-red-500
                          hover:bg-red-50 rounded-md transition-all"
                      >
                        <X size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="text-xs bg-stone-900 text-white border-none"
                    >
                      Remove item
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ── CartCard — mobile ──────────────────────────────────────────────────────

function CartCard({
  item,
  onRemoveRequest,
  onQuantityChange,
}: {
  item: CartItem;
  onRemoveRequest: (item: CartItem) => void;
  onQuantityChange: (id: number, qty: number) => void;
}) {
  const saving = item.originalPrice ? item.originalPrice - item.price : null;

  return (
    <Card className="border-stone-200 shadow-none rounded-xl">
      <CardContent className="p-4 flex gap-3">
        {/* Thumbnail */}
        <div
          className="relative w-20 h-24 rounded-lg bg-stone-100 border border-stone-200
          flex items-center justify-center text-3xl shrink-0 overflow-hidden"
        >
          {item.emoji}
          {item.originalPrice && (
            <span
              className="absolute top-0 right-0 text-[0.45rem] font-bold
              bg-red-500 text-white px-1 py-0.5 rounded-bl-md leading-tight"
            >
              SALE
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {/* Top row */}
          <div className="flex items-start justify-between gap-1">
            <div>
              <p className="text-[0.6rem] uppercase tracking-widest text-stone-400">
                {item.category}
              </p>
              <p
                className="text-sm font-medium text-stone-900 leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {item.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveRequest(item)}
              className="h-7 w-7 text-stone-300 hover:text-red-500 hover:bg-red-50 shrink-0"
            >
              <X size={13} />
            </Button>
          </div>

          {/* Variant badges */}
          <div className="flex gap-1.5 flex-wrap">
            <Badge
              variant="outline"
              className="text-[0.58rem] px-2 h-5 border-stone-200 text-stone-400 font-normal rounded-full"
            >
              {item.selectedColor}
            </Badge>
            <Badge
              variant="outline"
              className="text-[0.58rem] px-2 h-5 border-stone-200 text-stone-400 font-normal rounded-full"
            >
              Size {item.selectedSize}
            </Badge>
            {item.stock < 10 && (
              <Badge
                variant="outline"
                className="text-[0.58rem] px-2 h-5 border-red-200 text-red-500 bg-red-50 rounded-full"
              >
                {item.stock} left
              </Badge>
            )}
          </div>

          {/* Qty + price */}
          <div className="flex items-center justify-between">
            <QuantityStepper
              value={item.quantity}
              max={item.stock}
              onChange={(qty) => onQuantityChange(item.id, qty)}
            />
            <div className="text-right">
              <p className="text-sm font-semibold text-stone-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              {saving && (
                <p className="text-xs text-emerald-600 font-medium">
                  −${(saving * item.quantity).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── OrderSummary ───────────────────────────────────────────────────────────

function OrderSummary({
  items,
  coupon,
  setCoupon,
  discount,
  couponError,
  onApplyCoupon,
  onCheckout,
}: {
  items: CartItem[];
  coupon: string;
  setCoupon: (v: string) => void;
  discount: number;
  couponError: string;
  onApplyCoupon: () => void;
  onCheckout: () => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_AT ? 0 : 12;
  const total = subtotal - discount + shipping;
  const shippingPct = Math.min((subtotal / FREE_SHIPPING_AT) * 100, 100);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <Card className="border-stone-200 shadow-none sticky top-24 rounded-xl">
      <CardHeader className="pb-3 pt-5 px-6">
        <CardTitle
          className="text-xl font-light text-stone-900"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Order Summary
        </CardTitle>
        <CardDescription className="text-xs text-stone-400 tracking-wide">
          {itemCount} item{itemCount !== 1 ? "s" : ""} in your bag
        </CardDescription>
      </CardHeader>

      <Separator className="bg-stone-100" />

      <CardContent className="px-6 py-5 space-y-5">
        {/* Free shipping progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-xs text-stone-600 font-medium">
              {shippingPct >= 100
                ? "🎉 Free shipping unlocked!"
                : `$${(FREE_SHIPPING_AT - subtotal).toFixed(2)} away from free shipping`}
            </p>
            <span className="text-xs text-stone-400">
              {Math.round(shippingPct)}%
            </span>
          </div>
          <Progress
            value={shippingPct}
            className="h-1.5 bg-stone-100 [&>div]:bg-amber-500"
          />
        </div>

        <Separator className="bg-stone-100" />

        {/* Line items */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="font-medium text-stone-800">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-emerald-600 flex items-center gap-1.5">
                <Tag size={12} /> Coupon applied
              </span>
              <span className="font-medium text-emerald-600">
                −${discount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-500 flex items-center gap-1.5">
              Shipping
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={11} className="text-stone-300 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent className="text-xs bg-stone-900 text-white border-none max-w-45">
                    Free on orders over ${FREE_SHIPPING_AT}. Standard delivery
                    3–5 days.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            {shipping === 0 ? (
              <Badge
                variant="outline"
                className="border-emerald-200 text-emerald-600 bg-emerald-50 text-[0.65rem] font-semibold"
              >
                FREE
              </Badge>
            ) : (
              <span className="font-medium text-stone-800">
                ${shipping.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <Separator className="bg-stone-100" />

        {/* Total */}
        <div className="flex justify-between items-end">
          <span className="text-sm font-semibold text-stone-900 tracking-wide">
            Total
          </span>
          <div className="text-right">
            <p
              className="text-2xl font-light text-stone-900"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              ${total.toFixed(2)}
            </p>
            <p className="text-[0.65rem] text-stone-400 mt-0.5">
              Incl. taxes & duties
            </p>
          </div>
        </div>

        {/* Coupon */}
        <div className="space-y-2">
          <p className="text-[0.68rem] tracking-widest uppercase text-stone-400 font-semibold">
            Coupon Code
          </p>
          <div className="flex gap-2">
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              placeholder="e.g. SAVE15"
              className="h-9 text-sm border-stone-200 bg-[#faf8f4] rounded-sm
                focus-visible:ring-amber-500/20 focus-visible:border-amber-500
                placeholder:text-stone-300 tracking-widest uppercase"
            />
            <Button
              onClick={onApplyCoupon}
              variant="outline"
              size="sm"
              className="h-9 px-3 text-xs tracking-[0.08em] uppercase font-semibold
                border-stone-200 text-stone-600 hover:border-stone-900 hover:text-stone-900
                rounded-sm shrink-0"
            >
              Apply
            </Button>
          </div>
          {couponError && <p className="text-xs text-red-500">{couponError}</p>}
          {discount > 0 && (
            <p className="text-xs text-emerald-600 font-medium">
              ✓ 15% discount applied!
            </p>
          )}
        </div>
      </CardContent>

      <Separator className="bg-stone-100" />

      <CardFooter className="px-6 py-5 flex flex-col gap-3">
        {/* Checkout CTA */}
        <Button
          onClick={onCheckout}
          className="w-full h-11 bg-stone-900 hover:bg-amber-600 text-white
            text-xs tracking-[0.12em] uppercase font-semibold rounded-sm
            border border-stone-900 hover:border-amber-600 transition-all duration-300"
        >
          Proceed to Checkout
          <ChevronRight size={14} className="ml-1" />
        </Button>

        {/* Trust signals */}
        <div className="w-full space-y-1.5 pt-1">
          {[
            "Free 60-day returns",
            "Secure SSL checkout",
            "Sustainably packaged",
          ].map((t) => (
            <p
              key={t}
              className="text-[0.7rem] text-stone-400 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
              {t}
            </p>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

// ── SuggestedProducts ──────────────────────────────────────────────────────

function SuggestedProducts({
  onAdd,
}: {
  onAdd: (id: number, name: string) => void;
}) {
  return (
    <div className="mt-14">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-5 h-px bg-amber-600" />
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-amber-600 font-semibold">
          You Might Also Like
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SUGGESTED.map((p) => (
          <Card
            key={p.id}
            className="border-stone-200 shadow-none hover:shadow-md
              transition-all duration-300 group overflow-hidden rounded-xl"
          >
            <CardContent className="p-0">
              {/* Visual */}
              <div
                className="h-36 bg-stone-100 flex items-center justify-center
                text-5xl group-hover:scale-105 transition-transform duration-500"
              >
                {p.emoji}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-[0.62rem] uppercase tracking-widest text-stone-400 mb-1">
                  {p.category}
                </p>
                <p
                  className="text-sm font-medium text-stone-800 mb-3 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {p.name}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-stone-900">
                    ${p.price}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAdd(p.id, p.name)}
                    className="h-7 px-3 text-[0.68rem] tracking-[0.08em] uppercase
                      font-semibold border-stone-200 text-stone-600 rounded-sm
                      hover:bg-stone-900 hover:text-white hover:border-stone-900
                      transition-all duration-200"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── EmptyCart ──────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div
        className="w-20 h-20 rounded-full bg-stone-100 flex items-center
        justify-center mb-6"
      >
        <PackageOpen size={32} className="text-stone-300" />
      </div>
      <h2
        className="text-3xl font-light text-stone-900 mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Your bag is empty
      </h2>
      <p className="text-sm text-stone-400 mb-8 max-w-xs leading-relaxed">
        Looks like you have not added anything yet. Explore the collection to
        find something you will love.
      </p>
      <Button
        asChild
        className="px-8 py-3 bg-stone-900 hover:bg-amber-600 text-white
          text-xs tracking-widest uppercase font-semibold rounded-sm
          transition-all duration-300"
      >
        <Link href="#collections">Shop Collection</Link>
      </Button>
    </div>
  );
}

// ── CartPage (main export) ─────────────────────────────────────────────────

export default function CartPage() {
  // ── Replace with your backend cart state / context ──────────────────
  const [items, setItems] = useState<CartItem[]>(MOCK_CART);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<CartItem | null>(null);

  // ── Handlers — wire to your backend ─────────────────────────────────

  const handleRemoveRequest = (item: CartItem) => setDeleteTarget(item);

  const handleRemoveConfirm = () => {
    if (!deleteTarget) return;
    // TODO: call your removeFromCart(deleteTarget.id) API
    setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const handleQuantityChange = (id: number, qty: number) => {
    // TODO: call your updateCartItem(id, qty) API
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
    );
  };

  const handleApplyCoupon = () => {
    // TODO: validate via your backend
    setCouponError("");
    if (coupon === "SAVE15") {
      const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
      setDiscount(parseFloat((subtotal * 0.15).toFixed(2)));
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon code. Try SAVE15.");
    }
  };

  const handleCheckout = () => {
    // TODO: router.push("/checkout") or call checkout API
    console.log("checkout", { items, discount });
  };

  const handleAddSuggested = (id: number, name: string) => {
    // TODO: call your addToCart(id) API
    console.log("add suggested", id, name);
  };

  // ────────────────────────────────────────────────────────────────────

  const isEmpty = items.length === 0;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <TooltipProvider>
      <div
        className="min-h-screen bg-[#faf8f4]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* ── Top bar ── */}
        <header
          className="sticky top-0 z-20 border-b border-stone-200
          bg-white/80 backdrop-blur-md"
        >
          <div
            className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10
            h-16 flex items-center justify-between"
          >
            <Link
              href="/"
              className="text-xl font-semibold tracking-[0.18em] text-stone-900 no-underline"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Quick<span className="text-amber-600">Cart</span>
            </Link>

            {/* Cart count avatar */}
            <Avatar className="w-9 h-9 border border-stone-200">
              <AvatarFallback className="bg-stone-900 text-white text-xs font-semibold">
                {itemCount}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-10">
          {/* Back link */}
          <Button
            asChild
            variant="ghost"
            className="mb-6 -ml-2 text-xs tracking-widest uppercase text-stone-400
              hover:text-stone-900 hover:bg-transparent gap-1.5 px-2 h-8"
          >
            <Link href="/collections">
              <ArrowLeft size={13} />
              Continue Shopping
            </Link>
          </Button>

          {/* Page heading */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <span className="w-5 h-px bg-amber-600" />
              <span className="text-[0.7rem] tracking-[0.2em] uppercase text-amber-600 font-semibold">
                Your Bag
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-light text-stone-900"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Shopping Cart
            </h1>
          </div>

          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 xl:gap-12">
              {/* ── Left: items ── */}
              <div className="space-y-6">
                {/* Low stock alert */}
                {items.some((i) => i.stock < 10) && (
                  <Alert className="border-amber-200 bg-amber-50 rounded-xl">
                    <Info className="h-4 w-4 text-amber-600" />
                    <AlertTitle
                      className="text-xs font-semibold tracking-widest
                      uppercase text-amber-700"
                    >
                      Low Stock
                    </AlertTitle>
                    <AlertDescription className="text-xs text-amber-600 mt-0.5">
                      Some items in your bag are running low — order soon to
                      secure yours.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Desktop table */}
                <div className="hidden md:block">
                  <div className="flex items-center justify-between mb-1 pb-2">
                    <p className="text-xs tracking-widest uppercase text-stone-400 font-semibold">
                      {items.length} Product{items.length !== 1 ? "s" : ""}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setItems([])}
                      className="text-xs text-stone-400 hover:text-red-500
                        hover:bg-red-50 gap-1.5 h-7 px-2"
                    >
                      <Trash2 size={12} />
                      Clear bag
                    </Button>
                  </div>
                  <CartTable
                    items={items}
                    onRemoveRequest={handleRemoveRequest}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs tracking-widest uppercase text-stone-400 font-semibold">
                      {items.length} Product{items.length !== 1 ? "s" : ""}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setItems([])}
                      className="text-xs text-stone-400 hover:text-red-500 hover:bg-red-50 gap-1.5 h-7 px-2"
                    >
                      <Trash2 size={12} />
                      Clear
                    </Button>
                  </div>
                  <ScrollArea className="h-auto">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <CartCard
                          key={item.id}
                          item={item}
                          onRemoveRequest={handleRemoveRequest}
                          onQuantityChange={handleQuantityChange}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              {/* ── Right: summary ── */}
              <OrderSummary
                items={items}
                coupon={coupon}
                setCoupon={setCoupon}
                discount={discount}
                couponError={couponError}
                onApplyCoupon={handleApplyCoupon}
                onCheckout={handleCheckout}
              />
            </div>
          )}

          {/* Suggested */}
          {!isEmpty && <SuggestedProducts onAdd={handleAddSuggested} />}
        </main>

        {/* ── Delete confirm dialog ── */}
        <DeleteDialog
          item={deleteTarget}
          open={!!deleteTarget}
          onConfirm={handleRemoveConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </TooltipProvider>
  );
}
