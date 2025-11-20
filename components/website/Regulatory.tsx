
import React from 'react';
import { motion } from 'framer-motion';
import { IconCheckCircle, IconShield, IconLock } from '../Icons';

const Regulatory: React.FC = () => {
    return (
        <section id="regulatory" className="py-32 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    
                    <div className="lg:col-span-5">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6"
                        >
                            Safety is our <br/>
                            <span className="text-blue-600">North Star.</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600 leading-relaxed mb-8"
                        >
                            We are building a medical device, not just an app. Every line of code is written with patient safety, data privacy, and regulatory compliance in mind.
                        </motion.p>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-1 gap-8">
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-6"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                                <IconCheckCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">FDA & SaMD Alignment</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Developed strictly as a Software as a Medical Device (SaMD). We are actively pursuing FDA 510(k) clearance by demonstrating substantial equivalence to existing predicate devices.
                                </p>
                            </div>
                        </motion.div>

                        <div className="w-full h-px bg-slate-200" />

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-6"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                                <IconLock size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">HIPAA & GDPR Ready</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Your data is sacred. We employ military-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit. We do not sell patient data.
                                </p>
                            </div>
                        </motion.div>

                         <div className="w-full h-px bg-slate-200" />

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-6"
                        >
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                                <IconShield size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Clinical Governance</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Oversight by a board of certified radiologists and medical professionals ensuring that AI outputs are clinically relevant and safe.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Regulatory;
