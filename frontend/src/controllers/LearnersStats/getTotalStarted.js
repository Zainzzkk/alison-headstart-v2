export default function getTotalStarted(data) {
  let counter = 0;

  data.forEach((learner) => {
    if (learner.TotalDuration) {
      counter += 1;
    }
  });

  return counter.toString();
}
