import { useState, useEffect } from 'react';
import llama_verde from '../../img/sensor_llama/Verde.png';
import llama_amarilla from '../../img/sensor_llama/Amarillo.png';
import llama_roja from '../../img/sensor_llama/Rojo.png';

const FlameWidget = ({ llama }) => {
  const [color, setColor] = useState('green');
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (llama <= 4095 && llama >= 2501) {
      setColor('green');
    } else if (llama <= 2500 && llama >= 1001) {
      setColor('yellow');
    } else if (llama <= 1000) {
      setColor('red');
    }
  }, [llama]);

  useEffect(() => {
    // Add the fade-in class
    setAnimationClass('fade-in');
    
    // Remove the fade-in class after the animation duration
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 500); // Match the duration of the fade-in animation

    return () => clearTimeout(timer);
  }, [color]); // Depend on color to trigger the effect on change

  return (
    <>
      <div className={`p-1 bg-white rounded-lg border border-gray-200 shadow-md ${animationClass}`}>
        <h1 className="text-2xl font-bold">
          Llama: <p className="text-lg text-gray-700">{llama}</p>
        </h1>
      </div>
      <div className={`mt-auto mr-auto ml-6 mb-auto ${animationClass}`}>
        {color === 'green' && (
          <img src={llama_verde} alt="Llama verde" width="150px" height="150px" />
        )}
        {color === 'yellow' && (
          <img src={llama_amarilla} alt="Llama amarilla" width="150px" height="150px" />
        )}
        {color === 'red' && (
          <img src={llama_roja} alt="Llama roja" width="180px" height="180px" />
        )}
      </div>
    </>
  );
};

export default FlameWidget;