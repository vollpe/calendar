import React from 'react';
import PropTypes from 'prop-types';
import WorkingDaysCheckbox from './WorkingDaysCheckbox';
import { weekDayNames } from '../../../../../../../constants/constants';

function WorkingDaysCheckboxList({ workingDays, handleWorkingDaysSelection }) {
  const dayCheckboxes = [];

  Object.keys(weekDayNames).forEach(key => dayCheckboxes.push(
    <WorkingDaysCheckbox
      name={weekDayNames[key].name}
      handleWorkingDaysSelection={handleWorkingDaysSelection}
      label={weekDayNames[key].name.charAt(0)
        .toUpperCase() + weekDayNames[key].name.slice(1, 3)}
      checked={workingDays[weekDayNames[key].name] ? 'checked' : ''}
      key={weekDayNames[key].name}
    />,
  ));
  return dayCheckboxes;
}

WorkingDaysCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.string,
};

WorkingDaysCheckbox.defaultProps = {
  name: '',
  label: '',
  checked: '',
};

export default WorkingDaysCheckboxList;
