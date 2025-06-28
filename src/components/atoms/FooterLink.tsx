// src/components/atoms/FooterLink.tsx
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const FooterLink = ({ 
  href, 
  children 
}: { 
  href: string; 
  children: React.ReactNode; 
}) => (
  <motion.a
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
    whileHover={{ x: 5 }}
  >
    <span>{children}</span>
    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </motion.a>
);

export default FooterLink;