const FizzService = require('./app/fizzService');
const httpFizzRepository = require('./adapters/httpFizzRepository');

const baseUrl = process.env.FIZZ_API_BASE_URL;
const fizzRepo = httpFizzRepository(baseUrl);
const fizzService = new FizzService(fizzRepo);

async function handler(event) {
  try {
    const fizz = await fizzService.activateFizzById(event.id);
    return { statusCode: 200, body: JSON.stringify(fizz) };
  } catch (err) {
    return { statusCode: 400, body: err.message };
  }
}

module.exports = { handler };
