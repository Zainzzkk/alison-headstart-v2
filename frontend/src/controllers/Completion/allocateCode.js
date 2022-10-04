import getUnusedCertificateCodes from '../CourseCodes/getUnusedCertificateCodes';
import getUnusedDiplomaCodes from '../DiplomaCodes/getUnusedDiplomaCodes';
import allocateCertificateCode from '../CourseCodes/allocateCertficateCode';
import allocateDiplomaCode from '../DiplomaCodes/allocateDiplomaCodes';
import allocateCertificateTracker from './allocateCertificateTracker';

import getCourseType from '../../helpers/getCourseType';
import convertToSeconds from '../../helpers/convertToSeconds';

const { COURSE_TYPE } = require('../../constants');

// returns array with unused codes
async function getUnusedCode(courseName) {
  // gets type - diploma or certificate
  const type = getCourseType(courseName);

  if (type === COURSE_TYPE.DIPLOMA) {
    return getUnusedDiplomaCodes();
  }

  return getUnusedCertificateCodes();
}

// sorts code by earliest date first
function sortCodes(codes) {
  const sorted = codes.sort((a, b) => new Date(a.Expiry) - new Date(b.Expiry));
  return sorted;
}

// allocates to certificate or diploma codes database
async function allocateCode(codeToUse) {
  if (codeToUse.Type === COURSE_TYPE.DIPLOMA) {
    const response = await allocateDiplomaCode(codeToUse);
    // if successful, then this message received
    if (response.message === 'Allocated the diploma code successfully to the database') {
      return 200;
    }
    return 500;
  }
  const response = await allocateCertificateCode(codeToUse);
  if (response.message === 'Allocated the certificate code successfully to the database') {
    return 200;
  }
  return 500;
}

// updates tracker
async function allocateTracker(toAllocate, codeToUse) {
  // sets body for tracker
  const trackerBody = {
    LearnerID: toAllocate.learnerid,
    CourseID: toAllocate.courseid,
    CourseName: toAllocate.coursename,
    Type: codeToUse.Type,
    Completion: 100,
    Time: convertToSeconds(toAllocate.time),
    Status: toAllocate.status,
    Code: codeToUse.Code,
  };
  const response = await allocateCertificateTracker(trackerBody);

  // if successful then this message received
  if (response.message === 'Uploaded the course tracker successfully') {
    return 200;
  }

  return 500;
}

// function to allocate code and update tracker and code dbs
export default async function allocateCodeController(toAllocate) {
  console.log(toAllocate);
  const codes = await getUnusedCode(toAllocate.coursename);
  const codeToUse = sortCodes(codes)[0];

  let status;

  // changes certificate or diploma to yes and adds date
  if (codeToUse) {
    status = await allocateCode(codeToUse);
  }

  // if successful then updates tracker with code and yes
  if (status === 200) {
    status = await allocateTracker(toAllocate, codeToUse);
  }

  // if successful then returns code
  if (status === 200) {
    return codeToUse.Code;
  }

  // returns error if issue
  return 'error';
}
