import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Paintbrush,
  Sparkles,
  Landmark,
  Globe,
  Leaf,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

interface ValueType {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgGradient: string;
  description: string;
  accent: string;
}

// Optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -12,
    scale: 1.03,
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
    },
  },
};

const iconVariants = {
  hover: {
    rotate: [0, -15, 15, -10, 10, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const glowVariants = {
  hover: {
    opacity: 0.15,
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
};

const progressVariants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: {
      duration: 1,
      delay: i * 0.1 + 0.5,
      ease: "easeOut",
    },
  }),
};

const floatingVariants = {
  animate: {
    y: [-15, 15, -15],
    x: [-8, 8, -8],
    rotate: [-3, 3, -3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const orbVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.2, 0.4, 0.2],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Memoized components
const ValueCard = memo(({ value, index }: { value: ValueType; index: number }) => (
  <motion.div
    className="group relative"
    variants={itemVariants}
    whileHover="hover"
    whileTap="tap"
  >
    {/* Card Container */}
    <motion.div
      className="relative p-8 bg-background/80 backdrop-blur-sm rounded-3xl border border-primary-200/50 shadow-soft cursor-pointer overflow-hidden"
      variants={cardHoverVariants}
    >
      {/* Gradient Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-30 rounded-3xl`} />
      
      {/* Glow Effect */}
      <motion.div 
        className={`absolute inset-0 ${value.gradient} rounded-3xl opacity-0 blur-2xl`}
        variants={glowVariants}
        style={{ willChange: "transform, opacity" }}
      />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div 
          className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          variants={shimmerVariants}
          initial="initial"
          whileHover="animate"
        />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-primary rounded-full opacity-20 blur-sm" />
      <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-gradient-secondary rounded-full opacity-30 blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-6">
        {/* Icon Container */}
        <motion.div 
          className={`inline-flex items-center justify-center w-20 h-20 ${value.gradient} rounded-3xl shadow-yellow mb-2 relative overflow-hidden`}
          variants={iconVariants}
        >
          <value.icon className="w-10 h-10 text-white relative z-10" />
          
          {/* Icon Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
        </motion.div>
        
        {/* Title */}
        <div>
          <h3 className="text-2xl font-black text-foreground mb-2">
            {value.title}
          </h3>
          
          {/* Subtitle with gradient */}
          <div className={`text-sm font-bold ${value.accent} mb-4`}>
            {value.subtitle}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-foreground-secondary text-sm leading-relaxed">
          {value.description}
        </p>
        
        {/* Interactive Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-brand-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${value.gradient} rounded-full origin-left`}
              variants={progressVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              style={{ willChange: "transform" }}
            />
          </div>
          
          {/* Progress Indicator */}
          <motion.div
            className={`absolute -top-1 right-0 w-4 h-4 ${value.gradient} rounded-full shadow-lg`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 1.5, duration: 0.3 }}
          />
        </div>

        {/* Hover Arrow */}
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <ArrowRight className={`w-5 h-5 mx-auto ${value.accent.replace('text-', 'text-')}`} />
        </motion.div>
      </div>
    </motion.div>

    {/* Card Number Badge */}
    <motion.div
      className={`absolute -top-4 -left-4 w-8 h-8 ${value.gradient} rounded-full flex items-center justify-center shadow-lg`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.1 + 0.8, duration: 0.5, ease: "backOut" }}
    >
      <span className="text-white text-sm font-bold">{index + 1}</span>
    </motion.div>
  </motion.div>
));

const FloatingElement = memo(({ delay, position }: { delay: number; position: { x: string; y: string } }) => (
  <motion.div
    className="absolute w-3 h-3 bg-gradient-primary rounded-full opacity-20"
    style={{ left: position.x, top: position.y }}
    variants={floatingVariants}
    animate="animate"
    transition={{ delay }}
  />
));

export default function ValueSection(): JSX.Element {
  const values: ValueType[] = useMemo(() => [
    {
      title: "Art",
      subtitle: "Seni & Ekspresi",
      icon: Paintbrush,
      gradient: "bg-gradient-to-br from-accent-orange-400 to-accent-orange-600",
      bgGradient: "from-accent-orange-50 to-accent-orange-100",
      description: "Mengembangkan kreativitas melalui berbagai medium seni dan budaya visual yang menginspirasi",
      accent: "text-accent-orange-600"
    },
    {
      title: "Creative",
      subtitle: "Inovasi Kreatif",
      icon: Sparkles,
      gradient: "bg-gradient-primary",
      bgGradient: "from-primary-50 to-primary-100",
      description: "Mendorong solusi inovatif dan pemikiran out-of-the-box untuk tantangan urban",
      accent: "text-primary-600"
    },
    {
      title: "Culture",
      subtitle: "Budaya Lokal",
      icon: Landmark,
      gradient: "bg-gradient-to-br from-amber-400 to-yellow-500",
      bgGradient: "from-amber-50 to-yellow-100",
      description: "Melestarikan warisan budaya sambil mengembangkan identitas kontemporer",
      accent: "text-amber-600"
    },
    {
      title: "Tourism",
      subtitle: "Pariwisata",
      icon: Globe,
      gradient: "bg-gradient-to-br from-accent-blue-400 to-accent-blue-600",
      bgGradient: "from-accent-blue-50 to-accent-blue-100",
      description: "Membangun destinasi wisata berkelanjutan yang membanggakan komunitas lokal",
      accent: "text-accent-blue-600"
    },
    {
      title: "Sustain",
      subtitle: "Berkelanjutan",
      icon: Leaf,
      gradient: "bg-gradient-secondary",
      bgGradient: "from-secondary-50 to-secondary-100",
      description: "Menciptakan dampak positif jangka panjang untuk generasi mendatang",
      accent: "text-secondary-600"
    },
    {
      title: "Support",
      subtitle: "Dukungan Sosial",
      icon: HeartHandshake,
      gradient: "bg-gradient-to-br from-rose-400 to-pink-600",
      bgGradient: "from-rose-50 to-pink-100",
      description: "Membangun jaringan dukungan yang kuat dan inklusif untuk semua",
      accent: "text-rose-600"
    },
  ], []);

  const floatingElements = useMemo(() => [
    { delay: 0, position: { x: "15%", y: "20%" } },
    { delay: 1, position: { x: "85%", y: "25%" } },
    { delay: 2, position: { x: "10%", y: "60%" } },
    { delay: 0.5, position: { x: "90%", y: "70%" } },
    { delay: 1.5, position: { x: "20%", y: "80%" } },
    { delay: 2.5, position: { x: "80%", y: "15%" } },
  ], []);

  return (
    <section className="relative bg-gradient-hero py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />

        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-orange-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 1 }}
          style={{ willChange: "transform, opacity" }}
        />

        {/* Floating Elements */}
        {floatingElements.map((element, index) => (
          <FloatingElement key={index} delay={element.delay} position={element.position} />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(20,184,166,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(234,179,8,0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-6 py-3 shadow-soft mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-primary-500" />
            </motion.div>
            <span className="text-sm font-bold text-foreground-secondary">6 Pilar Fondasi</span>
            <motion.div 
              className="w-2 h-2 bg-secondary-500 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span 
              className="block bg-gradient-primary bg-clip-text text-transparent relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Nilai-Nilai
            </motion.span>
            <motion.span 
              className="block text-foreground mt-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Bangunkota
            </motion.span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Enam pilar fundamental yang menginspirasi setiap{" "}
            <span className="text-primary-600 font-semibold">inisiatif kolaboratif</span>{" "}
            dan{" "}
            <span className="text-secondary-600 font-semibold">gerakan transformatif</span>{" "}
            kami di Kota Bekasi
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.p 
            className="text-lg md:text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Bergabunglah dengan ekosistem komunitas yang{" "}
            <span className="text-primary-600 font-semibold">mengimplementasikan nilai-nilai ini</span>{" "}
            dalam aksi nyata setiap hari
          </motion.p>
          
          {/* CTA Button */}
          <motion.button 
            className="group relative inline-flex items-center gap-3 bg-gradient-primary text-white font-bold px-8 py-4 rounded-2xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">Mari Berkolaborasi</span>
            <motion.div 
              className="relative z-10"
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <HeartHandshake className="w-5 h-5" />
            </motion.div>
            
            {/* Button Background Animation */}
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
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

ValueCard.displayName = 'ValueCard';
FloatingElement.displayName = 'FloatingElement';