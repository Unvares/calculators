import React from 'react';
import { useState } from 'react';
import { SliderNavigation } from './SliderNavigation';
import { SliderContent } from './SliderContent';
import './Slider.scss';

const Slider = ({ calculators }) => {
  const { length } = calculators;

  if (length === 0) return null;
  
  const initialResponses = Array(length).fill({
    value: null,
    status: null,
  });
  const [activeId, setActive] = useState(0);
  const [lastResponses, setLastResponse] = useState(initialResponses);
  
  const calculator = calculators[activeId];

  return (
    <div className='slider'>
      <SliderNavigation
        calculators={calculators}
        activeState={{ activeId, setActive }}
      />
      <SliderContent
        sliderLength={length}
        calculator={{
          ...calculator,
          lastResponse: lastResponses[activeId],
        }}
        activeState={{ activeId, setActive }}
      />
    </div>
  );
};

export { Slider };
