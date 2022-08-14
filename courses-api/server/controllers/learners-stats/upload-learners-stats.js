const Learners = require('../../models/Learners');
const convertTotalDurationToEpoch = require('../../helpers/convertTotalDurationToEpoch.helper');

const uploadLearnersStatsController = async (learnersStatsUploaded) => {
  const learnerStats = [];

  // if no body or empty array then returns 400
  if (!learnersStatsUploaded || learnersStatsUploaded.length < 1) {
    return {
      status: 400,
      message: 'File has no contents'
    };
  }

  learnersStatsUploaded.map((learner) => {
    const learnerToUpload = {
      ID: learner['IIUK ID'],
      AgeBand: learner['Age Band'],
      Gender: learner.Gender,
      Jamatkhana: learner.Jamatkhana,
      // converts from decimal hours to seconds
      TotalDuration: convertTotalDurationToEpoch(learner['Total Duration']),
      NumberCourses: learner['Number of Courses'],
    }
    learnerStats.push(learnerToUpload);
  });

  const response = await Learners.bulkCreate(learnerStats,
    {
      updateOnDuplicate: ['ID', 'AgeBand', 'Gender',
        'Jamatkhana', 'TotalDuration', 'NumberCourses'],
    })
    .then(() => {
      return {
        status: 200,
        message: 'Uploaded the the learner stats data successfully',
      }
    })
    .catch((error) => {
      console.error('Error uploading learner stats data', { error });
      return {
        status: 500,
        message: `Fail to import learners stats data into database! ${error}`,
      }
    });

  return response
}

const uploadLearnersStats = async (req, res) => {
  try {
    const learnersStatsUploaded = req.body;

    const { status, message } = await uploadLearnersStatsController(learnersStatsUploaded);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch uploadLearnersStats - Error uploading learners stats data to the database', { error });
    res.status(500).send({
      message: `Try-catch uploadLearnersStats - Failed to import learners stats data into database! ${error}`,
      error: error.message,
    });
  }

};

module.exports = { uploadLearnersStats, uploadLearnersStatsController };