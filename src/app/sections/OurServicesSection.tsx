import { motion } from "framer-motion";
import {
  Users,
  Megaphone,
  Layers,
  Home,
  MessageSquareHeart,
  Sparkles,
  ArrowRight,
  Star,
  Zap
} from "lucide-react";
import { memo, useMemo } from "react";

// Types
interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  delay: number;
}

interface FloatingElement {
  icon: React.ReactNode;
  x: string;
  y: string;
  delay: number;
  size: string;
}

// Static data
const services: Service[] = [
  {
    title: "Ruang Kolaboratif",
    description:
      "Akses gratis ke backspace untuk kegiatan komunitas seperti workshop, pameran, atau diskusi terbuka.",
    icon: Home,
    color: "text-primary-600",
    gradient: "bg-gradient-to-br from-primary-50 to-primary-100",
    delay: 0.1
  },
  {
    title: "Pendampingan Program",
    description:
      "Bantuan dalam merancang, mempublikasikan, dan merealisasikan program sosial, budaya, atau edukatif.",
    icon: Layers,
    color: "text-secondary-600",
    gradient: "bg-gradient-to-br from-secondary-50 to-secondary-100",
    delay: 0.2
  },
  {
    title: "Promosi & Media Partner",
    description:
      "Bantu publikasi kegiatan komunitas melalui kanal Bangunkota (website, IG, WhatsApp group).",
    icon: Megaphone,
    color: "text-accent-orange-600",
    gradient: "bg-gradient-to-br from-accent-orange-50 to-accent-orange-100",
    delay: 0.3
  },
  {
    title: "Jejaring Komunitas",
    description:
      "Terhubung dengan puluhan komunitas lintas bidang untuk kolaborasi antar sektor dan saling dukung.",
    icon: Users,
    color: "text-accent-blue-600",
    gradient: "bg-gradient-to-br from-accent-blue-50 to-accent-blue-100",
    delay: 0.4
  },
  {
    title: "Komunikasi Terpusat",
    description:
      "Gabung forum digital untuk diskusi rutin, pengumuman event, dan koordinasi program lintas komunitas.",
    icon: MessageSquareHeart,
    color: "text-accent-pink-600",
    gradient: "bg-gradient-to-br from-accent-pink-50 to-accent-pink-100",
    delay: 0.5
  },
];

const floatingElements: FloatingElement[] = [
  { icon: <Star />, x: "10%", y: "15%", delay: 0, size: "w-5 h-5" },
  { icon: <Sparkles />, x: "85%", y: "20%", delay: 1, size: "w-6 h-6" },
  { icon: <Zap />, x: "15%", y: "75%", delay: 2, size: "w-4 h-4" },
  { icon: <Users />, x: "90%", y: "80%", delay: 1.5, size: "w-5 h-5" }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
    opacity: [0.2, 0.4, 0.2],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

const cardVariants = {
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Memoized components
const ServiceCard = memo(({ service, index }: { service: Service; index: number }) => (
  <motion.div
    variants={itemVariants}
    whileHover="hover"
    className="group relative bg-background/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-brand-gray-200 hover:border-primary-300 transition-all duration-500 p-8 overflow-hidden"
  >
    {/* Background gradient overlay */}
    <div className={`absolute inset-0 ${service.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
    
    {/* Content */}
    <div className="relative z-10">
      {/* Icon container */}
      <motion.div
        className={`inline-flex items-center justify-center w-16 h-16 ${service.gradient} rounded-2xl mb-6 shadow-soft`}
        whileHover={{ 
          rotate: 360,
          scale: 1.1
        }}
        transition={{ duration: 0.6 }}
      >
        <service.icon className={`w-8 h-8 ${service.color}`} />
      </motion.div>

      {/* Title */}
      <motion.h3 
        className="text-xl font-bold text-foreground mb-4 group-hover:text-primary-700 transition-colors duration-300"
        variants={itemVariants}
      >
        {service.title}
      </motion.h3>

      {/* Description */}
      <motion.p 
        className="text-foreground-secondary leading-relaxed mb-6"
        variants={itemVariants}
      >
        {service.description}
      </motion.p>

      {/* Learn more link */}
      <motion.div 
        className={`inline-flex items-center gap-2 ${service.color} font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300`}
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <span>Pelajari lebih lanjut</span>
        <motion.div
          animate={{ x: [0, 3, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>

    {/* Decorative elements */}
    <motion.div 
      className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <service.icon className="w-16 h-16" />
    </motion.div>
  </motion.div>
));

const FloatingElement = memo(({ element }: { element: FloatingElement }) => (
  <motion.div
    className="absolute text-brand-gray-400 hover:text-primary-500 transition-colors duration-300"
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
    <div className={element.size}>
      {element.icon}
    </div>
  </motion.div>
));

const OurServicesSection = memo(() => {
  // Memoized elements
  const memoizedServices = useMemo(() => 
    services.map((service, idx) => (
      <ServiceCard key={service.title} service={service} index={idx} />
    )), []
  );

  const memoizedFloatingElements = useMemo(() =>
    floatingElements.map((element, idx) => (
      <FloatingElement key={idx} element={element} />
    )), []
  );

  return (
    <section id="services" className="relative bg-gradient-to-br from-background via-background-secondary to-background py-20 lg:py-28 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-80 h-80 bg-primary-300/15 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-300/12 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-orange-300/10 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 4 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Floating Elements */}
      {memoizedFloatingElements}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,179,8,0.03),transparent_50%)]" />

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-secondary-200 rounded-full px-4 py-2 shadow-soft mb-6"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-4 h-4 text-secondary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Layanan Terbaik untuk Komunitas
            </span>
            <motion.div 
              className="w-2 h-2 bg-primary-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6"
            variants={itemVariants}
          >
            <span className="text-foreground">Layanan untuk</span><br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Komunitas
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Kami menyediakan{" "}
            <span className="text-primary-600 font-semibold">ekosistem lengkap</span>{" "}
            untuk mendukung{" "}
            <span className="text-secondary-600 font-semibold">pertumbuhan komunitas</span>{" "}
            dan mewujudkan{" "}
            <span className="text-accent-orange-600 font-semibold">program impactful</span>{" "}
            di Kota Bekasi.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {memoizedServices}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.button
              className="group relative inline-flex items-center gap-3 bg-gradient-primary text-white font-bold px-8 py-4 rounded-2xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Mulai Berkolaborasi</span>
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
            </motion.button>

            <motion.button
              className="group inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border-2 border-accent-orange-300 text-accent-orange-700 font-semibold px-6 py-3 rounded-xl hover:bg-accent-orange-50 hover:border-accent-orange-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Detail Layanan
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
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg
          viewBox="0 0 1200 100"
          fill="none"
          className="w-full h-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.path
            d="M0,50 C300,100 900,0 1200,50 L1200,100 L0,100 Z"
            fill="url(#servicesGradient)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <defs>
            <linearGradient id="servicesGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(20,184,166,0.08)" />
              <stop offset="50%" stopColor="rgba(234,179,8,0.12)" />
              <stop offset="100%" stopColor="rgba(251,146,60,0.08)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </section>
  );
});

ServiceCard.displayName = 'ServiceCard';
FloatingElement.displayName = 'FloatingElement';
OurServicesSection.displayName = 'OurServicesSection';

export default OurServicesSection;