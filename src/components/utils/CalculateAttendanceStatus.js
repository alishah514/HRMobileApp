import moment from 'moment';

export const CalculateAttendanceStatus = (attendanceData, thresholdTimeStr) => {
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

  const getFirstPunchPair = (dayRecords, dayIndex, thresholdTime) => {
    const sortedRecords = dayRecords.sort(
      (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
    );

    const firstPunchIn = sortedRecords.find(
      record => record.type === 'PunchIn',
    );
    const firstPunchOut = sortedRecords.find(
      record => record.type === 'PunchOut',
    );

    if (firstPunchIn && firstPunchOut) {
      const punchInTime = moment(firstPunchIn.creationDate);
      const punchOutTime = moment(firstPunchOut.creationDate);

      // Set threshold to the same date as the punch-in
      const threshold = punchInTime
        .clone()
        .hour(thresholdTime.hour())
        .minute(thresholdTime.minute())
        .second(thresholdTime.second());

      console.log(`Day ${dayIndex + 1}:`);
      console.log('Threshold Time:', threshold.format('hh:mm:ss A'));
      console.log('First PunchIn:', punchInTime.format('hh:mm:ss A'));
      console.log('First PunchOut:', punchOutTime.format('hh:mm:ss A'));

      const status = punchInTime.isAfter(threshold) ? 'Late' : 'On Time';
      console.log(`Status: ${status}`);

      return {punchInTime, punchOutTime, status};
    } else {
      console.log(`Day ${dayIndex + 1}: PunchIn or PunchOut missing`);
      return null;
    }
  };

  const thresholdTime = moment(thresholdTimeStr, 'hh:mm:ss A');

  let onTimeCount = 0;
  let lateCount = 0;

  recordsByDay.forEach((dayRecords, index) => {
    if (dayRecords.length > 0) {
      console.log(`\nAnalyzing Day ${index + 1}:`);
      const firstPair = getFirstPunchPair(dayRecords, index, thresholdTime);

      if (firstPair) {
        if (firstPair.status === 'On Time') {
          onTimeCount += 1;
        } else {
          lateCount += 1;
        }
      }
    }
  });

  return {onTimeCount, lateCount};
};
