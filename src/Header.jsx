import React from 'react';
import ChampPreview from './ChampPreview';
import './header.css';

function Header(props) {
  return (
    <div className='header'>
      <div className='champs-container'>
        {props.champions.map((champ) => (
          <ChampPreview name={champ} />
        ))}
      </div>
    </div>
  );
}

export default Header;
