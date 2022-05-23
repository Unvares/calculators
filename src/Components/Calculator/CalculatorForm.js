import React from 'react';
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
  const getValues = (form) => {
    const data = new FormData(form);
    return normalizeInput([...data.values()]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLastResponse({ status: 'processing', value: 'processing...' });

    const values = getValues(event.target);
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
      .catch((message) => {
        setLastResponse({ status: 'error', value: 'error' });
        throw new Error(message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
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
      ))}
      <button type='submit' style={{ display: 'none' }}></button>
    </form>
  );
};

export { CalculatorForm };
