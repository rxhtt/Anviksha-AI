import React from 'react';
// FIX: Import Variants type for explicit variant typing.
import { motion, Variants } from 'framer-motion';
// FIX: Corrected the icon import from IconUsers to IconPatients, as exported in Icons.tsx.
import { IconHeart, IconPatients, IconLung } from '../Icons';
import Card from '../ui/Card';

const solutions = [
  {
    icon: IconHeart,
    title: 'Emergency Care & Triage',
    description: 'Accelerate critical decision-making by rapidly identifying life-threatening conditions like pneumothorax and rib fractures at the point of care.'
  },
  {
    icon: IconLung,
    title: 'Radiology Department Workflow',
    description: 'Optimize radiologist workflow by automatically prioritizing critical cases and pre-drafting reports for common findings, reducing turnaround time.'
  },
  {
    // FIX: Updated the icon to use the correctly imported IconPatients.
    icon: IconPatients,
    title: 'Public Health Screening',
    description: 'Enable large-scale, cost-effective screening programs for diseases like Tuberculosis in low-resource settings, improving early detection and outcomes.'
  }
];

const Solutions: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    // FIX: Typing with Variants resolves incorrect type inference for 'ease: "easeOut"'.
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="solutions" className="py-20 lg:py-32 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Solutions for Every Clinical Setting</h2>
          <p className="mt-4 text-lg text-slate-600">
            Anviksha AI is not a one-size-fits-all tool. Our platform is adaptable to meet the unique challenges and workflows of diverse healthcare environments.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                className="p-8 text-center h-full bg-white border-slate-200 transition-all duration-300"
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
                  <solution.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{solution.title}</h3>
                <p className="mt-2 text-slate-600">{solution.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;