import React from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { Server } from '../App';
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

const normalizeInput = (input) =>
  input.map((value) => (value === '' ? null : Number(value)));

const getValues = (form) => {
  const data = new FormData(form);
  return normalizeInput([...data.values()]);
};

const updateLastResponses = ({ status, value, setLastResponses, activeId }) => {
  let stateObject;

  if (status === 'fulfilled') stateObject = { status, value };
  if (status === 'processing') stateObject = { status, value: 'processing...' };
  if (status === 'error') stateObject = { status, value: 'error' };

  setLastResponses((state) => {
    const newState = [...state];
    newState[activeId] = stateObject;
    return newState;
  });
};

const handleSubmit =
  ({ activeId, setLastResponses }) =>
  (event) => {
    event.preventDefault();

    updateLastResponses({
      setLastResponses,
      activeId,
      status: 'processing',
    });

    const values = getValues(event.target);
    const request = {
      method: 'POST',
      path: '',
      body: { values, id: activeId },
    };

    Server.fetch(JSON.stringify(request))
      .then((response) =>
        updateLastResponses({
          setLastResponses,
          activeId,
          status: 'fulfilled',
          value: response,
        })
      )
      .catch((message) => {
        updateLastResponses({ setLastResponses, activeId, status: 'error' });
        throw new Error(message);
      });
  };

const TopSection = ({ title, inputs, activeId, setLastResponses }) => (
  <section className='calculator__section'>
    <h2 className='calculator__text calculator__text_engraved'>
      {title.toUpperCase()}
    </h2>
    <form onSubmit={handleSubmit({ activeId, setLastResponses })}>
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
      <button type='submit' style={{ display: 'none' }}></button>
    </form>
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
