import { motion } from 'framer-motion'

/**
 * Scroll-triggered entrance. Transform + opacity only, 150–300ms band,
 * and framer-motion already honours prefers-reduced-motion via the CSS
 * override in index.css.
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
