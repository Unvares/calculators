import React from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import './Calculator.scss';

const Calculator = ({ children }) => (
  <motion.div
    drag
    dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
    className='calculator'
  >
    {children}
  </motion.div>
);

const renderForm = (inputs) => (
  <form>
    {inputs.map((input) => {
      return (
        <div className='calculator__line calculator__line_input' key={input}>
          <label
            className='calculator__text calculator__text_engraved'
            htmlFor={input}
          >
            {input.toUpperCase()}
          </label>
          <input
            className='calculator__input calculator__text'
            type='text'
            name={input}
            id={input}
            autoComplete='off'
          />
        </div>
      );
    })}
  </form>
);

const TopSection = ({ header, inputs }) => (
  <section className='calculator__section'>
    <h2 className='calculator__text calculator__text_engraved'>
      {header.toUpperCase()}
    </h2>
    {renderForm(inputs)}
  </section>
);

const renderResult = ({ value, status }) => {
  const resultClasses = cn({
    calculator__text: true,
    'calculator__text_input-aligned': true,
    calculator__text_processing: status === 'processing',
    calculator__text_error: status === 'error',
  });

  return (
    <div className='calculator__line'>
      <span className='calculator__text calculator__text_engraved'>RESULT</span>
      <span className={resultClasses}>{value && value.toUpperCase()}</span>
    </div>
  );
};

const BottomSection = ({ formula, lastResponse }) => (
  <section className='calculator__section'>
    <div className='calculator__line'>
      <span className='calculator__text calculator__text_engraved'>
        FORMULA
      </span>
      <span className='calculator__text calculator__text_engraved calculator__text_input-aligned'>
        {formula}
      </span>
    </div>
    {renderResult(lastResponse)}
  </section>
);

Calculator.TopSection = TopSection;
Calculator.BottomSection = BottomSection;

export { Calculator };
