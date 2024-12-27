export const PaymentRegex = number => {
  if (!number) return '';

  const cleanedNumber = String(number)
    .replace(/[^0-9]/g, '')
    .replace(/^0+/, '');

  if (cleanedNumber.length === 0) return '0';

  if (cleanedNumber.length <= 4) {
    return cleanedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    const lastThreeDigits = cleanedNumber.slice(-3);
    const remainingDigits = cleanedNumber.slice(0, -3);

    const formattedRemainingDigits = remainingDigits
      .replace(/\B(?=(\d{2})+(?!\d))/g, ',')
      .replace(/,$/, '');

    return `${formattedRemainingDigits},${lastThreeDigits}`;
  }
};
