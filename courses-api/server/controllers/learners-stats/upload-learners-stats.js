const Learners = require('../../models/Learners');
const convertTotalDurationToEpoch = require('../../helpers/convertTotalDurationToEpoch.helper');

const uploadLearnersStats = (req, res) => {
  try {
    const learnersStatsUploaded = req.body;
    const learnerStats = [];

    // if no body or empty array then returns 400
    if (!req.body || req.body.length < 1) {
      return res.status(400).send('File has no contents');
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

    Learners.bulkCreate(learnerStats,
      {
        updateOnDuplicate: ['ID', 'AgeBand', 'Gender',
          'Jamatkhana', 'TotalDuration', 'NumberCourses'],
      })
      .then(() => {
        res.status(200).send({
          message: 'Uploaded the the learner stats data successfully',
        });
      })
      .catch((error) => {
        console.error('Error uploading learner stats data', error.message);
        res.status(500).send({
          message: 'Fail to import learners stats data into database!',
          error: error.message,
        });
      });
  } catch (error) {
    console.error('Error uploading learners stats data to the database');
    res.status(500).send({
      message: 'Fail to import learners stats data into database!',
      error: error.message,
    });
  }

};

module.exports = { uploadLearnersStats };