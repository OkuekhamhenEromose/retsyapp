'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown, X, Heart, Star, Shield, Leaf,
  Plus, MoreHorizontal, Gift, ChevronRight, Info, Tag, Check,
} from 'lucide-react';
import { useCart, CartItem, CartGroup, CartSummary } from '@/context/CartContext';

// ─── Types (related products only — cart types come from context) ─────────────
interface RelatedProduct {
  id:                 number;
  title:              string;
  slug:               string;
  price:              number;
  discount_price:     number | null;
  final_price:        number;
  discount_percentage:number;
  image:              string;
  rating:             number;
  review_count:       number;
  has_free_delivery?: boolean;
}

// ─── Countdown timer ──────────────────────────────────────────────────────────
function useCountdown(initial: { hours: number; minutes: number; seconds: number }) {
  const [time, setTime] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        const total = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (total <= 0) { clearInterval(id); return { hours: 0, minutes: 0, seconds: 0 }; }
        return {
          hours:   Math.floor(total / 3600),
          minutes: Math.floor((total % 3600) / 60),
          seconds: total % 60,
        };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
const pad = (n: number) => String(n).padStart(2, '0');

// ─── Sale Toast ───────────────────────────────────────────────────────────────
const SaleToast: React.FC<{
  item:       CartItem;
  onClose:    () => void;
  onCheckout: () => void;
}> = ({ item, onClose, onCheckout }) => {
  const timer = useCountdown(item.sale_ends_in ?? { hours: 20, minutes: 11, seconds: 15 });
  return (
    <div className="fixed top-[88px] right-4 z-[400] w-[380px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden border border-gray-100 animate-[slideInRight_0.35s_ease]">
      <style>{`@keyframes slideInRight{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
      <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 z-10"><X size={16} /></button>
      <div className="flex gap-3 p-4">
        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
          {item.product_image
            ? <Image src={item.product_image} alt={item.product_name} fill className="object-cover" unoptimized />
            : <div className="w-full h-full bg-gray-200" />}
          <div className="absolute bottom-1 left-1 w-6 h-6 bg-[#F1641E] rounded-full flex items-center justify-center">
            <Tag size={10} className="text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 mb-1">Save on an item in your basket!</p>
          <span className="inline-block bg-green-100 text-green-700 text-[11px] font-bold px-2 py-0.5 rounded-full mb-1">
            {item.discount_percentage}% off
          </span>
          <p className="text-[12px] text-red-600 font-medium">
            Sale ends in {pad(timer.hours)}:{pad(timer.minutes)}:{pad(timer.seconds)}
          </p>
          <button
            onClick={onCheckout}
            className="mt-2 w-full bg-gray-900 text-white text-[13px] font-semibold py-2 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center gap-1"
          >
            Proceed to checkout <ChevronRight size={14} />
          </button>
          <p className="text-[11px] text-gray-400 mt-1 text-center">Postage and tax will be calculated at checkout.</p>
        </div>
      </div>
    </div>
  );
};

// ─── Quantity Dropdown ────────────────────────────────────────────────────────
const QuantitySelector: React.FC<{ value: number; onChange: (q: number) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-gray-800 hover:border-gray-500 bg-white min-w-[64px]"
      >
        {value}
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-[calc(100%+4px)] bg-white border border-gray-200 rounded-xl shadow-xl z-[101] min-w-[80px] overflow-hidden">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => { onChange(n); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50 ${n === value ? 'font-semibold text-[#F1641E]' : 'text-gray-700'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Cart Item Card ───────────────────────────────────────────────────────────
const CartItemCard: React.FC<{
  item:             CartItem;
  onQuantityChange: (clientId: string, qty: number) => void;
  onRemove:         (clientId: string) => void;
}> = ({ item, onQuantityChange, onRemove }) => {
  const [showMenu, setShowMenu] = useState(false);
  const timer = item.sale_ends_in ? useCountdown(item.sale_ends_in) : null;

  return (
    <div className="py-5">
      <div className="flex gap-4">
        {/* Image */}
        <Link href={`/product/${item.product_slug}`} className="shrink-0">
          <div className="w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] rounded-lg overflow-hidden bg-gray-100 relative">
            {item.product_image
              ? <Image src={item.product_image} alt={item.product_name} fill className="object-cover hover:scale-[1.03] transition-transform duration-300" unoptimized />
              : <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />}
          </div>
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/product/${item.product_slug}`} className="text-[14px] text-gray-800 hover:underline underline-offset-2 leading-snug line-clamp-2">
              {item.product_name}
            </Link>
            {/* ⋯ menu */}
            <div className="relative shrink-0">
              <button onClick={() => setShowMenu(v => !v)} className="p-1 hover:bg-gray-100 rounded-full" aria-label="More options">
                <MoreHorizontal size={18} className="text-gray-500" />
              </button>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-[100]" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 top-[calc(100%+4px)] bg-white border border-gray-100 rounded-xl shadow-xl z-[101] min-w-[160px] overflow-hidden">
                    <button onClick={() => { onRemove(item.client_id); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Heart size={14} /> Save for later
                    </button>
                    <button onClick={() => { onRemove(item.client_id); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <X size={14} /> Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Variant pills */}
          {(item.variant_color || item.variant_design) && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {item.variant_color && (
                <span className="text-[11px] text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                  {item.variant_design ? item.variant_design.toUpperCase() : 'COLOUR'}: {item.variant_color}
                </span>
              )}
            </div>
          )}

          {/* Personalization pills */}
          {item.personalizations?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {item.personalizations.map((p, i) => (
                <span key={i} className="text-[11px] text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                  {p.field_name}: <span className="font-medium">{p.value}</span>
                </span>
              ))}
            </div>
          )}

          {/* Sale countdown */}
          {timer && (item.sale_ends_in!.hours + item.sale_ends_in!.minutes) > 0 && (
            <p className="text-[12px] text-[#F1641E] font-medium mt-1.5">
              Sale ends in {pad(timer.hours)}:{pad(timer.minutes)}:{pad(timer.seconds)}
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-[16px] font-bold text-[#F1641E]">USD {item.price_per_unit.toFixed(2)}</span>
            {item.original_price && item.original_price > item.price_per_unit && (
              <>
                <span className="text-[13px] text-gray-400 line-through">USD {item.original_price.toFixed(2)}</span>
                <span className="text-[11px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  {item.discount_percentage}% off
                </span>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <QuantitySelector value={item.quantity} onChange={q => onQuantityChange(item.client_id, q)} />
            <button className="text-[13px] text-gray-600 hover:text-gray-900 hover:underline underline-offset-2">Edit</button>
            <button onClick={() => onRemove(item.client_id)} className="text-[13px] text-gray-600 hover:text-gray-900 hover:underline underline-offset-2">Save for later</button>
            <button onClick={() => onRemove(item.client_id)} className="text-[13px] text-gray-600 hover:text-gray-900 hover:underline underline-offset-2">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Seller Group Card ────────────────────────────────────────────────────────
const SellerGroupCard: React.FC<{
  group:            CartGroup;
  onQuantityChange: (clientId: string, qty: number) => void;
  onRemove:         (clientId: string) => void;
  onCheckout:       () => void;
}> = ({ group, onQuantityChange, onRemove, onCheckout }) => {
  const [isGift, setIsGift]       = useState(false);
  const [giftMsg, setGiftMsg]     = useState('');
  const [showMsg, setShowMsg]     = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4 shadow-sm">
      {/* Seller header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <span className="text-[13px] font-bold text-gray-600">{group.seller_name.charAt(0).toUpperCase()}</span>
          </div>
          <Link href={`/shop/${group.seller_name.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-[13px] font-semibold text-gray-900 hover:underline underline-offset-2">
            {group.seller_name}
          </Link>
          {group.seller_rating > 0 && (
            <div className="flex items-center gap-1">
              <Star size={12} fill="#F1641E" stroke="#F1641E" />
              <span className="text-[12px] text-gray-600">
                {group.seller_rating.toFixed(1)}
                {group.seller_review_count > 0 && (
                  <span className="text-gray-400 ml-0.5">({group.seller_review_count.toLocaleString()})</span>
                )}
              </span>
            </div>
          )}
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full" aria-label="Seller options">
          <MoreHorizontal size={18} className="text-gray-400" />
        </button>
      </div>

      {/* Items */}
      <div className="px-5 divide-y divide-gray-100">
        {group.items.map(item => (
          <CartItemCard key={item.client_id} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
        ))}
      </div>

      {/* Postage */}
      <div className="px-5 pb-3 pt-1">
        <p className="text-[13px] text-gray-600">
          <span className="font-medium">Postage:</span>{' '}
          {group.shipping_cost === 0
            ? <span className="text-green-600 font-medium">FREE</span>
            : `USD ${group.shipping_cost.toFixed(2)}`}
          {group.estimated_delivery.display && (
            <span className="text-gray-400 ml-1">({group.estimated_delivery.display})</span>
          )}
        </p>
      </div>

      {/* Gift toggle */}
      <div className="px-5 pb-4">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div
            onClick={() => { setIsGift(v => !v); if (!isGift) setShowMsg(true); }}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isGift ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-500'}`}
          >
            {isGift && <Check size={11} strokeWidth={3} className="text-white" />}
          </div>
          <div className="flex items-center gap-1.5">
            <Gift size={14} className="text-gray-500" />
            <span className="text-[13px] text-gray-700">
              Mark order as a gift{' '}
              <button className="text-[#F1641E] hover:underline text-[12px]">Learn more</button>
            </span>
          </div>
        </label>
        {isGift && showMsg && (
          <div className="mt-2 ml-7">
            <textarea
              value={giftMsg} onChange={e => setGiftMsg(e.target.value)}
              placeholder="Add a gift message (optional)" rows={2}
              className="w-full text-[13px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 resize-none placeholder-gray-400"
            />
          </div>
        )}
      </div>

      {/* Shop checkout */}
      <div className="px-5 pb-4">
        <button onClick={onCheckout}
          className="w-full py-2.5 border-2 border-gray-900 rounded-full text-[13px] font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200">
          Check out for this shop only
        </button>
      </div>
    </div>
  );
};

// ─── Related Product Card ─────────────────────────────────────────────────────
const RelatedProductCard: React.FC<{
  product: RelatedProduct;
  onAdd:   (slug: string) => void;
  adding:  boolean;
}> = ({ product, onAdd, adding }) => (
  <div className="group flex flex-col">
    <Link href={`/product/${product.slug}`} className="block relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
      {product.image
        ? <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-300" sizes="20vw" unoptimized />
        : <div className="w-full h-full bg-gray-200" />}
      <button
        aria-label="Add to favourites"
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-white hover:scale-110"
        onClick={e => e.preventDefault()}
      >
        <Heart size={14} className="text-gray-600" />
      </button>
    </Link>
    <p className="text-[12px] text-gray-500 mb-0.5">Ad by Etsy seller</p>
    <p className="text-[13px] text-gray-800 line-clamp-2 leading-snug mb-1">{product.title}</p>
    <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
      <span className="text-[14px] font-bold text-[#F1641E]">USD {product.final_price.toFixed(2)}</span>
      {product.discount_price && product.discount_price < product.price && (
        <>
          <span className="text-[12px] text-gray-400 line-through">USD {product.price.toFixed(2)}</span>
          <span className="text-[11px] text-gray-500">({product.discount_percentage}% off)</span>
        </>
      )}
    </div>
    {product.has_free_delivery && <span className="text-[11px] text-green-600 font-semibold mb-2">FREE delivery</span>}
    <button
      onClick={() => onAdd(product.slug)}
      disabled={adding}
      className={`mt-auto flex items-center justify-center gap-1.5 py-2 border-[1.5px] rounded-full text-[12px] font-semibold transition-all duration-200 ${
        adding ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-gray-800 text-gray-800 hover:bg-gray-900 hover:text-white'
      }`}
    >
      <Plus size={12} /> {adding ? 'Adding…' : 'Add to basket'}
    </button>
  </div>
);

// ─── Order Summary ────────────────────────────────────────────────────────────
const OrderSummaryPanel: React.FC<{
  cart:       CartSummary;
  onCheckout: () => void;
}> = ({ cart, onCheckout }) => (
  <div className="sticky top-[88px]">
    {/* Payment icons */}
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-3 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
          <svg width="60" height="16" viewBox="0 0 60 16">
            <text x="0"  y="13" fontFamily="Arial" fontSize="13" fontWeight="bold" fill="#003087">Pay</text>
            <text x="22" y="13" fontFamily="Arial" fontSize="13" fontWeight="bold" fill="#009cde">Pal</text>
          </svg>
        </div>
        <div className="flex-1 h-10 border border-gray-200 rounded-lg flex items-center justify-center gap-1">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <span className="text-[13px] font-medium text-gray-700">Pay</span>
        </div>
      </div>
      <div className="relative flex items-center my-2">
        <div className="flex-1 border-t border-gray-200" />
        <span className="mx-3 text-[11px] text-gray-400 font-medium uppercase tracking-wide">or</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>
    </div>

    {/* Summary */}
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] text-gray-700">Item(s) total</span>
        <span className="text-[14px] font-medium text-gray-900">USD {cart.subtotal.toFixed(2)}</span>
      </div>

      <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3 mb-4">
        <Shield size={16} className="text-gray-600 shrink-0 mt-0.5" />
        <p className="text-[12px] text-gray-600 leading-relaxed">
          You&apos;re covered with{' '}
          <Link href="/etsy-purchase-protection" className="text-[#F1641E] hover:underline font-medium">
            Etsy Purchase Protection
          </Link>
        </p>
      </div>

      {cart.total_discount > 0 && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-gray-700">Shop discount</span>
          <span className="text-[14px] font-medium text-green-600">-USD {cart.total_discount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] text-gray-700">Subtotal</span>
        <span className="text-[14px] font-semibold text-gray-900">
          USD {(cart.subtotal - cart.total_discount).toFixed(2)}
        </span>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-[14px] text-gray-700">Delivery</span>
          <p className="text-[11px] text-gray-400">(To Nigeria)</p>
        </div>
        <span className="text-[14px] font-medium text-gray-900">
          {cart.total_shipping === 0 ? 'FREE' : `USD ${cart.total_shipping.toFixed(2)}`}
        </span>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold text-gray-900">
            Total ({cart.total_items} item{cart.total_items !== 1 ? 's' : ''})
          </span>
          <span className="text-[18px] font-bold text-gray-900">USD {cart.grand_total.toFixed(2)}</span>
        </div>
        {cart.total_discount > 0 && (
          <p className="text-[12px] text-green-600 mt-1">You save USD {cart.total_discount.toFixed(2)}</p>
        )}
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-[#F1641E] hover:bg-[#d95518] text-white font-bold py-3.5 rounded-full text-[15px] transition-colors shadow-sm hover:shadow-md mb-3"
      >
        Proceed to checkout
      </button>

      <p className="text-[11px] text-gray-400 text-center mb-4">Postage and tax will be calculated at checkout.</p>

      <div className="text-[11px] text-gray-500 space-y-1 border-t border-gray-100 pt-3">
        <p>Local taxes included (where applicable)</p>
        <p>* Learn more about additional taxes, duties, and fees that <button className="text-[#F1641E] hover:underline">may apply</button></p>
      </div>
    </div>
  </div>
);

// ─── Main BasketPage ──────────────────────────────────────────────────────────
export default function BasketPage() {
  const { cart, removeItem, updateQuantity, addToCart, refreshCart } = useCart();

  const [relatedProducts, setRelatedProducts]   = useState<RelatedProduct[]>([]);
  const [moreRelated,     setMoreRelated]        = useState<RelatedProduct[]>([]);
  const [addingSlug,      setAddingSlug]         = useState<string | null>(null);
  const [pageLoading,     setPageLoading]        = useState(true);
  const [showToast,       setShowToast]          = useState(false);
  const [toastItem,       setToastItem]          = useState<CartItem | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

  // Initial load
  useEffect(() => {
    refreshCart().finally(() => setPageLoading(false));
  }, [refreshCart]);

  // Show sale toast when a discounted item exists
  useEffect(() => {
    if (!cart.total_items) return;
    for (const g of cart.groups) {
      for (const item of g.items) {
        if (item.discount_percentage > 0 && !showToast) {
          setToastItem(item);
          const t = setTimeout(() => setShowToast(true), 900);
          return () => clearTimeout(t);
        }
      }
    }
  }, [cart.total_items]);

  // Fetch related products
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/products/?featured=true&in_stock=true&page_size=8`, { credentials: 'include' });
        if (!res.ok) throw new Error();
        const data = await res.json();
        const all = (data.results ?? data) as any[];
        const toCard = (p: any): RelatedProduct => ({
          id: p.id, title: p.title, slug: p.slug,
          price:              parseFloat(p.price),
          discount_price:     p.discount_price ? parseFloat(p.discount_price) : null,
          final_price:        parseFloat(p.final_price ?? p.price),
          discount_percentage: p.discount_percentage ?? 0,
          image:              p.main ?? p.image ?? '',
          rating:             parseFloat(p.rating),
          review_count:       p.review_count,
          has_free_delivery:  p.has_free_delivery,
        });
        setRelatedProducts(all.slice(0, 4).map(toCard));
        setMoreRelated(all.slice(4, 9).map(toCard));
      } catch {
        // Fallback mock related products
        const mock: RelatedProduct[] = [
          { id: 10, title: 'Custom Embroidered P...', slug: 'custom-p-1', price: 58.78, discount_price: 29.39, final_price: 29.39, discount_percentage: 50, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop', rating: 4.8, review_count: 234, has_free_delivery: true },
          { id: 11, title: 'Embroidered Shih Tzu ...', slug: 'shih-tzu-1', price: 26.99, discount_price: null, final_price: 26.99, discount_percentage: 0, image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&h=400&fit=crop', rating: 4.9, review_count: 412, has_free_delivery: true },
          { id: 12, title: 'Tri-Color Corgi Vintage ...', slug: 'corgi-1', price: 25.95, discount_price: null, final_price: 25.95, discount_percentage: 0, image: 'https://images.unsplash.com/photo-1543746986-2a585b4df0a6?w=400&h=400&fit=crop', rating: 4.7, review_count: 89, has_free_delivery: true },
          { id: 13, title: 'Custom Embroidered D...', slug: 'custom-d-1', price: 59.00, discount_price: 29.50, final_price: 29.50, discount_percentage: 50, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop', rating: 5.0, review_count: 156, has_free_delivery: true },
        ];
        setRelatedProducts(mock);
        setMoreRelated([
          { id: 20, title: 'Custom Embroidered Pet Ph...', slug: 'pet-ph-1', price: 19.99, discount_price: 7.00, final_price: 7.00, discount_percentage: 65, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', rating: 4.8, review_count: 892 },
          { id: 21, title: 'Custom Embroidered Pet Ha...', slug: 'pet-ha-1', price: 30.14, discount_price: 12.05, final_price: 12.05, discount_percentage: 60, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop', rating: 4.9, review_count: 2341 },
          { id: 22, title: 'Custom Embroidered Pet Po...', slug: 'pet-po-1', price: 14.52, discount_price: 5.81, final_price: 5.81, discount_percentage: 60, image: 'https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=400&h=400&fit=crop', rating: 4.7, review_count: 445 },
          { id: 23, title: 'Custom Dog Portrait Hat',    slug: 'dog-hat-1', price: 30.14, discount_price: 12.05, final_price: 12.05, discount_percentage: 60, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop', rating: 5.0, review_count: 560 },
          { id: 24, title: 'Custom EMBROIDERED Dog Cap', slug: 'dog-cap-1', price: 21.50, discount_price: 9.03, final_price: 9.03, discount_percentage: 58, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop', rating: 4.8, review_count: 1899 },
        ]);
      }
    })();
  }, [API]);

  // Add a related product to cart
  const handleAddRelated = async (slug: string) => {
    if (addingSlug) return;
    setAddingSlug(slug);
    try {
      const res = await fetch(`${API}/product/${slug}/`, { credentials: 'include' });
      if (res.ok) {
        const p = await res.json();
        await addToCart({
          product_id:    p.id,
          product_name:  p.title,
          product_slug:  p.slug,
          product_image: p.main ?? '',
          price_per_unit: parseFloat(p.final_price ?? p.price),
          original_price: p.discount_price ? parseFloat(p.price) : null,
          discount_percentage: p.discount_percentage ?? 0,
          seller_name:   p.seller_name ?? 'Shop',
          quantity:      1,
        });
      } else {
        // Fallback: just add with what we know from the card
        const card = [...relatedProducts, ...moreRelated].find(rp => rp.slug === slug);
        if (card) {
          await addToCart({
            product_id:    card.id,
            product_name:  card.title,
            product_slug:  card.slug,
            product_image: card.image,
            price_per_unit: card.final_price,
            original_price: card.discount_price ? card.price : null,
            discount_percentage: card.discount_percentage,
            quantity: 1,
          });
        }
      }
    } catch {
      const card = [...relatedProducts, ...moreRelated].find(rp => rp.slug === slug);
      if (card) {
        await addToCart({
          product_id: card.id, product_name: card.title,
          product_slug: card.slug, product_image: card.image,
          price_per_unit: card.final_price,
          original_price: card.discount_price ? card.price : null,
          discount_percentage: card.discount_percentage, quantity: 1,
        });
      }
    } finally {
      setAddingSlug(null);
    }
  };

  const handleCheckout = () => { window.location.href = '/checkout'; };

  // ── Loading skeleton ─────────────────────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="h-9 w-44 bg-gray-200 rounded-full animate-pulse mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-[140px] h-[140px] rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 h-72 animate-pulse" />
        </div>
      </div>
    );
  }

  const isEmpty = cart.total_items === 0;

  return (
    <>
      {/* Sale Toast */}
      {showToast && toastItem && (
        <SaleToast
          item={toastItem}
          onClose={() => setShowToast(false)}
          onCheckout={() => { setShowToast(false); handleCheckout(); }}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 pb-20">
        <h1 className="text-[30px] sm:text-[34px] font-light text-gray-900 mb-8"
          style={{ fontFamily: "Georgia,'Times New Roman',serif" }}>
          Your basket
        </h1>

        {isEmpty ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2 className="text-[22px] font-medium text-gray-800 mb-2">Your basket is empty</h2>
            <p className="text-gray-500 mb-6">Start exploring to find unique items you&apos;ll love.</p>
            <Link href="/" className="inline-block px-8 py-3 bg-[#F1641E] text-white rounded-full font-semibold hover:bg-[#d95518] transition-colors">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 xl:gap-8">
            {/* ── Left column ────────────────────────────────────────────── */}
            <div>
              <p className="text-[13px] text-gray-500 mb-4">
                {cart.total_items} item{cart.total_items !== 1 ? 's' : ''} in your basket
              </p>

              {/* Seller groups */}
              {cart.groups.map(group => (
                <SellerGroupCard
                  key={group.seller_id}
                  group={group}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                  onCheckout={handleCheckout}
                />
              ))}

              {/* Add items under $30 */}
              {relatedProducts.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4 shadow-sm">
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
                    Add items under $30 with free delivery{' '}
                    <span className="text-gray-400 font-normal text-[13px]">
                      Including ads <button aria-label="About ads"><Info size={13} className="inline text-gray-400" /></button>
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {relatedProducts.map(p => (
                      <RelatedProductCard key={p.id} product={p} onAdd={handleAddRelated} adding={addingSlug === p.slug} />
                    ))}
                  </div>
                </div>
              )}

              {/* Climate */}
              <div className="flex items-center gap-2 py-4 px-1">
                <Leaf size={18} className="text-green-600 shrink-0" />
                <p className="text-[13px] text-gray-600">
                  Etsy invests in climate solutions like electric trucks and carbon offsets for every delivery.{' '}
                  <button className="text-[#F1641E] hover:underline">See how</button>
                </p>
              </div>

              {/* Related items you may like */}
              {moreRelated.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-[18px] font-medium text-gray-900 mb-1">
                    Related items you may like{' '}
                    <span className="text-gray-400 font-normal text-[13px]">
                      Including ads <button aria-label="About ads"><Info size={13} className="inline text-gray-400" /></button>
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                    {moreRelated.map(p => (
                      <RelatedProductCard key={p.id} product={p} onAdd={handleAddRelated} adding={addingSlug === p.slug} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right column: order summary ─────────────────────────── */}
            <OrderSummaryPanel cart={cart} onCheckout={handleCheckout} />
          </div>
        )}

        {/* Legal footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-center text-[11px] text-gray-400 space-y-2">
          <p>Merchant is Etsy, Inc. (USA), Etsy Ireland UC (Ireland), Etsy UK Limited (United Kingdom), Etsy Canada Limited (Canada), or Etsy Australia Pty Limited (Australia) depending on the currency and location of the payment instrument issuance.</p>
          <p>Etsy, Inc., USA 117 Adams Street Brooklyn, NY 11201&nbsp;&nbsp;Etsy Ireland UC One Le Pole Square Ship Street Great Dublin 8</p>
        </div>
      </div>
    </>
  );
}