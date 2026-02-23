'use client'

import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { authService } from "@/services/auth";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
type ModalView = "signin" | "register";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after successful login so Header can refresh auth state */
  onAuthSuccess?: () => void;
}

// ─────────────────────────────────────────────────────────────
// Social-provider icons (inline SVG — no extra deps)
// ─────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Reusable field component
// ─────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  showToggle?: boolean;
}

const Field = ({
  label, required, type = "text", value, onChange, error, placeholder, showToggle,
}: FieldProps) => {
  const [show, setShow] = useState(false);
  const inputType = showToggle ? (show ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[13px] font-medium text-gray-800">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border rounded-md px-3 py-[11px] text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow ${
            error ? "border-red-400 focus:ring-red-300" : "border-gray-300"
          }`}
        />
        {showToggle && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Sign-in form
// ─────────────────────────────────────────────────────────────
const SignInForm = ({
  onSwitch,
  onSuccess,
}: {
  onSwitch: () => void;
  onSuccess: () => void;
}) => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [stayIn, setStayIn]     = useState(true);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof fieldErrors = {};
    if (!email.trim())    errs.email    = "Email address is required";
    if (!password.trim()) errs.password = "Password is required";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    try {
      const res = await authService.signIn({ email, password });
      if (res.error) {
        setError(res.error);
      } else {
        onSuccess();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] font-semibold text-gray-900">Sign in</h2>
        <button
          type="button"
          onClick={onSwitch}
          className="px-4 py-1.5 rounded-full border border-gray-800 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          Register
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <Field
          label="Email address"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); setFieldErrors((p) => ({ ...p, email: undefined })); }}
          error={fieldErrors.email}
        />
        <Field
          label="Password"
          value={password}
          onChange={(v) => { setPassword(v); setFieldErrors((p) => ({ ...p, password: undefined })); }}
          error={fieldErrors.password}
          showToggle
        />

        {/* Stay signed in + forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setStayIn((v) => !v)}
              className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors cursor-pointer ${
                stayIn ? "bg-gray-900 border-gray-900" : "border-gray-400 bg-white"
              }`}
            >
              {stayIn && (
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-[13px] text-gray-800">Stay signed in</span>
          </label>
          <button type="button" className="text-[13px] text-gray-500 hover:underline underline-offset-2">
            Forgot your password?
          </button>
        </div>

        {/* Global error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md px-3 py-2 text-[13px] text-red-600">
            {error}
          </div>
        )}

        {/* Sign in button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-gray-900 hover:bg-gray-700 text-white font-semibold text-[15px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Signing in…
            </span>
          ) : "Sign in"}
        </button>

        <button
          type="button"
          className="text-[13px] text-gray-500 hover:underline underline-offset-2 text-center"
        >
          Trouble signing in?
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[12px] text-gray-400 uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social buttons */}
        <SocialButtons />

        {/* Legal */}
        <p className="text-[12px] text-gray-500 leading-relaxed">
          By clicking Sign in, Continue with Google, Facebook, or Apple, you agree to Etsy&apos;s{" "}
          <a href="/terms" className="underline text-blue-600 hover:text-blue-800">Terms of Use</a>{" "}
          and{" "}
          <a href="/privacy" className="underline text-blue-600 hover:text-blue-800">Privacy Policy</a>.
        </p>
        <p className="text-[12px] text-gray-500 leading-relaxed">
          Etsy may send you communications; you may change your preferences in your account settings. We&apos;ll never post without your permission.
        </p>
      </div>
    </form>
  );
};

// ─────────────────────────────────────────────────────────────
// Register form
// ─────────────────────────────────────────────────────────────
const RegisterForm = ({
  onSwitch,
  onSuccess,
}: {
  onSwitch: () => void;
  onSuccess: () => void;
}) => {
  const [fields, setFields] = useState({
    email: "", firstname: "", password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const set = (k: string) => (v: string) => {
    setFields((p) => ({ ...p, [k]: v }));
    setFieldErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fields.email.trim())     errs.email     = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(fields.email)) errs.email = "Enter a valid email";
    if (!fields.firstname.trim()) errs.firstname = "First name is required";
    if (!fields.password.trim())  errs.password  = "Password is required";
    else if (fields.password.length < 8) errs.password = "Password must be at least 8 characters";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await authService.register({
        username: fields.email.split("@")[0],
        email: fields.email,
        fullname: fields.firstname,
        password1: fields.password,
        password2: fields.password,
        gender: "",
        phone: "",
      });
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(res.Message || "Registration successful! Please check your email.");
        setTimeout(onSwitch, 2000);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-[22px] font-semibold text-gray-900 mb-1">Create your account</h2>
        <p className="text-[14px] text-gray-600">Registration is easy.</p>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <Field
          label="Email address"
          required
          type="email"
          value={fields.email}
          onChange={set("email")}
          error={fieldErrors.email}
        />
        <Field
          label="First name"
          required
          value={fields.firstname}
          onChange={set("firstname")}
          error={fieldErrors.firstname}
        />
        <Field
          label="Password"
          required
          value={fields.password}
          onChange={set("password")}
          error={fieldErrors.password}
          showToggle
        />

        {/* Legal above button */}
        <p className="text-[12px] text-gray-500 leading-relaxed">
          By clicking Register or Continue with Google, Facebook, or Apple, you agree to Etsy&apos;s{" "}
          <a href="/terms" className="underline text-blue-600 hover:text-blue-800">Terms of Use</a>{" "}
          and{" "}
          <a href="/privacy" className="underline text-blue-600 hover:text-blue-800">Privacy Policy</a>.
        </p>

        {/* Error / success */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md px-3 py-2 text-[13px] text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md px-3 py-2 text-[13px] text-green-700">
            {success}
          </div>
        )}

        {/* Register button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold text-[15px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Creating account…
            </span>
          ) : "Register"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[12px] text-gray-400 uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social */}
        <SocialButtons />
      </div>
    </form>
  );
};

// ─────────────────────────────────────────────────────────────
// Shared social buttons
// ─────────────────────────────────────────────────────────────
const SocialButtons = () => (
  <div className="flex flex-col gap-3">
    {[
      {
        icon: <GoogleIcon />,
        label: "Continue with Google",
        border: "border-gray-300",
      },
      {
        icon: <FacebookIcon />,
        label: "Continue with Facebook",
        border: "border-gray-300",
      },
      {
        icon: <AppleIcon />,
        label: "Continue with Apple",
        border: "border-gray-300",
      },
    ].map(({ icon, label, border }) => (
      <button
        key={label}
        type="button"
        className={`w-full flex items-center justify-center gap-3 py-3 rounded-full border ${border} text-[14px] font-medium text-gray-900 bg-white hover:bg-gray-50 transition-colors`}
      >
        {icon}
        {label}
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────
// Main modal shell
// ─────────────────────────────────────────────────────────────
const SignInModal = ({ open, onOpenChange, onAuthSuccess }: SignInModalProps) => {
  const [view, setView] = useState<ModalView>("signin");

  // Reset to sign-in each time modal opens
  useEffect(() => {
    if (open) setView("signin");
  }, [open]);

  if (!open) return null;

  const handleSuccess = () => {
    onOpenChange(false);
    onAuthSuccess?.();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[400]"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="fixed inset-0 z-[401] flex items-start justify-center pt-[80px] px-4 pb-8 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={view === "signin" ? "Sign in" : "Create account"}
      >
        <div
          className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>

          {view === "signin" ? (
            <SignInForm
              onSwitch={() => setView("register")}
              onSuccess={handleSuccess}
            />
          ) : (
            <RegisterForm
              onSwitch={() => setView("signin")}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SignInModal;