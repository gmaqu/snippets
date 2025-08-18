class FizzService {
  constructor(fizzRepo) {
    this.fizzRepo = fizzRepo;
  }

  async activateFizzById(id) {
    const fizz = await this.fizzRepo.getById(id);
    if (!fizz) throw new Error('Fizz not found');
    fizz.activate();
    await this.fizzRepo.save(fizz);
    return fizz;
  }
}

module.exports = FizzService;
