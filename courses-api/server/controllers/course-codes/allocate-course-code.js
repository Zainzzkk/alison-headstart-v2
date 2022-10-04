const CourseCertificates = require('../../models/CourseCertificates');
const moment = require('moment');

const allocateCourseCodeController = async (code) => {
  const allocation = [];

  // body to allocate by changing used to YES and adding todays date
  const toAllocate = {
    Code: code.Code,
    Type: code.Type,
    Expiry: code.Expiry,
    Used: 'YES',
    Date: moment(new Date()).format('YYYY-MM-DD'),
  };

  allocation.push(toAllocate);

  // adds to database and sends 200 if allocated fine
  const response = await CourseCertificates.bulkCreate(allocation, { updateOnDuplicate: ['Code', 'Type', 'Expiry', 'Used', 'Date'] })
    .then(() => {
      return {
        status: 200,
        message: 'Allocated the certificate code successfully to the database',
      }
    })
    .catch((error) => {
      console.error('Error allocating certificate code into database!', { error })
      return {
        status: 500,
        message: `Fail to allocating certificate codes into database! ${{ error }}`,
      }
    });

  return response;
}

// function to allocate course code to database
const allocateCourseCode = async (req, res) => {
  try {
    const code = req.body;

    const { status, message } = await allocateCourseCodeController(code);

    res.status(status).send({ message });
  } catch (err) {
    console.error('Try-catch - allocateCourseCode - Error allocating certificate coded', { err });
    res.status(500).send({
      message: `Try-catch - allocateCourseCode - Error allocating certificate code ${{ err }}`,
    });
  }
};

module.exports = { allocateCourseCode }