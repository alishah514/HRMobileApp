export const ExtractValues = fields => {
  const educationArray = [];
  const jobObject = {};
  const personalObject = {};
  const documentsObject = {};

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

  if (fields.personal?.mapValue?.fields) {
    const personalFields = fields.personal.mapValue.fields;
    personalObject.employeeId = personalFields.employeeId?.stringValue;
    personalObject.fullName = personalFields.fullName?.stringValue;
    personalObject.phone =
      personalFields.phone?.stringValue ?? personalFields.phone?.integerValue;
    personalObject.email = personalFields.email?.stringValue;
    personalObject.birthDate = personalFields.birthDate?.timestampValue;
    personalObject.gender = personalFields.gender?.stringValue;
    personalObject.imageUrl = personalFields.imageUrl?.stringValue;
  }

  if (fields.documents?.mapValue?.fields) {
    const docFields = fields.documents.mapValue.fields;

    Object.keys(docFields).forEach(docType => {
      const docData = docFields[docType]?.mapValue?.fields;

      if (docData) {
        documentsObject[docType] = {
          documentUrl: docData.documentUrl?.stringValue,
          expiryDate: docData.expiryDate?.timestampValue,
          issueDate: docData.issueDate?.timestampValue,
          number: docData.number?.stringValue,
        };
      }
    });
  }

  return {
    education: educationArray,
    job: jobObject,
    personal: personalObject,
    documents: documentsObject,
  };
};
