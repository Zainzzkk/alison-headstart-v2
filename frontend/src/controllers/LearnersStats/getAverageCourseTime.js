import convertSecondsToTimestamp from '../../helpers/convertSecondsToTimestamp';

export default function getAverageCourseTime(data) {
  let totalTime = 0;
  // total numbers of learners
  const totalCount = data.length;

  data.forEach((learner) => {
    // add to total time from duration
    totalTime += learner.TotalDuration;
  });

  // calculate average time
  const averageTime = totalTime / totalCount;

  return convertSecondsToTimestamp(averageTime);
}
