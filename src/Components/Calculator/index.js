import React, { useState } from 'react';
import { CalculatorTitle } from './CalculatorTitle';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorInfo } from './CalculatorInfo';
import './Calculator.scss';

const Calculator = ({ activeId, calculator }) => {
  const [lastResponses, setLastResponses] = useState([]);
  const { title, inputs, formula } = calculator;

  return (
    <div className='calculator'>
      <CalculatorTitle>{title.toUpperCase()}</CalculatorTitle>
      <CalculatorForm
        inputs={inputs}
        activeId={activeId}
        setLastResponses={setLastResponses}
      />
      <CalculatorInfo
        formula={formula}
        lastResponse={lastResponses[activeId]}
      />
    </div>
  );
};

export { Calculator };
