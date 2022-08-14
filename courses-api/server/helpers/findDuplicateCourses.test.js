const { findDuplicateCourses, findDuplicateIndexWithCourseId } = require('./findDuplicateCourses.helper');

describe('findDuplicateIndexWithCourseId()', () => {
  it('should return course with ID in array', () => {
    const course = [{
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const result = findDuplicateIndexWithCourseId(course);
    const expected = {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    expect(result).toEqual(expected);
  });

  it('should return course with ID in array', () => {
    const course = [{
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const result = findDuplicateIndexWithCourseId(course);
    const expected = {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    expect(result).toEqual(expected);
  });

  it('should return course with ID in array with only course with ID', () => {
    const course = [{
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const result = findDuplicateIndexWithCourseId(course);
    const expected = {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    expect(result).toEqual(expected);
  });

  it('should return course with ID in array with only 1 course with ID', () => {
    const course = [{
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const result = findDuplicateIndexWithCourseId(course);
    const expected = {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    expect(result).toEqual(expected);
  });

  it('should return course without ID in array with only Course ID of 0', () => {
    const course = [{
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const result = findDuplicateIndexWithCourseId(course);
    const expected = {
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    expect(result).toEqual(expected);
  });

  it('should return course with ID of 0 when only 1 in array', () => {
    const course = [{
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const result = findDuplicateIndexWithCourseId(course);
    const expected = {
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    expect(result).toEqual(expected);
  })
});

describe('findDuplicateCourses', () => {
  it('should return course with id number when duplicate (no -revised)', () => {
    const courses = [{
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const expected = courses[0];

    const result = findDuplicateCourses(courses[0], courses);

    expect(result).toEqual(expected);
  });

  it('should return course with id number when duplicate (with -revised)', () => {
    const courses = [{
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test - Revised',
      Completed: 100,
      'Total Duration': 20,
    }];

    const expected = courses[0];

    const result = findDuplicateCourses(courses[0], courses);

    expect(result).toEqual(expected);

    const expected1 = courses[0];

    const result1 = findDuplicateCourses(courses[1], courses);

    expect(result1).toEqual(expected1);
  });

  it('should return course with id number when duplicate', () => {
    const courses = [{
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test - Revised',
      Completed: 100,
      'Total Duration': 20,
    },
    {
      'IIUK ID': 123,
      'Course ID': 0,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const expected = {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    const result = findDuplicateCourses(courses[0], courses);

    expect(result).toEqual(expected);
  });

  it('should return course with id number when no duplicates (no -revised)', () => {
    const courses = [{
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    }];

    const expected = {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    const result = findDuplicateCourses(courses[0], courses);
    console.log(result)

    expect(result).toEqual(expected);
  });

  it('should return course with id number when no duplicates (revised)', () => {
    const courses = [{
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test - Revised',
      Completed: 100,
      'Total Duration': 20,
    }];

    const expected = {
      'IIUK ID': 123,
      'Course ID': 123,
      'Course Name': 'Test',
      Completed: 100,
      'Total Duration': 20,
    };

    const result = findDuplicateCourses(courses[0], courses);
    console.log(result)

    expect(result).toEqual(expected);
  });
})