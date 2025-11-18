const {
  JsonInputSchemaValidator
} = require('../../../../../src/adapters/outbound/validation/JsonInputSchemaValidator');

const schema = require('../../../../../../../../contracts/some.json');

const {
  someEvent
} = require('../../../../sample');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Input event validation is configured correctly for', () => {
  const inputValidator = new JsonInputSchemaValidator(schema);
  inputValidator.compile();

  test('X events', () => {
    const result = inputValidator.validateInputEvent(someEvent);
    expect(result.errors).toEqual([]);
  });
});
