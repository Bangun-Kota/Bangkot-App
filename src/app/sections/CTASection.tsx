import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, Zap, Heart } from "lucide-react";

const floatingIcons = [
  { icon: <Sparkles className="w-6 h-6" />, delay: 0, x: "10%", y: "20%" },
  { icon: <Users className="w-8 h-8" />, delay: 1, x: "80%", y: "30%" },
  { icon: <Zap className="w-5 h-5" />, delay: 2, x: "15%", y: "70%" },
  { icon: <Heart className="w-7 h-7" />, delay: 1.5, x: "85%", y: "75%" },
];

const particleVariants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 180, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut" as const,
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
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

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-24 lg:py-32 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Icons */}
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
          className="text-white/20 hover:text-white/40 transition-colors duration-300"
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white/90">
              Bergabung dengan 10,000+ Anggota
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight"
          >
            Yuk{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Gabung
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 rounded-full origin-left"
              />
            </span>
            <br />
            <span className="text-white">
              & Bangun Kota{" "}
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                className="inline-block"
              >
                Bareng! 🚀
              </motion.span>
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Jadi bagian dari{" "}
            <span className="text-yellow-300 font-semibold">ekosistem komunitas lintas minat</span>{" "}
            yang kolaboratif, kreatif, dan berdampak.{" "}
            <span className="text-pink-300 font-semibold">Saatnya bergerak bareng!</span>
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: <Users className="w-4 h-4" />, text: "Komunitas Aktif" },
              { icon: <Zap className="w-4 h-4" />, text: "Program Menarik" },
              { icon: <Heart className="w-4 h-4" />, text: "Dampak Nyata" },
              { icon: <Sparkles className="w-4 h-4" />, text: "Networking" }
            ].map((feature) => (
              <motion.div
                key={feature.text}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/90 text-sm font-medium"
              >
                {feature.icon}
                {feature.text}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/authentication/sign-in"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 text-black font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Gabung Komunitas</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
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
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300"
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

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>+10,000 anggota aktif dari berbagai komunitas</span>
            </div>
            
            <div className="flex items-center gap-1 text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: star * 0.1 }}
                  viewport={{ once: true }}
                >
                  ⭐
                </motion.div>
              ))}
              <span className="text-white/80 text-sm ml-2">4.9/5 rating komunitas</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-auto"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}