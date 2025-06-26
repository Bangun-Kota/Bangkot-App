'use client'
import Link from "next/link";
import { Home, Search, AlertTriangle, Sparkles, Users, Zap, Heart, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

// Types
interface FloatingIcon {
  icon: React.ReactNode;
  delay: number;
  x: string;
  y: string;
}

interface ActionButton {
  href: string;
  text: string;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary';
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

const actionButtons: ActionButton[] = [
  {
    href: "/",
    text: "Kembali ke Beranda",
    icon: <Home className="w-5 h-5" />,
    variant: 'primary'
  },
  {
    href: "/programs",
    text: "Jelajahi Program",
    icon: <Search className="w-5 h-5" />,
    variant: 'secondary'
  }
];

// Animation variants
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

const bounceVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
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

// Memoized components for performance
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

const ActionButton = memo(({ button }: { button: ActionButton }) => {
  const isPrimary = button.variant === 'primary';
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={button.href}
        className={`group relative inline-flex items-center gap-3 font-bold px-8 py-4 rounded-2xl transition-all duration-300 overflow-hidden ${
          isPrimary 
            ? 'bg-gradient-primary text-white shadow-yellow hover:shadow-turquoise' 
            : 'bg-background/80 backdrop-blur-sm border-2 border-secondary-300 text-secondary-700 hover:bg-secondary-50 hover:border-secondary-400'
        }`}
      >
        <motion.div 
          className="relative z-10"
          animate={{ x: isPrimary ? [0, -3, 0] : [0, 3, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          {button.icon}
        </motion.div>
        <span className="relative z-10">{button.text}</span>
        
        {isPrimary && (
          <>
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
          </>
        )}
      </Link>
    </motion.div>
  );
});

const NotFoundPage = memo(() => {
  // Memoize expensive calculations
  const memoizedFloatingIcons = useMemo(() => 
    floatingIcons.map((item, idx) => (
      <FloatingIcon key={idx} item={item} />
    )), []
  );

  const memoizedActionButtons = useMemo(() =>
    actionButtons.map((button) => (
      <ActionButton key={button.href} button={button} />
    )), []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-foreground overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs with optimized animations */}
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
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-8">
          {/* 404 Number with bouncing animation */}
          <motion.div 
            className="relative"
            variants={bounceVariants}
            animate="animate"
          >
            <motion.h1 
              className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tight"
              variants={itemVariants}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent drop-shadow-2xl">
                404
              </span>
            </motion.h1>
            
            {/* Warning Icon */}
            <motion.div 
              className="absolute top-4 right-4 md:top-8 md:right-8"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 0.5, 
                delay: 1,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-accent-orange-500" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Oops! Halaman Tidak Ditemukan
            </h2>
            <p className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
              Sepertinya kamu tersesat di{" "}
              <span className="text-primary-600 font-semibold">perjalanan membangun kota</span>.{" "}
              Halaman yang kamu cari mungkin sudah dipindahkan atau tidak ada.
            </p>
          </motion.div>

          {/* Suggestion Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center gap-2 border border-primary-200 bg-primary-50 text-primary-700 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
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
                  ease: "linear"
                }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Jangan Putus Asa
            </motion.div>
            
            <motion.div
              className="flex items-center gap-2 border border-secondary-200 bg-secondary-50 text-secondary-700 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
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
                  delay: 0.5
                }}
              >
                <Users className="w-4 h-4" />
              </motion.div>
              Komunitas Menanti
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            variants={itemVariants}
          >
            {memoizedActionButtons}
          </motion.div>

          {/* Fun Quote */}
          <motion.div 
            className="pt-8"
            variants={itemVariants}
          >
            <blockquote className="text-foreground-secondary italic text-lg">
              &quot;Setiap jalan yang salah adalah langkah menuju jalan yang benar&quot; 
              <motion.span 
                className="inline-block ml-2"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: 3,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                🌟
              </motion.span>
            </blockquote>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Decorative Wave */}
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
            fill="url(#errorGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
          <defs>
            <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249,115,22,0.1)" />
              <stop offset="50%" stopColor="rgba(234,179,8,0.15)" />
              <stop offset="100%" stopColor="rgba(20,184,166,0.1)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </section>
  );
});

FloatingIcon.displayName = 'FloatingIcon';
ActionButton.displayName = 'ActionButton';
NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;