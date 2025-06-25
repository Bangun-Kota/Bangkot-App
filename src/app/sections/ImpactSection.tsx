import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Calendar, Heart, TrendingUp, Sparkles, Star, Zap } from "lucide-react";

const floatingElements = [
  { icon: <Star className="w-5 h-5" />, delay: 0, x: "12%", y: "20%" },
  { icon: <Sparkles className="w-6 h-6" />, delay: 1.5, x: "88%", y: "25%" },
  { icon: <Zap className="w-4 h-4" />, delay: 2.5, x: "8%", y: "75%" },
  { icon: <Heart className="w-7 h-7" />, delay: 1, x: "92%", y: "80%" },
];

const particleVariants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 180, 360],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

type Impact = {
  label: string;
  value: string;
  numericValue: number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  description: string;
};

const impacts: Impact[] = [
  { 
    label: "Komunitas Terlibat", 
    value: "60+", 
    numericValue: 60,
    icon: <Users className="w-8 h-8" />,
    color: "from-yellow-400 to-orange-500",
    gradient: "from-yellow-500/20 to-orange-500/20",
    description: "Komunitas aktif berkontribusi"
  },
  { 
    label: "Program & Event", 
    value: "150+", 
    numericValue: 150,
    icon: <Calendar className="w-8 h-8" />,
    color: "from-emerald-400 to-teal-500",
    gradient: "from-emerald-500/20 to-teal-500/20",
    description: "Event sukses terselenggara"
  },
  { 
    label: "Relawan Terlibat", 
    value: "500+", 
    numericValue: 500,
    icon: <Heart className="w-8 h-8" />,
    color: "from-pink-400 to-rose-500",
    gradient: "from-pink-500/20 to-rose-500/20",
    description: "Relawan yang berdedikasi"
  },
  { 
    label: "Peserta Tersentuh", 
    value: "10.000+", 
    numericValue: 10000,
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-cyan-400 to-blue-500",
    gradient: "from-cyan-500/20 to-blue-500/20",
    description: "Masyarakat terdampak positif"
  },
];

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(end * easeOutQuart));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, end, duration, isVisible]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
      mass: 1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100
    }
  }
};

export default function ImpactSection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-24 lg:py-32 overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Main Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.25, 0.45, 0.25]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Icons */}
      {floatingElements.map((item, idx) => (
        <motion.div
          key={idx}
          variants={particleVariants}
          animate="animate"
          style={{ 
            position: "absolute",
            left: item.x,
            top: item.y,
            animationDelay: `${item.delay}s`
          }}
          className="text-white/20 hover:text-white/40 transition-colors duration-300"
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Enhanced Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white/90">
                Dampak Nyata
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Prestasi{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Luar Biasa
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 rounded-full origin-left"
                />
              </span>
              <br />
              <span className="text-white">
                Bangunkota{" "}
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                  className="inline-block"
                >
                  🏆
                </motion.span>
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Pencapaian yang membanggakan dari perjalanan kami membangun{" "}
              <span className="text-yellow-300 font-semibold">ekosistem kreatif</span>{" "}
              dan memberdayakan{" "}
              <span className="text-pink-300 font-semibold">komunitas</span>{" "}
              di Kota Bekasi
            </p>
          </motion.div>

          {/* Enhanced Impact Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {impacts.map((impact, idx) => (
              <motion.div
                key={impact.label}
                variants={cardVariants}
                whileHover={{ 
                  y: -15,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                }}
                className="group relative"
              >
                {/* Enhanced Main Card */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 overflow-hidden">
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${impact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Enhanced Icon Container */}
                  <motion.div
                    whileHover={{ 
                      rotate: 360, 
                      scale: 1.1,
                      boxShadow: "0 0 30px rgba(255,255,255,0.3)"
                    }}
                    transition={{ duration: 0.8 }}
                    className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {impact.icon}
                    
                    {/* Enhanced floating particles */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 w-3 h-3 bg-white/50 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute -bottom-2 -left-2 w-2 h-2 bg-white/40 rounded-full"
                    />
                  </motion.div>

                  {/* Enhanced Counter */}
                  <div className="text-center mb-6 relative z-10">
                    <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-br ${impact.color} bg-clip-text text-transparent mb-3`}>
                      {impact.numericValue < 100 ? (
                        <CountUp end={impact.numericValue} />
                      ) : (
                        <CountUp end={impact.numericValue} />
                      )}
                      {impact.value.includes('+') ? '+' : ''}
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-white transition-colors">
                      {impact.label}
                    </h3>
                    
                    <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                      {impact.description}
                    </p>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.8, delay: idx * 0.2 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${impact.color} rounded-full relative`}
                    >
                      {/* Shimmer effect on progress bar */}
                      <motion.div
                        animate={{ x: [-20, 100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />
                    </motion.div>
                  </div>

                  {/* Enhanced Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-8 -translate-x-8" />

                  {/* Shimmer Effect */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileHover={{ x: 100, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </div>

                {/* Enhanced Floating Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br ${impact.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-white/20`}
                >
                  {idx + 1}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 text-white/60 text-sm font-medium">
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
              <span className="text-white/80">Dan masih terus bertumbuh...</span>
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="w-12 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
            
            {/* Additional animated elements */}
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map((dot) => (
                <motion.div
                  key={dot}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: dot * 0.3
                  }}
                  className="w-2 h-2 bg-white/40 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-auto"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            d="M0,60 C300,110 900,10 1200,60 L1200,120 L0,120 Z"
            fill="url(#impactGradient)"
          />
          <defs>
            <linearGradient id="impactGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251,191,36,0.3)" />
              <stop offset="50%" stopColor="rgba(236,72,153,0.3)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}