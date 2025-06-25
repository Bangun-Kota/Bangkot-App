import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo } from "react";
import { Play, Image as ImageIcon, FileText, ExternalLink, Sparkles, Camera, Video, Download } from "lucide-react";

type MediaItem = {
  title: string;
  description?: string;
  image: string;
  type?: "image" | "video" | "doc";
  url?: string;
  category?: string;
  date?: string;
};

const mediaItems: MediaItem[] = [
  {
    title: "Workshop Kolaborasi",
    description: "Dokumentasi workshop kreatif bersama komunitas lokal",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "image",
    category: "Workshop",
    date: "Desember 2024"
  },
  {
    title: "Poster Festival Komunitas",
    description: "Koleksi desain visual untuk acara tahunan",
    image: "https://images.unsplash.com/photo-1685967413455-62f8cab87410?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "image",
    category: "Design",
    date: "November 2024"
  },
  {
    title: "Dokumentasi Aksi Lingkungan",
    description: "Aksi nyata peduli lingkungan di Kota Bekasi",
    image: "/images/media/aksi-lingkungan.jpg",
    type: "image",
    category: "Lingkungan",
    date: "Oktober 2024"
  },
  {
    title: "Video Highlight 2024",
    description: "Rekap perjalanan komunitas sepanjang tahun",
    image: "/images/media/video-thumb.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    type: "video",
    category: "Video",
    date: "Desember 2024"
  },
  {
    title: "Panduan Komunitas",
    description: "Modul lengkap untuk pengembangan komunitas",
    image: "/images/media/guide-thumb.jpg",
    type: "doc",
    category: "Panduan",
    date: "September 2024"
  },
  {
    title: "Behind The Scenes",
    description: "Momen-momen tak terlupakan di balik layar",
    image: "/images/media/bts.jpg",
    type: "image",
    category: "BTS",
    date: "Agustus 2024"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
    rotateX: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const orbVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.2, 0.4, 0.2],
    x: [0, 20, 0],
    y: [0, -20, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

// Utility functions
const getTypeIcon = (type?: string) => {
  switch (type) {
    case "video":
      return <Video className="w-4 h-4" />;
    case "doc":
      return <FileText className="w-4 h-4" />;
    default:
      return <Camera className="w-4 h-4" />;
  }
};

const getTypeColor = (type?: string) => {
  switch (type) {
    case "video":
      return "bg-red-100 text-red-700 border-red-200";
    case "doc":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-green-100 text-green-700 border-green-200";
  }
};

// Memoized components
const MediaCard = memo(({ item, index }: { item: MediaItem; index: number }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ 
      scale: 1.02, 
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-turquoise border border-white/20 hover:border-primary-200 transition-all duration-500 overflow-hidden"
  >
    {/* Image Container */}
    <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
      <Image
        src={item.image}
        alt={item.title}
        layout="fill"
        objectFit="cover"
        className="group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Type indicator */}
      <motion.div 
        className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${getTypeColor(item.type)}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.5 }}
      >
        {getTypeIcon(item.type)}
        {item.category}
      </motion.div>
      
      {/* Play button for videos */}
      {item.type === "video" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.4)",
                "0 0 0 20px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg"
          >
            <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
          </motion.div>
        </motion.div>
      )}
      
      {/* External link indicator */}
      {item.url && (
        <motion.div 
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1, rotate: 15 }}
        >
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
            <ExternalLink className="w-4 h-4 text-primary-600" />
          </div>
        </motion.div>
      )}
    </div>
    
    {/* Content */}
    <div className="p-6 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
      </div>
      
      {item.description && (
        <p className="text-sm text-foreground-secondary line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-medium text-brand-gray-400 bg-brand-gray-50 px-2 py-1 rounded-lg">
          {item.date}
        </span>
        
        <motion.div
          className="flex items-center gap-1 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ x: 3 }}
        >
          <span className="text-xs font-medium">
            {item.type === "video" ? "Tonton" : item.type === "doc" ? "Unduh" : "Lihat"}
          </span>
          <ExternalLink className="w-3 h-3" />
        </motion.div>
      </div>
    </div>
    
    {/* Click target */}
    <motion.a
      href={item.url || "#"}
      target={item.url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="absolute inset-0 z-10"
      whileTap={{ scale: 0.98 }}
    />
  </motion.div>
));

const MediaSection = memo(() => {
  const memoizedMediaCards = useMemo(() =>
    mediaItems.map((item, idx) => (
      <MediaCard key={`${item.title}-${idx}`} item={item} index={idx} />
    )), []
  );

  return (
    <section id="media" className="relative bg-gradient-to-br from-background-secondary via-background to-background-secondary py-24 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Primary gradient orb */}
        <motion.div
          className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-accent-orange-300/20 to-primary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        
        {/* Secondary gradient orb */}
        <motion.div
          className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-tr from-secondary-300/20 to-accent-blue-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />
        
        {/* Tertiary small orb */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent-blue-300/15 rounded-full blur-2xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 4 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(20,184,166,0.03),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 space-y-6"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Galeri & Dokumentasi
            </span>
          </motion.div>

          {/* Main title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            <span className="block relative">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Media
              </span>
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              & Materi Komunitas
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Jelajahi koleksi dokumentasi, materi edukasi, dan momen-momen berharga dari{" "}
            <span className="text-primary-600 font-semibold">perjalanan komunitas</span>{" "}
            yang telah kita lalui bersama.
          </p>
        </motion.div>

        {/* Media Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {memoizedMediaCards}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.a
            href="/media"
            className="group inline-flex items-center gap-3 bg-gradient-secondary text-white font-bold px-8 py-4 rounded-2xl shadow-turquoise hover:shadow-yellow transition-all duration-300 overflow-hidden relative"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Lihat Semua Media</span>
            <motion.div 
              className="relative z-10"
              animate={{ x: [0, 3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.div>
            
            {/* Shimmer Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ 
                x: "100%",
                transition: { duration: 0.6, ease: "easeOut" }
              }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
});

MediaCard.displayName = 'MediaCard';
MediaSection.displayName = 'MediaSection';

export default MediaSection;