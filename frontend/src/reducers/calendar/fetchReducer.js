import {
  FETCH_AVAILABILITY_SCHEDULE_FAILURE,
  FETCH_AVAILABILITY_SCHEDULE_POST_FAILURE,
  FETCH_AVAILABILITY_SCHEDULE_POST_SUCCESS,
  FETCH_AVAILABILITY_SCHEDULE_SUCCESS,
  FETCH_HOLIDAYS_FAILURE,
  FETCH_HOLIDAYS_SUCCESS,
} from '../../constants/constants';
import { sortExceptions } from '../../utils/utilities';

function fetchReducer(state, action) {
  switch (action.type) {
    case FETCH_AVAILABILITY_SCHEDULE_SUCCESS:
      return {
        ...state,
        errors: {
          ...state.errors,
          fetchSchedule: null,
        },
        schedule: {
          daysOfWeek: action.payload.data.daysOfWeek,
          workingTime: action.payload.data.workingTime,
          exceptions: sortExceptions(action.payload.data.exceptions),
        },
        isDataLoading: false,
      };
    case FETCH_AVAILABILITY_SCHEDULE_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          fetchSchedule: action.payload.error.toString(),
        },
        isDataLoading: false,
      };
    case FETCH_HOLIDAYS_SUCCESS:
      return {
        ...state,
        errors: {
          ...state.errors,
          fetchHolidays: null,
        },
        publicHolidays: action.payload,
        isDataLoading: false,
      };
    case FETCH_HOLIDAYS_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          fetchHolidays: action.payload.error.toString(),
        },
        publicHolidays: null,
        isDataLoading: false,
      };
    case FETCH_AVAILABILITY_SCHEDULE_POST_SUCCESS:
      return {
        ...state,
        validationMessages: {
          fetchSchedulePost: null,
        },
        isDataLoading: false,
      };
    case FETCH_AVAILABILITY_SCHEDULE_POST_FAILURE:
      return {
        ...state,
        validationMessages: {
          ...state.validationMessages,
          fetchSchedulePost: action.payload.error.toString(),
        },
        isDataLoading: false,
      };
    default:
      return state;
  }
}

export default fetchReducer;
