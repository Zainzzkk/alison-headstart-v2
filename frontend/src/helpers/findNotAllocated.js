// finds tracker entries that are not allocated where status will be UNSURE
export default function findNotAllocated(tracker) {
  const unsure = tracker.filter((course) => course.Status === 'UNSURE');

  return unsure;
}
