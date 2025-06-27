'use client'
import Link from "next/link";
import { ArrowLeft, Mail, Sparkles, Users, Zap, Heart, MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { memo, useMemo, useState } from "react";

// Types
interface FloatingIcon {
  icon: React.ReactNode;
  delay: number;
  x: string;
  y: string;
}

// Static data
const floatingIcons: FloatingIcon[] = [
  { icon: <Sparkles className="w-4 h-4" />, delay: 0, x: "15%", y: "20%" },
  { icon: <Users className="w-5 h-5" />, delay: 1, x: "85%", y: "25%" },
  { icon: <Zap className="w-3 h-3" />, delay: 2, x: "20%", y: "80%" },
  { icon: <Heart className="w-4 h-4" />, delay: 1.5, x: "80%", y: "75%" },
  { icon: <MapPin className="w-3 h-3" />, delay: 0.5, x: "90%", y: "15%" },
  { icon: <Calendar className="w-4 h-4" />, delay: 2.5, x: "10%", y: "60%" },
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
    x: [-4, 4, -4],
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

// Memoized floating icon component
const FloatingIcon = memo(({ item }: { item: FloatingIcon }) => (
  <motion.div
    className="absolute text-brand-gray-300/60 hover:text-primary-400 transition-colors duration-300"
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

const ForgotPasswordPage = memo(() => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const memoizedFloatingIcons = useMemo(() => 
    floatingIcons.map((item, idx) => (
      <FloatingIcon key={idx} item={item} />
    )), []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div 
          className="absolute top-0 left-0 w-72 h-72 bg-primary-300/15 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-60 h-60 bg-secondary-300/15 rounded-full blur-3xl"
          variants={orbVariants}
          animate="animate"
          transition={{ delay: 1 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* Floating Icons */}
      {memoizedFloatingIcons}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.03),transparent_70%)]" />

      <motion.div 
        className="relative z-10 w-full max-w-md mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/authentication/sign-in"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-primary-600 transition-colors duration-300 group"
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">Kembali ke Login</span>
          </Link>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          className="bg-background/95 backdrop-blur-sm border border-primary-200/50 rounded-3xl p-8 shadow-soft"
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
          {!isSubmitted ? (
            <>
              {/* Header */}
              <motion.div className="text-center mb-8" variants={itemVariants}>
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-yellow"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Lupa Password?
                </h1>
                
                <p className="text-foreground-secondary leading-relaxed">
                  Masukkan email Anda dan kami akan mengirimkan link untuk reset password
                </p>
              </motion.div>

              {/* Form */}
              <motion.form onSubmit={handleSubmit} variants={itemVariants}>
                <div className="space-y-6">
                  {/* Email Input */}
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <motion.input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 pl-12 bg-background border-2 border-brand-gray-200 rounded-xl text-foreground placeholder-brand-gray-400 focus:border-primary-400 focus:ring-0 focus:outline-none transition-all duration-300"
                        placeholder="nama@email.com"
                        required
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      type="submit"
                      disabled={isLoading || !email}
                      className="group relative w-full inline-flex items-center justify-center gap-3 bg-gradient-primary text-white font-bold px-6 py-4 rounded-xl shadow-yellow hover:shadow-turquoise transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">
                        {isLoading ? "Mengirim..." : "Kirim Link Reset"}
                      </span>
                      
                      {!isLoading && (
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
                      )}

                      {isLoading && (
                        <motion.div
                          className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      
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
              </motion.form>

              {/* Footer Links */}
              <motion.div 
                className="mt-8 pt-6 border-t border-brand-gray-200 text-center"
                variants={itemVariants}
              >
                <p className="text-sm text-foreground-secondary mb-4">
                  Ingat password Anda?
                </p>
                <Link
                  href="/authentication/sign-in"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors duration-300 group"
                >
                  <motion.span
                    whileHover={{ x: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </motion.span>
                  Masuk ke Akun
                </Link>
              </motion.div>
            </>
          ) : (
            /* Success State */
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-turquoise rounded-2xl mb-6 shadow-turquoise"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  ✓
                </motion.div>
              </motion.div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Email Terkirim! 📧
              </h2>
              
              <p className="text-foreground-secondary mb-6 leading-relaxed">
                Kami telah mengirimkan link reset password ke email{" "}
                <span className="font-semibold text-primary-600">{email}</span>
              </p>
              
              <div className="space-y-4">
                <motion.button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full bg-background border-2 border-secondary-300 text-secondary-700 font-semibold px-6 py-3 rounded-xl hover:bg-secondary-50 hover:border-secondary-400 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Kirim Ulang Email
                </motion.button>
                
                <Link
                  href="/authentication/sign-in"
                  className="block w-full bg-gradient-primary text-white font-bold px-6 py-3 rounded-xl shadow-yellow hover:shadow-turquoise transition-all duration-300 text-center"
                >
                  Kembali ke Login
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom Brand */}
        <motion.div 
          className="text-center mt-8"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex items-center gap-2 text-foreground-secondary"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
            </motion.div>
            <span className="text-sm font-medium">
              <span className="bg-gradient-primary bg-clip-text text-transparent font-bold">
                Bangunkota
              </span>{" "}
              - Hidupkan Kota Bareng
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
});

FloatingIcon.displayName = 'FloatingIcon';
ForgotPasswordPage.displayName = 'ForgotPasswordPage';

export default ForgotPasswordPage;