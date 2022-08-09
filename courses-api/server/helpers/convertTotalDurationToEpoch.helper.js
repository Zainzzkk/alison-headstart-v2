// timestamp received in decimal out of 24hrs so converting to seconds
const convertTotalDurationToEpoch = (timestamp) => {
  if (timestamp === null || timestamp === undefined) {
    return null;
  }

  const timestampInHours = parseFloat(timestamp) * 24;
  const timestampInSeconds = Math.round(timestampInHours * 60 * 60);
  return timestampInSeconds;
}

module.exports = convertTotalDurationToEpoch;