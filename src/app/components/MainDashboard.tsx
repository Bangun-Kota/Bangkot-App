import React, { useState, memo, ReactNode } from 'react';
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  Trophy, 
  Users, 
  Settings,
  Search,
  Bell,
  Plus,
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  Award,
  TrendingUp,
  BookOpen,
  Camera,
  PlayCircle,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2 }
  }
};

const mobileMenuVariants = {
  closed: {
    x: "-100%",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40
    }
  }
};

// Mock data
interface Session {
  id: number;
  title: string;
  community: string;
  time: string;
  date: string;
  participants: number;
  maxParticipants: number;
  type: string;
  color: string;
}

const upcomingSessions: Session[] = [
  {
    id: 1,
    title: "Workshop Design UI/UX",
    community: "Tech Creative Bekasi",
    time: "14:00 - 16:00",
    date: "Hari ini",
    participants: 24,
    maxParticipants: 30,
    type: "Workshop",
    color: "bg-gradient-primary"
  },
  {
    id: 2,
    title: "Networking Session",
    community: "Startup Bekasi",
    time: "19:00 - 21:00",
    date: "Besok",
    participants: 45,
    maxParticipants: 50,
    type: "Networking",
    color: "bg-gradient-secondary"
  }
];

interface CommunityMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: string;
  achievement: string;
}

const communitySpotlight: CommunityMember[] = [
  {
    id: 1,
    name: "Abigail Grand",
    role: "Mentorship Sessions",
    avatar: "🎨",
    status: "completed",
    achievement: "Design Mentor"
  },
  {
    id: 2,
    name: "Melissa Kask",
    role: "Mentorship Sessions", 
    avatar: "💼",
    status: "completed",
    achievement: "Business Mentor"
  },
  {
    id: 3,
    name: "Fazy Oktavia",
    role: "Mental Health",
    avatar: "🧠",
    status: "attending",
    achievement: "Wellness Coach"
  }
];

interface Stat {
  label: string;
  value: string;
  gradient: string;
  icon: ReactNode;
}

const quickStats: Stat[] = [
  { label: "Komunitas Joined", value: "12", gradient: "bg-gradient-turquoise", icon: <Users className="w-4 sm:w-5 h-4 sm:h-5" /> },
  { label: "Events Attended", value: "28", gradient: "bg-gradient-yellow", icon: <Calendar className="w-4 sm:w-5 h-4 sm:h-5" /> },
  { label: "Karma Points", value: "1,247", gradient: "bg-gradient-blue", icon: <Star className="w-4 sm:w-5 h-4 sm:h-5" /> }
];

interface MenuItem {
  id: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
  new?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Components
const Sidebar = memo(({ isOpen, onClose }: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState('home');
  
  const menuItems: MenuItem[] = [
    { id: 'home', icon: Home, label: 'Home', active: true },
    { id: 'messages', icon: MessageCircle, label: 'Messages', badge: '3' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'achievements', icon: Trophy, label: 'Achievements', new: true },
    { id: 'connections', icon: Users, label: 'Connections' },
    { id: 'sessions', icon: BookOpen, label: 'Group Sessions' },
    { id: 'more', icon: Settings, label: 'More' }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className={`
          fixed lg:static top-0 left-0 z-50
          w-64 sm:w-72 lg:w-64 xl:w-72
          bg-background border-r border-gray-200 
          h-screen overflow-y-auto
          flex flex-col
          ${isOpen ? 'shadow-2xl' : ''}
        `}
        variants={mobileMenuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Bangunkota
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logo - Desktop only */}
        <div className="hidden lg:block p-4 xl:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg xl:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Bangunkota
            </span>
          </div>
        </div>

        {/* User Profile */}
        <motion.div 
          className="p-4 xl:p-6 border-b border-gray-200"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-turquoise rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
              A
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-foreground text-sm sm:text-base truncate">Alexa Harrison</div>
              <div className="text-xs sm:text-sm text-foreground-secondary">View profile</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-3 xl:p-4">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 mb-1 text-sm sm:text-base ${
                activeMenu === item.id 
                  ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                  : 'text-foreground-secondary hover:bg-gray-50 hover:text-foreground'
              }`}
              onClick={() => {
                setActiveMenu(item.id);
                onClose?.();
              }}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" />
              <span className="font-medium truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-accent-orange-500 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                  {item.badge}
                </span>
              )}
              {item.new && (
                <span className="ml-auto bg-secondary-500 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                  NEW
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Open to Jobs Card */}
        <motion.div 
          className="m-3 xl:m-4 p-3 xl:p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-200"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-sm font-semibold text-foreground mb-2">Open to jobs</div>
          <div className="text-xs text-foreground-secondary mb-3">
            Let hiring managers know you&apos;re available for roles.
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-xs text-foreground-secondary">Not looking</span>
          </label>
        </motion.div>
      </motion.div>
    </>
  );
});

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = memo(({ onMenuClick }: TopBarProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <motion.div 
      className="bg-background border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-30"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">Dashboard</h1>
          <span className="hidden sm:inline text-xs sm:text-sm text-foreground-secondary">Welcome back! 👋</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - Desktop */}
        <div className="hidden lg:block relative">
          <Search className="w-4 lg:w-5 h-4 lg:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search communities, events..."
            className="pl-8 lg:pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64 xl:w-80 text-sm"
          />
        </div>

        {/* Search - Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-600 hover:text-foreground transition-colors hover:bg-gray-100 rounded-lg"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="w-5 h-5" />
        </button>
        
        {/* Notifications */}
        <motion.button 
          className="relative p-2 text-gray-600 hover:text-foreground transition-colors hover:bg-gray-100 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 sm:w-6 h-5 sm:h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-orange-500 rounded-full"></span>
        </motion.button>
        
        {/* Profile */}
        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-turquoise rounded-full flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-gray-200 p-4 z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search communities, events..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

const WelcomeCard = memo(() => (
  <motion.div 
    className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden"
    variants={itemVariants}
    whileHover={cardHoverVariants.hover}
  >
    {/* Background decorations */}
    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/5 rounded-full blur-2xl" />
    
    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Sparkles className="w-5 sm:w-6 h-5 sm:h-6" />
        <span className="text-base sm:text-lg font-semibold">Welcome! 👋</span>
      </div>
      
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">You have no upcoming sessions</h2>
      <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">Ready to join some amazing communities and events?</p>
      
      <motion.button 
        className="bg-white text-primary-600 font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2 text-sm sm:text-base"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore Communities
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
));

const QuickStatsGrid = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {quickStats.map((stat) => (
      <motion.div
        key={stat.label}
        className="bg-background border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-soft transition-all duration-300"
        variants={itemVariants}
        whileHover={cardHoverVariants.hover}
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={`w-10 sm:w-12 h-10 sm:h-12 ${stat.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center text-white`}>
            {stat.icon}
          </div>
          <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
        </div>
        
        <div className={`text-2xl sm:text-3xl font-bold ${stat.gradient} bg-clip-text text-transparent mb-1 sm:mb-2`}>
          {stat.value}
        </div>
        <div className="text-foreground-secondary font-medium text-sm sm:text-base">{stat.label}</div>
      </motion.div>
    ))}
  </div>
));

const UpcomingSessionsCard = memo(() => (
  <motion.div 
    className="bg-background border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6"
    variants={itemVariants}
    whileHover={cardHoverVariants.hover}
  >
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-xl font-bold text-foreground">Upcoming Sessions</h3>
      <motion.button 
        className="text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm sm:text-base"
        whileHover={{ x: 4 }}
      >
        View all
      </motion.button>
    </div>
    
    <div className="space-y-3 sm:space-y-4">
      {upcomingSessions.map((session) => (
        <motion.div
          key={session.id}
          className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.01, x: 4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{session.title}</h4>
              <p className="text-xs sm:text-sm text-foreground-secondary">{session.community}</p>
            </div>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${session.color} self-start`}>
              {session.type}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground-secondary">
            <div className="flex items-center gap-1">
              <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="text-xs sm:text-sm">{session.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="text-xs sm:text-sm">{session.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="text-xs sm:text-sm">{session.participants}/{session.maxParticipants}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    
    <motion.button 
      className="w-full mt-4 py-2.5 sm:py-3 border-2 border-dashed border-gray-300 rounded-xl text-foreground-secondary hover:border-primary-300 hover:text-primary-600 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
      Join New Session
    </motion.button>
  </motion.div>
));

const CommunitySpotlightCard = memo(() => (
  <motion.div 
    className="bg-background border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6"
    variants={itemVariants}
    whileHover={cardHoverVariants.hover}
  >
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-xl font-bold text-foreground">Community Spotlight</h3>
      <motion.button 
        className="text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm sm:text-base"
        whileHover={{ x: 4 }}
      >
        See all
      </motion.button>
    </div>
    
    <div className="space-y-3 sm:space-y-4">
      {communitySpotlight.map((member) => (
        <motion.div
          key={member.id}
          className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          whileHover={{ x: 4 }}
        >
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-turquoise flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
            {member.avatar}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground text-sm sm:text-base truncate">{member.name}</h4>
            <p className="text-xs sm:text-sm text-foreground-secondary truncate">{member.role}</p>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`px-2 py-1 rounded-full text-xs font-medium hidden sm:inline-block ${
              member.status === 'completed' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {member.achievement}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
));

const ActionCards = memo(() => {
  const actions = [
    { icon: <Camera className="w-5 sm:w-6 h-5 sm:h-6" />, title: "Share Update", desc: "Post your latest activity", color: "bg-gradient-primary" },
    { icon: <PlayCircle className="w-5 sm:w-6 h-5 sm:h-6" />, title: "Watch Tutorials", desc: "Learn new skills", color: "bg-gradient-secondary" },
    { icon: <Users className="w-5 sm:w-6 h-5 sm:h-6" />, title: "Find Mentors", desc: "Connect with experts", color: "bg-gradient-turquoise" },
    { icon: <Award className="w-5 sm:w-6 h-5 sm:h-6" />, title: "View Achievements", desc: "Track your progress", color: "bg-gradient-yellow" }
  ];

  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
      variants={containerVariants}
    >
      {actions.map((action) => (
        <motion.div
          key={action.title}
          className="bg-background border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 cursor-pointer hover:shadow-soft transition-all duration-300"
          variants={itemVariants}
          whileHover={cardHoverVariants.hover}
        >
          <div className={`w-10 sm:w-12 h-10 sm:h-12 ${action.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-4`}>
            {action.icon}
          </div>
          <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{action.title}</h4>
          <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">{action.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
});

const MainDashboard = memo(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="hidden lg:block">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        <motion.main 
          className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 lg:space-y-8 max-w-7xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Section */}
          <WelcomeCard />
          
          {/* Quick Stats */}
          <QuickStatsGrid />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <UpcomingSessionsCard />
            <CommunitySpotlightCard />
          </div>
          
          {/* Additional Actions */}
          <ActionCards />
        </motion.main>
      </div>
    </div>
  );
});

// Assign display names for debugging
Sidebar.displayName = 'Sidebar';
TopBar.displayName = 'TopBar';
WelcomeCard.displayName = 'WelcomeCard';
QuickStatsGrid.displayName = 'QuickStatsGrid';
UpcomingSessionsCard.displayName = 'UpcomingSessionsCard';
CommunitySpotlightCard.displayName = 'CommunitySpotlightCard';
ActionCards.displayName = 'ActionCards';
MainDashboard.displayName = 'MainDashboard';

export default MainDashboard;