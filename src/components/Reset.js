import React from 'react';
import PropTypes from 'prop-types';

const Reset = ({ reset }) => (
  <div className="row">
    <button type="button" onClick={() => reset('all')} id="reset">
      Reset
    </button>
  </div>
);

Reset.propTypes = {
  reset: PropTypes.func,
};

export default Reset;
