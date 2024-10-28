export const PaymentRegex = number => {
  if (!number) return '';

  // Remove non-numeric characters and leading zeros
  const cleanedNumber = String(number)
    .replace(/[^0-9]/g, '')
    .replace(/^0+/, '');

  if (cleanedNumber.length === 0) return '0';

  // Determine if we should use Indian or Western formatting
  if (cleanedNumber.length <= 4) {
    // Use Western format for numbers up to 9999
    return cleanedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    // Use Indian format for numbers 10000 and above
    const lastThreeDigits = cleanedNumber.slice(-3);
    const remainingDigits = cleanedNumber.slice(0, -3);

    // Format remaining digits using Indian numbering system
    const formattedRemainingDigits = remainingDigits
      .replace(/\B(?=(\d{2})+(?!\d))/g, ',')
      .replace(/,$/, '');

    return `${formattedRemainingDigits},${lastThreeDigits}`;
  }
};
