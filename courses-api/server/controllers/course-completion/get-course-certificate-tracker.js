const CompletionCertificateTracker = require('../../models/CompletionCertificateTracker');

const CompletionCertificateController = async () => {
  return CompletionCertificateTracker.findAll({ raw: true })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Some error occurred while retrieving CompletionCertificateTracker.', err)
    });
}

const getCompletionCertificateTracker = async (req, res) => {
  try {
    const courseStatuses = await CompletionCertificateController();

    res.status(200).send(courseStatuses);
  } catch (error) {
    console.error('Try-catch getCompletionCertificateTracker - Error getting course completion tracker data from the database', { error });
    res.status(500).send({
      message: `Try-catch getCompletionCertificateTracker - Error getting course completion tracker data from the database! ${error}`,
      error: error.message,
    });
  }
}

module.exports = { getCompletionCertificateTracker, CompletionCertificateController };
