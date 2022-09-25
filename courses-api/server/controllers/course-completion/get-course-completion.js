const CourseStatusRaw = require('../../models/CourseStatusRaw');
const CourseStatus = require('../../models/CourseStatus');

const getCourseCompletionRawController = async () => {
  return CourseStatusRaw.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving Learners.', err)
    });
};

const getCourseCompletionController = () => {
  return CourseStatus.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving Learners.', err)
    });
}

// gets raw completion
const getCourseCompletionRaw = async (req, res) => {
  try {

    const courseStatuses = await getCourseCompletionRawController();

    res.status(200).send(courseStatuses);
  } catch (error) {
    console.error('Try-catch getCourseCompletionRaw - Error getting raw course completion stats data from the database', { error });
    res.status(500).send({
      message: `Try-catch getCourseCompletionRaw - Error getting raw course completion stats data from the database! ${error}`,
      error: error.message,
    });
  }
};

// gets filtered completion
const getCourseCompletion = async (req, res) => {
  try {
    const courseStatuses = await getCourseCompletionController();

    res.status(200).send(courseStatuses);
  } catch (error) {
    console.error('Try-catch getCourseCompletionRaw - Error getting course completion stats data from the database', { error });
    res.status(500).send({
      message: `Try-catch getCourseCompletionRaw - Error getting course completion stats data from the database! ${error}`,
      error: error.message,
    });
  }
};

module.exports = { getCourseCompletionRaw, getCourseCompletion }