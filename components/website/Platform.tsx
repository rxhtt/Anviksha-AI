import React from 'react';
// FIX: Import Variants type for explicit variant typing.
import { motion, Variants } from 'framer-motion';
import { IconLung, IconHeart, IconBone, IconAi, IconJson } from '../Icons';
import Card from '../ui/Card';

const features = [
  {
    icon: IconLung,
    title: 'Pulmonary Analysis',
    description: 'Detects over 20 pulmonary abnormalities, including nodules, pneumonia, and pneumothorax, with pixel-perfect precision.'
  },
  {
    icon: IconHeart,
    title: 'Cardiac Assessment',
    description: 'Measures cardiothoracic ratio and identifies cardiomegaly and other key cardiac indicators from chest X-rays.'
  },
  {
    icon: IconBone,
    title: 'Skeletal Evaluation',
    description: 'Identifies and localizes fractures in ribs, clavicles, and other thoracic skeletal structures with high sensitivity.'
  }
];

const models = [
    {
      icon: IconAi,
      title: 'Convolutional Neural Networks (CNNs)',
      description: 'The core of our image analysis, advanced CNNs are trained to identify localized features like nodules and fractures.'
    },
    {
      icon: IconJson,
      title: 'Vision Transformers (ViTs)',
      description: 'Leveraged to understand global context within an image, improving assessments of conditions like cardiomegaly.'
    }
  ];

const Platform: React.FC = () => {
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
    <section id="platform" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">The Anviksha AI Platform</h2>
          <p className="mt-4 text-lg text-slate-600">
            Our proprietary AI models are trained on one of the world's largest and most diverse datasets of de-identified medical images, ensuring robust and generalizable performance across key clinical areas.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                className="p-8 text-center h-full bg-white transition-all duration-300"
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <motion.div 
                  className="inline-block p-4 bg-blue-100 rounded-full mb-6"
                >
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
                <p className="mt-2 text-slate-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 border-t border-slate-200 pt-16">
            <motion.div 
                initial={{ opacity: 0, y:20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="text-center max-w-3xl mx-auto"
                >
                <h3 className="text-3xl font-bold text-slate-900">Powered by a State-of-the-Art AI Engine</h3>
                <p className="mt-4 text-slate-600">
                    We employ a multi-model approach, combining the strengths of different neural network architectures for unparalleled accuracy.
                </p>
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {models.map((model, index) => (
                    <motion.div 
                        key={index} 
                        variants={itemVariants}
                        className="bg-slate-100/70 border border-slate-200 rounded-xl p-8"
                    >
                    <div className="flex items-center gap-4">
                        <model.icon className="h-8 w-8 text-blue-600" />
                        <h3 className="text-xl font-bold text-slate-800">{model.title}</h3>
                    </div>
                    <p className="mt-4 text-slate-600">{model.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Platform;