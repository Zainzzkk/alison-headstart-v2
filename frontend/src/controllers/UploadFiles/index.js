import * as excel from 'xlsx/xlsx.mjs';
import { uploadCourseCodes } from '../CourseCodes/uploadCourseCodes';

export function open(uri) {
  try {
    const excelSheet = excel.readFile(uri);
    // gets first sheetname from readFile as will always be first sheet
    const sheetName = excelSheet.SheetNames[0];
    const data = excel.utils.sheet_to_json(excelSheet.Sheets[sheetName]);
    return Promise.resolve(data);
  } catch (e) {
    return Promise.reject(new Error(`🚩 Unable to parse the file ${uri} ${e}`));
  }
}

// uploads courses codes and returns response
async function uploadCourseCodesCall(fileContents) {
  const response = await uploadCourseCodes(fileContents);
  return response;
}

// checks what type of upload is required and calls relevant function
export function uploadFileToApi(fileContents, type) {
  switch (type) {
    case 'course-codes':
      return uploadCourseCodesCall(fileContents);

    default:
      console.error('no data or type provided');
      return 'no data or type provided';
  }
}
