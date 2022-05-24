import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from '../Calculator';
import './SliderContent.scss';

const SliderContent = ({ activeId, onClick, calculator, length }) => {
  const prevActive = (activeId + length - 1) % length;
  const nextActive = (activeId + 1) % length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.75 }}
        animate={{ scale: 1 }}
        className='content'
      >
        <div
          className='content__arrow content__arrow_prev'
          onClick={() => onClick(prevActive)}
        >
          <span>&lt;</span>
        </div>
        <Calculator calculator={calculator} activeId={activeId} />
        <div
          className='content__arrow content__arrow_next'
          onClick={() => onClick(nextActive)}
        >
          <span>&gt;</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { SliderContent };
