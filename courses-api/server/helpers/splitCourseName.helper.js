// split courses name if - Revised with 1 or 2 spaces
const splitCourseName = (courseName) => {
  const firstSplit = courseName.split(' - Revised');

  const firstSplitName = firstSplit[0];
  // if 2 spaces between - and revised on some courses
  const name = firstSplitName.split(' -  Revised');

  return name[0];
};

module.exports = splitCourseName;