class Fizz {
  constructor(id, state) {
    this.id = id;
    this.state = state;
  }

  activate() {
    if (this.state === 'active') throw new Error('Already active');
    this.state = 'active';
  }
}

module.exports = Fizz;
