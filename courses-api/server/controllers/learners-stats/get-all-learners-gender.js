const Learners = require('../../models/Learners');

const getAllLearnersGenderController = async () => {
  return Learners.findAll({ raw: true, attributes: ['Gender'] })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving Learners.', err)
    });
}

const getAllLearnersGender = async (req, res) => {
  try {
    const learners = await getAllLearnersGenderController();

    res.status(200).send(learners);
  } catch (error) {
    console.error('Try-catch getAllLearners - Error getting all learners data from the database', { error });
    res.status(500).send({
      message: `Try-catch getAllLearners - Error getting all learners data from the database! ${error}`,
      error: error.message,
    });
  }

};

module.exports = { getAllLearnersGender }