import React from 'react';
import './ChampPreview.css';

function ChampPreview(props) {
  const imageUrl = `http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${props.name}.png`;
  return (
    <div className='champ-preview'>
      <img src={imageUrl} alt={`${props.name} preview image`} />
      <div className='champ-name'>
        <h2>{props.name}</h2>
      </div>
    </div>
  );
}

export default ChampPreview;
