import reduceReducers from 'reduce-reducers';
import fetchReducer from './calendar/fetchReducer';
import actionReducer from './calendar/actionReducer';
import { FACILITATOR_ID } from '../constants/constants';

const initialState = {
  facilitatorId: FACILITATOR_ID,
  currentException: {
    workingTimeBegin: '',
    workingTimeEnd: '',
  },
  workingTime: {
    workingTimeBegin: '',
    workingTimeEnd: '',
  },
  errors: {},
  validationMessages: {},
  isDataLoading: false,
};

const reducers = reduceReducers(
  fetchReducer,
  actionReducer,
  initialState,
);

export default reducers;
