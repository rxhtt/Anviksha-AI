
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import new website components
import Header from './components/website/Header';
import Hero from './components/website/Hero';
import Solutions from './components/website/Solutions';
import Platform from './components/website/Platform';
import ProductDemo from './components/website/ProductDemo';
import ClinicalEvidence from './components/website/ClinicalEvidence';
import Regulatory from './components/website/Regulatory';
import Footer from './components/website/Footer';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  // Move the background grid down slowly as the user scrolls down
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <>
      {/* Subtle dot pattern background */}
      <motion.div 
        className="fixed top-0 left-0 -z-20 h-[120%] w-full bg-slate-50 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px]"
        style={{ y: gridY }}
      />
      
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#ffffff',
          color: '#334155',
          border: '1px solid #e2e8f0'
        },
      }} />
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Solutions />
        <Platform />
        <ProductDemo />
        <ClinicalEvidence />
        <Regulatory />
      </main>
      <Footer />
    </>
  );
};

export default App;