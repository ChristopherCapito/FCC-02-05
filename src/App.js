import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Timer from './components/Timer';
import TimeSettings from './components/TimeSettings';
import useInterval from './components/helper/helper';
import Reset from './components/Reset';

function App() {
  const [lengths, setLengths] = useState({ break: 5, session: 25 });
  const [secondsLeft, setSecondsLeft] = useState(lengths.session * 60);
  const [type, setType] = useState('session');
  const [counting, setCounting] = useState(false);
  const alarmSound = useRef();

  // The actual counter
  useInterval(
    () => {
      setSecondsLeft(secondsLeft - 1);
    },
    counting ? 1000 : null
  );

  // Plays the audio when timer has has reached 00:00
  const beep = () => {
    // Play audio
    // Show loading animation.
    alarmSound.current.load();
    const playPromise = alarmSound.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          alarmSound.current.addEventListener(
            'ended',
            () => (alarmSound.current.currentTime = 0)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  // Reset everything
  const reset = (what) => {
    if (what === 'all') {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }
    setLengths({ break: 5, session: 25 });
    setCounting(false);
    setSecondsLeft(25 * 60);
    setType('session');
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      beep();
      type === 'break' && reset();

      if (type === 'session') {
        setType('break');
        setSecondsLeft(lengths.break * 60);
      }
    }
  }, [secondsLeft, type, lengths.break]);

  // Toggle start stop
  const startStop = () => setCounting(!counting);

  // Increment and decrement settings
  const updateTimeLengths = (updatedType, diff) => {
    const newValue = Math.max(Math.min(lengths[updatedType] + diff, 60), 1);
    // Restrict between minLength and maxLength
    setCounting(false);
    setLengths({
      ...lengths,
      [updatedType]: newValue,
    });
    type === updatedType && setSecondsLeft(newValue * 60);
  };

  return (
    <div className='App'>
      <div className='container'>
        <Timer
          lengths={lengths}
          type={type}
          counting={counting}
          startStop={startStop}
          reset={reset}
          seconds={secondsLeft}
        />
        <TimeSettings
          type='break'
          length={lengths.break}
          callback={updateTimeLengths}
        />
        <TimeSettings
          type='session'
          length={lengths.session}
          callback={updateTimeLengths}
        />
        <Reset reset={reset} />

        <audio ref={alarmSound} id='beep' src='./audio/alarm.wav'>
          <track kind='captions'></track>
        </audio>
      </div>
    </div>
  );
}

export default App;
