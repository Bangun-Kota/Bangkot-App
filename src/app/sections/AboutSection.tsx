import { useState, memo, useMemo } from "react";
import { Sparkles, Users, Building, Zap, Heart, Star } from "lucide-react";
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
  number: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

// Static data moved outside component for performance
const floatingElements: FloatingElement[] = [
  { icon: <Building className="w-5 h-5" />, delay: 0, x: "15%", y: "25%" },
  { icon: <Heart className="w-6 h-6" />, delay: 1.5, x: "85%", y: "20%" },
  { icon: <Star className="w-4 h-4" />, delay: 2.5, x: "10%", y: "75%" },
  { icon: <Sparkles className="w-7 h-7" />, delay: 1, x: "90%", y: "80%" },
];

const stats: StatItem[] = [
  { 
    number: "60+", 
    label: "Komunitas", 
    color: "from-primary-400 to-primary-600", 
    icon: <Users className="w-5 h-5" /> 
  },
  { 
    number: "2019", 
    label: "Tahun Berdiri", 
    color: "from-secondary-400 to-secondary-600", 
    icon: <Building className="w-5 h-5" /> 
  },
  { 
    number: "10K+", 
    label: "Anggota Aktif", 
    color: "from-accent-blue-400 to-accent-blue-600", 
    icon: <Zap className="w-5 h-5" /> 
  },
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
    y: 30,
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut" as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-15, 15, -15],
    x: [-8, 8, -8],
    rotate: [0, 180, 360],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const orbVariants = {
  animate: (custom: number) => ({
    scale: [1, 1.3, 1],
    opacity: [0.2, 0.4, 0.2],
    rotate: custom % 2 === 0 ? [0, 180, 360] : [360, 180, 0],
    transition: {
      duration: 15 + custom * 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

const underlineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      delay: 0.8,
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

const pathVariants = {
  hidden: { 
    pathLength: 0, 
    opacity: 0 
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut" as const,
    },
  },
};

// Memoized components for performance
const FloatingElement = memo(({ item }: { item: FloatingElement; }) => (
  <motion.div
    className="absolute text-white/20 hover:text-white/40 transition-colors duration-300"
    style={{ 
      left: item.x,
      top: item.y,
      willChange: "transform, opacity",
    }}
    variants={floatingVariants}
    animate="animate"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: item.delay }}
    whileHover={{ 
      scale: 1.2,
      color: "rgba(255, 255, 255, 0.6)",
      transition: { duration: 0.2 }
    }}
  >
    {item.icon}
  </motion.div>
));

const StatCard = memo(({ stat, index }: { stat: StatItem; index: number }) => (
  <motion.div
    className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/15 cursor-pointer"
    variants={itemVariants}
    whileHover={{ 
      scale: 1.05, 
      y: -5,
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div 
      className="flex justify-center mb-2 text-white/60"
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "linear",
        delay: index * 0.5 
      }}
    >
      {stat.icon}
    </motion.div>
    <motion.div 
      className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        delay: 0.2 + index * 0.1 
      }}
    >
      {stat.number}
    </motion.div>
    <div className="text-sm font-semibold text-white/70">
      {stat.label}
    </div>
  </motion.div>
));

const FeatureCard = memo(({ feature, isHovered, onHover, onLeave }: { 
  feature: Feature; 
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => (
  <motion.div
    className="group relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 overflow-hidden cursor-pointer"
    variants={itemVariants}
    whileHover={{ 
      y: -12, 
      scale: 1.03,
      transition: { duration: 0.2 }
    }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    style={{ willChange: "transform" }}
  >
    {/* Hover Gradient Background */}
    <motion.div 
      className={`absolute inset-0 ${feature.gradient}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 0.1 : 0 }}
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
      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
        {feature.title}
      </h3>
      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
        {feature.description}
      </p>
    </div>

    {/* Shimmer Effect */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      variants={shimmerVariants}
      initial="initial"
      whileHover="animate"
    />
  </motion.div>
));

const InteractiveCircle = memo(({ emoji, index }: { emoji: string; index: number }) => (
  <motion.div
    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-xl cursor-pointer border border-white/30 hover:bg-white/30"
    whileHover={{ 
      scale: 1.3, 
      rotate: 15,
      boxShadow: "0 0 25px rgba(255,255,255,0.3)"
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
    stats.map((stat, idx) => (
      <StatCard key={stat.label} stat={stat} index={idx} />
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
      className="relative bg-gradient-to-br from-primary-900 via-secondary-800 to-accent-blue-900 py-24 lg:py-32 overflow-hidden" 
      id="profile"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large Gradient Orbs */}
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-primary-700/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          custom={0}
          style={{ willChange: "transform, opacity" }}
        />
        
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-secondary-500/20 to-secondary-700/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          custom={1}
          style={{ willChange: "transform, opacity" }}
        />

        <motion.div 
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-accent-blue-500/20 to-accent-blue-700/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          custom={2}
          style={{ 
            willChange: "transform, opacity",
            transform: "translate(-50%, -50%)"
          }}
        />
      </div>

      {/* Floating Icons */}
      {memoizedFloatingElements}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_70%)]" />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary-300" />
            </motion.div>
            <span className="text-sm font-semibold text-white/90">Tentang Kami</span>
            <motion.div 
              className="w-2 h-2 bg-secondary-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-400 via-accent-orange-400 to-secondary-400 bg-clip-text text-transparent">
                Bangunkota
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-primary-400 via-accent-orange-400 to-secondary-400 rounded-full origin-left"
                variants={underlineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Platform kolaborasi yang mempertemukan{" "}
            <span className="text-primary-300 font-semibold">komunitas lintas minat</span>{" "}
            untuk menciptakan{" "}
            <span className="text-secondary-300 font-semibold">perubahan nyata</span>{" "}
            di Kota Bekasi
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
                Bangunkota adalah{" "}
                <span className="font-bold text-primary-300">ekosistem kolaborasi</span>{" "}
                yang mempertemukan lebih dari{" "}
                <span className="font-bold text-secondary-300">60 komunitas</span>{" "}
                dari berbagai bidang seperti pendidikan, lingkungan, seni, budaya, pariwisata, dan sosial.
              </p>
              
              <p className="text-lg text-white/80 leading-relaxed">
                Sejak{" "}
                <span className="font-bold text-accent-blue-300">2019</span>, kami aktif 
                menghidupkan ruang publik kota melalui kegiatan komunitas, pameran, 
                workshop, dan inisiatif kreatif yang berkelanjutan.
              </p>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4"
              variants={containerVariants}
            >
              {memoizedStats}
            </motion.div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div 
              className="relative p-8 bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-orange-400 rounded-full opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-accent-orange-400 to-secondary-400 rounded-full opacity-60"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="text-center space-y-6">
                <motion.div 
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-400 via-accent-orange-400 to-secondary-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  #KolaborasiKota
                </motion.div>
                
                <div className="text-white/80 font-medium text-lg">
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

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <motion.svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-auto opacity-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.path
            d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
            fill="url(#aboutGradient)"
            variants={pathVariants}
          />
          <defs>
            <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234, 179, 8, 0.3)" />
              <stop offset="50%" stopColor="rgba(20, 184, 166, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
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