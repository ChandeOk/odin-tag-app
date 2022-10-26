import React, { useEffect, useState } from 'react';
import './Timer.css';

function Timer({ isComplete, isRestartClicked, setIsRestartClicked }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isComplete) return;
    const int = setInterval(() => setCount((prev) => (prev += 1)), 1000);
    if (isRestartClicked) {
      setCount(0);
      setIsRestartClicked(false);
    }
    return () => clearInterval(int);
  });
  return (
    <div className='timer'>
      <h2 className='timer-text'>
        {`${Math.floor(count / 60)}:${count % 60 < 10 ? 0 : ''}${count % 60}`}
      </h2>
    </div>
  );
}

export default Timer;
