import {
  SAVE_PUNCH_IN_TIME,
  SAVE_PUNCH_OUT_TIME,
  SAVE_TIMER,
  SAVE_PUNCH_IN_LOCATION,
  SAVE_PUNCH_OUT_LOCATION,
  SAVE_LOCATION,
} from '../actions/actionTypes';

export const savePunchInTime = time => ({
  type: SAVE_PUNCH_IN_TIME,
  payload: time,
});

export const savePunchOutTime = time => ({
  type: SAVE_PUNCH_OUT_TIME,
  payload: time,
});

export const saveTimer = time => ({
  type: SAVE_TIMER,
  payload: time,
});

export const saveLocation = location => ({
  type: SAVE_LOCATION,
  payload: location,
});

export const savePunchInLocation = location => ({
  type: SAVE_PUNCH_IN_LOCATION,
  payload: location,
});

export const savePunchOutLocation = location => ({
  type: SAVE_PUNCH_OUT_LOCATION,
  payload: location,
});
