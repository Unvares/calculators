import React from 'react';
import { Calculator } from '../Calculator';
import './SliderContent.scss';

const SliderContent = ({
  calculator: { title, inputs, formula, lastResponse },
  activeState: { activeId, setActive },
  sliderLength,
}) => {
  const updateActive = (index) => () => setActive(index);

  const prevActive = (activeId + sliderLength - 1) % sliderLength;
  const nextActive = (activeId + 1) % sliderLength;

  return (
    <div className='content'>
      <div
        className='content__arrow content__arrow_prev'
        onClick={updateActive(prevActive)}
      >
        <span>&lt;</span>
      </div>
      <Calculator>
        <Calculator.TopSection
          title={title}
          inputs={inputs}
        />
        <Calculator.BottomSection
          formula={formula}
          lastResponse={lastResponse}
        />
      </Calculator>
      <div
        className='content__arrow content__arrow_next'
        onClick={updateActive(nextActive)}
      >
        <span>&gt;</span>
      </div>
    </div>
  );
};

export { SliderContent };
