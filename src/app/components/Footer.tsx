'use client'
import React, { useState, memo } from "react";
import { motion} from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin,
  Sparkles,
  Heart,
  ExternalLink,
  Send,
  Check
} from "lucide-react";

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
      ease: "easeInOut" as const,
    },
  },
};

const orbVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.1, 0.2, 0.1],
    x: [0, 10, 0],
    y: [0, -10, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
    },
  },
};

const logoVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
};

// Social media links data
const socialLinks = [
  { 
    name: "Instagram", 
    icon: Instagram, 
    url: "https://instagram.com/bangunkota", 
    color: "hover:text-pink-400 hover:bg-pink-400/10" 
  },
  { 
    name: "Twitter", 
    icon: Twitter, 
    url: "https://twitter.com/bangunkota", 
    color: "hover:text-blue-400 hover:bg-blue-400/10" 
  },
  { 
    name: "YouTube", 
    icon: Youtube, 
    url: "https://youtube.com/@bangunkota", 
    color: "hover:text-red-400 hover:bg-red-400/10" 
  },
  { 
    name: "LinkedIn", 
    icon: Linkedin, 
    url: "https://linkedin.com/company/bangunkota", 
    color: "hover:text-blue-600 hover:bg-blue-600/10" 
  },
];

// Navigation links data
const navigationLinks = [
  { name: "Tentang Kami", href: "#about" },
  { name: "Program", href: "#programs" },
  { name: "Media", href: "#media" },
  { name: "Mitra", href: "#partners" },
  { name: "Dampak", href: "#impact" },
  { name: "Kontak", href: "#contact" },
];

const infoLinks = [
  { name: "Kebijakan Privasi", href: "/privacy" },
  { name: "Syarat & Ketentuan", href: "/terms" },
  { name: "FAQ", href: "/faq" },
  { name: "Panduan Komunitas", href: "/guide" },
];

const contactInfo = [
  { 
    icon: MapPin, 
    text: "Bekasi, Jawa Barat, Indonesia",
    color: "text-accent-orange-400"
  },
  { 
    icon: Mail, 
    text: "halo@bangunkota.id",
    href: "mailto:halo@bangunkota.id",
    color: "text-primary-400"
  },
  { 
    icon: Phone, 
    text: "+62 812 3456 7890",
    href: "tel:+6281234567890",
    color: "text-secondary-400"
  },
];

const Footer = memo(() => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 2 }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent-orange-400/5 rounded-full blur-2xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 4 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,179,8,0.03),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              variants={itemVariants}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="relative w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg"
                  variants={logoVariants}
                  animate="animate"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
                <div>
                  <h2 className="text-2xl font-black bg-gradient-primary bg-clip-text text-transparent">
                    Bangunkota
                  </h2>
                  <p className="text-sm text-gray-400">Kolaborasi Komunitas Bekasi</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Ruang bersama untuk{" "}
                <span className="text-primary-400 font-semibold">berkarya</span>,{" "}
                <span className="text-secondary-400 font-semibold">bersinergi</span>, dan{" "}
                <span className="text-accent-orange-400 font-semibold">membangun kota</span>{" "}
                yang inklusif & berkelanjutan.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact) => (
                  <motion.div
                    key={contact.text}
                    className="flex items-center space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`p-2 rounded-lg bg-white/5 backdrop-blur-sm ${contact.color}`}>
                      <contact.icon className="w-4 h-4" />
                    </div>
                    {contact.href ? (
                      <a 
                        href={contact.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-gray-300">{contact.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold mb-6 text-white">Navigasi</h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                      whileHover={{ x: 5 }}
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Information Links */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold mb-6 text-white">Informasi</h3>
              <ul className="space-y-3">
                {infoLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                      whileHover={{ x: 5 }}
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div 
              className="lg:col-span-3"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Daftarkan email kamu untuk update program terbaru dari komunitas Bangunkota.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Alamat Email"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:bg-white/15 transition-all duration-300"
                    required
                    disabled={isLoading || isSubmitted}
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className="w-full bg-gradient-primary text-white font-bold py-4 rounded-2xl hover:shadow-yellow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: isLoading || isSubmitted ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading || isSubmitted ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Mengirim...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Berhasil!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Berlangganan</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 space-y-4 md:space-y-0"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {new Date().getFullYear()} Bangunkota.id</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Semua hak dilindungi</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <motion.a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                Privacy Policy
              </motion.a>
              <span className="text-gray-600">|</span>
              <motion.a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ y: -1 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;