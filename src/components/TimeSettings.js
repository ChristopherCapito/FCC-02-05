import React from 'react';

const TimeSettings = (props) => {
  let label = props.type.charAt(0).toUpperCase() + props.type.slice(1);
  // if(props.type == 'session')
  //   console.log(`${label} length in child: ${props.length}`);
  return (
    <div className='settings'>
      <p id={`${props.type}-label`}>{`${label} Length`}</p>
      <div className='row'>
        {' '}
        <button
          onClick={() => props.callback(props.type, 1)}
          id={`${props.type}-increment`}
        >
          +
        </button>
        <p id={`${props.type}-length`}>{props.length}</p>
        <button
          onClick={() => props.callback(props.type, -1)}
          id={`${props.type}-decrement`}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default TimeSettings;
