import unallocateCertificateCode from "../CourseCodes/unallocateCertificateCode";
import unallocateDiplomaCode from "../DiplomaCodes/unallocateDiplomaCodes";
import unallocateCertificateTracker from "./unallocateCertificateTracker";

import determineCourseType from "../../helpers/getCourseType";

const { COURSE_TYPE } = require('../../constants');

// function to unallocate the code and the certificate tracker
export default async function unallocate(params) {
  // gets the type of course (diploma or certificate)
  const type = determineCourseType(params.coursename);
  // status to delete from tracker
  let status;

  if (type === COURSE_TYPE.DIPLOMA) {
    // unallocates diploma
    const response = await unallocateDiplomaCode(params);
    // checks response is the right one and sets to 200 if so
    if (response.message === 'Unallocated the diploma code successfully') {
      status = 200;
    }
  } else {
    // unallocates certificate
    const response = await unallocateCertificateCode(params);
    // checks the response and allocates status
    if (response.message === 'Unallocated the certificate code successfully') {
      status = 200;
    }
  }

  // if successfully unallocate code
  if (status === 200) {
    // unallocates tracker and removes code and changes to UNSURE
    return unallocateCertificateTracker(params);
  }

  // returns error if no status is 200
  return 'Error';
}
