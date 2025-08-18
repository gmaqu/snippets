
// NOTE: Jest will hoist mock module implementations to the top of execution, ensure mocks are prefixed with 'mock'. A precaution put in place by Jest. Any requires after that reference the module will be the cached mock.

describe('handler', () => {
  test('The handler invokes Service and calls someMethod()', async () => {
    
    const mockSomeProcess = jest.fn();
    jest.mock('../src/core/domain/service/SomeService.js', () => ({ 
      SomeService: jest.fn().mockImplementation(() => ({
        someMethod: mockSomeProcess
      }))
    }));
    const { handler } = require('../index.js');

    await handler({ msg: 'fake-event' });
    const { Service } = require('../src/core/domain/service/SomeService');
    
    expect(SomeService).toHaveBeenCalledTimes(1);
    expect(mockSomeProcess).toHaveBeenCalledTimes(1);
  });
});

