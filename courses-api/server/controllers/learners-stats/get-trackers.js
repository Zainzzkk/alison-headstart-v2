const AgeTracker = require('../../models/AgeTracker');
const GenderTracker = require('../../models/GenderTracker');
const JamatkhanaTracker = require('../../models/JamatkhanaTracker');

const getAgeTrackerController = async () => {
  return AgeTracker.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving Learners.', err)
    });
}

const getGenderTrackerController = async () => {
  return GenderTracker.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving Learners.', err)
    });
}

const getJKTrackerController = async () => {
  return JamatkhanaTracker.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving Learners.', err)
    });
}

const getAgeTracker = async (req, res) => {
  try {
    const ageTracker = await getAgeTrackerController();

    res.status(200).send(ageTracker);
  } catch (error) {
    console.error('Try-catch getAgeTracker - Error getting age tracker data from the database', { error });
    res.status(500).send({
      message: `Try-catch getAgeTracker - Error getting age tracker data from the database! ${error}`,
      error: error.message,
    });
  }
};

const getGenderTracker = async (req, res) => {
  try {
    const genderTracker = await getGenderTrackerController();

    res.status(200).send(genderTracker);
  } catch (error) {
    console.error('Try-catch getGenderTracker - Error getting gender tracker data from the database', { error });
    res.status(500).send({
      message: `Try-catch getGenderTracker - Error getting gender tracker data from the database! ${error}`,
      error: error.message,
    });
  }
};

const getJKTracker = async (req, res) => {
  try {
    const jkTracker = await getJKTrackerController();

    res.status(200).send(jkTracker);
  } catch (error) {
    console.error('Try-catch getJKTracker - Error getting jk tracker data from the database', { error });
    res.status(500).send({
      message: `Try-catch getJKTracker - Error getting jk tracker data from the database! ${error}`,
      error: error.message,
    });
  }
};

module.exports = { getAgeTracker, getGenderTracker, getJKTracker }


