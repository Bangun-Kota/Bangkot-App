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
  LucideIcon,
  Sparkles,
  Heart,
  Zap
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

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

// Animation variants matching hero section
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    rotate: [-2, 2, -2],
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
 * Komponen Input dengan animasi dan styling modern yang selaras
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
          animate={isFocused ? { scale: 1.1, rotate: 360 } : { scale: 1, rotate: 0 }}
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
            block w-full rounded-2xl border-0 py-4 pl-11 pr-12
            bg-background/80 backdrop-blur-sm
            text-foreground
            shadow-soft ring-1 ring-inset transition-all duration-300
            placeholder:text-brand-gray-400 sm:text-sm sm:leading-6
            ${isFocused 
              ? 'ring-2 ring-primary-500 shadow-yellow' 
              : 'ring-brand-gray-200 hover:ring-primary-300'
            }
            ${hasValue ? 'ring-secondary-300' : ''}
          `}
        />
        {showPasswordToggle && (
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-400 hover:text-primary-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Komponen Tombol Submit dengan animasi yang selaras
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      className={`
        w-full group relative overflow-hidden rounded-2xl px-8 py-4
        bg-gradient-primary
        text-white font-bold shadow-yellow hover:shadow-turquoise
        transition-all duration-300 transform
        ${pending 
          ? 'scale-95 opacity-80 cursor-not-allowed' 
          : 'hover:scale-105 active:scale-95'
        }
        disabled:from-brand-gray-400 disabled:via-brand-gray-500 disabled:to-brand-gray-400
      `}
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-disabled={pending}
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
        whileHover="animate"
      />
      
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
 * Komponen Alert modern yang selaras
 */
function ModernAlert({ type, message }: { type: "success" | "error"; message: string }) {
  const isSuccess = type === "success";
  
  return (
    <motion.div 
      className={`
        relative p-4 rounded-2xl backdrop-blur-sm border transition-all duration-500
        ${isSuccess 
          ? 'bg-secondary-50/80 border-secondary-200 text-secondary-700' 
          : 'bg-red-50/80 border-red-200 text-red-700'
        }
      `}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          {isSuccess ? (
            <CheckCircle2 className="text-secondary-600 flex-shrink-0 mt-0.5" size={20} />
          ) : (
            <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          )}
        </motion.div>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </motion.div>
  );
}

/**
 * Demo credentials component
 */
function DemoCredentials() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div 
      className="mt-6"
      variants={itemVariants}
    >
      <motion.button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="text-sm text-primary-600 hover:text-primary-500 transition-colors underline font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Lihat kredensial demo
      </motion.button>
      
      {isVisible && (
        <motion.div 
          className="mt-3 p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-brand-gray-200 shadow-soft"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm font-medium text-foreground mb-2">Kredensial untuk testing:</p>
          <div className="space-y-2 text-xs text-foreground-secondary">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <User size={14} />
              <span>admin@example.com / password123</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <User size={14} />
              <span>user@example.com / mypassword</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * Komponen Utama Halaman Sign In
 */
export default function SignInPage() {
  const initialState: FormState = { type: "idle", message: "" };
  const [state, formAction] = useFormState(signInAction, initialState);

  return (
    <main className="min-h-screen bg-gradient-hero text-foreground p-4 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements - matching hero section */}
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
      <motion.div
        className="absolute top-20 left-10 text-brand-gray-400 hover:text-primary-500 transition-colors duration-300"
        variants={floatingVariants}
        animate="animate"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-16 text-brand-gray-400 hover:text-secondary-500 transition-colors duration-300"
        variants={floatingVariants}
        animate="animate"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Heart className="w-7 h-7" />
      </motion.div>

      <motion.div
        className="absolute bottom-24 left-20 text-brand-gray-400 hover:text-accent-blue-500 transition-colors duration-300"
        variants={floatingVariants}
        animate="animate"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Zap className="w-5 h-5" />
      </motion.div>

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
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-yellow"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="text-white" size={28} />
          </motion.div>
          <div>
            <motion.h1 
              className="text-4xl font-black bg-gradient-primary bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Selamat Datang
            </motion.h1>
            <motion.p 
              className="mt-3 text-foreground-secondary text-lg"
              variants={itemVariants}
            >
              Masuk ke akun Anda untuk melanjutkan
            </motion.p>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-background/80 backdrop-blur-xl rounded-3xl p-8 shadow-soft border border-background/20">
            <motion.form 
              action={formAction} 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              
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
              <motion.div 
                className="flex items-center justify-between"
                variants={itemVariants}
              >
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-brand-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-foreground-secondary">Ingat saya</span>
                </label>
                <motion.a 
                  href="/forgot-password" 
                  className="text-sm text-primary-600 hover:text-primary-500 transition-colors hover:underline font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Lupa password?
                </motion.a>
              </motion.div>
              
              {/* Alert pesan */}
              {state.message && (
                <ModernAlert type={state.type as "success" | "error"} message={state.message} />
              )}
              
              <SubmitButton />
            </motion.form>

            {/* Demo credentials */}
            <DemoCredentials />
          </div>
        </motion.div>

        {/* Footer links */}
        <motion.div 
          className="text-center space-y-4"
          variants={itemVariants}
        >
          <p className="text-foreground-secondary">
            Belum punya akun?{' '}
            <motion.a 
              href="/authentication/sign-up" 
              className="font-semibold text-primary-600 hover:text-primary-500 transition-colors hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Daftar sekarang
            </motion.a>
          </p>
          
          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-gray-300 to-transparent"></div>
            <span className="text-sm text-foreground-secondary">atau</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-gray-300 to-transparent"></div>
          </div>

          {/* Social login buttons */}
          <motion.div 
            className="grid grid-cols-2 gap-3"
            variants={containerVariants}
          >
            <motion.button 
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-gray-200 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-foreground">Google</span>
            </motion.button>
            
            <motion.button 
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-brand-gray-200 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-foreground">Facebook</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}