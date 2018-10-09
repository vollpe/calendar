import React from 'react';
import PropTypes from 'prop-types';
import WorkingDaysCheckboxList from './components/WorkingDaysCheckboxList';
import ExceptionWorkingHoursForm from './components/WorkingHoursForm';

function WorkingScheduleBaseBlock(
  {
    workingTime,
    daysOfWeek,
    handleWorkingDaysSelection,
    handleWorkingTimeBegin,
    handleWorkingTimeEnd,
  },
) {
  return (
    <div>
      <ExceptionWorkingHoursForm
        workingTime={workingTime}
        handleWorkingTimeBegin={handleWorkingTimeBegin}
        handleWorkingTimeEnd={handleWorkingTimeEnd}
      />
      <h6>Work days</h6>
      <div
        className="col-12 col-sm-10 col-md-10 col-lg-7 col-xl-4 form-inline flex pb-3 pl-0 pr-0 "
      >
        <WorkingDaysCheckboxList
          workingDays={daysOfWeek}
          handleWorkingDaysSelection={handleWorkingDaysSelection}
        />
      </div>
    </div>
  );
}

WorkingScheduleBaseBlock.propTypes = {
  daysOfWeek: PropTypes.shape([]).isRequired,
  workingTime: PropTypes.shape({}).isRequired,
  handleWorkingDaysSelection: PropTypes.func.isRequired,
  handleWorkingTimeBegin: PropTypes.func.isRequired,
  handleWorkingTimeEnd: PropTypes.func.isRequired,
};

export default WorkingScheduleBaseBlock;
