export const getGreetingMessage = () => {
  const currentHour = new Date().getHours();
  let greetingMessage;
  let wishMessage;

  if (currentHour < 12) {
    greetingMessage = 'goodMorning';
    wishMessage = 'goodMorningPray';
  } else if (currentHour < 18) {
    greetingMessage = 'goodAfternoon';
    wishMessage = 'goodAfternoonPray';
  } else {
    greetingMessage = 'goodEvening';
    wishMessage = 'goodEveningPray';
  }

  return {
    greeting: `${greetingMessage}`,
    wish: wishMessage,
  };
};
