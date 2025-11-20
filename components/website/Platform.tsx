
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IconSparkles, IconSearch, IconFileText, IconHistory, IconCpu, IconShield } from '../Icons';

// Spotlight Card Component
const SpotlightCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
  
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
  
    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className={`relative rounded-2xl border border-slate-200 bg-white overflow-hidden ${className}`}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity: isFocused ? 1 : 0,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59,130,246,0.1), transparent 40%)`,
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    );
  };

const features = [
  {
    icon: IconCpu,
    title: 'FDA-Cleared Architectures',
    description: 'Built on proven DenseNet and ResNet frameworks, calibrated for high-sensitivity medical imaging analysis.'
  },
  {
    icon: IconFileText,
    title: 'Multi-Modal Inputs',
    description: 'Seamlessly process DICOM images, PDF lab reports, and natural language symptoms in a single query.'
  },
  {
    icon: IconSearch,
    title: 'Real-Time Savings',
    description: 'Live scraping of generic medicine databases to instantly find cost-effective alternatives for every prescription.'
  },
  {
    icon: IconShield,
    title: 'Privacy First',
    description: 'Local-first processing options and full HIPAA-compliant encryption ensure patient data never leaves the secure loop.'
  }
];

const Platform: React.FC = () => {
  return (
    <section id="platform" className="py-32 relative overflow-hidden bg-slate-50">
       {/* Background decoration */}
       <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
       }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Engineered for <br/>Accuracy.</h2>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                    Under the hood, Anviksha combines classical computer vision with state-of-the-art generative models to deliver results you can trust.
                </p>
            </motion.div>
            
            {/* Removed View Documentation Button */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
            >
                <SpotlightCard className="h-full bg-slate-50/50 hover:bg-white transition-colors shadow-sm hover:shadow-md">
                    <div className="p-8 h-full flex flex-col">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                            <feature.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm flex-grow">
                            {feature.description}
                        </p>
                    </div>
                </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platform;
