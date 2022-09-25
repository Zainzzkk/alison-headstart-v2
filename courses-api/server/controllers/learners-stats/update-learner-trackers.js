const moment = require('moment');
const AgeTracker = require('../../models/AgeTracker');
const GenderTracker = require('../../models/GenderTracker');
const JamatkhanaTracker = require('../../models/JamatkhanaTracker');

const { getAllLearnersController } = require('./get-all-learners');

const date = moment().format('DD/MM/YYYY').toString();

const populateAgeTracker = async (learners) => {
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

  const genderCounter = {
    Date: date,
    Male: 0,
    Female: 0,
  };

  const jkCounter = {
    Date: date,
  };

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
      const jk = (learner.Jamatkhana).toLowerCase();

      if (jkCounter[jk]) {
        jkCounter[jk] += 1;
      } else {
        jkCounter[jk] = 1;
      };
    }
  });

  try {
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

  await populateAgeTracker(learners);
}

module.exports = { updateLearnerTrackerController };