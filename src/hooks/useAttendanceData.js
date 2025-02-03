import {useSelector} from 'react-redux';

export const useAttendanceData = () => {
  const punchInTime = useSelector(state => state.attendance.punchInTime);
  const punchOutTime = useSelector(state => state.attendance.punchOutTime);
  const lastPunchInTime = useSelector(
    state => state.attendance.lastPunchInTime,
  );
  const lastPunchOutTime = useSelector(
    state => state.attendance.lastPunchOutTime,
  );
  const currentAttendance = useSelector(
    state => state.attendance.currentAttendance,
  );
  const attendanceData = useSelector(state => state.attendance.attendanceData);
  const allAttendanceData = useSelector(
    state => state.attendance.allAttendanceData,
  );
  const adminCurrentAttendanceData = useSelector(
    state => state.attendance.adminAttendanceData,
  );
  const isLoading = useSelector(state => state.attendance.isLoading);

  const timer = useSelector(state => state.attendance.timer ?? '00:00:00');
  const punchInLocation = useSelector(
    state => state.attendance.punchInLocation ?? null,
  );
  const punchOutLocation = useSelector(
    state => state.attendance.punchOutLocation ?? null,
  );
  const location = useSelector(state => state.attendance.location ?? null);
  const error = useSelector(state => state.attendance.error ?? null);
  const postResponse = useSelector(
    state => state.attendance.postResponse ?? null,
  );

  const isUserWeeklyAttendanceLoading = useSelector(
    state => state.attendance.isUserWeeklyAttendanceLoading ?? false,
  );
  const weeklyUserAttendanceData = useSelector(
    state => state.attendance.weeklyUserAttendanceData ?? null,
  );

  return {
    punchInTime,
    punchOutTime,
    lastPunchInTime,
    lastPunchOutTime,
    currentAttendance,
    attendanceData,
    allAttendanceData,
    adminCurrentAttendanceData,
    attendanceLoading: isLoading,
    timer,
    punchInLocation,
    punchOutLocation,
    location,
    error,
    postResponse,
    isUserWeeklyAttendanceLoading,
    weeklyUserAttendanceData,
  };
};
