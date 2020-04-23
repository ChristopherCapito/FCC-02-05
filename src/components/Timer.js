import React from 'react';

const Timer = (props) => {
  let label = props.type.charAt(0).toUpperCase() + props.type.slice(1);

  // Helper for formatting time to mm:ss format
  const format = (seconds) => {
    function pad(num) {
      let s = '00' + num;
      return s.substr(s.length - 2);
    }

    const secs = pad(seconds % 60);
    const minutes = pad(Math.floor(seconds / 60));
    return `${minutes}:${secs}`;
  };

  return (
    <div>
      <p id='timer-label'>{label}</p>
      <p id='time-left'>{format(props.seconds)}</p>
      <div className='row'>
        {' '}
        <button onClick={() => props.startStop()} id='start_stop'>
          {props.counting ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => props.reset('all')} id='reset'>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
