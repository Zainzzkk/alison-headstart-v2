const CourseCertificates = require('../../models/CourseCertificates');

const unallocateCertificateController = async (params) => {
  // sets to null and no so not allocated
  const unallocate = {
    Used: 'NO',
    Date: null,
  }

  // sequelize update call
  const response = await CourseCertificates.update(unallocate,
    {
      where: {
        Code: params.code,
      },
    })
    .then(() => {
      return {
        status: 200,
        message: 'Unallocated the certificate code successfully',
      }
    })
    .catch((error) => {
      console.error('Error unallocating the certificate code', { error });
      return {
        status: 500,
        message: `Fail to unallocate the certificate code into database! ${error}`,
      }
    });

  return response;
}

// unallocates certificate code
const unallocateCertificate = async (req, res) => {
  try {
    const toUnallocate = req.body;

    const { status, message } = await unallocateCertificateController(toUnallocate);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch unallocateCertificate - Error unallocating certificate code to the database', { error });
    res.status(500).send({
      message: `Try-catch unallocateCertificate - Error unallocating certificate code into database! ${error}`,
      error: error.message,
    });
  }
}

module.exports = { unallocateCertificate }