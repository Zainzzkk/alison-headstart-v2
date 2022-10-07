import convertSecondsToTimestamp from '../../helpers/convertSecondsToTimestamp';
import getJamatKhanaGraph from '../Graphs/getJamatKhanaGraph';
import processJamatkhanaGraphData from '../../helpers/processJamatkhanaGraphData';
import processTrackingChanges from '../../helpers/processTrackingChanges';
import findAbovePercentage from '../../helpers/findAbovePercentage';

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

// processes age tracker
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

  // most recent one is stored last
  const mostRecentIndex = data.length - 1;
  // second last is 1 before
  const secondMostRecentIndex = mostRecentIndex - 1;

  // gets data
  const mostRecent = data[mostRecentIndex];
  const secondMostRecent = data[secondMostRecentIndex];

  const rowsToAdd = processTrackingChanges(secondMostRecent, mostRecent);

  // copies rows from processing to rows array
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

// processes completion spreadsheets for raw and filtered data
function processCompletion(data) {
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id' },
      { field: 'learnerid', headerName: 'Learner ID', width: 200 },
      { field: 'courseid', headerName: 'Course ID', width: 200 },
      { field: 'coursename', headerName: 'Course Name', width: 600 },
      { field: 'completion', headerName: 'Completion', width: 200 },
      { field: 'time', headerName: 'Time', width: 200 },
    ],
  };

  // counter for id
  let counter = 0;

  data.forEach((completion) => {
    const completionToAdd = {
      id: counter,
      learnerid: completion.LearnerID,
      courseid: completion.CourseID,
      coursename: completion.CourseName,
      completion: completion.Completion,
      time: convertSecondsToTimestamp(completion.Time),
    };
    rowsAndColumns.rows.push(completionToAdd);
    // add to counter so unique
    counter += 1;
  });

  return rowsAndColumns;
}

// processes fully completed courses
function processCompleted(data) {
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id' },
      { field: 'learnerid', headerName: 'Learner ID', width: 200 },
      { field: 'courseid', headerName: 'Course ID', width: 200 },
      { field: 'coursename', headerName: 'Course Name', width: 600 },
      { field: 'completion', headerName: 'Completion', width: 200 },
      { field: 'time', headerName: 'Time', width: 200 },
    ],
  };

  let counter = 0;

  data.forEach((completion) => {
    // if fully completed
    if (completion.Completion === 100) {
      const completionToAdd = {
        id: counter,
        learnerid: completion.LearnerID,
        courseid: completion.CourseID,
        coursename: completion.CourseName,
        completion: completion.Completion,
        time: convertSecondsToTimestamp(completion.Time),
      };
      rowsAndColumns.rows.push(completionToAdd);
      counter += 1;
    }
  });

  return rowsAndColumns;
}

function processCompletionCertificateTracker(data) {
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id' },
      { field: 'learnerid', headerName: 'Learner ID', width: 200 },
      { field: 'courseid', headerName: 'Course ID', width: 200 },
      { field: 'coursename', headerName: 'Course Name', width: 600 },
      { field: 'type', headerName: 'Type', width: 200 },
      { field: 'completion', headerName: 'Completion', width: 200 },
      { field: 'time', headerName: 'Time', width: 200 },
      { field: 'code', headerName: 'Code', width: 300 },
      { field: 'status', headerName: 'Status', width: 200 },
    ],
  };

  let counter = 0;

  data.forEach((completion) => {
    const completionToAdd = {
      id: counter,
      learnerid: completion.LearnerID,
      courseid: completion.CourseID,
      coursename: completion.CourseName,
      type: completion.Type,
      completion: completion.Completion,
      time: convertSecondsToTimestamp(completion.Time),
      code: completion.Code,
      status: completion.Status,
    };
    rowsAndColumns.rows.push(completionToAdd);
    counter += 1;
  });

  return rowsAndColumns;
}

// processes certificate allocation spreadsheet
function processCodeTracker(data) {
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id' },
      { field: 'code', headerName: 'Code', width: 300 },
      { field: 'type', headerName: 'Type', width: 200 },
      { field: 'status', headerName: 'Status', width: 200 },
      { field: 'expiry', headerName: 'Expiry', width: 200 },
      { field: 'learnerid', headerName: 'Learner ID', width: 200 },
      { field: 'learnername', headerName: 'Learner Name', width: 300 },
      { field: 'courseid', headerName: 'Course ID', width: 200 },
      { field: 'coursename', headerName: 'Course Name', width: 600 },
      { field: 'date', headerName: 'Date', width: 200 },
    ],
  };

  // combines diploma and certificate codes
  const codes = [...data.certificates, ...data.diplomas];
  // counter for id
  let counter = 0;

  // maps through codes
  codes.forEach((code) => {
    // finds and returns course details if codes match
    const completed = data.completionTracker.find((completion) => completion.Code === code.Code);

    // combines 2 arrays together for rows
    const trackerToAdd = {
      id: counter,
      code: code.Code,
      type: code.Type,
      status: code.Used,
      expiry: code.Expiry,
      // if exists or empty string
      learnerid: completed?.LearnerID ?? '',
      learnername: '',
      courseid: completed?.CourseID ?? '',
      coursename: completed?.CourseName ?? '',
      date: code.Date,
    };

    rowsAndColumns.rows.push(trackerToAdd);
    counter += 1;
  });

  return rowsAndColumns;
}

// finds courses over percentage (number and adds rows and columns)
function processNumberCompleted(data, number) {
  const rowsAndColumns = {
    rows: [],
    columns: [
      { field: 'id' },
      { field: 'learnerid', headerName: 'Learner ID', width: 200 },
      { field: 'courseid', headerName: 'Course ID', width: 200 },
      { field: 'coursename', headerName: 'Course Name', width: 600 },
      { field: 'completion', headerName: 'Completion', width: 200 },
      { field: 'time', headerName: 'Time', width: 200 },
    ],
  };

  // returns array of courses above certain number
  const abovePercentage = findAbovePercentage(data, number);
  // counter for id column (hidden)
  let counter = 0;

  abovePercentage.forEach((completion) => {
    const completionToAdd = {
      id: counter,
      learnerid: completion.LearnerID,
      courseid: completion.CourseID,
      coursename: completion.CourseName,
      completion: completion.Completion,
      time: convertSecondsToTimestamp(completion.Time),
    };
    rowsAndColumns.rows.push(completionToAdd);
    counter += 1;
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
    case 'all-jks':
      return processAllJKs(data);
    case 'age-tracker':
      return processAgeTracker(data);
    case 'gender-tracker':
      return processGenderTracker(data);
    case 'jk-tracker':
      return processJKTracker(data);
    case 'completion':
      return processCompletion(data);
    case 'completion-completed':
      return processCompleted(data);
    case 'completion-certificate-tracker':
      return processCompletionCertificateTracker(data);
    case 'completion-code-tracker':
      return processCodeTracker(data);
    case 'seventy':
      return processNumberCompleted(data, 70);
    case 'ninety':
      return processNumberCompleted(data, 90);
    default:
      console.error('no type');
      return {};
  }
}
