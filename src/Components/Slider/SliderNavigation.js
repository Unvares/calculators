import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import './SliderNavigation.scss';

const SliderNavigation = ({ titles, activeId, onClick }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const { offsetWidth, scrollWidth } = ref.current;
    setWidth(offsetWidth - scrollWidth);
  }, []);

  const content = titles.map((title, index) => {
    const elementClasses = cn('navigation__element', {
      navigation__element_active: index === activeId,
    });
    return (
      <div className='navigation__element-wrapper' key={title}>
        <p className={elementClasses} onClick={() => onClick(index)}>
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
        {content}
      </motion.div>
    </motion.div>
  );
};

export { SliderNavigation };
