import moment from 'moment';

export const CalculateTotalHours = attendanceData => {
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

  const dailyDurations = recordsByDay.map(dayRecords => {
    const duration = calculateDayDuration(dayRecords);
    return duration;
  });

  const monthlyTotal = dailyDurations.reduce(
    (total, daily) => total + daily,
    0,
  );

  const hours = Math.floor(monthlyTotal / 3600);
  const minutes = Math.floor((monthlyTotal % 3600) / 60);
  const seconds = monthlyTotal % 60;

  return {hours, minutes, seconds};
};
