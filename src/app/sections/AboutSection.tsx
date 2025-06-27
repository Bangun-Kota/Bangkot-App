import { useState, memo, useMemo } from "react";
import { Sparkles, Users, Zap, Heart, MapPin, Calendar } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Types
interface FloatingElement {
  icon: React.ReactNode;
  delay: number;
  x: string;
  y: string;
}

interface StatItem {
  value: string;
  label: string;
  gradient: string;
  delay: number;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

// Static data moved outside component for performance
const floatingElements: FloatingElement[] = [
  { icon: <Sparkles className="w-6 h-6" />, delay: 0, x: "10%", y: "20%" },
  { icon: <Users className="w-8 h-8" />, delay: 1, x: "80%", y: "30%" },
  { icon: <Zap className="w-5 h-5" />, delay: 2, x: "15%", y: "70%" },
  { icon: <Heart className="w-7 h-7" />, delay: 1.5, x: "85%", y: "75%" },
  { icon: <MapPin className="w-6 h-6" />, delay: 0.5, x: "90%", y: "15%" },
  { icon: <Calendar className="w-5 h-5" />, delay: 2.5, x: "5%", y: "45%" },
];

const stats: StatItem[] = [
  { value: "60+", label: "Komunitas Aktif", gradient: "bg-gradient-turquoise", delay: 1.5 },
  { value: "2019", label: "Tahun Berdiri", gradient: "bg-gradient-yellow", delay: 1.7 },
  { value: "10K+", label: "Anggota Terdaftar", gradient: "bg-gradient-blue", delay: 1.9 },
];

const features: Feature[] = [
  {
    icon: "🏛️",
    title: "Ruang Publik",
    description: "Menghidupkan dan mengoptimalkan ruang publik kota",
    gradient: "bg-gradient-to-br from-accent-blue-500 to-secondary-500"
  },
  {
    icon: "🎨",
    title: "Seni & Budaya",
    description: "Mengembangkan ekspresi kreatif dan pelestarian budaya",
    gradient: "bg-gradient-to-br from-primary-500 to-accent-orange-500"
  },
  {
    icon: "🌱",
    title: "Berkelanjutan",
    description: "Inisiatif ramah lingkungan untuk masa depan yang lebih baik",
    gradient: "bg-gradient-to-br from-secondary-500 to-accent-green-500"
  },
  {
    icon: "🤝",
    title: "Kolaborasi",
    description: "Mempertemukan beragam komunitas lintas bidang",
    gradient: "bg-gradient-to-br from-primary-500 to-accent-blue-500"
  }
];

const interactiveEmojis = ['🏛️', '🎨', '🌱'];

// Animation variants (consistent with hero section)
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
const FloatingElement = memo(({ item }: { item: FloatingElement; }) => (
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

const FeatureCard = memo(({ feature, isHovered, onHover, onLeave }: { 
  feature: Feature; 
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <motion.div
    className="group relative p-6 bg-background/80 backdrop-blur-sm border border-brand-gray-200 hover:border-primary-300 rounded-2xl hover:bg-background/90 transition-all duration-300 overflow-hidden cursor-pointer shadow-soft"
    variants={itemVariants}
    whileHover={{ 
      y: -12, 
      scale: 1.03,
      transition: { duration: 0.2 }
    }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    {/* Hover Gradient Background */}
    <motion.div 
      className={`absolute inset-0 ${feature.gradient} opacity-0`}
      animate={{ opacity: isHovered ? 0.05 : 0 }}
      transition={{ duration: 0.3 }}
    />
    
    <div className="relative z-10">
      <motion.div 
        className="text-4xl mb-4"
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? 10 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-foreground transition-colors">
        {feature.title}
      </h3>
      <p className="text-foreground-secondary text-sm leading-relaxed group-hover:text-foreground-secondary transition-colors">
        {feature.description}
      </p>
    </div>

    {/* Shimmer Effect */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/20 to-transparent"
      variants={shimmerVariants}
      initial="initial"
      whileHover="animate"
    />
  </motion.div>
));

const InteractiveCircle = memo(({ emoji, index }: { emoji: string; index: number }) => (
  <motion.div
    className="w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full shadow-soft flex items-center justify-center text-xl cursor-pointer border border-primary-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
    whileHover={{ 
      scale: 1.3, 
      rotate: 15,
      boxShadow: "0 0 25px rgba(234, 179, 8, 0.2)"
    }}
    whileTap={{ scale: 0.9 }}
    animate={{ 
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: index * 0.3,
        ease: "easeInOut"
      }
    }}
  >
    {emoji}
  </motion.div>
));

const AboutSection = memo(() => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Memoize expensive calculations
  const memoizedFloatingElements = useMemo(() => 
    floatingElements.map((item, idx) => (
      <FloatingElement key={idx} item={item} />
    )), []
  );

  const memoizedStats = useMemo(() =>
    stats.map((stat) => (
      <StatCard key={stat.label} stat={stat} />
    )), []
  );

  const memoizedFeatures = useMemo(() =>
    features.map((feature, idx) => (
      <FeatureCard 
        key={feature.title} 
        feature={feature} 
        isHovered={hoveredFeature === idx}
        onHover={() => setHoveredFeature(idx)}
        onLeave={() => setHoveredFeature(null)}
      />
    )), [hoveredFeature]
  );

  const memoizedInteractiveCircles = useMemo(() =>
    interactiveEmojis.map((emoji, idx) => (
      <InteractiveCircle key={emoji} emoji={emoji} index={idx} />
    )), []
  );

  return (
    <section 
      ref={ref}
      className="relative bg-gradient-hero text-foreground py-24 lg:py-32 overflow-hidden" 
      id="profile"
    >
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
      {memoizedFloatingElements}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_70%)]" />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">Tentang Kami</span>
            <motion.div 
              className="w-2 h-2 bg-secondary-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            <span className="relative inline-block">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Bangunkota
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-primary rounded-full origin-left"
                variants={underlineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
            Platform kolaborasi yang mempertemukan{" "}
            <span className="text-primary-600 font-semibold">komunitas lintas minat</span>{" "}
            untuk menciptakan{" "}
            <span className="text-secondary-600 font-semibold">perubahan nyata</span>{" "}
            di Kota Bekasi
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="space-y-6">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                Bangunkota adalah{" "}
                <span className="font-bold text-primary-600">ekosistem kolaborasi</span>{" "}
                yang mempertemukan lebih dari{" "}
                <span className="font-bold text-secondary-600">60 komunitas</span>{" "}
                dari berbagai bidang seperti pendidikan, lingkungan, seni, budaya, pariwisata, dan sosial.
              </p>
              
              <p className="text-lg text-foreground-secondary leading-relaxed">
                Sejak{" "}
                <span className="font-bold text-accent-blue-600">2019</span>, kami aktif 
                menghidupkan ruang publik kota melalui kegiatan komunitas, pameran, 
                workshop, dan inisiatif kreatif yang berkelanjutan.
              </p>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 max-w-3xl"
              variants={containerVariants}
            >
              {memoizedStats}
            </motion.div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div 
              className="relative p-8 bg-background/80 backdrop-blur-sm border border-brand-gray-200 rounded-3xl shadow-soft"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-primary rounded-full opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-secondary rounded-full opacity-60"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="text-center space-y-6">
                <motion.div 
                  className="text-4xl md:text-5xl font-black bg-gradient-primary bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  #KolaborasiKota
                </motion.div>
                
                <div className="text-foreground-secondary font-medium text-lg">
                  Bersama Membangun Masa Depan Kota
                </div>
                
                {/* Interactive Circles */}
                <div className="flex justify-center space-x-4 pt-4">
                  {memoizedInteractiveCircles}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {memoizedFeatures}
        </motion.div>
      </motion.div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#aboutGradient)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
          <defs>
            <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

FloatingElement.displayName = 'FloatingElement';
StatCard.displayName = 'StatCard';
FeatureCard.displayName = 'FeatureCard';
InteractiveCircle.displayName = 'InteractiveCircle';
AboutSection.displayName = 'AboutSection';

export default AboutSection;