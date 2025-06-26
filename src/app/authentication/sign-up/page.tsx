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
  LucideIcon,
  Users,
  Zap,
  Heart,
  MapPin,
  Calendar
} from "lucide-react";
import { useState, memo, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Interface untuk state form
interface FormState {
  type: "success" | "error" | "idle";
  message: string;
}

interface FloatingIcon {
  icon: React.ReactNode;
  delay: number;
  x: string;
  y: string;
}

// Static data untuk floating icons (disesuaikan dengan hero section)
const floatingIcons: FloatingIcon[] = [
  { icon: <Sparkles className="w-4 h-4" />, delay: 0, x: "15%", y: "15%" },
  { icon: <Users className="w-5 h-5" />, delay: 1, x: "85%", y: "20%" },
  { icon: <Zap className="w-4 h-4" />, delay: 2, x: "10%", y: "80%" },
  { icon: <Heart className="w-5 h-5" />, delay: 1.5, x: "90%", y: "70%" },
  { icon: <MapPin className="w-4 h-4" />, delay: 0.5, x: "20%", y: "60%" },
  { icon: <Calendar className="w-4 h-4" />, delay: 2.5, x: "80%", y: "85%" },
];

// Animation variants (selaras dengan hero section)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    x: [-3, 3, -3],
    rotate: [-1, 1, -1],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
};

const orbVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

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

// Memoized floating icon component
const FloatingIcon = memo(({ item }: { item: FloatingIcon; }) => (
  <motion.div
    className="absolute text-brand-gray-400 hover:text-primary-500 transition-colors duration-300"
    style={{ 
      left: item.x,
      top: item.y,
    }}
    variants={floatingVariants}
    animate="animate"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: item.delay }}
    whileHover={{ 
      scale: 1.2,
      transition: { duration: 0.2 }
    }}
  >
    {item.icon}
  </motion.div>
));

FloatingIcon.displayName = 'FloatingIcon';

/**
 * Komponen Input dengan animasi dan styling selaras dengan hero section
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
    <motion.div 
      className="group"
      variants={itemVariants}
    >
      <label className="block text-sm font-medium text-foreground-secondary mb-2 transition-colors">
        {label}
      </label>
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
        <motion.div
          animate={{ rotate: isFocused ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon 
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
              isFocused ? 'text-primary-500 scale-110' : 'text-brand-gray-400'
            }`}
            size={20} 
          />
        </motion.div>
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
            bg-background/80 backdrop-blur-sm
            text-foreground
            shadow-soft ring-1 ring-inset transition-all duration-300
            placeholder:text-brand-gray-400 sm:text-sm sm:leading-6
            ${isFocused 
              ? 'ring-2 ring-primary-500 shadow-yellow' 
              : 'ring-primary-200 hover:ring-primary-300'
            }
            ${hasValue ? 'ring-secondary-200' : ''}
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-400 hover:text-primary-500 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Komponen Tombol Submit dengan animasi selaras dengan hero section
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      className={`
        w-full group relative overflow-hidden rounded-2xl px-8 py-4
        bg-gradient-primary text-white font-bold shadow-yellow hover:shadow-turquoise
        transition-all duration-300 transform
        ${pending 
          ? 'scale-95 opacity-80 cursor-not-allowed' 
          : 'hover:scale-105 active:scale-95'
        }
        disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-400
      `}
      aria-disabled={pending}
      whileHover={{ scale: pending ? 1 : 1.05, y: pending ? 0 : -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-secondary"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shimmer Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        variants={shimmerVariants}
        initial="initial"
        whileHover={pending ? "initial" : "animate"}
      />
      
      <div className="relative flex items-center justify-center gap-3">
        {pending ? (
          <>
            <LoaderCircle className="animate-spin" size={22} />
            <span>Memproses...</span>
          </>
        ) : (
          <>
            <UserPlus size={22} />
            <span>Gabung Komunitas</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </>
        )}
      </div>
    </motion.button>
  );
}

/**
 * Komponen Alert modern dengan styling selaras
 */
function ModernAlert({ type, message }: { type: "success" | "error"; message: string }) {
  const isSuccess = type === "success";
  
  return (
    <motion.div 
      className={`
        relative p-4 rounded-2xl backdrop-blur-sm border transition-all duration-500
        ${isSuccess 
          ? 'bg-secondary-50/80 border-secondary-200 text-secondary-700' 
          : 'bg-accent-orange-50/80 border-accent-orange-200 text-accent-orange-700'
        }
      `}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        {isSuccess ? (
          <CheckCircle2 className="text-secondary-500 flex-shrink-0 mt-0.5" size={20} />
        ) : (
          <XCircle className="text-accent-orange-500 flex-shrink-0 mt-0.5" size={20} />
        )}
        <p className="text-sm font-medium">{message}</p>
      </div>
    </motion.div>
  );
}

/**
 * Komponen Utama Halaman Sign Up
 */
export default function SignUpPage() {
  const initialState: FormState = { type: "idle", message: "" };
  const [state, formAction] = useFormState(signUpAction, initialState);

  // Memoize floating icons
  const memoizedFloatingIcons = useMemo(() => 
    floatingIcons.map((item, idx) => (
      <FloatingIcon key={idx} item={item} />
    )), []
  );

  return (
    <main className="relative min-h-screen bg-gradient-hero text-foreground overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements (selaras dengan hero section) */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 1 }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-blue-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Floating Icons */}
      {memoizedFloatingIcons}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_70%)]" />

      <motion.div 
        className="w-full max-w-md space-y-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center space-y-4"
          variants={itemVariants}
        >
          {/* Badge selaras dengan hero section */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft mb-4"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Bergabung dengan Bangunkota
            </span>
          </motion.div>

          <div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold"
              variants={itemVariants}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Daftar Sekarang
              </span>
            </motion.h1>
            <motion.p 
              className="mt-3 text-foreground-secondary text-lg"
              variants={itemVariants}
            >
              Jadilah bagian dari{" "}
              <span className="text-primary-600 font-semibold">komunitas yang mengubah kota</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-background/80 backdrop-blur-xl rounded-3xl p-8 shadow-soft border border-white/20">
            <motion.form 
              action={formAction} 
              className="space-y-6"
              variants={containerVariants}
            >
              
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
            </motion.form>
          </div>
        </motion.div>

        {/* Footer link */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <p className="text-foreground-secondary">
            Sudah punya akun?{' '}
            <Link 
              href="/authentication/sign-in" 
              className="font-semibold text-primary-600 hover:text-primary-500 transition-colors hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Decorative Wave (selaras dengan hero section) */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#themeGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
          <defs>
            <linearGradient id="themeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234,179,8,0.1)" />
              <stop offset="50%" stopColor="rgba(20,184,166,0.15)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.1)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </main>
  );
}