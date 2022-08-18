import React, { useState } from 'react';
import { Server } from '../App';

const CalculatorForm = ({ inputs, activeId, setLastResponses }) => {
  const setLastResponse = (newLastResponse) =>
    setLastResponses((state) => {
      const newState = [...state];
      newState[activeId] = newLastResponse;
      return newState;
    });

  const normalizeInput = (input) =>
    input.map((value) => (value === '' ? null : Number(value)));

  const handleSubmit = (event) => {
    event.preventDefault();

    setLastResponse({ status: 'processing', value: 'processing...' });

    const values = normalizeInput(inputValues);
    const request = {
      method: 'POST',
      path: '',
      body: { values, id: activeId },
    };

    Server.fetch(JSON.stringify(request))
      .then((response) =>
        setLastResponse({
          value: response,
          status: 'fulfilled',
        })
      )
      .catch(() => {
        setLastResponse({ status: 'error', value: 'error' });
      });
  };

  const [values, setValues] = useState([]);
  const inputValues = values[activeId] || Array(inputs.length).fill('');

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input, index) => (
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
            value={inputValues[index] || ''}
            onChange={({ target: { value } }) =>
              setValues((values) => {
                inputValues[index] = value;
                const newValues = [...values];
                newValues[activeId] = inputValues;
                return newValues;
              })
            }
            autoComplete='off'
          />
        </div>
      ))}
      <button type='submit' style={{ display: 'none' }}></button>
    </form>
  );
};

export { CalculatorForm };
