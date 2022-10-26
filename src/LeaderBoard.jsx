import React, { useEffect, useState } from 'react';
import './LeaderBoard.css';

function LeaderBoard({ highScores, setHighScores }) {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const time = document.querySelector('.timer-text').textContent;
    const timeInSeconds = +time.split(':')[0] * 60 + +time.split(':')[1];

    setHighScores((prev) => [
      ...prev,
      { name: inputValue, score: time, timeInSeconds },
    ]);

    e.target.style = 'display:none';
  };
  return (
    <div className='leader-board-container'>
      <h1>All Found!</h1>
      <h2 className='leader-board-header'>Leaderboard</h2>
      <div className='leader-board-results-container'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Input Name</label>
          <input
            type='text'
            name='name'
            id='name'
            className='leader-board-input'
            value={inputValue}
            onChange={handleChange}
          />
        </form>
        <div className='leaders-container'>
          {highScores
            .sort((a, b) => a.timeInSeconds - b.timeInSeconds)
            .map((leader) => {
              return (
                <div className='leader'>
                  <h3>{leader.name}</h3>
                  <h3>{leader.score}</h3>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
