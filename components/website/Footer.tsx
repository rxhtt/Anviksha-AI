
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { IconActivity } from '../Icons';
import Logo from '../Logo';

const Footer: React.FC = () => {
    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-950 pt-32 pb-0 relative overflow-hidden w-full min-h-[800px] flex flex-col justify-between">
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-24">
                
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 max-w-4xl"
                    >
                        Ready to democratize healthcare?
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <a href="https://anviksha-device.vercel.app/" target="_blank" rel="noopener noreferrer">
                            <Button size="xl" variant="primary" icon={<IconActivity />} className="h-20 px-12 text-xl rounded-full shadow-blue-500/40 shadow-2xl">
                                Launch Anviksha Now
                            </Button>
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-slate-800 pt-16 bg-slate-950/40 backdrop-blur-sm rounded-xl p-6">
                    <div className="md:col-span-1">
                        <div className="mb-6">
                            <Logo light={true} /> 
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            The operating system for the next generation of digital hospitals. Bringing accuracy, speed, and affordability to everyone.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-bold mb-6">Platform</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><button onClick={() => scrollTo('solutions')} className="hover:text-blue-400 transition-colors text-left">Solutions</button></li>
                            <li><button onClick={() => scrollTo('evidence')} className="hover:text-blue-400 transition-colors text-left">Clinical Evidence</button></li>
                            <li><button onClick={() => scrollTo('regulatory')} className="hover:text-blue-400 transition-colors text-left">Safety & Privacy</button></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="cursor-not-allowed opacity-50">About</li>
                            <li className="cursor-not-allowed opacity-50">Careers</li>
                            <li><a href="https://chat.whatsapp.com/C0xisapocYFG5R04azJqFX?mode=hqrc" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li className="cursor-not-allowed opacity-50">Privacy Policy</li>
                            <li className="cursor-not-allowed opacity-50">Terms of Service</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-sm relative z-20 pb-8">
                    <p>© {new Date().getFullYear()} Anviksha AI. All rights reserved.</p>
                    <p>Concept & Design by <a href="https://rohitbagewadi.carrd.co" target="_blank" className="text-slate-400 hover:text-white transition-colors">Rohit Bagewadi</a></p>
                </div>
            </div>

            {/* Giant Watermark - Moved to absolute bottom, z-index 0 to be behind content but visible */}
            <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full flex justify-center overflow-hidden pointer-events-none z-0">
                <h1 className="text-[23vw] font-black text-slate-900 select-none leading-none tracking-tighter whitespace-nowrap opacity-80">
                    ANVIKSHA
                </h1>
            </div>
        </footer>
    );
};

export default Footer;
