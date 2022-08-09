const determineCourseType = require('./determineCourseType.helper');
const TYPE = require('../constants/type.constant');


describe('determineCourseType()', () => {
  it(`should return ${TYPE.DIPLOMA} if name contains the word diploma`, () => {
    const result = determineCourseType('Diploma in A');
    const expected = TYPE.DIPLOMA;

    expect(result).toEqual(expected);
  });

  it(`should return ${TYPE.DIPLOMA} if name contains the word diploma`, () => {
    const result = determineCourseType('Advanced Diploma in B');
    const expected = TYPE.DIPLOMA;

    expect(result).toEqual(expected);
  });

  it(`should return ${TYPE.CERTIFICATE} if name does not contains the word diploma`, () => {
    const result = determineCourseType('Advanced Course in B');
    const expected = TYPE.CERTIFICATE;

    expect(result).toEqual(expected);
  });

  it(`should return null if name is null`, () => {
    const result = determineCourseType(null);
    expect(result).toBeNull();
  })
})