const Learner = require('../models/LearnerDetails');

// gets learner by id and returns first element of array, else returns error
const getLearnerController = async (learnerId) => {
  return Learner.findAll({
    raw: true,
    where: {
      ID: learnerId,
    },
  })
    .then((data) => {
      if (data.length > 0) {
        return data[0];
      }

      return {
        error: 'Error getting learner'
      }
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving learner.', err);
      return {
        error: 'Error getting learner'
      }
    });
}

const getLearner = async (req, res) => {
  try {
    // learner id from params
    const learnerId = req.params.learnerId;

    const learner = await getLearnerController(learnerId);

    res.status(200).send(learner);
  } catch (err) {
    console.error('Try-catch - getLearner - Error getting learner', { err });
    res.status(500).send({
      message: `Try-catch - getLearner - Error getting learner ${{ err }}`,
    });
  }
}

module.exports = { getLearner }