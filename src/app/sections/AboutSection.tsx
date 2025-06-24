import { motion } from "framer-motion";
import { Sparkles, Users, Building, Zap, Heart, Star } from "lucide-react";

const floatingElements = [
  { icon: <Building className="w-5 h-5" />, delay: 0, x: "15%", y: "25%" },
  { icon: <Heart className="w-6 h-6" />, delay: 1.5, x: "85%", y: "20%" },
  { icon: <Star className="w-4 h-4" />, delay: 2.5, x: "10%", y: "75%" },
  { icon: <Sparkles className="w-7 h-7" />, delay: 1, x: "90%", y: "80%" },
];

const particleVariants = {
  animate: {
    y: [-15, 15, -15],
    x: [-8, 8, -8],
    rotate: [0, 180, 360],
    transition: {
      duration: 10,
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

export default function AboutSection() {
  const stats = [
    { number: "60+", label: "Komunitas", color: "from-yellow-400 to-orange-500", icon: <Users className="w-5 h-5" /> },
    { number: "2019", label: "Tahun Berdiri", color: "from-pink-400 to-rose-500", icon: <Building className="w-5 h-5" /> },
    { number: "10K+", label: "Anggota Aktif", color: "from-cyan-400 to-blue-500", icon: <Zap className="w-5 h-5" /> },
  ];

  const features = [
    {
      icon: "🏛️",
      title: "Ruang Publik",
      description: "Menghidupkan dan mengoptimalkan ruang publik kota",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🎨",
      title: "Seni & Budaya",
      description: "Mengembangkan ekspresi kreatif dan pelestarian budaya",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🌱",
      title: "Berkelanjutan",
      description: "Inisiatif ramah lingkungan untuk masa depan yang lebih baik",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: "🤝",
      title: "Kolaborasi",
      description: "Mempertemukan beragam komunitas lintas bidang",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-24 lg:py-32 overflow-hidden" id="profile">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 18,
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
            duration: 20,
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

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white/90">Tentang Kami</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Bangunkota
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 rounded-full origin-left"
                />
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              Platform kolaborasi yang mempertemukan{" "}
              <span className="text-yellow-300 font-semibold">komunitas lintas minat</span>{" "}
              untuk menciptakan{" "}
              <span className="text-pink-300 font-semibold">perubahan nyata</span>{" "}
              di Kota Bekasi
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Side - Content */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              <div className="space-y-6">
                <p className="text-lg text-white/80 leading-relaxed">
                  Bangunkota adalah{" "}
                  <span className="font-bold text-yellow-300">ekosistem kolaborasi</span>{" "}
                  yang mempertemukan lebih dari{" "}
                  <span className="font-bold text-pink-300">60 komunitas</span>{" "}
                  dari berbagai bidang seperti pendidikan, lingkungan, seni, budaya, pariwisata, dan sosial.
                </p>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  Sejak{" "}
                  <span className="font-bold text-cyan-300">2019</span>, kami aktif 
                  menghidupkan ruang publik kota melalui kegiatan komunitas, pameran, 
                  workshop, dan inisiatif kreatif yang berkelanjutan.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="flex justify-center mb-2 text-white/60">
                      {stat.icon}
                    </div>
                    <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-sm font-semibold text-white/70">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Visual */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative p-8 bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-80" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full opacity-60" />
                
                <div className="text-center space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    #KolaborasiKota
                  </motion.div>
                  
                  <div className="text-white/80 font-medium text-lg">
                    Bersama Membangun Masa Depan Kota
                  </div>
                  
                  {/* Interactive Circles */}
                  <div className="flex justify-center space-x-4 pt-4">
                    {['🏛️', '🎨', '🌱'].map((emoji, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ 
                          scale: 1.3, 
                          rotate: 15,
                          boxShadow: "0 0 25px rgba(255,255,255,0.3)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-xl cursor-pointer border border-white/30 hover:bg-white/30 transition-all duration-300"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                }}
                className="group relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="text-4xl mb-4 transition-transform duration-300"
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
                  initial={{ x: -100, opacity: 0 }}
                  whileHover={{ x: 100, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-auto opacity-20"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
            d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
            fill="url(#aboutGradient)"
          />
          <defs>
            <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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