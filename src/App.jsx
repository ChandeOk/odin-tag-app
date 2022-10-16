import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import TargetBox from './TargetBox';
import TargetBoxChamps from './TargetBoxChamps';

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [style, setStyle] = useState({ top: 0, left: 0 });
  const [offsets, setOffsets] = useState({ offsetX: 0, offsetY: 0 });
  const champions = ['Yasuo', 'Ziggs', 'Karma'];
  // let isClicked = true;
  const yasuo = {
    startX: 1323,
    endX: 1364,
    startY: 277,
    endY: 377,
  };
  const mousePos = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    return { x, y };
  };

  const clicked = (e) => {
    const { x, y } = mousePos(e);
    // alert(`${x} ${y} - ${offsetLeft} ${offsetTop}`);
    alert(`${x} ${y} ${e.target.offsetLeft} ${e.target.offsetTop}`);
    setIsClicked((prev) => (prev ? false : true));

    setStyle({ top: y + e.target.offsetTop, left: x + e.target.offsetLeft });
    setOffsets({ offsetX: e.target.offsetLeft, offsetY: e.target.offsetTop });
  };

  useEffect(() => {
    if (!isClicked) return;
    const boxElement = document.querySelector('.target-box');
    const rect = boxElement.getBoundingClientRect();
    const boxH = rect.height;
    const boxW = rect.width;

    console.log(rect);
    console.log(offsets);
    const x = rect.x - offsets.offsetX;
    const y = rect.y - offsets.offsetY;
    if (
      yasuo.startX > x &&
      yasuo.startX < x + rect.width &&
      yasuo.endX > x &&
      yasuo.endX < x + rect.width &&
      yasuo.startY > y &&
      yasuo.startY < y + rect.height &&
      yasuo.endY > y &&
      yasuo.endY < y + rect.height
    )
      alert('FOUND');
    console.log(x, y);
  });

  return (
    <div className='App'>
      <Header champions={champions} />
      <div className='lol-image-container'>
        <img
          className='lol-image'
          src='src/assets/lol.jpg'
          alt='lol champions image'
          onClick={clicked}
        />
      </div>
      {/* <TargetBox /> */}
      {isClicked && <TargetBox style={style} />}
      <TargetBoxChamps champions={champions} />
    </div>
  );
}

export default App;
