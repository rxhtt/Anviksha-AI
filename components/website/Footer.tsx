import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import Logo from '../Logo';

const Footer: React.FC = () => {
    const targetRef = useRef<HTMLElement>(null);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      };

    return (
        <footer ref={targetRef} id="contact" className="relative overflow-hidden border-t border-slate-200 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="py-20 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-white">See the Future of Medical Imaging, Today.</h2>
                      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                          Discover how Anviksha AI can integrate into your workflow, enhance diagnostic accuracy, and improve patient outcomes.
                      </p>
                      <motion.div 
                        className="mt-8 flex justify-center"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                          <a href="https://chat.whatsapp.com/C0xisapocYFG5R04azJqFX?mode=hqrc" target="_blank" rel="noopener noreferrer">
                            <Button size="xl" variant="primary" className="bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30">
                              Request the Product
                            </Button>
                          </a>
                      </motion.div>
                    </motion.div>
                </div>

                <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-slate-800">
                    <div className="md:col-span-1">
                        <Logo />
                        <p className="mt-4 text-sm text-slate-400">
                            Our mission is to democratize access to world-class diagnostic tools, making healthcare more accurate, efficient, and equitable for everyone.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Solutions</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a onClick={() => scrollTo('solutions')} className="text-slate-400 hover:text-white cursor-pointer text-sm">Emergency Care</a></li>
                            <li><a onClick={() => scrollTo('solutions')} className="text-slate-400 hover:text-white cursor-pointer text-sm">Radiology Departments</a></li>
                            <li><a onClick={() => scrollTo('solutions')} className="text-slate-400 hover:text-white cursor-pointer text-sm">Public Health Screening</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Company</h3>
                         <ul className="mt-4 space-y-2">
                            <li className="text-slate-500 text-sm cursor-not-allowed">About Us <span className="text-xs text-slate-600">(Coming Soon)</span></li>
                            <li className="text-slate-500 text-sm cursor-not-allowed">Careers <span className="text-xs text-slate-600">(Coming Soon)</span></li>
                            <li><a href="https://chat.whatsapp.com/C0xisapocYFG5R04azJqFX?mode=hqrc" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Resources</h3>
                         <ul className="mt-4 space-y-2">
                            <li className="text-slate-500 text-sm cursor-not-allowed">Blog <span className="text-xs text-slate-600">(Coming Soon)</span></li>
                            <li className="text-slate-500 text-sm cursor-not-allowed">Whitepapers <span className="text-xs text-slate-600">(Coming Soon)</span></li>
                            <li className="text-slate-500 text-sm cursor-not-allowed">Clinical Evidence <span className="text-xs text-slate-600">(Coming Soon)</span></li>
                        </ul>
                    </div>
                </div>

                <div className="py-8 flex flex-col sm:flex-row justify-between items-center border-t border-slate-800">
                    <p className="text-sm text-slate-500">© {new Date().getFullYear()} Anviksha AI. All rights reserved.</p>
                     <p className="text-sm text-slate-600 mt-4 sm:mt-0">
                        Innovation & Concept by{' '}
                        <a
                            href="https://rohitbagewadi.carrd.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-blue-400 transition-colors"
                        >
                            Rohit Bagewadi
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;