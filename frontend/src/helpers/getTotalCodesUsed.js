// returns total number of codes (diploma and certificates) used
export default function getTotalCodesUsed(tracker) {
  // if certificate status is yes, then used and adds one to counter
  const count = tracker.reduce((counter, code) => code.Status === 'YES' ? counter += 1 : counter, 0); // eslint-disable-line

  return count;
}
