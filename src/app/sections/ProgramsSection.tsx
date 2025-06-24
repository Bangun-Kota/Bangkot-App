import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Users, Palette, MessageCircle } from "lucide-react";

type Program = {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
};

const programs: Program[] = [
  {
    title: "Workshop Komunitas",
    description: "Kelas-kelas kreatif dan pelatihan publik yang digagas oleh komunitas lintas minat di Kota Bekasi.",
    image: "https://plus.unsplash.com/premium_photo-1661690088942-d968065868d0?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-500 to-purple-600",
    gradient: "bg-gradient-to-br from-blue-50 to-purple-50"
  },
  {
    title: "Pameran & Instalasi",
    description: "Pameran seni, instalasi ruang publik, dan showcase hasil karya komunitas.",
    image: "https://images.unsplash.com/photo-1541665234574-8e72eb7cd028?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <Palette className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-600",
    gradient: "bg-gradient-to-br from-emerald-50 to-teal-50"
  },
  {
    title: "Talkshow & Diskusi",
    description: "Obrolan terbuka bareng komunitas dan praktisi seputar kota, budaya, dan isu sosial.",
    image: "https://images.unsplash.com/photo-1485231097004-9272d2b5b75d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tbXVuaXR5JTIwdGFsa3Nob3d8ZW58MHx8MHx8fDA%3D",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "from-orange-500 to-red-600",
    gradient: "bg-gradient-to-br from-orange-50 to-red-50"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
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

export default function ProgramsSection() {
  return (
    <section id="programs" className="relative bg-gradient-to-b from-slate-50 to-white py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase mb-4"
          >
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
            Program Unggulan
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Wujudkan{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Kreativitas
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-full origin-left"
              />
            </span>
            {" "}Bersama
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Bergabunglah dalam program-program inovatif yang menghubungkan komunitas, 
            mengembangkan talenta, dan membangun ekosistem kreatif di Kota Bekasi
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((program, idx) => (
            <motion.div
              key={program.title}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 ${program.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
              
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
                
                {/* Icon Badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`absolute top-4 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white shadow-lg backdrop-blur-sm`}
                >
                  {program.icon}
                </motion.div>

                {/* Floating Elements */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse delay-150" />
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-300" />
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">
                    {program.title}
                  </h3>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-sm">
                  {program.description}
                </p>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full mt-4 py-3 px-4 bg-gradient-to-r ${program.color} text-white font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg hover:shadow-xl`}
                >
                  Pelajari Lebih Lanjut
                </motion.button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Lihat Semua Program
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}