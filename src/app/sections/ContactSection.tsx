import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Sparkles, MessageCircle, Heart } from "lucide-react";
import { useState, memo, useMemo } from "react";

// Types
interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
  delay: number;
}

interface FloatingElement {
  icon: React.ReactNode;
  x: string;
  y: string;
  delay: number;
  size: string;
}

// Static data
const contactInfo: ContactInfo[] = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    value: "halo@bangunkota.id",
    color: "text-primary-600",
    delay: 0.2
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "WhatsApp",
    value: "+62 812 3456 7890",
    color: "text-secondary-600",
    delay: 0.4
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Lokasi",
    value: "Basecamp Backspace, Kranggan, Kota Bekasi",
    color: "text-accent-orange-600",
    delay: 0.6
  }
];

const floatingElements: FloatingElement[] = [
  { icon: <MessageCircle />, x: "15%", y: "20%", delay: 0, size: "w-5 h-5" },
  { icon: <Heart />, x: "85%", y: "25%", delay: 1, size: "w-6 h-6" },
  { icon: <Sparkles />, x: "10%", y: "70%", delay: 2, size: "w-4 h-4" },
  { icon: <Mail />, x: "90%", y: "75%", delay: 1.5, size: "w-5 h-5" }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    x: [-3, 3, -3],
    rotate: [-1, 1, -1],
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
    scale: [1, 1.05, 1],
    opacity: [0.2, 0.4, 0.2],
    transition: {
      duration: 6,
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
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

// Memoized components
const ContactInfoCard = memo(({ info }: { info: ContactInfo }) => (
  <motion.div
    className="group flex items-start space-x-4 p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-brand-gray-200 hover:border-primary-300 hover:bg-background/80 transition-all duration-300"
    variants={itemVariants}
    whileHover={{ 
      scale: 1.02, 
      y: -4,
      transition: { duration: 0.2 }
    }}
  >
    <motion.div 
      className={`${info.color} mt-1 p-2 rounded-xl bg-background shadow-soft`}
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    >
      {info.icon}
    </motion.div>
    <div className="flex-1">
      <motion.h4 
        className="font-bold text-foreground mb-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: info.delay }}
      >
        {info.title}
      </motion.h4>
      <motion.p 
        className="text-foreground-secondary leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: info.delay + 0.1 }}
      >
        {info.value}
      </motion.p>
    </div>
  </motion.div>
));

const FloatingElement = memo(({ element }: { element: FloatingElement }) => (
  <motion.div
    className="absolute text-brand-gray-400 hover:text-primary-500 transition-colors duration-300"
    style={{ 
      left: element.x,
      top: element.y,
    }}
    variants={floatingVariants}
    animate="animate"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: element.delay }}
    whileHover={{ 
      scale: 1.2,
      transition: { duration: 0.2 }
    }}
  >
    <div className={element.size}>
      {element.icon}
    </div>
  </motion.div>
));

const ContactSection = memo(() => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Memoized elements
  const memoizedContactInfo = useMemo(() => 
    contactInfo.map((info) => (
      <ContactInfoCard key={info.title} info={info} />
    )), []
  );

  const memoizedFloatingElements = useMemo(() =>
    floatingElements.map((element, idx) => (
      <FloatingElement key={idx} element={element} />
    )), []
  );

  return (
    <section id="contact" className="relative bg-gradient-to-br from-background-secondary via-background to-background-secondary py-20 lg:py-28 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-primary-300/10 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-300/10 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 1 }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-orange-300/8 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Floating Elements */}
      {memoizedFloatingElements}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(20,184,166,0.03),transparent_50%)]" />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
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
              <MessageCircle className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-secondary">
              Mari Berkolaborasi
            </span>
            <motion.div 
              className="w-2 h-2 bg-accent-orange-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Hubungi
            </span>{" "}
            <span className="text-foreground">Kami</span>
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Punya ide untuk{" "}
            <span className="text-primary-600 font-semibold">program komunitas</span> atau ingin{" "}
            <span className="text-secondary-600 font-semibold">berkolaborasi</span>? 
            Mari wujudkan bersama!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Informasi Kontak
              </h3>
              <p className="text-foreground-secondary">
                Jangan ragu untuk menghubungi kami melalui berbagai saluran ini
              </p>
            </motion.div>

            {memoizedContactInfo}

            {/* Additional Info */}
            <motion.div
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-primary-600" />
                </motion.div>
                <h4 className="font-bold text-foreground">Jam Operasional</h4>
              </div>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                Senin - Jumat: 09:00 - 17:00 WIB<br />
                Sabtu - Minggu: 10:00 - 15:00 WIB
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="bg-background/80 backdrop-blur-sm border border-brand-gray-200 rounded-3xl p-8 shadow-2xl">
              <motion.h3 
                className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3"
                variants={itemVariants}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Send className="w-6 h-6 text-primary-600" />
                </motion.div>
                Kirim Pesan
              </motion.h3>

              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border-2 border-brand-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20 transition-all duration-300"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border-2 border-brand-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20 transition-all duration-300"
                    placeholder="nama@domain.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full bg-background border-2 border-brand-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20 transition-all duration-300 resize-none"
                    placeholder="Ceritakan ide atau hal yang ingin Anda diskusikan dengan kami..."
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gradient-primary text-white font-bold px-8 py-4 rounded-2xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.div>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          Kirim Pesan
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                        </>
                      )}
                    </span>
                    
                    {/* Animated Background */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-secondary"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Shimmer Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      variants={shimmerVariants}
                      initial="initial"
                      whileHover="animate"
                    />
                  </motion.button>
                </motion.div>
                              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg
          viewBox="0 0 1200 80"
          fill="none"
          className="w-full h-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.path
            d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z"
            fill="url(#contactGradient)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <defs>
            <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234,179,8,0.05)" />
              <stop offset="50%" stopColor="rgba(20,184,166,0.1)" />
              <stop offset="100%" stopColor="rgba(251,146,60,0.05)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </section>
  );
});

ContactInfoCard.displayName = 'ContactInfoCard';
FloatingElement.displayName = 'FloatingElement';
ContactSection.displayName = 'ContactSection';

export default ContactSection;