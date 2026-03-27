// app/order/summary/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Truck, CreditCard, Package, Shield, Check,
  Clock, ArrowLeft, Loader2, AlertCircle, ChevronRight,
  Phone, Mail, Home, Calendar, DollarSign, Tag,
  Edit, ChevronDown, ChevronUp
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface OrderItem {
  id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  selected_size?: string;
  subtotal: number;
  product?: {
    main?: string;
    slug?: string;
  };
}

interface OrderSummary {
  id: number;
  order_number: string;
  full_name: string;
  country: string;
  street_address: string;
  apartment?: string;
  city: string;
  state?: string;
  postal_code?: string;
  phone_country_code: string;
  phone_number: string;
  email: string;
  amount: number;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  discount_amount: number;
  order_status: string;
  order_status_display: string;
  payment_method: string;
  payment_method_display: string;
  payment_complete: boolean;
  is_gift: boolean;
  gift_message?: string;
  order_notes?: string;
  items: OrderItem[];
  created: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimated_days: string;
  carrier?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'door_delivery',
    name: 'Door Delivery',
    description: 'Delivered to your doorstep',
    price: 1500,
    estimated_days: '25 March',
    carrier: 'JUMIA EXPRESS'
  },
  {
    id: 'pickup_station',
    name: 'Pickup Station',
    description: 'Pick up from nearest station',
    price: 860,
    estimated_days: '26-27 March',
    carrier: 'JUMIA PICKUP'
  }
];

// ─── Helper Functions ─────────────────────────────────────────────────────────
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
  return `${currency} ${amount.toFixed(2)}`;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getPaymentMethodIcon(method: string): React.ReactNode {
  if (method.toLowerCase().includes('paystack')) {
    return (
      <svg width="24" height="24" viewBox="0 0 48 48" className="mr-2">
        <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
    );
  }
  return <CreditCard size={20} className="text-gray-500" />;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function OrderSummaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [applyingDiscount, setApplyingDiscount] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

  // Get auth header
  const getAuthHeader = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('access_token');
    const expiry = localStorage.getItem('token_expiry');
    if (token && expiry && Date.now() < parseInt(expiry)) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };

  // Fetch order summary
  useEffect(() => {
    if (!orderId) {
      setError('No order ID provided');
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        console.log('[OrderSummary] Fetching order:', orderId);
        const res = await fetch(`${API}/order/${orderId}/summary/`, {
          headers: getAuthHeader(),
          credentials: 'include',
        });

        console.log('[OrderSummary] Response status:', res.status);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error('[OrderSummary] Error:', errorText);
          throw new Error(`Failed to fetch order details: ${res.status}`);
        }

        const data = await res.json();
        console.log('[OrderSummary] Order data:', data);
        setOrder(data);
      } catch (err) {
        console.error('[OrderSummary] Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, API]);

  // Handle discount application
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setApplyingDiscount(true);
    try {
      const res = await fetch(`${API}/cart/apply-discount/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        credentials: 'include',
        body: JSON.stringify({ code: discountCode }),
      });

      const data = await res.json();
      if (res.ok) {
        setAppliedDiscount({
          code: discountCode,
          amount: data.discount_amount || 0
        });
        setShowDiscountInput(false);
        setDiscountCode('');
      } else {
        alert(data.error || 'Invalid discount code');
      }
    } catch (err) {
      alert('Failed to apply discount');
    } finally {
      setApplyingDiscount(false);
    }
  };

  // Handle payment confirmation
  const handleConfirmPayment = async () => {
    if (!order) return;
    
    setProcessingPayment(true);
    
    try {
      const res = await fetch(`${API}/checkout/initiate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        credentials: 'include',
        body: JSON.stringify({
          address: {
            full_name: order.full_name,
            country: order.country,
            street_address: order.street_address,
            apartment: order.apartment,
            city: order.city,
            state: order.state,
            postal_code: order.postal_code,
            phone_country_code: order.phone_country_code,
            phone_number: order.phone_number,
            email: order.email,
            save_as_default: false,
          },
          payment_method: 'paystack',
          coupon_code: appliedDiscount?.code,
        }),
      });

      const data = await res.json();

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else if (data.order_id) {
        window.location.href = `/order/summary?order_id=${data.order_id}`;
      } else {
        throw new Error('No payment URL or order ID received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment initialization failed');
    } finally {
      setProcessingPayment(false);
    }
  };

  // Handle modify cart
  const handleModifyCart = () => {
    router.push('/basket');
  };

  // Handle go back
  const handleGoBack = () => {
    router.push('/basket');
  };

  // Calculate totals with delivery option
  const calculateTotal = () => {
    if (!order) return { subtotal: 0, shipping: 0, discount: 0, total: 0 };
    const subtotal = order.subtotal;
    const shipping = selectedDelivery.price;
    const discount = appliedDiscount?.amount || order.discount_amount || 0;
    const total = subtotal + shipping - discount;
    return { subtotal, shipping, discount, total };
  };

  const totals = calculateTotal();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-[#F1641E] mx-auto mb-4" />
          <p className="text-gray-600">Loading order summary...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error || 'Order not found'}</p>
            <Link
              href="/basket"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F1641E] text-white rounded-full hover:bg-[#d95518] transition-colors"
            >
              <ArrowLeft size={18} />
              Return to Basket
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/basket"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2"
            >
              <ArrowLeft size={18} />
              Go back & continue shopping
            </Link>
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900">
              Order Summary
            </h1>
            <p className="text-gray-500 mt-1">
              Order #{order.order_number} • {formatDate(order.created)}
            </p>
          </div>
          <button
            onClick={handleModifyCart}
            className="text-sm text-[#F1641E] hover:underline font-medium"
          >
            Modify cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* 1. CUSTOMER ADDRESS */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                <div className="w-8 h-8 rounded-full bg-[#F1641E]/10 flex items-center justify-center">
                  <span className="text-[#F1641E] font-bold text-sm">1</span>
                </div>
                <h2 className="font-semibold text-gray-900 text-lg">Customer Address</h2>
              </div>
              <div className="space-y-2 text-gray-700">
                <p className="font-medium text-base">{order.full_name}</p>
                <p className="text-gray-600">
                  {order.street_address}
                  {order.apartment && `, ${order.apartment}`}
                </p>
                <p>
                  {order.city}
                  {order.state && ` - ${order.state}`}
                  {order.postal_code && ` (${order.postal_code})`}
                </p>
                <p>{order.country}</p>
                <div className="flex items-center gap-3 pt-2">
                  <Phone size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {order.phone_country_code}{order.phone_number}
                  </span>
                  <Mail size={14} className="text-gray-400 ml-2" />
                  <span className="text-sm text-gray-600">{order.email}</span>
                </div>
              </div>
              <button className="mt-3 text-sm text-[#F1641E] hover:underline flex items-center gap-1">
                <Edit size={14} /> Change address
              </button>
            </div>

            {/* 2. DELIVERY DETAILS */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                <div className="w-8 h-8 rounded-full bg-[#F1641E]/10 flex items-center justify-center">
                  <span className="text-[#F1641E] font-bold text-sm">2</span>
                </div>
                <h2 className="font-semibold text-gray-900 text-lg">Delivery Details</h2>
              </div>

              {/* Current Delivery Option */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-[#F1641E]" />
                    <span className="font-medium text-gray-900">{selectedDelivery.name}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{selectedDelivery.description}</p>
                  <p className="text-sm font-medium text-gray-700 mt-2">
                    Delivery scheduled on <span className="text-[#F1641E]">{selectedDelivery.estimated_days}</span>
                  </p>
                  {selectedDelivery.carrier && (
                    <p className="text-xs text-gray-400 mt-1">Fulfilled by {selectedDelivery.carrier}</p>
                  )}
                </div>
                <button
                  onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
                  className="text-sm text-[#F1641E] hover:underline flex items-center gap-1"
                >
                  Change {showDeliveryOptions ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {/* Delivery Options Dropdown */}
              {showDeliveryOptions && (
                <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Choose delivery method</p>
                  {DELIVERY_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-start justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedDelivery.id === option.id
                          ? 'border-[#F1641E] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedDelivery.id === option.id
                              ? 'border-[#F1641E] bg-[#F1641E]'
                              : 'border-gray-300'
                          }`}>
                            {selectedDelivery.id === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="font-medium text-gray-900">{option.name}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-6">{option.description}</p>
                        <p className="text-xs text-gray-400 ml-6">Delivery: {option.estimated_days}</p>
                        {option.carrier && (
                          <p className="text-xs text-gray-400 ml-6">{option.carrier}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          ₦ {option.price.toLocaleString()}
                        </span>
                        {selectedDelivery.id === option.id && (
                          <Check size={14} className="text-[#F1641E] mt-1" />
                        )}
                      </div>
                    </label>
                  ))}
                  <p className="text-xs text-green-600 mt-2">
                    SAVE UP TO ₦ {(DELIVERY_OPTIONS[0].price - DELIVERY_OPTIONS[1].price).toLocaleString()}
                  </p>
                </div>
              )}

              {/* Shipment Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-900 mb-2">Shipment 1/1</p>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Truck size={12} />
                    <span>Fulfilled by {selectedDelivery.carrier || 'JUMIA'}</span>
                    <span className="mx-1">•</span>
                    <span>Door Delivery</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Delivery scheduled on {selectedDelivery.estimated_days}</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 py-2">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                        {item.product?.main ? (
                          <Image
                            src={item.product.main}
                            alt={item.product_name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.product_name}</p>
                        <p className="text-xs text-gray-500">x{item.quantity}</p>
                        <p className="text-xs font-semibold text-gray-700 mt-1">₦ {item.product_price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. PAYMENT METHOD */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                <div className="w-8 h-8 rounded-full bg-[#F1641E]/10 flex items-center justify-center">
                  <span className="text-[#F1641E] font-bold text-sm">3</span>
                </div>
                <h2 className="font-semibold text-gray-900 text-lg">Payment Method</h2>
                <button className="ml-auto text-sm text-[#F1641E] hover:underline">
                  Change &gt;
                </button>
              </div>

              {/* Pay with Bank Cards - Paystack */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                {getPaymentMethodIcon('paystack')}
                <div>
                  <p className="font-medium text-gray-900">Pay with Bank Cards - Paystack</p>
                  <p className="text-xs text-gray-500">You can Pay with cards via Paystack</p>
                </div>
                <Check size={16} className="ml-auto text-[#F1641E]" />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">Order summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Item's total ({order.items.length})</span>
                    <span className="text-gray-900">₦ {order.subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery fees</span>
                    <span className="text-gray-900">₦ {totals.shipping.toLocaleString()}</span>
                  </div>
                  
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₦ {totals.discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-[#F1641E]">
                        ₦ {totals.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Discount Code */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {!showDiscountInput ? (
                    <button
                      onClick={() => setShowDiscountInput(true)}
                      className="text-sm text-[#F1641E] hover:underline flex items-center gap-1"
                    >
                      <Tag size={14} /> Enter code
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter code here"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#F1641E]"
                      />
                      <button
                        onClick={handleApplyDiscount}
                        disabled={applyingDiscount}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
                      >
                        {applyingDiscount ? '...' : 'APPLY'}
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 mt-4 text-center">
                  Local taxes included (where applicable)
                </p>
                <p className="text-xs text-gray-400 text-center">
                  * Learn more about additional taxes, duties, and fees that may apply
                </p>
              </div>

              {/* Confirm Order Button */}
              <button
                onClick={handleConfirmPayment}
                disabled={processingPayment}
                className={`w-full py-4 rounded-full text-white font-bold text-lg transition-all ${
                  processingPayment
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#F1641E] hover:bg-[#d95518] hover:shadow-lg active:scale-[0.98]'
                }`}
              >
                {processingPayment ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Confirm Payment'
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By proceeding, you are automatically accepting the{' '}
                <a href="/terms" className="text-[#F1641E] hover:underline">Terms & Conditions</a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-center text-[11px] text-gray-400 space-y-2">
          <p>Merchant is Etsy, Inc. (USA), Etsy Ireland UC (Ireland), Etsy UK Limited (United Kingdom), Etsy Canada Limited (Canada), or Etsy Australia Pty Limited (Australia) depending on the currency and location of the payment instrument issuance.</p>
          <p>Etsy, Inc., USA 117 Adams Street Brooklyn, NY 11201&nbsp;&nbsp;Etsy Ireland UC One Le Pole Square Ship Street Great Dublin 8</p>
        </div>
      </div>
    </div>
  );
}