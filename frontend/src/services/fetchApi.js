import { API_BASE_URL, FACILITATOR_ID, GOOGLE_CALENDAR_API_HOLIDAYS } from '../constants/constants';
import {
  fetchHolidaysFailure,
  fetchHolidaysSuccess,
  fetchScheduleFailure,
  fetchSchedulePostFailure,
  fetchSchedulePostSuccess,
  fetchScheduleSuccess,
} from '../actions/fetchActions';

function handleErrors(response) {
  if (!response.ok) {
    try {
      JSON.parse(response.text);
    } catch (exception) {
      const con = console;
      con.log(exception);
    }
    throw Error(`code ${response.status}: ${response.statusText}. Url: ${response.url}`);
  }
  return response;
}

/**
 * Gets schedule from the application API.
 * Example: GET http://37.230.114.206:8888/availability/schedule/1
 * @param facilitatorId facilitator ID
 */
export const fetchSchedule = facilitatorId => (dispatch) => {
  fetch(`${API_BASE_URL}/availability/schedule/${facilitatorId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json; charset=utf-8',
    },
  })
    .then(response => handleErrors(response))
    .then(response => response.json())
    .then((json) => {
      dispatch(fetchScheduleSuccess(json));
      return json;
    })
    .catch((error) => {
      dispatch(fetchScheduleFailure(error));
    });
};

/**
 * Gets public holidays from the Google Calendar API.
 */
export function fetchHolidays() {
  return dispatch => fetch(GOOGLE_CALENDAR_API_HOLIDAYS)
    .then(response => handleErrors(response))
    .then(response => response.json())
    .then((json) => {
      dispatch(fetchHolidaysSuccess(json));
      return json;
    })
    .catch(error => dispatch(fetchHolidaysFailure(error)));
}

/**
 * Updates schedule info for current facilitator
 */
export const fetchSchedulePut = (facilitatorId, data, history) => (dispatch) => {
  fetch(`${API_BASE_URL}/availability/schedule/${FACILITATOR_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: data,
  })
    .then(response => handleErrors(response))
    .then(response => response.json())
    .then((json) => {
      dispatch(fetchSchedulePostSuccess(json));
      dispatch(fetchSchedule(facilitatorId));
      history.push('/assignments');
      return json;
    })
    .catch((error) => {
      dispatch(fetchSchedulePostFailure(error));
    });
};
