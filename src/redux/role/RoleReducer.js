import {SET_USER_ROLE} from '../actions/actionTypes';

const initialState = {
  userRole: null,
};

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };
    default:
      return state;
  }
};

export default RoleReducer;
