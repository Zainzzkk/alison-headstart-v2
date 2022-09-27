const CourseCertificates = require('../../models/CourseCertificates');
const excelDateToISODateString = require('../../helpers/excelToDateConverter');
const TYPE = require('../../constants/type.constant');

const uploadCourseCodesController = async (courseCodesUploaded) => {
  // if no body or empty array then returns 400
  if (!courseCodesUploaded || courseCodesUploaded.length < 1) {
    return {
      status: 400,
      message: 'File has no contents'
    };
  }

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
  const response = await CourseCertificates.bulkCreate(courseCodes, { updateOnDuplicate: ['Code', 'Type', 'Expiry', 'Used', 'Date'] })
    .then(() => {
      return {
        status: 200,
        message: 'Uploaded the certificate codes successfully to the database',
      }
    })
    .catch((error) => {
      console.error('Error import certificate codes into database!', { error })
      return {
        status: 500,
        message: `Fail to import certificate codes into database! ${{ error }}`,
      }
    });

  return response;
}

// function to upload course codes from uploaded array to database
const uploadCourseCodes = async (req, res) => {
  try {
    const courseCodesUploaded = req.body;

    const { status, message } = await uploadCourseCodesController(courseCodesUploaded);

    res.status(status).send({ message });
  } catch (err) {
    console.error('Try-catch - uploadCourseCodes - Error uploading certificate codes', { err });
    res.status(500).send({
      message: `Try-catch - uploadCourseCodes - Error uploading certificate codes ${{ err }}`,
    });
  }
};

module.exports = { uploadCourseCodes, uploadCourseCodesController }