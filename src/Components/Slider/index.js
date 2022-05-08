import React from 'react';
import { useState } from 'react';
import SliderNavigation from './SliderNavigation';
import SliderContent from './SliderContent';
import './Slider.scss';

const Slider = ({ calculators }) => {
  const [activeId, setActive] = useState(0);

  const calculator = calculators[activeId];

  return (
    <div className='slider'>
      <SliderNavigation
        calculators={calculators}
        activeState={{ activeId, setActive }}
      />
      <SliderContent
        sliderLength={calculators.length}
        calculator={calculator}
        activeState={{ activeId, setActive }}
      />
    </div>
  );
};

export default Slider;
