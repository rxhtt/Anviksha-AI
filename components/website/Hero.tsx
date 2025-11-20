
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import { IconActivity, IconChevronDown } from '../Icons';

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={targetRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
        {/* Dynamic Background Layers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Primary Aurora */}
            <motion.div 
                style={{ y: y1, opacity: 0.6 }}
                className="absolute -top-[30%] -left-[20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/40 via-indigo-100/20 to-transparent blur-[100px] animate-aurora"
            />
            {/* Secondary Accent */}
            <motion.div 
                style={{ y: y2, opacity: 0.4 }}
                className="absolute top-[20%] -right-[20%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-200/30 via-blue-100/20 to-transparent blur-[80px]"
            />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm"
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-slate-600 tracking-wide">Now Live: Digital Hospital 1.0</span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-[1.1] sm:leading-[0.9] mb-8 break-words max-w-[90vw]">
                    <motion.span
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                    >
                        Medical
                    </motion.span>
                    <motion.span 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 pb-2 sm:pb-4"
                    >
                        Superintelligence
                    </motion.span>
                </h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed font-medium px-4"
                >
                    The first <span className="text-slate-900 font-bold">AI-Native Hospital</span>. 
                    Diagnose diseases, triage emergencies, and slash pharmacy costs—instantly, from any device.
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-12 flex flex-col sm:flex-row items-center gap-6"
                >
                    <a href="https://anviksha-device.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <Button icon={<IconActivity />} size="xl" variant="primary" className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg shadow-blue-500/30 shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1">
                        Launch Platform
                        </Button>
                    </a>
                    <button onClick={() => scrollTo('solutions')} className="group flex items-center gap-3 text-slate-600 font-semibold px-8 py-4 rounded-full hover:bg-slate-100 transition-all">
                        Explore Features
                        <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                            <IconChevronDown size={16} />
                        </span>
                    </button>
                </motion.div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent"></div>
        </motion.div>
    </section>
  );
};

export default Hero;
