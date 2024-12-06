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
  };
};
