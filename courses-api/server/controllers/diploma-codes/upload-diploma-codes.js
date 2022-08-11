const DiplomaCertificates = require('../../models/DiplomaCertificate');
const excelDateToISODateString = require('../../helpers/excelToDateConverter');
const TYPE = require('../../constants/type.constant');

const uploadDiplomaCodesController = async (diplomaCodesUploaded) => {
  // if no body or empty array then returns 400
  if (!diplomaCodesUploaded || diplomaCodesUploaded.length < 1) {
    return {
      status: 400,
      message: 'File has no contents'
    };
  }
  // array to add mapped codes to add to DB
  const diplomaCodes = [];

  diplomaCodesUploaded.map((course) => {
    // sheet contains diploma and certificates
    if (course.Type === TYPE.DIPLOMA) {
      // excelDateToISODateString to convert from excel number to date
      const courseToPush = {
        Code: course.Code,
        Type: course.Type,
        Expiry: excelDateToISODateString(course.Expiry),
        Used: course.Status,
        Date: course.Date ? excelDateToISODateString(course.Date) : null,
      }
      diplomaCodes.push(courseToPush);
    }
  });

  // adds to database and sends 200 if uploaded fine
  const response = await DiplomaCertificates.bulkCreate(diplomaCodes, { updateOnDuplicate: ['Code', 'Type', 'Expiry', 'Used', 'Date'] })
    .then(() => {
      return {
        status: 200,
        message: 'Uploaded the diploma file successfully to the database',
      }
    })
    .catch((error) => {
      console.error('Error importing diploma codes into database', { err })
      return {
        status: 500,
        message: `Fail to import diploma data into database! ${error}`,
      }
    });

  return response;
}

// function to upload diploma codes from uploaded array to database
const uploadDiplomaCodes = async (req, res) => {
  try {
    const diplomaCodesUploaded = req.body;

    const { status, message } = await uploadDiplomaCodesController(diplomaCodesUploaded);

    res.status(status).send({ message });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: `Try catch - uploadDiplomaCodes - Error uploading diploma codes ${err}`,
    });
  }

};

module.exports = { uploadDiplomaCodes, uploadDiplomaCodesController }