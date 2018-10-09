import React from 'react';
import PropTypes from 'prop-types';

function WorkingDaysCheckbox({
  name, label, checked, handleWorkingDaysSelection,
}) {
  return (
    <div className="col-1 mr-3 pl-0">
      <label htmlFor={name} className="flex-column align-items-start pl-0 font-weight-normal">
        {label}
        <input
          type="checkbox"
          className="mt-2"
          name={name}
          onChange={event => handleWorkingDaysSelection(event)}
          defaultChecked={checked}
        />
      </label>
    </div>
  );
}

WorkingDaysCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.string,
  handleWorkingDaysSelection: PropTypes.func.isRequired,
};

WorkingDaysCheckbox.defaultProps = {
  name: '',
  label: '',
  checked: '',
};

export default WorkingDaysCheckbox;
