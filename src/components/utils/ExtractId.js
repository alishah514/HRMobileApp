export const extractId = name => {
  if (!name) {
    throw new Error('Name is required to extract the ID.');
  }
  const parts = name.split('/');
  return parts.pop();
};
