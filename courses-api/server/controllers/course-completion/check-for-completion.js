const { getCourseCompletionController } = require('./get-course-completion');
const { CompletionCertificateController } = require('./get-course-certificate-tracker');
const { uploadToDatabase } = require('../course-completion/upload-course-certificate-tracker');
const determineCourseType = require('../../helpers/determineCourseType.helper');

// checks courses which are completed and then adds them to tracker
const checkForCompletionController = async (courses, completionTracker) => {
  // checks if completed (100%) - add if more conditions needed such as time
  const completed = courses.filter((course) => ((course.Completion === 100) && course.Time >= 3000));
  const courseToAdd = [];

  completed.forEach((course) => {
    // conditions to check same id and course name not already in tracker.  remove revised to check
    const theSame = (same) => ((same.LearnerID === course.LearnerID) && (same.CourseName.split(' - Revised')[0] === course.CourseName.split(' - Revised')[0]));
    // checks if tracker contains the course
    const doesContain = completionTracker.some(theSame);

    if (!doesContain) {
      // if does not contain, then adds to object to add to tracker
      const toAdd = {
        LearnerID: parseInt(course.LearnerID),
        CourseID: course.CourseID,
        // removes -revised
        CourseName: course.CourseName.split(' - Revised')[0],
        Type: determineCourseType(course.CourseName),
        Completion: parseInt(course.Completion),
        // converts to seconds
        Time: course.Time,
        // default to unsure
        Status: 'UNSURE',
        // defaults to null
        Code: null,
      }
      courseToAdd.push(toAdd);
    };
  });

  if (courseToAdd.length) {
    // adds to tracker db
    const response = await uploadToDatabase(courseToAdd);
    return response
  }

  // else returns 200 with message that nothing new
  return {
    status: 200,
    message: 'No new completed courses to add to tracker',
  };
}

// checks for completion and adds to tracker table
const checkForCompletion = async (req, res) => {
  try {
    // gets array with filtered courses (not raw with duplicates)
    const coursesFiltered = await getCourseCompletionController();
    // gets current completion tracker db
    const completionTracker = await CompletionCertificateController();

    const { status, message } = await checkForCompletionController(coursesFiltered, completionTracker);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Error checking for completion for tracker', { error });
    res.status(500).send({
      message: `Try-catch checkForCompletion - Error checking for completion for tracker ${error}`,
      error: error.message,
    });
  }
}

module.exports = { checkForCompletion }