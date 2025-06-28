// src/components/molecules/FooterSection.tsx
import { motion } from 'framer-motion';

const FooterSection = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) => (
  <motion.div
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
    <h3 className="text-lg font-bold mb-6 text-white">{title}</h3>
    {children}
  </motion.div>
);

export default FooterSection;