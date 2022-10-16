import React from 'react';
import './TargetBox.css';

function TargetBox(props) {
  console.log(props);
  return <div className='target-box' style={props.style}></div>;
}

export default TargetBox;
