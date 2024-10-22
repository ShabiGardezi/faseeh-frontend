'use client';

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const NumberAnimation = ({
  start = 0,
  end = 100,
  duration = 2,
  suffix,
  prefix,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,  // Ensure the animation runs only once
    threshold: 0.5,     // Adjusts when the component is considered "in view" (0.5 = 50% visible)
  });

  return (
    <div ref={ref}>
      <h1 className="text-5xl md:text-7xl font-semibold p-2">
        {inView && (
          <CountUp
            start={start}
            end={end}
            duration={duration}
            suffix={suffix}
            prefix={prefix}
          />
        )}
      </h1>
    </div>
  );
};

export default NumberAnimation;
