import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Users, Handshake, Star, Sparkles, Zap, Heart } from "lucide-react";
import { memo, useMemo } from "react";

type Partner = {
  name: string;
  logo: string;
  url: string;
  category: "tech" | "creative" | "government" | "community";
  description: string;
  featured?: boolean;
};

const partners: Partner[] = [
  {
    name: "Backspace Kranggan",
    logo: "https://images.unsplash.com/photo-1525425710160-a8ffcd3c2e8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://instagram.com/backspace.kranggan",
    category: "tech",
    description: "Tech Hub & Coworking Space",
    featured: true
  },
  {
    name: "Ruang Kolaborasi",
    logo: "/images/partners/ruangkolab.png",
    url: "#",
    category: "creative",
    description: "Creative Collaboration Space"
  },
  {
    name: "Dinas Pariwisata",
    logo: "/images/partners/pariwisata.png",
    url: "#",
    category: "government",
    description: "Government Tourism Agency"
  },
  {
    name: "Komunitas Kreatif Bekasi",
    logo: "/images/partners/komunitas.png",
    url: "#",
    category: "community",
    description: "Creative Community Network",
    featured: true
  },
];

// Selaras dengan theme color hero section
const categoryColors = {
  tech: "bg-gradient-primary",
  creative: "bg-gradient-secondary", 
  government: "bg-gradient-turquoise",
  community: "bg-gradient-yellow"
};

const categoryBorders = {
  tech: "border-primary-200",
  creative: "border-secondary-200", 
  government: "border-accent-blue-200",
  community: "border-accent-orange-200"
};

const categoryBgs = {
  tech: "bg-primary-50",
  creative: "bg-secondary-50", 
  government: "bg-accent-blue-50",
  community: "bg-accent-orange-50"
};

const categoryTexts = {
  tech: "text-primary-700",
  creative: "text-secondary-700", 
  government: "text-accent-blue-700",
  community: "text-accent-orange-700"
};

const categoryIcons = {
  tech: <Zap className="w-5 h-5" />,
  creative: <Heart className="w-5 h-5" />,
  government: <Users className="w-5 h-5" />,
  community: <Sparkles className="w-5 h-5" />
};

// Floating icons selaras dengan hero
const floatingIcons = [
  { icon: <Sparkles className="w-6 h-6" />, delay: 0, x: "8%", y: "15%" },
  { icon: <Users className="w-8 h-8" />, delay: 1, x: "85%", y: "25%" },
  { icon: <Zap className="w-5 h-5" />, delay: 2, x: "12%", y: "65%" },
  { icon: <Heart className="w-7 h-7" />, delay: 1.5, x: "88%", y: "70%" },
  { icon: <Handshake className="w-6 h-6" />, delay: 0.5, x: "92%", y: "10%" },
  { icon: <Star className="w-5 h-5" />, delay: 2.5, x: "3%", y: "40%" },
];

// Animation variants selaras dengan hero
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
      ease: [0.25, 0.46, 0.45, 0.94],
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
      ease: "easeInOut",
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
      ease: "easeInOut",
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
      ease: "easeOut",
    },
  },
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Memoized components
const FloatingIcon = memo(({ item, index }: { item: any; index: number }) => (
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

const StatCard = memo(({ stat, index }: { stat: any; index: number }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ 
      scale: 1.05,
      y: -4,
      transition: { duration: 0.2 }
    }}
    className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-primary-200 text-center overflow-hidden"
  >
    <motion.div
      className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-xl flex items-center justify-center text-white shadow-yellow"
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "linear",
        delay: index * 0.5 
      }}
    >
      {stat.icon}
    </motion.div>
    <motion.div 
      className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        delay: 0.3 + index * 0.1 
      }}
    >
      {stat.value}
    </motion.div>
    <div className="text-foreground-secondary font-medium">{stat.label}</div>
    
    {/* Shimmer effect */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
      variants={shimmerVariants}
      initial="initial"
      whileHover="animate"
    />
  </motion.div>
));

const PartnerCard = memo(({ partner, index }: { partner: Partner; index: number }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ 
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }}
    className="group relative"
  >
    {/* Featured Badge */}
    {partner.featured && (
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        viewport={{ once: true }}
        className="absolute -top-3 -right-3 z-10 bg-gradient-yellow text-white text-xs font-bold px-3 py-1 rounded-full shadow-yellow flex items-center gap-1"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-3 h-3" />
        </motion.div>
        Featured
      </motion.div>
    )}

    <motion.a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative bg-background/90 backdrop-blur-sm rounded-3xl p-8 shadow-soft hover:shadow-turquoise transition-all duration-500 border border-primary-100 overflow-hidden h-full group"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${categoryColors[partner.category]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
      
      {/* Category Badge */}
      <div className={`absolute top-4 left-4 flex items-center gap-2 ${categoryBgs[partner.category]} ${categoryBorders[partner.category]} ${categoryTexts[partner.category]} border backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium transition-all duration-300`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "linear",
            delay: index * 0.3 
          }}
        >
          {categoryIcons[partner.category]}
        </motion.div>
        <div className={`w-2 h-2 ${categoryColors[partner.category]} rounded-full`} />
      </div>

      {/* Logo Container */}
      <div className="relative mb-6 mt-12">
        <motion.div 
          className="w-24 h-24 mx-auto bg-background rounded-2xl flex items-center justify-center p-4 shadow-soft group-hover:shadow-yellow transition-all duration-300 border border-primary-100"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={partner.logo}
            alt={partner.name}
            width={80}
            height={80}
            className="object-contain max-w-full max-h-full filter group-hover:scale-110 transition-transform duration-300"
          />
        </motion.div>
        
        {/* Decorative Ring */}
        <motion.div 
          className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-200 transition-colors duration-300"
          whileHover={{ 
            boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)" 
          }}
        />
      </div>

      {/* Content */}
      <div className="text-center space-y-3">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary-600 transition-colors line-clamp-2">
          {partner.name}
        </h3>
        
        <p className="text-sm text-foreground-secondary leading-relaxed">
          {partner.description}
        </p>

        {/* Visit Link */}
        <motion.div 
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Kunjungi Partner
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <ExternalLink className="w-4 h-4 text-primary-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100/20 to-transparent rounded-full -translate-y-10 translate-x-10" />
      <motion.div 
        className={`absolute bottom-0 left-0 w-full h-1 ${categoryColors[partner.category]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        whileHover={{ scaleX: [0, 1] }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shimmer Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        variants={shimmerVariants}
        initial="initial"
        whileHover="animate"
      />
    </motion.a>
  </motion.div>
));

FloatingIcon.displayName = 'FloatingIcon';
StatCard.displayName = 'StatCard';
PartnerCard.displayName = 'PartnerCard';

export default function PartnershipSection() {
  const statsData = useMemo(() => [
    { icon: <Users className="w-6 h-6" />, label: "Partner Aktif", value: "15+" },
    { icon: <Handshake className="w-6 h-6" />, label: "Kolaborasi", value: "50+" },
    { icon: <Star className="w-6 h-6" />, label: "Project Bersama", value: "30+" }
  ], []);

  const memoizedFloatingIcons = useMemo(() => 
    floatingIcons.map((item, idx) => (
      <FloatingIcon key={idx} item={item} index={idx} />
    )), []
  );

  const memoizedStats = useMemo(() =>
    statsData.map((stat, idx) => (
      <StatCard key={stat.label} stat={stat} index={idx} />
    )), [statsData]
  );

  const memoizedPartners = useMemo(() =>
    partners.map((partner, idx) => (
      <PartnerCard key={partner.name} partner={partner} index={idx} />
    )), []
  );

  return (
    <section className="relative bg-gradient-hero text-foreground py-24 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
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
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Handshake className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Mitra & Kolaborator Strategis
            </span>
            <motion.div 
              className="w-2 h-2 bg-secondary-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            <span className="block relative inline-block">
              <span className="text-foreground">Bersama </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Membangun
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-primary rounded-full origin-left"
                variants={underlineVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </span>
            <span className="block text-foreground mt-2">Ekosistem</span>
          </h2>
          
          <motion.p 
            className="text-lg md:text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Kolaborasi strategis dengan berbagai pihak untuk menciptakan{" "}
            <span className="text-primary-600 font-semibold">dampak positif berkelanjutan</span>{" "}
            di ekosistem{" "}
            <span className="text-secondary-600 font-semibold">kreatif</span>{" "}
            dan{" "}
            <span className="text-accent-orange-500 font-semibold">inovatif</span>{" "}
            Kota Bekasi.
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
        >
          {memoizedStats}
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {memoizedPartners}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex flex-col items-center gap-6 bg-background/90 backdrop-blur-sm p-8 rounded-3xl shadow-soft border border-primary-200 max-w-md mx-auto overflow-hidden relative"
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-white text-2xl shadow-yellow"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              🤝
            </motion.div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Tertarik Berkolaborasi?
              </h3>
              <p className="text-foreground-secondary mb-6">
                Mari bergabung membangun ekosistem kreatif bersama
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-primary text-white font-bold px-8 py-4 rounded-2xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Hubungi Kami</span>
                
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
              </motion.button>
            </div>
            
            {/* Background decoration */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
              variants={shimmerVariants}
              initial="initial"
              whileHover="animate"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}