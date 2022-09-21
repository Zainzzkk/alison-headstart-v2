// processes jamatkhana age totals from full learner data array
export default function getLeanerAgeRangeGraph(data) {
  // initiation of count object
  const ageCounters = {
    under: 0,
    eighteen: 0,
    twentySix: 0,
    thirtySix: 0,
    fortySix: 0,
    fiftySix: 0,
    sixtyOne: 0,
    above: 0,
  };

  if (!data || !data.length) {
    return ageCounters;
  }

  let counter = 0;
  // loops through and matches age and adds 1 to counter
  data.forEach((learner) => {
    if (learner.AgeBand === 'Less than 18') {
      ageCounters.under += 1;
    }
    if (learner.AgeBand === '18 - 25') {
      ageCounters.eighteen += 1;
    }
    if (learner.AgeBand === '26 - 35') {
      ageCounters.twentySix += 1;
    }
    if (learner.AgeBand === '36 - 45') {
      ageCounters.thirtySix += 1;
    }
    if (learner.AgeBand === '46 - 55') {
      ageCounters.fortySix += 1;
    }
    if (learner.AgeBand === '56 - 60') {
      ageCounters.fiftySix += 1;
    }
    if (learner.AgeBand === '61 - 65') {
      ageCounters.sixtyOne += 1;
    }
    if (learner.AgeBand === 'Above 65') {
      ageCounters.above += 1;
    }
    counter += 1;
  });

  // adds total count to object
  ageCounters.total = counter;

  return ageCounters;
}
