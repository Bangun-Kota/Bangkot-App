// src/components/atoms/ContactItem.tsx
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

const ContactItem = ({ 
  icon: Icon, 
  text, 
  href,
  color 
}: { 
  icon: LucideIcon; 
  text: string; 
  href?: string;
  color: string;
}) => (
  <motion.div
    className="flex items-center space-x-3 group"
    whileHover={{ x: 5 }}
    transition={{ duration: 0.2 }}
  >
    <div className={`p-2 rounded-lg bg-white/5 backdrop-blur-sm ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
    {href ? (
      <a 
        href={href}
        className="text-gray-300 hover:text-white transition-colors duration-200"
      >
        {text}
      </a>
    ) : (
      <span className="text-gray-300">{text}</span>
    )}
  </motion.div>
);

export default ContactItem;