export const TruncateTitle = (title, maxLength) => {
  const MaxLength = maxLength ? maxLength : 15;
  if (title.length > MaxLength) {
    return `${title.substring(0, MaxLength - 3)}...`;
  }
  return title;
};
