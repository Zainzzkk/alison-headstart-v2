const DiplomaCertificates = require('../../models/DiplomaCertificate');

const unallocateDiplomaController = async (params) => {
  // sets to no and null to unallocate
  const unallocate = {
    Used: 'NO',
    Date: null,
  }

  // sequelize call to update where code is the same
  const response = await DiplomaCertificates.update(unallocate,
    {
      where: {
        Code: params.code,
      },
    })
    .then(() => {
      return {
        status: 200,
        message: 'Unallocated the diploma code successfully',
      }
    })
    .catch((error) => {
      console.error('Error unallocating the diploma code', { error });
      return {
        status: 500,
        message: `Fail to unallocate the diploma code into database! ${error}`,
      }
    });

  return response;
}

// unallocate diploma code
const unallocateDiploma = async (req, res) => {
  try {
    const toUnallocate = req.body;

    const { status, message } = await unallocateDiplomaController(toUnallocate);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch unallocateDiploma - Error unallocating diploma to the database', { error });
    res.status(500).send({
      message: `Try-catch unallocateDiploma - Error unallocating diploma into database! ${error}`,
      error: error.message,
    });
  }
}

module.exports = { unallocateDiploma }