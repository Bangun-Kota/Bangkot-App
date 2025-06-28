// src/components/atoms/LogoAnimated.tsx
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LogoAnimated = () => (
  <div className="flex items-center space-x-3">
    <motion.div 
      className="relative w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg"
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear" 
      }}
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
);

export default LogoAnimated;