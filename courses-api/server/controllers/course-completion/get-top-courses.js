const { getCourseCompletionController } = require('./get-course-completion');
const { getAlisonCatalogueController } = require('../alison-catalogue/get-alison-catalogue');
const addCategoriesToArray = require('../../helpers/addCategoriesToArray');
const countEachOccurence = require('../../helpers/countEachOccurrence');

const getTopCourses = async (req, res) => {
  try {
    // gets all courses by users
    const courseCompletion = await getCourseCompletionController();
    // gets full alison catalogue
    const alisonCatalogue = await getAlisonCatalogueController();

    // array for storing course types for all courses
    let mappedTypes = [];

    courseCompletion.forEach((eachCourse) => {
      // for each course, returns category of that course from alison catalogue
      const allCategories = alisonCatalogue.filter((eachItem) => eachItem.Name === eachCourse.CourseName).map((catalogueItem) => catalogueItem.Category);

      /**
       * maps through list of all categories
       * adds the categories to array
       */
      allCategories.forEach(eachFound => {
        mappedTypes = addCategoriesToArray(eachFound, mappedTypes);
      });
    });

    // object with number of times each category is found
    const occurrences = countEachOccurence(mappedTypes);

    res.status(200).send(occurrences);
  } catch (error) {
    console.error('Try-catch getTopCourses - Error getting top courses from the database', { error });
    res.status(500).send({
      message: `Try-catch getCourseCompletionRaw - Error getting top courses from the database! ${error}`,
      error: error.message,
    });
  }
}

module.exports = { getTopCourses };
