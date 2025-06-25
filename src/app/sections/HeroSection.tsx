import Link from "next/link";
import { ArrowRight, Sparkles, Users, Zap, Heart, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

// Types
interface FloatingIcon {
  icon: React.ReactNode;
  delay: number;
  x: string;
  y: string;
}

interface FeaturePill {
  icon: React.ReactNode;
  text: string;
  color: string;
}

interface StatItem {
  value: string;
  label: string;
  gradient: string;
  delay: number;
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

const featurePills: FeaturePill[] = [
  { 
    icon: <Users className="w-4 h-4" />, 
    text: "Komunitas Aktif", 
    color: "border-secondary-200 bg-secondary-50 text-secondary-700" 
  },
  { 
    icon: <Zap className="w-4 h-4" />, 
    text: "Program Menarik", 
    color: "border-primary-200 bg-primary-50 text-primary-700" 
  },
  { 
    icon: <Heart className="w-4 h-4" />, 
    text: "Dampak Nyata", 
    color: "border-accent-orange-200 bg-accent-orange-50 text-accent-orange-700" 
  },
  { 
    icon: <Sparkles className="w-4 h-4" />, 
    text: "Networking", 
    color: "border-accent-blue-200 bg-accent-blue-50 text-accent-blue-700" 
  }
];

const stats: StatItem[] = [
  { value: "60+", label: "Komunitas Aktif", gradient: "bg-gradient-turquoise", delay: 1.5 },
  { value: "10K+", label: "Anggota Terdaftar", gradient: "bg-gradient-yellow", delay: 1.7 },
  { value: "50+", label: "Program Terlaksana", gradient: "bg-gradient-blue", delay: 1.9 },
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

const underlineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      delay: 1,
      ease: "easeOut" as const,
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

const FeaturePill = memo(({ feature, index }: { feature: FeaturePill; index: number }) => (
  <motion.div
    className={`flex items-center gap-2 border backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${feature.color}`}
    variants={itemVariants}
    whileHover={{ 
      scale: 1.05, 
      y: -4,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
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
));

const StatCard = memo(({ stat }: { stat: StatItem }) => (
  <motion.div
    className="text-center"
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div 
      className={`text-3xl md:text-4xl font-bold ${stat.gradient} bg-clip-text text-transparent mb-2`}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        delay: stat.delay 
      }}
    >
      {stat.value}
    </motion.div>
    <div className="text-foreground-secondary font-medium">{stat.label}</div>
  </motion.div>
));

const HeroSection = memo(() => {
  // Memoize expensive calculations
  const memoizedFloatingIcons = useMemo(() => 
    floatingIcons.map((item, idx) => (
      <FloatingIcon key={idx} item={item} />
    )), []
  );

  const memoizedFeaturePills = useMemo(() =>
    featurePills.map((feature, idx) => (
      <FeaturePill key={feature.text} feature={feature} index={idx} />
    )), []
  );

  const memoizedStats = useMemo(() =>
    stats.map((stat) => (
      <StatCard key={stat.label} stat={stat} />
    )), []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-foreground overflow-hidden pb-8">
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
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-8">
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
              <Sparkles className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              60+ Komunitas Aktif di Bekasi
            </span>
            <motion.div 
              className="w-2 h-2 bg-secondary-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight"
            variants={itemVariants}
          >
            <motion.span 
              className="block relative inline-block"
              variants={itemVariants}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Bangunkota
              </span>
              {/* Animated underline */}
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-primary rounded-full origin-left"
                variants={underlineVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.span>
            <motion.span 
              className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4"
              variants={itemVariants}
            >
              Hidupkan Kota{" "}
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
                Bareng! 🚀
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Bergabunglah dengan{" "}
            <span className="text-primary-600 font-semibold">ekosistem komunitas lintas minat</span>{" "}
            yang menciptakan ruang publik{" "}
            <span className="text-secondary-600 font-semibold">inklusif</span>,{" "}
            <span className="text-accent-orange-500 font-semibold">kreatif</span>, dan{" "}
            <span className="text-accent-blue-600 font-semibold">berkelanjutan</span>{" "}
            di Kota Bekasi.
          </motion.p>

          {/* Feature Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            variants={containerVariants}
          >
            {memoizedFeaturePills}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6"
            variants={itemVariants}
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/authentication/sign-in"
                className="group relative inline-flex items-center gap-3 bg-gradient-primary text-white font-bold px-8 py-4 rounded-2xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Gabung Komunitas</span>
                <motion.div 
                  className="relative z-10"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                
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
              </Link>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/programs"
                className="group inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border-2 border-secondary-300 text-secondary-700 font-semibold px-6 py-3 rounded-xl hover:bg-secondary-50 hover:border-secondary-400 transition-all duration-300"
              >
                Lihat Program
                <motion.div
                  animate={{ rotate: [0, 45, 0] }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8"
            variants={containerVariants}
          >
            {memoizedStats}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-brand-gray-300 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-primary-400 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
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
    </section>
  );
});

FloatingIcon.displayName = 'FloatingIcon';
FeaturePill.displayName = 'FeaturePill';
StatCard.displayName = 'StatCard';
HeroSection.displayName = 'HeroSection';

export default HeroSection;