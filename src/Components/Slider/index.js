import React, { useState } from 'react';
import { SliderNavigation } from './SliderNavigation';
import { SliderContent } from './SliderContent';
import './Slider.scss';

const Slider = ({ calculators = [] }) => {
  const { length } = calculators;
  if (length === 0) return null;

  const [activeId, setActive] = useState(0);
  const titles = calculators.map(({ title }) => title);

  return (
    <div className='slider'>
      <SliderNavigation
        activeId={activeId}
        onClick={setActive}
        titles={titles}
      />
      <SliderContent
        activeId={activeId}
        calculator={calculators[activeId]}
        onClick={setActive}
        length={length}
      />
    </div>
  );
};

export { Slider };
