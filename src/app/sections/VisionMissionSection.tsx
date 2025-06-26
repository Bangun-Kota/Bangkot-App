import { Eye, Target, Sparkles } from "lucide-react";
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

// Static data - updated to match hero section style
const missions: Mission[] = [
  {
    text: "Mendorong kolaborasi lintas komunitas di Kota Bekasi",
    icon: "🤝",
    gradient: "bg-gradient-yellow"
  },
  {
    text: "Menumbuhkan rasa bangga terhadap budaya lokal",
    icon: "🏛️",
    gradient: "bg-gradient-turquoise"
  },
  {
    text: "Mewujudkan pariwisata kota yang berkelanjutan",
    icon: "🌍",
    gradient: "bg-gradient-blue"
  },
  {
    text: "Menghidupkan ruang publik dengan seni dan instalasi",
    icon: "🎨",
    gradient: "bg-gradient-primary"
  },
  {
    text: "Menjembatani komunitas dan stakeholder pembentuk kota (Hexa Helix)",
    icon: "🌉",
    gradient: "bg-gradient-secondary"
  },
];

const stats: StatItem[] = [
  { number: "2019", label: "Tahun Berdiri", color: "bg-gradient-turquoise" },
  { number: "60+", label: "Komunitas", color: "bg-gradient-yellow" },
  { number: "5K+", label: "Member", color: "bg-gradient-blue" },
  { number: "50+", label: "Program", color: "bg-gradient-primary" },
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

// Animation variants - matching hero section
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const cardVariants = {
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
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
};

const orbVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
};

const progressVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut" as const,
    },
  },
};

// Memoized components
const FloatingShape = memo(({ shape }: { shape: FloatingShape; }) => (
  <motion.div
    className={`absolute ${shape.size} bg-primary-300/20 rounded-full blur-sm`}
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
    className="relative p-8 bg-background/80 backdrop-blur-sm rounded-3xl border border-brand-gray-200 shadow-soft overflow-hidden group"
    variants={cardVariants}
    whileHover={{ 
      scale: 1.02,
      y: -4,
      transition: { duration: 0.3 }
    }}
  >
    {/* Decorative Elements - matching hero style */}
    <motion.div 
      className="absolute -top-4 -right-4 w-8 h-8 bg-primary-400/30 rounded-full"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3] 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity 
      }}
    />
    <motion.div 
      className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-400/30 rounded-full"
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
    
    <div className="relative z-10">
      {/* Icon Header - matching hero button style */}
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-yellow mb-6"
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
      >
        <Eye className="w-8 h-8 text-white" />
      </motion.div>
      
      <motion.h3 
        className="text-3xl md:text-4xl font-black text-foreground mb-6"
        variants={itemVariants}
      >
        Visi
      </motion.h3>
      
      <motion.div 
        className="space-y-4"
        variants={itemVariants}
      >
        <p className="text-lg text-foreground-secondary leading-relaxed">
          Terciptanya <motion.span 
            className="font-bold text-primary-600"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >sumber daya kreatif</motion.span> dan 
          <span className="font-bold text-secondary-600"> ruang publik kota</span> yang berkualitas berbasis komunitas, 
          dalam menumbuhkan <span className="font-bold text-accent-orange-500">kebanggaan masyarakat</span> Kota Bekasi.
        </p>
        
        {/* Vision Pillars - matching hero feature pills */}
        <motion.div 
          className="flex flex-wrap gap-2 pt-4"
          variants={containerVariants}
        >
          {visionPillars.map((pillar) => (
            <motion.span
              key={pillar}
              className="flex items-center gap-2 border backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer border-primary-200 bg-primary-50 text-primary-700"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -2,
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
    className="relative p-8 bg-background/80 backdrop-blur-sm rounded-3xl border border-brand-gray-200 shadow-soft overflow-hidden group"
    variants={cardVariants}
    whileHover={{ 
      scale: 1.02,
      y: -4,
      transition: { duration: 0.3 }
    }}
  >
    {/* Decorative Elements */}
    <motion.div 
      className="absolute -top-4 -left-4 w-8 h-8 bg-secondary-400/30 rounded-full"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3] 
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        delay: 0.5
      }}
    />
    <motion.div 
      className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary-400/30 rounded-full"
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
    
    <div className="relative z-10">
      {/* Icon Header */}
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-2xl shadow-turquoise mb-6"
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
      >
        <Target className="w-8 h-8 text-white" />
      </motion.div>
      
      <motion.h3 
        className="text-3xl md:text-4xl font-black text-foreground mb-8"
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
            className="group/item flex items-start gap-4 p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-brand-gray-100 cursor-pointer transition-all duration-300"
            variants={itemVariants}
            whileHover={{ 
              x: 8,
              scale: 1.02,
              y: -2,
              backgroundColor: "rgba(255,255,255,0.8)",
              borderColor: "rgba(156,163,175,0.3)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Mission Icon */}
            <div className="flex-shrink-0">
              <motion.div 
                className={`w-12 h-12 ${mission.gradient} bg-clip-text text-transparent rounded-xl flex items-center justify-center text-xl shadow-soft bg-background border border-brand-gray-100`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.3 }
                }}
                style={{
                  background: mission.gradient.includes('primary') ? 'linear-gradient(135deg, #EAB308, #14B8A6)' :
                             mission.gradient.includes('secondary') ? 'linear-gradient(135deg, #14B8A6, #3B82F6)' :
                             mission.gradient.includes('yellow') ? 'linear-gradient(135deg, #EAB308, #F59E0B)' :
                             mission.gradient.includes('turquoise') ? 'linear-gradient(135deg, #14B8A6, #06B6D4)' :
                             'linear-gradient(135deg, #3B82F6, #1D4ED8)'
                }}
              >
                <span className="text-white">{mission.icon}</span>
              </motion.div>
            </div>
            
            {/* Mission Text */}
            <div className="flex-1">
              <motion.p 
                className="text-foreground-secondary leading-relaxed"
                whileHover={{ color: "rgba(17,24,39,1)" }}
              >
                {mission.text}
              </motion.p>
              
              {/* Progress Indicator */}
              <div className="h-1 bg-brand-gray-200 rounded-full mt-3 overflow-hidden">
                <motion.div
                  className={`h-full ${mission.gradient} rounded-full origin-left`}
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

const StatCard = memo(({ stat }: { stat: StatItem; }) => (
  <motion.div
    className="text-center p-6 bg-background/80 backdrop-blur-sm rounded-2xl border border-brand-gray-200 shadow-soft group cursor-pointer"
    variants={itemVariants}
    whileHover={{ 
      y: -8,
      scale: 1.05,
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div 
      className={`text-3xl md:text-4xl font-bold ${stat.color} bg-clip-text text-transparent mb-2`}
      whileHover={{ 
        scale: [1, 1.1, 1],
        transition: { duration: 0.3 }
      }}
    >
      {stat.number}
    </motion.div>
    <motion.div 
      className="text-foreground-secondary font-medium text-sm"
      whileHover={{ color: "rgba(17,24,39,1)" }}
    >
      {stat.label}
    </motion.div>
  </motion.div>
));

const VisionMissionSection = memo(() => {
  // Memoized floating shapes
  const memoizedFloatingShapes = useMemo(() => 
    floatingShapes.map((shape, idx) => (
      <FloatingShape key={idx} shape={shape} />
    )), []
  );

  const memoizedStats = useMemo(() =>
    stats.map((stat) => (
      <StatCard key={stat.label} stat={stat} />
    )), []
  );

  return (
    <section className="relative bg-gradient-hero py-24 lg:py-32 overflow-hidden">
      {/* Animated Background Elements - matching hero section */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Orbs */}
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 bg-secondary-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 1 }}
          style={{ willChange: "transform, opacity" }}
        />

        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-blue-300/20 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />

        {/* Floating Geometric Shapes */}
        {memoizedFloatingShapes}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.05),transparent_70%)]" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Header - matching hero section */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">Visi & Misi</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight"
            variants={itemVariants}
          >
            <motion.span 
              className="bg-gradient-primary bg-clip-text text-transparent"
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
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 block">
              Bangunkota
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Vision Section */}
          <VisionCard />

          {/* Mission Section */}
          <MissionCard />
        </div>

        {/* Bottom Statistics - matching hero section */}
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