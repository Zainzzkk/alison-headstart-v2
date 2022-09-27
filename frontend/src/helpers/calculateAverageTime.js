// calculates average time spent on all coruses
export default function calculateAverageTime(tracker) {
  // returns total time spent on course
  const totalTime = tracker.reduce((totalTime, course) => totalTime += course.Completion, 0); // eslint-disable-line
  const totalCourses = tracker.length;

  // returns as 2 decimal places
  return (totalTime / totalCourses).toFixed(2);
}
