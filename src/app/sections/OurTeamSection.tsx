import { memo, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Heart, Sparkles, ArrowRight, Twitter, Linkedin, Mail, MapPin, Calendar, Zap } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  community?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

interface FloatingIcon {
  icon: React.ReactNode;
  delay: number;
  x: string;
  y: string;
}

interface OurTeamSectionProps {
  teamMembers?: TeamMember[];
}

// Static data moved outside component for performance
const floatingIcons: FloatingIcon[] = [
  { icon: <Users className="w-5 h-5" />, delay: 0, x: "5%", y: "10%" },
  { icon: <Heart className="w-6 h-6" />, delay: 1.5, x: "90%", y: "15%" },
  { icon: <Sparkles className="w-4 h-4" />, delay: 2.5, x: "8%", y: "80%" },
  { icon: <MapPin className="w-5 h-5" />, delay: 1, x: "85%", y: "75%" },
  { icon: <Calendar className="w-4 h-4" />, delay: 0.5, x: "10%", y: "50%" },
  { icon: <Zap className="w-5 h-5" />, delay: 2, x: "88%", y: "45%" },
];

const defaultTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Abi Sutanrai Abdilah",
    position: "Founder & Community Leader",
    description: "Memimpin visi Bangunkota dalam membangun ekosistem komunitas yang inklusif dan berkelanjutan di Bekasi. Berpengalaman 8+ tahun dalam pengembangan komunitas dan pemberdayaan masyarakat.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4gayav0jQ7yP1Z-U4jeAbwOLszXU-zqAbe0J8Uk5lumVOgAGk-kPZRNu&s=10",
    community: "Komunitas Kreatif Bekasi",
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 2,
    name: "Sari Indrawati",
    position: "Program Director",
    description: "Mengelola program-program strategis Bangunkota dengan fokus pada dampak sosial dan keterlibatan komunitas. Expert dalam manajemen program dan kemitraan strategis.",
    image: "/api/placeholder/100/100",
    community: "Komunitas Lingkungan Bekasi",
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 3,
    name: "Budi Santoso",
    position: "Technology & Innovation Lead",
    description: "Membangun platform digital Bangunkota dan mengintegrasikan teknologi untuk mempermudah kolaborasi antar komunitas. Full-stack developer dengan passion untuk civic tech.",
    image: "/api/placeholder/100/100",
    community: "Tech Community Bekasi",
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 4,
    name: "Maya Putri",
    position: "Community Engagement Manager",
    description: "Memfasilitasi kolaborasi dan networking antar komunitas, menciptakan ruang dialog yang produktif dan inklusif. Ahli dalam community building dan event management.",
    image: "/api/placeholder/100/100",
    community: "Komunitas Perempuan Bekasi",
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    id: 5,
    name: "Dani Kurniawan",
    position: "Partnerships & Growth Lead",
    description: "Mengembangkan kemitraan strategis dengan berbagai stakeholder untuk memperluas dampak Bangunkota. Berpengalaman dalam business development dan strategic partnerships.",
    image: "/api/placeholder/100/100",
    community: "Business Network Bekasi",
    socialLinks: {
      twitter: "#",
      linkedin: "#"
    }
  }
];

// Animation variants matching hero section
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

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    x: [-3, 3, -3],
    rotate: [-2, 2, -2],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
};

const orbVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.2, 0.4, 0.2],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
};

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// Memoized components for performance
const FloatingIcon = memo(({ item }: { item: FloatingIcon }) => (
  <motion.div
    className="absolute text-brand-gray-400 hover:text-primary-500 transition-colors duration-300"
    style={{ 
      left: item.x,
      top: item.y,
    }}
    variants={floatingVariants}
    animate="animate"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: item.delay }}
    whileHover={{ 
      scale: 1.2,
      transition: { duration: 0.2 }
    }}
  >
    {item.icon}
  </motion.div>
));

const TeamMemberCard = memo(({ member, index }: { member: TeamMember; index: number }) => {
  const gradientClasses = [
    'bg-gradient-primary',
    'bg-gradient-secondary', 
    'bg-gradient-turquoise',
    'bg-gradient-blue',
    'bg-gradient-yellow'
  ];
  
  const borderClasses = [
    'border-primary-200 bg-primary-50',
    'border-secondary-200 bg-secondary-50',
    'border-accent-orange-200 bg-accent-orange-50',
    'border-accent-blue-200 bg-accent-blue-50',
    'border-primary-200 bg-primary-50'
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="relative"
      whileHover={{ y: -5 }}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${
        index % 2 === 0 ? '' : 'lg:flex-row-reverse'
      }`}>
        
        {/* Profile Section */}
        <div className={`lg:col-span-4 ${index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}`}>
          <motion.div 
            className="flex lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4 p-6 bg-background/80 backdrop-blur-sm rounded-2xl border border-primary-100 shadow-soft"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <motion.div 
                className={`w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden ${gradientClasses[index % 5]} p-1 shadow-yellow`}
                whileHover={{ rotate: 5 }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            </div>
            
            <div className="text-center lg:text-left flex-1">
              <h3 className="font-bold text-foreground text-xl mb-1">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-primary-600 mb-2">
                {member.position}
              </p>
              {member.community && (
                <motion.div 
                  className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${borderClasses[index % 5]}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Users className="w-3 h-3" />
                  {member.community}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Connecting Line */}
        <div className={`lg:col-span-1 ${index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'} hidden lg:block`}>
          <div className="h-full flex items-center justify-center">
            <motion.div
              className="h-0.5 w-full bg-gradient-primary rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ 
                transformOrigin: index % 2 === 0 ? 'left' : 'right'
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className={`lg:col-span-7 ${index % 2 === 0 ? 'order-3' : 'order-3 lg:order-3'}`}>
          <motion.div
            className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-primary-100 hover:shadow-turquoise transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -3 }}
          >
            {/* Quote decoration */}
            <motion.div 
              className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-yellow"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </motion.div>

            <div className="mb-6">
              <p className="text-foreground-secondary leading-relaxed text-lg">
                {member.description}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-between pt-6 border-t border-primary-100">
              <span className="text-sm font-medium text-foreground-secondary">
                Terhubung dengan:
              </span>
              <div className="flex items-center space-x-3">
                {member.socialLinks.twitter && (
                  <motion.a
                    href={member.socialLinks.twitter}
                    className="w-10 h-10 bg-background border border-primary-200 rounded-full flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-4 h-4" />
                  </motion.a>
                )}
                {member.socialLinks.linkedin && (
                  <motion.a
                    href={member.socialLinks.linkedin}
                    className="w-10 h-10 bg-background border border-primary-200 rounded-full flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                )}
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-background border border-primary-200 rounded-full flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              </div>
            </div>

            {/* Shimmer Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              variants={shimmerVariants}
              initial="initial"
              whileHover="animate"
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile connecting line */}
      <div className="lg:hidden mt-8 mb-8 flex justify-center">
        <motion.div 
          className="w-20 h-0.5 bg-gradient-primary rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
});

const OurTeamSection: React.FC<OurTeamSectionProps> = ({ 
  teamMembers = defaultTeamMembers 
}) => {
  // Memoize expensive calculations
  const memoizedFloatingIcons = useMemo(() => 
    floatingIcons.map((item, idx) => (
      <FloatingIcon key={idx} item={item} />
    )), []
  );

  const memoizedTeamMembers = useMemo(() =>
    teamMembers.map((member, idx) => (
      <TeamMemberCard key={member.id} member={member} index={idx} />
    )), [teamMembers]
  );

  return (
    <section className="relative py-20 bg-gradient-hero text-foreground overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-10 left-10 w-80 h-80 bg-primary-300/15 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-300/15 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 1 }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-blue-300/15 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Floating Icons */}
      {memoizedFloatingIcons}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary-200 rounded-full px-4 py-2 shadow-soft mb-6"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Users className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Tim Inti Bangunkota
            </span>
            <motion.div 
              className="w-2 h-2 bg-secondary-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Tim Penggerak
            </span>
            <br />
            <span className="text-foreground text-3xl md:text-4xl lg:text-5xl font-bold">
              Komunitas Bekasi
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Berkenalan dengan{" "}
            <span className="text-primary-600 font-semibold">tim passionate</span>{" "}
            yang berdedikasi membangun{" "}
            <span className="text-secondary-600 font-semibold">ekosistem komunitas</span>{" "}
            yang inklusif dan berkelanjutan di Kota Bekasi.
          </motion.p>
        </motion.div>

        {/* Team Members */}
        <motion.div
          className="space-y-16 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {memoizedTeamMembers}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="group relative inline-flex items-center gap-3 bg-gradient-primary text-white font-bold px-8 py-4 rounded-2xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Bergabung dengan Tim</span>
                <motion.div 
                  className="relative z-10"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                
                {/* Shimmer Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  variants={shimmerVariants}
                  initial="initial"
                  whileHover="animate"
                />
              </button>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="group inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border-2 border-secondary-300 text-secondary-700 font-semibold px-6 py-3 rounded-xl hover:bg-secondary-50 hover:border-secondary-400 transition-all duration-300">
                Lihat Semua Anggota
                <motion.div
                  animate={{ rotate: [0, 45, 0] }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg
          viewBox="0 0 1200 120"
          fill="none"
          className="w-full h-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#teamGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
          <defs>
            <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234,179,8,0.1)" />
              <stop offset="50%" stopColor="rgba(20,184,166,0.15)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.1)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </section>
  );
};

// Set display names for debugging
FloatingIcon.displayName = 'FloatingIcon';
TeamMemberCard.displayName = 'TeamMemberCard';

export default OurTeamSection;