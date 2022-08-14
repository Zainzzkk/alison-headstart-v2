const convertToSeconds = require('./convertToSeconds.helper');

describe('convertToSeconds()', () => {
  it('should return time in seconds if correct timestamp provided', () => {
    const timestamp = '1:00:00';

    const result = convertToSeconds(timestamp);
    const expected = 3600;

    expect(result).toEqual(expected);
  });

  it('should return null if timestamp is null', () => {
    const timestamp = null;

    const result = convertToSeconds(timestamp);

    expect(result).toBeNull();
  });
})