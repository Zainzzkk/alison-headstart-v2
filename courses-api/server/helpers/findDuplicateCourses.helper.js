const replaceWrongHyphen = require('./replaceWrongHyphen.helper');
const splitCourseName = require('./splitCourseName.helper');

// within duplicates, returns the one which has ID which is not 0, else the one with 0 if not existing
const findDuplicateIndexWithCourseId = (duplicates) => {
  // checks if one with ID which is not 0 and returns that
  const courseWithId = duplicates.find(duplicate => duplicate['Course ID'] !== 0);

  // if none with ID which is not 0 then returns the first one
  if (!courseWithId) {
    return duplicates[0];
  }

  // returns ID which is not 0
  return courseWithId;
};

// checks for duplicates of current course which is mapped 
const findDuplicateCourses = (course, allCourses) => {
  // some courses have a weird hypen which is replaced with standard '-'
  const courseName = replaceWrongHyphen(course['Course Name']);
  // courses with '- Revised' removed
  const courseNameSplit = splitCourseName(courseName);

  // checks for duplicates of a single course
  const duplicates = allCourses.filter(courseFilter => (splitCourseName(courseFilter['Course Name']) === courseNameSplit)
    && (course['IIUK ID'] === courseFilter['IIUK ID']));

  // if duplicates
  if (duplicates.length > 1) {
    // finds the one with course ID (not 0) if exists
    const courseWithId = findDuplicateIndexWithCourseId(duplicates);
    // removes '- Revised'
    courseWithId['Course Name'] = replaceWrongHyphen(courseWithId['Course Name']);
    courseWithId['Course Name'] = splitCourseName(courseWithId['Course Name']);
    return courseWithId;
  } else {
    // if no duplicates then removes '- Revised'
    duplicates[0]['Course Name'] = replaceWrongHyphen(duplicates[0]['Course Name']);
    duplicates[0]['Course Name'] = splitCourseName(duplicates[0]['Course Name']);
    return duplicates[0];
  }
};

module.exports = { findDuplicateCourses, findDuplicateIndexWithCourseId };