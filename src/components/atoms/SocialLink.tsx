 // src/components/atoms/SocialLink.tsx
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

const SocialLink = ({ 
  icon: Icon, 
  url, 
  color 
}: { 
  icon: LucideIcon; 
  url: string; 
  color: string;
}) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className={`p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 ${color}`}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

export default SocialLink;