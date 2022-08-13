const Course = require('../../models/Course');
const determineCourseType = require('../../helpers/determineCourseType.helper');

const uploadAlisonCatalogueController = async (courseCatalogueReceived) => {
  const courseCatalogue = [];

  // if no body or empty array then returns 400
  if (!courseCatalogueReceived || courseCatalogueReceived.length < 1) {
    return {
      status: 400,
      message: 'File has no contents'
    }
  }

  courseCatalogueReceived.map((course) => {
    // stored as course ID and Course Name in spreadsheet
    const courseToAdd = {
      ID: course['Course ID'],
      Name: course['Course Name'],
      // returns if certificate or diploma
      Type: determineCourseType(course['Course Name']),
      // not part of current sheet
      Category: '',
    }
    courseCatalogue.push(courseToAdd);
  })

  const response = await Course.bulkCreate(courseCatalogue, { ignoreDuplicates: true })
    .then(() => {
      return {
        status: 200,
        message: 'Uploaded the alison-catalogue data successfully'
      }
    })
    .catch((error) => {
      console.error('Error importing alison catalogue into database in controller', { error })
      return {
        status: 500,
        message: 'Fail to import alison-catalogue into database!',
      }
    });

  return response;
}

// uploads alison catalogue to db
const uploadAlisonCatalogue = async (req, res) => {
  try {
    const courseCatalogueReceived = req.body;

    const { status, message } = await uploadAlisonCatalogueController(courseCatalogueReceived);

    res.status(status).send({ message });
  } catch (error) {
    console.error('try catch error uploadAlisonCatalogue - error uploading alison-catalogue to db', { err });
    res.status(500).send({
      message: 'Fail to import alison-catalogue into database!',
    });
  }
};

module.exports = { uploadAlisonCatalogue, uploadAlisonCatalogueController }