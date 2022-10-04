const CompletionCertificateTracker = require('../../models/CompletionCertificateTracker');

const unallocateCertificateTrackerController = async (params) => {
  // set to unsure and null code to show not allocated
  const unallocate = {
    Status: 'UNSURE',
    Code: null,
  }

  // sequelize update query
  const response = await CompletionCertificateTracker.update(unallocate,
    {
      where: {
        LearnerID: params.learnerid,
        CourseID: params.courseid,
        CourseName: params.coursename,
      },
    })
    .then(() => {
      return {
        status: 200,
        message: 'Unallocated the course tracker successfully',
      }
    })
    .catch((error) => {
      console.error('Error unallocating the course tracker', { error });
      return {
        status: 500,
        message: `Fail to unallocate the course tracker into database! ${error}`,
      }
    });

  return response;
}

// unallocates certificate code tracker and sets to unsure
const unallocateCertificateTracker = async (req, res) => {
  try {
    const toUnallocate = req.body;

    const { status, message } = await unallocateCertificateTrackerController(toUnallocate);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch unallocateCertificateTracker - Error unallocating course tracker to the database', { error });
    res.status(500).send({
      message: `Try-catch unallocateCertificateTracker - Error unallocating course tracker into database! ${error}`,
      error: error.message,
    });
  }
}

module.exports = { unallocateCertificateTracker }