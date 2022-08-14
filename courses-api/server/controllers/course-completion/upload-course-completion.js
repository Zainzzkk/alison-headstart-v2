const CourseStatusRaw = require('../../models/CourseStatusRaw');
const CourseStatus = require('../../models/CourseStatus');
const convertToSeconds = require('../../helpers/convertToSeconds.helper');
const { findDuplicateCourses } = require('../../helpers/findDuplicateCourses.helper');

// uploads the raw (all courses and duplicates) into db
const uploadCourseStatusRaws = async (courseCompletionsUploaded) => {
  const courseCompletion = [];

  // maps and populates array with correct DB format
  courseCompletionsUploaded.map((course) => {
    const courseToAdd = {
      LearnerID: parseInt(course['IIUK ID']),
      CourseID: course['Course ID'],
      CourseName: course['Course Name'],
      Completion: course.Completed,
      Time: convertToSeconds(course['Total Duration']),
    };
    courseCompletion.push(courseToAdd);
  });

  // removes triplicates/quadruplicates with same id and course name
  const filterRaw = courseCompletion.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.CourseID === value.CourseID && t.LearnerID === value.LearnerID
    )));


  const response = await CourseStatusRaw.bulkCreate(filterRaw, { updateOnDuplicate: ['LearnerID', 'CourseID', 'CourseName', 'Completion', 'Time'] })
    .then(() => {
      return {
        status: 200,
        message: 'Uploaded the raw course completion stats data successfully',
      }
    })
    .catch((error) => {
      console.error('Error uploading raw course completion stats data', { error });
      return {
        status: 500,
        message: `Fail to import raw course completion stats data into database! ${error}`,
      }
    });

  return response;

};

// maps through uploaded file and uploads without duplicates
const uploadFilteredUniqueCourses = async (courseCompletionsUploaded) => {
  const filteredCourses = [];

  // checks for duplicates for any single course and returns an array without '- Revised' duplicates
  // however, will return double when it maps through full array
  courseCompletionsUploaded.map((course) => {
    const filteredCourse = findDuplicateCourses(course, courseCompletionsUploaded);
    filteredCourses.push(filteredCourse);
  });

  // removes the duplicates which happens when mapping (as will find same duplicates twice)
  const singleCourses = filteredCourses.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t['Course Name'] === value['Course Name'] && t['IIUK ID'] === value['IIUK ID']
    )));


  const coursesToInsert = [];
  // creates array with format for database
  singleCourses.map((eachCourse) => {
    const courseToAdd = {
      LearnerID: parseInt(eachCourse['IIUK ID']),
      CourseID: eachCourse['Course ID'],
      CourseName: eachCourse['Course Name'],
      Completion: eachCourse.Completed,
      Time: convertToSeconds(eachCourse['Total Duration']),
    };
    coursesToInsert.push(courseToAdd);
  })


  const response = await CourseStatus.bulkCreate(coursesToInsert, { updateOnDuplicate: ['LearnerID', 'CourseID', 'CourseName', 'Completion', 'Time'] })
    .then(() => {
      return {
        status: 200,
        message: 'Uploaded the filtered course completion stats data successfully',
      }
    })
    .catch((error) => {
      console.error('Error uploading raw course completion stats data', { error });
      return {
        status: 500,
        message: `Fail to import filtered course completion stats data into database! ${error}`,
      }
    });

  return response
};

const uploadCourseCompletionController = async (courseCompletionsUploaded) => {
  // if no body or empty array then returns 400
  if (!courseCompletionsUploaded || courseCompletionsUploaded.length < 1) {
    return {
      status: 400,
      message: 'File has no contents'
    };
  }

  const { status, message } = await uploadCourseStatusRaws(courseCompletionsUploaded);
  // if raw upload succeeds then inserts filtered data
  if (status === 200) {
    const { status: secondStatus, message: secondMessage } = await uploadFilteredUniqueCourses(courseCompletionsUploaded);

    return {
      status: secondStatus,
      message: secondMessage
    }
  } else {
    return {
      status,
      message,
    }
  }

}

const uploadCourseCompletionStats = async (req, res) => {
  try {
    const courseCompletionStatsUploaded = req.body;

    const { status, message } = await uploadCourseCompletionController(courseCompletionStatsUploaded);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch uploadCourseCompletionStats - Error uploading course completion stats data to the database', { error });
    res.status(500).send({
      message: `Try-catch uploadCourseCompletionStats - Failed to import course completion stats data into database! ${error}`,
      error: error.message,
    });
  }

};

module.exports = { uploadCourseCompletionController, uploadCourseCompletionStats }