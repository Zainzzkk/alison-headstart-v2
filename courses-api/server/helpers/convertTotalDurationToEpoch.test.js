const convertTotalDurationToEpoch = require('./convertTotalDurationToEpoch.helper');

describe('convertTotalDurationToEpoch()', () => {
  it('should convert decimal number to seconds', () => {
    const result = convertTotalDurationToEpoch(1);
    const expected = 86400;

    expect(result).toEqual(expected);
  });

  it('should return 0 if timestamp is 0', () => {
    const result = convertTotalDurationToEpoch(0);
    const expected = 0;

    expect(result).toEqual(expected);
  });

  it('should convert string number to seconds', () => {
    const result = convertTotalDurationToEpoch('2');
    const expected = 172800;

    expect(result).toEqual(expected);
  });

  it('should convert string number to seconds', () => {
    const result = convertTotalDurationToEpoch('0.125456');
    const expected = Math.round(0.125456 * 24 * 60 * 60);

    expect(result).toEqual(expected);
  });

  it('should return null if null provided', () => {
    const result = convertTotalDurationToEpoch(null);
    expect(result).toBeNull();
  })
})