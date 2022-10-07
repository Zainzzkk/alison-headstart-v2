// calculates total numbers above a certain percentage for completion (but below 100)
export default function calculateAbovePercentage(number, tracker) {
  // casts to number
  const percentage = Number(number);

  // adds 1 to counter if above percentage and below 100
  const count = tracker.reduce((counter, each) => ((each.Completion >= percentage) && (each.Completion < 100)) ? counter += 1 : counter, 0); // eslint-disable-line

  return count;
}
