import React from 'react';
import ChampPreview from './ChampPreview';
import './TargetBoxChamps.css';

function TargetBox(props) {
  console.log(props);
  return (
    <div className='target-box-champs'>
      {props.champions.map((champ, i) => (
        <ChampPreview name={champ} key={i} />
      ))}
    </div>
  );
}

export default TargetBox;
