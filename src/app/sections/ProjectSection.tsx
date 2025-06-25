import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Users, Target, Leaf, Palette } from "lucide-react";
import { memo, useMemo } from "react";

// Types
interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  impact: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  participants?: string;
}

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
    scale: 0.95,
    rotateX: 10 
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
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    rotateY: 2,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
  hover: {
    rotate: 360,
    scale: 1.2,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-5, 5, -5],
    x: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

// Enhanced project data
const projects: Project[] = [
  {
    title: "Ruang Intervensi Publik",
    description: "Kolaborasi dengan seniman lokal untuk menghidupkan ruang publik lewat mural, instalasi, dan aktivasi komunitas yang berkelanjutan.",
    image: "https://unsplash.com/photos/an-empty-room-with-white-walls-and-a-painting-on-the-wall-zo2NPUiWbNY",
    category: "Seni & Budaya",
    impact: "15 Lokasi Teraktivasi",
    participants: "50+ Seniman",
    icon: <Palette className="w-5 h-5" />,
    gradient: "bg-gradient-to-br from-accent-orange-400 to-accent-orange-600",
    borderColor: "border-accent-orange-200 hover:border-accent-orange-400",
  },
  {
    title: "Festival Komunitas",
    description: "Perayaan lintas minat di mana puluhan komunitas berbagi karya, gagasan, dan ekspresi dalam satu panggung besar.",
    image: "https://images.unsplash.com/photo-1652381210069-2e4b639b3585?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Event & Kolaborasi",
    impact: "5K+ Pengunjung",
    participants: "60+ Komunitas",
    icon: <Users className="w-5 h-5" />,
    gradient: "bg-gradient-to-br from-primary-400 to-primary-600",
    borderColor: "border-primary-200 hover:border-primary-400",
  },
  {
    title: "Sadar Lingkungan",
    description: "Aksi kolaboratif bersih-bersih dan edukasi daur ulang bersama warga untuk menciptakan lingkungan yang lebih sehat.",
    image: "https://images.unsplash.com/photo-1654441000599-6d8b83387baf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Lingkungan",
    impact: "12 Ton Sampah",
    participants: "200+ Relawan",
    icon: <Leaf className="w-5 h-5" />,
    gradient: "bg-gradient-to-br from-secondary-400 to-secondary-600",
    borderColor: "border-secondary-200 hover:border-secondary-400",
  },
];

// Memoized project card component
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => (
  <motion.div
    variants={itemVariants}
    whileHover="hover"
    className="group relative"
  >
    <motion.div
      variants={cardHoverVariants}
      className={`relative bg-white rounded-3xl shadow-soft hover:shadow-xl border-2 ${project.borderColor} transition-all duration-500 overflow-hidden`}
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <motion.div 
          className={`flex items-center gap-2 ${project.gradient} text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm`}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div variants={iconVariants}>
            {project.icon}
          </motion.div>
          {project.category}
        </motion.div>
      </div>

      {/* Impact Badge */}
      <div className="absolute top-4 right-4 z-20">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm border border-brand-gray-200 text-brand-gray-700 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3 
            }}
            className="inline-block mr-1"
          >
            <Target className="w-4 h-4 inline" />
          </motion.div>
          {project.impact}
        </motion.div>
      </div>

      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <motion.div
          variants={imageVariants}
          className="w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-all duration-700 group-hover:saturate-110"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Shimmer Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
          variants={shimmerVariants}
          initial="initial"
          whileHover="animate"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <motion.h3 
            className="text-xl font-bold text-foreground group-hover:text-primary-600 transition-colors duration-300"
            layoutId={`title-${index}`}
          >
            {project.title}
          </motion.h3>
          
          <motion.div
            className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 45 }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>

        <motion.p 
          className="text-foreground-secondary leading-relaxed"
          layoutId={`description-${index}`}
        >
          {project.description}
        </motion.p>

        {/* Participants Info */}
        {project.participants && (
          <motion.div 
            className="flex items-center gap-2 text-sm text-brand-gray-600"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Users className="w-4 h-4" />
            <span className="font-medium">{project.participants}</span>
          </motion.div>
        )}

        {/* Interactive Progress Bar */}
        <div className="pt-2">
          <motion.div 
            className="h-1 bg-brand-gray-100 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div 
              className={`h-full ${project.gradient} rounded-full`}
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Floating Sparkles */}
      <motion.div
        className="absolute -top-2 -right-2 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        variants={floatingVariants}
        animate="animate"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
    </motion.div>
  </motion.div>
));

const ProjectSection = memo(() => {
  const memoizedProjects = useMemo(() =>
    projects.map((project, idx) => (
      <ProjectCard key={project.title} project={project} index={idx} />
    )), []
  );

  return (
    <section id="projects" className="relative bg-gradient-to-b from-background to-brand-gray-50/50 py-20 lg:py-32 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-32 w-96 h-96 bg-accent-blue-300/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.6, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -right-32 w-80 h-80 bg-primary-300/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.4, 0.7, 0.4],
            x: [0, -15, 0],
            y: [0, 10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary-300/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(20,184,166,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft mb-6"
            variants={titleVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Dampak Kolaborasi Nyata
            </span>
          </motion.div>

          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6"
          >
            <span className="block">Proyek</span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Kolaboratif
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed"
            variants={titleVariants}
          >
            Bersama-sama kita ciptakan perubahan nyata melalui kolaborasi lintas komunitas 
            yang menghadirkan{" "}
            <span className="text-primary-600 font-semibold">dampak berkelanjutan</span>{" "}
            bagi Kota Bekasi.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {memoizedProjects}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <div className="group relative inline-flex items-center gap-3 bg-gradient-secondary text-white font-bold px-8 py-4 rounded-2xl shadow-turquoise hover:shadow-yellow transition-all duration-300 overflow-hidden cursor-pointer">
              <span className="relative z-10">Lihat Semua Proyek</span>
              <motion.div 
                className="relative z-10"
                animate={{ x: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-primary"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

ProjectCard.displayName = 'ProjectCard';
ProjectSection.displayName = 'ProjectSection';

export default ProjectSection;