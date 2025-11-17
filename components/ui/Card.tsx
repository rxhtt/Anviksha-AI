import React from 'react';
// FIX: Import HTMLMotionProps for correct prop typing, as AnimationProps is not a valid export.
import { motion, HTMLMotionProps } from 'framer-motion';

// FIX: Extend HTMLMotionProps<'div'> for compatibility with motion component props like `whileHover`.
interface CardProps extends HTMLMotionProps<'div'> {
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