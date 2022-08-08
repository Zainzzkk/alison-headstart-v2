const CourseCertificates = require('../../models/CourseCertificates');
const excelDateToISODateString = require('../../helpers/excelToDateConverter');
const TYPE = require('../../constants/type.constant');

// function to upload course codes from uploaded array to database
const uploadCourseCodes = (req, res) => {
  try {
    // if no body or empty array then returns 400
    if (!req.body || req.body.length < 1) {
      return res.status(400).send('File has no contents');
    }
    // array of excel sheet course codes from body
    const courseCodesUploaded = req.body;
    // array to add mapped codes to add to DB
    const courseCodes = [];

    courseCodesUploaded.map((course) => {
      // sheet contains diploma and certificates
      if (course.Type === TYPE.CERTIFICATE) {
        // excelDateToISODateString to convert from excel number to date
        const courseToPush = {
          Code: course.Code,
          Type: course.Type,
          Expiry: excelDateToISODateString(course.Expiry),
          Used: course.Status,
          Date: course.Date ? excelDateToISODateString(course.Date) : null,
        }
        courseCodes.push(courseToPush);
      }
    });

    // adds to database and sends 200 if uploaded fine
    CourseCertificates.bulkCreate(courseCodes, { updateOnDuplicate: ['Code', 'Type', 'Expiry', 'Used', 'Date'] })
      .then(() => {
        res.status(200).send({
          message: 'Uploaded the file successfully to the database',
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Fail to import data into database!',
          error: error.message,
        });
      });


  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Error uploading course codes',
    });
  }

};

module.exports = { uploadCourseCodes }