
import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight, IconFileCheck, IconMicroscope } from '../Icons';

const publications = [
  {
    journal: 'The Lancet Digital Health',
    title: 'Deep learning for pulmonary tuberculosis detection on chest radiographs',
    stat: '98.4%',
    statLabel: 'Sensitivity',
    year: '2021',
    link: 'https://www.thelancet.com/journals/landig/article/PIIS2589-7500(21)00188-4/fulltext',
  },
  {
    journal: 'Diagnostics (MDPI)',
    title: 'Automated Cardiomegaly Detection using DenseNet Architectures',
    stat: '96.1%',
    statLabel: 'Accuracy',
    year: '2023',
    link: 'https://www.mdpi.com/2075-4418/13/3/557',
  },
  {
    journal: 'Nature Medicine',
    title: 'Interpretable deep learning for thoracic disease localization',
    stat: 'Top 1%',
    statLabel: 'Performance',
    year: '2022',
    link: 'https://www.nature.com/articles/s41591-022-01774-8',
  }
];

const ClinicalEvidence: React.FC = () => {
  return (
    <section id="evidence" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Sticky Header */}
            <div className="lg:sticky lg:top-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6"
                >
                    <IconMicroscope size={14} />
                    Validated Science
                </motion.div>
                <h2 className="text-5xl font-bold text-white tracking-tight mb-6">
                    Trusted by the <br/>Scientific Community.
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed max-w-md mb-8">
                    We don't guess. Our algorithms are rigorously tested against gold-standard datasets and peer-reviewed by leading medical journals.
                </p>
                <div className="flex gap-8">
                    <div>
                        <div className="text-4xl font-bold text-white mb-1">2.5M+</div>
                        <div className="text-sm text-slate-500 uppercase tracking-wider">Images Trained</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-1">14</div>
                        <div className="text-sm text-slate-500 uppercase tracking-wider">Clinical Partners</div>
                    </div>
                </div>
            </div>

            {/* Right Column: Cards */}
            <div className="space-y-6">
                {publications.map((pub, index) => (
                    <motion.a
                        key={index}
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="block group"
                    >
                        <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl transition-all duration-300 hover:bg-slate-800 hover:border-slate-700 overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <IconFileCheck size={100} className="text-white" />
                            </div>
                            
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div>
                                    <span className="text-blue-400 text-sm font-semibold">{pub.journal}</span>
                                    <h3 className="text-xl font-bold text-slate-200 mt-2 group-hover:text-white transition-colors leading-snug max-w-sm">
                                        {pub.title}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white">{pub.stat}</div>
                                    <div className="text-xs text-slate-500 uppercase">{pub.statLabel}</div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-slate-800 relative z-10">
                                <span className="text-slate-500 text-sm">{pub.year} Publication</span>
                                <span className="flex items-center gap-2 text-white text-sm font-semibold group-hover:translate-x-1 transition-transform">
                                    Read Study <IconArrowRight size={16} />
                                </span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
};

export default ClinicalEvidence;
