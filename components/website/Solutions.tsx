
import React from 'react';
import { motion } from 'framer-motion';
import { IconStethoscope, IconActivity, IconPill, IconBrain, IconArrowRight } from '../Icons';

const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-32 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Complete Care.<br/>
            <span className="text-slate-400">Zero Compromise.</span>
          </h2>
          <p className="text-xl text-slate-600">
            We've bundled the capabilities of a multi-specialty hospital into a single, intelligent operating system.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[400px]">
          
          {/* Card 1: Diagnostics (Large, span 2 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 relative group rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-200 min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200" 
                alt="Diagnostics" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-blue-500/30">
                    <IconStethoscope size={24} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 group-hover:text-white transition-colors">The Medical Hub</h3>
                <p className="mt-2 text-slate-600 font-medium group-hover:text-blue-100 transition-colors max-w-md">
                    25+ Specialties including Radiology, Cardiology, and Dermatology. Clinical-grade analysis for X-Rays, ECGs, and more.
                </p>
            </div>
          </motion.div>

          {/* Card 2: Triage (Tall, span 1 col, 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:row-span-2 relative group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl min-h-[400px]"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent" />
             <img 
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800" 
                alt="Triage" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity duration-500"
            />
            <div className="relative h-full flex flex-col justify-end p-8 z-20">
                 <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-red-500/30">
                    <IconActivity size={24} />
                </div>
                <h3 className="text-3xl font-bold text-white">Smart Triage</h3>
                <p className="mt-2 text-slate-400 leading-relaxed">
                    Instant risk assessment. Our AI calculates a clinical score (0-100%) to determine urgency, guiding patients to the right care path instantly.
                </p>
                <div className="mt-8 pt-8 border-t border-slate-800/50 flex items-center gap-2 text-red-400 font-semibold">
                    <span>Check Symptoms</span> <IconArrowRight size={18} />
                </div>
            </div>
          </motion.div>

          {/* Card 3: Pharmacy (Normal, span 1 col) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="relative group rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-200 p-8 flex flex-col justify-between min-h-[400px]"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                 <IconPill size={120} className="text-green-600" />
             </div>
             <div>
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg shadow-green-500/30">
                    <IconPill size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Price Drop Engine</h3>
             </div>
             <div>
                 <div className="text-4xl font-black text-green-600 mb-2">-85%</div>
                 <p className="text-slate-600 font-medium">
                     Average savings by switching to Jan Aushadhi generic equivalents automatically.
                 </p>
             </div>
          </motion.div>

          {/* Card 4: Therapy (Normal, span 1 col) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="relative group rounded-3xl overflow-hidden bg-slate-900 shadow-xl shadow-purple-500/20 p-8 flex flex-col justify-between text-white min-h-[400px]"
          >
              {/* Updated Image for better visibility and empathy */}
             <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200&auto=format&fit=crop" 
                alt="Mental Health & Therapy - Serene Support" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-violet-900/90 mix-blend-multiply z-10"></div>
             
             <div className="relative z-20">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 text-white border border-white/20">
                    <IconBrain size={24} />
                </div>
                <h3 className="text-2xl font-bold">AI Therapy</h3>
             </div>
             <p className="text-purple-100/90 font-medium leading-relaxed relative z-20">
                 24/7 empathetic mental health support trained on CBT frameworks. A safe space for everyone.
             </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Solutions;
