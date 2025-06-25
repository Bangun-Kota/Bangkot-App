import { CheckCircle, Eye, Target, Sparkles, Heart, Users, Zap, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

// Types
interface Mission {
  text: string;
  icon: string;
  gradient: string;
}

interface StatItem {
  number: string;
  label: string;
  color: string;
}

interface FloatingShape {
  x: string;
  y: string;
  size: string;
  delay: number;
  duration: number;
}

// Static data
const missions: Mission[] = [
  {
    text: "Mendorong kolaborasi lintas komunitas di Kota Bekasi",
    icon: "🤝",
    gradient: "from-brand-yellow to-brand-turquoise"
  },
  {
    text: "Menumbuhkan rasa bangga terhadap budaya lokal",
    icon: "🏛️",
    gradient: "from-brand-turquoise to-brand-blue"
  },
  {
    text: "Mewujudkan pariwisata kota yang berkelanjutan",
    icon: "🌍",
    gradient: "from-brand-blue to-accent-green-500"
  },
  {
    text: "Menghidupkan ruang publik dengan seni dan instalasi",
    icon: "🎨",
    gradient: "from-accent-orange-500 to-brand-yellow"
  },
  {
    text: "Menjembatani komunitas dan stakeholder pembentuk kota (Hexa Helix)",
    icon: "🌉",
    gradient: "from-brand-turquoise to-brand-blue"
  },
];

const stats: StatItem[] = [
  { number: "2019", label: "Tahun Berdiri", color: "from-brand-turquoise to-brand-blue" },
  { number: "60+", label: "Komunitas", color: "from-brand-yellow to-brand-turquoise" },
  { number: "5K+", label: "Member", color: "from-accent-green-500 to-brand-turquoise" },
  { number: "50+", label: "Program", color: "from-accent-orange-500 to-brand-yellow" },
];

const visionPillars = ['Budaya', 'Seni', 'Kreativitas', 'Pariwisata', 'Keberlanjutan'];

const floatingShapes: FloatingShape[] = [
  { x: "10%", y: "15%", size: "w-4 h-4", delay: 0, duration: 8 },
  { x: "85%", y: "25%", size: "w-3 h-3", delay: 1, duration: 10 },
  { x: "15%", y: "65%", size: "w-5 h-5", delay: 2, duration: 12 },
  { x: "90%", y: "70%", size: "w-4 h-4", delay: 1.5, duration: 9 },
  { x: "5%", y: "45%", size: "w-3 h-3", delay: 0.5, duration: 11 },
  { x: "80%", y: "55%", size: "w-4 h-4", delay: 2.5, duration: 8 },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    rotateY: -15
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const missionCardVariants = {
  hidden: { 
    opacity: 0, 
    x: 50,
    rotateY: 15
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

const orbVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.2, 0.4, 0.2],
    rotate: [0, 180, 360],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const progressVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

// Memoized components
const FloatingShape = memo(({ shape, index }: { shape: FloatingShape; index: number }) => (
  <motion.div
    className={`absolute ${shape.size} bg-gradient-to-r from-white/20 to-brand-turquoise/40 rounded-full`}
    style={{ 
      left: shape.x,
      top: shape.y,
    }}
    variants={floatingVariants}
    animate="animate"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ 
      delay: shape.delay,
      duration: shape.duration 
    }}
  />
));

const VisionCard = memo(() => (
  <motion.div
    className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden group"
    variants={cardVariants}
    whileHover={{ 
      scale: 1.02,
      rotateY: 2,
      transition: { duration: 0.3 }
    }}
  >
    {/* Decorative Elements */}
    <motion.div 
      className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-brand-turquoise to-brand-blue rounded-full opacity-60"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.8, 0.6] 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity 
      }}
    />
    <motion.div 
      className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-brand-yellow to-brand-turquoise rounded-full opacity-40"
      animate={{ 
        y: [-5, 5, -5],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Glow Effect */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-brand-turquoise/5 to-brand-blue/5 rounded-3xl"
      animate={{ 
        opacity: [0.5, 0.8, 0.5] 
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity 
      }}
    />
    
    <div className="relative z-10">
      {/* Icon Header */}
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-turquoise to-brand-blue rounded-2xl shadow-lg mb-6"
        whileHover={{ 
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
      >
        <Eye className="w-8 h-8 text-white" />
      </motion.div>
      
      <motion.h3 
        className="text-3xl md:text-4xl font-black text-white mb-6"
        variants={itemVariants}
      >
        Visi
      </motion.h3>
      
      <motion.div 
        className="space-y-4"
        variants={itemVariants}
      >
        <p className="text-lg text-white/90 leading-relaxed">
          Terciptanya <motion.span 
            className="font-bold text-brand-turquoise"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >sumber daya kreatif</motion.span> dan 
          <span className="font-bold text-brand-blue"> ruang publik kota</span> yang berkualitas berbasis komunitas, 
          dalam menumbuhkan <span className="font-bold text-brand-yellow">kebanggaan masyarakat</span> Kota Bekasi.
        </p>
        
        {/* Vision Pillars */}
        <motion.div 
          className="flex flex-wrap gap-2 pt-4"
          variants={containerVariants}
        >
          {visionPillars.map((pillar, index) => (
            <motion.span
              key={pillar}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/80 cursor-pointer"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.2)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {pillar}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
));

const MissionCard = memo(() => (
  <motion.div
    className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden group"
    variants={missionCardVariants}
    whileHover={{ 
      scale: 1.02,
      rotateY: -2,
      transition: { duration: 0.3 }
    }}
  >
    {/* Decorative Elements */}
    <motion.div 
      className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-brand-yellow to-brand-turquoise rounded-full opacity-60"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.8, 0.6] 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        delay: 0.5
      }}
    />
    <motion.div 
      className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-accent-green-500 to-brand-turquoise rounded-full opacity-40"
      animate={{ 
        y: [-5, 5, -5],
        rotate: [360, 180, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
    
    {/* Glow Effect */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-brand-yellow/5 to-brand-turquoise/5 rounded-3xl"
      animate={{ 
        opacity: [0.5, 0.8, 0.5] 
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity,
        delay: 0.5
      }}
    />
    
    <div className="relative z-10">
      {/* Icon Header */}
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-yellow to-brand-turquoise rounded-2xl shadow-lg mb-6"
        whileHover={{ 
          rotate: [0, 10, -10, 10, 0],
          transition: { duration: 0.5 }
        }}
      >
        <Target className="w-8 h-8 text-white" />
      </motion.div>
      
      <motion.h3 
        className="text-3xl md:text-4xl font-black text-white mb-8"
        variants={itemVariants}
      >
        Misi
      </motion.h3>
      
      {/* Mission List */}
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
      >
        {missions.map((mission, idx) => (
          <motion.div
            key={idx}
            className="group/item flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer"
            variants={itemVariants}
            whileHover={{ 
              x: 8,
              scale: 1.02,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: "rgba(255,255,255,0.2)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Mission Icon */}
            <div className="flex-shrink-0">
              <motion.div 
                className={`w-12 h-12 bg-gradient-to-r ${mission.gradient} rounded-xl flex items-center justify-center text-xl shadow-lg`}
                whileHover={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {mission.icon}
              </motion.div>
            </div>
            
            {/* Mission Text */}
            <div className="flex-1">
              <motion.p 
                className="text-white/90 leading-relaxed"
                whileHover={{ color: "rgba(255,255,255,1)" }}
              >
                {mission.text}
              </motion.p>
              
              {/* Progress Indicator */}
              <div className="h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${mission.gradient} rounded-full origin-left`}
                  variants={progressVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.div>
));

const StatCard = memo(({ stat, index }: { stat: StatItem; index: number }) => (
  <motion.div
    className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 group cursor-pointer"
    variants={itemVariants}
    whileHover={{ 
      y: -8,
      scale: 1.05,
      backgroundColor: "rgba(255,255,255,0.1)",
      borderColor: "rgba(255,255,255,0.2)",
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div 
      className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
      whileHover={{ 
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 }
      }}
    >
      {stat.number}
    </motion.div>
    <motion.div 
      className="text-white/70 font-medium text-sm"
      whileHover={{ color: "rgba(255,255,255,0.9)" }}
    >
      {stat.label}
    </motion.div>
  </motion.div>
));

const VisionMissionSection = memo(() => {
  // Memoized floating shapes
  const memoizedFloatingShapes = useMemo(() => 
    floatingShapes.map((shape, idx) => (
      <FloatingShape key={idx} shape={shape} index={idx} />
    )), []
  );

  const memoizedStats = useMemo(() =>
    stats.map((stat, idx) => (
      <StatCard key={stat.label} stat={stat} index={idx} />
    )), []
  );

  return (
    <section className="relative bg-gradient-to-br from-brand-gray-900 via-brand-blue to-brand-turquoise-dark py-24 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Orbs */}
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-brand-turquoise/20 to-brand-blue/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-brand-yellow/20 to-brand-turquoise/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />

        {/* Floating Geometric Shapes */}
        {memoizedFloatingShapes}

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.15)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-brand-turquoise mr-2" />
            </motion.div>
            <span className="text-sm font-bold text-white">Visi & Misi</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-black text-white mb-6"
            variants={itemVariants}
          >
            <motion.span 
              className="bg-gradient-to-r from-brand-turquoise via-brand-blue to-brand-yellow bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Arah & Tujuan
            </motion.span>
            <br />
            <span className="text-white/90">Bangunkota</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Vision Section */}
          <VisionCard />

          {/* Mission Section */}
          <MissionCard />
        </div>

        {/* Bottom Statistics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {memoizedStats}
        </motion.div>
      </motion.div>
    </section>
  );
});

FloatingShape.displayName = 'FloatingShape';
VisionCard.displayName = 'VisionCard';
MissionCard.displayName = 'MissionCard';
StatCard.displayName = 'StatCard';
VisionMissionSection.displayName = 'VisionMissionSection';

export default VisionMissionSection;