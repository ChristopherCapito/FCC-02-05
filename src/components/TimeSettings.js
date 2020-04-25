import React from 'react';
import PropTypes from 'prop-types';

const TimeSettings = ({ type, callback, length }) => {
  const label = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="settings">
      <p className="label" id={`${type}-label`}>{`${label} Length`}</p>
      <div className="row">
        {' '}
        <button
          type="button"
          onClick={() => callback(type, 1)}
          id={`${type}-increment`}
        >
          +
        </button>
        <p id={`${type}-length`}>{length}</p>
        <button
          type="button"
          onClick={() => callback(type, -1)}
          id={`${type}-decrement`}
        >
          -
        </button>
      </div>
    </div>
  );
};

TimeSettings.propTypes = {
  type: PropTypes.string,
  length: PropTypes.number,
  callback: PropTypes.func,
};

export default TimeSettings;
