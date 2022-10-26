import React from 'react';
import './Correct.css';

function Correct(props) {
  return (
    <div className='is-correct-window'>
      <h2 className='is-correct-text'>
        {props.isCorrect ? 'Correct!' : 'nope'}
      </h2>
    </div>
  );
}

export default Correct;
