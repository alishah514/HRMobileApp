export const ExtractValues = fields => {
  const educationArray = [];
  const jobObject = {};
  const personalObject = {};

  if (fields.education?.arrayValue?.values) {
    fields.education.arrayValue.values.forEach(item => {
      const eduFields = item.mapValue.fields;
      educationArray.push({
        Institute: eduFields.Institute?.stringValue,
        Degree: eduFields.Degree?.stringValue,

        StartDate: eduFields.startDate?.timestampValue,
        EndDate: eduFields.endDate?.timestampValue,
      });
    });
  }

  // Extract job
  if (fields.job?.mapValue?.fields) {
    const jobFields = fields.job.mapValue.fields;
    jobObject.Designation = jobFields.Designation?.stringValue;
    jobObject.Department = jobFields.Department?.stringValue;
    jobObject.JoiningDate = jobFields.JoiningDate?.timestampValue;
    jobObject.employmentType = jobFields.employmentType?.stringValue;
    jobObject.salary = jobFields.salary?.stringValue;
    jobObject.wageType = jobFields.wageType?.stringValue;
    jobObject.punchInTime = jobFields.punchInTime?.integerValue;
    jobObject.punchOutTime = jobFields.punchOutTime?.integerValue;
  }

  // Extract personal
  if (fields.personal?.mapValue?.fields) {
    const personalFields = fields.personal.mapValue.fields;
    personalObject.employeeId = personalFields.employeeId?.stringValue;
    personalObject.fullName = personalFields.fullName?.stringValue;
    personalObject.phone = personalFields.phone?.integerValue;
    personalObject.email = personalFields.email?.stringValue;
    personalObject.birthDate = personalFields.birthDate?.timestampValue;
    personalObject.gender = personalFields.gender?.stringValue;
  }

  return {
    education: educationArray,
    job: jobObject,
    personal: personalObject,
  };
};
