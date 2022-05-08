import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import './SliderNavigation.scss';

const SliderNavigation = ({
  calculators,
  activeState: { activeId, setActive },
}) => {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const { offsetWidth, scrollWidth } = ref.current;
    setWidth(offsetWidth - scrollWidth);
  }, []);

  const updateActive = (index) => () => setActive(index);

  const names = calculators.map((calculator, index) => {
    const { name } = calculator;
    const elementClasses = cn({
      navigation__element: true,
      navigation__element_active: index === activeId,
    });
    return (
      <div className='navigation__wrapper' key={name}>
        <p className={elementClasses} onClick={updateActive(index)}>
          {name}
        </p>
      </div>
    );
  });

  return (
    <motion.div
      ref={ref}
      drag='x'
      dragConstraints={{
        left: width,
        right: 0,
      }}
      className='navigation'
    >
      {names}
    </motion.div>
  );
};

export default SliderNavigation;
