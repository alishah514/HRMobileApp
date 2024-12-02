export const DecodeBase64 = base64String => {
  const binaryString = atob(base64String); // Decode base64 string to binary
  const byteArray = new Uint8Array(binaryString.length);

  // Fill the Uint8Array with byte values
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  return byteArray;
};
