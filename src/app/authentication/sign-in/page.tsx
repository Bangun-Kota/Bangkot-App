// src/app/login/page.tsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { 
  LogIn, 
  KeyRound, 
  AtSign, 
  LoaderCircle, 
  Eye, 
  EyeOff,
  Shield,
  ArrowRight,
  CheckCircle2,
  XCircle,
  User,
  LucideIcon
} from "lucide-react";
import { useState } from "react";

// Interface untuk state form
interface FormState {
  type: "success" | "error" | "idle";
  message: string;
}

/**
 * Server Action untuk Sign In
 */
async function signInAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Mencoba masuk dengan:", { email });

  // Validasi sisi server
  if (!email || !password) {
    return { type: "error", message: "Email dan password wajib diisi." };
  }

  // Simulasi pengecekan kredensial
  const validCredentials = [
    { email: 'admin@example.com', password: 'password123' },
    { email: 'user@example.com', password: 'mypassword' },
  ];

  const user = validCredentials.find(
    cred => cred.email === email && cred.password === password
  );

  // Simulasi delay proses autentikasi
  console.log("Memverifikasi kredensial...");
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!user) {
    return { 
      type: "error", 
      message: "Email atau password salah. Silakan coba lagi." 
    };
  }

  // Di aplikasi nyata:
  // 1. Verifikasi password dengan hash yang tersimpan
  // 2. Buat session atau JWT token
  // 3. Redirect ke dashboard

  console.log("Login berhasil!");
  return {
    type: "success",
    message: "Selamat datang! Anda berhasil masuk.",
  };
}

/**
 * Komponen Input dengan animasi dan styling modern
 */
function ModernInput({ 
  icon: Icon, 
  label, 
  type = "text", 
  name, 
  placeholder, 
  required = false,
  autoComplete,
  showPasswordToggle = false 
}: {
  icon: LucideIcon;
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
        {label}
      </label>
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
        <Icon 
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
            isFocused ? 'text-blue-500 scale-110' : 'text-gray-400'
          }`}
          size={20} 
        />
        <input
          id={name}
          name={name}
          type={inputType}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`
            block w-full rounded-xl border-0 py-3.5 pl-11 pr-12
            bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
            text-gray-900 dark:text-white
            shadow-lg ring-1 ring-inset transition-all duration-300
            placeholder:text-gray-400 sm:text-sm sm:leading-6
            ${isFocused 
              ? 'ring-2 ring-blue-500 shadow-blue-200/50 dark:shadow-blue-500/20' 
              : 'ring-gray-200 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600'
            }
            ${hasValue ? 'ring-emerald-200 dark:ring-emerald-800' : ''}
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Komponen Tombol Submit dengan animasi
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        w-full group relative overflow-hidden rounded-xl px-6 py-4
        bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700
        text-white font-semibold shadow-xl
        transition-all duration-300 transform
        ${pending 
          ? 'scale-95 opacity-80 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 active:scale-95'
        }
        disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-400
      `}
      aria-disabled={pending}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      
      <div className="relative flex items-center justify-center gap-3">
        {pending ? (
          <>
            <LoaderCircle className="animate-spin" size={22} />
            <span>Memverifikasi...</span>
          </>
        ) : (
          <>
            <LogIn size={22} />
            <span>Masuk</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </div>
    </button>
  );
}

/**
 * Komponen Alert modern
 */
function ModernAlert({ type, message }: { type: "success" | "error"; message: string }) {
  const isSuccess = type === "success";
  
  return (
    <div className={`
      relative p-4 rounded-2xl backdrop-blur-sm border transition-all duration-500 animate-in slide-in-from-top-2
      ${isSuccess 
        ? 'bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' 
        : 'bg-red-50/80 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
      }
    `}>
      <div className="flex items-start gap-3">
        {isSuccess ? (
          <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
        ) : (
          <XCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

/**
 * Demo credentials component
 */
function DemoCredentials() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors underline"
      >
        Lihat kredensial demo
      </button>
      
      {isVisible && (
        <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kredensial untuk testing:</p>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>admin@example.com / password123</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>user@example.com / mypassword</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Komponen Utama Halaman Sign In
 */
export default function SignInPage() {
  const initialState: FormState = { type: "idle", message: "" };
  const [state, formAction] = useFormState(signInAction, initialState);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 p-4 flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <Shield className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
              Selamat Datang
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
            <form action={formAction} className="space-y-6">
              
              <ModernInput
                icon={AtSign}
                label="Alamat Email"
                type="email"
                name="email"
                placeholder="nama@example.com"
                autoComplete="email"
                required
              />

              <ModernInput
                icon={KeyRound}
                label="Password"
                type="password"
                name="password"
                placeholder="Masukkan password Anda"
                autoComplete="current-password"
                showPasswordToggle
                required
              />

              {/* Forgot password link */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Ingat saya</span>
                </label>
                <a 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors hover:underline"
                >
                  Lupa password?
                </a>
              </div>
              
              {/* Alert pesan */}
              {state.message && (
                <ModernAlert type={state.type as "success" | "error"} message={state.message} />
              )}
              
              <SubmitButton />
            </form>

            {/* Demo credentials */}
            <DemoCredentials />
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Belum punya akun?{' '}
            <a 
              href="/authentication/sign-up" 
              className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors hover:underline"
            >
              Daftar sekarang
            </a>
          </p>
          
          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">atau</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
            </button>
            
            <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 group">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}