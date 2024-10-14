import {
  SAVE_PUNCH_IN_TIME,
  SAVE_PUNCH_OUT_TIME,
  SAVE_TIMER,
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
