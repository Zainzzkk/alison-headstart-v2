import convertSecondsToTimestamp from '../../helpers/convertSecondsToTimestamp';

// mapping for alison catalogue data
function getAlisonCatalogueCall(data) {
  // contains rows and columns for spreadsheet
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Name', width: 600 },
      { field: 'category', headerName: 'Category', width: 300 },
      { field: 'type', headerName: 'Type', width: 150 },
    ],
  };

  // maps through response and populates rows
  data.forEach((course) => {
    const courseToAdd = {
      id: course.ID,
      name: course.Name,
      category: course.Category,
      type: course.Type,
    };
    rowsAndColumns.rows.push(courseToAdd);
  });

  return rowsAndColumns;
}

function processAllLearners(data) {
  // contains rows and columns for spreadsheet
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'ageband', headerName: 'Age Band', width: 200 },
      { field: 'gender', headerName: 'Gender', width: 200 },
      { field: 'jamatkhana', headerName: 'Jamatkhana', width: 300 },
      { field: 'numbercourses', headerName: 'Number of Courses', width: 200 },
      { field: 'totalduration', headerName: 'Total Duration', width: 200 },
    ],
  };

  // maps through data and populates rows
  data.forEach((learner) => {
    const learnerToAdd = {
      id: learner.ID,
      ageband: learner.AgeBand,
      gender: learner.Gender,
      jamatkhana: learner.Jamatkhana,
      numbercourses: learner.NumberCourses,
      // converts seconds to string timestamp
      totalduration: convertSecondsToTimestamp(learner.TotalDuration),
    };
    rowsAndColumns.rows.push(learnerToAdd);
  });

  return rowsAndColumns;
}

// based on type, calls different functions for spreadsheet data
export default function getSpreadSheetDatafromData(type, data) {
  switch (type) {
    case 'get-courses':
      return getAlisonCatalogueCall(data);
    case 'all-learners':
      return processAllLearners(data);
    default:
      console.error('no type');
      return 'no type provided';
  }
}
