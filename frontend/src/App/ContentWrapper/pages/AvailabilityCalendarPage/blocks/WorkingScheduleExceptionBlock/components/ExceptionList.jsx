import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  currentMonthExceptions,
  generateExceptionMessage,
} from '../../../../../../../utils/utilities';
import { DATE_FORMAT } from '../../../../../../../constants/constants';

function ExceptionList({
  schedule, selectedDate, selectedMonth, handleDeleteException,
}) {
  const exceptionMessages = [];
  if (schedule && schedule.exceptions) {
    const date = selectedMonth || moment();
    currentMonthExceptions(schedule.exceptions, date)
      .forEach((exception) => {
        const message = generateExceptionMessage(exception);
        const highlightedMessage = <u>{message}</u>;
        const isHighlighted = selectedDate
          && selectedDate.isSameOrAfter(moment(exception.dateBegin, DATE_FORMAT))
          && selectedDate.isSameOrBefore(moment(exception.dateEnd, DATE_FORMAT));
        exceptionMessages.push(
          <tr role="row" className={!exception.isWorking ? 'bg-gray-light' : ''} key={message}>
            <td>
              <button
                type="button"
                className="exception-delete"
                onClick={() => handleDeleteException(message)}
              >
                <i className="fa fa-remove" />
              </button>
            </td>
            <td className="pr-3" key={message}>{isHighlighted ? highlightedMessage : message}</td>
          </tr>,
        );
      });
  }
  return (
    <div className="exceptions-list">
      <div className="table-responsive p-0">
        <table className="table table-hover dataTable exceptions-table" role="grid">
          <tbody>
            {exceptionMessages}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ExceptionList.propTypes = {
  schedule: PropTypes.shape({}).isRequired,
  selectedDate: PropTypes.shape({}),
  selectedMonth: PropTypes.shape({}).isRequired,
  handleDeleteException: PropTypes.func.isRequired,
};

ExceptionList.defaultProps = {
  selectedDate: moment(),
};

export default ExceptionList;
