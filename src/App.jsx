import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import TargetBox from './TargetBox';
import TargetBoxChamps from './TargetBoxChamps';
import champsImg from './assets/lol.jpg';
import Correct from './Correct';
import LeaderBoard from './LeaderBoard';

function App(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [style, setStyle] = useState({ top: 0, left: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCorrect, setIsCorrect] = useState(false);
  const [isOpenCorrect, setIsOpenCorrect] = useState(false);
  const [isChampOpen, setIsChampOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [champCorrect, setChampCorrect] = useState([0, 0, 0]);
  const [highScores, setHighScores] = useState([]);
  const { checkDB } = props;
  const champions = ['Yasuo', 'Ziggs', 'Karma'];

  const mousePos = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    return { x, y };
  };

  const clicked = (e) => {
    const { x, y } = mousePos(e);
    setIsClicked((prev) => (prev ? false : true));
    setIsChampOpen(true);
    setIsOpenCorrect(false);

    setStyle({ top: y + e.target.offsetTop, left: x + e.target.offsetLeft });
    setMousePosition({ x: x, y: y });
  };

  const check = async (name) => {
    if (!isClicked) {
      setIsCorrect(false);
      return;
    }
    const boxElement = document.querySelector('.target-box');
    const rect = boxElement.getBoundingClientRect();
    const boxWidth = rect.width;

    const boxStartX = mousePosition.x - boxWidth / 2;
    const boxStartY = mousePosition.y - boxWidth / 2;
    const boxEndX = mousePosition.x + boxWidth / 2;
    const boxEndY = mousePosition.y + boxWidth / 2;
    const champData = await checkDB(name.toLowerCase());

    if (
      champData.startX > boxStartX &&
      champData.startY > boxStartY &&
      boxEndX > champData.startX &&
      boxEndY > champData.startY
    ) {
      setIsCorrect(true);
      updateChampCorrectState(name.toLowerCase());
    } else {
      setIsCorrect(false);
    }

    setIsOpenCorrect((prev) => !prev);
    setIsChampOpen(false);
    return name.toLowerCase();
  };

  useEffect(() => {
    if (champCorrect.every((champ) => champ === 1)) setIsComplete(true);
  }, [champCorrect]);

  const updateChampCorrectState = (name) => {
    switch (name) {
      case 'yasuo':
        setChampCorrect((prev) => [1, ...prev.slice(-2)]);
        break;
      case 'ziggs':
        setChampCorrect((prev) => [prev[0], 1, prev[2]]);
        break;
      case 'karma':
        setChampCorrect((prev) => [...prev.slice(0, 2), 1]);
        break;
    }
  };

  return (
    <div className='App'>
      <Header
        champions={champions}
        isComplete={isComplete}
        setIsComplete={setIsComplete}
        setChampCorrect={setChampCorrect}
      />
      <div className='lol-image-container'>
        <img
          className='lol-image'
          src={champsImg}
          alt='lol champions image'
          onClick={clicked}
        />
      </div>
      {isOpenCorrect &&
        ([1, 2].includes(champCorrect.reduce((acc, num) => acc + num, 0)) ||
          isCorrect === false) && <Correct isCorrect={isCorrect} />}
      {isClicked && <TargetBox style={style} />}
      {isClicked && isChampOpen && (
        <TargetBoxChamps champions={champions} check={check} />
      )}
      {isComplete && (
        <LeaderBoard highScores={highScores} setHighScores={setHighScores} />
      )}
    </div>
  );
}

export default App;
