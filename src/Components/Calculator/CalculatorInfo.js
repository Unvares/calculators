import React from 'react';
import cn from 'classnames';

const CalculatorInfo = ({ formula = '', lastResponse = {} }) => {
  const renderResult = ({ value, status }) => {
    const resultClasses = cn(
      'calculator__text calculator__text_input-aligned',
      {
        calculator__text_processing: status === 'processing',
        calculator__text_error: status === 'error',
      }
    );
    return (
      <span className={resultClasses}>{value && value.toUpperCase()}</span>
    );
  };

  return (
    <section className='calculator__info'>
      <div className='calculator__line'>
        <span className='calculator__text calculator__text_engraved'>
          FORMULA
        </span>
        <span className='calculator__text calculator__text_engraved calculator__text_input-aligned'>
          {formula.toUpperCase()}
        </span>
      </div>
      <div className='calculator__line'>
        <span className='calculator__text calculator__text_engraved'>
          RESULT
        </span>
        {renderResult(lastResponse)}
      </div>
    </section>
  );
};

export { CalculatorInfo };
