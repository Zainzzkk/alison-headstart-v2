const Course = require('../../models/Course');
const determineCourseType = require('../../helpers/determineCourseType.helper');

// uploads alison catalogue to db
const uploadAlisonCatalogue = (req, res) => {
  try {
    const courseCatalogueReceived = req.body;
    const courseCatalogue = [];

    // if no body or empty array then returns 400
    if (!req.body || req.body.length < 1) {
      return res.status(400).send('File has no contents');
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

    Course.bulkCreate(courseCatalogue, { ignoreDuplicates: true })
      .then(() => {
        res.status(200).send({
          message: 'Uploaded the alison-catalogue data successfully',
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Fail to import alison-catalogue into database!',
          error: error.message,
        });
      });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Fail to import alison-catalogue into database!',
    });
  }
};

module.exports = { uploadAlisonCatalogue }