import React from 'react';
// FIX: Import Variants type for explicit variant typing.
import { motion, Variants } from 'framer-motion';
import { IconBook, IconArrowRight } from '../Icons';
import Card from '../ui/Card';

const publications = [
  {
    journal: 'The Lancet Digital Health',
    title: 'Development and validation of a deep learning algorithm for detection of active pulmonary tuberculosis on chest radiographs',
    year: '2021',
    link: 'https://www.thelancet.com/journals/landig/article/PIIS2589-7500(21)00188-4/fulltext',
  },
  {
    journal: 'Diagnostics',
    title: 'Automated Cardiomegaly Detection from Chest X-ray Images Using a Deep Convolutional Neural Network',
    year: '2023',
    link: 'https://www.mdpi.com/2075-4418/13/3/557',
  },
  {
    journal: 'Nature Medicine',
    title: 'An interpretable deep learning model for the detection and localization of thoracic diseases from chest X-rays',
    year: '2022',
    link: 'https://www.nature.com/articles/s41591-022-01774-8',
  }
];

const ClinicalEvidence: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
        },
      };
    
      const itemVariants: Variants = {
        hidden: { x: -20, opacity: 0 },
        // FIX: Typing with Variants resolves incorrect type inference for 'ease: "easeOut"'.
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
      };

  return (
    <section id="evidence" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Clinically Validated & Trusted</h2>
          <p className="mt-4 text-lg text-slate-600">
            Our commitment to clinical excellence is demonstrated through rigorous testing and peer-reviewed publications in leading medical journals.
          </p>
        </motion.div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 max-w-3xl mx-auto space-y-4"
        >
          {publications.map((pub, index) => (
             <motion.a 
                key={index} 
                href={pub.link}
                target="_blank" 
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="block group"
             >
                <Card className="p-6 bg-white flex items-center justify-between transition-all duration-300 group-hover:border-slate-300 group-hover:bg-slate-100">
                    <div className="flex items-start gap-4">
                        <IconBook className="h-6 w-6 text-slate-400 mt-1"/>
                        <div>
                            <h3 className="font-bold text-slate-800 text-md">{pub.title}</h3>
                            <p className="text-sm text-slate-500 mt-1">{pub.journal} &bull; {pub.year}</p>
                        </div>
                    </div>
                    <IconArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
                </Card>
             </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClinicalEvidence;