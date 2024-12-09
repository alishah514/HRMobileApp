/**
 * Utility function to recursively extract values from Firestore fields
 * @param {Object} fields - Firestore fields object
 * @returns {Object} - Extracted key-value pairs
 */
const ExtractValues = fields => {
  const result = {};

  // Check if fields object is not empty
  if (
    !fields ||
    typeof fields !== 'object' ||
    Object.keys(fields).length === 0
  ) {
    return null; // Return null if there are no fields
  }

  for (const key in fields) {
    const value = fields[key];

    // Check the type of the value and extract accordingly
    if (value && typeof value === 'object') {
      if (value.stringValue !== undefined) {
        result[key] = value.stringValue;
      } else if (value.integerValue !== undefined) {
        result[key] = value.integerValue.toString(); // Convert to string for consistency
      } else if (value.booleanValue !== undefined) {
        result[key] = value.booleanValue;
      } else if (value.doubleValue !== undefined) {
        result[key] = value.doubleValue;
      } else if (value.arrayValue) {
        // Handle array values
        result[key] = value.arrayValue.values.map(
          item =>
            item.stringValue || item.integerValue || item.booleanValue || null,
        );
      } else if (value.mapValue) {
        // Recursively handle map values
        result[key] = ExtractValues(value.mapValue.fields);
      } else if (value.timestampValue) {
        result[key] = value.timestampValue; // Handle timestamp
      } else if (value.referenceValue) {
        result[key] = value.referenceValue; // Handle Firestore document reference
      } else {
        console.warn(`Unknown field type for key ${key}:`, value);
        result[key] = null; // Handle unexpected types with a default null
      }
    }
  }

  return Object.keys(result).length > 0 ? result : null; // Return null if no valid fields were extracted
};

export default ExtractValues;
