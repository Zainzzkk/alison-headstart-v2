// combines certificates, diplomas and tracker in one object
export default function combineCodeData(certificatesArray, diplomasArray, completionTrackerArray) {
  return {
    certificates: certificatesArray,
    diplomas: diplomasArray,
    completionTracker: completionTrackerArray,
  };
}
