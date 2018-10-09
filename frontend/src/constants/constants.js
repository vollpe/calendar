/**
 * Constants
 */
export const API_USE_MOCK_SERVER = false;

const API_MOCK_URL = 'http://localhost:3001';
const API_REMOTE_URL = 'http://37.230.114.206:8888';
// const API_REMOTE_URL = 'http://localhost:8000';
export const API_BASE_URL = API_USE_MOCK_SERVER ? API_MOCK_URL : API_REMOTE_URL;

// Google calendar
export const GOOGLE_CALENDAR_API_HOLIDAYS = 'https://www.googleapis.com/calendar/v3/calendars/en.usa%23holiday%40group.v.calendar.google.com/events?key=AIzaSyAbxVrLGDo9VH6HewnMprdbL5F_T0nDp_Q';

// Facilitator ID
export const FACILITATOR_ID = API_USE_MOCK_SERVER ? '3' : '2';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT_UI = 'MM/DD/YYYY';

export const CLASS_DATEPICKER_HIGHLIGHT_WORK = 'react-datepicker__day--highlighted-exception-work';
export const CLASS_DATEPICKER_HIGHLIGHT_NOTWORK = 'react-datepicker__day--highlighted-exception-notwork';
export const CLASS_DATEPICKER_HIGHLIGHT_HOLIDAYS = 'react-datepicker__day--highlighted-base-holidays';
export const CLASS_DATEPICKER_HIGHLIGHT_PUBLIC_HOLIDAYS = 'react-datepicker__day--highlighted-public-holidays';

// For conversion
export const weekDayNames = {
  0: { name: 'monday', index: 1 },
  1: { name: 'tuesday', index: 2 },
  2: { name: 'wednesday', index: 3 },
  3: { name: 'thursday', index: 4 },
  4: { name: 'friday', index: 5 },
  5: { name: 'saturday', index: 6 },
  6: { name: 'sunday', index: 0 },
};


/**
 * Actions
 */

// Data loading
export const FETCH_AVAILABILITY_SCHEDULE_SUCCESS = 'FETCH_AVAILABILITY_SCHEDULE_SUCCESS';
export const FETCH_AVAILABILITY_SCHEDULE_FAILURE = 'FETCH_AVAILABILITY_SCHEDULE_FAILURE';
export const FETCH_HOLIDAYS_SUCCESS = 'FETCH_HOLIDAYS_SUCCESS';
export const FETCH_HOLIDAYS_FAILURE = 'FETCH_HOLIDAYS_FAILURE';
export const FETCH_AVAILABILITY_SCHEDULE_POST_SUCCESS = 'FETCH_AVAILABILITY_SCHEDULE_POST_SUCCESS';
export const FETCH_AVAILABILITY_SCHEDULE_POST_FAILURE = 'FETCH_AVAILABILITY_SCHEDULE_POST_FAILURE';

// Handling
export const HANDLE_WORK_SELECTION = 'HANDLE_WORK_SELECTION';
export const HANDLE_DATE_CHANGE = 'HANDLE_DATE_CHANGE';
export const HANDLE_MONTH_CHANGE = 'HANDLE_MONTH_CHANGE';
export const HANDLE_WORKING_DAYS_CHECKBOX_CHANGE = 'HANDLE_WORKING_DAYS_CHECKBOX_CHANGE';
export const HANDLE_WORKING_TIME_BEGIN = 'HANDLE_WORKING_TIME_BEGIN';
export const HANDLE_WORKING_TIME_END = 'HANDLE_WORKING_TIME_END';
export const HANDLE_DELETE_EXCEPTION = 'HANDLE_DELETE_EXCEPTION';
export const SET_DATA_LOADING = 'SET_DATA_LOADING';
