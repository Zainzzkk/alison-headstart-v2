// finds courses above a certain percentage and returns array
export default function findAbovePercentage(data, number) {
  const percentage = Number(number);

  // filters and returns total above percentage and under 100 and returns array
  const totalAbove = data.filter((course) => ((course.Completion >= percentage) && (course.Completion < 100)));

  return totalAbove;
}
