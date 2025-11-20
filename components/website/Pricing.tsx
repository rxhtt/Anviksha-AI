
import React, { useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { IconCheckCircle, IconZap, IconInfinity } from '../Icons';
import Button from '../ui/Button';

const Pricing: React.FC = () => {
  // Shenanigan: Animate price from 299 to 0
  // Lower stiffness = slower movement. Higher damping = less bounce (more like a meltdown slide).
  const initialPrice = 299;
  const priceSpring = useSpring(initialPrice, { stiffness: 10, damping: 40, mass: 2 }); 
  const priceDisplay = useTransform(priceSpring, (current) => Math.round(current));

  // Trigger animation when in view
  const handleInView = () => {
    // Delay slightly then start the meltdown
    setTimeout(() => {
        priceSpring.set(0);
    }, 800);
  };

  return (
    <section id="pricing" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold uppercase tracking-wider mb-6"
            >
                <IconZap size={16} className="fill-current" />
                Democratization Protocol
            </motion.div>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-7xl font-black text-white tracking-tight mb-6"
            >
                Healthcare shouldn't <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">have a price tag.</span>
            </motion.h2>
        </div>

        <div className="max-w-5xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                onViewportEnter={handleInView}
                viewport={{ once: true }}
                className="relative rounded-3xl bg-slate-800 border border-slate-700 overflow-hidden shadow-2xl shadow-black/50"
            >
                {/* Glowing Orb Effect */}
                <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {/* Left Side: The Price */}
                    <div className="p-8 md:p-16 flex flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-900 relative border-b md:border-b-0 md:border-r border-slate-700">
                        <div className="text-slate-400 text-lg font-medium mb-4 uppercase tracking-widest">Monthly Cost</div>
                        <div className="flex items-start">
                            <span className="text-4xl font-bold text-slate-500 mt-2 sm:mt-4">$</span>
                            <motion.span 
                                className="text-6xl sm:text-8xl md:text-[120px] lg:text-[160px] font-black text-white leading-none tracking-tighter"
                            >
                                <motion.span>{priceDisplay}</motion.span>
                            </motion.span>
                        </div>
                        <div className="mt-8 text-center space-y-2">
                             <p className="text-green-400 font-bold text-lg animate-pulse">
                                Currently 100% FREE.
                            </p>
                            <p className="text-slate-400 text-sm max-w-xs mx-auto">
                                Enjoy the platform to its fullest while in beta. <br/> No credit card required. No limits.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Features */}
                    <div className="p-6 sm:p-8 md:p-16 flex flex-col justify-center bg-slate-800/50 backdrop-blur-sm">
                        <h3 className="text-3xl font-bold text-white mb-8">Everything Included</h3>
                        <ul className="space-y-6">
                            {[
                                "Unlimited AI Diagnostics (X-Ray, MRI)",
                                "Real-time Triage & Vitals Monitoring",
                                "Pharmacy Price Switch Engine",
                                "24/7 Mental Health Support Agent",
                                "Secure HIPAA-Compliant Storage",
                                "API Access for Developers"
                            ].map((item, i) => (
                                <motion.li 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex items-center gap-4 text-base md:text-lg text-slate-300"
                                >
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                                        <IconCheckCircle size={14} />
                                    </div>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-12">
                            <a href="https://anviksha-device.vercel.app/" target="_blank" rel="noopener noreferrer">
                                <Button 
                                    size="xl" 
                                    className="w-full justify-center bg-white text-slate-900 hover:bg-blue-50 hover:text-blue-700 border-none shadow-xl shadow-white/10 group py-8 relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3 font-black tracking-[0.2em] text-2xl sm:text-3xl">
                                        ANVIKSHA <IconInfinity size={32} className="text-blue-600" />
                                    </span>
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-9xl font-black opacity-[0.07] tracking-tighter select-none pointer-events-none whitespace-nowrap">
                                        LAUNCH
                                    </span>
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
