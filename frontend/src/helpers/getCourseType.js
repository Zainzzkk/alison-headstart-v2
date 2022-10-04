const { COURSE_TYPE } = require('../constants');

// helper to return course type from course name from spreadsheet
export default function determineCourseType(name) {
  if (!name) {
    return null;
  }
  // if string contains diploma then returns diploma or returns certificate
  if (name.includes(COURSE_TYPE.DIPLOMA)) {
    return COURSE_TYPE.DIPLOMA;
  }

  return COURSE_TYPE.CERTIFICATE;
}
