import * as excel from 'xlsx/xlsx.mjs';
import { uploadCourseCodes } from '../CourseCodes/uploadCourseCodes';
import { uploadDiplomaCodes } from '../DiplomaCodes/uploadDiplomaCodes';
import { uploadAlisonCatalogue } from '../AlisonCatalogue/upload-alison-catalogue';
import { uploadLearnersStats } from '../LearnersStats/uploadLearnersStats';
import { uploadCourseCompletion, uploadCourseCompletionManual } from '../Completion/uploadCompletion';
import { uploadCertificateTracker, uploadCertificateManualTracker } from '../Completion/uploadCertificateTracker';

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

async function uploadDiplomaCodesCall(fileContents) {
  const response = await uploadDiplomaCodes(fileContents);
  return response;
}

async function uploadAlisonCatalogueCall(fileContents) {
  const response = await uploadAlisonCatalogue(fileContents);
  return response;
}

async function uploadLearnersStatsCall(fileContents) {
  const response = await uploadLearnersStats(fileContents);
  return response;
}

async function uploadCourseCompletionCall(fileContents) {
  const response = await uploadCourseCompletion(fileContents);
  return response;
}

async function uploadCourseCompletionManualCall(fileContents) {
  const response = await uploadCourseCompletionManual(fileContents);
  return response;
}

async function uploadCertificateTrackerCall(fileContents) {
  const response = await uploadCertificateTracker(fileContents);
  return response;
}

async function uploadCertificateTrackerManualCall(fileContents) {
  const response = await uploadCertificateManualTracker(fileContents);
  return response;
}

// checks what type of upload is required and calls relevant function
export function uploadFileToApi(fileContents, type) {
  switch (type) {
    case 'course-codes':
      return uploadCourseCodesCall(fileContents);

    case 'diploma-codes':
      return uploadDiplomaCodesCall(fileContents);

    case 'alison-catalogue':
      return uploadAlisonCatalogueCall(fileContents);

    case 'learners-stats':
      return uploadLearnersStatsCall(fileContents);

    case 'course-completion':
      return uploadCourseCompletionCall(fileContents);

    case 'course-completion-manual':
      return uploadCourseCompletionManualCall([fileContents]);

    case 'insert-certificate-tracker':
      return uploadCertificateTrackerCall(fileContents);

    case 'insert-certificate-tracker-manual':
      return uploadCertificateTrackerManualCall(fileContents);

    default:
      console.error('no data or type provided');
      return 'no data or type provided';
  }
}
