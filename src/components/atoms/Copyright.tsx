// src/components/atoms/Copyright.tsx
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Copyright = () => (
  <motion.div
    className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 space-y-4 md:space-y-0"
    variants={{
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeInOut" }
      }
    }}
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
);

export default Copyright;