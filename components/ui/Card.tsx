import React from 'react';
// FIX: Use motion component from framer-motion.
import { motion } from 'framer-motion';

// FIX: Extend component props from motion.div for compatibility with motion component props like `whileHover`.
// Correcting prop types for Card component by using a type alias with an intersection.
type CardProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof motion.div>;


// FIX: Refactor to use rest props to pass all motion props to the underlying component.
// Using direct prop typing instead of React.FC to resolve issues with extended props.
const Card = ({ children, className = '', ...props }: CardProps) => {
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
