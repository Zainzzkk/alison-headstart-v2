const DiplomaCertificates = require('../../models/DiplomaCertificate');
const excelDateToISODateString = require('../../helpers/excelToDateConverter');
const TYPE = require('../../constants/type.constant');

// function to upload diploma codes from uploaded array to database
const uploadDiplomaCodes = (req, res) => {
  try {
    // if no body or empty array then returns 400
    if (!req.body || req.body.length < 1) {
      return res.status(400).send('File has no contents');
    }
    // array of excel sheet course codes from body
    const diplomaCodesUploaded = req.body;
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
    DiplomaCertificates.bulkCreate(diplomaCodes, { updateOnDuplicate: ['Code', 'Type', 'Expiry', 'Used', 'Date'] })
      .then(() => {
        res.status(200).send({
          message: 'Uploaded the diploma file successfully to the database',
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Fail to import diploma data into database!',
          error: error.message,
        });
      });


  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Error uploading diploma codes',
    });
  }

};

module.exports = { uploadDiplomaCodes }