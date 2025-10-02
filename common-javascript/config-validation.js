// config.js :
module.exports = {
  someProp: process.env.SOME_PROP,
};


const appConfig = require('./src/services/config');
validateAppConfiguration(appConfig);

/**
 * Validates configuration the application is dependent on at start up.
 * @param {Object} applicationConfiguration 
 */
function validateAppConfiguration(applicationConfiguration) {
  // Pre-compile app schema (only done once when the module is loaded)
  const joi = require('joi');
  const appSchema = joi.object({
    someProp: joi.string(),
  }).unknown(false);
  
  const validationResult = appSchema.validate(applicationConfiguration);
  // The validation result contains either an error or the validated value
  if (validationResult.error) {
    logger.error('Validation error on application configuration, parameter', validationResult.error.message);
  } else {
    logger.debug('Valid data:', validationResult.value);
  }
}
