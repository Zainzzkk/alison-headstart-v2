const CompletionCertificateTracker = require('../../models/CompletionCertificateTracker');

const convertTotalDurationToEpoch = require('../../helpers/convertTotalDurationToEpoch.helper');

// handles upload to db and returns response
const uploadToDatabase = async (tracker) => {
  const response = await CompletionCertificateTracker.bulkCreate(tracker,
    {
      updateOnDuplicate: ['LearnerID', 'CourseID', 'CourseName', 'Type', 'Completion', 'Time', 'Status', 'Code'],
    })
    .then(() => {
      return {
        status: 200,
        message: 'Uploaded the course tracker successfully',
      }
    })
    .catch((error) => {
      console.error('Error uploading the course tracker data', { error });
      return {
        status: 500,
        message: `Fail to import the course tracker data into database! ${error}`,
      }
    });

  return response;
}

// adds to tracker db when allocating certificate code
const allocateCourseCertificateTrackerController = async (courseTracker) => {
  const tracker = [];

  // all received in body
  const trackerToAdd = {
    LearnerID: courseTracker.LearnerID,
    CourseID: courseTracker.CourseID,
    CourseName: courseTracker.CourseName,
    Type: courseTracker.Type,
    Completion: courseTracker.Completion,
    Time: courseTracker.Time,
    Status: courseTracker.Status,
    Code: courseTracker.Code,
  };

  tracker.push(trackerToAdd);

  const response = await uploadToDatabase(tracker);

  return response
}

// uploads tracker
const uploadTrackerController = async (courseTracker) => {
  const tracker = [];

  courseTracker.forEach((codeTrack) => {
    const trackerToAdd = {
      // int
      LearnerID: parseInt(codeTrack['Learner ID']),
      CourseID: codeTrack['Course ID'],
      CourseName: codeTrack['Course Name'],
      Type: codeTrack['Type'],
      // int
      Completion: parseInt(codeTrack['Completion']),
      // converts to seconds
      Time: convertTotalDurationToEpoch(codeTrack['Time']),
      Status: codeTrack['Status'],
      Code: codeTrack['Code'],
    };

    tracker.push(trackerToAdd);
  });

  const response = await uploadToDatabase(tracker);

  return response
}

const uploadTrackerManualController = async (courseTracker) => {
  // as manual converts to array and puts straight in db
  const response = await uploadToDatabase([courseTracker]);

  return response
}

// handles upload of tracker file
const uploadCourseCertificateTracker = async (req, res) => {
  try {
    const certificateTracker = req.body;

    const { status, message } = await uploadTrackerController(certificateTracker);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch uploadCourseCertificateTracker - Error uploading course certificate data to the database', { error });
    res.status(500).send({
      message: `Try-catch uploadCourseCertificateTracker - Failed to import course certificate data into database! ${error}`,
      error: error.message,
    });
  }
};

// handles manual upload of tracker
const uploadCourseCertificateTrackerManual = async (req, res) => {
  try {
    const certificateTracker = req.body;

    const { status, message } = await uploadTrackerManualController(certificateTracker);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch uploadCourseCertificateTrackerManual - Error uploading manual course certificate data to the database', { error });
    res.status(500).send({
      message: `Try-catch uploadCourseCertificateTrackerManual - Failed to import manual course certificate data into database! ${error}`,
      error: error.message,
    });
  }
};

// handles allocation upload of tracker
const allocateCourseCertificateTracker = async (req, res) => {
  try {
    const toAllocate = req.body;

    const { status, message } = await allocateCourseCertificateTrackerController(toAllocate);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch uploadCourseCertificateTrackerManual - Error uploading manual course certificate data to the database', { error });
    res.status(500).send({
      message: `Try-catch uploadCourseCertificateTrackerManual - Failed to import manual course certificate data into database! ${error}`,
      error: error.message,
    });
  }
};

module.exports = {
  uploadCourseCertificateTracker,
  uploadCourseCertificateTrackerManual,
  uploadToDatabase,
  allocateCourseCertificateTracker
}