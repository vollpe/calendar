import moment from 'moment';
// import uniqud from 'uniqid';
import { DATE_FORMAT, DATE_FORMAT_UI, weekDayNames } from '../constants/constants';

/**
 * Functions
 */

export function getWeekDayIndexByName(name) {
  return Object.values(weekDayNames)
    .filter(dayObject => dayObject.name === name)[0].index;
}

/**
 * Returns array of dates (days) between startDate and endDate
 */
export function getDateRange(startDate, endDate) {
  const dates = [];
  for (let date = startDate; date.isSameOrBefore(endDate); date.add(1, 'days')) {
    dates.push(moment(date));
  }
  return dates;
}

/**
 * Returns list of holidays, excluding selected date
 */
export function calculateBaseHolidays(schedule, selectedDate) {
  const holidays = [];
  const formattedSelectedDate = selectedDate ? selectedDate.format(DATE_FORMAT) : '';
  const notWorkingDayIndexes = [];
  Object.keys(schedule.daysOfWeek)
    .forEach((day) => {
      if (!schedule.daysOfWeek[day]) {
        notWorkingDayIndexes.push(getWeekDayIndexByName(day));
      }
    });
  const date = selectedDate || moment();
  const eachDay = moment(date)
    .subtract(3, 'years');
  const endDate = moment(date)
    .add(3, 'years');
  for (; eachDay.year() <= endDate.year(); eachDay.add(1, 'days')) {
    if (notWorkingDayIndexes.includes(eachDay.day())) {
      holidays.push(moment(eachDay));
    }
  }
  return holidays.filter(m => m.format(DATE_FORMAT) !== formattedSelectedDate);
}

/**
 * Returns array of working or not working exception dates
 * @param schedule schedule object
 * @param selectedDate currently selected date
 * @param isWorking boolean, to return 'work' or 'not work'
 */
export function calculateExceptionDays(schedule, selectedDate, isWorking) {
  const formattedSelectedDate = selectedDate ? selectedDate.format(DATE_FORMAT) : '';
  let dates = [];
  schedule.exceptions
    .filter(e => e.action !== 'delete')
    .forEach((exception) => {
      if (!!exception.isWorking === isWorking) {
        if (exception.dateBegin !== exception.dateEnd) {
          dates = [
            ...dates,
            ...getDateRange(moment(exception.dateBegin, DATE_FORMAT),
              moment(exception.dateEnd, DATE_FORMAT)),
          ];
          // dates.push(moment(exception.dateBegin, DATE_FORMAT));
          // dates.push(moment(exception.dateEnd, DATE_FORMAT));
        } else {
          dates.push(moment(exception.dateBegin, DATE_FORMAT));
        }
      }
    });
  return dates.filter(v => v.format(DATE_FORMAT) !== formattedSelectedDate);
}

/**
 * Returns array of dates containing public holidays.
 */
export function calculatePublicHolidays(publicHolidays, selectedDate) {
  const formattedSelectedDate = selectedDate ? selectedDate.format(DATE_FORMAT) : '';
  const dates = publicHolidays.data.items
    .filter(item => item.visibility === 'public' && item.status === 'confirmed')
    .map(item => moment(item.start.date));
  return dates.filter(v => v.format(DATE_FORMAT) !== formattedSelectedDate);
}

/**
 * Formats array of dates
 */
export function formatDates(dateArray) {
  return dateArray.map(date => date.format(DATE_FORMAT));
}

/**
 * Generates user-friendly message for exception.
 * Also used for deletion
 */
export function generateExceptionMessage(exception) {
  let message = '';
  if (exception.dateBegin === exception.dateEnd) {
    message += moment(exception.dateBegin, DATE_FORMAT)
      .format(DATE_FORMAT_UI);
  } else {
    message += `${moment(exception.dateBegin, DATE_FORMAT)
      .format(DATE_FORMAT_UI)}
     - ${moment(exception.dateEnd, DATE_FORMAT).format(DATE_FORMAT_UI)}`;
  }
  if (exception.isWorking) {
    const workingTimeBegin = moment(exception.workingTimeBegin, 'hh:mm:ss')
      .format('HH:mm')
      .replace(/^0(?:0:0?)?/, '');
    const workingTimeEnd = moment(exception.workingTimeEnd, 'hh:mm:ss')
      .format('HH:mm')
      .replace(/^0(?:0:0?)?/, '');
    message += ` work from ${workingTimeBegin} to ${workingTimeEnd}`;
  } else {
    message += ' not work';
  }
  return message;
}

/**
 * Clues similar exceptions with overlapped start and end dates
 */
export function clueExceptions(exceptions, exception) {
  let result = exceptions;
  result.forEach((e) => {
    result.forEach((test) => {
      if (test.isWorking === e.isWorking
        && test.dateBegin !== e.dateBegin
        && test.dateEnd !== e.dateEnd) {
        if (test.dateBegin === e.dateEnd) {
          const action = e.id ? 'update' : 'add';
          result = [
            ...result.filter(ex => generateExceptionMessage(ex) !== generateExceptionMessage(test)
              && generateExceptionMessage(ex) !== generateExceptionMessage(e)),
            { ...e, dateEnd: test.dateEnd, action },
            { ...test, action: 'delete' },
          ];
          clueExceptions(result, exception);
        }
        if (test.dateEnd === e.dateBegin) {
          const action = e.id ? 'update' : 'add';
          result = [
            ...result.filter(ex => generateExceptionMessage(ex) !== generateExceptionMessage(test)
              && generateExceptionMessage(ex) !== generateExceptionMessage(e)),
            { ...e, dateBegin: test.dateBegin, action },
            { ...test, action: 'delete' },
          ];
          clueExceptions(result, exception);
        }
      }
    });
  });
  return result;
}

/**
 * Is exception already present for selected date
 */
export function isExceptionPresent(exceptions, exception) {
  const date = exception.selectedDate.startOf('day');
  let result = false;
  Object.values(exceptions)
    .forEach((e) => {
      const dateBegin = moment(e.dateBegin, DATE_FORMAT);
      const dateEnd = moment(e.dateEnd, DATE_FORMAT);
      if (e.action === 'delete') {
        result = false;
      } else if (date.isSameOrAfter(dateBegin) && date.isSameOrBefore(dateEnd)) {
        result = e;
      }
    });
  return result;
}

/**
 * Validate exception data
 */
export function isExceptionValid(exception) {
  return !exception.isWorking
    || (moment(exception.workingTimeBegin, 'HH:mm') < moment(exception.workingTimeEnd, 'HH:mm'));
}

/**
 * Returns true if:
 * 1. Both exceptions are 'not work'
 * 2. Both exceptions are 'work' and have same work times
 */
export function areExceptionsOfSameType(e1, e2) {
  return (!e1.isWorking && !e2.isWorking)
    || (e1.isWorking && e2.isWorking
      && e1.workingTimeBegin === e2.workingTimeBegin && e1.workingTimeEnd === e2.workingTimeEnd);
}

/**
 * Adds exception. If it is close to the same exception, they will be merged.
 */
export function addException(exceptions, exception) {
  let result = exceptions;
  const currentDate = exception.selectedDate;
  let updated = false;
  exceptions.forEach((test, index) => {
    const action = test.id ? 'update' : 'add';
    const dateBegin = moment(test.dateBegin, DATE_FORMAT);
    const dateEnd = moment(test.dateEnd, DATE_FORMAT);
    const checkDeleted = isExceptionPresent(exceptions, exception);
    if (checkDeleted && checkDeleted.action === 'delete') {
      result = [
        ...result
          .filter(e => generateExceptionMessage(e) !== generateExceptionMessage(checkDeleted)),
        { ...exception, action },
      ];
      updated = true;
    }
    if (moment(currentDate).add(1, 'days').isSame(dateBegin)
      && areExceptionsOfSameType(exception, test)) {
      result[index] = {
        ...result[index],
        dateBegin: currentDate.format(DATE_FORMAT),
        action,
      };
      updated = true;
    }
    if (moment(currentDate).subtract(1, 'days').isSame(dateEnd)
      && areExceptionsOfSameType(exception, test)) {
      result[index] = {
        ...result[index],
        dateEnd: currentDate.format(DATE_FORMAT),
        action,
      };
      updated = true;
    }
  });
  if (!updated) {
    const e = Object.assign(exception);
    e.action = 'add';
    result.push(e);
  }
  result = clueExceptions(result, exception);
  return result;
}

export function sortExceptions(exceptions) {
  return [].concat(exceptions)
    .sort((a, b) => generateExceptionMessage(a)
      .localeCompare(generateExceptionMessage(b)));
}

export function currentMonthExceptions(exceptions, currentDate) {
  return exceptions
    .filter(e => e.action !== 'delete')
    .filter(e => moment(e.dateBegin, DATE_FORMAT).month() === currentDate.month()
      || moment(e.dateEnd, DATE_FORMAT)
        .month() === currentDate.month());
}

export function prepareData(facilitatorId, schedule) {
  let exceptions = Object.assign(schedule.exceptions);
  const workingTime = Object.assign(schedule.workingTime);
  if (workingTime.workingTimeBegin.length <= 5) workingTime.workingTimeBegin += ':00';
  if (workingTime.workingTimeEnd.length <= 5) workingTime.workingTimeEnd += ':00';
  exceptions = exceptions
    .filter(e => e.action)
    .map((e) => {
      delete e.selectedDate;
      if (e.action !== 'delete') {
        delete e.action;
      } else {
        return { id: e.id, action: e.action };
      }
      if (e.isWorking) {
        if (e.workingTimeBegin.length === 5) e.workingTimeBegin += ':00';
        if (e.workingTimeEnd.length === 5) e.workingTimeEnd += ':00';
      } else {
        e.workingTimeBegin = null;
        e.workingTimeEnd = null;
      }
      return e;
    });
  return {
    id: facilitatorId,
    firstName: 'test',
    lastName: 'test',
    daysOfWeek: schedule.daysOfWeek,
    workingTime,
    exceptions,
  };
}
