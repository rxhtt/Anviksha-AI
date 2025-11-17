
import React from 'react';
// FIX: Use motion component from framer-motion.
import { motion } from 'framer-motion';

// FIX: Extend component props from motion.div for compatibility with motion component props like `whileHover`.
interface CardProps extends React.ComponentProps<typeof motion.div> {
  children: React.ReactNode;
}

// FIX: Refactor to use rest props to pass all motion props to the underlying component.
const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  
  return (
    <motion.div
      variants={cardVariants}
      // Removed initial/animate props to allow for parent control with staggerChildren
      className={`bg-white border border-slate-200 rounded-xl shadow-lg ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
