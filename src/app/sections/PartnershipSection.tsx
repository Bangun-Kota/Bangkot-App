import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Users, Handshake, Star } from "lucide-react";

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

const categoryColors = {
  tech: "from-blue-500 to-cyan-500",
  creative: "from-purple-500 to-pink-500", 
  government: "from-emerald-500 to-green-500",
  community: "from-orange-500 to-red-500"
};

const categoryIcons = {
  tech: "💻",
  creative: "🎨",
  government: "🏛️",
  community: "👥"
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
    y: 40,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function PartnershipSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute bottom-20 left-1/3 w-24 h-24 bg-emerald-200/30 rounded-full blur-xl"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-6"
          >
            <Handshake className="w-5 h-5 text-blue-600" />
            Mitra & Kolaborator
            <Handshake className="w-5 h-5 text-purple-600" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Bersama{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Membangun
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full origin-left"
              />
            </span>
            {" "}Ekosistem
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Kolaborasi strategis dengan berbagai pihak untuk menciptakan dampak positif 
            yang berkelanjutan di ekosistem kreatif Kota Bekasi
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: <Users className="w-6 h-6" />, label: "Partner Aktif", value: "15+" },
            { icon: <Handshake className="w-6 h-6" />, label: "Kolaborasi", value: "50+" },
            { icon: <Star className="w-6 h-6" />, label: "Project Bersama", value: "30+" }
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              variants={cardVariants}
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
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                >
                  ⭐ Featured
                </motion.div>
              )}

              <motion.a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden h-full"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[partner.category]} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-lg">{categoryIcons[partner.category]}</span>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[partner.category]}`} />
                </div>

                {/* Logo Container */}
                <div className="relative mb-6 mt-8">
                  <div className="w-24 h-24 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center p-4 group-hover:bg-slate-100 transition-colors duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={80}
                      height={80}
                      className="object-contain max-w-full max-h-full filter group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Decorative Ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-slate-200 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-800 transition-colors line-clamp-2">
                    {partner.name}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Visit Link */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                    <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${categoryColors[partner.category]} bg-clip-text text-transparent`}>
                      Kunjungi Partner
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-10 translate-x-10" />
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${categoryColors[partner.category]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl shadow-xl border border-slate-200 max-w-md mx-auto"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl">
              🤝
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Tertarik Berkolaborasi?
              </h3>
              <p className="text-slate-600 mb-4">
                Mari bergabung membangun ekosistem kreatif bersama
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Hubungi Kami
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}