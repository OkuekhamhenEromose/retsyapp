// CheckoutModal.tsx - Fixed version with proper error handling

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Check, MapPin, CreditCard, ClipboardList, Loader2 } from 'lucide-react';

// ─── Constants ────────────────────────────────────────────────────────────────

const NIGERIA_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa',
  'Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger',
  'Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe',
  'Zamfara','FCT Abuja',
];

const COUNTRIES = [
  { name: 'Nigeria', code: 'NG', phoneCode: '+234' },
  { name: 'United States', code: 'US', phoneCode: '+1' },
  { name: 'United Kingdom', code: 'GB', phoneCode: '+44' },
  { name: 'Canada', code: 'CA', phoneCode: '+1' },
  { name: 'Australia', code: 'AU', phoneCode: '+61' },
  { name: 'Ghana', code: 'GH', phoneCode: '+233' },
  { name: 'Kenya', code: 'KE', phoneCode: '+254' },
  { name: 'South Africa', code: 'ZA', phoneCode: '+27' },
  { name: 'India', code: 'IN', phoneCode: '+91' },
  { name: 'Germany', code: 'DE', phoneCode: '+49' },
  { name: 'France', code: 'FR', phoneCode: '+33' },
  { name: 'Italy', code: 'IT', phoneCode: '+39' },
  { name: 'Spain', code: 'ES', phoneCode: '+34' },
  { name: 'Netherlands', code: 'NL', phoneCode: '+31' },
  { name: 'United Arab Emirates', code: 'AE', phoneCode: '+971' },
];

const PHONE_CODES = COUNTRIES.map(c => ({ label: `${c.name} (${c.phoneCode})`, value: c.phoneCode }));

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddressForm {
  country: string;
  full_name: string;
  street_address: string;
  apartment: string;
  city: string;
  postal_code: string;
  state: string;
  phone_country_code: string;
  phone_number: string;
  email: string;
  save_as_default: boolean;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  orderItems?: number;
  cartId?: string | number | null;  
}

type Step = 'delivery' | 'payment' | 'review';

// ─── Sub-components ───────────────────────────────────────────────────────────

const StepIndicator: React.FC<{ current: Step }> = ({ current }) => {
  const steps: { id: Step; label: string; Icon: React.FC<any> }[] = [
    { id: 'delivery', label: 'Delivery', Icon: MapPin },
    { id: 'payment',  label: 'Payment',  Icon: CreditCard },
    { id: 'review',   label: 'Review',   Icon: ClipboardList },
  ];
  const idx = steps.findIndex(s => s.id === current);

  return (
    <div className="flex items-center justify-center border-b border-gray-100 px-6 py-3">
      {steps.map((step, i) => {
        const active  = step.id === current;
        const done    = i < idx;
        return (
          <React.Fragment key={step.id}>
            <div className={`flex flex-col items-center gap-0.5 min-w-[72px] ${active ? 'opacity-100' : done ? 'opacity-60' : 'opacity-35'}`}>
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
              <div className={`flex-1 h-[1.5px] mx-2 mb-4 rounded-full transition-all ${i < idx ? 'bg-gray-900' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  error?: string;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label, required, optional, value, onChange, options, error, className = ''
}) => (
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
          error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                : 'border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-100'
        }`}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
    {error && <p className="text-[12px] text-red-500">{error}</p>}
  </div>
);

interface InputFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  className?: string;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label, required, optional, value, onChange,
  placeholder, type = 'text', error, className = '', autoComplete
}) => (
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
        error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-gray-300 focus:border-gray-800 focus:ring-2 focus:ring-gray-100'
      }`}
    />
    {error && <p className="text-[12px] text-red-500">{error}</p>}
  </div>
);

// ─── Main Modal ───────────────────────────────────────────────────────────────

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen, onClose, orderTotal, orderItems = 1, cartId
}) => {
  const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';
  const scrollRef = useRef<HTMLDivElement>(null);

  const [step,    setStep]    = useState<Step>('delivery');
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState<Partial<Record<keyof AddressForm | 'global', string>>>({});

  const [form, setForm] = useState<AddressForm>({
    country:           'Nigeria',
    full_name:         '',
    street_address:    '',
    apartment:         '',
    city:              '',
    postal_code:       '',
    state:             '',
    phone_country_code:'+234',
    phone_number:      '',
    email:             '',
    save_as_default:   false,
  });

  // Sync phone code when country changes
  const handleCountryChange = (country: string) => {
    const found = COUNTRIES.find(c => c.name === country);
    setForm(f => ({
      ...f,
      country,
      phone_country_code: found?.phoneCode ?? f.phone_country_code,
      state: '',
    }));
  };

  const set = (key: keyof AddressForm) => (value: string | boolean) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep('delivery');
      setErrors({});
      setLoading(false);
    }
  }, [isOpen]);

  // Trap scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.full_name.trim())      e.full_name      = 'Full name is required';
    if (!form.street_address.trim()) e.street_address = 'Street address is required';
    if (!form.city.trim())           e.city           = 'City is required';
    if (!form.phone_number.trim())   e.phone_number   = 'Phone number is required';
    if (!form.email.trim())          e.email          = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (Object.keys(e).length) {
      setErrors(e);
      // Scroll to first error
      setTimeout(() => scrollRef.current?.querySelector('.error-field')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      return false;
    }
    return true;
  };

  const getAuthHeader = (): Record<string, string> => {
    if (typeof window === 'undefined') return {};
    const token  = localStorage.getItem('access_token');
    const expiry = localStorage.getItem('token_expiry');
    if (token && expiry && Date.now() < parseInt(expiry)) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };

  // In CheckoutModal.tsx, update the handleContinue function with better error logging:

const handleContinue = async () => {
  if (!validate()) return;
  setLoading(true);
  setErrors({});

  try {
    // Format the payload exactly as the backend expects
    const payload = {
      address: {
        full_name: form.full_name,
        country: form.country,
        street_address: form.street_address,
        apartment: form.apartment || '',
        city: form.city,
        state: form.state || '',
        postal_code: form.postal_code || '',
        phone_country_code: form.phone_country_code,
        phone_number: form.phone_number,
        email: form.email,
        save_as_default: form.save_as_default
      },
      payment_method: 'paystack',
      cart_id: cartId
    };

    console.log('[CheckoutModal] Sending payload:', JSON.stringify(payload, null, 2));

    const res = await fetch(`${API}/checkout/initiate/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
    });

    console.log('[CheckoutModal] Response status:', res.status);
    
    // Try to get the error details
    let data;
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
      console.log('[CheckoutModal] Response data:', data);
    } else {
      const text = await res.text();
      console.log('[CheckoutModal] Raw response:', text);
      data = { error: text };
    }

    if (!res.ok) {
      // Extract error messages from the response
      let errorMsg = 'Something went wrong. Please try again.';
      
      if (data.address) {
        // Handle field-specific errors
        const fieldErrors = [];
        if (data.address.full_name) fieldErrors.push(`Full name: ${data.address.full_name[0]}`);
        if (data.address.phone_number) fieldErrors.push(`Phone: ${data.address.phone_number[0]}`);
        if (data.address.email) fieldErrors.push(`Email: ${data.address.email[0]}`);
        if (data.address.state) fieldErrors.push(`State: ${data.address.state[0]}`);
        if (data.address.city) fieldErrors.push(`City: ${data.address.city[0]}`);
        if (data.address.street_address) fieldErrors.push(`Street address: ${data.address.street_address[0]}`);
        if (data.address.country) fieldErrors.push(`Country: ${data.address.country[0]}`);
        if (fieldErrors.length) {
          errorMsg = fieldErrors.join(', ');
        } else {
          errorMsg = JSON.stringify(data.address);
        }
      } else if (data.error) {
        errorMsg = data.error;
      } else if (data.detail) {
        errorMsg = data.detail;
      } else if (data.message) {
        errorMsg = data.message;
      } else if (data.non_field_errors) {
        errorMsg = data.non_field_errors.join(', ');
      } else if (typeof data === 'string') {
        errorMsg = data;
      }
      
      console.error('[CheckoutModal] Error details:', errorMsg);
      setErrors({ global: errorMsg });
      return;
    }

    // Store the order data in sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('checkout_address', JSON.stringify({
        ...form,
        order_id: data.order_id,
        order_number: data.order_number
      }));
    }

    // Redirect to order summary page
    window.location.href = `/order/${data.order_id}/summary/`;
    
  } catch (err) {
    console.error('[CheckoutModal] Network error:', err);
    setErrors({ global: 'Network error. Please check your connection and try again.' });
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  const countryOptions   = COUNTRIES.map(c => ({ label: c.name, value: c.name }));
  const stateOptions     = [
    { label: 'Select state', value: '' },
    ...(form.country === 'Nigeria'
      ? NIGERIA_STATES.map(s => ({ label: s, value: s }))
      : []),
  ];
  const phoneCodeOptions = PHONE_CODES;

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-[2px]"
        style={{ animation: 'fadeIn 0.2s ease' }}
        onClick={onClose}
        aria-hidden
      />

      {/* ── Modal shell ──────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-[501] flex items-center justify-center p-4"
        style={{ animation: 'slideUp 0.28s cubic-bezier(.22,.68,0,1.2)' }}
      >
        <div className="relative bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.22)] w-full max-w-[640px] max-h-[92vh] flex flex-col overflow-hidden">

          {/* ── Close button ────────────────────────────────── */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X size={16} className="text-gray-600" />
          </button>

          {/* ── Step indicator ──────────────────────────────── */}
          <StepIndicator current={step} />

          {/* ── Scrollable body ─────────────────────────────── */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="px-6 pt-5 pb-8 space-y-5">

              <h2 id="modal-title" className="text-[22px] font-semibold text-gray-900 tracking-tight">
                Enter an address
              </h2>

              {/* Global error */}
              {errors.global && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700">
                  {errors.global}
                </div>
              )}

              {/* Country */}
              <SelectField
                label="Country"
                required
                value={form.country}
                onChange={handleCountryChange}
                options={countryOptions}
              />

              {/* Full name */}
              <div className={errors.full_name ? 'error-field' : ''}>
                <InputField
                  label="Full name"
                  required
                  value={form.full_name}
                  onChange={set('full_name')}
                  autoComplete="name"
                  error={errors.full_name}
                />
              </div>

              {/* Email */}
              <div className={errors.email ? 'error-field' : ''}>
                <InputField
                  label="Email address"
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="you@example.com"
                  autoComplete="email"
                  error={errors.email}
                />
              </div>

              {/* Street address */}
              <div className={errors.street_address ? 'error-field' : ''}>
                <InputField
                  label="Street address"
                  required
                  value={form.street_address}
                  onChange={set('street_address')}
                  autoComplete="street-address"
                  error={errors.street_address}
                />
              </div>

              {/* Flat / Other */}
              <InputField
                label="Flat/Other"
                optional
                value={form.apartment}
                onChange={set('apartment')}
                autoComplete="address-line2"
              />

              {/* City */}
              <div className={errors.city ? 'error-field' : ''}>
                <InputField
                  label="City"
                  required
                  value={form.city}
                  onChange={set('city')}
                  autoComplete="address-level2"
                  error={errors.city}
                />
              </div>

              {/* Post code + State */}
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Post code"
                  optional
                  value={form.postal_code}
                  onChange={set('postal_code')}
                  autoComplete="postal-code"
                />
                <SelectField
                  label="State"
                  optional
                  value={form.state}
                  onChange={set('state')}
                  options={stateOptions}
                />
              </div>

              {/* Country code */}
              <SelectField
                label="Country code"
                value={form.phone_country_code}
                onChange={set('phone_country_code')}
                options={phoneCodeOptions}
              />

              {/* Phone number */}
              <div className={errors.phone_number ? 'error-field' : ''}>
                <InputField
                  label="Phone number"
                  required
                  type="tel"
                  value={form.phone_number}
                  onChange={set('phone_number')}
                  placeholder="5555 555 5555"
                  autoComplete="tel-national"
                  error={errors.phone_number}
                />
              </div>

              {/* Set as default */}
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div
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

              {/* Privacy note */}
              <p className="text-[12px] text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
                We use your phone number to facilitate the delivery of your order, including sharing
                with delivery companies. See{' '}
                <a href="/privacy-policy" className="text-[#F1641E] hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* ── Sticky footer ───────────────────────────────── */}
          <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border-2 border-gray-200 text-[14px] font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
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
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing…
                  </>
                ) : (
                  'Continue to Summary'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Keyframe animations ──────────────────────────────── */}
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