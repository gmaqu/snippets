// An example showing how callback hooks can be injected into a process to allow the caller to supply distinct behaviour
// i.e. side effect hooks

const RETRYABLE_ERROR_CODES = [429, 500, 502, 503, 504];
const requeueEvent = () => { 
  // Some requeueing logic
};
const createRetryEvent = () => {
  // Some logger construction
}

/**
 * Some main process we want to inject caller behaviour into
 * @param {Object} callbackFunctions - Side effect hooks. 
 */
async function someProcess(param1, param2, callbackFunctions) {

  const {
    onFailure,
    onRequestSent,
    onRetry,
    onSuccess
  } = callbackFunctions;
  
  try {
    // Do some stuff...
    onRequestSent(someId);
    // Response received
    onSuccess();
  } catch (error) {
    const responseCode = error.response.status;
      const retryableError = RETRYABLE_ERROR_CODES.includes(responseCode);
      if (retryableError) {
        createRetryEvent()
        onRetry();
        requeueEvent();
        // retries exhausted...
        onFailure();
      }
  }
}