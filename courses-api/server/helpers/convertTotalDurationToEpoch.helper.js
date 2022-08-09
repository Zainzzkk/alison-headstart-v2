// timestamp received in number of hours as decimal so converting to seconds
const convertTotalDurationToEpoch = (timestamp) => {
  const timestampInHours = timestamp * 24;
  const timestampInSeconds = Math.round(timestampInHours * 60 * 60);
  return timestampInSeconds;
}

module.exports = convertTotalDurationToEpoch;