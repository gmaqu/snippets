const axios = require('axios');
const Fizz = require('../domain/fizz');

function httpFizzRepository(baseUrl) {
  return {
    async getById(id) {
      const res = await axios.get(`${baseUrl}/fizz/${id}`);
      return res.data ? new Fizz(res.data.id, res.data.state) : null;
    },
    async save(fizz) {
      await axios.post(`${baseUrl}/fizz/${fizz.id}`, { state: fizz.state });
    }
  };
}

module.exports = httpFizzRepository;
