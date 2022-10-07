// returns number of total codes issued to user
export default function getTotalCertificatesUser(tracker, learnerId) {
  // checks tracker and returns where learner id is the same
  const totalForUser = tracker.filter((each) => each.LearnerID === learnerId);

  return totalForUser.length;
}
