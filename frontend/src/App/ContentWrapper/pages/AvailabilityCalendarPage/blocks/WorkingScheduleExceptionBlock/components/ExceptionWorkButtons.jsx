import React from 'react';
import PropTypes from 'prop-types';

function ExceptionWorkButtons({ currentException, onWorkSelection }) {
  const notworkClassName = `mb-2 mr-1 btn button-exception button-exception-notwork ${currentException
  && !currentException.isWorking ? 'checked' : ''}`;
  const workClassName = `mb-2 mr-1 btn button-exception button-exception-work ${currentException
  && currentException.isWorking ? 'checked' : ''}`;
  return (
    <div className="row">
      <div className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-1">
        <button
          type="button"
          id="exception-notwork"
          name="exception-notwork"
          className={notworkClassName}
          onClick={() => onWorkSelection(false)}
        />
        Not work
      </div>
      <div className="col-5 col-sm-4 col-md-3 col-lg-3 col-xl-1">
        <label htmlFor="exception-work" className="font-weight-normal">
          <input
            type="button"
            id="exception-work"
            name="exception-work"
            className={workClassName}
            onClick={() => onWorkSelection(true)}
          />
          Work
        </label>
      </div>
    </div>
  );
}

ExceptionWorkButtons.propTypes = {
  currentException: PropTypes.shape({}).isRequired,
  onWorkSelection: PropTypes.func.isRequired,
};

export default ExceptionWorkButtons;
