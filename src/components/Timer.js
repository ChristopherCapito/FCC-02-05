import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

const Timer = ({
  lengths = { break: 5, session: 25 },
  seconds,
  type,
  startStop,
  counting,
}) => {
  const label = type.charAt(0).toUpperCase() + type.slice(1);

  // Helper for formatting time to mm:ss format
  const format = val => {
    function pad(num) {
      const s = `00${num}`;
      return s.substr(s.length - 2);
    }

    const secs = pad(val % 60);
    const minutes = pad(Math.floor(val / 60));
    return `${minutes}:${secs}`;
  };

  // console.log(`
  // Current Seconds: ${seconds}
  // Total Amount: ${lengths[type] * 60}
  // Type: ${type}
  // `);
  const percentage = 100 - Math.round((seconds / (lengths[type] * 60)) * 100);

  const icon = counting ? 'pause-outline' : 'play-outline';

  return (
    <>
      <div className="progress">
        <img
          className="startStop"
          onClick={() => startStop()}
          onKeyUp={() => startStop()}
          id="start_stop"
          alt={`${icon}`}
          src={`./icons/${icon}.svg`}
        />

        <CircularProgressbar
          value={percentage}
          strokeWidth={5}
          styles={buildStyles({
            // Text size
            textSize: '16px',

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.2,

            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',

            // Colors
            pathColor: `#FA6E6E`,
            textColor: '#FA6E6E',
            trailColor: '#D0D4D7',
          })}
        />
      </div>
      <p className="label" id="timer-label">
        {label}
      </p>
      <p id="time-left">{format(seconds)}</p>
    </>
  );
};

Timer.propTypes = {
  type: PropTypes.string,
  lengths: PropTypes.object,
  counting: PropTypes.bool,
  seconds: PropTypes.number,
  startStop: PropTypes.func,
};

export default Timer;
