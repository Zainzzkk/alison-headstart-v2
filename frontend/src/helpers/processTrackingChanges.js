// processes tracking from 2 objects from tracking database
export default function processTrackingChanges(oldest, mostRecent) {
  // if either is empty, no need to process
  if (!oldest || !mostRecent) {
    return [];
  }
  // get keys from oldest array since both are the same
  const keys = Object.keys(oldest);
  const rows = [];

  keys.forEach((key) => {
    // do not populate ID field
    if (key !== 'ID') {
      // calculate the difference between most recent and oldest
      const change = mostRecent[key] - oldest[key];
      const rowToAdd = {
        id: key,
        lastmonth: oldest[key],
        thismonth: mostRecent[key],
        // do not calculate changes on date field
        change: key !== 'Date' ? change : null,
      };
      rows.push(rowToAdd);
    }
  });

  return rows;
}
