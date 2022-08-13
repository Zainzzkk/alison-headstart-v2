const TYPE = require('../constants/type.constant');

// helper to return course type from course name from spreadsheet
const determineCourseType = (name) => {
  if (!name) {
    return null;
  }
  // if string contains diploma then returns diploma or returns certificate
  if (name.includes(TYPE.DIPLOMA)) {
    return TYPE.DIPLOMA;
  };

  return TYPE.CERTIFICATE;
}

module.exports = determineCourseType;