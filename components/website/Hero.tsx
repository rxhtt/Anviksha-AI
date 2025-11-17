
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import { IconArrowRight } from '../Icons';

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.04,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const line1 = "AI-Powered Diagnostics for";
  const line2 = "Faster, More Accurate Decisions.";

  return (
    <section ref={targetRef} id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-slate-100">
        {/* Thematic Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-6abf9df8ca89?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent z-0" />


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={sentence}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tighter"
          >
             {line1.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            ))}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
               {line2.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: 'easeOut' }}
            className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-600"
          >
            Our clinically-validated AI platform empowers healthcare professionals with rapid, reliable, and actionable insights from medical imaging to improve patient outcomes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button onClick={() => scrollTo('product')} icon={<IconArrowRight />} size="lg" variant="primary">
              See The AI in Action
            </Button>
            <Button onClick={() => scrollTo('solutions')} size="lg" variant="outline">
              Explore Solutions
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;