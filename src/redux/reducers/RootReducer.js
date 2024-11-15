import {combineReducers} from 'redux';
import LoginReducer from '../login/LoginReducer';
import RoleReducer from '../role/RoleReducer';
import AttendanceReducer from '../attendance/AttendanceReducer';
import LanguageReducer from '../language/LanguageReducer';
import LeaveReducer from '../leave/LeaveReducer';
import DashboardCountReducer from '../dashboard/DashboardReducer';
import TaskReducer from '../tasks/TaskReducer';
import {ChangePasswordReducer} from '../changePassword/ChangePasswordReducer';
import ProfileReducer from '../profile/ProfileReducer';
import EventReducer from '../events/EventReducer';

const RootReducer = combineReducers({
  login: LoginReducer,
  role: RoleReducer,
  attendance: AttendanceReducer,
  language: LanguageReducer,
  leaves: LeaveReducer,
  tasks: TaskReducer,
  dashboard: DashboardCountReducer,
  changePassword: ChangePasswordReducer,
  profile: ProfileReducer,
  events: EventReducer,
});

export default RootReducer;
