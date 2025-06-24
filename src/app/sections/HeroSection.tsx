import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, Zap, Heart, MapPin, Calendar } from "lucide-react";

const floatingIcons = [
  { icon: <Sparkles className="w-6 h-6" />, delay: 0, x: "10%", y: "20%" },
  { icon: <Users className="w-8 h-8" />, delay: 1, x: "80%", y: "30%" },
  { icon: <Zap className="w-5 h-5" />, delay: 2, x: "15%", y: "70%" },
  { icon: <Heart className="w-7 h-7" />, delay: 1.5, x: "85%", y: "75%" },
  { icon: <MapPin className="w-6 h-6" />, delay: 0.5, x: "90%", y: "15%" },
  { icon: <Calendar className="w-5 h-5" />, delay: 2.5, x: "5%", y: "45%" },
];

const particleVariants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 180, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-foreground overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs using custom colors */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-300/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-blue-300/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Icons with theme colors */}
      {floatingIcons.map((item, idx) => (
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
          className="text-brand-gray-400 hover:text-primary-500 transition-colors duration-300"
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft"
          >
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-foreground-secondary">
              60+ Komunitas Aktif di Bekasi
            </span>
            <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight"
          >
            <span className="block">
              <span className="relative inline-block">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Bangunkota
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-primary rounded-full origin-left"
                />
              </span>
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">
              Hidupkan Kota{" "}
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="inline-block"
              >
                Bareng! 🚀
              </motion.span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
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
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: <Users className="w-4 h-4" />, text: "Komunitas Aktif", color: "border-secondary-200 bg-secondary-50 text-secondary-700" },
              { icon: <Zap className="w-4 h-4" />, text: "Program Menarik", color: "border-primary-200 bg-primary-50 text-primary-700" },
              { icon: <Heart className="w-4 h-4" />, text: "Dampak Nyata", color: "border-accent-orange-200 bg-accent-orange-50 text-accent-orange-700" },
              { icon: <Sparkles className="w-4 h-4" />, text: "Networking", color: "border-accent-blue-200 bg-accent-blue-50 text-accent-blue-700" }
            ].map((feature, idx) => (
              <motion.div
                key={feature.text}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 border backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${feature.color}`}
              >
                {feature.icon}
                {feature.text}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/join"
                className="group relative inline-flex items-center gap-3 bg-gradient-primary text-white font-bold px-8 py-4 rounded-2xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Gabung Komunitas</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shimmer Effect */}
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
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
                className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border-2 border-secondary-300 text-secondary-700 font-semibold px-6 py-3 rounded-xl hover:bg-secondary-50 hover:border-secondary-400 transition-all duration-300"
              >
                Lihat Program
                <motion.div
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8"
          >
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-turquoise bg-clip-text text-transparent mb-2"
              >
                60+
              </motion.div>
              <div className="text-foreground-secondary font-medium">Komunitas Aktif</div>
            </div>
            
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-yellow bg-clip-text text-transparent mb-2"
              >
                10K+
              </motion.div>
              <div className="text-foreground-secondary font-medium">Anggota Terdaftar</div>
            </div>
            
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.9 }}
                className="text-3xl md:text-4xl font-bold bg-gradient-blue bg-clip-text text-transparent mb-2"
              >
                50+
              </motion.div>
              <div className="text-foreground-secondary font-medium">Program Terlaksana</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-brand-gray-300 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-auto"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#themeGradient)"
          />
          <defs>
            <linearGradient id="themeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234,179,8,0.1)" />
              <stop offset="50%" stopColor="rgba(20,184,166,0.15)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}