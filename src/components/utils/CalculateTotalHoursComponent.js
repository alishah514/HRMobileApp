import moment from 'moment';

export const CalculateTotalHours = attendanceData => {
  const today = moment();
  const weekStart = today.clone().startOf('isoWeek');
  const weekEnd = today.clone().endOf('isoWeek');

  const currentWeekRecords = attendanceData?.filter(record => {
    const creationDate = moment(record.creationDate);
    return creationDate.isBetween(weekStart, weekEnd, 'day', '[]');
  });

  const recordsByDay = Array.from({length: 7}, () => []);

  currentWeekRecords?.forEach(record => {
    const dayIndex = moment(record.creationDate).isoWeekday() - 1;
    recordsByDay[dayIndex].push(record);
  });

  const calculateDayDuration = dayRecords => {
    const sortedRecords = dayRecords.sort(
      (a, b) => new Date(a.creationDate) - new Date(b.creationDate),
    );
    const pairs = [];
    let i = 0;

    while (i < sortedRecords.length - 1) {
      if (
        sortedRecords[i].type === 'PunchIn' &&
        sortedRecords[i + 1].type === 'PunchOut'
      ) {
        pairs.push([sortedRecords[i], sortedRecords[i + 1]]);
        i += 2;
      } else {
        i++;
      }
    }

    return pairs.reduce((total, [punchIn, punchOut]) => {
      const inTime = moment(punchIn.creationDate);
      const outTime = moment(punchOut.creationDate);
      return total + outTime.diff(inTime, 'seconds');
    }, 0);
  };

  const dailyDurations = recordsByDay.map((dayRecords, index) => {
    const duration = calculateDayDuration(dayRecords);

    return duration;
  });

  const weeklyTotal = dailyDurations.reduce((total, daily) => total + daily, 0);

  const hours = Math.floor(weeklyTotal / 3600);
  const minutes = Math.floor((weeklyTotal % 3600) / 60);
  const seconds = weeklyTotal % 60;

  return {hours, minutes, seconds};
};
