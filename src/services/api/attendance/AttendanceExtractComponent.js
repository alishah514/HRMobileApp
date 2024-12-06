export const ExtractAttendanceData = response => {
  if (!response || !response.data || !response.data.documents) {
    console.error('Invalid response format');
    return [];
  }

  const extractValues = fields => {
    const parsedValues = {};
    Object.entries(fields).forEach(([key, value]) => {
      if (value.stringValue !== undefined) {
        parsedValues[key] = value.stringValue;
      } else if (value.doubleValue !== undefined) {
        parsedValues[key] = value.doubleValue;
      } else if (value.integerValue !== undefined) {
        parsedValues[key] = parseInt(value.integerValue, 10);
      } else if (value.timestampValue !== undefined) {
        parsedValues[key] = new Date(value.timestampValue).toISOString();
      } else if (value.mapValue !== undefined) {
        parsedValues[key] = extractValues(value.mapValue.fields || {});
      } else if (value.arrayValue !== undefined) {
        parsedValues[key] =
          value.arrayValue.values?.map(item =>
            extractValues(item.mapValue.fields || {}),
          ) || [];
      }
    });
    return parsedValues;
  };

  const documents = response.data.documents;
  return documents.map(doc => {
    const {fields = {}, name, createTime, updateTime} = doc;
    const extractedFields = extractValues(fields);
    return {
      documentName: name,
      createTime,
      updateTime,
      ...extractedFields,
    };
  });
};
