import React, { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {
  workingTimeBeginHandler,
  workingTimeEndHandler,
  workSelectionHandler,
} from '../../../../../../../actions/contentActions';

class ConnectedExceptionWorkingHoursForm extends Component {
  showHideExceptionWorkingTime() {
    const { currentException } = this.props;
    return `mb-3 ${
      currentException && currentException.isWorking
        ? 'row'
        : 'hidden'}`; // hidden
  }

  render() {
    const {
      currentException, handleWorkSelection, handleWorkingTimeBegin, handleWorkingTimeEnd,
    } = this.props;
    return (
      <form onSubmit={event => handleWorkSelection(event)}>
        <div className={this.showHideExceptionWorkingTime()}>
          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-5 pb-3">
            <input
              className="form-control timepicker"
              type="time"
              name="workingTimeBegin"
              onChange={event => handleWorkingTimeBegin(event)}
              step="900"
              value={currentException ? currentException.workingTimeBegin : ''}
            />
          </div>
          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-3 col-5 pb-3">
            <input
              className="form-control timepicker"
              type="time"
              name="workingTimeEnd"
              onChange={event => handleWorkingTimeEnd(event)}
              step="900"
              value={currentException ? currentException.workingTimeEnd : ''}
            />
          </div>
          <div className="col align-self-end pb-3">
            <button
              type="submit"
              name="button-add-exception"
              className="btn btn-secondary btn-flat font-weight-bold"
            >
              Add Exception
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ConnectedExceptionWorkingHoursForm.propTypes = {
  currentException: PropTypes.shape({}).isRequired,
  handleWorkSelection: PropTypes.func.isRequired,
  handleWorkingTimeBegin: PropTypes.func.isRequired,
  handleWorkingTimeEnd: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  validationMessages: state.validationMessages,
  currentException: state.currentException,
});

const mapDispatchToProps = dispatch => ({
  handleWorkSelection: (event) => {
    event.preventDefault();
    dispatch(workSelectionHandler(true));
  },
  handleWorkingTimeBegin: event => dispatch(workingTimeBeginHandler(event)),
  handleWorkingTimeEnd: event => dispatch(workingTimeEndHandler(event)),
});

const ExceptionWorkingHoursForm = connect(
  mapStateToProps, mapDispatchToProps,
)(ConnectedExceptionWorkingHoursForm);

export default ExceptionWorkingHoursForm;
