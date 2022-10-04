// converts timestamp (string format) to seconds
export default function convertToSeconds(time) {
  if (!time) {
    return null;
  }
  const timeSplit = time.split(':');
  const hours = parseInt(timeSplit[0], 10);
  const mins = parseInt(timeSplit[1], 10);
  const seconds = parseInt(timeSplit[2], 10);

  return ((hours * 3600) + (mins * 60) + seconds);
}
