import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchHolidays, fetchSchedule, fetchSchedulePut } from '../../../../services/fetchApi';
import {
  dateChangeHandler,
  loadingHandler,
  workingDaysSelectionHandler,
  workingTimeBeginHandler,
  workingTimeEndHandler,
  workSelectionHandler,
} from '../../../../actions/contentActions';
import WorkingScheduleBaseBlock from './blocks/WorkingScheduleBaseBlock/WorkingScheduleBaseBlock';
import WorkingScheduleExceptionBlock
  from './blocks/WorkingScheduleExceptionBlock/WorkingScheduleExceptionBlock';
import PageError from '../ErrorPages/PageError';
import { prepareData } from '../../../../utils/utilities';
import Spinner from '../common/Spinner/Spinner';

class ConnectedAvailabilityCalendarPage extends Component {
  componentDidMount() {
    const {
      getSchedule,
      getHolidays,
      facilitatorId,
      setLoading,
    } = this.props;
    setLoading(true);
    getSchedule(facilitatorId);
    getHolidays();
  }

  isDataLoaded() {
    const { publicHolidays, schedule, isDataLoading } = this.props;
    return publicHolidays && schedule && !isDataLoading;
  }

  render() {
    const {
      history,
      errors,
      facilitatorId,
      schedule,
      handleSave,
      handleWorkingDaysSelection,
      handleWorkingTimeBegin,
      handleWorkingTimeEnd,
    } = this.props;

    if (Object.values(errors).filter(e => e).length) {
      const errorMessages = [];
      Object.keys(errors)
        .forEach((key) => {
          if (errors[key]) {
            errorMessages.push(
              <div key={errors[key]}>
                {`${key} - ${errors[key]}`}
              </div>,
            );
          }
        });
      return <PageError errorMessages={errorMessages} />;
    }
    if (!this.isDataLoaded()) {
      return <Spinner />;
    }

    return (
      <div>
        <section className="content-header">
          <div className="container-fluid">
            <h1>
              My Availability Calendar
            </h1>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid ">
            <div className="card card-info card-outline mb-0">
              <div className="card-header bg-transparent">
                <h4 className="card-title m-1">Work Schedule</h4>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <h6 className="pb-1">Work hours</h6>
                  <WorkingScheduleBaseBlock
                    daysOfWeek={schedule ? schedule.daysOfWeek : {}}
                    workingTime={schedule ? schedule.workingTime : {}}
                    handleWorkingDaysSelection={handleWorkingDaysSelection}
                    handleWorkingTimeBegin={handleWorkingTimeBegin}
                    handleWorkingTimeEnd={handleWorkingTimeEnd}
                  />
                  <h6 className="pb-1">Exceptions</h6>
                  <WorkingScheduleExceptionBlock />
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button
                  type="button"
                  onClick={(event) => {
                    handleSave(event, facilitatorId, schedule, history);
                    // history.push('/assignments');
                  }}
                  name="button-save"
                  className="btn btn-info btn-flat pl-4 pr-4 font-weight-bold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ConnectedAvailabilityCalendarPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setLoading: PropTypes.func.isRequired,
  getSchedule: PropTypes.func.isRequired,
  getHolidays: PropTypes.func.isRequired,
  handleWorkingDaysSelection: PropTypes.func.isRequired,
  handleWorkingTimeBegin: PropTypes.func.isRequired,
  handleWorkingTimeEnd: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  facilitatorId: PropTypes.string.isRequired,
  schedule: PropTypes.shape({}),
  publicHolidays: PropTypes.shape({}),
  currentException: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  isDataLoading: PropTypes.bool.isRequired,
};

ConnectedAvailabilityCalendarPage.defaultProps = {
  schedule: undefined,
  publicHolidays: undefined,
  currentException: undefined,
  errors: {},
};

const mapStateToProps = state => ({
  facilitatorId: state.facilitatorId,
  errors: state.errors,
  publicHolidays: state.publicHolidays,
  schedule: state.schedule,
  currentException: state.currentException,
  isDataLoading: state.isDataLoading,
});

const mapDispatchToProps = dispatch => ({
  setLoading: isDataLoading => dispatch(loadingHandler(isDataLoading)),
  getSchedule: facilitatorId => dispatch(fetchSchedule(facilitatorId)),
  getHolidays: () => dispatch(fetchHolidays()),
  handleWorkingDaysSelection: selectedDate => dispatch(workingDaysSelectionHandler(selectedDate)),
  handleWorkingTimeBegin: event => dispatch(workingTimeBeginHandler(event)),
  handleWorkingTimeEnd: event => dispatch(workingTimeEndHandler(event)),
  handleDateChange: selectedDate => dispatch(dateChangeHandler(selectedDate)),
  handleWorkSelection: isWorking => dispatch(workSelectionHandler(isWorking)),
  handleSave: (event, facilitatorId, schedule, history) => {
    event.preventDefault();
    dispatch(fetchSchedulePut(facilitatorId, JSON.stringify({
      ...prepareData(facilitatorId, schedule),
    }), history));
    dispatch(loadingHandler(true));
  },
});

const AvailabilityCalendarPage = connect(
  mapStateToProps, mapDispatchToProps,
)(ConnectedAvailabilityCalendarPage);

export default withRouter(AvailabilityCalendarPage);
