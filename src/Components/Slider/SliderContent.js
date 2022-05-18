import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { Calculator } from '../Calculator';
import './SliderContent.scss';

const SliderContent = ({
  calculator: { title, inputs, formula, lastResponse },
  activeState: { activeId, setActive },
  sliderLength,
}) => {
  const updateActive = (index) => () => setActive(index);

  const prevActive = (activeId + sliderLength - 1) % sliderLength;
  const nextActive = (activeId + 1) % sliderLength;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.75 }}
        animate={{ scale: 1 }}
        className='content'
      >
        <div
          className='content__arrow content__arrow_prev'
          onClick={updateActive(prevActive)}
        >
          <span>&lt;</span>
        </div>
        <Calculator>
          <Calculator.TopSection
            title={title}
            inputs={inputs}
          />
          <Calculator.BottomSection
            formula={formula}
            lastResponse={lastResponse}
          />
        </Calculator>
        <div
          className='content__arrow content__arrow_next'
          onClick={updateActive(nextActive)}
        >
          <span>&gt;</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { SliderContent };
