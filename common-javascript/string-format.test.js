const stringFormat = require('../../lib/functions/string-format');


describe('stringFormat returns correct values for each function', () => {

  test('toKebabCase', () => {
    const expectedOutput = 'this-is-test-sentence';

    // Test a standard sentence
    expect(stringFormat.toKebabCase('This is test sentence')).toEqual(expectedOutput);
    // Test a camel string
    expect(stringFormat.toKebabCase('thisIsTestSentence')).toEqual(expectedOutput);
    // Test pascal
    expect(stringFormat.toKebabCase('ThisIsTestSentence')).toEqual(expectedOutput);
  });

  test('toPascalCase', () => {
    const expectedOutput = 'ThisIsTestSentence';

    // Test a standard sentence
    expect(stringFormat.toPascalCase('This is test sentence')).toEqual(expectedOutput);
    // Test a camel string
    expect(stringFormat.toPascalCase('thisIsTestSentence')).toEqual(expectedOutput);
    // Test kebab
    expect(stringFormat.toPascalCase('this-is-test-sentence')).toEqual(expectedOutput);
  });

  test('toCamelCase', () => {
    const expectedOutput = 'thisIsTestSentence';

    // Test a standard sentence
    expect(stringFormat.toCamelCase('This is test sentence')).toEqual(expectedOutput);
    // Test a Pascal string
    expect(stringFormat.toCamelCase('ThisIsTestSentence')).toEqual(expectedOutput);
    // Test kebab
    expect(stringFormat.toCamelCase('this-is-test-sentence')).toEqual(expectedOutput);
  });

  test('capitaliseFirstLetter', () => {
    const expectedOutput = 'Test';
    expect(stringFormat.capitaliseFirstLetter('test')).toEqual(expectedOutput);
  });

  test('removeHyphens', () => {
    const expectedOutput = 'thisistestsentence';
    expect(stringFormat.removeHyphens('this-is-test-sentence')).toEqual(expectedOutput);
  });

});

