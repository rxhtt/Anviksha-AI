
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo';

const navItems = [
  { label: 'Solutions', id: 'solutions' },
  { label: 'Platform', id: 'platform' },
  { label: 'Product', id: 'product' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Clinical Evidence', id: 'evidence' },
  { label: 'Regulatory', id: 'regulatory' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        },
        { rootMargin: '-50% 0px -50% 0px' } // Set active when section is in the middle of the viewport
    );
    
    // Also observe the hero section
    const heroEl = document.getElementById('hero');
    if (heroEl) observer.observe(heroEl);

    navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
    });

    return () => {
        if(heroEl) observer.unobserve(heroEl);
        navItems.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.unobserve(el);
        });
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const displayId = hoveredId || activeId;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-50/80 backdrop-blur-lg border-b border-slate-200' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="cursor-pointer" onClick={() => scrollTo('hero')}>
             <Logo />
          </div>
          
          <nav
            className="hidden md:flex items-center gap-4"
            onMouseLeave={() => setHoveredId(null)}
          >
            {navItems.map(item => {
              const isActive = displayId === item.id;
              return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`relative text-sm font-medium py-2 px-2 transition-colors duration-200 z-10 ${
                    isActive ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.button>
            )})}
          </nav>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
