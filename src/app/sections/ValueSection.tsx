import { motion } from "framer-motion";
import {
  Paintbrush,
  Sparkles,
  Landmark,
  Globe,
  Leaf,
  HeartHandshake,
} from "lucide-react";

export default function ValueSection() {
  const values = [
    {
      title: "Art",
      subtitle: "Seni & Ekspresi",
      icon: Paintbrush,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50",
      description: "Mengembangkan kreativitas melalui berbagai medium seni"
    },
    {
      title: "Creative",
      subtitle: "Inovasi Kreatif",
      icon: Sparkles,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      description: "Mendorong solusi inovatif untuk tantangan kota"
    },
    {
      title: "Culture",
      subtitle: "Budaya Lokal",
      icon: Landmark,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      description: "Melestarikan dan mengembangkan kekayaan budaya"
    },
    {
      title: "Tourism",
      subtitle: "Pariwisata",
      icon: Globe,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      description: "Membangun destinasi wisata yang berkelanjutan"
    },
    {
      title: "Sustain",
      subtitle: "Berkelanjutan",
      icon: Leaf,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      description: "Menciptakan dampak positif jangka panjang"
    },
    {
      title: "Support",
      subtitle: "Dukungan Sosial",
      icon: HeartHandshake,
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50",
      description: "Membangun jaringan dukungan yang kuat"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 mb-6"
          >
            <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="text-sm font-bold text-indigo-800">Nilai-Nilai Kami</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fondasi
            </span>
            <br />
            <span className="text-gray-800">Kolaborasi Kami</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enam pilar utama yang menjadi landasan setiap inisiatif dan program Bangunkota
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {values.map((value, idx) => (
            <motion.div
              key={value.title}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                rotate: [0, 1, -1, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative p-8 bg-gradient-to-br ${value.bgGradient} rounded-3xl shadow-lg border border-white/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500`}>
                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-white to-gray-100 rounded-full opacity-80" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-gray-100 to-white rounded-full opacity-60" />
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl`} />
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-4">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <div className={`text-sm font-semibold bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent mb-3`}>
                    {value.subtitle}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                  
                  {/* Progress Bar Animation */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden mt-6"
                  >
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ duration: 1.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${value.gradient} rounded-full`}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            Bergabunglah dengan kami untuk mewujudkan nilai-nilai ini dalam aksi nyata
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <HeartHandshake className="w-5 h-5 mr-2" />
            Mari Berkolaborasi
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}