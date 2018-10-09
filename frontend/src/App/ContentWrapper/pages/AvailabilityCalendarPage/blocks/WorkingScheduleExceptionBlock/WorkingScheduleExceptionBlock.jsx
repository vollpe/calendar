import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker/es';
import moment from 'moment';
import 'moment/locale/en-gb';
import connect from 'react-redux/es/connect/connect';
import {
  dateChangeHandler,
  deleteExceptionHandler,
  monthChangeHandler,
  workSelectionHandler,
} from '../../../../../../actions/contentActions';
import {
  calculateBaseHolidays,
  calculateExceptionDays,
  calculatePublicHolidays,
} from '../../../../../../utils/utilities';
import ExceptionWorkingHoursForm from './components/ExceptionWorkingHoursForm';
import ExceptionList from './components/ExceptionList';
import ExceptionWorkButtons from './components/ExceptionWorkButtons';
import {
  CLASS_DATEPICKER_HIGHLIGHT_HOLIDAYS,
  CLASS_DATEPICKER_HIGHLIGHT_NOTWORK, CLASS_DATEPICKER_HIGHLIGHT_PUBLIC_HOLIDAYS,
  CLASS_DATEPICKER_HIGHLIGHT_WORK,
  DATE_FORMAT,
} from '../../../../../../constants/constants';

class ConnectedWorkingScheduleExceptionBlock extends Component {
  highlightDates() {
    const { schedule, currentException, publicHolidays } = this.props;
    const selectedDate = currentException ? currentException.selectedDate : null;
    let holidays = calculateBaseHolidays(schedule, selectedDate);
    // if (publicHolidays) {
    //   holidays = [...holidays, ...calculatePublicHolidays(publicHolidays, selectedDate)];
    // }
    const exceptionNotWorkDays = calculateExceptionDays(schedule, selectedDate, false);
    const exceptionWorkDays = calculateExceptionDays(schedule, selectedDate, true);

    holidays = holidays
      .filter(v => !exceptionWorkDays
        .map(e => e.format(DATE_FORMAT))
        .includes(v.format(DATE_FORMAT)));

    const filteredPublicHolidays = calculatePublicHolidays(publicHolidays, selectedDate);

    return [
      { [CLASS_DATEPICKER_HIGHLIGHT_WORK]: exceptionWorkDays },
      { [CLASS_DATEPICKER_HIGHLIGHT_NOTWORK]: exceptionNotWorkDays },
      { [CLASS_DATEPICKER_HIGHLIGHT_HOLIDAYS]: holidays },
      { [CLASS_DATEPICKER_HIGHLIGHT_PUBLIC_HOLIDAYS]: filteredPublicHolidays },
    ];
  }

  renderValidationMessage() {
    const { validationMessages } = this.props;
    if (!validationMessages) {
      return '';
    }
    const validationMessageList = [];
    if (Object.values(validationMessages)
      .filter(e => e).length) {
      Object.keys(validationMessages)
        .forEach((key) => {
          if (validationMessages[key]) {
            validationMessageList.push(
              <div key={validationMessages[key]}>
                {`${key} - ${validationMessages[key]}`}
              </div>,
            );
          }
        });
    }
    if (validationMessageList.length) {
      return <div className="alert alert-danger" role="alert">{validationMessageList}</div>;
    }
    return '';
  }

  render() {
    const {
      schedule,
      currentException,
      selectedMonth,
      handleDateChange,
      handleWorkSelection,
      handleMonthChange,
      handleDeleteException,
    } = this.props;
    return (
      <div>
        <div className="pb-2 d-flex flex-wrap align-items-top">
          <div
            className="pb-2 mr-3"
            style={{
              width: '250px',
              height: 'auto',
            }}
          >
            <DatePicker
              inline
              locale="en-gb"
              highlightDates={this.highlightDates()}
              onChange={handleDateChange}
              onMonthChange={handleMonthChange}
              dropdownMode="select"
              selected={currentException ? currentException.selectedDate : moment()}
            />
          </div>
          <ExceptionList
            schedule={schedule}
            selectedDate={currentException ? currentException.selectedDate : moment()}
            selectedMonth={selectedMonth}
            handleDeleteException={handleDeleteException}
          />
        </div>
        {this.renderValidationMessage()}
        <ExceptionWorkButtons
          currentException={currentException}
          onWorkSelection={handleWorkSelection}
        />
        <ExceptionWorkingHoursForm />
      </div>
    );
  }
}

ConnectedWorkingScheduleExceptionBlock.propTypes = {
  validationMessages: PropTypes.shape({}),
  currentException: PropTypes.shape({}),
  schedule: PropTypes.shape({}).isRequired,
  selectedMonth: PropTypes.shape({}).isRequired,
  publicHolidays: PropTypes.shape({}).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleMonthChange: PropTypes.func.isRequired,
  handleWorkSelection: PropTypes.func.isRequired,
  handleDeleteException: PropTypes.func.isRequired,
};

ConnectedWorkingScheduleExceptionBlock.defaultProps = {
  validationMessages: {},
  currentException: undefined,
};

const mapDispatchToProps = dispatch => ({
  handleDateChange: selectedDate => dispatch(dateChangeHandler(selectedDate)),
  handleMonthChange: selectedMonth => dispatch(monthChangeHandler(selectedMonth)),
  handleWorkSelection: selectedDate => dispatch(workSelectionHandler(selectedDate)),
  handleDeleteException: message => dispatch(deleteExceptionHandler(message)),
});

const mapStateToProps = state => ({
  validationMessages: state.validationMessages,
  infoMessage: state.infoMessage,
  publicHolidays: state.publicHolidays,
  schedule: state.schedule,
  currentException: state.currentException,
  selectedMonth: state.selectedMonth ? state.selectedMonth : moment(),
});

const WorkingScheduleExceptionBlock = connect(
  mapStateToProps, mapDispatchToProps,
)(ConnectedWorkingScheduleExceptionBlock);

export default WorkingScheduleExceptionBlock;
