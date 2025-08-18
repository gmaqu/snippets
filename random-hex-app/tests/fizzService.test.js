const FizzService = require('../app/fizzService');

describe('FizzService', () => {
  it('activates a fizz if it is inactive', async () => {
    const mockFizz = {
      id: '123',
      state: 'inactive',
      activate: function () { this.state = 'active'; }
    };

    const mockRepo = {
      getById: jest.fn().mockResolvedValue(mockFizz),
      save: jest.fn().mockResolvedValue(undefined)
    };

    const service = new FizzService(mockRepo);
    const result = await service.activateFizzById('123');

    expect(mockRepo.getById).toHaveBeenCalledWith('123');
    expect(mockRepo.save).toHaveBeenCalledWith(mockFizz);
    expect(result.state).toBe('active');
  });

  it('throws if fizz is already active', async () => {
    const mockFizz = {
      id: '123',
      state: 'active',
      activate: function () { throw new Error('Already active'); }
    };

    const mockRepo = {
      getById: jest.fn().mockResolvedValue(mockFizz),
      save: jest.fn()
    };

    const service = new FizzService(mockRepo);

    await expect(service.activateFizzById('123')).rejects.toThrow('Already active');
    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});
