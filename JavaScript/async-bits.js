/**
 * Async Functions:
 * Use the async/await syntax to handle asynchronous operations.
 * This allows you to write asynchronous code that looks synchronous, making it easier to read and maintain.
 * async needs to bubble up to all callers who want to index the response.
 */

/**
 * Send a POST request to an endpoint.
 * @param {string} path - Service path.
 * @param {Object} payload - The payload to send.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the response data.
 * @throws {Error} - Throws an error if the request fails or if the endpoint/payload details are not provided.
 */
async function postToClient(path, payload) {
  const host = 'jsonplaceholder.typicode.com';
  const service = 'JSON Placeholder Typicode';
  validateEndpoint(host, path, service);
  validatePayload(payload, service);
  
  const endpoint = `https://${host}${path}`;
  try {
    const response =  await axiosClient.post(endpoint, payload, commonHeaders);
    return response.data;
  } catch (error) {
    logAxiosError(error, endpoint, service, `Payload: ${JSON.stringify(payload)}`); 
  }
}

async function getResponse() {
  const r = await postToDm('/posts', {
    "title": "Hello World",
    "body": "This is a test post.",
    "userId": 42
  });
  console.log(r);
}

getResponse();



// =====================================================================================================================================================================================================================


/*
Async Functions && Class properties
    * An example for how async functions may lose context of a class reference `this` === undefined
    * Or try to access before initialisation of class === undefined
*/

class SomeClass {
  constructor(){
    this.prop = {scope: 'some-scope'};
  }

  // NOTE: There will be a loss of context in callbacks - regular functions have their own `this` separate from classes `this`
  async getPropNormalFunction() {
    setTimeout(function () {
      console.log(this.prop);
    }, 1000);
  }

  // 1: Bind `this`
  async getPropBindThis() {
    setTimeout(function () {
      console.log(this.prop);
    }.bind(this), 1000);
  }

  // 2. Arrow function
  async getPropArrowFn() {
    setTimeout(() => {
      console.log(this.prop);
    }, 5);
  }
}

const someClass = new SomeClass();
setTimeout(() => {}, 1000);
someClass.getPropNormalFunction();
someClass.getPropBindThis();
someClass.getPropArrowFn();


