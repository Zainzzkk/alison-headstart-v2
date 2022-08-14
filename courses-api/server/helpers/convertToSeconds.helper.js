// converts timestamp (string format) to seconds
const convertToSeconds = (time) => {
  if (!time) {
    return null;
  }
  const timeSplit = time.split(':');
  const hours = parseInt(timeSplit[0]);
  const mins = parseInt(timeSplit[1]);
  const seconds = parseInt(timeSplit[2]);

  return ((hours * 3600) + (mins * 60) + seconds);
}

module.exports = convertToSeconds