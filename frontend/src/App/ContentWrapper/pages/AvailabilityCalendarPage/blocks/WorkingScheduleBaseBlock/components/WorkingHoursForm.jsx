import React from 'react';
import PropTypes from 'prop-types';

function ExceptionWorkingHoursForm({
  workingTime, handleWorkingTimeBegin, handleWorkingTimeEnd,
}) {
  return (
    <div className="working-hours row pb-3">
      <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-5">
        <input
          className="form-control timepicker"
          type="time"
          name="baseWorkingTimeBegin"
          onChange={event => handleWorkingTimeBegin(event)}
          step="900"
          value={workingTime ? workingTime.workingTimeBegin.padStart(5, '0') : ''}
        />
      </div>
      <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-5">
        <input
          className="form-control timepicker"
          type="time"
          name="baseWorkingTimeEnd"
          onChange={event => handleWorkingTimeEnd(event)}
          step="900"
          value={workingTime ? workingTime.workingTimeEnd.padStart(5, '0') : ''}
        />
      </div>
    </div>
  );
}

ExceptionWorkingHoursForm.propTypes = {
  workingTime: PropTypes.shape({}).isRequired,
  handleWorkingTimeBegin: PropTypes.func.isRequired,
  handleWorkingTimeEnd: PropTypes.func.isRequired,
};

export default ExceptionWorkingHoursForm;
