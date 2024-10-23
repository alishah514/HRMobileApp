import {combineReducers} from 'redux';
import LoginReducer from '../login/LoginReducer';
import RoleReducer from '../role/RoleReducer';
import AttendanceReducer from '../attendance/AttendanceReducer';
import LanguageReducer from '../language/LanguageReducer';
import LeaveReducer from '../leave/LeaveReducer';
import dashboardCountReducer from '../dashboard/DashboardReducer';
import TaskReducer from '../tasks/TaskReducer';
import {ChangePasswordReducer} from '../changePassword/ChangePasswordReducer';

const RootReducer = combineReducers({
  login: LoginReducer,
  role: RoleReducer,
  attendance: AttendanceReducer,
  language: LanguageReducer,
  leaves: LeaveReducer,
  tasks: TaskReducer,
  dashboard: dashboardCountReducer,
  changePassword: ChangePasswordReducer,
});

export default RootReducer;
