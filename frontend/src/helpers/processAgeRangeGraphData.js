import calculatePercentage from './calculatePercentage';

// populates age range data in format for bar graph
export default function processAgeRangeGraphData(ageRanges) {
  return [
    {
      name: 'Under 18',
      percentage: calculatePercentage(ageRanges.under, ageRanges.total),
      number: ageRanges.under,
    },
    {
      name: '18 - 25',
      percentage: calculatePercentage(ageRanges.eighteen, ageRanges.total),
      number: ageRanges.eighteen,
    },
    {
      name: '26 - 35',
      percentage: calculatePercentage(ageRanges.twentySix, ageRanges.total),
      number: ageRanges.twentySix,
    },
    {
      name: '36 - 45',
      percentage: calculatePercentage(ageRanges.thirtySix, ageRanges.total),
      number: ageRanges.thirtySix,
    },
    {
      name: '46 - 55',
      percentage: calculatePercentage(ageRanges.fortySix, ageRanges.total),
      number: ageRanges.fortySix,
    },
    {
      name: '56 - 60',
      percentage: calculatePercentage(ageRanges.fiftySix, ageRanges.total),
      number: ageRanges.fiftySix,
    },
    {
      name: '61 - 65',
      percentage: calculatePercentage(ageRanges.sixtyOne, ageRanges.total),
      number: ageRanges.sixtyOne,
    },
    {
      name: 'Above 65',
      percentage: calculatePercentage(ageRanges.above, ageRanges.total),
      number: ageRanges.above,
    },
  ];
}
