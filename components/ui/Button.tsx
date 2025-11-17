
import React from 'react';
// FIX: Import motion component for correct prop typing.
import { motion } from 'framer-motion';

// FIX: Extend component props from motion.button to ensure compatibility with motion component props.
interface ButtonProps extends React.ComponentProps<typeof motion.button> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  // FIX: Add size prop to support different button sizes.
  size?: 'md' | 'lg' | 'xl';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', size = 'md', ...props }) => {
  // FIX: Removed size-specific classes (padding and font-size) to be handled dynamically.
  const baseClasses = "rounded-full font-semibold flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 disabled:opacity-50 disabled:cursor-not-allowed";

  // FIX: Added an object to hold size-specific classes.
  const sizeClasses = {
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    xl: 'px-10 py-4 text-lg font-bold'
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus-visible:ring-slate-400',
    outline: 'bg-transparent border border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-slate-400',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      // FIX: Dynamically apply the correct size class based on the 'size' prop.
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
};

export default Button;
