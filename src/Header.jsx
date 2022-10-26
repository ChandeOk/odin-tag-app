import React, { useState } from 'react';
import ChampPreview from './ChampPreview';
import './header.css';
import Timer from './Timer';

function Header(props) {
  const [isRestartClicked, setIsRestartClicked] = useState(false);

  const handleRestart = () => {
    props.setChampCorrect([0, 0, 0]);
    props.setIsComplete(false);
    setIsRestartClicked(true);
  };

  return (
    <div className='header'>
      {props.isComplete && (
        <button className='button' onClick={handleRestart}>
          RESTART
        </button>
      )}
      <div className='champs-container'>
        {props.champions.map((champ) => (
          <ChampPreview name={champ} />
        ))}
        <Timer
          isComplete={props.isComplete}
          isRestartClicked={isRestartClicked}
          setIsRestartClicked={setIsRestartClicked}
        />
      </div>
    </div>
  );
}

export default Header;
