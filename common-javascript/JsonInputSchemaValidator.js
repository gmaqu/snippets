/**
 * package.json
 *
 *  "dependencies": {
 *   "ajv": "^8.17.1",
 *   "ajv-formats": "^3.0.1"
 * },
 *
 */
//@s-check

const Ajv = require('ajv').Ajv;
const addFormats = require('ajv-formats').default;

/** @typedef {import('ajv').ValidateFunction} ValidateFunction */
/** @typedef {import('ajv').Schema} Schema */
/** @typedef {import('ajv').ErrorObject} ErrorObject */

class JsonInputSchemaValidator {
  /** @type {Schema} */
  #jsonSchema;

  /** @type {ValidateFunction | null} */
  #validateFunction = null;

  /**
   *
   * @param {Object} schema
   */
  constructor(schema) {
    this.#jsonSchema = schema;
  }

  /**
   * Uses Ajv to compile a JSON message schema for asserting input.
   */
  compile() {
    const draft7MetaSchema = require('ajv/dist/refs/json-schema-draft-07.json');
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    // Alias the same meta-schema under the https URL:
    ajv.addSchema(draft7MetaSchema, 'https://json-schema.org/draft-07/schema');
    this.#validateFunction = ajv.compile(this.#jsonSchema);
  }

  /**
   *
   * @param {Object} event
   * @returns {JsonInputValidationResult}
   */
  validateInputEvent(event) {
    if (!this.#validateFunction) this.compile();
    const valid = this.#validateFunction(event);
    return {
      valid,
      errors: this.sanitiseErrors(this.#validateFunction.errors)
    };
  }

  /**
   * Sanitise Ajv errors, to contain only the identity of the failed part of the message,
   * but not the suspect data itself or why it failed validation.
   * @param {Array} ajvErrors
   * @returns {Array}
   */
  sanitiseErrors(ajvErrors) {
    if (!Array.isArray(ajvErrors)) return [];
    return ajvErrors.map((err) => {
      const reasonForValidationFailure = err.schemaPath.lastIndexOf('/');
      const redactedIssue =
        err.schemaPath === '#/oneOf' ? err.schemaPath : err.schemaPath.slice(0, reasonForValidationFailure);
      const failingPart = redactedIssue;

      return {
        // failedPart: jsonPointer || '<root>',
        // reason: err.message || err.keyword,
        // keyword: err.keyword,
        // schemaPath: err.schemaPath,
        // params: err.params,
        failingPart: redactedIssue
      };
    });
  }
}

module.exports = {
  JsonInputSchemaValidator
};

