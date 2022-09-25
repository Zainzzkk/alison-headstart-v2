export default function processTrackingChanges(oldest, mostRecent) {
  if (!oldest || !mostRecent) {
    return [];
  }
  const keys = Object.keys(oldest);
  const rows = [];

  keys.forEach((key) => {
    if (key !== 'ID') {
      const change = mostRecent[key] - oldest[key];
      const rowToAdd = {
        id: key,
        lastmonth: oldest[key],
        thismonth: mostRecent[key],
        change: key !== 'Date' ? change : null,
      };
      rows.push(rowToAdd);
    }
  });

  return rows;
}
