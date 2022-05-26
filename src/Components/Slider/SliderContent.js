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
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        className='content'
      >
        <div
          className='content__arrow content__arrow_prev'
          onClick={() => onClick(prevActive)}
        >
          <div className='content__arow_top' />
          <div className='content__arow_bottom' />
        </div>
        <Calculator calculator={calculator} activeId={activeId} />
        <div
          className='content__arrow content__arrow_next'
          onClick={() => onClick(nextActive)}
        >
          <div className='content__arow_top' />
          <div className='content__arow_bottom' />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { SliderContent };
