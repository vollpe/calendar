import {
  HANDLE_DATE_CHANGE,
  HANDLE_DELETE_EXCEPTION,
  HANDLE_MONTH_CHANGE,
  HANDLE_WORK_SELECTION,
  HANDLE_WORKING_DAYS_CHECKBOX_CHANGE,
  HANDLE_WORKING_TIME_BEGIN,
  HANDLE_WORKING_TIME_END,
  SET_DATA_LOADING,
} from '../constants/constants';

export const workingDaysSelectionHandler = event => ({
  type: HANDLE_WORKING_DAYS_CHECKBOX_CHANGE,
  payload: { weekDayName: event.target.name, checked: event.target.checked },
});

export const dateChangeHandler = selectedDate => ({
  type: HANDLE_DATE_CHANGE,
  payload: { selectedDate },
});

export const monthChangeHandler = selectedMonth => ({
  type: HANDLE_MONTH_CHANGE,
  payload: { selectedMonth },
});

export const workSelectionHandler = isWorking => ({
  type: HANDLE_WORK_SELECTION,
  payload: { isWorking },
});

export const workingTimeBeginHandler = event => ({
  type: HANDLE_WORKING_TIME_BEGIN,
  payload: { name: event.target.name, value: event.target.value },
});

export const workingTimeEndHandler = event => ({
  type: HANDLE_WORKING_TIME_END,
  payload: { name: event.target.name, value: event.target.value },
});

export const deleteExceptionHandler = message => ({
  type: HANDLE_DELETE_EXCEPTION,
  payload: { message },
});

export const loadingHandler = isDataLoading => ({
  type: SET_DATA_LOADING,
  payload: { isDataLoading },
});
