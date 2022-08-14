const splitCourseName = require('./splitCourseName.helper');

describe('splitCourseName()', () => {
  it('should split course name if - Revised with 1 space', () => {
    const courseName = 'Test - Revised';

    const result = splitCourseName(courseName);
    const expected = 'Test';

    expect(result).toEqual(expected);
  });

  it('should split course name if - Revised with 2 spaces', () => {
    const courseName = 'Test -  Revised';

    const result = splitCourseName(courseName);
    const expected = 'Test';

    expect(result).toEqual(expected);
  });

  it('should keep the same if course name with no revised', () => {
    const courseName = 'Test';

    const result = splitCourseName(courseName);
    const expected = 'Test';

    expect(result).toEqual(expected);
  });
});