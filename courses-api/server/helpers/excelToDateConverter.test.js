const excelToDateConverter = require('./excelToDateConverter');

describe('excelToDateConverter()', () => {
  it('should return date if provided with excel number', () => {
    const result = excelToDateConverter(45562);
    const expected = '2024-09-27';

    expect(result).toEqual(expected);
  });

  it('should return null if provided with null', () => {
    const result = excelToDateConverter(null);

    expect(result).toBeNull();
  });
})