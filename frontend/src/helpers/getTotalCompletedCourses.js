// returns total number of completed courses
export default function getTotalCompletedCourses(data) {
  // if completion is 100 then adds 1 to counter
  const count = data.reduce((counter, course) => course.Completion === 100 ? counter += 1 : counter, 0); // eslint-disable-line

  return count;
}
