// src/components/atoms/AnimatedOrb.tsx
import { motion } from 'framer-motion';

const AnimatedOrb = ({
  position,
  delay = 0,
  color,
  size
}: {
  position: string;
  delay?: number;
  color: string;
  size: string;
}) => (
  <motion.div
    className={`absolute ${position} ${size} ${color} rounded-full blur-3xl`}
    variants={{
      animate: {
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.2, 0.1],
        x: [0, 10, 0],
        y: [0, -10, 0],
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse" as const,
          delay
        }
      }
    }}
    animate="animate"
    style={{ willChange: "transform, opacity" }}
  />
);

export default AnimatedOrb;