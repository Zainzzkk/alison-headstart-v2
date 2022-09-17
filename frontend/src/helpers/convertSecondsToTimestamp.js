// converts timestamp in seconds to string format in HH:MM:SS
export default function convertSecondsToTimestamp(timeInSeconds) {
  const secondsFormatted = Number(timeInSeconds);
  // if 0 seconds then returns 00:00:00
  if (!secondsFormatted) {
    return '00:00:00';
  }
  // calculates hours - minimum of 2 digits, ie 00, 01-09 and then beyond
  const hours = Math.floor(secondsFormatted / 3600).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  // calculates minutes to 2 digits
  const minutes = Math.floor(secondsFormatted % 3600 / 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  // calculates seconds to 2 digits
  const seconds = Math.floor(secondsFormatted % 3600 % 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // makes and returns string
  return `${hours}:${minutes}:${seconds}`;
}
