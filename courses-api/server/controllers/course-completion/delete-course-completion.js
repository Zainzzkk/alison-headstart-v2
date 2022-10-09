const CourseStatusRaw = require('../../models/CourseStatusRaw');
const CourseStatus = require('../../models/CourseStatus');

// deletes specific raw course from the DB
const deleteSpecificRawController = async (course) => {
  // looks for matching ids and name and deletes
  const response = await CourseStatusRaw.destroy(
    {
      where: {
        LearnerID: course.learnerid,
        CourseID: course.courseid,
        CourseName: course.coursename,
      },
    },
  ).then(() => {
    return {
      status: 200,
      message: 'Deleted the raw course successfully',
    }
  })
    .catch((error) => {
      console.error('Error deleting the raw course', { error });
      return {
        status: 500,
        message: `Failed to delete the raw course from the database! ${error}`,
      }
    });

  return response;
}

const deleteSpecificRaw = async (req, res) => {
  try {
    const course = req.body;

    console.log(course);

    const { message, status } = await deleteSpecificRawController(course);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch deleteSpecificRaw - Error deleting specic raw course', { error });
    res.status(500).send({
      message: `Try-catch deleteSpecificRaw - Error deleting specific raw course from database! ${error}`,
      error: error.message,
    });
  }
}

// deletes filtered course from DB
const deleteSpecificFilteredController = async (course) => {
  // finds by ID and deletes
  const response = await CourseStatus.destroy(
    {
      where: {
        LearnerID: course.learnerid,
        CourseID: course.courseid,
        CourseName: course.coursename,
      },
    },
  ).then(() => {
    return {
      status: 200,
      message: 'Deleted the raw course successfully',
    }
  })
    .catch((error) => {
      console.error('Error deleting the filtered course', { error });
      return {
        status: 500,
        message: `Failed to delete the filtered course from the database! ${error}`,
      }
    });

  return response;
}

const deleteSpecificFiltered = async (req, res) => {
  try {
    const course = req.body;

    console.log(course);

    const { message, status } = await deleteSpecificFilteredController(course);

    res.status(status).send({ message });
  } catch (error) {
    console.error('Try-catch deleteSpecificFiltered - Error specific filtered course from the database', { error });
    res.status(500).send({
      message: `Try-catch deleteSpecificFiltered - Error deleting specific filtered course from the database! ${error}`,
      error: error.message,
    });
  }
}

module.exports = { deleteSpecificRaw, deleteSpecificFiltered }