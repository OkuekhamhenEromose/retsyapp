'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown, Check, Loader2, AlertCircle } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AddressForm {
  country:            string;
  full_name:          string;
  street_address:     string;
  apartment:          string;
  city:               string;
  postal_code:        string;
  state:              string;
  phone_country_code: string;
  phone_number:       string;
  email:              string;
  save_as_default:    boolean;
}

export interface LocalCartItem {
  client_id:           string;
  product_id:          number;
  product_name:        string;
  product_slug:        string;
  product_image:       string;
  quantity:            number;
  price_per_unit:      number;
  original_price:      number | null;
  discount_percentage: number;
  variant_id?:         number | null;
  variant_color?:      string;
  variant_design?:     string;
  seller_id?:          number;
  seller_name?:        string;
  personalizations?:   { field_name: string; value: string }[];
}

interface CheckoutModalProps {
  isOpen:             boolean;
  onClose:            () => void;
  orderTotal:         number;
  orderItems?:        number;
  cartId?:            number | null;
  cartItems?:         LocalCartItem[];
  onBeforeCheckout?:  () => Promise<void>;
}

type Step = 'delivery' | 'payment' | 'review';

// ─── Data ─────────────────────────────────────────────────────────────────────
const NIGERIA_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa',
  'Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger',
  'Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe',
  'Zamfara','FCT Abuja',
];

const COUNTRIES = [
  { name: 'Nigeria',              code: 'NG', phoneCode: '+234' },
  { name: 'United States',        code: 'US', phoneCode: '+1'   },
  { name: 'United Kingdom',       code: 'GB', phoneCode: '+44'  },
  { name: 'Canada',               code: 'CA', phoneCode: '+1'   },
  { name: 'Australia',            code: 'AU', phoneCode: '+61'  },
  { name: 'Ghana',                code: 'GH', phoneCode: '+233' },
  { name: 'Kenya',                code: 'KE', phoneCode: '+254' },
  { name: 'South Africa',         code: 'ZA', phoneCode: '+27'  },
  { name: 'India',                code: 'IN', phoneCode: '+91'  },
  { name: 'Germany',              code: 'DE', phoneCode: '+49'  },
  { name: 'France',               code: 'FR', phoneCode: '+33'  },
  { name: 'Italy',                code: 'IT', phoneCode: '+39'  },
  { name: 'Spain',                code: 'ES', phoneCode: '+34'  },
  { name: 'Netherlands',          code: 'NL', phoneCode: '+31'  },
  { name: 'United Arab Emirates', code: 'AE', phoneCode: '+971' },
];

// ⚠️ Use country code as key to avoid duplicate +1 issue for US / Canada
const PHONE_CODES = [
  { key: 'NG', label: 'Nigeria (+234)',               value: '+234' },
  { key: 'US', label: 'United States (+1)',           value: '+1'  },
  { key: 'GB', label: 'United Kingdom (+44)',         value: '+44' },
  { key: 'CA', label: 'Canada (+1)',                  value: '+1'  },
  { key: 'AU', label: 'Australia (+61)',              value: '+61' },
  { key: 'GH', label: 'Ghana (+233)',                 value: '+233'},
  { key: 'KE', label: 'Kenya (+254)',                 value: '+254'},
  { key: 'ZA', label: 'South Africa (+27)',           value: '+27' },
  { key: 'IN', label: 'India (+91)',                  value: '+91' },
  { key: 'DE', label: 'Germany (+49)',                value: '+49' },
  { key: 'FR', label: 'France (+33)',                 value: '+33' },
  { key: 'IT', label: 'Italy (+39)',                  value: '+39' },
  { key: 'ES', label: 'Spain (+34)',                  value: '+34' },
  { key: 'NL', label: 'Netherlands (+31)',            value: '+31' },
  { key: 'AE', label: 'United Arab Emirates (+971)',  value: '+971'},
];

// ─── Step Indicator ────────────────────────────────────────────────────────────
const StepIndicator: React.FC<{ current: Step }> = ({ current }) => {
  const steps: { id: Step; label: string }[] = [
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment',  label: 'Payment'  },
    { id: 'review',   label: 'Review'   },
  ];
  const idx = steps.findIndex(s => s.id === current);

  return (
    <div className="flex items-center justify-center border-b border-gray-100 px-6 py-3">
      {steps.map((step, i) => {
        const active = step.id === current;
        const done   = i < idx;
        return (
          <React.Fragment key={step.id}>
            <div className={`flex flex-col items-center gap-0.5 min-w-[72px] transition-opacity ${
              active ? 'opacity-100' : done ? 'opacity-60' : 'opacity-35'
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                done   ? 'bg-gray-900 text-white' :
                active ? 'bg-[#F1641E] text-white ring-4 ring-orange-100' :
                         'bg-gray-100 text-gray-400'
              }`}>
                {done ? <Check size={13} strokeWidth={2.5} /> : <span>{i + 1}</span>}
              </div>
              <span className={`text-[11px] font-medium tracking-wide ${active ? 'text-[#F1641E]' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-[1.5px] mx-2 mb-4 rounded-full transition-all ${
                i < idx ? 'bg-gray-900' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── SelectField ──────────────────────────────────────────────────────────────
const SelectField: React.FC<{
  label: string; required?: boolean; optional?: boolean;
  value: string; onChange: (v: string) => void;
  options: { label: string; value: string; key: string }[];
  error?: string; className?: string;
}> = ({ label, required, optional, value, onChange, options, error, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-[13px] font-semibold text-gray-800 flex items-center gap-1">
      {label}
      {required && <span className="text-red-500 text-[11px]">*</span>}
      {optional && <span className="text-[12px] font-normal text-gray-400">(optional)</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full appearance-none bg-white border rounded-lg px-4 py-3 text-[14px] text-gray-800 pr-10 focus:outline-none transition-all cursor-pointer ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-100'
        }`}
      >
        {options.map(o => (
          <option key={o.key} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
    {error && <p className="text-[12px] text-red-500">{error}</p>}
  </div>
);

// ─── InputField ───────────────────────────────────────────────────────────────
const InputField: React.FC<{
  label: string; required?: boolean; optional?: boolean;
  value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; error?: string;
  className?: string; autoComplete?: string;
}> = ({ label, required, optional, value, onChange, placeholder, type = 'text', error, className = '', autoComplete }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-[13px] font-semibold text-gray-800 flex items-center gap-1">
      {label}
      {required && <span className="text-red-500 text-[11px]">*</span>}
      {optional && <span className="text-[12px] font-normal text-gray-400">(optional)</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`w-full border rounded-lg px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none transition-all ${
        error
          ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
          : 'border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-100'
      }`}
    />
    {error && <p className="text-[12px] text-red-500">{error}</p>}
  </div>
);

// ─── Main Modal ────────────────────────────────────────────────────────────────
const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen, onClose, orderTotal, orderItems = 1,
  cartId, cartItems = [], onBeforeCheckout,
}) => {
  const API       = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api').replace(/\/$/, '');
  const scrollRef = useRef<HTMLDivElement>(null);

  const [step,    setStep]    = useState<Step>('delivery');
  const [loading, setLoading] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [errors,  setErrors]  = useState<Partial<Record<keyof AddressForm | 'global', string>>>({});

  const [form, setForm] = useState<AddressForm>({
    country:            'Nigeria',
    full_name:          '',
    street_address:     '',
    apartment:          '',
    city:               '',
    postal_code:        '',
    state:              '',
    phone_country_code: '+234',
    phone_number:       '',
    email:              '',
    save_as_default:    false,
  });

  const handleCountryChange = (country: string) => {
    const found = COUNTRIES.find(c => c.name === country);
    setForm(f => ({ ...f, country, phone_country_code: found?.phoneCode ?? f.phone_country_code, state: '' }));
  };

  const set = (key: keyof AddressForm) => (value: string | boolean) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  useEffect(() => {
    if (isOpen) { setStep('delivery'); setErrors({}); setLoading(false); setSyncMsg(null); }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const getAuthHeader = useCallback((): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    const token  = localStorage.getItem('access_token');
    const expiry = localStorage.getItem('token_expiry');
    if (token && expiry && Date.now() < parseInt(expiry)) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }, []);

  // ── Try to sync local items to server and return a real cart_id ───────────────
  const syncCartToServer = useCallback(async (): Promise<number | null> => {
    if (!cartItems.length) return null;
    setSyncMsg('Syncing your basket…');
    let resolvedCartId: number | null = null;

    for (const item of cartItems) {
      try {
        const res = await fetch(`${API}/cart/add-enhanced/${item.product_slug}/`, {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
          body: JSON.stringify({
            quantity:         item.quantity,
            variant_id:       item.variant_id ?? undefined,
            personalizations: item.personalizations ?? [],
          }),
        });
        if (res.ok) {
          const d = await res.json();
          const cid = d.cart?.id ?? d.id ?? null;
          if (cid && cid > 0) resolvedCartId = cid;
        }
      } catch { /* continue with next item */ }
    }
    setSyncMsg(null);
    return resolvedCartId;
  }, [API, cartItems, getAuthHeader]);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.full_name.trim())      e.full_name      = 'Full name is required';
    if (!form.street_address.trim()) e.street_address = 'Street address is required';
    if (!form.city.trim())           e.city           = 'City is required';
    if (!form.phone_number.trim())   e.phone_number   = 'Phone number is required';
    if (!form.email.trim())          e.email          = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    if (Object.keys(e).length) {
      setErrors(e);
      setTimeout(() => scrollRef.current?.querySelector<HTMLElement>('.error-field')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      return false;
    }
    return true;
  };

  const handleContinue = async () => {
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      // 1. Let parent refresh/create server cart if needed
      if (onBeforeCheckout) {
        setSyncMsg('Preparing your basket…');
        await onBeforeCheckout();
      }

      // 2. Resolve a positive cart_id
      let resolvedCartId: number | null = (cartId && cartId > 0) ? cartId : null;
      if (!resolvedCartId && cartItems.length > 0) {
        resolvedCartId = await syncCartToServer();
      }

      // 3. Build local_items payload as backend fallback
      //    (used when server cart is empty because products aren't in DB yet)
      const localItems = cartItems.map(item => ({
        product_slug:        item.product_slug,
        product_name:        item.product_name,
        quantity:            item.quantity,
        price_per_unit:      item.price_per_unit,
        original_price:      item.original_price ?? null,
        discount_percentage: item.discount_percentage,
        variant_id:          item.variant_id ?? null,
        variant_color:       item.variant_color ?? '',
        seller_id:           item.seller_id ?? 0,
        seller_name:         item.seller_name ?? '',
        personalizations:    item.personalizations ?? [],
      }));

      const payload = {
        address: {
          full_name:          form.full_name,
          country:            form.country,
          street_address:     form.street_address,
          apartment:          form.apartment || undefined,
          city:               form.city,
          state:              form.state  || undefined,
          postal_code:        form.postal_code || undefined,
          phone_country_code: form.phone_country_code,
          phone_number:       form.phone_number,
          email:              form.email,
          save_as_default:    form.save_as_default,
        },
        payment_method: 'paystack',
        cart_id:        resolvedCartId,
        local_items:    localItems.length > 0 ? localItems : undefined,
      };

      console.log('[CheckoutModal] Sending payload:', JSON.stringify(payload, null, 2));
      setSyncMsg(null);

      const res = await fetch(`${API}/checkout/initiate/`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('[CheckoutModal] Response status:', res.status);
      console.log('[CheckoutModal] Response data:', data);

      if (!res.ok) {
        const msg =
          data?.address?.full_name?.[0] || data?.address?.phone_number?.[0] ||
          data?.address?.email?.[0]     || data?.error || data?.detail ||
          'Something went wrong. Please try again.';
        console.error('[CheckoutModal] Error details:', msg);
        setErrors({ global: msg });
        return;
      }

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else if (data.order_id) {
        window.location.href = `/order/summary?order_id=${data.order_id}`;
      }
    } catch (err) {
      console.error('[CheckoutModal] Network error:', err);
      setErrors({ global: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
      setSyncMsg(null);
    }
  };

  if (!isOpen) return null;

  const countryOptions = COUNTRIES.map(c => ({ label: c.name, value: c.name, key: c.code }));
  const stateOptions   = [
    { label: 'Select state', value: '', key: '__empty__' },
    ...(form.country === 'Nigeria' ? NIGERIA_STATES.map(s => ({ label: s, value: s, key: s })) : []),
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-[2px]"
        style={{ animation: 'fadeIn 0.2s ease' }}
        onClick={onClose} aria-hidden
      />

      <div
        role="dialog" aria-modal="true" aria-labelledby="modal-title"
        className="fixed inset-0 z-[501] flex items-center justify-center p-4"
        style={{ animation: 'slideUp 0.28s cubic-bezier(.22,.68,0,1.2)' }}
      >
        <div className="relative bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.22)] w-full max-w-[640px] max-h-[92vh] flex flex-col overflow-hidden">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X size={16} className="text-gray-600" />
          </button>

          <StepIndicator current={step} />

          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="px-6 pt-5 pb-8 space-y-5">
              <h2 id="modal-title" className="text-[22px] font-semibold text-gray-900 tracking-tight">
                Enter an address
              </h2>

              {syncMsg && (
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                  <Loader2 size={14} className="animate-spin text-blue-600 shrink-0" />
                  <p className="text-[13px] text-blue-700">{syncMsg}</p>
                </div>
              )}

              {errors.global && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[13px] text-red-700">{errors.global}</p>
                </div>
              )}

              <SelectField
                label="Country" required
                value={form.country} onChange={handleCountryChange}
                options={countryOptions}
              />

              <div className={errors.full_name ? 'error-field' : ''}>
                <InputField label="Full name" required value={form.full_name}
                  onChange={set('full_name')} autoComplete="name" error={errors.full_name} />
              </div>

              <div className={errors.email ? 'error-field' : ''}>
                <InputField label="Email address" required type="email" value={form.email}
                  onChange={set('email')} placeholder="you@example.com" autoComplete="email"
                  error={errors.email} />
              </div>

              <div className={errors.street_address ? 'error-field' : ''}>
                <InputField label="Street address" required value={form.street_address}
                  onChange={set('street_address')} autoComplete="street-address"
                  error={errors.street_address} />
              </div>

              <InputField label="Flat/Other" optional value={form.apartment}
                onChange={set('apartment')} autoComplete="address-line2" />

              <div className={errors.city ? 'error-field' : ''}>
                <InputField label="City" required value={form.city}
                  onChange={set('city')} autoComplete="address-level2" error={errors.city} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="Post code" optional value={form.postal_code}
                  onChange={set('postal_code')} autoComplete="postal-code" />
                <SelectField label="State" optional value={form.state}
                  onChange={set('state')} options={stateOptions} />
              </div>

              {/* Phone code — uses unique `key` prop to avoid React duplicate-key warning */}
              <SelectField
                label="Country code"
                value={form.phone_country_code}
                onChange={set('phone_country_code')}
                options={PHONE_CODES.map(p => ({ label: p.label, value: p.value, key: p.key }))}
              />

              <div className={errors.phone_number ? 'error-field' : ''}>
                <InputField label="Phone number" required type="tel" value={form.phone_number}
                  onChange={set('phone_number')} placeholder="5555 555 5555"
                  autoComplete="tel-national" error={errors.phone_number} />
              </div>

              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div
                  role="checkbox" aria-checked={form.save_as_default}
                  onClick={() => set('save_as_default')(!form.save_as_default)}
                  className={`w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                    form.save_as_default
                      ? 'bg-gray-900 border-gray-900'
                      : 'border-gray-300 group-hover:border-gray-500'
                  }`}
                >
                  {form.save_as_default && <Check size={11} strokeWidth={3} className="text-white" />}
                </div>
                <span className="text-[13px] text-gray-700">Set as default</span>
              </label>

              <p className="text-[12px] text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
                We use your phone number to facilitate the delivery of your order, including sharing
                with delivery companies. See{' '}
                <a href="/privacy-policy" className="text-[#F1641E] hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between gap-3">
            <button onClick={onClose}
              className="px-6 py-2.5 rounded-full border-2 border-gray-200 text-[14px] font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all">
              Back
            </button>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[11px] text-gray-400">
                {orderItems} item{orderItems !== 1 ? 's' : ''} · USD {orderTotal.toFixed(2)}
              </span>
              <button
                onClick={handleContinue}
                disabled={loading}
                className={`flex items-center gap-2 px-7 py-3 rounded-full text-[14px] font-bold text-white transition-all shadow-sm ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-[#F1641E] hover:shadow-orange-200 hover:shadow-lg active:scale-[0.98]'
                }`}
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : 'Continue to Payment'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0)    scale(1)    }
        }
      `}</style>
    </>
  );
};

export default CheckoutModal;