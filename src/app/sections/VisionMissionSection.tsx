import { motion } from "framer-motion";
import { CheckCircle, Eye, Target, Sparkles } from "lucide-react";

export default function VisionMissionSection() {
  const missions = [
    {
      text: "Mendorong kolaborasi lintas komunitas di Kota Bekasi",
      icon: "🤝",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      text: "Menumbuhkan rasa bangga terhadap budaya lokal",
      icon: "🏛️",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      text: "Mewujudkan pariwisata kota yang berkelanjutan",
      icon: "🌍",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      text: "Menghidupkan ruang publik dengan seni dan instalasi",
      icon: "🎨",
      gradient: "from-orange-500 to-red-500"
    },
    {
      text: "Menjembatani komunitas dan stakeholder pembentuk kota (Hexa Helix)",
      icon: "🌉",
      gradient: "from-indigo-500 to-purple-500"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-24 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
        />

        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            className="absolute w-4 h-4 bg-gradient-to-r from-white/20 to-cyan-400/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <Sparkles className="w-5 h-5 text-cyan-400 mr-2" />
            <span className="text-sm font-bold text-white">Visi & Misi</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Arah & Tujuan
            </span>
            <br />
            <span className="text-white/90">Bangunkota</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Vision Card */}
            <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-40" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-3xl" />
              
              <div className="relative z-10">
                {/* Icon Header */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg mb-6"
                >
                  <Eye className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
                  Visi
                </h3>
                
                <div className="space-y-4">
                  <p className="text-lg text-white/90 leading-relaxed">
                    Terciptanya <span className="font-bold text-cyan-300">sumber daya kreatif</span> dan 
                    <span className="font-bold text-blue-300"> ruang publik kota</span> yang berkualitas berbasis komunitas, 
                    dalam menumbuhkan <span className="font-bold text-purple-300">kebanggaan masyarakat</span> Kota Bekasi.
                  </p>
                  
                  {/* Vision Pillars */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {['Budaya', 'Seni', 'Kreativitas', 'Pariwisata', 'Keberlanjutan'].map((pillar, index) => (
                      <motion.span
                        key={pillar}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/80"
                      >
                        {pillar}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Mission Card */}
            <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-60" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-40" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl" />
              
              <div className="relative z-10">
                {/* Icon Header */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-6"
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-black text-white mb-8">
                  Misi
                </h3>
                
                {/* Mission List */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {missions.map((mission, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ x: 8, scale: 1.02 }}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      {/* Mission Icon */}
                      <div className="flex-shrink-0">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className={`w-12 h-12 bg-gradient-to-r ${mission.gradient} rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                        >
                          {mission.icon}
                        </motion.div>
                      </div>
                      
                      {/* Mission Text */}
                      <div className="flex-1">
                        <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                          {mission.text}
                        </p>
                        
                        {/* Progress Indicator */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: idx * 0.2 }}
                          viewport={{ once: true }}
                          className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden"
                        >
                          <motion.div
                            initial={{ x: "-100%" }}
                            whileInView={{ x: "0%" }}
                            transition={{ duration: 1.5, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className={`h-full bg-gradient-to-r ${mission.gradient} rounded-full`}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { number: "2019", label: "Tahun Berdiri", color: "from-cyan-400 to-blue-500" },
            { number: "60+", label: "Komunitas", color: "from-purple-400 to-pink-500" },
            { number: "5K+", label: "Member", color: "from-emerald-400 to-teal-500" },
            { number: "50+", label: "Program", color: "from-orange-400 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-white/70 font-medium text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}