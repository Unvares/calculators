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
    const { title } = calculator;
    const elementClasses = cn({
      navigation__element: true,
      navigation__element_active: index === activeId,
    });
    return (
      <div className='navigation__element-wrapper' key={title}>
        <p className={elementClasses} onClick={updateActive(index)}>
          {title}
        </p>
      </div>
    );
  });

  return (
    <motion.div
      initial={{ transform: 'translate(-100px)' }}
      animate={{ transform: 'translate(0px)' }}
      className='navigation-wrapper'
    >
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
    </motion.div>
  );
};

export { SliderNavigation };
