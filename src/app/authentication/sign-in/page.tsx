// src/app/login/page.tsx

"use client";

import { 
  Shield,
  ArrowRight,
  Sparkles,
  Heart,
  Zap,
  Star,
  Users,
  CheckCircle,
  MapPin,
  Calendar
} from "lucide-react";
import {  memo, useMemo } from "react";
import { motion } from "framer-motion";

// Types
interface FloatingIcon {
  icon: React.ReactNode;
  delay: number;
  x: string;
  y: string;
}

interface SocialProvider {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradientFrom: string;
  gradientTo: string;
  description: string;
  isPopular?: boolean;
}

// Static data moved outside component for performance
const floatingIcons: FloatingIcon[] = [
  { icon: <Sparkles className="w-6 h-6" />, delay: 0, x: "10%", y: "20%" },
  { icon: <Users className="w-8 h-8" />, delay: 1, x: "80%", y: "30%" },
  { icon: <Zap className="w-5 h-5" />, delay: 2, x: "15%", y: "70%" },
  { icon: <Heart className="w-7 h-7" />, delay: 1.5, x: "85%", y: "75%" },
  { icon: <MapPin className="w-6 h-6" />, delay: 0.5, x: "90%", y: "15%" },
  { icon: <Calendar className="w-5 h-5" />, delay: 2.5, x: "5%", y: "45%" },
];

// Animation variants (matching hero section)
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
 * Social Icons Components
 */
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const MicrosoftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Social providers data
const socialProviders: SocialProvider[] = [
  { 
    name: "Google", 
    icon: GoogleIcon, 
    gradientFrom: "from-yellow-400", 
    gradientTo: "to-orange-500", 
    description: "Masuk dengan akun Google",
    isPopular: true
  },
  { 
    name: "Apple", 
    icon: AppleIcon, 
    gradientFrom: "from-gray-700", 
    gradientTo: "to-black", 
    description: "Masuk dengan Apple ID"
  },
  { 
    name: "Microsoft", 
    icon: MicrosoftIcon, 
    gradientFrom: "from-blue-500", 
    gradientTo: "to-blue-700", 
    description: "Masuk dengan Microsoft"
  },
  { 
    name: "GitHub", 
    icon: GitHubIcon, 
    gradientFrom: "from-gray-600", 
    gradientTo: "to-gray-800", 
    description: "Masuk dengan GitHub"
  },
  { 
    name: "LinkedIn", 
    icon: LinkedInIcon, 
    gradientFrom: "from-blue-600", 
    gradientTo: "to-blue-800", 
    description: "Masuk dengan LinkedIn"
  },
  { 
    name: "Twitter", 
    icon: TwitterIcon, 
    gradientFrom: "from-sky-400", 
    gradientTo: "to-blue-500", 
    description: "Masuk dengan Twitter/X"
  }
];

// Memoized components
const FloatingIcon = memo(({ item }: { item: FloatingIcon }) => (
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

const SocialButton = memo(({ provider }: { provider: SocialProvider }) => (
  <motion.div
    className="relative group"
    variants={itemVariants}
    whileHover={{ scale: 1.05, y: -4 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Popular badge */}
    {provider.isPopular && (
      <motion.div
        className="absolute -top-2 -right-2 z-10 bg-gradient-primary text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
      >
        <Star className="w-3 h-3 inline mr-1" />
        Populer
      </motion.div>
    )}

    <motion.button 
      className={`
        relative w-full overflow-hidden
        flex flex-col items-center justify-center gap-4 p-6 
        rounded-2xl border backdrop-blur-sm
        bg-background/80 hover:bg-background/90
        border-primary-200 hover:border-primary-300
        shadow-soft hover:shadow-yellow
        transition-all duration-300
        group
      `}
    >
      {/* Shimmer Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/30 to-transparent skew-x-12"
        variants={shimmerVariants}
        initial="initial"
        whileHover="animate"
      />
      
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Icon with gradient background */}
        <motion.div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${provider.gradientFrom} ${provider.gradientTo} flex items-center justify-center shadow-lg`}
          whileHover={{ 
            rotate: [0, -5, 5, 0],
            scale: 1.1
          }}
          transition={{ duration: 0.4 }}
        >
          <provider.icon className="w-6 h-6 text-white" />
        </motion.div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-foreground mb-1">
            {provider.name}
          </h3>
          <p className="text-sm text-foreground-secondary">
            {provider.description}
          </p>
        </div>
        
        {/* Enhanced arrow */}
        <motion.div
          className="flex items-center gap-2 text-primary-600 font-medium"
          animate={{ x: [0, 3, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          <span className="text-sm">Masuk Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.button>
  </motion.div>
));

const LoginPage = memo(() => {
  // Memoize expensive calculations
  const memoizedFloatingIcons = useMemo(() => 
    floatingIcons.map((item, idx) => (
      <FloatingIcon key={idx} item={item} />
    )), []
  );

  const memoizedSocialButtons = useMemo(() =>
    socialProviders.map((provider) => (
      <SocialButton key={provider.name} provider={provider} />
    )), []
  );

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-foreground overflow-hidden p-4">
      {/* Background Elements (matching hero section) */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-blue-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Floating Icons */}
      {memoizedFloatingIcons}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_70%)]" />

      <motion.div 
        className="relative z-10 w-full max-w-6xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center space-y-6"
          variants={itemVariants}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Masuk ke Bangunkota
            </span>
            <motion.div 
              className="w-2 h-2 bg-secondary-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight"
            variants={itemVariants}
          >
            <motion.span 
              className="block relative inline-block"
              variants={itemVariants}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Selamat Datang
              </span>
            </motion.span>
            <motion.span 
              className="block text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-4"
              variants={itemVariants}
            >
              Kembali ke{" "}
              <motion.span 
                className="inline-block"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                Komunitas! 🚀
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Pilih platform favorit Anda untuk{" "}
            <span className="text-primary-600 font-semibold">masuk dengan cepat</span>{" "}
            dan bergabung kembali dengan{" "}
            <span className="text-secondary-600 font-semibold">komunitas aktif</span>{" "}
            di Kota Bekasi.
          </motion.p>
        </motion.div>

        {/* Features Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          variants={containerVariants}
        >
          {[
            { icon: <CheckCircle className="w-4 h-4" />, text: "Keamanan Tingkat Enterprise", color: "border-secondary-200 bg-secondary-50 text-secondary-700" },
            { icon: <Users className="w-4 h-4" />, text: "Terpercaya Ribuan Pengguna", color: "border-primary-200 bg-primary-50 text-primary-700" },
            { icon: <Zap className="w-4 h-4" />, text: "Akses Instan Tanpa Password", color: "border-accent-orange-200 bg-accent-orange-50 text-accent-orange-700" }
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              className={`flex items-center gap-2 border backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${feature.color}`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: index * 0.5 
                }}
              >
                {feature.icon}
              </motion.div>
              {feature.text}
            </motion.div>
          ))}
        </motion.div>

        {/* Social Buttons Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {memoizedSocialButtons}
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center space-y-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-gray-300 to-transparent max-w-32"></div>
            <div className="flex items-center gap-2 text-foreground-secondary">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Aman & Terpercaya</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-gray-300 to-transparent max-w-32"></div>
          </div>
          
          <motion.p 
            className="text-foreground-secondary text-sm max-w-md mx-auto"
            variants={itemVariants}
          >
            Dengan masuk, Anda menyetujui{" "}
            <span className="text-primary-600 hover:text-primary-700 cursor-pointer underline font-medium">
              Syarat & Ketentuan
            </span>{" "}
            dan{" "}
            <span className="text-primary-600 hover:text-primary-700 cursor-pointer underline font-medium">
              Kebijakan Privasi
            </span>{" "}
            kami.
          </motion.p>

          <div className="flex items-center justify-center gap-4 text-foreground-secondary text-xs">
            <span>© 2025 Bangunkota</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Decorative Wave (matching hero section) */}
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
});

FloatingIcon.displayName = 'FloatingIcon';
SocialButton.displayName = 'SocialButton';
LoginPage.displayName = 'LoginPage';

export default LoginPage;