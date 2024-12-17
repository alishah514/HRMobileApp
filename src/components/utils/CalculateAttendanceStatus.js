import moment from 'moment';

export const CalculateAttendanceStatus = (attendanceData, punchInHour) => {
  const formattedHour = punchInHour % 12 || 12;
  const period = punchInHour < 12 ? 'AM' : 'PM';
  const thresholdTimeStr = `${formattedHour
    .toString()
    .padStart(2, '0')}:00:00 ${period}`;

  const thresholdTime = moment(thresholdTimeStr, 'hh:mm:ss A');

  const today = moment();
  const monthStart = today.clone().startOf('month');
  const monthEnd = today.clone().endOf('month');

  const currentMonthRecords = attendanceData?.filter(record => {
    const creationDate = moment(record.creationDate);
    return creationDate.isBetween(monthStart, monthEnd, 'day', '[]');
  });

  const recordsByDay = Array.from({length: monthEnd.date()}, () => []);

  currentMonthRecords?.forEach(record => {
    const dayIndex = moment(record.creationDate).date() - 1;
    recordsByDay[dayIndex].push(record);
  });

  // const getFirstPunchPair = dayRecords => {
  //   const sortedRecords = dayRecords.sort(
  //     (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
  //   );

  //   const firstPunchIn = sortedRecords.find(
  //     record => record.type === 'PunchIn',
  //   );
  //   const firstPunchOut = sortedRecords.find(
  //     record => record.type === 'PunchOut',
  //   );

  //   if (firstPunchIn && firstPunchOut) {
  //     const punchInTime = moment(firstPunchIn.creationDate);
  //     const punchOutTime = moment(firstPunchOut.creationDate);

  //     const threshold = punchInTime
  //       .clone()
  //       .hour(thresholdTime.hour())
  //       .minute(thresholdTime.minute())
  //       .second(thresholdTime.second());

  //     const status = punchInTime.isAfter(threshold) ? 'Late' : 'On Time';
  //     return { punchInTime, punchOutTime, status };
  //   } else {
  //     return null;
  //   }
  // };

  let onTimeCount = 0;
  let lateCount = 0;

  recordsByDay.forEach(dayRecords => {
    if (dayRecords.length > 0) {
      const sortedRecords = dayRecords.sort(
        (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
      );

      const firstPunchIn = sortedRecords.find(
        record => record.type === 'PunchIn',
      );

      if (firstPunchIn) {
        const punchInTime = moment(firstPunchIn.creationDate);

        const threshold = punchInTime
          .clone()
          .hour(thresholdTime.hour())
          .minute(thresholdTime.minute())
          .second(thresholdTime.second());

        const status = punchInTime.isAfter(threshold) ? 'Late' : 'On Time';

        if (status === 'On Time') {
          onTimeCount += 1;
        } else {
          lateCount += 1;
        }
      }
    }
  });

  return {onTimeCount, lateCount};
};
