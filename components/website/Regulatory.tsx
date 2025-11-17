import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconChevronDown } from '../Icons';

const accordionItems = [
    {
        title: 'AI as a Medical Device (SaMD)',
        content: 'Anviksha AI is developed as a Software as a Medical Device (SaMD), adhering to the highest standards of safety and efficacy as outlined by international regulatory bodies like the FDA and the International Medical Device Regulators Forum (IMDRF).'
    },
    {
        title: 'FDA Clearance Pathways',
        content: 'We are actively pursuing the FDA 510(k) clearance pathway, which requires demonstrating that our device is substantially equivalent to a legally marketed device. Our rigorous validation processes are designed to meet and exceed these stringent requirements.'
    },
    {
        title: 'Data Privacy & HIPAA Compliance',
        content: 'Patient data privacy is paramount. Our platform is architected to be fully HIPAA compliant, utilizing end-to-end encryption and robust data anonymization techniques to ensure the utmost security and confidentiality of protected health information (PHI).'
    }
];

const Regulatory: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="regulatory" className="py-20 lg:py-32 bg-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y:20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7 }}
                  className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Regulatory & Compliance</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Building the future of medical AI requires a deep commitment to regulatory compliance, safety, and data privacy.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-16 max-w-3xl mx-auto"
                >
                    {accordionItems.map((item, index) => (
                        <div key={index} className="border-b border-slate-200">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center py-6 text-left"
                            >
                                <span className="text-lg font-semibold text-slate-800">{item.title}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <IconChevronDown className="w-6 h-6 text-slate-400" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-6 text-slate-600">
                                            {item.content}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Regulatory;