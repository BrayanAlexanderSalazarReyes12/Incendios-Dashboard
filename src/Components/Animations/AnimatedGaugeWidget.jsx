import React from 'react';
import { animated, useSpring } from 'react-spring';

const AnimatedGaugeWidget = ({ CO }) => {
  const { value } = useSpring({
    value: CO,
    from: { value: 0 },
    config: {
      duration: 1000,
      tension: 1,
      friction: 25,
    },
  });

  // Interpolating value to progress in the range [0, 100]
  const progress = value.to(v => (v / 2000) * 100);

  // Interpolating value to strokeDashoffset
  const strokeDashoffset = value.to(v => 283 - (v / 2000) * 283);

  return (
    <div className="gauge-widget">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#ccc" strokeWidth="10" />
        <animated.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#007bff"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="283" // Circunferencia del círculo (2 * Math.PI * 45)
          strokeDashoffset={strokeDashoffset}
          style={{
            transformOrigin: 'center center',
            transform: progress.to(p => `rotate(${p}deg)`),
          }}
        />
        <text x="50" y="55" fontSize="16" fontWeight="bold" fill="#007bff" textAnchor="middle">
          {CO} ppm
        </text>
      </svg>
    </div>
  );
};

export default AnimatedGaugeWidget;