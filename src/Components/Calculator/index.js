import React from 'react';
import { motion } from 'framer-motion';
import { CalculatorTitle } from './CalculatorTitle';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorInfo } from './CalculatorInfo';
import './Calculator.scss';

const Calculator = ({
  activeId,
  calculator,
  lastResponse,
  setLastResponses,
}) => {
  const { title, inputs, formula } = calculator;

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      className='calculator'
    >
      <CalculatorTitle>{title.toUpperCase()}</CalculatorTitle>
      <CalculatorForm
        inputs={inputs}
        activeId={activeId}
        setLastResponses={setLastResponses}
      />
      <CalculatorInfo formula={formula} lastResponse={lastResponse} />
    </motion.div>
  );
};

export { Calculator };
