const Learner = require('../models/LearnerDetails');

// uploads to db
const uploadToDatabase = async (learnersToAdd) => {
  const response = await Learner.bulkCreate(learnersToAdd, { updateOnDuplicate: ['ID', 'Name', 'AgeBand', 'Gender', 'Jamatkhana', 'Email'] })
    .then(() => {
      return {
        status: 200,
        message: 'Uploaded the learners data successfully'
      }
    })
    .catch((error) => {
      console.error('Error importing learners data into learners database in controller', { error })
      return {
        status: 500,
        message: 'Fail to import learners data into learners database!',
      }
    });

  return response;
}

// uploads learners file contents to db
const uploadLearnersController = async (learners) => {
  // if no body or empty array then returns 400
  if (!learners || learners.length < 1) {
    return {
      status: 400,
      message: 'File has no contents'
    };
  }

  const learnersToAdd = [];

  learners.forEach((learner) => {
    const learnerToAdd = {
      ID: learner['IIUK ID'],
      Name: learner['Name'],
      AgeBand: learner['Age Band'],
      Gender: learner['Gender'],
      Jamatkhana: learner['Jamatkhana'],
      Email: learner['Email'],
    }
    learnersToAdd.push(learnerToAdd);
  });

  const response = await uploadToDatabase(learnersToAdd);

  return response;
}

// uploads manual learner entry.  learner comes contructed in correct format
const uploadLearnersManualController = async (learner) => {
  // if no body or empty array then returns 400
  if (!learner) {
    return {
      status: 400,
      message: 'File has no contents'
    };
  }

  const response = await uploadToDatabase([learner]);

  return response;
}

const uploadLearners = async (req, res) => {
  try {
    const learners = req.body;

    const { status, message } = await uploadLearnersController(learners);
    console.log(status, message);
    res.status(status).send({ message });

  } catch (error) {
    console.error('Trycatch uploadLearners - error uploading learners to learnersdb', { error });
    res.status(500).send({
      message: 'Fail to import learners data into learnersdb!',
    });
  }
};

const uploadLearnersManual = async (req, res) => {
  try {
    const learners = req.body;

    const { status, message } = await uploadLearnersManualController(learners);
    console.log(status, message);
    res.status(status).send({ message });

  } catch (error) {
    console.error('Trycatch uploadLearners - error uploading learners to learnersdb', { error });
    res.status(500).send({
      message: 'Fail to import learners data into learnersdb!',
    });
  }
};

module.exports = { uploadLearners, uploadLearnersManual }
