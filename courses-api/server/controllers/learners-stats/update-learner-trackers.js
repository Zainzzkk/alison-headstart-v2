const moment = require('moment');
const AgeTracker = require('../../models/AgeTracker');
const GenderTracker = require('../../models/GenderTracker');
const JamatkhanaTracker = require('../../models/JamatkhanaTracker');

const { getAllLearnersController } = require('./get-all-learners');

const date = moment().format('DD/MM/YYYY').toString();

// populates the age tracker with counter for each range
const populateTrackers = async (learners) => {
  // initialize age counter
  const ageCounter = {
    Date: date,
    Under18: 0,
    ages1825: 0,
    ages2635: 0,
    ages3645: 0,
    ages4655: 0,
    ages5660: 0,
    ages6165: 0,
    Above65: 0,
  };

  // initialize to 0 for gender
  const genderCounter = {
    Date: date,
    Male: 0,
    Female: 0,
  };

  // initialize jk counter with just date
  const jkCounter = {
    Date: date,
  };

  // maps through each learner and adds age, jk and gender
  learners.forEach((learner) => {
    if (learner.AgeBand === 'Less than 18') {
      ageCounter.Under18 += 1;
    }
    if (learner.AgeBand === '18 - 25') {
      ageCounter.ages1825 += 1;
    }
    if (learner.AgeBand === '26 - 35') {
      ageCounter.ages2635 += 1;
    }
    if (learner.AgeBand === '36 - 45') {
      ageCounter.ages3645 += 1;
    }
    if (learner.AgeBand === '46 - 55') {
      ageCounter.ages4655 += 1;
    }
    if (learner.AgeBand === '56 - 60') {
      ageCounter.ages5660 += 1;
    }
    if (learner.AgeBand === '61 - 65') {
      ageCounter.ages6165 += 1;
    }
    if (learner.AgeBand === 'Above 65') {
      ageCounter.Above65 += 1;
    }

    if (learner.Gender === 'Male') {
      genderCounter.Male += 1;
    }
    if (learner.Gender === 'Female') {
      genderCounter.Female += 1;
    }

    if (learner.Jamatkhana) {
      // to lowercase as stored in lowercase in db
      const jk = (learner.Jamatkhana).toLowerCase();

      // creates if does not exist or adds one
      if (jkCounter[jk]) {
        jkCounter[jk] += 1;
      } else {
        jkCounter[jk] = 1;
      }
    }
  });

  try {
    // adds to db
    await AgeTracker.bulkCreate([ageCounter]);
    await GenderTracker.bulkCreate([genderCounter]);
    await JamatkhanaTracker.bulkCreate([jkCounter]);
    console.log('Updated tracking data');
  } catch (error) {
    console.error('Error updating trackers', error);
  }
}

const updateLearnerTrackerController = async () => {
  const learners = await getAllLearnersController();

  await populateTrackers(learners);
}

module.exports = { updateLearnerTrackerController };