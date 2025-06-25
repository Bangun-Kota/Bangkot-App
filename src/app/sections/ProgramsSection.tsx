import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Users, Palette, MessageCircle, Sparkles, Zap, Heart } from "lucide-react";
import { memo, useMemo } from "react";

// Types
interface Program {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  bgGradient: string;
  badge: string;
}

interface FloatingElement {
  icon: React.ReactNode;
  delay: number;
  x: string;
  y: string;
  color: string;
}

// Static data moved outside component for performance
const programs: Program[] = [
  {
    title: "Workshop Komunitas",
    description: "Kelas-kelas kreatif dan pelatihan publik yang digagas oleh komunitas lintas minat di Kota Bekasi.",
    image: "https://plus.unsplash.com/premium_photo-1661690088942-d968065868d0?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D",
    icon: <Users className="w-6 h-6" />,
    color: "from-primary-500 to-secondary-600",
    gradient: "bg-gradient-primary",
    bgGradient: "from-primary-50 to-secondary-50",
    badge: "Populer"
  },
  {
    title: "Pameran & Instalasi",
    description: "Pameran seni, instalasi ruang publik, dan showcase hasil karya komunitas.",
    image: "https://images.unsplash.com/photo-1541665234574-8e72eb7cd028?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <Palette className="w-6 h-6" />,
    color: "from-secondary-500 to-accent-blue-600",
    gradient: "bg-gradient-secondary",
    bgGradient: "from-secondary-50 to-accent-blue-50",
    badge: "Trending"
  },
  {
    title: "Talkshow & Diskusi",
    description: "Obrolan terbuka bareng komunitas dan praktisi seputar kota, budaya, dan isu sosial.",
    image: "https://images.unsplash.com/photo-1485231097004-9272d2b5b75d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tbXVuaXR5JTIwdGFsa3Nob3d8ZW58MHx8MHx8fDA%3D",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "from-accent-orange-500 to-accent-blue-600",
    gradient: "bg-gradient-turquoise",
    bgGradient: "from-accent-orange-50 to-accent-blue-50",
    badge: "Interaktif"
  },
];

const floatingElements: FloatingElement[] = [
  { icon: <Sparkles className="w-5 h-5" />, delay: 0, x: "5%", y: "15%", color: "text-primary-400" },
  { icon: <Zap className="w-6 h-6" />, delay: 1.5, x: "90%", y: "25%", color: "text-secondary-400" },
  { icon: <Heart className="w-4 h-4" />, delay: 2, x: "15%", y: "80%", color: "text-accent-orange-400" },
  { icon: <Users className="w-5 h-5" />, delay: 0.8, x: "85%", y: "70%", color: "text-accent-blue-400" },
];

// Animation variants matching hero section
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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
      duration: 0.8
    }
  }
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
    opacity: [0.2, 0.4, 0.2],
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

// Memoized components
const FloatingElement = memo(({ element }: { element: FloatingElement; }) => (
  <motion.div
    className={`absolute ${element.color} hover:text-primary-500 transition-colors duration-300`}
    style={{ 
      left: element.x,
      top: element.y,
    }}
    variants={floatingVariants}
    animate="animate"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: element.delay }}
    whileHover={{ 
      scale: 1.2,
      transition: { duration: 0.2 }
    }}
  >
    {element.icon}
  </motion.div>
));

const ProgramCard = memo(({ program, index }: { program: Program; index: number }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ 
      y: -12,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }}
    className="group relative bg-background/80 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-turquoise transition-all duration-500 overflow-hidden border border-brand-gray-200/50"
  >
    {/* Gradient Background Overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${program.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
    
    {/* Image Container */}
    <div className="relative h-56 w-full overflow-hidden">
      <Image
        src={program.image}
        alt={program.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 + index * 0.1 }}
        className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-primary-200 rounded-full px-3 py-1 text-xs font-semibold text-primary-700"
      >
        {program.badge}
      </motion.div>
      
      {/* Icon Badge */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white shadow-soft backdrop-blur-sm`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear",
            delay: index * 0.5 
          }}
        >
          {program.icon}
        </motion.div>
      </motion.div>

      {/* Floating Dots */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <motion.div 
          className="w-2 h-2 bg-white rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.div 
          className="w-2 h-2 bg-white/70 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div 
          className="w-2 h-2 bg-white/40 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>

    {/* Content */}
    <div className="relative p-6 space-y-4">
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary-700 transition-colors">
          {program.title}
        </h3>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 4 }}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ArrowRight className="w-5 h-5 text-foreground-secondary" />
        </motion.div>
      </div>
      
      <p className="text-foreground-secondary leading-relaxed text-sm">
        {program.description}
      </p>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full mt-4 py-3 px-4 ${program.gradient} text-white font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-soft hover:shadow-yellow overflow-hidden`}
      >
        <span className="relative z-10">Pelajari Lebih Lanjut</span>
        
        {/* Shimmer Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          variants={shimmerVariants}
          initial="initial"
          whileHover="animate"
        />
      </motion.button>
    </div>

    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <div className={`absolute bottom-0 left-0 w-full h-1 ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
  </motion.div>
));

const ProgramsSection = memo(() => {
  // Memoize expensive calculations
  const memoizedFloatingElements = useMemo(() => 
    floatingElements.map((element, idx) => (
      <FloatingElement key={idx} element={element} />
    )), []
  );

  const memoizedProgramCards = useMemo(() =>
    programs.map((program, idx) => (
      <ProgramCard key={program.title} program={program} index={idx} />
    )), []
  );

  return (
    <section id="programs" className="relative bg-gradient-hero text-foreground py-24 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-secondary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-primary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 1 }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/3 w-72 h-72 bg-accent-orange-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Floating Elements */}
      {memoizedFloatingElements}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.03),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-secondary-200 rounded-full px-4 py-2 shadow-soft mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-secondary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Program Unggulan Bangunkota
            </span>
            <motion.div 
              className="w-2 h-2 bg-primary-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Main Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6"
          >
            <span className="block">Wujudkan{" "}</span>
            <motion.span 
              className="block relative inline-block"
              variants={itemVariants}
            >
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Kreativitas
              </span>
              {/* Animated underline */}
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-secondary rounded-full origin-left"
                variants={underlineVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.span>
            <span className="block text-foreground mt-2">Bersama! ✨</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Bergabunglah dalam{" "}
            <span className="text-secondary-600 font-semibold">program-program inovatif</span>{" "}
            yang menghubungkan komunitas, mengembangkan{" "}
            <span className="text-primary-600 font-semibold">talenta</span>, dan membangun{" "}
            <span className="text-accent-orange-500 font-semibold">ekosistem kreatif</span>{" "}
            di Kota Bekasi
          </motion.p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {memoizedProgramCards}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="group relative inline-flex items-center gap-3 bg-gradient-primary text-white font-bold px-8 py-4 rounded-2xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Lihat Semua Program</span>
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
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg
          viewBox="0 0 1200 80"
          fill="none"
          className="w-full h-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.path
            d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z"
            fill="url(#programGradient)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <defs>
            <linearGradient id="programGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(20,184,166,0.1)" />
              <stop offset="50%" stopColor="rgba(234,179,8,0.15)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.1)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </section>
  );
});

FloatingElement.displayName = 'FloatingElement';
ProgramCard.displayName = 'ProgramCard';
ProgramsSection.displayName = 'ProgramsSection';

export default ProgramsSection;