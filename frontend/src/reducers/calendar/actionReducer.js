import moment from 'moment';
import {
  DATE_FORMAT,
  HANDLE_DATE_CHANGE,
  HANDLE_DELETE_EXCEPTION,
  HANDLE_MONTH_CHANGE,
  HANDLE_WORK_SELECTION,
  HANDLE_WORKING_DAYS_CHECKBOX_CHANGE,
  HANDLE_WORKING_TIME_BEGIN,
  HANDLE_WORKING_TIME_END,
  SET_DATA_LOADING,
} from '../../constants/constants';
import {
  addException,
  generateExceptionMessage,
  isExceptionPresent,
  isExceptionValid,
  sortExceptions,
} from '../../utils/utilities';

function actionReducer(state, action) {
  let exceptions = state.schedule ? [...state.schedule.exceptions] : [];
  let formattedDate;
  let exception = {};
  let daysOfWeek = {};
  let validationMessage = '';
  switch (action.type) {
    case HANDLE_WORKING_DAYS_CHECKBOX_CHANGE:
      daysOfWeek = Object.assign(state.schedule.daysOfWeek);
      Object.keys(daysOfWeek).forEach((key) => {
        if (key === action.payload.weekDayName) {
          daysOfWeek[key] = action.payload.checked;
        }
      });
      return {
        ...state,
        validationMessages: null,
        schedule: {
          ...state.schedule,
          daysOfWeek,
        },
      };
    case HANDLE_DATE_CHANGE:
      formattedDate = action.payload.selectedDate.format(DATE_FORMAT);
      return {
        ...state,
        validationMessages: null,
        currentException: {
          ...state.currentException,
          selectedDate: action.payload.selectedDate,
          dateBegin: formattedDate,
          dateEnd: formattedDate,
        },
        selectedMonth: action.payload.selectedDate,
      };
    case HANDLE_MONTH_CHANGE:
      return {
        ...state,
        validationMessages: null,
        selectedMonth: action.payload.selectedMonth,
      };
    case HANDLE_WORK_SELECTION:
      Object.assign(exception, state.currentException);
      exception.isWorking = action.payload.isWorking;
      if (exception
        && exception.selectedDate
        && (!exception.isWorking
          || (exception.isWorking && exception.workingTimeBegin && exception.workingTimeEnd))) {
        if (isExceptionPresent(state.schedule.exceptions, exception)) {
          validationMessage = 'Unable to add: selected date is already exceptional.';
        } else if (exception.selectedDate < moment()) {
          validationMessage = 'Sorry that I have to say it... but you can not modify past!';
        } else if (!isExceptionValid(exception)) {
          validationMessage = 'Something is wrong: please check your date and time.';
        } else {
          validationMessage = '';
          exception.isWorking = action.payload.isWorking;
          exceptions = addException(exceptions, exception);
          exception = {
            workingTimeBegin: '',
            workingTimeEnd: '',
          };
        }
      }
      return {
        ...state,
        validationMessages: {
          ...state.validationMessages,
          dataValidation: validationMessage,
        },
        currentException: exception,
        schedule: {
          ...state.schedule,
          exceptions: sortExceptions(exceptions),
        },
      };
    case HANDLE_WORKING_TIME_BEGIN:
      if (action.payload.name.includes('base')) {
        return {
          ...state,
          schedule: {
            ...state.schedule,
            workingTime: {
              ...state.schedule.workingTime,
              workingTimeBegin: action.payload.value,
            },
          },
        };
      }
      return {
        ...state,
        currentException: {
          ...state.currentException,
          workingTimeBegin: action.payload.value,
        },
      };
    case HANDLE_WORKING_TIME_END:
      if (action.payload.name.includes('base')) {
        return {
          ...state,
          schedule: {
            ...state.schedule,
            workingTime: {
              ...state.schedule.workingTime,
              workingTimeEnd: action.payload.value,
            },
          },
        };
      }
      return {
        ...state,
        currentException: {
          ...state.currentException,
          workingTimeEnd: action.payload.value,
        },
      };
    case HANDLE_DELETE_EXCEPTION:
      exceptions.map((e) => {
        if (generateExceptionMessage(e) === action.payload.message) {
          e.action = 'delete';
          return e;
        }
        return e;
      });
      return {
        ...state,
        validationMessages: null,
        schedule: {
          ...state.schedule,
          exceptions,
        },
      };
    case SET_DATA_LOADING:
      return {
        ...state,
        isDataLoading: action.payload.isDataLoading,
      };
    default:
      return state;
  }
}

export default actionReducer;
