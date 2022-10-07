const DiplomaCertificates = require('../../models/DiplomaCertificate');
const moment = require('moment');

// allocates code to diploma codes db
const allocateDiplomaCodeController = async (code) => {
  const allocation = [];

  // sets used to yes and adds todays date
  const toAllocate = {
    Code: code.Code,
    Type: code.Type,
    Expiry: code.Expiry,
    Used: 'YES',
    Date: moment(new Date()).format('YYYY-MM-DD'),
  };

  allocation.push(toAllocate);

  // adds to database and sends 200 if allocated fine
  const response = await DiplomaCertificates.bulkCreate(allocation, { updateOnDuplicate: ['Code', 'Type', 'Expiry', 'Used', 'Date'] })
    .then(() => {
      return {
        status: 200,
        message: 'Allocated the diploma code successfully to the database',
      }
    })
    .catch((error) => {
      console.error('Error allocating diploma code into database!', { error })
      return {
        status: 500,
        message: `Fail to allocating diploma codes into database! ${{ error }}`,
      }
    });

  return response;
}

// function to allocate diploma codes from to database
const allocateDiplomaCode = async (req, res) => {
  try {
    const code = req.body;

    const { status, message } = await allocateDiplomaCodeController(code);

    res.status(status).send({ message });
  } catch (err) {
    console.error('Try-catch - allocateDiplomaCode - Error allocating diploma coded', { err });
    res.status(500).send({
      message: `Try-catch - allocateDiplomaCode - Error allocating diploma code ${{ err }}`,
    });
  }
};

module.exports = { allocateDiplomaCode }