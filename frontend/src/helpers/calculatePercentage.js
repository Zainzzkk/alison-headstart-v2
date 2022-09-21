// calculates percentage of item from total to 0 decimal places
export default function percentage(count, total) {
  if (!count) {
    return null;
  }

  const percentageCalc = (count / total) * 100;

  return Number(percentageCalc.toFixed(0));
}
