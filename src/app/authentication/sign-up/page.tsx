// src/app/register/page.tsx

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { 
  UserPlus, 
  KeyRound, 
  AtSign, 
  LoaderCircle, 
  UserCircle, 
  Eye, 
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  LucideIcon
} from "lucide-react";
import { useState } from "react";

// Interface untuk state form
interface FormState {
  type: "success" | "error" | "idle";
  message: string;
}

/**
 * Server Action untuk Pendaftaran
 */
async function signUpAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");

  console.log("Mencoba mendaftar di server dengan:", { name, email });

  // Validasi sisi server
  if (!name || !email || !password || !passwordConfirm) {
    return { type: "error", message: "Semua kolom wajib diisi." };
  }
  
  if (password !== passwordConfirm) {
    return { type: "error", message: "Konfirmasi password tidak cocok." };
  }

  if (password.toString().length < 8) {
    return { type: "error", message: "Password minimal harus 8 karakter." };
  }
  
  // Simulasi pengecekan email
  if (email === 'terdaftar@example.com') {
    return { type: 'error', message: 'Email ini sudah terdaftar. Silakan gunakan email lain.' };
  }

  // Simulasi proses pembuatan user
  console.log("Validasi berhasil, memproses pembuatan user...");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("User berhasil dibuat!");
  return {
    type: "success",
    message: "Pendaftaran berhasil! Silakan masuk untuk melanjutkan.",
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
            isFocused ? 'text-indigo-500 scale-110' : 'text-gray-400'
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
              ? 'ring-2 ring-indigo-500 shadow-indigo-200/50 dark:shadow-indigo-500/20' 
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
        bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700
        text-white font-semibold shadow-xl
        transition-all duration-300 transform
        ${pending 
          ? 'scale-95 opacity-80 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 active:scale-95'
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
            <span>Memproses...</span>
          </>
        ) : (
          <>
            <UserPlus size={22} />
            <span>Buat Akun</span>
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
 * Komponen Utama Halaman Sign Up
 */
export default function SignUpPage() {
  const initialState: FormState = { type: "idle", message: "" };
  const [state, formAction] = useFormState(signUpAction, initialState);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 p-4 flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
            <Sparkles className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
              Buat Akun Baru
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
              Bergabunglah dengan ribuan pengguna lainnya
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
            <form action={formAction} className="space-y-6">
              
              <ModernInput
                icon={UserCircle}
                label="Nama Lengkap"
                name="name"
                placeholder="Masukkan nama lengkap Anda"
                required
              />

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
                placeholder="Minimal 8 karakter"
                autoComplete="new-password"
                showPasswordToggle
                required
              />

              <ModernInput
                icon={KeyRound}
                label="Konfirmasi Password"
                type="password"
                name="passwordConfirm"
                placeholder="Ulangi password Anda"
                autoComplete="new-password"
                showPasswordToggle
                required
              />
              
              {/* Alert pesan */}
              {state.message && (
                <ModernAlert type={state.type as "success" | "error"} message={state.message} />
              )}
              
              <SubmitButton />
            </form>
          </div>
        </div>

        {/* Footer link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Sudah punya akun?{' '}
            <a 
              href="/authentication/sign-in" 
              className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors hover:underline"
            >
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}