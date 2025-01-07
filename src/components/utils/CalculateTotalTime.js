export const CalculateTotalTime = (
  timeEntries,
  punchInField = 'creationDate',
  punchOutField = 'punchOutData.creationDate',
) => {
  let totalMinutes = 0;

  timeEntries.forEach(item => {
    const punchInTime = getNestedValue(item, punchInField);
    const punchOutTime = getNestedValue(item, punchOutField);

    if (punchInTime && punchOutTime) {
      const parsedPunchIn = new Date(punchInTime);
      const parsedPunchOut = new Date(punchOutTime);

      if (!isNaN(parsedPunchIn) && !isNaN(parsedPunchOut)) {
        console.log(`PunchIn: ${parsedPunchIn}, PunchOut: ${parsedPunchOut}`);

        const diffInMinutes = (parsedPunchOut - parsedPunchIn) / 1000 / 60;
        totalMinutes += diffInMinutes;
      } else {
        console.error('Invalid date format:', punchInTime, punchOutTime);
      }
    }
  });

  const totalSeconds = Math.round(totalMinutes * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')} Hours`;

  return formattedTime;
};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
};
