

import React from 'react';
// FIX: Import Variants type for explicit variant typing.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { IconX } from '../Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    // FIX: Typing with Variants resolves incorrect type inference for 'type: "spring"'.
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { scale: 0.9, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-slate-100">{title}</h2>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-200">
                <IconX />
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;