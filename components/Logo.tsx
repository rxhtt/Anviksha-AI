
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface LogoProps {
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ light = false }) => {
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.1 }
      }
    }
  };
  
  const pupilVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        scale: [0, 1, 1.1, 1, 1.1, 1],
        transition: {
            delay: 1.2,
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 2,
        }
    }
  }

  return (
    <div className="flex items-center gap-3">
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        initial="hidden"
        animate="visible"
        className="transform"
      >
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
        </defs>
        
        <motion.path
          d="M3 12 C5 6, 10 4, 12 4 C14 4, 19 6, 21 12 C19 18, 14 20, 12 20 C10 20, 5 18, 3 12 Z"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
        />

        <motion.circle
          cx="12"
          cy="12"
          r="2.5"
          fill="#3b82f6"
          variants={pupilVariants}
        />
      </motion.svg>
      <span className={`text-2xl font-bold tracking-tight ${light ? 'text-white' : 'text-slate-800'}`}>Anviksha AI</span>
    </div>
  );
};

export default Logo;
