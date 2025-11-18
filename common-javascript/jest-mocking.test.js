// 1. Set up any Mocks or Spies BEFORE requiring SUT

const mockMethod = jest.fn();

jest.mock('../src/core/domain/service/SomeService', () => ({
  ServiceObject: jest.fn().mockImplementation(() => ({
    processMethod: mockMethod,
  }))
}));

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});


describe('Some scenario', () => {
  test('Some test', async () => {
	// more 1. for per-test
    const { JsonInputSchemaValidator } = require('../src/adapters/outbound/validation/JsonInputSchemaValidator');
    jest
      .spyOn(JsonInputSchemaValidator.prototype, 'validateInputEvent')
      .mockReturnValueOnce();

// 2. Import module/method under test
    const index = require('../index.js');
    await index.handler(interpanNotificationEvent);

// 3. Access mock function or spy for assertions
    expect(JsonInputSchemaValidator.prototype.validateInputEvent).toHaveBeenCalledWith(interpanNotificationEvent);
  }); 
});
