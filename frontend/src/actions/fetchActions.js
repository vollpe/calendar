import {
  FETCH_AVAILABILITY_SCHEDULE_FAILURE,
  FETCH_AVAILABILITY_SCHEDULE_POST_FAILURE,
  FETCH_AVAILABILITY_SCHEDULE_POST_SUCCESS,
  FETCH_AVAILABILITY_SCHEDULE_SUCCESS,
  FETCH_HOLIDAYS_FAILURE,
  FETCH_HOLIDAYS_SUCCESS,
} from '../constants/constants';

export const fetchScheduleSuccess = data => ({
  type: FETCH_AVAILABILITY_SCHEDULE_SUCCESS,
  payload: { data },
});

export const fetchScheduleFailure = error => ({
  type: FETCH_AVAILABILITY_SCHEDULE_FAILURE,
  payload: { error },
});

export const fetchSchedulePostSuccess = data => ({
  type: FETCH_AVAILABILITY_SCHEDULE_POST_SUCCESS,
  payload: { data },
});

export const fetchSchedulePostFailure = error => ({
  type: FETCH_AVAILABILITY_SCHEDULE_POST_FAILURE,
  payload: { error },
});

export const fetchHolidaysSuccess = data => ({
  type: FETCH_HOLIDAYS_SUCCESS,
  payload: { data },
});

export const fetchHolidaysFailure = error => ({
  type: FETCH_HOLIDAYS_FAILURE,
  payload: { error },
});
