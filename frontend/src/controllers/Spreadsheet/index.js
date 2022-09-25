import convertSecondsToTimestamp from '../../helpers/convertSecondsToTimestamp';
import getJamatKhanaGraph from '../Graphs/getJamatKhanaGraph';
import processJamatkhanaGraphData from '../../helpers/processJamatkhanaGraphData';
import processTrackingChanges from '../../helpers/processTrackingChanges';

import { EUROPE_CITIES } from '../../constants';

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

function processAllJKs(data) {
  // contains rows and columns for spreadsheet
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id', headerName: 'Jamatkhana', width: 400 },
      { field: 'total', headerName: 'Total', width: 200 },
      { field: 'percentage', headerName: 'Percentage', width: 200 },
    ],
  };
  // gets object with totals for each jk
  const jamatkhanas = getJamatKhanaGraph(data);
  // array with totals and percentage of each jk with europe on top
  const dataToAdd = processJamatkhanaGraphData(jamatkhanas, EUROPE_CITIES, '');

  // maps through data and populates rows
  dataToAdd.forEach((jk) => {
    const jkToAdd = {
      id: jk.name,
      percentage: jk.percentage,
      total: jk.number,
    };
    rowsAndColumns.rows.push(jkToAdd);
  });

  return rowsAndColumns;
}

function processAgeTracker(data) {
  // contains rows and columns for spreadsheet
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id', headerName: 'Age Range', width: 400 },
      { field: 'lastmonth', headerName: 'Last Month', width: 200 },
      { field: 'thismonth', headerName: 'This Month', width: 200 },
      { field: 'change', headerName: 'Change', width: 200 },
    ],
  };

  const mostRecentIndex = data.length - 1;
  const secondMostRecentIndex = mostRecentIndex - 1;

  const mostRecent = data[mostRecentIndex];
  const secondMostRecent = data[secondMostRecentIndex];

  const rowsToAdd = processTrackingChanges(secondMostRecent, mostRecent);

  rowsAndColumns.rows = [...rowsToAdd];

  return rowsAndColumns;
}

function processGenderTracker(data) {
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id', headerName: 'Gender', width: 400 },
      { field: 'lastmonth', headerName: 'Last Month', width: 200 },
      { field: 'thismonth', headerName: 'This Month', width: 200 },
      { field: 'change', headerName: 'Change', width: 200 },
    ],
  };

  const mostRecentIndex = data.length - 1;
  const secondMostRecentIndex = mostRecentIndex - 1;

  const mostRecent = data[mostRecentIndex];
  const secondMostRecent = data[secondMostRecentIndex];

  const rowsToAdd = processTrackingChanges(secondMostRecent, mostRecent);

  rowsAndColumns.rows = [...rowsToAdd];

  return rowsAndColumns;
}

function processJKTracker(data) {
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id', headerName: 'Jamatkhana', width: 400 },
      { field: 'lastmonth', headerName: 'Last Month', width: 200 },
      { field: 'thismonth', headerName: 'This Month', width: 200 },
      { field: 'change', headerName: 'Change', width: 200 },
    ],
  };

  const mostRecentIndex = data.length - 1;
  const secondMostRecentIndex = mostRecentIndex - 1;

  const mostRecent = data[mostRecentIndex];
  const secondMostRecent = data[secondMostRecentIndex];

  const rowsToAdd = processTrackingChanges(secondMostRecent, mostRecent);

  rowsAndColumns.rows = [...rowsToAdd];

  return rowsAndColumns;
}

// based on type, calls different functions for spreadsheet data
export default function getSpreadSheetDatafromData(type, data) {
  switch (type) {
    case 'get-courses':
      return getAlisonCatalogueCall(data);
    case 'all-learners':
      return processAllLearners(data);
    case 'all-jks':
      return processAllJKs(data);
    case 'age-tracker':
      return processAgeTracker(data);
    case 'gender-tracker':
      return processGenderTracker(data);
    case 'jk-tracker':
      return processJKTracker(data);
    default:
      console.error('no type');
      return {};
  }
}
