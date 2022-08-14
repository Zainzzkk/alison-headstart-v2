const replaceWrongHyphen = require('./replaceWrongHyphen.helper');

describe('replaceWrongHyphen()', () => {
  it('should replace wrong hypen with ansii hyphen', () => {
    const courseName = 'Test – Revised';

    const result = replaceWrongHyphen(courseName);
    const expected = 'Test - Revised';

    expect(result).toEqual(expected);
  });

  it('should keep the same if ansii hyphen', () => {
    const courseName = 'Test - Revised';

    const result = replaceWrongHyphen(courseName);
    const expected = 'Test - Revised';

    expect(result).toEqual(expected);
  });

  it('should keep the same no - Revised', () => {
    const courseName = 'Test';

    const result = replaceWrongHyphen(courseName);
    const expected = 'Test';

    expect(result).toEqual(expected);
  })
}) 